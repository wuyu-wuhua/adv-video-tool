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
  if (!config.openai) {
    throw new Error('OpenAI API key not configured')
  }

  const openai = new OpenAI({
    apiKey: config.openai.apiKey
  })

  const prompt = createCopyPrompt(request)

  const response = await openai.chat.completions.create({
    model: config.openai.model,
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.8,
    max_tokens: 1000
  })

  const content = response.choices[0]?.message?.content
  if (!content) {
    throw new Error('No response from OpenAI')
  }

  try {
    const parsed = JSON.parse(content)
    return parsed.copies || []
  } catch (error) {
    console.error('Failed to parse OpenAI response:', content)
    throw new Error('Invalid response format from OpenAI')
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

  const result = await model.generateContent(prompt)
  const response = await result.response
  const content = response.text()

  if (!content) {
    throw new Error('No response from Google Gemini')
  }

  try {
    const parsed = JSON.parse(content)
    return parsed.copies || []
  } catch (error) {
    console.error('Failed to parse Gemini response:', content)
    throw new Error('Invalid response format from Google Gemini')
  }
}

// 主要的文案生成函数
export async function generateCopyText(request: CopyGenerationRequest): Promise<CopyGenerationResponse> {
  try {
    const preferredService = getPreferredAIService()
    
    if (!preferredService) {
      return {
        success: false,
        copies: [],
        error: 'No AI service configured'
      }
    }

    let copies: CopyText[] = []

    if (preferredService === 'openai') {
      copies = await generateWithOpenAI(request)
    } else if (preferredService === 'gemini') {
      copies = await generateWithGemini(request)
    }

    return {
      success: true,
      copies
    }
  } catch (error) {
    console.error('Copy generation error:', error)
    return {
      success: false,
      copies: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
