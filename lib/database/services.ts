import { createAdminSupabaseClient, createBrowserSupabaseClient } from './client'
import { DATABASE_TABLES, DATABASE_INIT_CONFIG } from './config'
import type { Demand, DatabaseResponse, PaginatedResponse, GenerationHistory } from './types'
import { ERROR_MESSAGES } from '@/lib/core/constants'
import { initializeStorageBuckets } from '@/lib/storage/supabase-storage'

// 检查表是否存在
async function checkTableExists(): Promise<boolean> {
  try {
    const supabase = createBrowserSupabaseClient()
    const { data, error } = await supabase.from(DATABASE_TABLES.DEMANDS).select('id').limit(1)

    return !error
  } catch {
    return false
  }
}

// 使用@supabase/ssr创建表
async function createTableWithSSR(): Promise<boolean> {
  try {
    const supabaseAdmin = createAdminSupabaseClient()

    // 使用PostgreSQL扩展执行SQL
    const { error: tableError } = await supabaseAdmin.rpc('exec_sql', {
      sql: DATABASE_INIT_CONFIG.CREATE_TABLE_SQL,
    })

    if (tableError) {
      console.log('❌ Cannot create table via SSR:', tableError)
      return false
    }

    // 创建RLS策略
    const { error: policyError } = await supabaseAdmin.rpc('exec_sql', {
      sql: DATABASE_INIT_CONFIG.CREATE_POLICIES_SQL,
    })

    if (policyError) {
      console.log('❌ Cannot create policies via SSR:', policyError)
      return false
    }

    console.log('✅ Table and policies created successfully via SSR')
    return true
  } catch (error) {
    console.log('❌ SSR method failed:', error)
    return false
  }
}

// 使用HTTP API创建表
async function createTableWithHTTP(): Promise<boolean> {
  try {
    const supabaseAdmin = createAdminSupabaseClient()

    // 创建表
    const { error: tableError } = await supabaseAdmin.from(DATABASE_TABLES.DEMANDS).select('id').limit(1)

    if (tableError && tableError.code === 'PGRST116') {
      // 表不存在，尝试创建
      console.log('📋 Table does not exist, attempting to create...')
      return await createTableWithSSR()
    }

    return true
  } catch (error) {
    console.log('❌ HTTP method failed:', error)
    return false
  }
}

// 使用服务密钥创建表
async function createTableWithServiceKey(): Promise<boolean> {
  try {
    const supabaseAdmin = createAdminSupabaseClient()

    // 检查表是否存在
    const { data, error } = await supabaseAdmin.from(DATABASE_TABLES.DEMANDS).select('id').limit(1)

    if (error && error.code === 'PGRST116') {
      console.log('📋 Table does not exist, creating...')
      return await createTableWithSSR()
    }

    return true
  } catch (error) {
    console.log('❌ Service key method failed:', error)
    return false
  }
}

// 检查广告生成历史表是否存在
async function checkGenerationHistoryTableExists(): Promise<boolean> {
  try {
    const supabase = createBrowserSupabaseClient()
    const { data, error } = await supabase.from('generation_history').select('id').limit(1)

    return !error
  } catch {
    return false
  }
}

// 创建广告生成历史表
async function createGenerationHistoryTable(): Promise<boolean> {
  try {
    const supabaseAdmin = createAdminSupabaseClient()

    // 先检查表是否已存在
    const { data: existingTable, error: checkError } = await supabaseAdmin
      .from('generation_history')
      .select('id')
      .limit(1)

    if (!checkError) {
      console.log('✅ Generation history table already exists')
      return true
    }

    console.log('📋 Creating generation_history table...')

    // 由于不能直接执行DDL，我们需要通过Supabase控制台或者SQL编辑器手动创建表
    // 这里提供创建表的SQL供手动执行
    const createTableSQL = `
-- 创建广告生成历史表
CREATE TABLE IF NOT EXISTS generation_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  input_image_urls JSONB NOT NULL DEFAULT '[]',
  ad_purpose TEXT NOT NULL,
  brand_info JSONB NOT NULL DEFAULT '{}',
  generated_ad_urls JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_generation_history_user_id ON generation_history(user_id);
CREATE INDEX IF NOT EXISTS idx_generation_history_created_at ON generation_history(created_at);

-- 启用RLS
ALTER TABLE generation_history ENABLE ROW LEVEL SECURITY;

-- 创建RLS策略
CREATE POLICY "Users can view their own generation history" ON generation_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own generation history" ON generation_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own generation history" ON generation_history
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own generation history" ON generation_history
  FOR DELETE USING (auth.uid() = user_id);
    `

    console.log('❌ Cannot create table automatically. Please execute the following SQL in Supabase SQL Editor:')
    console.log(createTableSQL)

    return false
  } catch (error) {
    console.error('Create generation history table error:', error)
    return false
  }
}

