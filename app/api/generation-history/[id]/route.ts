// 获取单个生成记录 API
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/auth/middleware'
import { createServerSupabaseClient } from '@/lib/database/server'
import type { GenerationHistory } from '@/lib/database/types'

interface SingleHistoryResponse {
  success: boolean
  data?: GenerationHistory
  error?: string
}

// 获取单个生成记录
async function handleGetSingleHistory(
  request: NextRequest,
  user: { id: string; email: string },
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const generationId = params.id

    if (!generationId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Generation ID is required' 
        } as SingleHistoryResponse,
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from('generation_history')
      .select('*')
      .eq('id', generationId)
      .eq('user_id', user.id) // 确保用户只能访问自己的记录
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Generation record not found' 
          } as SingleHistoryResponse,
          { status: 404 }
        )
      }

      console.error('Failed to fetch generation record:', error)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to fetch generation record' 
        } as SingleHistoryResponse,
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data
    } as SingleHistoryResponse)

  } catch (error) {
    console.error('Single history API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Service error' 
      } as SingleHistoryResponse,
      { status: 500 }
    )
  }
}

// 删除生成记录
async function handleDeleteHistory(
  request: NextRequest,
  user: { id: string; email: string },
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const generationId = params.id

    if (!generationId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Generation ID is required' 
        },
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()

    // 首先检查记录是否存在且属于当前用户
    const { data: existingRecord, error: fetchError } = await supabase
      .from('generation_history')
      .select('id, user_id')
      .eq('id', generationId)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !existingRecord) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Generation record not found' 
        },
        { status: 404 }
      )
    }

    // 删除记录
    const { error: deleteError } = await supabase
      .from('generation_history')
      .delete()
      .eq('id', generationId)
      .eq('user_id', user.id)

    if (deleteError) {
      console.error('Failed to delete generation record:', deleteError)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to delete generation record' 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Generation record deleted successfully'
    })

  } catch (error) {
    console.error('Delete history API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Service error' 
      },
      { status: 500 }
    )
  }
}

// 包装处理函数以支持路由参数
function withParams(handler: (req: NextRequest, user: any, context: any) => Promise<NextResponse>) {
  return withAuth(async (req: NextRequest, user: any) => {
    const url = new URL(req.url)
    const pathSegments = url.pathname.split('/')
    const id = pathSegments[pathSegments.length - 1]
    
    return handler(req, user, { params: { id } })
  })
}

// 导出处理函数
export const GET = withParams(handleGetSingleHistory)
export const DELETE = withParams(handleDeleteHistory)

// 处理其他HTTP方法
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
