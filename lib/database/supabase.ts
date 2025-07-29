import { createBrowserClient } from '@supabase/ssr'
import { Demand, DatabaseError } from './types'
import { ERROR_MESSAGES } from '@/lib/core/constants'

// 环境变量配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// 创建浏览器客户端
export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are not configured')
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// 创建管理员客户端（用于API路由）
export function createAdminClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured')
  }
  return createBrowserClient(supabaseUrl, supabaseServiceKey)
}

// 获取Supabase客户端（根据用途选择权限级别）
export function getSupabaseClient(useAdmin = false) {
  if (useAdmin) {
    return createAdminClient()
  }
  return createClient()
}

// 检查表是否存在
async function checkTableExists(): Promise<boolean> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('demands')
      .select('id')
      .limit(1)
    
    return !error
  } catch {
    return false
  }
}

// 创建表的SQL语句
const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS public.demands (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    challenges TEXT[],
    video_types TEXT[],
    benefits TEXT[],
    budget TEXT,
    interest_in_trial BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
  );
`

// 创建RLS策略的SQL语句
const CREATE_POLICIES_SQL = `
  ALTER TABLE public.demands ENABLE ROW LEVEL SECURITY;

  DROP POLICY IF EXISTS "Enable insert for API" ON public.demands;
  CREATE POLICY "Enable insert for API" ON public.demands
  FOR INSERT WITH CHECK (true);

  DROP POLICY IF EXISTS "Disable select for all users" ON public.demands;
  CREATE POLICY "Disable select for all users" ON public.demands
  FOR SELECT USING (false);

  DROP POLICY IF EXISTS "Disable update for all users" ON public.demands;
  CREATE POLICY "Disable update for all users" ON public.demands
  FOR UPDATE USING (false);

  DROP POLICY IF EXISTS "Disable delete for all users" ON public.demands;
  CREATE POLICY "Disable delete for all users" ON public.demands
  FOR DELETE USING (false);
`

// 使用@supabase/ssr创建表
async function createTableWithSSR(): Promise<boolean> {
  try {
    const supabaseAdmin = createAdminClient()
    
    // 使用PostgreSQL扩展执行SQL
    const { error: tableError } = await supabaseAdmin.rpc('exec_sql', {
      sql: CREATE_TABLE_SQL
    })

    if (tableError) {
      console.log('❌ Cannot create table via SSR:', tableError)
      return false
    }

    // 创建RLS策略
    const { error: policiesError } = await supabaseAdmin.rpc('exec_sql', {
      sql: CREATE_POLICIES_SQL
    })

    if (policiesError) {
      console.log('⚠️ Table created but policies failed:', policiesError)
      return true // 表创建成功，策略可以稍后手动添加
    }

    console.log('✅ Table and policies created with SSR')
    return true
  } catch (error) {
    console.log('❌ SSR method failed:', error)
    return false
  }
}

// 使用HTTP API创建表（备选方法）
async function createTableWithHTTP(): Promise<boolean> {
  if (!supabaseServiceKey) {
    console.log('❌ Service key not available for HTTP method')
    return false
  }

  try {
    // 尝试创建表
    const tableResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`
      },
      body: JSON.stringify({ sql: CREATE_TABLE_SQL })
    })

    if (!tableResponse.ok) {
      console.log('❌ Cannot create table via HTTP API')
      return false
    }

    // 创建RLS策略
    const policiesResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`
      },
      body: JSON.stringify({ sql: CREATE_POLICIES_SQL })
    })

    if (policiesResponse.ok) {
      console.log('✅ Table and policies created with HTTP API')
      return true
    }

    console.log('⚠️ Table created but policies failed')
    return true // 表创建成功，策略可以稍后手动添加
  } catch (error) {
    console.log('❌ HTTP method failed:', error)
    return false
  }
}

// 使用Service Role Key直接操作（备选方法）
async function createTableWithServiceKey(): Promise<boolean> {
  try {
    const supabaseAdmin = createAdminClient()
    
    // 尝试插入测试数据来检查表是否存在
    const { data, error } = await supabaseAdmin
      .from('demands')
      .insert([{
        email: 'test@example.com',
        name: 'Test User'
      }])
      .select()
    
    if (error && error.code === 'PGRST116') {
      // 表不存在，需要手动创建
      console.log('❌ Table does not exist and cannot be created automatically')
      return false
    }
    
    // 如果插入成功，删除测试数据
    if (data && data[0]) {
      await supabaseAdmin
        .from('demands')
        .delete()
        .eq('email', 'test@example.com')
      console.log('✅ Table exists and is accessible')
      return true
    }
    
    return false
  } catch (error) {
    console.log('❌ Service key method failed:', error)
    return false
  }
}

// 初始化数据库表
export async function initializeDatabase(): Promise<boolean> {
  try {
    console.log('🔍 Checking if table exists...')
    
    const exists = await checkTableExists()
    if (exists) {
      console.log('✅ Table already exists')
      return true
    }

    console.log('❌ Table does not exist, attempting to create...')

    // 尝试多种方法创建表
    const methods = [
      { name: 'SSR', fn: createTableWithSSR },
      { name: 'HTTP API', fn: createTableWithHTTP },
      { name: 'Service Key', fn: createTableWithServiceKey }
    ]

    for (const method of methods) {
      try {
        console.log(`🔧 Trying ${method.name} method...`)
        const success = await method.fn()
        
        if (success) {
          // 验证表是否真的创建成功
          const verified = await checkTableExists()
          if (verified) {
            console.log(`✅ Table created successfully using ${method.name}`)
            return true
          }
        }
      } catch (error) {
        console.log(`❌ ${method.name} method failed:`, error)
        continue
      }
    }

    // 所有方法都失败了
    console.log('❌ All automatic creation methods failed')
    console.log('📋 Please create the table manually in Supabase SQL Editor:')
    console.log(CREATE_TABLE_SQL + CREATE_POLICIES_SQL)
    
    return false
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    return false
  }
}

// 数据库操作工具函数
export class DatabaseService {
  private supabase = createAdminClient()

  // 插入需求数据
  async insertDemand(demand: Demand) {
    try {
      const { data, error } = await this.supabase
        .from('demands')
        .insert([demand])
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return { success: true, data }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR 
      }
    }
  }

  // 检查邮箱是否存在
  async checkEmailExists(email: string) {
    try {
      const { data, error } = await this.supabase
        .from('demands')
        .select('id')
        .eq('email', email)
        .single()

      if (error && error.code === 'PGRST116') {
        return { exists: false }
      }

      return { exists: !!data }
    } catch (error) {
      return { exists: false }
    }
  }

  // 获取需求列表
  async getDemands(limit = 10, offset = 0) {
    try {
      const { data, error, count } = await this.supabase
        .from('demands')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        throw new Error(error.message)
      }

      return { success: true, data, count }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR 
      }
    }
  }
} 