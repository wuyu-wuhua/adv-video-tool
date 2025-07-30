import type { Translations } from './types'
import {
  headerTranslations,
  loginTranslations,
  heroTranslations,
  featuresTranslations,
  statsTranslations,
  techAdvantageTranslations,
  showcaseTranslations,
  formTranslations,
  footerTranslations
} from './modules'

// 合并所有翻译模块
export const translations: Translations = {
  en: {
    ...headerTranslations.en,
    ...loginTranslations.en,
    ...heroTranslations.en,
    ...featuresTranslations.en,
    ...statsTranslations.en,
    ...techAdvantageTranslations.en,
    ...showcaseTranslations.en,
    ...formTranslations.en,
    ...footerTranslations.en
  },
  zh: {
    ...headerTranslations.zh,
    ...loginTranslations.zh,
    ...heroTranslations.zh,
    ...featuresTranslations.zh,
    ...statsTranslations.zh,
    ...techAdvantageTranslations.zh,
    ...showcaseTranslations.zh,
    ...formTranslations.zh,
    ...footerTranslations.zh
  }
} 