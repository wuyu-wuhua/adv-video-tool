# 国际化 (i18n) 模块化翻译系统

## 概述

本项目采用模块化的翻译文件结构，将翻译内容按功能模块拆分，提高代码的可维护性和可扩展性。

## 文件结构

```
lib/i18n/
├── types.d.ts          # 类型定义文件
├── config.ts           # 语言配置常量
├── translations.ts     # 主翻译文件（合并所有模块）
├── index.tsx          # 语言上下文和Hook
└── modules/           # 翻译模块目录
    ├── index.ts       # 模块导出索引
    ├── header.ts      # 头部导航翻译
    ├── login.ts       # 登录相关翻译
    ├── hero.ts        # 主页横幅翻译
    ├── features.ts    # 功能特性翻译
    ├── stats.ts       # 统计数据翻译
    ├── techAdvantage.ts # 技术优势翻译
    ├── showcase.ts    # 展示案例翻译
    ├── form.ts        # 表单相关翻译
    └── footer.ts      # 页脚翻译
```

## 类型系统

- 使用 `type` 替代 `interface`，符合项目规范
- 每个模块都有独立的类型定义
- 支持嵌套对象和复杂数据结构
- 类型安全的翻译键访问

## 使用方法

### 1. 在组件中使用翻译

```tsx
import { useLanguage } from '@/lib/i18n'

export default function MyComponent() {
  const { t, language, setLanguage } = useLanguage()
  
  return (
    <div>
      <h1>{t('heroTitle')}</h1>
      <p>{t('heroDescription')}</p>
      
      {/* 嵌套键值访问 */}
      <div>{t('feature1.title')}</div>
      <div>{t('feature1.description')}</div>
    </div>
  )
}
```

### 2. 添加新的翻译模块

1. 在 `modules/` 目录下创建新的翻译文件
2. 在 `types.d.ts` 中添加对应的类型定义
3. 在 `modules/index.ts` 中导出新模块
4. 在 `translations.ts` 中合并新模块

### 3. 添加新的语言支持

1. 在 `types.d.ts` 中更新 `Language` 类型
2. 在 `config.ts` 中添加语言配置
3. 在所有翻译模块中添加新语言的翻译内容

## 特性

- ✅ 模块化结构，易于维护
- ✅ 类型安全，支持TypeScript
- ✅ 支持嵌套键值访问
- ✅ 自动语言检测
- ✅ 本地存储持久化
- ✅ 浏览器语言偏好检测

## 最佳实践

1. **模块化**: 按功能模块拆分翻译文件
2. **类型安全**: 使用TypeScript类型定义
3. **命名规范**: 使用描述性的键名
4. **嵌套结构**: 合理使用嵌套对象组织翻译
5. **一致性**: 保持翻译键的命名一致性 