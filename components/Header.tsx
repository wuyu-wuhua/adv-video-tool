'use client'

import { Button } from '@/components/ui/button'
import { Video, Sparkles, Globe } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'zh' : 'en'
    setLanguage(newLanguage)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-xl font-bold gradient-text hover:opacity-80 transition-opacity"
          >
            <Video className="w-8 h-8" />
            <span>AI Video Tool</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div suppressHydrationWarning>
              <Button variant="ghost" onClick={scrollToTop}>
                {t('home')}
              </Button>
            </div>
            <div suppressHydrationWarning>
              <Button variant="ghost" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                {t('features')}
              </Button>
            </div>
            <div suppressHydrationWarning>
              <Button variant="ghost" onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}>
                {t('showcase')}
              </Button>
            </div>
            <div suppressHydrationWarning>
              <Button variant="ghost" onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}>
                {t('demand')}
              </Button>
            </div>
            
            {/* 语言切换按钮 */}
            <div suppressHydrationWarning>
              <Button 
                variant="outline" 
                onClick={toggleLanguage}
                className="flex items-center space-x-1 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
                title={language === 'en' ? '切换到中文' : 'Switch to English'}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {language === 'en' ? 'EN' : '中'}
                </span>
              </Button>
            </div>
            
            <div suppressHydrationWarning>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                {t('startUsing')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 