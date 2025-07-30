import { Translations } from './types'

// 翻译文本定义
export const translations: Translations = {
  en: {
    // Header
    home: 'Home',
    features: 'Features',
    showcase: 'Showcase',
    demand: 'Demand',
    startUsing: 'Get Started',
    
    // Login
    back: 'Back',
    welcomeBack: 'Welcome Back',
    chooseLoginMethod: 'Choose your login method',
    loginWithGitHub: 'Continue with GitHub',
    loginWithGoogle: 'Continue with Google',
    loggingIn: 'Logging in...',
    loginDescription: 'Secure login with your preferred account',
    login: 'Login',
    logout: 'Logout',
    
    // Hero Section
    heroTitle: 'Google Ads video creation tool powered by AI',
    heroSubtitle: 'Transform your ideas into stunning materials with advanced AI technology',
    heroDescription: 'Say goodbye to high costs and low efficiency, let AI provide intelligent solutions for you, driving higher efficiency!',
    heroButton: 'View Sample Materials',
    heroSubButton: 'Watch Demo',
    heroTechNote: '🚀 Based on advanced AI technology, providing high-quality intelligent solutions',
    
    // Features Section
    featuresTitle: 'Why Choose Our AI Tool?',
    featuresSubtitle: 'We solve all the pain points of traditional ad material production, letting you focus on business growth',
    aiGeneration: 'AI Generation',
    aiGenerationDesc: 'Generate materials from text descriptions using advanced AI',
    templates: 'Rich Templates',
    templatesDesc: 'Hundreds of professional templates to choose from',
    editing: 'Smart Editing',
    editingDesc: 'Intelligent editing tools for perfect results',
    export: 'High Quality Export',
    exportDesc: 'Export in multiple formats with high quality',
    
    // Feature Cards
    feature1: {
      title: 'High Conversion Materials',
      description: 'Data-driven AI algorithms generate efficient solutions that match user needs'
    },
    feature2: {
      title: 'Cost Effectiveness',
      description: 'Compared to traditional material production, costs are reduced by 90% while maintaining professional quality'
    },
    feature3: {
      title: 'Rapid Iteration',
      description: 'From concept to finished product in just hours, supporting rapid A/B testing and optimization'
    },
    feature4: {
      title: 'Brand Consistency',
      description: 'Intelligently maintains brand tone and visual style, ensuring consistency across all materials'
    },
    feature5: {
      title: 'Precise Targeting',
      description: 'Automatically adjusts material style and content strategy based on target audience characteristics'
    },
    feature6: {
      title: 'Compliance Guarantee',
      description: 'Built-in intelligent checking ensures all outputs meet quality standards'
    },
    
    // Stats
    stats: {
      cases: 'Success Cases',
      industries: 'Industries Covered',
      satisfaction: 'Client Satisfaction',
      delivery: 'Delivery Time'
    },
    
    // Tech Advantage
    techAdvantage: {
      title: 'Technical Advantages',
      data: {
        title: 'Data Driven',
        description: 'Trained on millions of ad data points'
      },
      optimization: {
        title: 'Precise Optimization',
        description: 'Real-time optimization algorithms improve results'
      },
      security: {
        title: 'Safe & Reliable',
        description: 'Enterprise-grade security protection'
      }
    },
    
    // Showcase Section
    showcaseTitle: 'High-Quality Material Sample Showcase',
    showcaseSubtitle: 'Diverse intelligent solutions generated based on advanced AI technology, meeting different user needs',
    
    // Material Samples
    video1: {
      title: 'Multimodal AI',
      description: 'Text, image, and voice integrated generation model supporting cross-modal content creation',
      category: 'AI Model'
    },
    video2: {
      title: 'Smart Prediction',
      description: 'Automated machine learning platform for rapid predictive model building and deployment',
      category: 'Machine Learning'
    },
    video3: {
      title: 'Voice Synthesis',
      description: 'High-quality AI voice generation with natural and fluent text-to-speech technology',
      category: 'Voice AI'
    },
    video4: {
      title: 'Collaborative Office',
      description: 'Integrated work platform with seamless document management and project collaboration',
      category: 'Productivity'
    },
    video5: {
      title: 'Smart Writing',
      description: 'AI-driven copywriting assistant for professional marketing content generation',
      category: 'Writing AI'
    },
    video6: {
      title: '3D Rendering',
      description: 'Professional 3D design tool for rapid indoor and outdoor scene modeling and rendering',
      category: 'Design Tool'
    },
    
    // Showcase Compliance
    showcaseCompliance: {
      title: '🎬 All outputs comply with quality standards',
              description: 'Our AI system automatically checks and ensures that generated content complies with quality standards, including content compliance, format specifications, etc., so you don\'t have to worry about quality issues.'
    },
    
    videoNotSupported: 'Your browser does not support material preview.',
    
    // Form Section
    formTitle: 'Tell Us Your Needs',
    formSubtitle: 'Fill out the form below and we will provide you with a personalized AI material solution',
    name: 'Name/Company Name',
    email: 'Email Address',
    namePlaceholder: 'Please enter your name or company name',
    emailPlaceholder: 'Please enter your email address',
    challenges: 'Current challenges you face (multiple choice)',

    benefits: 'Expected AI solution advantages (multiple choice)',
    budget: 'For single project AI services, what budget are you willing to pay?',
    interestInTrial: 'Are you willing to participate in a free trial or one-on-one interview?',
    trialYes: 'Yes, I am willing to participate in a free trial or one-on-one interview',
    trialNo: 'No, I just want to submit my requirements',
    submit: 'Submit Requirements',
    submitting: 'Submitting...',
    submitError: 'Submission failed, please try again later',
    
    // Form Placeholders
    otherChallengesPlaceholder: 'Please describe in detail the other challenges you face...',

    otherBenefitsPlaceholder: 'Please describe the other advantages you expect...',
    
    // Footer
    footerText: '© 2025 AI Tool. All rights reserved.',
    footerDescription: 'Revolutionizing workflows through AI technology, enabling every user to have professional-grade intelligent tools.',
    madeWith: 'Made with',
    forCreators: 'for creators',
    quickLinks: 'Quick Links',
    contactUs: 'Contact Us',
    workingHours: 'Working hours: Monday to Friday 9:00-18:00',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy',
    
    // Hero Stats
    costReduction: 'Cost Reduction',
    productionSpeed: 'Production Speed',
    conversionIncrease: 'Conversion Increase',
    
    // Form Options
    challengesOptions: {
      time: 'Time consuming',
      skills: 'Lack of skills',
      cost: 'High cost',
      quality: 'Quality issues',
      other: 'Other'
    },

    benefitsOptions: {
      efficiency: 'Improve efficiency',
      quality: 'Better quality',
      cost: 'Reduce costs',
      time: 'Save time',
      other: 'Other'
    },
    budgetOptions: {
      low: 'Under $100',
      medium: '$100-$500',
      high: '$500-$1000',
      enterprise: 'Over $1000'
    }
  },
  zh: {
    // Header
    home: '首页',
    features: '功能',
    showcase: '样本',
    demand: '需求',
    startUsing: '开始使用',
    
    // Login
    back: '返回',
    welcomeBack: '欢迎回来',
    chooseLoginMethod: '选择登录方式',
    loginWithGitHub: '使用 GitHub 登录',
    loginWithGoogle: '使用 Google 登录',
    loggingIn: '登录中...',
    loginDescription: '使用您偏好的账户安全登录',
    login: '登录',
    logout: '退出登录',
    
    // Hero Section
    heroTitle: '我们是只生成谷歌广告的视频素材',
    heroSubtitle: '用先进的AI技术将您的想法转化为令人惊艳的素材',
    heroDescription: '告别高成本、低效率，让AI为您提供智能解决方案，驱动更高效率！',
    heroButton: '查看样本素材',
    heroSubButton: '观看演示',
    heroTechNote: '🚀 基于先进AI技术，提供高质量的智能解决方案',
    
    // Features Section
    featuresTitle: '为什么选择我们的AI工具？',
    featuresSubtitle: '我们解决传统工作流程的所有痛点，让您专注于业务增长',
    aiGeneration: 'AI生成',
    aiGenerationDesc: '使用先进AI从文本描述生成素材',
    templates: '丰富模板',
    templatesDesc: '数百个专业模板供选择',
    editing: '智能编辑',
    editingDesc: '智能编辑工具，完美效果',
    export: '高质量导出',
    exportDesc: '多种格式高质量导出',
    
    // Feature Cards
    feature1: {
      title: '高转化素材',
      description: '数据驱动的AI算法生成匹配用户需求的高效解决方案'
    },
    feature2: {
      title: '成本效益',
      description: '相比传统素材制作，成本降低90%，同时保持专业品质'
    },
    feature3: {
      title: '快速迭代',
      description: '从概念到成品仅需数小时，支持快速A/B测试和优化'
    },
    feature4: {
      title: '品牌一致性',
      description: '智能维护品牌调性和视觉风格，确保所有素材的一致性'
    },
    feature5: {
      title: '精准定向',
      description: '根据目标受众特征自动调整素材风格和内容策略'
    },
    feature6: {
      title: '合规保障',
      description: '内置智能检查机制，确保所有输出符合质量标准'
    },
    
    // Stats
    stats: {
      cases: '成功案例',
      industries: '覆盖行业',
      satisfaction: '客户满意度',
      delivery: '交付时间'
    },
    
    // Tech Advantage
    techAdvantage: {
      title: '技术优势',
      data: {
        title: '数据驱动',
        description: '基于数百万广告数据点训练'
      },
      optimization: {
        title: '精准优化',
        description: '实时优化算法提升效果'
      },
      security: {
        title: '安全可靠',
        description: '企业级安全防护'
      }
    },
    
    // Showcase Section
    showcaseTitle: '高质量素材样本展示',
    showcaseSubtitle: '基于先进AI技术生成的多样化智能解决方案，满足不同用户需求',
    
    // Material Samples
    video1: {
      title: '多模态AI',
      description: '文本、图像、语音一体化生成模型，支持跨模态内容创作',
      category: 'AI模型'
    },
    video2: {
      title: '智能预测',
      description: '自动化机器学习平台，快速构建和部署预测模型',
      category: '机器学习'
    },
    video3: {
      title: '语音合成',
      description: '高质量AI语音生成，自然流畅的文本转语音技术',
      category: '语音AI'
    },
    video4: {
      title: '协作办公',
      description: '一体化工作平台，文档管理与项目协作无缝集成',
      category: '生产力'
    },
    video5: {
      title: '智能写作',
      description: 'AI驱动的文案创作助手，专业营销内容一键生成',
      category: '写作AI'
    },
    video6: {
      title: '3D渲染',
      description: '专业级3D设计工具，室内外场景快速建模渲染',
      category: '设计工具'
    },
    
    // Showcase Compliance
    showcaseCompliance: {
      title: '🎬 所有输出均符合质量标准',
              description: '我们的 AI 系统会自动检查并确保生成的内容符合质量标准，包括内容合规性、格式规范等，让您无需担心质量问题。'
    },
    
    videoNotSupported: '您的浏览器不支持素材预览。',
    
    // Form Section
    formTitle: '告诉我们您的需求',
    formSubtitle: '填写以下表单，我们将为您提供个性化的 AI 素材解决方案',
    name: '姓名/公司名称',
    email: '邮箱地址',
    namePlaceholder: '请输入您的姓名或公司名称',
    emailPlaceholder: '请输入您的邮箱地址',
    challenges: '当前面临的挑战 (多选)',

    benefits: '期望的 AI 解决方案优势 (多选)',
    budget: '针对单个项目的AI服务，您愿意支付的预算？',
    interestInTrial: '是否愿意参与免费试用或一对一访谈？',
    trialYes: '是，我愿意参与免费试用或一对一访谈',
    trialNo: '否，我只想提交我的需求',
    submit: '提交需求',
    submitting: '提交中...',
    submitError: '提交失败，请稍后重试',
    
    // Form Placeholders
    otherChallengesPlaceholder: '请详细描述您面临的其他挑战...',

    otherBenefitsPlaceholder: '请描述您期望的其他优势...',
    
    // Footer
    footerText: '© 2025 AI工具。保留所有权利。',
    footerDescription: '通过 AI 技术革新工作流程，让每个用户都能拥有专业级的智能工具。',
    madeWith: 'Made with',
    forCreators: 'for creators',
    quickLinks: '快速链接',
    contactUs: '联系我们',
    workingHours: '工作时间：周一至周五 9:00-18:00',
    privacyPolicy: '隐私政策',
    termsOfService: '服务条款',
    cookiePolicy: 'Cookie 政策',
    
    // Hero Stats
    costReduction: '成本降低',
    productionSpeed: '制作速度',
    conversionIncrease: '转化提升',
    
    // Form Options
    challengesOptions: {
      time: '耗时',
      skills: '缺乏技能',
      cost: '成本高',
      quality: '质量问题',
      other: '其他'
    },

    benefitsOptions: {
      efficiency: '提高效率',
      quality: '更好质量',
      cost: '降低成本',
      time: '节省时间',
      other: '其他'
    },
    budgetOptions: {
      low: '100美元以下',
      medium: '100-500美元',
      high: '500-1000美元',
      enterprise: '1000美元以上'
    }
  }
} 