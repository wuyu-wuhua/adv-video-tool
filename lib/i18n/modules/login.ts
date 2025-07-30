import type { LoginTranslations } from '../types'

export const loginTranslations: Record<'en' | 'zh', LoginTranslations> = {
  en: {
    back: 'Back',
    welcomeBack: 'Welcome Back',
    chooseLoginMethod: 'Choose your login method',
    loginWithGitHub: 'Continue with GitHub',
    loginWithGoogle: 'Continue with Google',
    loggingIn: 'Logging in...',
    loginDescription: 'Secure login with your preferred account',
    login: 'Login',
    logout: 'Logout',
    secure: 'Secure & Reliable',
    fast: 'Fast & Convenient'
  },
  zh: {
    back: '返回',
    welcomeBack: '欢迎回来',
    chooseLoginMethod: '选择登录方式',
    loginWithGitHub: '使用 GitHub 登录',
    loginWithGoogle: '使用 Google 登录',
    loggingIn: '登录中...',
    loginDescription: '使用您偏好的账户安全登录',
    login: '登录',
    logout: '退出登录',
    secure: '安全可靠',
    fast: '快速便捷'
  }
} 