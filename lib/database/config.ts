// 数据库配置常量

// 数据库表名常量
export const DATABASE_TABLES = {
  DEMANDS: 'demands',
  USERS: 'users',
  VIDEO_TASKS: 'video_generation_tasks',
  VIDEO_SAMPLES: 'video_samples'
} as const

// 环境变量配置
export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY!
} as const

// 数据库初始化配置
export const DATABASE_INIT_CONFIG = {
  // 创建表的SQL语句
  CREATE_TABLE_SQL: `
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
  `,
  
  // 创建RLS策略的SQL语句
  CREATE_POLICIES_SQL: `
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
} as const 