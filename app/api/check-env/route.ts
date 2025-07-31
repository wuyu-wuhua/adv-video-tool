// 检查环境变量配置 API
import { NextRequest, NextResponse } from 'next/server'
import { getAIConfig, hasAvailableAIService, getPreferredAIService } from '@/lib/ai/config'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const config = getAIConfig()
    
    return NextResponse.json({
      success: true,
      environment: {
        // 环境变量检查（不暴露实际值）
        OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
        GOOGLE_GEMINI_API_KEY: !!process.env.GOOGLE_GEMINI_API_KEY,
        NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY
      },
      aiConfig: {
        hasOpenAI: !!config.openai,
        hasGemini: !!config.gemini,
        openaiModel: config.openai?.model,
        geminiModel: config.gemini?.model
      },
      aiService: {
        hasAvailableService: hasAvailableAIService(),
        preferredService: getPreferredAIService()
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Environment check error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
