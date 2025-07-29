// RunwayML相关类型定义

// 视频生成选项
export interface VideoGenerationOptions {
  prompt: string
  negative_prompt?: string
  width?: number
  height?: number
  duration?: number
  fps?: number
  seed?: number
  guidance_scale?: number
  num_frames?: number
  aspect_ratio?: string
  motion_bucket_id?: number
  cond_aug?: number
  decoding_t?: number
  lora_scale?: number
  lora_path?: string
  mask_path?: string
  mask_prompt?: string
  mask_schedule?: string
  mask_cond_overrides?: any
  cond_frames?: string[]
  num_inference_steps?: number
  scheduler?: string
  output_format?: string
  output_quality?: number
  output_fps?: number
  output_audio?: boolean
  output_audio_format?: string
  output_audio_quality?: number
}

// 视频生成响应
export interface VideoGenerationResponse {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  created_at: string
  updated_at: string
  result?: {
    video_url: string
    thumbnail_url: string
    duration: number
    width: number
    height: number
    fps: number
    file_size: number
    format: string
  }
  error?: {
    code: string
    message: string
    details?: any
  }
  progress?: {
    current_step: number
    total_steps: number
    percentage: number
    estimated_time_remaining?: number
  }
}

// 模型信息
export interface ModelInfo {
  id: string
  name: string
  version: string
  description: string
  capabilities: string[]
  supported_formats: string[]
  max_duration: number
  max_resolution: {
    width: number
    height: number
  }
  pricing: {
    per_second: number
    currency: string
  }
}

// 项目信息
export interface ProjectInfo {
  id: string
  name: string
  description?: string
  created_at: string
  updated_at: string
  status: 'active' | 'archived' | 'deleted'
  settings: {
    default_model: string
    default_resolution: {
      width: number
      height: number
    }
    default_duration: number
    default_fps: number
  }
}

// 账户信息
export interface AccountInfo {
  id: string
  email: string
  name?: string
  plan: 'free' | 'pro' | 'enterprise'
  credits: {
    available: number
    used: number
    total: number
  }
  limits: {
    max_video_duration: number
    max_resolution: {
      width: number
      height: number
    }
    max_concurrent_generations: number
  }
  created_at: string
  updated_at: string
}

// API配置
export interface RunwayConfig {
  apiKey: string
  projectId: string
  baseUrl?: string
  timeout?: number
  retries?: number
  retryDelay?: number
}

// 错误类型
export interface RunwayError {
  code: string
  message: string
  details?: any
  statusCode?: number
}

// 生成任务状态
export type GenerationStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'

// 生成任务
export interface GenerationTask {
  id: string
  status: GenerationStatus
  created_at: string
  updated_at: string
  options: VideoGenerationOptions
  result?: VideoGenerationResponse['result']
  error?: RunwayError
  progress?: VideoGenerationResponse['progress']
}

// 批量生成请求
export interface BatchGenerationRequest {
  tasks: VideoGenerationOptions[]
  priority?: 'low' | 'normal' | 'high'
  callback_url?: string
}

// 批量生成响应
export interface BatchGenerationResponse {
  batch_id: string
  tasks: GenerationTask[]
  created_at: string
}

// 文件上传响应
export interface RunwayFileUploadResponse {
  id: string
  filename: string
  url: string
  size: number
  mime_type: string
  created_at: string
}

// 预设模板
export interface PresetTemplate {
  id: string
  name: string
  description: string
  category: string
  options: Partial<VideoGenerationOptions>
  thumbnail_url?: string
  created_at: string
  updated_at: string
}

// 使用统计
export interface UsageStats {
  total_generations: number
  total_duration: number
  total_cost: number
  currency: string
  period: {
    start: string
    end: string
  }
  breakdown: {
    by_model: Record<string, {
      generations: number
      duration: number
      cost: number
    }>
    by_status: Record<GenerationStatus, number>
  }
} 