'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

// 翻译文本定义
const translations = {
  en: {
    // Header
    home: 'Home',
    features: 'Features',
    showcase: 'Showcase',
    demand: 'Demand',
    startUsing: 'Get Started',
    
    // Hero Section
    heroTitle: 'AI-Powered Video Creation Tool',
    heroSubtitle: 'Transform your ideas into stunning videos with advanced AI technology',
    heroDescription: 'Say goodbye to high costs and low efficiency, let AI create exclusive ad videos for you, driving higher conversions!',
    heroButton: 'View Sample Videos',
    heroSubButton: 'Watch Demo',
    heroTechNote: '🚀 Based on Runway Gen-4 technology, generating high-quality video materials that comply with Google Ads specifications',
    
    // Features Section
    featuresTitle: 'Why Choose Our AI Video Tool?',
    featuresSubtitle: 'We solve all the pain points of traditional ad video production, letting you focus on business growth',
    aiGeneration: 'AI Generation',
    aiGenerationDesc: 'Generate videos from text descriptions using advanced AI',
    templates: 'Rich Templates',
    templatesDesc: 'Hundreds of professional templates to choose from',
    editing: 'Smart Editing',
    editingDesc: 'Intelligent editing tools for perfect results',
    export: 'High Quality Export',
    exportDesc: 'Export in multiple formats with high quality',
    
    // Feature Cards
    feature1: {
      title: 'High Conversion Materials',
      description: 'Data-driven AI algorithms generate high-conversion video materials that match user psychology'
    },
    feature2: {
      title: 'Cost Effectiveness',
      description: 'Compared to traditional video production, costs are reduced by 90% while maintaining professional quality'
    },
    feature3: {
      title: 'Rapid Iteration',
      description: 'From concept to finished product in just hours, supporting rapid A/B testing and optimization'
    },
    feature4: {
      title: 'Brand Consistency',
      description: 'Intelligently maintains brand tone and visual style, ensuring consistency across all materials'
    },
    feature5: {
      title: 'Precise Targeting',
      description: 'Automatically adjusts video style and content strategy based on target audience characteristics'
    },
    feature6: {
      title: 'Compliance Guarantee',
      description: 'Built-in Google Ads policy checking ensures all materials meet platform requirements'
    },
    
    // Stats
    stats: {
      cases: 'Success Cases',
      industries: 'Industries Covered',
      satisfaction: 'Client Satisfaction',
      delivery: 'Delivery Time'
    },
    
    // Tech Advantage
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
    },
    
    // Showcase Section
    showcaseTitle: 'High-Quality Video Sample Showcase',
    showcaseSubtitle: 'Diverse video materials generated based on Runway Gen-4 technology, meeting different advertising needs',
    
    // Video Samples
    video1: {
      title: 'E-commerce Product Showcase',
      description: 'Highlighting product features and usage scenarios, suitable for e-commerce platform promotion',
      category: 'E-commerce'
    },
    video2: {
      title: 'Brand Story Short',
      description: 'Telling brand philosophy and values, building emotional connections',
      category: 'Brand'
    },
    video3: {
      title: 'Promotional Campaign',
      description: 'Highlighting promotional information and urgency, stimulating user action',
      category: 'Promotion'
    },
    video4: {
      title: 'User Testimonial',
      description: 'Real users sharing usage experiences, enhancing trust',
      category: 'Testimonial'
    },
    video5: {
      title: 'Social Media Short Video',
      description: 'Vertical short video format suitable for various platform distribution',
      category: 'Social'
    },
    video6: {
      title: 'Animated Explanation',
      description: 'Visual explanation of complex concepts, easy to understand',
      category: 'Education'
    },
    
    // Showcase Compliance
    showcaseCompliance: {
      title: '🎬 All videos comply with Google Ads specifications',
      description: 'Our AI system automatically checks and ensures that generated video materials comply with Google Ads policy requirements, including content compliance, duration limits, format specifications, etc., so you don\'t have to worry about review issues.'
    },
    
    videoNotSupported: 'Your browser does not support video playback.',
    
    // Form Section
    formTitle: 'Tell Us Your Needs',
    formSubtitle: 'Fill out the form below and we will provide you with a personalized AI video solution',
    name: 'Name/Company Name',
    email: 'Email Address',
    namePlaceholder: 'Please enter your name or company name',
    emailPlaceholder: 'Please enter your email address',
    challenges: 'Current challenges you face (multiple choice)',
    videoTypes: 'Expected video types (multiple choice)',
    benefits: 'Expected AI solution advantages (multiple choice)',
    budget: 'For 15-30 second custom videos, what budget are you willing to pay?',
    interestInTrial: 'Are you willing to participate in a free trial or one-on-one interview?',
    trialYes: 'Yes, I am willing to participate in a free trial or one-on-one interview',
    trialNo: 'No, I just want to submit my requirements',
    submit: 'Submit Requirements',
    submitting: 'Submitting...',
    submitError: 'Submission failed, please try again later',
    
    // Form Placeholders
    otherChallengesPlaceholder: 'Please describe in detail the other challenges you face...',
    otherVideoTypesPlaceholder: 'Please describe the other video types you expect...',
    otherBenefitsPlaceholder: 'Please describe the other advantages you expect...',
    
    // Footer
    footerText: '© 2024 AI Video Tool. All rights reserved.',
    footerDescription: 'Revolutionizing ad video production through AI technology, enabling every brand to have professional-grade video materials.',
    madeWith: 'Made with',
    forCreators: 'for creators',
    quickLinks: 'Quick Links',
    contactUs: 'Contact Us',
    workingHours: 'Working hours: Monday to Friday 9:00-18:00',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy',
    
    // Hero Stats
    costReduction: 'Cost Reduction',
    productionSpeed: 'Production Speed',
    conversionIncrease: 'Conversion Increase',
    
    // Form Options
    challengesOptions: {
      time: 'Time consuming',
      skills: 'Lack of skills',
      cost: 'High cost',
      quality: 'Quality issues',
      other: 'Other'
    },
    videoTypesOptions: {
      marketing: 'Marketing videos',
      training: 'Training videos',
      entertainment: 'Entertainment',
      education: 'Educational content',
      other: 'Other'
    },
    benefitsOptions: {
      efficiency: 'Improve efficiency',
      quality: 'Better quality',
      cost: 'Reduce cost',
      time: 'Save time',
      other: 'Other'
    },
    budgetOptions: {
      low: 'Under $100',
      medium: '$100-$500',
      high: '$500-$1000',
      enterprise: 'Over $1000'
    }
  },
  zh: {
    // Header
    home: '首页',
    features: '功能',
    showcase: '样本',
    demand: '需求',
    startUsing: '开始使用',
    
    // Hero Section
    heroTitle: 'AI驱动的视频创作工具',
    heroSubtitle: '使用先进AI技术将您的想法转化为精彩视频',
    heroDescription: '告别高成本、低效率，让 AI 为您打造专属广告视频，驱动更高转化！',
    heroButton: '查看样本视频',
    heroSubButton: '观看演示',
    heroTechNote: '🚀 基于 Runway Gen-4 技术，生成符合谷歌广告规范的高质量视频素材',
    
    // Features Section
    featuresTitle: '为什么选择我们的 AI 视频工具？',
    featuresSubtitle: '我们解决了传统广告视频制作的所有痛点，让您专注于业务增长',
    aiGeneration: 'AI生成',
    aiGenerationDesc: '使用先进AI从文本描述生成视频',
    templates: '丰富模板',
    templatesDesc: '数百个专业模板供您选择',
    editing: '智能编辑',
    editingDesc: '智能编辑工具，获得完美效果',
    export: '高质量导出',
    exportDesc: '多种格式高质量导出',
    
    // Feature Cards
    feature1: {
      title: '高转化素材',
      description: '基于数据驱动的 AI 算法，生成符合用户心理的高转化率视频素材'
    },
    feature2: {
      title: '成本效益',
      description: '相比传统视频制作，成本降低 90%，同时保持专业品质'
    },
    feature3: {
      title: '极速迭代',
      description: '从创意到成品仅需数小时，支持快速 A/B 测试和优化'
    },
    feature4: {
      title: '品牌一致性',
      description: '智能保持品牌调性和视觉风格，确保所有素材的统一性'
    },
    feature5: {
      title: '精准定位',
      description: '根据目标受众特征，自动调整视频风格和内容策略'
    },
    feature6: {
      title: '合规保障',
      description: '内置谷歌广告政策检查，确保所有素材符合平台要求'
    },
    
    // Stats
    stats: {
      cases: '成功案例',
      industries: '行业覆盖',
      satisfaction: '客户满意度',
      delivery: '交付时间'
    },
    
    // Tech Advantage
    techAdvantage: {
      title: '技术优势',
      data: {
        title: '数据驱动',
        description: '基于百万级广告数据训练'
      },
      optimization: {
        title: '精准优化',
        description: '实时优化算法提升效果'
      },
      security: {
        title: '安全可靠',
        description: '企业级安全保障'
      }
    },
    
    // Showcase Section
    showcaseTitle: '高质量视频样本展示',
    showcaseSubtitle: '基于 Runway Gen-4 技术生成的多样化视频素材，满足不同广告需求',
    
    // Video Samples
    video1: {
      title: '电商产品展示',
      description: '突出产品特性和使用场景，适合电商平台推广',
      category: '电商'
    },
    video2: {
      title: '品牌故事短片',
      description: '讲述品牌理念和价值观，建立情感连接',
      category: '品牌'
    },
    video3: {
      title: '促销活动宣传',
      description: '突出优惠信息和限时性，刺激用户行动',
      category: '促销'
    },
    video4: {
      title: '用户证言视频',
      description: '真实用户分享使用体验，增强信任度',
      category: '证言'
    },
    video5: {
      title: '社交媒体短视频',
      description: '适合各平台传播的竖屏短视频格式',
      category: '社交'
    },
    video6: {
      title: '动画解释视频',
      description: '复杂概念的可视化解释，易于理解',
      category: '教育'
    },
    
    // Showcase Compliance
    showcaseCompliance: {
      title: '🎬 所有视频均符合谷歌广告规范',
      description: '我们的 AI 系统会自动检查并确保生成的视频素材符合谷歌广告政策要求，包括内容合规性、时长限制、格式规范等，让您无需担心审核问题。'
    },
    
    videoNotSupported: '您的浏览器不支持视频播放。',
    
    // Form Section
    formTitle: '告诉我们您的需求',
    formSubtitle: '填写以下表单，我们将为您提供个性化的 AI 视频解决方案',
    name: '姓名/公司名称',
    email: '邮箱地址',
    namePlaceholder: '请输入您的姓名或公司名称',
    emailPlaceholder: '请输入您的邮箱地址',
    challenges: '当前面临的挑战 (多选)',
    videoTypes: '期望的视频类型 (多选)',
    benefits: '期望的 AI 解决方案优势 (多选)',
    budget: '针对 15-30 秒定制视频，您愿意支付的预算？',
    interestInTrial: '是否愿意参与免费试用或一对一访谈？',
    trialYes: '是，我愿意参与免费试用或一对一访谈',
    trialNo: '否，我只想提交我的需求',
    submit: '提交需求',
    submitting: '提交中...',
    submitError: '提交失败，请稍后重试',
    
    // Form Placeholders
    otherChallengesPlaceholder: '请详细描述您面临的其他挑战...',
    otherVideoTypesPlaceholder: '请描述您期望的其他视频类型...',
    otherBenefitsPlaceholder: '请描述您期望的其他优势...',
    
    // Footer
    footerText: '© 2024 AI视频工具。保留所有权利。',
    footerDescription: '通过 AI 技术革新广告视频制作，让每个品牌都能拥有专业级的视频素材。',
    madeWith: 'Made with',
    forCreators: 'for creators',
    quickLinks: '快速链接',
    contactUs: '联系我们',
    workingHours: '工作时间：周一至周五 9:00-18:00',
    privacyPolicy: '隐私政策',
    termsOfService: '服务条款',
    cookiePolicy: 'Cookie 政策',
    
    // Hero Stats
    costReduction: '成本降低',
    productionSpeed: '制作速度',
    conversionIncrease: '转化提升',
    
    // Form Options
    challengesOptions: {
      time: '耗时',
      skills: '缺乏技能',
      cost: '成本高',
      quality: '质量问题',
      other: '其他'
    },
    videoTypesOptions: {
      marketing: '营销视频',
      training: '培训视频',
      entertainment: '娱乐',
      education: '教育内容',
      other: '其他'
    },
    benefitsOptions: {
      efficiency: '提高效率',
      quality: '更好质量',
      cost: '降低成本',
      time: '节省时间',
      other: '其他'
    },
    budgetOptions: {
      low: '100美元以下',
      medium: '100-500美元',
      high: '500-1000美元',
      enterprise: '1000美元以上'
    }
  }
}

// 语言上下文类型
interface LanguageContextType {
  language: 'en' | 'zh'
  setLanguage: (lang: 'en' | 'zh') => void
  t: (key: string) => string
}

// 创建语言上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 语言提供者组件
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'zh'>('en')

  // 翻译函数
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // 如果找不到翻译，返回原键
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// 使用语言上下文的Hook
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 