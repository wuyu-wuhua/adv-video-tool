# 数据库模块

## 概述

本模块整合了所有数据库相关的功能，包括 Supabase 客户端配置、数据库服务、类型定义和中间件。采用模块化设计，遵循项目的 TypeScript 规范，并严格分离客户端和服务器端代码。

## 文件结构

```
lib/database/
├── types.d.ts          # 类型定义文件（使用type替代interface）
├── config.ts           # 配置常量
├── client.ts           # 客户端Supabase配置（浏览器端）
├── server.ts           # 服务器端Supabase配置
├── services.ts         # 数据库业务逻辑
├── middleware.ts       # 认证中间件
├── index.ts           # 主索引文件
└── README.md          # 说明文档
```

## 模块说明

### 类型定义 (`types.d.ts`)
- 使用 `type` 替代 `interface`，符合项目规范
- 包含所有数据库相关的类型定义
- 支持泛型和联合类型

### 配置 (`config.ts`)
- 数据库表名常量
- Supabase 环境变量配置
- 数据库初始化 SQL 语句

### 客户端 (`client.ts`)
- **纯客户端代码**，不包含服务器端依赖
- 浏览器端客户端
- 管理员客户端（用于API路由）
- 统一的客户端获取函数

### 服务器端 (`server.ts`)
- **纯服务器端代码**，包含 `next/headers` 等服务器端依赖
- 服务器端客户端
- 中间件客户端
- Cookie 处理逻辑

### 服务 (`services.ts`)
- 数据库初始化逻辑
- 数据库服务类
- 业务逻辑封装

### 中间件 (`middleware.ts`)
- 认证会话管理
- 路由保护逻辑
- 用户状态检查

## 使用方法

### 1. 客户端使用（浏览器端）

```typescript
import { createBrowserSupabaseClient } from '@/lib/database/client'

// 浏览器端使用
const supabase = createBrowserSupabaseClient()
const { data, error } = await supabase.from('table').select('*')
```

### 2. 服务器端使用

```typescript
import { createServerSupabaseClient } from '@/lib/database/server'

// 服务器端使用
const supabase = await createServerSupabaseClient()
const { data, error } = await supabase.from('table').select('*')
```

### 3. API路由使用

```typescript
import { createAdminSupabaseClient } from '@/lib/database/client'

// API路由中使用管理员权限
const supabase = createAdminSupabaseClient()
const { data, error } = await supabase.from('table').select('*')
```

### 4. 数据库服务使用

```typescript
import { DatabaseService } from '@/lib/database/services'

const dbService = new DatabaseService()
const result = await dbService.insertDemand(demandData)
```

### 5. 中间件使用

```typescript
import { updateSession } from '@/lib/database/middleware'

// 在 Next.js 中间件中使用
export default updateSession
```

### 6. 类型使用

```typescript
import type { Demand, DatabaseResponse } from '@/lib/database/types'

const demand: Demand = {
  email: 'user@example.com',
  name: 'User Name'
}
```

## 重要说明

### 客户端/服务器端分离
- **`client.ts`**: 仅包含客户端代码，可在浏览器端安全使用
- **`server.ts`**: 包含服务器端代码，只能在服务器端使用
- 这种分离避免了 Next.js 的 "use client" 错误

### 导入规则
- 客户端组件 → 导入 `client.ts`
- 服务器端组件/API路由 → 导入 `server.ts`
- 中间件 → 导入 `middleware.ts`

## 特性

- ✅ 模块化设计，职责分离
- ✅ 客户端/服务器端代码严格分离
- ✅ 类型安全，完整的 TypeScript 支持
- ✅ 统一的客户端管理
- ✅ 错误处理和日志记录
- ✅ 环境变量配置
- ✅ 中间件集成
- ✅ 业务逻辑封装

## 最佳实践

1. **类型安全**: 始终使用类型定义，避免 `any` 类型
2. **错误处理**: 使用统一的错误处理机制
3. **环境变量**: 通过配置文件管理环境变量
4. **客户端选择**: 根据使用场景选择合适的客户端
5. **业务逻辑**: 将复杂的数据库操作封装在服务类中
6. **代码分离**: 严格区分客户端和服务器端代码

## 迁移说明

从旧的 `supabase` 和 `database` 文件夹迁移：

1. 所有 Supabase 客户端配置已分离为 `client.ts` 和 `server.ts`
2. 数据库业务逻辑已合并到 `services.ts`
3. 类型定义已优化并移动到 `types.d.ts`
4. 中间件功能已移动到 `middleware.ts`
5. 配置常量已移动到 `config.ts`

所有导入路径已更新，确保向后兼容性和正确的客户端/服务器端分离。 