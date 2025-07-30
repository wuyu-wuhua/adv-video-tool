# 国际化 (i18n) 系统

本项目使用模块化的国际化系统，支持中文和英文两种语言。

## 📁 文件结构

```
lib/i18n/
├── index.tsx          # 主要导出文件，包含 LanguageProvider 和 useLanguage hook
├── translations.ts    # 主翻译文件，合并所有模块翻译
├── types.d.ts         # TypeScript 类型定义
├── config.ts          # 配置常量
└── modules/           # 模块化翻译文件
    ├── index.ts       # 模块导出索引
    ├── header.ts      # Header 组件翻译
    ├── login.ts       # 登录页面翻译
    ├── hero.ts        # Hero 区域翻译
    ├── features.ts    # 功能特性翻译
    ├── generator.ts   # 生成器页面翻译
    └── ...
```

## 🚀 快速开始

### 1. 在组件中使用翻译

```tsx
import { useLanguage } from '@/lib/i18n'

export function MyComponent() {
  const { t, language, setLanguage } = useLanguage()
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <button onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}>
        {language === 'en' ? '中文' : 'English'}
      </button>
    </div>
  )
}
```

### 2. 创建新模块的翻译

#### 方法一：使用自动生成工具（推荐）

```bash
# 生成新模块的翻译文件
node scripts/generate-translations.js myNewModule
```

这将自动创建：
- `lib/i18n/modules/myNewModule.ts`
- 更新类型定义
- 更新模块索引
- 更新主翻译文件

#### 方法二：手动创建

1. **创建翻译文件** (`lib/i18n/modules/myModule.ts`)

```typescript
import type { MyModuleTranslations } from '../types'

export const myModuleTranslations: Record<'en' | 'zh', MyModuleTranslations> = {
  en: {
    title: 'My Module Title',
    description: 'Module description',
    button: 'Click me',
    placeholder: 'Enter text...',
    error: 'An error occurred'
  },
  zh: {
    title: '我的模块标题',
    description: '模块描述',
    button: '点击我',
    placeholder: '输入文本...',
    error: '发生错误'
  }
}
```

2. **添加类型定义** (`lib/i18n/types.d.ts`)

```typescript
export type MyModuleTranslations = {
  title: string
  description: string
  button: string
  placeholder: string
  error: string
}
```

3. **更新模块索引** (`lib/i18n/modules/index.ts`)

```typescript
export { myModuleTranslations } from './myModule'
```

4. **更新主翻译文件** (`lib/i18n/translations.ts`)

```typescript
import { myModuleTranslations } from './modules/myModule'

export const translations = {
  en: {
    // ... 其他翻译
    ...myModuleTranslations.en,
  },
  zh: {
    // ... 其他翻译
    ...myModuleTranslations.zh,
  },
}
```

## 📝 翻译键命名规范

### 基本规范
- 使用 camelCase 命名
- 使用描述性的键名
- 按功能分组

### 常见前缀
- `pageTitle` - 页面标题
- `pageDescription` - 页面描述
- `button` - 按钮文本
- `label` - 表单标签
- `placeholder` - 输入框占位符
- `error` - 错误信息
- `success` - 成功信息
- `loading` - 加载状态

### 示例
```typescript
{
  // 页面级别
  pageTitle: '页面标题',
  pageDescription: '页面描述',
  
  // 表单相关
  formTitle: '表单标题',
  submitButton: '提交',
  cancelButton: '取消',
  
  // 错误信息
  errorRequired: '此字段为必填项',
  errorInvalidEmail: '邮箱格式不正确',
  
  // 状态信息
  loadingText: '加载中...',
  successMessage: '操作成功',
}
```

## 🔧 高级用法

### 1. 动态翻译键

```tsx
const { t } = useLanguage()
const status = 'loading'

return <div>{t(`${status}Text`)}</div>
```

### 2. 条件翻译

```tsx
const { t, language } = useLanguage()

return (
  <div>
    {language === 'en' ? t('englishText') : t('chineseText')}
  </div>
)
```

### 3. 复数形式处理

```tsx
const { t } = useLanguage()
const count = 5

return (
  <div>
    {count === 1 ? t('singleItem') : t('multipleItems')}
  </div>
)
```

## 🌐 语言切换

### 在组件中切换语言

```tsx
import { useLanguage } from '@/lib/i18n'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  
  return (
    <button onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}>
      {language === 'en' ? '中文' : 'English'}
    </button>
  )
}
```

### 获取当前语言

```tsx
const { language } = useLanguage()

console.log('Current language:', language) // 'en' 或 'zh'
```

## 📋 最佳实践

### 1. 模块化组织
- 每个功能模块创建独立的翻译文件
- 使用描述性的模块名称
- 保持翻译键的一致性

### 2. 类型安全
- 始终定义 TypeScript 类型
- 使用类型检查确保翻译键存在
- 避免硬编码字符串

### 3. 维护性
- 定期检查未使用的翻译键
- 保持中英文翻译的一致性
- 使用有意义的键名

### 4. 性能优化
- 避免在渲染函数中创建翻译键
- 使用 useCallback 缓存翻译函数
- 合理使用条件渲染

## 🛠️ 工具和脚本

### 自动生成翻译文件
```bash
node scripts/generate-translations.js <模块名>
```

### 检查翻译完整性
```bash
# 可以添加脚本检查所有翻译键是否都有对应的翻译
```

## 🔍 调试

### 检查翻译键是否存在
```tsx
const { t } = useLanguage()

// 如果键不存在，会返回键名本身
console.log(t('nonExistentKey')) // 输出: 'nonExistentKey'
```

### 开发模式下的警告
在开发模式下，系统会在控制台显示缺失的翻译键。

## 📚 相关文件

- `lib/i18n/index.tsx` - 主要实现文件
- `lib/i18n/translations.ts` - 翻译合并文件
- `lib/i18n/types.d.ts` - 类型定义
- `lib/i18n/config.ts` - 配置常量
- `scripts/generate-translations.js` - 自动生成工具 