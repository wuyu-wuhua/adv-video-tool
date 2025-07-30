import type { Language, LanguageConfig } from './types'

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