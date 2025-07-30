import { createBrowserClient } from '@supabase/ssr'

// 安全地获取环境变量
const getSupabaseUrl = () => {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_SUPABASE_URL
  }
  return process.env.NEXT_PUBLIC_SUPABASE_URL
}

const getSupabaseAnonKey = () => {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  }
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

const getSupabaseServiceKey = () => {
  if (typeof window === 'undefined') {
    return process.env.SUPABASE_SERVICE_ROLE_KEY
  }
  return process.env.SUPABASE_SERVICE_ROLE_KEY
}

// 创建浏览器客户端
export function createBrowserSupabaseClient() {
  const url = getSupabaseUrl()
  const anonKey = getSupabaseAnonKey()
  
  if (!url || !anonKey) {
    throw new Error('Supabase environment variables are not configured')
  }
  return createBrowserClient(url, anonKey)
}

// 创建管理员客户端（用于API路由）
export function createAdminSupabaseClient() {
  const url = getSupabaseUrl()
  const serviceKey = getSupabaseServiceKey()
  
  if (!url || !serviceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured')
  }
  return createBrowserClient(url, serviceKey)
}

// 获取Supabase客户端（根据用途选择权限级别）
export function getSupabaseClient(useAdmin = false) {
  if (useAdmin) {
    return createAdminSupabaseClient()
  }
  return createBrowserSupabaseClient()
} 