// 初始化数据库
export async function initializeDatabase(): Promise<boolean> {
  console.log('🚀 Initializing database...')

  // 首先检查表是否已存在
  const tableExists = await checkTableExists()
  if (tableExists) {
    console.log('✅ Database table already exists')
  } else {
    console.log('📋 Table does not exist, creating...')

    // 尝试不同的创建方法
    const methods = [
      { name: 'Service Key', fn: createTableWithServiceKey },
      { name: 'HTTP API', fn: createTableWithHTTP },
      { name: 'SSR', fn: createTableWithSSR },
    ]

    let tableCreated = false
    for (const method of methods) {
      console.log(`🔄 Trying ${method.name} method...`)
      const success = await method.fn()
      if (success) {
        console.log(`✅ Database table created successfully using ${method.name} method`)
        tableCreated = true
        break
      }
    }

    if (!tableCreated) {
      console.log('❌ All database table creation methods failed')
      return false
    }
  }

  // 检查并创建广告生成历史表
  const generationTableExists = await checkGenerationHistoryTableExists()
  if (!generationTableExists) {
    console.log('📋 Generation history table does not exist, creating...')
    const generationTableCreated = await createGenerationHistoryTable()
    if (!generationTableCreated) {
      console.log('❌ Failed to create generation history table')
      return false
    }
  } else {
    console.log('✅ Generation history table already exists')
  }

  // 初始化存储桶
  console.log('🗂️ Initializing storage buckets...')
  const storageInitialized = await initializeStorageBuckets()
  if (!storageInitialized) {
    console.log('❌ Failed to initialize storage buckets')
    return false
  }
  console.log('✅ Storage buckets initialized successfully')

  console.log('✅ Database initialization completed successfully')
  return true
}

// 数据库服务类
export class DatabaseService {
  private supabase = createAdminSupabaseClient()

  // 插入需求
  async insertDemand(demand: Demand): Promise<DatabaseResponse<Demand>> {
    try {
      const { data, error } = await this.supabase.from(DATABASE_TABLES.DEMANDS).insert([demand]).select().single()

      if (error) {
        if (error.code === '23505') {
          return {
            data: null,
            error: { message: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS },
          }
        }
        return { data: null, error }
      }

      return { data, error: null }
    } catch (error) {
      return {
        data: null,
        error: { message: ERROR_MESSAGES.DATABASE_ERROR },
      }
    }
  }

  // 检查邮箱是否存在
  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from(DATABASE_TABLES.DEMANDS)
        .select('email')
        .eq('email', email)
        .single()

      if (error && error.code === 'PGRST116') {
        return false // 邮箱不存在
      }

      return !!data // 邮箱存在
    } catch {
      return false
    }
  }

  // 获取需求列表
  async getDemands(limit = 10, offset = 0): Promise<PaginatedResponse<Demand>> {
    try {
      const { data, error, count } = await this.supabase
        .from(DATABASE_TABLES.DEMANDS)
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        throw error
      }

      const total = count || 0
      const page = Math.floor(offset / limit) + 1
      const totalPages = Math.ceil(total / limit)

      return {
        data: data || [],
        total,
        page,
        pageSize: limit,
        totalPages,
      }
    } catch (error) {
      return {
        data: [],
        total: 0,
        page: 1,
        pageSize: limit,
        totalPages: 0,
      }
    }
  }
}
