import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

type NavigationProps = {
  t: (key: string) => string
  onNavClick: (targetId: string) => void
  onScrollToTop: () => void
  onStartUsing: () => void
}

export function Navigation({ t, onNavClick, onScrollToTop, onStartUsing }: NavigationProps) {
  return (
    <div className="hidden lg:flex items-center space-x-4">
      <Button variant="ghost" onClick={onScrollToTop}>
        {t("home")}
      </Button>
      <Button variant="ghost" onClick={() => onNavClick("features")}>
        {t("features")}
      </Button>
      <Button variant="ghost" onClick={() => onNavClick("showcase")}>
        {t("showcase")}
      </Button>
      <Button variant="ghost" onClick={() => onNavClick("form")}>
        {t("demand")}
      </Button>
      <Button 
        onClick={onStartUsing}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        {t("startUsing")}
      </Button>
    </div>
  )
} 