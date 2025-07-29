import { RunwayConfig } from './types'

// 默认配置
export const DEFAULT_RUNWAY_CONFIG: RunwayConfig = {
  apiKey: process.env.RUNWAY_API_KEY || '',
  projectId: process.env.RUNWAY_PROJECT_ID || '',
  baseUrl: process.env.RUNWAY_BASE_URL || 'https://api.runwayml.com',
  timeout: 30000, // 30秒
  retries: 3,
  retryDelay: 1000, // 1秒
}

// 默认视频生成选项
export const DEFAULT_VIDEO_OPTIONS = {
  width: 1920,
  height: 1080,
  duration: 10,
  fps: 24,
  guidance_scale: 7.5,
  num_inference_steps: 50,
  scheduler: 'ddim',
  output_format: 'mp4',
  output_quality: 90,
  output_fps: 24,
  output_audio: false,
} as const

// 支持的模型
export const SUPPORTED_MODELS = {
  'gen-3-alpha': {
    name: 'Gen-3 Alpha',
    description: 'Latest generation model with improved quality',
    max_duration: 30,
    max_resolution: { width: 1920, height: 1080 },
    pricing: { per_second: 0.05, currency: 'USD' }
  },
  'gen-3-beta': {
    name: 'Gen-3 Beta',
    description: 'Beta version with experimental features',
    max_duration: 15,
    max_resolution: { width: 1280, height: 720 },
    pricing: { per_second: 0.03, currency: 'USD' }
  }
} as const

// 预设模板
export const PRESET_TEMPLATES = {
  'google-ads-15s': {
    name: 'Google Ads 15s',
    description: 'Optimized for Google Ads 15-second format',
    options: {
      duration: 15,
      width: 1920,
      height: 1080,
      fps: 24,
      guidance_scale: 7.5
    }
  },
  'google-ads-30s': {
    name: 'Google Ads 30s',
    description: 'Optimized for Google Ads 30-second format',
    options: {
      duration: 30,
      width: 1920,
      height: 1080,
      fps: 24,
      guidance_scale: 7.5
    }
  },
  'social-media': {
    name: 'Social Media',
    description: 'Optimized for social media platforms',
    options: {
      duration: 10,
      width: 1080,
      height: 1080,
      fps: 24,
      guidance_scale: 8.0
    }
  },
  'youtube-shorts': {
    name: 'YouTube Shorts',
    description: 'Optimized for YouTube Shorts format',
    options: {
      duration: 15,
      width: 1080,
      height: 1920,
      fps: 24,
      guidance_scale: 7.5
    }
  }
} as const

// 错误代码映射
export const ERROR_CODES = {
  INVALID_API_KEY: 'INVALID_API_KEY',
  INVALID_PROJECT_ID: 'INVALID_PROJECT_ID',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  INVALID_PROMPT: 'INVALID_PROMPT',
  GENERATION_FAILED: 'GENERATION_FAILED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
} as const

// 状态码映射
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
} as const

// 验证规则
export const VALIDATION_RULES = {
  prompt: {
    minLength: 1,
    maxLength: 1000,
    required: true
  },
  width: {
    min: 256,
    max: 1920,
    default: 1920
  },
  height: {
    min: 256,
    max: 1080,
    default: 1080
  },
  duration: {
    min: 1,
    max: 30,
    default: 10
  },
  fps: {
    min: 1,
    max: 60,
    default: 24
  },
  guidance_scale: {
    min: 1,
    max: 20,
    default: 7.5
  },
  num_inference_steps: {
    min: 1,
    max: 100,
    default: 50
  }
} as const

// 环境变量验证
export function validateEnvironmentVariables(): boolean {
  const requiredVars = ['RUNWAY_API_KEY', 'RUNWAY_PROJECT_ID']
  const missingVars = requiredVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars)
    return false
  }
  
  return true
}

// 配置验证
export function validateConfig(config: RunwayConfig): boolean {
  if (!config.apiKey) {
    console.error('Runway API key is required')
    return false
  }
  
  if (!config.projectId) {
    console.error('Runway project ID is required')
    return false
  }
  
  if (config.timeout && config.timeout < 1000) {
    console.error('Timeout must be at least 1000ms')
    return false
  }
  
  if (config.retries && config.retries < 0) {
    console.error('Retries must be non-negative')
    return false
  }
  
  return true
}

// 获取配置
export function getRunwayConfig(): RunwayConfig {
  const config = { ...DEFAULT_RUNWAY_CONFIG }
  
  // 验证环境变量
  if (!validateEnvironmentVariables()) {
    throw new Error('Invalid environment variables for RunwayML')
  }
  
  // 验证配置
  if (!validateConfig(config)) {
    throw new Error('Invalid RunwayML configuration')
  }
  
  return config
} 