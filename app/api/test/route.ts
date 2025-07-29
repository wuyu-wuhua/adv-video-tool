import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET() {
  try {
    // 检查环境变量
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { 
          success: false, 
          message: '环境变量未配置',
          missing: {
            supabaseUrl: !supabaseUrl,
            supabaseKey: !supabaseKey
          }
        },
        { status: 500 }
      )
    }

    // 测试数据库连接
    const supabase = createClient()
    const { data, error } = await supabase
      .from('demands')
      .select('count')
      .limit(1)

    if (error) {
      return NextResponse.json(
        { 
          success: false, 
          message: '数据库连接测试失败',
          error: error.message,
          code: error.code
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'API和数据库连接正常',
        timestamp: new Date().toISOString(),
        database: 'connected',
        environment: 'configured'
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'API测试失败',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  )
} 