// 国际化相关类型定义

// 支持的语言类型
export type Language = 'en' | 'zh'

// 语言上下文类型
export type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Header 模块类型
export type HeaderTranslations = {
  home: string
  features: string
  showcase: string
  demand: string
  startUsing: string
}

// Login 模块类型
export type LoginTranslations = {
  back: string
  welcomeBack: string
  chooseLoginMethod: string
  loginWithGitHub: string
  loginWithGoogle: string
  loggingIn: string
  loginDescription: string
  login: string
  logout: string
  secure: string
  fast: string
}

// Hero 模块类型
export type HeroTranslations = {
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  heroButton: string
  heroSubButton: string
  heroTechNote: string
  costReduction: string
  productionSpeed: string
  conversionIncrease: string
}

// Features 模块类型
export type FeatureCard = {
  title: string
  description: string
}

export type FeaturesTranslations = {
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
  feature1: FeatureCard
  feature2: FeatureCard
  feature3: FeatureCard
  feature4: FeatureCard
  feature5: FeatureCard
  feature6: FeatureCard
}

// Stats 模块类型
export type StatsTranslations = {
  stats: {
    cases: string
    industries: string
    satisfaction: string
    delivery: string
  }
}

// Tech Advantage 模块类型
export type TechAdvantageTranslations = {
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
}

// Showcase 模块类型
export type VideoSample = {
  title: string
  description: string
  category: string
}

export type ShowcaseTranslations = {
  showcaseTitle: string
  showcaseSubtitle: string
  video1: VideoSample
  video2: VideoSample
  video3: VideoSample
  video4: VideoSample
  video5: VideoSample
  video6: VideoSample
  showcaseCompliance: {
    title: string
    description: string
  }
  videoNotSupported: string
}

// Form 模块类型
export type FormOptions = {
  time: string
  skills: string
  cost: string
  quality: string
  other: string
}

export type BenefitsOptions = {
  efficiency: string
  quality: string
  cost: string
  time: string
  other: string
}

export type BudgetOptions = {
  low: string
  medium: string
  high: string
  enterprise: string
}

export type FormTranslations = {
  formTitle: string
  formSubtitle: string
  name: string
  email: string
  namePlaceholder: string
  emailPlaceholder: string
  challenges: string
  benefits: string
  budget: string
  interestInTrial: string
  trialYes: string
  trialNo: string
  submit: string
  submitting: string
  submitError: string
  otherChallengesPlaceholder: string
  otherBenefitsPlaceholder: string
  challengesOptions: FormOptions
  benefitsOptions: BenefitsOptions
  budgetOptions: BudgetOptions
}

// Footer 模块类型
export type FooterTranslations = {
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
}

// 完整的翻译键值类型
export type TranslationKeys = HeaderTranslations &
  LoginTranslations &
  HeroTranslations &
  FeaturesTranslations &
  StatsTranslations &
  TechAdvantageTranslations &
  ShowcaseTranslations &
  FormTranslations &
  FooterTranslations

// 翻译对象类型
export type Translations = {
  en: TranslationKeys
  zh: TranslationKeys
}

// 语言配置
export type LanguageConfig = {
  code: Language
  name: string
  nativeName: string
  flag: string
  direction: 'ltr' | 'rtl'
}

// 语言配置列表
export declare const LANGUAGE_CONFIGS: Record<Language, LanguageConfig>

// 默认语言
export declare const DEFAULT_LANGUAGE: Language

// 支持的语言列表
export declare const SUPPORTED_LANGUAGES: Language[] 