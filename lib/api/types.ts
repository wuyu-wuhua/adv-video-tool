// API相关类型定义

// API响应基础类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  timestamp?: string
}

// API错误类型
export interface ApiError {
  code: string
  message: string
  details?: string
  statusCode?: number
}

// 分页请求参数
export interface PaginationParams {
  page?: number
  pageSize?: number
  limit?: number
  offset?: number
}

// 分页响应
export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// 表单提交响应
export interface FormSubmitResponse extends ApiResponse {
  id?: string
  submittedAt?: string
}

// 文件上传响应
export interface FileUploadResponse extends ApiResponse {
  url?: string
  filename?: string
  size?: number
  mimeType?: string
}

// 验证错误
export interface ValidationError {
  field: string
  message: string
  value?: any
}

// 批量操作响应
export interface BatchOperationResponse extends ApiResponse {
  total: number
  successCount: number
  failedCount: number
  errors?: ValidationError[]
}

// API请求配置
export interface ApiRequestConfig {
  timeout?: number
  retries?: number
  retryDelay?: number
  headers?: Record<string, string>
}

// HTTP方法类型
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

// API端点配置
export interface ApiEndpoint {
  path: string
  method: HttpMethod
  description?: string
  requiresAuth?: boolean
  rateLimit?: number
}

// 认证相关类型
export interface AuthToken {
  accessToken: string
  refreshToken?: string
  expiresAt?: number
  tokenType?: string
}

export interface AuthUser {
  id: string
  email: string
  name?: string
  role?: string
  permissions?: string[]
}

// WebSocket消息类型
export interface WebSocketMessage<T = any> {
  type: string
  data: T
  timestamp: number
  id?: string
}

// 实时更新类型
export interface RealTimeUpdate<T = any> {
  event: string
  table: string
  schema: string
  commit_timestamp: string
  errors: any[] | null
  new: T
  old: T | null
} 