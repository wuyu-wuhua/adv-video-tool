// 创建广告生成历史表 API
import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabaseClient } from '@/lib/database/client'

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    console.log('🔧 Creating generation_history table...')

    const supabase = createAdminSupabaseClient()

    // 先检查表是否已存在
    const { data: existingTable, error: checkError } = await supabase.from('generation_history').select('id').limit(1)

    if (!checkError) {
      return NextResponse.json({
        success: true,
        message: 'Generation history table already exists',
        tableExists: true,
      })
    }

    console.log('📋 Table does not exist, need to create manually...')

    // 提供创建表的SQL
    const createTableSQL = `
-- 创建广告生成历史表
CREATE TABLE generation_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  input_image_urls JSONB NOT NULL DEFAULT '[]',
  ad_purpose TEXT NOT NULL,
  brand_info JSONB NOT NULL DEFAULT '{}',
  generated_ad_urls JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_generation_history_user_id ON generation_history(user_id);
CREATE INDEX idx_generation_history_created_at ON generation_history(created_at);

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

    return NextResponse.json({
      success: false,
      message: 'Table does not exist. Please create it manually.',
      tableExists: false,
      sql: createTableSQL,
      instructions: [
        '1. 打开 Supabase 控制台',
        '2. 进入 SQL Editor',
        '3. 复制并执行上面的 SQL 语句',
        '4. 重新调用此 API 验证表是否创建成功',
      ],
    })
  } catch (error) {
    console.error('Create table API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to check or create generation_history table',
      },
      { status: 500 },
    )
  }
}

// 验证表结构
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const supabase = createAdminSupabaseClient()

    // 检查表是否存在
    const { data, error } = await supabase.from('generation_history').select('*').limit(1)

    if (error) {
      return NextResponse.json({
        success: false,
        tableExists: false,
        error: error.message,
        code: error.code,
      })
    }

    return NextResponse.json({
      success: true,
      tableExists: true,
      message: 'Generation history table exists and is accessible',
      sampleData: data,
    })
  } catch (error) {
    console.error('Check table API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}

// 处理其他HTTP方法
export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
