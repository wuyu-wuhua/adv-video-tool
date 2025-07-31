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

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: CookieOptions[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    } as any, // 使用any类型断言解决@supabase/ssr版本兼容性问题
  })
}

// 创建API Routes专用的Supabase客户端
export function createAPISupabaseClient(request: NextRequest) {
  const url = getSupabaseUrl()
  const anonKey = getSupabaseAnonKey()

  if (!url || !anonKey) {
    throw new Error('Supabase environment variables are not configured')
  }

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        // 在API Routes中，我们不能直接设置cookies
        // 这些cookies需要在响应中设置
        console.log('🍪 Cookie to set:', name, value)
      },
      remove(name: string, options: any) {
        console.log('🍪 Cookie to remove:', name)
      },
    },
  })
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
    client: createServerClient(url, anonKey, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set(name, value)
          supabaseResponse.cookies.set(name, value, options)
        },
        remove(name: string, options: any) {
          request.cookies.delete(name)
          supabaseResponse.cookies.delete(name)
        },
      },
    }),
    response: supabaseResponse,
  }
}
