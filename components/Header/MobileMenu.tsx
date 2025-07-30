import { Button } from "@/components/ui/button"
import { Sparkles, User } from "lucide-react"

type MobileMenuProps = {
  t: (key: string) => string
  onNavClick: (targetId: string) => void
  onScrollToTop: () => void
  onLogin: () => void
  user: any
  loading: boolean
}

export function MobileMenu({
  t,
  onNavClick,
  onScrollToTop,
  onLogin,
  user,
  loading
}: MobileMenuProps) {
  return (
    <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
      <div className="flex flex-col space-y-2 pt-4">
        <Button variant="ghost" onClick={onScrollToTop} className="justify-start">
          {t("home")}
        </Button>
        <Button
          variant="ghost"
          onClick={() => onNavClick("features")}
          className="justify-start"
        >
          {t("features")}
        </Button>
        <Button
          variant="ghost"
          onClick={() => onNavClick("showcase")}
          className="justify-start"
        >
          {t("showcase")}
        </Button>
        <Button
          variant="ghost"
          onClick={() => onNavClick("form")}
          className="justify-start"
        >
          {t("demand")}
        </Button>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white justify-start shadow-lg">
          <Sparkles className="w-4 h-4 mr-2" />
          {t("startUsing")}
        </Button>

        {/* 移动端登录按钮 */}
        {!loading && !user && (
          <div className="pt-2 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={onLogin}
              className="w-full justify-start bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800"
            >
              <User className="w-4 h-4 mr-2" />
              {t('login')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 