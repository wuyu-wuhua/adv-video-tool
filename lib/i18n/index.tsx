'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Language, LanguageContextType } from './types'
import { translations } from './translations'
import { DEFAULT_LANGUAGE, LANGUAGE_CONFIGS, SUPPORTED_LANGUAGES } from './config'

// 创建语言上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 语言提供者组件
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE)

  // 从 localStorage 或浏览器语言设置中获取初始语言
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      setLanguage(savedLanguage)
    } else {
      // 尝试从浏览器语言设置中检测
      const browserLanguage = navigator.language.split('-')[0] as Language
      if (SUPPORTED_LANGUAGES.includes(browserLanguage)) {
        setLanguage(browserLanguage)
      }
    }
  }, [])

  // 语言切换函数
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  // 翻译函数 - 支持嵌套键值访问
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation key not found: ${key} for language: ${language}`)
        return key
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  const value: LanguageContextType = {
    language,
    setLanguage: handleLanguageChange,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// 使用语言上下文的 Hook
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// 导出类型和配置
export type { Language, LanguageContextType } from './types'
export { LANGUAGE_CONFIGS, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './config'
export { translations } 