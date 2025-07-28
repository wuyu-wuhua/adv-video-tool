'use client'

import { Button } from '@/components/ui/button'
import { Video, Sparkles } from 'lucide-react'

export default function Header() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
            <Button variant="ghost" onClick={scrollToTop}>
              首页
            </Button>
            <Button variant="ghost" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              功能
            </Button>
            <Button variant="ghost" onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}>
              样本
            </Button>
            <Button variant="ghost" onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}>
              需求
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              开始使用
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 