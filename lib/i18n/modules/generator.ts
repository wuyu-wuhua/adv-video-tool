import type { GeneratorTranslations } from '../types'

export const generatorTranslations: Record<'en' | 'zh', GeneratorTranslations> = {
  en: {
    // 页面标题
    pageTitle: 'Ad Image Generator Tool',
    pageDescription: 'Upload your images, input ad purpose, AI will generate multiple ad materials that comply with Google Ad specifications',
    
    // 图片上传
    uploadTitle: 'Upload Image Materials',
    uploadDescription: 'Drag images here, or click to upload',
    uploadClickText: 'click to upload',
    uploadFormat: 'Supports JPG, PNG format, single image max 5MB',
    uploadedImages: 'Uploaded Images',
    
    // 广告目的
    adPurposeTitle: 'Ad Purpose',
    adPurposeLabel: 'Ad purpose or core keywords *',
    adPurposePlaceholder: 'e.g., Increase registrations, Promote new features, AI tool advantages...',
    commonPurposes: 'Common Ad Purposes:',
    
    // 常见目的
    purposeIncreaseRegistrations: 'Increase Registrations',
    purposePromoteFeatures: 'Promote New Features',
    purposeAITools: 'AI Tool Advantages',
    purposeProductIntro: 'Product Introduction',
    purposePromotion: 'Promotional Campaign',
    purposeBrandAwareness: 'Brand Awareness',
    
    // 品牌信息
    brandInfoTitle: 'Brand Information (Optional)',
    brandNameLabel: 'Brand Name',
    brandNamePlaceholder: 'Your brand name',
    brandSloganLabel: 'Brand Slogan',
    brandSloganPlaceholder: 'Brand slogan or tagline',
    websiteUrlLabel: 'Website URL',
    websiteUrlPlaceholder: 'https://example.com',
    
    // 生成按钮
    generateButton: 'Generate Ad Materials',
    generating: 'Generating...',
    
    // 结果展示
    resultsTitle: 'Generation Results',
    resultsEmpty: 'Upload images and input ad purpose, then click generate button to start creating ad materials',
    totalGenerated: 'Total generated {count} ad materials',
    downloadAll: 'Download All Images',
    downloadSingle: 'Download',
    
    // 错误信息
    errorNoImages: 'Please upload at least one image',
    errorNoPurpose: 'Please input ad purpose',
    errorInvalidFile: 'Please upload image files (JPG, PNG)',
    errorFileTooLarge: 'Image size cannot exceed 5MB',
    errorGenerationFailed: 'Generation failed, please try again',
    errorDownloadFailed: 'Download failed, please try again',
    errorBatchDownload: 'Batch download feature under development...',
    
    // 加载状态
    redirecting: 'Redirecting...',
    
    // 文件信息
    fileSize: '{size} MB'
  },
  zh: {
    // 页面标题
    pageTitle: '广告图片素材生成工具',
    pageDescription: '上传您的图片，输入广告目的，AI 将为您生成符合谷歌广告规范的多尺寸图片素材',
    
    // 图片上传
    uploadTitle: '上传图片素材',
    uploadDescription: '拖拽图片到此处，或点击上传',
    uploadClickText: '点击上传',
    uploadFormat: '支持 JPG, PNG 格式，单张图片最大 5MB',
    uploadedImages: '已上传图片',
    
    // 广告目的
    adPurposeTitle: '广告目的',
    adPurposeLabel: '广告目的或核心关键词 *',
    adPurposePlaceholder: '例如：提升注册量、推广新功能、AI工具优势...',
    commonPurposes: '常见广告目的：',
    
    // 常见目的
    purposeIncreaseRegistrations: '提升注册量',
    purposePromoteFeatures: '推广新功能',
    purposeAITools: 'AI工具优势',
    purposeProductIntro: '产品介绍',
    purposePromotion: '促销活动',
    purposeBrandAwareness: '品牌宣传',
    
    // 品牌信息
    brandInfoTitle: '品牌信息（可选）',
    brandNameLabel: '品牌名称',
    brandNamePlaceholder: '您的品牌名称',
    brandSloganLabel: '品牌标语',
    brandSloganPlaceholder: '品牌标语或口号',
    websiteUrlLabel: '网站地址',
    websiteUrlPlaceholder: 'https://example.com',
    
    // 生成按钮
    generateButton: '生成广告素材',
    generating: '正在生成中...',
    
    // 结果展示
    resultsTitle: '生成结果',
    resultsEmpty: '上传图片并输入广告目的后，点击生成按钮开始创建广告素材',
    totalGenerated: '共生成 {count} 张广告素材',
    downloadAll: '下载所有图片',
    downloadSingle: '下载',
    
    // 错误信息
    errorNoImages: '请至少上传一张图片',
    errorNoPurpose: '请输入广告目的',
    errorInvalidFile: '请上传图片文件 (JPG, PNG)',
    errorFileTooLarge: '图片大小不能超过 5MB',
    errorGenerationFailed: '生成失败，请重试',
    errorDownloadFailed: '下载失败，请重试',
    errorBatchDownload: '批量下载功能开发中...',
    
    // 加载状态
    redirecting: '正在跳转...',
    
    // 文件信息
    fileSize: '{size} MB'
  }
} 