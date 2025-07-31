// AI 服务配置

export interface AIConfig {
  openai?: {
    apiKey: string
    model: string
  }
  gemini?: {
    apiKey: string
    model: string
  }
}

export function getAIConfig(): AIConfig {
  const config: AIConfig = {}

  // OpenAI 配置
  if (process.env.OPENAI_API_KEY) {
    config.openai = {
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-4o'
    }
  }

  // Google Gemini 配置
  if (process.env.GOOGLE_GEMINI_API_KEY) {
    config.gemini = {
      apiKey: process.env.GOOGLE_GEMINI_API_KEY,
      model: 'gemini-pro'
    }
  }

  return config
}

// 检查是否有可用的AI服务
export function hasAvailableAIService(): boolean {
  const config = getAIConfig()
  return !!(config.openai || config.gemini)
}

// 获取首选的AI服务
export function getPreferredAIService(): 'openai' | 'gemini' | null {
  const config = getAIConfig()
  
  // 优先使用 OpenAI
  if (config.openai) {
    return 'openai'
  }
  
  // 其次使用 Gemini
  if (config.gemini) {
    return 'gemini'
  }
  
  return null
}
