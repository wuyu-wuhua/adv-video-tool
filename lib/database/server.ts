import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// 安全地获取环境变量
const getSupabaseUrl = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL
}

const getSupabaseAnonKey = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

/**
 * 创建服务器端Supabase客户端
 * 用于：Server Components、API Routes、Server Actions
 * 特点：自动处理认证cookie，支持用户会话
 */
export async function createServerSupabaseClient() {
  const cookieStore = cookies()
  const url = getSupabaseUrl()
  const anonKey = getSupabaseAnonKey()

  if (!url || !anonKey) {
    throw new Error('Supabase environment variables are not configured')
  }

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set(name, value, options)
        } catch {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set(name, '', { ...options, maxAge: 0 })
        } catch {
          // The `remove` method was called from a Server Component.
        }
      },
    },
  })
}

/**
 * 创建中间件Supabase客户端
 * 用于：Next.js middleware
 * 特点：能够读取和设置cookies，用于会话管理和路由保护
 */
export function createMiddlewareSupabaseClient(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const url = getSupabaseUrl()
  const anonKey = getSupabaseAnonKey()

  if (!url || !anonKey) {
    throw new Error('Supabase environment variables are not configured')
  }

  return {
    client: createServerClient(url, anonKey, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set(name, value)
          supabaseResponse.cookies.set(name, value, options)
        },
        remove(name: string, _options: any) {
          request.cookies.delete(name)
          supabaseResponse.cookies.delete(name)
        },
      },
    }),
    response: supabaseResponse,
  }
}
