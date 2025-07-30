import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/i18n'
import { useUser } from '@/lib/hooks/useUser'
import { createBrowserSupabaseClient } from '@/lib/database/client'

export function useHeader() {
  const { language, setLanguage, t } = useLanguage()
  const { user, loading } = useUser()
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // 滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 切换语言
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'zh' : 'en'
    setLanguage(newLanguage)
  }

  // 导航到指定区域
  const handleNavClick = (targetId: string) => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  // 跳转到登录页
  const handleLogin = () => {
    router.push('/login')
  }

  // 登出
  const handleSignOut = async () => {
    try {
      const supabase = createBrowserSupabaseClient()
      await supabase.auth.signOut()
      setShowUserMenu(false)
      setIsHovering(false)
      window.location.reload()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  // 获取用户显示信息
  const getUserDisplayInfo = () => {
    if (!user) return { name: '', avatar: '', email: '' }

    const userMetadata = user.user_metadata || {}
    const name =
      userMetadata.full_name ||
      userMetadata.name ||
      userMetadata.display_name ||
      userMetadata.user_name ||
      user.email?.split('@')[0] ||
      '用户'

    const avatar =
      userMetadata.avatar_url ||
      userMetadata.picture ||
      userMetadata.avatar ||
      ''

    return {
      name,
      avatar,
      email: user.email || '',
    }
  }

  // 处理鼠标悬停
  const handleMouseEnter = () => {
    setIsHovering(true)
    setShowUserMenu(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setTimeout(() => {
      if (!isHovering) {
        setShowUserMenu(false)
      }
    }, 150)
  }

  // 处理菜单鼠标悬停
  const handleMenuMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMenuMouseLeave = () => {
    setIsHovering(false)
    setShowUserMenu(false)
  }

  // 点击外部关闭菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false)
        setIsHovering(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return {
    // 状态
    user,
    loading,
    language,
    showUserMenu,
    userMenuRef,
    
    // 用户信息
    userInfo: getUserDisplayInfo(),
    
    // 方法
    t,
    scrollToTop,
    toggleLanguage,
    handleNavClick,
    handleLogin,
    handleSignOut,
    handleMouseEnter,
    handleMouseLeave,
    handleMenuMouseEnter,
    handleMenuMouseLeave,
  }
} 