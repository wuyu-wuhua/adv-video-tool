// API Routes专用认证工具
import { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export interface AuthenticatedUser {
  id: string
  email: string
  name?: string
}

export interface AuthResult {
  success: boolean
  user?: AuthenticatedUser
  error?: string
}

// 为API Routes创建专用的Supabase客户端
function createAPIRouteSupabaseClient(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error('Supabase environment variables are not configured')
  }

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set() {
        // 在API Routes中不设置cookies
      },
      remove() {
        // 在API Routes中不删除cookies
      },
    },
  })
}

// 从请求中验证用户认证
export async function authenticateAPIRequest(request: NextRequest): Promise<AuthResult> {
  try {
    // 获取所有cookies进行调试
    const allCookies = request.cookies.getAll()
    const authCookies = allCookies.filter(cookie => cookie.name.startsWith('sb-') && cookie.name.includes('auth-token'))

    // console.log('🔍 API Auth Debug:', {
    //   totalCookies: allCookies.length,
    //   authCookieCount: authCookies.length,
    //   authCookieNames: authCookies.map(c => c.name),
    //   hasAuthCookies: authCookies.length > 0,
    // })

    // 如果没有认证cookies，直接返回失败
    if (authCookies.length === 0) {
      console.log('❌ No auth cookies found')
      return {
        success: false,
        error: 'No authentication cookies found',
      }
    }

    // 创建Supabase客户端
    const supabase = createAPIRouteSupabaseClient(request)

    // 尝试获取用户信息
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    // console.log('🔍 Supabase auth result:', {
    //   hasUser: !!user,
    //   userId: user?.id,
    //   userEmail: user?.email,
    //   error: error?.message,
    //   errorCode: error?.status
    // })

    if (error) {
      console.log('❌ Supabase auth error:', error)

      // 特殊处理常见错误
      if (error.message?.includes('Auth session missing')) {
        return {
          success: false,
          error: 'Authentication session expired. Please log in again.',
        }
      }

      return {
        success: false,
        error: error.message || 'Authentication failed',
      }
    }

    if (!user) {
      console.log('❌ No user returned from Supabase')
      return {
        success: false,
        error: 'User not authenticated',
      }
    }

    console.log('✅ Authentication successful:', user.email)
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.name || user.user_metadata?.full_name,
      },
    }
  } catch (error) {
    console.error('❌ API authentication error:', error)
    return {
      success: false,
      error: 'Authentication service error',
    }
  }
}

// 手动解析JWT token（备用方案）
export function parseJWTToken(token: string): any {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format')
    }

    const payload = parts[1]
    const decoded = Buffer.from(payload, 'base64url').toString('utf8')
    return JSON.parse(decoded)
  } catch (error) {
    console.error('JWT parsing error:', error)
    return null
  }
}

// 从cookies中提取访问令牌
export function extractAccessTokenFromCookies(request: NextRequest): string | null {
  const allCookies = request.cookies.getAll()

  // 查找包含访问令牌的cookie
  for (const cookie of allCookies) {
    if (cookie.name.includes('auth-token') && cookie.value) {
      try {
        // Supabase通常将token存储为JSON
        const parsed = JSON.parse(cookie.value)
        if (parsed.access_token) {
          return parsed.access_token
        }
      } catch {
        // 如果不是JSON，可能直接是token
        if (cookie.value.length > 100) {
          // JWT通常很长
          return cookie.value
        }
      }
    }
  }

  return null
}

// 验证JWT token是否有效
export function validateJWTToken(token: string): boolean {
  try {
    const payload = parseJWTToken(token)
    if (!payload) return false

    // 检查是否过期
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp < now) {
      console.log('❌ JWT token expired')
      return false
    }

    return true
  } catch {
    return false
  }
}
