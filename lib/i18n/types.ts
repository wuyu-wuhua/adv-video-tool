// 国际化相关类型定义

// 支持的语言类型
export type Language = 'en' | 'zh'

// 语言上下文类型
export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// 翻译键值类型
export interface TranslationKeys {
  // Header
  home: string
  features: string
  showcase: string
  demand: string
  startUsing: string

  // Hero Section
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  heroButton: string
  heroSubButton: string
  heroTechNote: string

  // Features Section
  featuresTitle: string
  featuresSubtitle: string
  aiGeneration: string
  aiGenerationDesc: string
  templates: string
  templatesDesc: string
  editing: string
  editingDesc: string
  export: string
  exportDesc: string

  // Feature Cards
  feature1: {
    title: string
    description: string
  }
  feature2: {
    title: string
    description: string
  }
  feature3: {
    title: string
    description: string
  }
  feature4: {
    title: string
    description: string
  }
  feature5: {
    title: string
    description: string
  }
  feature6: {
    title: string
    description: string
  }

  // Stats
  stats: {
    cases: string
    industries: string
    satisfaction: string
    delivery: string
  }

  // Tech Advantage
  techAdvantage: {
    title: string
    data: {
      title: string
      description: string
    }
    optimization: {
      title: string
      description: string
    }
    security: {
      title: string
      description: string
    }
  }

  // Showcase Section
  showcaseTitle: string
  showcaseSubtitle: string

  // Video Samples
  video1: {
    title: string
    description: string
    category: string
  }
  video2: {
    title: string
    description: string
    category: string
  }
  video3: {
    title: string
    description: string
    category: string
  }
  video4: {
    title: string
    description: string
    category: string
  }
  video5: {
    title: string
    description: string
    category: string
  }
  video6: {
    title: string
    description: string
    category: string
  }

  // Showcase Compliance
  showcaseCompliance: {
    title: string
    description: string
  }

  videoNotSupported: string

  // Form Section
  formTitle: string
  formSubtitle: string
  name: string
  email: string
  namePlaceholder: string
  emailPlaceholder: string
  challenges: string
  videoTypes: string
  benefits: string
  budget: string
  interestInTrial: string
  trialYes: string
  trialNo: string
  submit: string
  submitting: string
  submitError: string

  // Form Placeholders
  otherChallengesPlaceholder: string
  otherVideoTypesPlaceholder: string
  otherBenefitsPlaceholder: string

  // Footer
  footerText: string
  footerDescription: string
  madeWith: string
  forCreators: string
  quickLinks: string
  contactUs: string
  workingHours: string
  privacyPolicy: string
  termsOfService: string
  cookiePolicy: string

  // Hero Stats
  costReduction: string
  productionSpeed: string
  conversionIncrease: string

  // Form Options
  challengesOptions: {
    time: string
    skills: string
    cost: string
    quality: string
    other: string
  }
  videoTypesOptions: {
    marketing: string
    training: string
    entertainment: string
    education: string
    other: string
  }
  benefitsOptions: {
    efficiency: string
    quality: string
    cost: string
    time: string
    other: string
  }
  budgetOptions: {
    low: string
    medium: string
    high: string
    enterprise: string
  }
}

// 翻译对象类型
export interface Translations {
  en: TranslationKeys
  zh: TranslationKeys
}

// 语言配置
export interface LanguageConfig {
  code: Language
  name: string
  nativeName: string
  flag: string
  direction: 'ltr' | 'rtl'
}

// 语言配置列表
export const LANGUAGE_CONFIGS: Record<Language, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    direction: 'ltr'
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    direction: 'ltr'
  }
} as const

// 默认语言
export const DEFAULT_LANGUAGE: Language = 'en'

// 支持的语言列表
export const SUPPORTED_LANGUAGES: Language[] = ['en', 'zh'] 