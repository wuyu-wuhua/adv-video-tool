import { createAdminSupabaseClient, createBrowserSupabaseClient } from './client'
import { DATABASE_TABLES, DATABASE_INIT_CONFIG } from './config'
import type { Demand, DatabaseResponse, PaginatedResponse } from './types'
import { ERROR_MESSAGES } from '@/lib/core/constants'

// 检查表是否存在
async function checkTableExists(): Promise<boolean> {
  try {
    const supabase = createBrowserSupabaseClient()
    const { data, error } = await supabase
      .from(DATABASE_TABLES.DEMANDS)
      .select('id')
      .limit(1)
    
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
      sql: DATABASE_INIT_CONFIG.CREATE_TABLE_SQL
    })

    if (tableError) {
      console.log('❌ Cannot create table via SSR:', tableError)
      return false
    }

    // 创建RLS策略
    const { error: policyError } = await supabaseAdmin.rpc('exec_sql', {
      sql: DATABASE_INIT_CONFIG.CREATE_POLICIES_SQL
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
    const { error: tableError } = await supabaseAdmin
      .from(DATABASE_TABLES.DEMANDS)
      .select('id')
      .limit(1)

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
    const { data, error } = await supabaseAdmin
      .from(DATABASE_TABLES.DEMANDS)
      .select('id')
      .limit(1)

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

// 初始化数据库
export async function initializeDatabase(): Promise<boolean> {
  console.log('🚀 Initializing database...')

  // 首先检查表是否已存在
  const tableExists = await checkTableExists()
  if (tableExists) {
    console.log('✅ Database table already exists')
    return true
  }

  console.log('📋 Table does not exist, creating...')

  // 尝试不同的创建方法
  const methods = [
    { name: 'Service Key', fn: createTableWithServiceKey },
    { name: 'HTTP API', fn: createTableWithHTTP },
    { name: 'SSR', fn: createTableWithSSR }
  ]

  for (const method of methods) {
    console.log(`🔄 Trying ${method.name} method...`)
    const success = await method.fn()
    if (success) {
      console.log(`✅ Database initialized successfully using ${method.name} method`)
      return true
    }
  }

  console.log('❌ All database initialization methods failed')
  return false
}

// 数据库服务类
export class DatabaseService {
  private supabase = createAdminSupabaseClient()

  // 插入需求
  async insertDemand(demand: Demand): Promise<DatabaseResponse<Demand>> {
    try {
      const { data, error } = await this.supabase
        .from(DATABASE_TABLES.DEMANDS)
        .insert([demand])
        .select()
        .single()

      if (error) {
        if (error.code === '23505') {
          return {
            data: null,
            error: { message: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS }
          }
        }
        return { data: null, error }
      }

      return { data, error: null }
    } catch (error) {
      return {
        data: null,
        error: { message: ERROR_MESSAGES.DATABASE_ERROR }
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
        totalPages
      }
    } catch (error) {
      return {
        data: [],
        total: 0,
        page: 1,
        pageSize: limit,
        totalPages: 0
      }
    }
  }
} 