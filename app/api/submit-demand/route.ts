import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabaseClient, initializeDatabase } from '@/lib/database'
import { ERROR_MESSAGES } from '@/lib/core/constants'

export async function POST(request: NextRequest) {
  try {
    // 初始化数据库
    const dbInitialized = await initializeDatabase()
    if (!dbInitialized) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.DATABASE_ERROR },
        { status: 500 }
      )
    }

    // 解析请求体
    const body = await request.json()
    const { name, email, challenges, video_types, benefits, budget, interest_in_trial } = body

    // 验证必填字段
    if (!email) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.VALIDATION_ERROR },
        { status: 400 }
      )
    }

    // 创建需求对象
    const demand = {
      name,
      email,
      challenges,
      video_types,
      benefits,
      budget,
      interest_in_trial
    }

    // 插入数据库
    const supabase = createAdminSupabaseClient()
    const { data, error } = await supabase
      .from('demands')
      .insert([demand])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS },
          { status: 400 }
        )
      }
      return NextResponse.json(
        { error: ERROR_MESSAGES.DATABASE_ERROR },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Submit demand error:', error)
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVER_ERROR },
      { status: 500 }
    )
  }
}

// 处理其他HTTP方法
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  )
} 