// 应用常量定义

// 视频相关常量
export const VIDEO_CONSTANTS = {
  DEFAULT_DURATION: 10,
  DEFAULT_FPS: 24,
  DEFAULT_WIDTH: 1920,
  DEFAULT_HEIGHT: 1080,
  MAX_DURATION: 30,
  MIN_DURATION: 5,
} as const

// API相关常量
export const API_CONSTANTS = {
  TIMEOUT: 30000, // 30秒
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1秒
} as const

// 表单相关常量
export const FORM_CONSTANTS = {
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 255,
  MAX_DESCRIPTION_LENGTH: 1000,
} as const

// 分页相关常量
export const PAGINATION_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const

// 缓存相关常量
export const CACHE_CONSTANTS = {
  DEFAULT_TTL: 3600, // 1小时
  SHORT_TTL: 300,    // 5分钟
  LONG_TTL: 86400,   // 24小时
} as const

// 错误消息常量
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接错误，请检查网络后重试',
  SERVER_ERROR: '服务器内部错误，请稍后重试',
  VALIDATION_ERROR: '输入数据验证失败，请检查输入内容',
  UNAUTHORIZED: '未授权访问，请先登录',
  NOT_FOUND: '请求的资源不存在',
  RATE_LIMIT: '请求过于频繁，请稍后重试',
} as const

// 成功消息常量
export const SUCCESS_MESSAGES = {
  SUBMIT_SUCCESS: '提交成功',
  UPDATE_SUCCESS: '更新成功',
  DELETE_SUCCESS: '删除成功',
  SAVE_SUCCESS: '保存成功',
} as const 