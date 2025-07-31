// AI 文案生成服务
import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { getAIConfig, getPreferredAIService } from './config'
import type { CopyText, BrandInfo } from '@/lib/database/types'

export interface CopyGenerationRequest {
  adPurpose: string
  brandInfo: BrandInfo
  imageDescription?: string
}

export interface CopyGenerationResponse {
  success: boolean
  copies: CopyText[]
  error?: string
}

// 生成文案的 Prompt 模板
function createCopyPrompt(request: CopyGenerationRequest): string {
  const { adPurpose, brandInfo, imageDescription } = request

  return `
你是一位专业的广告文案创作专家。请为以下广告需求生成3个不同版本的广告文案。

广告目的: ${adPurpose}
品牌信息:
- 品牌名称: ${brandInfo.name || '未提供'}
- 品牌口号: ${brandInfo.slogan || '未提供'}
- 品牌网站: ${brandInfo.url || '未提供'}
${imageDescription ? `图片内容描述: ${imageDescription}` : ''}

要求:
1. 每个版本包含标题(title)、描述(description)和行动号召(cta)
2. 标题要简洁有力，不超过30个字符
3. 描述要吸引人，突出产品/服务优势，不超过80个字符
4. CTA要明确具体，激发用户行动，不超过15个字符
5. 文案要符合广告语境，具有商业价值
6. 确保文字内容不会占用图片过多空间（遵循20%文字限制原则）

请以JSON格式返回，格式如下:
{
  "copies": [
    {
      "title": "标题1",
      "description": "描述1",
      "cta": "行动号召1"
    },
    {
      "title": "标题2", 
      "description": "描述2",
      "cta": "行动号召2"
    },
    {
      "title": "标题3",
      "description": "描述3", 
      "cta": "行动号召3"
    }
  ]
}
`.trim()
}

// 使用 OpenAI 生成文案
async function generateWithOpenAI(request: CopyGenerationRequest): Promise<CopyText[]> {
  const config = getAIConfig()
  console.log('config', config)
  if (!config.openai) {
    throw new Error('OpenAI API key not configured')
  }

  const openai = new OpenAI({
    apiKey: config.openai.apiKey,
    timeout: 30000, // 30秒超时（更短的超时时间）
    maxRetries: 0, // 不使用OpenAI的重试，我们自己控制
  })

  const prompt = createCopyPrompt(request)

  console.log('🤖 Calling OpenAI API...')

  try {
    const response = await openai.chat.completions.create({
      model: config.openai.model,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 1000,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    console.log('✅ OpenAI response received')

    try {
      const parsed = JSON.parse(content)
      return parsed.copies || []
    } catch (error) {
      console.error('Failed to parse OpenAI response:', content)
      throw new Error('Invalid response format from OpenAI')
    }
  } catch (error) {
    console.error('OpenAI API error:', error)

    // 如果是超时错误，提供更友好的错误信息
    if (error instanceof Error && error.message.includes('timeout')) {
      throw new Error('AI服务响应超时，请稍后重试')
    }

    // 重新抛出原始错误
    throw error
  }
}

// 使用 Google Gemini 生成文案
async function generateWithGemini(request: CopyGenerationRequest): Promise<CopyText[]> {
  const config = getAIConfig()
  if (!config.gemini) {
    throw new Error('Google Gemini API key not configured')
  }

  const genAI = new GoogleGenerativeAI(config.gemini.apiKey)
  const model = genAI.getGenerativeModel({ model: config.gemini.model })

  const prompt = createCopyPrompt(request)

  console.log('🤖 Calling Google Gemini API...')

  try {
    // 设置超时
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Gemini API timeout')), 60000) // 60秒超时
    })

    const generatePromise = model.generateContent(prompt)

    const result = (await Promise.race([generatePromise, timeoutPromise])) as any
    const response = await result.response
    const content = response.text()

    if (!content) {
      throw new Error('No response from Google Gemini')
    }

    console.log('✅ Gemini response received')

    try {
      const parsed = JSON.parse(content)
      return parsed.copies || []
    } catch (error) {
      console.error('Failed to parse Gemini response:', content)
      throw new Error('Invalid response format from Google Gemini')
    }
  } catch (error) {
    console.error('Gemini API error:', error)

    // 如果是超时错误，提供更友好的错误信息
    if (error instanceof Error && error.message.includes('timeout')) {
      throw new Error('AI服务响应超时，请稍后重试')
    }

    // 重新抛出原始错误
    throw error
  }
}

