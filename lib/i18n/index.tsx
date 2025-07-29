'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { LanguageContextType, Language, DEFAULT_LANGUAGE } from './types'
import { translations } from './translations'

// 创建语言上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 语言提供者组件
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE)

  // 翻译函数
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

  // 切换语言
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    
    // 更新HTML lang属性
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLanguage
    }
    
    // 保存到localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', newLanguage)
    }
  }

  // 初始化语言设置
  useState(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferred-language') as Language
      if (savedLanguage && ['en', 'zh'].includes(savedLanguage)) {
        setLanguage(savedLanguage)
        document.documentElement.lang = savedLanguage
      }
    }
  })

  const contextValue: LanguageContextType = {
    language,
    setLanguage: handleLanguageChange,
    t
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

// 使用语言的Hook
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// 导出翻译对象供直接使用
export { translations }

// 导出语言类型
export type { Language, LanguageContextType } from './types' 