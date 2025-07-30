"use client";

import { Button } from "@/components/ui/button";
import { Video, Sparkles, Globe, User, LogOut } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useUser } from "@/lib/hooks/useUser";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { user, loading, signOut } = useUser();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "zh" : "en";
    setLanguage(newLanguage);
  };

  const handleNavClick = (targetId: string) => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    window.location.reload(); // 刷新页面
  };

  // 获取用户显示信息
  const getUserDisplayInfo = () => {
    if (!user) return { name: "", avatar: "", email: "" };

    // 优先使用用户元数据中的信息
    const userMetadata = user.user_metadata || {};
    const name =
      userMetadata.full_name ||
      userMetadata.name ||
      userMetadata.display_name ||
      userMetadata.user_name ||
      user.email?.split("@")[0] ||
      "用户";

    const avatar =
      userMetadata.avatar_url ||
      userMetadata.picture ||
      userMetadata.avatar ||
      "";

    return {
      name,
      avatar,
      email: user.email || "",
    };
  };

  // 点击外部关闭用户菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userInfo = getUserDisplayInfo();
  
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

          {/* 中间导航按钮 - 桌面版 */}
          <div className="hidden lg:flex items-center space-x-4">
            <div suppressHydrationWarning>
              <Button variant="ghost" onClick={scrollToTop}>
                {t("home")}
              </Button>
            </div>
            <div suppressHydrationWarning>
              <Button
                variant="ghost"
                onClick={() => handleNavClick("features")}
              >
                {t("features")}
              </Button>
            </div>
            <div suppressHydrationWarning>
              <Button
                variant="ghost"
                onClick={() => handleNavClick("showcase")}
              >
                {t("showcase")}
              </Button>
            </div>
            <div suppressHydrationWarning>
              <Button variant="ghost" onClick={() => handleNavClick("form")}>
                {t("demand")}
              </Button>
            </div>
            <div suppressHydrationWarning>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
                <Sparkles className="w-4 h-4 mr-2" />
                {t("startUsing")}
              </Button>
            </div>
          </div>

          {/* 右侧功能区域 */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* 语言切换按钮 */}
            <div suppressHydrationWarning>
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
            </div>

            {/* 用户状态 */}
            {!loading && (
              <>
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      {userInfo.avatar ? (
                        <img
                          src={userInfo.avatar}
                          alt={userInfo.name}
                          className="w-8 h-8 rounded-full object-cover shadow-md border-2 border-white"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white text-sm font-medium">
                            {userInfo.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-700 hidden md:block">
                        {userInfo.name}
                      </span>
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 min-w-48 max-w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="flex items-center space-x-3">
                            {userInfo.avatar ? (
                              <img
                                src={userInfo.avatar}
                                alt={userInfo.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-lg font-medium">
                                  {userInfo.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {userInfo.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {userInfo.email}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="px-2 py-1">
                          <div suppressHydrationWarning>
                            <Button
                              variant="ghost"
                              onClick={handleSignOut}
                              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
                            >
                              <LogOut className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="truncate">{t('logout')}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div suppressHydrationWarning>
                    <Button
                      variant="outline"
                      onClick={handleLogin}
                      className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <User className="w-4 h-4" />
                      <span>{t('login')}</span>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* 移动端菜单 */}
        <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
          <div className="flex flex-col space-y-2 pt-4">
            <div suppressHydrationWarning>
              <Button
                variant="ghost"
                onClick={scrollToTop}
                className="justify-start"
              >
                {t("home")}
              </Button>
            </div>
            <div suppressHydrationWarning>
              <Button
                variant="ghost"
                onClick={() => handleNavClick("features")}
                className="justify-start"
              >
                {t("features")}
              </Button>
            </div>
            <div suppressHydrationWarning>
              <Button
                variant="ghost"
                onClick={() => handleNavClick("showcase")}
                className="justify-start"
              >
                {t("showcase")}
              </Button>
            </div>
            <div suppressHydrationWarning>
              <Button
                variant="ghost"
                onClick={() => handleNavClick("form")}
                className="justify-start"
              >
                {t("demand")}
              </Button>
            </div>
            <div suppressHydrationWarning>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white justify-start shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                {t("startUsing")}
              </Button>
            </div>

            {/* 移动端登录按钮 */}
            {!loading && !user && (
              <div className="pt-2 border-t border-gray-200">
                <div suppressHydrationWarning>
                  <Button
                    variant="outline"
                    onClick={handleLogin}
                    className="w-full justify-start bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {t('login')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
