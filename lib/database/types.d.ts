// 数据库类型定义

// 用户需求表类型
export type Demand = {
  id?: string
  name?: string
  email: string
  challenges?: string[]
  video_types?: string[]
  benefits?: string[]
  budget?: string
  interest_in_trial?: boolean
  created_at?: string
}

// 视频样本类型
export type VideoSample = {
  id: string
  title: string
  description: string
  duration: string
  category: string
  thumbnail: string
  videoUrl: string
}

// 用户类型
export type User = {
  id: string
  email: string
  name?: string
  created_at: string
  updated_at: string
}

// 视频生成任务类型
export type VideoGenerationTask = {
  id: string
  user_id: string
  prompt: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  result_url?: string
  error_message?: string
  created_at: string
  updated_at: string
}

// 数据库查询选项
export type QueryOptions = {
  limit?: number
  offset?: number
  orderBy?: string
  orderDirection?: 'asc' | 'desc'
}

// 数据库响应类型
export type DatabaseResponse<T> = {
  data: T | null
  error: any
  count?: number
}

// 分页响应类型
export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 数据库表名常量
export declare const DATABASE_TABLES: {
  readonly DEMANDS: 'demands'
  readonly USERS: 'users'
  readonly VIDEO_TASKS: 'video_generation_tasks'
  readonly VIDEO_SAMPLES: 'video_samples'
}

// 数据库操作类型
export type DatabaseOperation = 'insert' | 'select' | 'update' | 'delete'

// 数据库错误类型
export type DatabaseError = {
  code: string
  message: string
  details?: string
  hint?: string
}

// Supabase 客户端配置类型
export type SupabaseConfig = {
  url: string
  anonKey: string
  serviceKey?: string
}

// Cookie 选项类型（用于 Supabase SSR）
export type CookieOptions = {
  name: string
  value: string
  options?: {
    domain?: string
    path?: string
    expires?: Date
    maxAge?: number
    secure?: boolean
    httpOnly?: boolean
    sameSite?: 'strict' | 'lax' | 'none'
  }
}

// 广告素材生成历史表类型
export type GenerationHistory = {
  id: string
  user_id: string
  input_image_urls: string[]
  ad_purpose: string
  brand_info: {
    name?: string
    slogan?: string
    url?: string
    logo_url?: string
  }
  generated_ad_urls: {
    url: string
    size: string
    format: string
    copytext: {
      title: string
      description: string
      cta: string
    }
  }[]
  status: 'pending' | 'processing' | 'completed' | 'failed'
  created_at: string
  updated_at: string
}

// 广告尺寸配置
export type AdSize = {
  name: string
  width: number
  height: number
  ratio: string
}

// 文案生成结果
export type CopyText = {
  title: string
  description: string
  cta: string
}

// 图片处理结果
export type ProcessedImage = {
  url: string
  size: AdSize
  format: 'jpg' | 'png'
  copytext: CopyText
}

// 品牌信息
export type BrandInfo = {
  name?: string
  slogan?: string
  url?: string
  logo_url?: string
}

// 图片上传请求
export type ImageUploadRequest = {
  files: File[]
  userId: string
}

// 广告生成请求
export type AdGenerationRequest = {
  imageUrls: string[]
  adPurpose: string
  brandInfo: BrandInfo
  userId: string
}