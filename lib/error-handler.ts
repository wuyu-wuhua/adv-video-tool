// 错误类型定义
export interface ApiError {
  code: string
  message: string
  details?: any
}

// 错误代码枚举
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  NETWORK_ERROR = 'NETWORK_ERROR',
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
  
  if (error.code === '23505') {
    return createError(ErrorCode.EMAIL_EXISTS, '该邮箱已存在')
  }
  
  if (error.code === '23502') {
    return createError(ErrorCode.VALIDATION_ERROR, '必填字段缺失')
  }
  
  return createError(ErrorCode.DATABASE_ERROR, '数据库操作失败')
}

// 处理验证错误
export function handleValidationError(errors: any[]): ApiError {
  return createError(
    ErrorCode.VALIDATION_ERROR,
    '数据验证失败',
    errors
  )
}

// 处理网络错误
export function handleNetworkError(error: any): ApiError {
  console.error('Network error:', error)
  return createError(ErrorCode.NETWORK_ERROR, '网络连接失败')
}

// 处理未知错误
export function handleUnknownError(error: any): ApiError {
  console.error('Unknown error:', error)
  return createError(ErrorCode.UNKNOWN_ERROR, '服务器内部错误')
}

// 格式化错误响应
export function formatErrorResponse(error: ApiError) {
  return {
    success: false,
    message: error.message,
    error: {
      code: error.code,
      details: error.details
    }
  }
} 