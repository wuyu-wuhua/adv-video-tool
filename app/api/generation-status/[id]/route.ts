// 检查生成状态 API
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/auth/middleware'
import { createServerSupabaseClient } from '@/lib/database/server'

interface StatusResponse {
  success: boolean
  status?: 'pending' | 'processing' | 'completed' | 'failed'
  progress?: number
  message?: string
  error?: string
}

// 获取生成状态
async function handleGetStatus(
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
        } as StatusResponse,
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from('generation_history')
      .select('status, created_at, updated_at, generated_ad_urls')
      .eq('id', generationId)
      .eq('user_id', user.id) // 确保用户只能查看自己的记录
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Generation record not found' 
          } as StatusResponse,
          { status: 404 }
        )
      }

      console.error('Failed to fetch generation status:', error)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to fetch generation status' 
        } as StatusResponse,
        { status: 500 }
      )
    }

    // 计算进度
    let progress = 0
    let message = ''

    switch (data.status) {
      case 'pending':
        progress = 0
        message = 'Generation request received, waiting to start...'
        break
      case 'processing':
        progress = 50
        message = 'Generating ad materials...'
        break
      case 'completed':
        progress = 100
        message = `Generation completed successfully. ${data.generated_ad_urls?.length || 0} ads created.`
        break
      case 'failed':
        progress = 0
        message = 'Generation failed. Please try again.'
        break
      default:
        progress = 0
        message = 'Unknown status'
    }

    return NextResponse.json({
      success: true,
      status: data.status,
      progress,
      message
    } as StatusResponse)

  } catch (error) {
    console.error('Status API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Service error' 
      } as StatusResponse,
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
export const GET = withParams(handleGetStatus)

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

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
