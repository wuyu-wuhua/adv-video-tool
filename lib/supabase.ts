import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// 创建Supabase客户端
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 获取Supabase客户端（根据用途选择权限级别）
export function getSupabaseClient(useAdmin = false) {
  if (useAdmin && supabaseServiceKey) {
    return createClient(supabaseUrl, supabaseServiceKey)
  }
  return supabase
}

// 数据库表结构定义
export interface Demand {
  id?: string
  name?: string
  email: string
  challenges?: string[]
  video_types?: string[]
  benefits?: string[]
  budget?: string
  interest_in_trial?: boolean
  created_at?: string
}

// 检查表是否存在
async function checkTableExists(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('demands')
      .select('id')
      .limit(1)
    
    return !error
  } catch {
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

    console.log('❌ Table does not exist')
    console.log('📋 Please create the table manually in Supabase SQL Editor:')
    console.log(`
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
    `)
    
    return false
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    return false
  }
} 