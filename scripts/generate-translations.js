#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

/**
 * 自动生成翻译文件的工具
 * 使用方法: node scripts/generate-translations.js <模块名>
 * 例如: node scripts/generate-translations.js newModule
 */

const moduleName = process.argv[2]

if (!moduleName) {
  console.error('请提供模块名称')
  console.log('使用方法: node scripts/generate-translations.js <模块名>')
  process.exit(1)
}

// 翻译模板
const translationTemplate = (moduleName, translations) => `import type { ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Translations } from '../types'

export const ${moduleName}Translations: Record<'en' | 'zh', ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Translations> = {
  en: {
${translations.map(key => `    ${key}: '${key}',`).join('\n')}
  },
  zh: {
${translations.map(key => `    ${key}: '${key}',`).join('\n')}
  }
}
`

// 类型定义模板
const typeTemplate = (moduleName, translations) => `export type ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Translations = {
${translations.map(key => `  ${key}: string`).join('\n')}
}
`

// 生成翻译文件
function generateTranslations() {
  const moduleDir = path.join(__dirname, '../lib/i18n/modules')
  const typesFile = path.join(__dirname, '../lib/i18n/types.d.ts')
  
  // 检查模块目录是否存在
  if (!fs.existsSync(moduleDir)) {
    fs.mkdirSync(moduleDir, { recursive: true })
  }
  
  // 生成翻译文件
  const translationFile = path.join(moduleDir, `${moduleName}.ts`)
  const translations = [
    'title',
    'description',
    'button',
    'placeholder',
    'label',
    'error',
    'success',
    'loading'
  ]
  
  const translationContent = translationTemplate(moduleName, translations)
  fs.writeFileSync(translationFile, translationContent)
  
  // 更新类型定义文件
  const typeContent = typeTemplate(moduleName, translations)
  const typesContent = fs.readFileSync(typesFile, 'utf8')
  const updatedTypesContent = typesContent + '\n' + typeContent
  fs.writeFileSync(typesFile, updatedTypesContent)
  
  // 更新模块索引文件
  const indexFile = path.join(moduleDir, 'index.ts')
  const indexContent = fs.readFileSync(indexFile, 'utf8')
  const newExport = `export { ${moduleName}Translations } from './${moduleName}'`
  const updatedIndexContent = indexContent + '\n' + newExport
  fs.writeFileSync(indexFile, updatedIndexContent)
  
  // 更新主翻译文件
  const mainTranslationFile = path.join(__dirname, '../lib/i18n/translations.ts')
  let mainContent = fs.readFileSync(mainTranslationFile, 'utf8')
  
  // 添加导入
  const importLine = `import { ${moduleName}Translations } from './modules/${moduleName}'`
  const importIndex = mainContent.indexOf('import { footerTranslations }')
  if (importIndex !== -1) {
    mainContent = mainContent.slice(0, importIndex) + importLine + '\n' + mainContent.slice(importIndex)
  }
  
  // 添加到翻译对象
  const enIndex = mainContent.indexOf('...footerTranslations.en,')
  const zhIndex = mainContent.indexOf('...footerTranslations.zh,')
  
  if (enIndex !== -1) {
    mainContent = mainContent.slice(0, enIndex) + '...footerTranslations.en,\n    ...' + moduleName + 'Translations.en,' + mainContent.slice(enIndex + '...footerTranslations.en,'.length)
  }
  
  if (zhIndex !== -1) {
    mainContent = mainContent.slice(0, zhIndex) + '...footerTranslations.zh,\n    ...' + moduleName + 'Translations.zh,' + mainContent.slice(zhIndex + '...footerTranslations.zh,'.length)
  }
  
  fs.writeFileSync(mainTranslationFile, mainContent)
  
  console.log(`✅ 成功生成 ${moduleName} 模块的翻译文件`)
  console.log(`📁 翻译文件: lib/i18n/modules/${moduleName}.ts`)
  console.log(`📝 类型定义已添加到: lib/i18n/types.d.ts`)
  console.log(`🔗 模块索引已更新: lib/i18n/modules/index.ts`)
  console.log(`🌐 主翻译文件已更新: lib/i18n/translations.ts`)
  console.log('\n📋 下一步:')
  console.log(`1. 编辑 lib/i18n/modules/${moduleName}.ts 添加具体翻译内容`)
  console.log(`2. 在组件中使用 useLanguage hook 获取翻译`)
  console.log(`3. 使用 t('key') 获取翻译文本`)
}

// 运行生成器
try {
  generateTranslations()
} catch (error) {
  console.error('❌ 生成翻译文件时出错:', error.message)
  process.exit(1)
} 