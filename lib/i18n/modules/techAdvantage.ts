import type { TechAdvantageTranslations } from '../types'

export const techAdvantageTranslations: Record<'en' | 'zh', TechAdvantageTranslations> = {
  en: {
    techAdvantage: {
      title: 'Technical Advantages',
      data: {
        title: 'Data Driven',
        description: 'Trained on millions of ad data points'
      },
      optimization: {
        title: 'Precise Optimization',
        description: 'Real-time optimization algorithms improve results'
      },
      security: {
        title: 'Safe & Reliable',
        description: 'Enterprise-grade security protection'
      }
    }
  },
  zh: {
    techAdvantage: {
      title: '技术优势',
      data: {
        title: '数据驱动',
        description: '基于数百万广告数据点训练'
      },
      optimization: {
        title: '精准优化',
        description: '实时优化算法提升效果'
      },
      security: {
        title: '安全可靠',
        description: '企业级安全防护'
      }
    }
  }
} 