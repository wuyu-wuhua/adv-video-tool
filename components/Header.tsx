"use client"

import { Button } from "@/components/ui/button"
import { Video, Globe, User } from "lucide-react"
import { useHeader } from "@/lib/hooks/useHeader"
import { UserMenu } from "./Header/UserMenu"
import { UserButton } from "./Header/UserButton"
import { Navigation } from "./Header/Navigation"
import { MobileMenu } from "./Header/MobileMenu"

export default function Header() {
  const {
    user,
    loading,
    language,
    showUserMenu,
    userMenuRef,
    userInfo,
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
  } = useHeader()

  // 跳转到生成器页面
  const handleStartUsing = () => {
    window.location.href = '/generator'
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-xl font-bold gradient-text hover:opacity-80 transition-opacity"
          >
            <Video className="w-8 h-8" />
            <span className="hidden sm:block">AI Tool</span>
            <span className="sm:hidden">AI Tool</span>
          </button>

          {/* 桌面端导航 */}
          <Navigation
            t={t}
            onNavClick={handleNavClick}
            onScrollToTop={scrollToTop}
            onStartUsing={handleStartUsing}
          />

          {/* 右侧功能区域 */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* 语言切换按钮 */}
            <Button
              variant="outline"
              onClick={toggleLanguage}
              className="flex items-center space-x-1 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
              title={language === "en" ? "切换到中文" : "Switch to English"}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:block">
                {language === "en" ? "EN" : "中"}
              </span>
            </Button>

            {/* 用户状态 */}
            {!loading && (
              <>
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <UserButton
                      userInfo={userInfo}
                      showUserMenu={showUserMenu}
                      onToggleMenu={() => showUserMenu ? handleMenuMouseLeave() : handleMouseEnter()}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    />
                    <UserMenu
                      userInfo={userInfo}
                      showUserMenu={showUserMenu}
                      onMouseEnter={handleMenuMouseEnter}
                      onMouseLeave={handleMenuMouseLeave}
                      onSignOut={handleSignOut}
                      t={t}
                    />
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handleLogin}
                    className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <User className="w-4 h-4" />
                    <span>{t('login')}</span>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        {/* 移动端菜单 */}
        <MobileMenu
          t={t}
          onNavClick={handleNavClick}
          onScrollToTop={scrollToTop}
          onLogin={handleLogin}
          onStartUsing={handleStartUsing}
          user={user}
          loading={loading}
        />
      </div>
    </header>
  )
}
