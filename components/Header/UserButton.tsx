type UserButtonProps = {
  userInfo: {
    name: string
    avatar: string
  }
  showUserMenu: boolean
  onToggleMenu: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function UserButton({
  userInfo,
  showUserMenu,
  onToggleMenu,
  onMouseEnter,
  onMouseLeave
}: UserButtonProps) {
  return (
    <button
      onClick={onToggleMenu}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
  )
} 