'use client'

import { 
  Zap, 
  DollarSign, 
  Clock, 
  Palette, 
  Target, 
  Shield, 
  Sparkles,
  BarChart3
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

export default function FeaturesSection() {
  const { t } = useLanguage()
  
  const features: Feature[] = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('feature1.title'),
      description: t('feature1.description'),
      color: "text-blue-600"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: t('feature2.title'),
      description: t('feature2.description'),
      color: "text-green-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t('feature3.title'),
      description: t('feature3.description'),
      color: "text-purple-600"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: t('feature4.title'),
      description: t('feature4.description'),
      color: "text-orange-600"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: t('feature5.title'),
      description: t('feature5.description'),
      color: "text-red-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('feature6.title'),
      description: t('feature6.description'),
      color: "text-indigo-600"
    }
  ]

  return (
    <section id="features" className="py-20 px-4 bg-white/50">
      <div className="container mx-auto">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            {t('featuresTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('featuresSubtitle')}
          </p>
        </div>

        {/* 功能网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 card-hover"
            >
              <div className={`${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* 统计数据 */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">500+</div>
            <div className="text-gray-600">{t('stats.cases')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">50+</div>
            <div className="text-gray-600">{t('stats.industries')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">99%</div>
            <div className="text-gray-600">{t('stats.satisfaction')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">24h</div>
            <div className="text-gray-600">{t('stats.delivery')}</div>
          </div>
        </div>

        {/* 技术优势 */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-800">{t('techAdvantage.title')}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">{t('techAdvantage.data.title')}</h4>
              <p className="text-gray-600 text-sm">{t('techAdvantage.data.description')}</p>
            </div>
            <div>
              <Target className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">{t('techAdvantage.optimization.title')}</h4>
              <p className="text-gray-600 text-sm">{t('techAdvantage.optimization.description')}</p>
            </div>
            <div>
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">{t('techAdvantage.security.title')}</h4>
              <p className="text-gray-600 text-sm">{t('techAdvantage.security.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 