// 生成默认文案（降级方案）
function generateDefaultCopyText(request: CopyGenerationRequest): CopyText[] {
  const brandName = request.brandInfo.name || '优质品牌'
  const brandSlogan = request.brandInfo.slogan || '品质生活'
  const purpose = request.adPurpose || '推广产品'

  // 根据广告目的生成更智能的文案
  const purposeKeywords = purpose.toLowerCase()
  let templates: CopyText[] = []

  if (purposeKeywords.includes('新产品') || purposeKeywords.includes('推广')) {
    templates = [
      {
        title: `${brandName} 全新上市`,
        description: `${brandSlogan}，${brandName}为您带来全新体验`,
        cta: '立即体验',
      },
      {
        title: `发现${brandName}新品`,
        description: `专业品质，值得信赖的${brandName}新产品`,
        cta: '了解详情',
      },
      {
        title: `${brandName} 新品首发`,
        description: `品质保证，${brandName}新品限时推广`,
        cta: '马上抢购',
      },
    ]
  } else if (purposeKeywords.includes('品牌') || purposeKeywords.includes('知名度')) {
    templates = [
      {
        title: `选择${brandName}`,
        description: `${brandSlogan}，${brandName}值得您的信赖`,
        cta: '了解品牌',
      },
      {
        title: `${brandName} 品质之选`,
        description: `专业服务，${brandName}为您提供优质体验`,
        cta: '立即了解',
      },
      {
        title: `信赖${brandName}`,
        description: `${brandSlogan}，选择${brandName}选择品质`,
        cta: '了解更多',
      },
    ]
  } else if (purposeKeywords.includes('销售') || purposeKeywords.includes('促销')) {
    templates = [
      {
        title: `${brandName} 限时优惠`,
        description: `${brandSlogan}，${brandName}特惠活动进行中`,
        cta: '立即购买',
      },
      {
        title: `${brandName} 超值特惠`,
        description: `品质保证，${brandName}优惠价格等您来`,
        cta: '马上抢购',
      },
      {
        title: `${brandName} 促销活动`,
        description: `专业品质，${brandName}限时特价优惠`,
        cta: '立即下单',
      },
    ]
  } else {
    // 通用模板
    templates = [
      {
        title: `${brandName} - 优质选择`,
        description: `${brandSlogan}，${brandName}为您提供专业服务`,
        cta: '立即了解',
      },
      {
        title: `体验${brandName}`,
        description: `专业品质，值得信赖的${brandName}`,
        cta: '马上体验',
      },
      {
        title: `选择${brandName}`,
        description: `品质保证，让您满意的${brandName}服务`,
        cta: '了解更多',
      },
    ]
  }

  return templates
}

// 主要的文案生成函数
export async function generateCopyText(request: CopyGenerationRequest): Promise<CopyGenerationResponse> {
  // 首先检查是否有AI服务配置
  const preferredService = getPreferredAIService()

  if (!preferredService) {
    console.log('⚠️ No AI service configured, using default copy text')
    return {
      success: true,
      copies: generateDefaultCopyText(request),
    }
  }

  console.log(`🎯 Attempting to use ${preferredService} for copy generation`)

  // 设置一个总的超时时间（比OpenAI的超时时间短一点）
  const TOTAL_TIMEOUT = 45000 // 45秒总超时

  try {
    const aiGenerationPromise = (async () => {
      let copies: CopyText[] = []

      if (preferredService === 'openai') {
        copies = await generateWithOpenAI(request)
      } else if (preferredService === 'gemini') {
        copies = await generateWithGemini(request)
      }

      return copies
    })()

    // 创建超时Promise
    const timeoutPromise = new Promise<CopyText[]>((_, reject) => {
      setTimeout(() => {
        reject(new Error('AI generation timeout - using fallback'))
      }, TOTAL_TIMEOUT)
    })

    // 使用Promise.race来确保在指定时间内返回结果
    const copies = await Promise.race([aiGenerationPromise, timeoutPromise])

    // 验证生成的文案
    if (!copies || copies.length === 0) {
      console.log('⚠️ AI generated empty copies, using default copy text')
      return {
        success: true,
        copies: generateDefaultCopyText(request),
      }
    }

    console.log('✅ AI generation successful')
    return {
      success: true,
      copies,
    }
  } catch (error) {
    console.error('Copy generation error:', error)

    // 如果AI生成失败，使用默认文案作为降级方案
    console.log('⚠️ AI generation failed, using default copy text as fallback')

    return {
      success: true, // 仍然返回成功，因为我们有降级方案
      copies: generateDefaultCopyText(request),
    }
  }
}
