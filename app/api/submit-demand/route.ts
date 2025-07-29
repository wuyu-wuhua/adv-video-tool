import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient, initializeDatabase } from '@/lib/supabase'
import { validateDemandForm, transformFormDataToDatabase } from '@/lib/validation'
import { handleDatabaseError, handleValidationError, handleUnknownError, formatErrorResponse } from '@/lib/error-handler'

// 初始化数据库（仅在第一次调用时执行）
let isDatabaseInitialized = false

async function ensureDatabaseInitialized() {
  if (!isDatabaseInitialized) {
    await initializeDatabase()
    isDatabaseInitialized = true
  }
}

export async function POST(request: NextRequest) {
  try {
    // 确保数据库已初始化
    await ensureDatabaseInitialized()

    // 解析请求体
    const body = await request.json()

    // 验证表单数据
    const validation = validateDemandForm(body)
    if (!validation.success) {
      const error = handleValidationError(validation.errors || [])
      return NextResponse.json(
        formatErrorResponse(error),
        { status: 400 }
      )
    }

    // 转换数据格式
    const databaseData = transformFormDataToDatabase(validation.data!)

    // 获取Service Role客户端
    const supabaseAdmin = createAdminClient()

    // 检查邮箱是否已存在
    const { data: existingDemand } = await supabaseAdmin
      .from('demands')
      .select('id')
      .eq('email', databaseData.email)
      .single()

    if (existingDemand) {
      const error = handleDatabaseError({ code: '23505' })
      return NextResponse.json(
        formatErrorResponse(error),
        { status: 400 }
      )
    }

    // 插入数据到数据库
    const { data, error } = await supabaseAdmin
      .from('demands')
      .insert([databaseData])
      .select()
      .single()

    if (error) {
      const dbError = handleDatabaseError(error)
      return NextResponse.json(
        formatErrorResponse(dbError),
        { status: 500 }
      )
    }

    // 返回成功响应
    return NextResponse.json(
      { 
        success: true, 
        message: '需求提交成功！我们会尽快与您联系。',
        data: {
          id: data.id,
          email: data.email
        }
      },
      { status: 200 }
    )

  } catch (error) {
    const unknownError = handleUnknownError(error)
    return NextResponse.json(
      formatErrorResponse(unknownError),
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