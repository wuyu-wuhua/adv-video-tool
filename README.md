# AI 广告视频素材验证工具 (PoC)

一个基于 AI 技术的广告视频素材生成工具，通过 Runway Gen-4 技术自动生成符合谷歌广告需求的高质量视频素材。

## 🚀 项目特性

- **AI 驱动**: 基于 Runway Gen-4 技术生成高质量视频
- **合规保障**: 自动检查谷歌广告政策要求
- **成本效益**: 相比传统制作成本降低 90%
- **极速迭代**: 从创意到成品仅需数小时
- **品牌一致**: 智能保持品牌调性和视觉风格
- **精准定位**: 根据目标受众自动调整内容策略

## 🛠️ 技术栈

- **前端**: Next.js 14 + TypeScript + React
- **样式**: Tailwind CSS + Shadcn UI
- **图标**: Lucide React
- **数据库**: Supabase (PostgreSQL + Auth + Edge Functions)
- **部署**: Vercel
- **AI 视频生成**: RunwayML Gen-4 (手动操作)

## 📦 安装和运行

### 前置要求

- Node.js 18+ 
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发环境运行

```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

## 🏗️ 项目结构

```
video-tool/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── components/            # React 组件
│   ├── ui/               # Shadcn UI 组件
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── checkbox.tsx
│   │   ├── radio-group.tsx
│   │   └── label.tsx
│   ├── Header.tsx        # 导航栏
│   ├── HeroSection.tsx   # 主视觉区
│   ├── FeaturesSection.tsx # 功能介绍
│   ├── VideoShowcase.tsx # 视频展示
│   ├── DemandForm.tsx    # 需求表单
│   └── Footer.tsx        # 页脚
├── lib/                  # 工具函数
│   └── utils.ts
├── public/              # 静态资源
└── package.json
```

## 🎯 功能模块

### FR-FE-001: 导航栏 (Header)
- 固定顶部导航
- 品牌 Logo 和名称
- 平滑滚动导航
- 响应式设计

### FR-FE-002: 主视觉区 (Hero Section)
- 引人注目的标题和副标题
- 核心价值主张
- 关键数据展示
- CTA 按钮

### FR-FE-003: 产品概念介绍区 (Features Section)
- 6 大核心功能特性
- 统计数据展示
- 技术优势说明
- 卡片式布局

### FR-FE-004: 样本视频展示区 (Video Showcase)
- 6 个视频样本展示
- 视频播放控制
- 分类标签
- 响应式网格布局

### FR-FE-005: 用户需求收集表单区 (Demand Form)
- 完整的表单字段
- 多选和单选组件
- 表单验证
- 提交状态反馈

### FR-FE-006: 页脚 (Footer)
- 品牌信息
- 快速链接
- 联系方式
- 版权信息

## 🔧 开发指南

### 添加新组件

1. 在 `components/` 目录下创建新组件文件
2. 使用 TypeScript 接口定义 props
3. 遵循 Shadcn UI 设计规范
4. 添加适当的 JSDoc 注释

### 样式指南

- 使用 Tailwind CSS 类名
- 遵循移动优先的响应式设计
- 使用 CSS 变量定义主题色彩
- 保持组件样式的一致性

### 状态管理

- 使用 React hooks 管理本地状态
- 表单状态使用 useState
- 复杂状态考虑使用 useReducer
- 避免过度使用全局状态

## 🚀 部署

### Vercel 部署

1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 自动部署

### 环境变量

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 待办事项

- [ ] 集成 Supabase 数据库
- [ ] 添加用户认证功能
- [ ] 实现表单数据存储
- [ ] 添加视频上传功能
- [ ] 集成 Runway API
- [ ] 添加支付功能
- [ ] 实现视频预览功能
- [ ] 添加管理后台

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 📞 联系我们

- 邮箱: contact@aivideotool.com
- 工作时间: 周一至周五 9:00-18:00 