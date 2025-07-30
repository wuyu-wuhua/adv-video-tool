import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

type UserMenuProps = {
  userInfo: {
    name: string
    avatar: string
    email: string
  }
  showUserMenu: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onSignOut: () => void
  t: (key: string) => string
}

export function UserMenu({
  userInfo,
  showUserMenu,
  onMouseEnter,
  onMouseLeave,
  onSignOut,
  t
}: UserMenuProps) {
  if (!showUserMenu) return null

  return (
    <div
      className="absolute right-0 mt-2 min-w-48 max-w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
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
        <Button
          variant="ghost"
          onClick={onSignOut}
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
        >
          <LogOut className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">{t('logout')}</span>
        </Button>
      </div>
    </div>
  )
} 