'use client'

import { Button } from '@/components/ui/button'
import { Play, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

export default function HeroSection() {
  const { t } = useLanguage()
  
  const scrollToShowcase = () => {
    document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToForm = () => {
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="pt-24 pb-16 px-4">
      <div className="container mx-auto text-center">
        {/* 主标题 */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight">
          {t('heroTitle')}
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-700">
          {t('heroSubtitle')}
        </h2>
        
        {/* 副标题 */}
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          {t('heroDescription')}
        </p>

        {/* 核心数据 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-white/50 backdrop-blur-sm">
            <Zap className="w-8 h-8 text-blue-600" />
            <div className="text-left">
              <div className="text-2xl font-bold text-gray-800">90%</div>
              <div className="text-sm text-gray-600">{t('costReduction')}</div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-white/50 backdrop-blur-sm">
            <Target className="w-8 h-8 text-purple-600" />
            <div className="text-left">
              <div className="text-2xl font-bold text-gray-800">10x</div>
              <div className="text-sm text-gray-600">{t('productionSpeed')}</div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-white/50 backdrop-blur-sm">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div className="text-left">
              <div className="text-2xl font-bold text-gray-800">300%</div>
              <div className="text-sm text-gray-600">{t('conversionIncrease')}</div>
            </div>
          </div>
        </div>

        {/* CTA 按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
            onClick={scrollToShowcase}
          >
            <Play className="w-5 h-5 mr-2" />
            {t('heroButton')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-4 text-lg border-2"
            onClick={scrollToForm}
          >
            {t('submit')}
          </Button>
        </div>

        {/* 装饰元素 */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-gray-700 text-lg">
              {t('heroTechNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 