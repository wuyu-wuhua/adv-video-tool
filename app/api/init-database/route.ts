import { NextResponse } from 'next/server'
import { initializeDatabase } from '@/lib/database/supabase'

export async function POST() {
  try {
    console.log('Starting database initialization...')
    const success = await initializeDatabase()
    
    if (success) {
      return NextResponse.json(
        { 
          success: true, 
          message: '数据库初始化成功，表已创建或已存在' 
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: '自动数据库初始化失败',
          instructions: '请参考 AUTO_INIT_SETUP.md 文件配置Service Role Key，或参考 DATABASE_SETUP.md 手动创建表'
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: '数据库初始化过程中发生错误',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
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