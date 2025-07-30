'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/i18n'
import { createBrowserSupabaseClient } from '@/lib/database/client'
import type { User } from '@supabase/supabase-js'
import { Github, Chrome, ArrowLeft, Video, Sparkles, Shield, Zap, Star } from 'lucide-react'

export default function Login() {
  const { t } = useLanguage()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loginProvider, setLoginProvider] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createBrowserSupabaseClient()
    
    // 获取当前用户
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        if (user) router.replace('/')
      } catch (error) {
        console.error('Error getting user:', error)
      }
    }

    getUser()

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) router.replace('/')
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  const handleOAuthLogin = async (provider: 'github' | 'google') => {
    setIsLoading(true)
    setLoginProvider(provider)
    
    try {
      const supabase = createBrowserSupabaseClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
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

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在跳转...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* 左侧装饰区域 */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl float-animation" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* 浮动装饰元素 - 使用新的动画效果 */}
        <div className="absolute top-32 left-32 w-4 h-4 bg-blue-400 rounded-full decoration-dot-1"></div>
        <div className="absolute top-48 right-40 w-2 h-2 bg-purple-400 rounded-full decoration-dot-2"></div>
        <div className="absolute bottom-40 left-40 w-3 h-3 bg-pink-400 rounded-full decoration-dot-3"></div>
        <div className="absolute bottom-32 right-32 w-2 h-2 bg-indigo-400 rounded-full decoration-dot-4"></div>
        
        {/* 额外装饰点 */}
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-yellow-400 rounded-full decoration-dot-1" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-green-400 rounded-full decoration-dot-2" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-orange-400 rounded-full decoration-dot-3" style={{ animationDelay: '0.3s' }}></div>
        
        {/* 主要内容区域 */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-16">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl float-animation">
              <div className="flex items-center space-x-2">
                <Video className="w-10 h-10 text-white" />
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold gradient-text mb-6">
              AI Video Tool
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              专业的AI视频制作平台，让创意无限可能
            </p>
            
            {/* 特性展示 */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-800">安全可靠</h3>
                  <p className="text-gray-600">企业级安全保障</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-800">快速便捷</h3>
                  <p className="text-gray-600">一键生成专业视频</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-pink-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-800">智能创作</h3>
                  <p className="text-gray-600">AI驱动的创意工具</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧登录区域 */}
      <div className="flex-1 flex items-center justify-center px-8 lg:px-16">
        <div className="w-full max-w-md">
          {/* 返回按钮 */}
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-all duration-300 mb-8 group hover:scale-105 lg:hidden"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-base font-medium">{t('back')}</span>
          </button>

          {/* 登录卡片 */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl card-shadow border border-white/30 p-10">
            {/* 移动端标题 */}
            <div className="text-center mb-8 lg:hidden">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg float-animation">
                <div className="flex items-center space-x-1">
                  <Video className="w-8 h-8 text-white" />
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold gradient-text mb-3">
                {t('welcomeBack')}
              </h1>
              <p className="text-gray-600 text-base leading-relaxed">
                {t('chooseLoginMethod')}
              </p>
            </div>

            {/* 桌面端标题 */}
            <div className="text-center mb-8 hidden lg:block">
              <h1 className="text-4xl font-bold gradient-text mb-4">
                {t('welcomeBack')}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t('chooseLoginMethod')}
              </p>
            </div>

            {/* 登录按钮 */}
            <div className="space-y-6">
              {/* GitHub登录 */}
              <button
                onClick={() => handleOAuthLogin('github')}
                disabled={isLoading}
                className={`w-full px-8 py-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center space-x-4 font-medium text-lg login-button-hover ${
                  isLoading && loginProvider === 'github'
                    ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 border-gray-900 text-white hover:bg-gray-800 hover:border-gray-800'
                }`}
              >
                <Github className="w-7 h-7" />
                <span>
                  {isLoading && loginProvider === 'github' 
                    ? <span className="loading-dots">{t('loggingIn')}</span>
                    : t('loginWithGitHub')
                  }
                </span>
              </button>

              {/* Google登录 */}
              <button
                onClick={() => handleOAuthLogin('google')}
                disabled={isLoading}
                className={`w-full px-8 py-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center space-x-4 font-medium text-lg login-button-hover ${
                  isLoading && loginProvider === 'google'
                    ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                <Chrome className="w-7 h-7" />
                <span>
                  {isLoading && loginProvider === 'google' 
                    ? <span className="loading-dots">{t('loggingIn')}</span>
                    : t('loginWithGoogle')
                  }
                </span>
              </button>
            </div>

            {/* 底部说明 */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 leading-relaxed">
                {t('loginDescription')}
              </p>
            </div>
          </div>

          {/* 底部装饰 - 使用新的动画效果 */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full bottom-dot-1"></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full bottom-dot-2"></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full bottom-dot-3"></div>
            </div>
            <p className="text-sm text-gray-400 mt-3 font-medium">AI Video Tool</p>
          </div>
        </div>
      </div>
    </div>
  )
} 