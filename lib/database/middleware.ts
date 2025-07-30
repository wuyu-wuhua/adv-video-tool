import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareSupabaseClient } from './server'

export async function updateSession(request: NextRequest) {
  const { client: supabase, response: supabaseResponse } = createMiddlewareSupabaseClient(request)

  // 检查环境变量
  const hasEnvVars = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // 如果环境变量未设置，跳过中间件检查
  if (!hasEnvVars) {
    return supabaseResponse
  }

  // 不要在此处运行代码，直接获取用户声明
  // 一个简单的错误可能会使调试用户随机登出的问题变得非常困难

  // 重要：如果您删除 getClaims() 并且使用 Supabase 客户端进行服务器端渲染，
  // 您的用户可能会随机登出
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims

  // 检查用户认证状态和路由保护
  if (
    request.nextUrl.pathname !== '/' &&
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    // 没有用户，可能需要重定向到登录页面
    // const url = request.nextUrl.clone()
    // url.pathname = '/auth/login'
    // return NextResponse.redirect(url)
  }

  // 重要：您必须返回 supabaseResponse 对象
  // 如果您使用 NextResponse.next() 创建新的响应对象，请确保：
  // 1. 在其中传递请求，如下所示：
  //    const myNewResponse = NextResponse.next({ request })
  // 2. 复制 cookie，如下所示：
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. 更改 myNewResponse 对象以满足您的需求，但避免更改 cookie！
  // 4. 最后：
  //    return myNewResponse
  // 如果不这样做，可能会导致浏览器和服务器不同步并过早终止用户的会话！

  return supabaseResponse
} 