'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import { Github, Chrome, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/i18n'

export default function LoginPanel() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loginProvider, setLoginProvider] = useState<string | null>(null)
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      if (data.user) router.replace('/')
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) router.replace('/')
    })
    return () => listener?.subscription.unsubscribe()
  }, [router])

  const handleOAuthLogin = async (provider: 'github' | 'google') => {
    setIsLoading(true)
    setLoginProvider(provider)
    
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: '/auth/callback'
        }
      })
      
      if (error) {
        console.error('OAuth login error:', error)
        setLoginProvider(null)
      }
    } catch (error) {
      console.error('Login error:', error)
      setLoginProvider(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-sm px-4">
        {/* 返回按钮 */}
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">{t('back')}</span>
        </button>

        {/* 登录卡片 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* 标题区域 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t('welcomeBack')}
            </h1>
            <p className="text-gray-600">
              {t('chooseLoginMethod')}
            </p>
          </div>

          {/* 登录按钮 */}
          <div className="space-y-4">
            {/* GitHub登录 */}
            <button
              onClick={() => handleOAuthLogin('github')}
              disabled={isLoading}
              className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center space-x-3 font-medium text-base ${
                isLoading && loginProvider === 'github'
                  ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-900 border-gray-900 text-white hover:bg-gray-800 hover:border-gray-800 hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              <Github className="w-6 h-6" />
              <span>
                {isLoading && loginProvider === 'github' 
                  ? t('loggingIn') 
                  : t('loginWithGitHub')
                }
              </span>
            </button>

            {/* Google登录 */}
            <button
              onClick={() => handleOAuthLogin('google')}
              disabled={isLoading}
              className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center space-x-3 font-medium text-base ${
                isLoading && loginProvider === 'google'
                  ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              <Chrome className="w-6 h-6" />
              <span>
                {isLoading && loginProvider === 'google' 
                  ? t('loggingIn') 
                  : t('loginWithGoogle')
                }
              </span>
            </button>
          </div>

          {/* 底部说明 */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              {t('loginDescription')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 