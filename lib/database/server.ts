import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Cookie 选项类型（用于 Supabase SSR）
type CookieOptions = {
  name: string
  value: string
  options?: {
    domain?: string
    path?: string
    expires?: Date
    maxAge?: number
    secure?: boolean
    httpOnly?: boolean
    sameSite?: 'strict' | 'lax' | 'none'
  }
}

// 安全地获取环境变量
const getSupabaseUrl = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL
}

const getSupabaseAnonKey = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

// 创建服务器端客户端
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  const url = getSupabaseUrl()
  const anonKey = getSupabaseAnonKey()

  if (!url || !anonKey) {
    throw new Error('Supabase environment variables are not configured')
  }

  return createServerClient(
    url,
    anonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: CookieOptions[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      } as any, // 使用any类型断言解决@supabase/ssr版本兼容性问题
    },
  )
}

// 创建中间件客户端
export function createMiddlewareSupabaseClient(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const url = getSupabaseUrl()
  const anonKey = getSupabaseAnonKey()

  if (!url || !anonKey) {
    throw new Error('Supabase environment variables are not configured')
  }

  return {
    client: createServerClient(
      url,
      anonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet: CookieOptions[]) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            )
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options),
            )
          },
        } as any, // 使用any类型断言解决@supabase/ssr版本兼容性问题
      },
    ),
    response: supabaseResponse
  }
} 