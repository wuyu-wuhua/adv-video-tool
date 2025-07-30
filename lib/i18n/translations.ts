import { headerTranslations } from './modules/header'
import { loginTranslations } from './modules/login'
import { heroTranslations } from './modules/hero'
import { featuresTranslations } from './modules/features'
import { statsTranslations } from './modules/stats'
import { techAdvantageTranslations } from './modules/techAdvantage'
import { showcaseTranslations } from './modules/showcase'
import { formTranslations } from './modules/form'
import { footerTranslations } from './modules/footer'
import { generatorTranslations } from './modules/generator'

export const translations = {
  en: {
    ...headerTranslations.en,
    ...loginTranslations.en,
    ...heroTranslations.en,
    ...featuresTranslations.en,
    ...statsTranslations.en,
    ...techAdvantageTranslations.en,
    ...showcaseTranslations.en,
    ...formTranslations.en,
    ...footerTranslations.en,
    ...generatorTranslations.en,
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
    ...footerTranslations.zh,
    ...generatorTranslations.zh,
  },
} 