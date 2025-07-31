// 获取生成历史 API
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/auth/middleware'
import { createServerSupabaseClient } from '@/lib/database/server'
import type { GenerationHistory } from '@/lib/database/types'

interface HistoryResponse {
  success: boolean
  data?: GenerationHistory[]
  total?: number
  error?: string
}

// 获取用户的生成历史
async function handleGetHistory(request: NextRequest, user: { id: string; email: string }): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // 验证分页参数
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid pagination parameters',
        } as HistoryResponse,
        { status: 400 },
      )
    }

    const supabase = await createServerSupabaseClient()

    // 构建查询并添加分页
    const offset = (page - 1) * limit
    const { data, error, count } = await supabase
      .from('generation_history')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Failed to fetch generation history:', error)
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch generation history',
        } as HistoryResponse,
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      total: count || 0,
    } as HistoryResponse)
  } catch (error) {
    console.error('History API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Service error',
      } as HistoryResponse,
      { status: 500 },
    )
  }
}

// 导出处理函数
export const GET = withAuth(handleGetHistory)

// 处理其他HTTP方法
export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
