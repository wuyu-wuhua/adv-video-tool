// 数据库类型定义

// 用户需求表类型
export interface Demand {
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
export interface VideoSample {
  id: string
  title: string
  description: string
  duration: string
  category: string
  thumbnail: string
  videoUrl: string
}

// 用户类型
export interface User {
  id: string
  email: string
  name?: string
  created_at: string
  updated_at: string
}

// 视频生成任务类型
export interface VideoGenerationTask {
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
export interface QueryOptions {
  limit?: number
  offset?: number
  orderBy?: string
  orderDirection?: 'asc' | 'desc'
}

// 数据库响应类型
export interface DatabaseResponse<T> {
  data: T | null
  error: any
  count?: number
}

// 分页响应类型
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 数据库表名枚举
export enum DatabaseTables {
  DEMANDS = 'demands',
  USERS = 'users',
  VIDEO_TASKS = 'video_generation_tasks',
  VIDEO_SAMPLES = 'video_samples'
}

// 数据库操作类型
export type DatabaseOperation = 'insert' | 'select' | 'update' | 'delete'

// 数据库错误类型
export interface DatabaseError {
  code: string
  message: string
  details?: string
  hint?: string
} 