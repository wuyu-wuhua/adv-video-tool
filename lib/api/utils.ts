import { ApiResponse, ApiError, ApiRequestConfig, ValidationError } from './types'
import { ERROR_MESSAGES, API_CONSTANTS } from '@/lib/core/constants'

// 表单数据接口
export interface DemandFormData {
  name?: string
  email: string
  challenges?: string[]
  videoTypes?: string[]
  benefits?: string[]
  budget?: string
  interestInTrial?: boolean
}

// 通用API请求函数
export async function apiRequest<T = any>(
  url: string,
  options: RequestInit = {},
  config: ApiRequestConfig = {}
): Promise<ApiResponse<T>> {
  const {
    timeout = API_CONSTANTS.TIMEOUT,
    retries = API_CONSTANTS.MAX_RETRIES,
    retryDelay = API_CONSTANTS.RETRY_DELAY,
    headers = {}
  } = config

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
        ...options.headers,
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: result.message || ERROR_MESSAGES.SERVER_ERROR,
        error: result.error,
        timestamp: new Date().toISOString()
      }
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    clearTimeout(timeoutId)
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          success: false,
          message: ERROR_MESSAGES.NETWORK_ERROR,
          error: 'Request timeout',
          timestamp: new Date().toISOString()
        }
      }
    }

    return {
      success: false,
      message: ERROR_MESSAGES.NETWORK_ERROR,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }
  }
}

// 带重试的API请求
export async function apiRequestWithRetry<T = any>(
  url: string,
  options: RequestInit = {},
  config: ApiRequestConfig = {}
): Promise<ApiResponse<T>> {
  const { retries = API_CONSTANTS.MAX_RETRIES, retryDelay = API_CONSTANTS.RETRY_DELAY } = config

  for (let attempt = 0; attempt <= retries; attempt++) {
    const result = await apiRequest<T>(url, options, config)
    
    if (result.success || attempt === retries) {
      return result
    }

    if (attempt < retries) {
      await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)))
    }
  }

  return {
    success: false,
    message: ERROR_MESSAGES.NETWORK_ERROR,
    error: 'Max retries exceeded',
    timestamp: new Date().toISOString()
  }
}

// 提交表单数据
export async function submitDemandForm(formData: DemandFormData): Promise<ApiResponse> {
  return apiRequestWithRetry('/api/submit-demand', {
    method: 'POST',
    body: JSON.stringify(formData),
  })
}

// 初始化数据库
export async function initDatabase(): Promise<ApiResponse> {
  return apiRequestWithRetry('/api/init-database', {
    method: 'POST',
  })
}

// 测试API连接
export async function testApiConnection(): Promise<ApiResponse> {
  return apiRequestWithRetry('/api/test', {
    method: 'GET',
  })
}

// 验证表单数据
export function validateFormData(data: any): ValidationError[] {
  const errors: ValidationError[] = []

  // 验证邮箱
  if (!data.email) {
    errors.push({
      field: 'email',
      message: '邮箱地址不能为空'
    })
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({
      field: 'email',
      message: '请输入有效的邮箱地址'
    })
  }

  // 验证姓名
  if (data.name && data.name.length > 100) {
    errors.push({
      field: 'name',
      message: '姓名长度不能超过100个字符'
    })
  }

  // 验证挑战
  if (data.challenges && !Array.isArray(data.challenges)) {
    errors.push({
      field: 'challenges',
      message: '挑战选项格式不正确'
    })
  }

  // 验证视频类型
  if (data.videoTypes && !Array.isArray(data.videoTypes)) {
    errors.push({
      field: 'videoTypes',
      message: '视频类型选项格式不正确'
    })
  }

  // 验证优势
  if (data.benefits && !Array.isArray(data.benefits)) {
    errors.push({
      field: 'benefits',
      message: '优势选项格式不正确'
    })
  }

  return errors
}

// 格式化API错误
export function formatApiError(error: any): ApiError {
  if (error instanceof Error) {
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message,
      details: error.stack
    }
  }

  if (typeof error === 'string') {
    return {
      code: 'STRING_ERROR',
      message: error
    }
  }

  if (error && typeof error === 'object') {
    return {
      code: error.code || 'OBJECT_ERROR',
      message: error.message || 'Unknown object error',
      details: error.details,
      statusCode: error.statusCode
    }
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unknown error occurred'
  }
}

// 检查网络状态
export function checkNetworkStatus(): boolean {
  if (typeof navigator === 'undefined') return true
  return navigator.onLine
}

// 获取API基础URL
export function getApiBaseUrl(): string {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_BASE_URL || ''
  }
  return window.location.origin
}

// 构建API URL
export function buildApiUrl(path: string): string {
  const baseUrl = getApiBaseUrl()
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
} 