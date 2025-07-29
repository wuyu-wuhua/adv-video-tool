import { ApiError, ValidationError } from './types'
import { ERROR_MESSAGES } from '@/lib/core/constants'

// 错误代码枚举
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_FOUND = 'NOT_FOUND',
  RATE_LIMIT = 'RATE_LIMIT',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

// 创建错误对象
export function createError(code: ErrorCode, message: string, details?: any): ApiError {
  return {
    code,
    message,
    details
  }
}

// 处理数据库错误
export function handleDatabaseError(error: any): ApiError {
  console.error('Database error:', error)
  
  // PostgreSQL错误代码处理
  switch (error.code) {
    case '23505': // 唯一约束违反
      return createError(ErrorCode.EMAIL_EXISTS, '该邮箱已存在')
    
    case '23502': // 非空约束违反
      return createError(ErrorCode.VALIDATION_ERROR, '必填字段缺失')
    
    case '23503': // 外键约束违反
      return createError(ErrorCode.VALIDATION_ERROR, '关联数据不存在')
    
    case '42P01': // 表不存在
      return createError(ErrorCode.DATABASE_ERROR, '数据库表不存在')
    
    case '42501': // 权限不足
      return createError(ErrorCode.UNAUTHORIZED, '数据库权限不足')
    
    case '42703': // 列不存在
      return createError(ErrorCode.DATABASE_ERROR, '数据库字段不存在')
    
    default:
      return createError(ErrorCode.DATABASE_ERROR, ERROR_MESSAGES.SERVER_ERROR, error)
  }
}

// 处理验证错误
export function handleValidationError(errors: ValidationError[]): ApiError {
  return createError(
    ErrorCode.VALIDATION_ERROR,
    ERROR_MESSAGES.VALIDATION_ERROR,
    errors
  )
}

// 处理网络错误
export function handleNetworkError(error: any): ApiError {
  console.error('Network error:', error)
  
  if (error.name === 'AbortError') {
    return createError(ErrorCode.NETWORK_ERROR, '请求超时')
  }
  
  if (error.code === 'ECONNREFUSED') {
    return createError(ErrorCode.NETWORK_ERROR, '连接被拒绝')
  }
  
  if (error.code === 'ENOTFOUND') {
    return createError(ErrorCode.NETWORK_ERROR, '服务器地址未找到')
  }
  
  return createError(ErrorCode.NETWORK_ERROR, ERROR_MESSAGES.NETWORK_ERROR)
}

// 处理HTTP状态码错误
export function handleHttpError(statusCode: number, message?: string): ApiError {
  switch (statusCode) {
    case 400:
      return createError(ErrorCode.VALIDATION_ERROR, message || '请求参数错误')
    
    case 401:
      return createError(ErrorCode.UNAUTHORIZED, '未授权访问')
    
    case 403:
      return createError(ErrorCode.UNAUTHORIZED, '访问被拒绝')
    
    case 404:
      return createError(ErrorCode.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND)
    
    case 429:
      return createError(ErrorCode.RATE_LIMIT, ERROR_MESSAGES.RATE_LIMIT)
    
    case 500:
      return createError(ErrorCode.UNKNOWN_ERROR, ERROR_MESSAGES.SERVER_ERROR)
    
    case 502:
      return createError(ErrorCode.NETWORK_ERROR, '网关错误')
    
    case 503:
      return createError(ErrorCode.NETWORK_ERROR, '服务暂时不可用')
    
    default:
      return createError(ErrorCode.UNKNOWN_ERROR, message || '服务器错误')
  }
}

// 处理未知错误
export function handleUnknownError(error: any): ApiError {
  console.error('Unknown error:', error)
  
  if (error instanceof Error) {
    return createError(ErrorCode.UNKNOWN_ERROR, error.message, error.stack)
  }
  
  if (typeof error === 'string') {
    return createError(ErrorCode.UNKNOWN_ERROR, error)
  }
  
  return createError(ErrorCode.UNKNOWN_ERROR, ERROR_MESSAGES.SERVER_ERROR, error)
}

// 格式化错误响应
export function formatErrorResponse(error: ApiError) {
  return {
    success: false,
    message: error.message,
    error: {
      code: error.code,
      details: error.details
    },
    timestamp: new Date().toISOString()
  }
}

// 错误日志记录
export function logError(error: ApiError, context?: string) {
  const logData = {
    timestamp: new Date().toISOString(),
    code: error.code,
    message: error.message,
    details: error.details,
    context,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
    url: typeof window !== 'undefined' ? window.location.href : 'server'
  }
  
  console.error('Error logged:', logData)
  
  // 这里可以添加错误上报逻辑
  // 例如发送到错误监控服务
}

// 错误分类
export function categorizeError(error: any): ErrorCode {
  if (error.code && Object.values(ErrorCode).includes(error.code as ErrorCode)) {
    return error.code as ErrorCode
  }
  
  if (error.name === 'ValidationError') {
    return ErrorCode.VALIDATION_ERROR
  }
  
  if (error.name === 'NetworkError' || error.name === 'AbortError') {
    return ErrorCode.NETWORK_ERROR
  }
  
  if (error.statusCode) {
    if (error.statusCode === 401 || error.statusCode === 403) {
      return ErrorCode.UNAUTHORIZED
    }
    if (error.statusCode === 404) {
      return ErrorCode.NOT_FOUND
    }
    if (error.statusCode === 429) {
      return ErrorCode.RATE_LIMIT
    }
  }
  
  return ErrorCode.UNKNOWN_ERROR
}

// 用户友好的错误消息
export function getUserFriendlyMessage(error: ApiError): string {
  switch (error.code) {
    case ErrorCode.VALIDATION_ERROR:
      return '请检查输入信息是否正确'
    
    case ErrorCode.EMAIL_EXISTS:
      return '该邮箱已被使用，请使用其他邮箱'
    
    case ErrorCode.NETWORK_ERROR:
      return '网络连接异常，请检查网络后重试'
    
    case ErrorCode.UNAUTHORIZED:
      return '请先登录后再操作'
    
    case ErrorCode.NOT_FOUND:
      return '请求的资源不存在'
    
    case ErrorCode.RATE_LIMIT:
      return '操作过于频繁，请稍后再试'
    
    case ErrorCode.DATABASE_ERROR:
      return '数据操作失败，请稍后重试'
    
    default:
      return '系统出现异常，请稍后重试'
  }
} 