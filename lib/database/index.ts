// 数据库模块主索引文件

// 导出类型定义
export type {
  Demand,
  VideoSample,
  User,
  VideoGenerationTask,
  QueryOptions,
  DatabaseResponse,
  PaginatedResponse,
  DatabaseOperation,
  DatabaseError
} from './types'

// 导出配置常量
export { DATABASE_TABLES, SUPABASE_CONFIG, DATABASE_INIT_CONFIG } from './config'

// 导出客户端函数
export {
  createBrowserSupabaseClient,
  createAdminSupabaseClient,
  getSupabaseClient
} from './client'

// 导出服务器端客户端函数
export {
  createServerSupabaseClient,
  createMiddlewareSupabaseClient
} from './server'

// 导出服务函数和类
export { initializeDatabase, DatabaseService } from './services'

// 导出中间件函数
export { updateSession } from './middleware'

// 默认导出数据库服务实例
export { DatabaseService as default } from './services' 