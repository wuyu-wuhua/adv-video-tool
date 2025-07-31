// 认证中间件
import { NextRequest, NextResponse } from 'next/server'
import { authenticateAPIRequest, type AuthenticatedUser, type AuthResult } from './api-auth'
import { createServerSupabaseClient } from '@/lib/database/server'

// 验证用户认证状态（使用新的API认证工具）
export async function authenticateUser(request: NextRequest): Promise<AuthResult> {
  return authenticateAPIRequest(request)
}

// 导出类型
export type { AuthenticatedUser, AuthResult }

// 认证守卫中间件
export function withAuth(handler: (request: NextRequest, user: AuthenticatedUser) => Promise<NextResponse>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const authResult = await authenticateUser(request)

    if (!authResult.success || !authResult.user) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: authResult.error || 'Authentication required',
        },
        { status: 401 },
      )
    }

    try {
      return await handler(request, authResult.user)
    } catch (error) {
      console.error('Handler error:', error)
      return NextResponse.json(
        {
          error: 'Internal Server Error',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 500 },
      )
    }
  }
}

// 检查用户是否有权限访问资源
export async function checkUserPermission(
  userId: string,
  resourceId: string,
  resourceType: 'generation_history' | 'uploaded_image',
): Promise<boolean> {
  try {
    const supabase = await createServerSupabaseClient()

    if (resourceType === 'generation_history') {
      const { data, error } = await supabase.from('generation_history').select('user_id').eq('id', resourceId).single()

      if (error || !data) {
        return false
      }

      return data.user_id === userId
    }

    // 可以扩展其他资源类型的权限检查
    return false
  } catch (error) {
    console.error('Permission check error:', error)
    return false
  }
}

// 获取用户信息（从数据库）
export async function getUserProfile(userId: string): Promise<AuthenticatedUser | null> {
  try {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase.from('users').select('id, email, name').eq('id', userId).single()

    if (error || !data) {
      return null
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
    }
  } catch (error) {
    console.error('Get user profile error:', error)
    return null
  }
}

// 创建或更新用户资料
export async function upsertUserProfile(user: AuthenticatedUser): Promise<boolean> {
  try {
    const supabase = await createServerSupabaseClient()

    const { error } = await supabase.from('users').upsert({
      id: user.id,
      email: user.email,
      name: user.name,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error('Upsert user profile error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Upsert user profile service error:', error)
    return false
  }
}

// 验证API密钥（如果需要）
export function validateApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key')
  const validApiKey = process.env.API_SECRET_KEY

  if (!validApiKey) {
    return true // 如果没有配置API密钥，则跳过验证
  }

  return apiKey === validApiKey
}

// 速率限制（简单实现）
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000, // 1分钟
): boolean {
  const now = Date.now()
  const windowStart = now - windowMs

  const current = rateLimitMap.get(identifier)

  if (!current || current.resetTime < windowStart) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now })
    return true
  }

  if (current.count >= maxRequests) {
    return false
  }

  current.count++
  return true
}

// 清理过期的速率限制记录
export function cleanupRateLimit(): void {
  const now = Date.now()
  const oneHourAgo = now - 3600000 // 1小时前

  const keysToDelete: string[] = []
  rateLimitMap.forEach((value, key) => {
    if (value.resetTime < oneHourAgo) {
      keysToDelete.push(key)
    }
  })

  keysToDelete.forEach(key => rateLimitMap.delete(key))
}

// 定期清理速率限制记录
setInterval(cleanupRateLimit, 300000) // 每5分钟清理一次
