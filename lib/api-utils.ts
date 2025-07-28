// API响应类型定义
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  errors?: Array<{
    field: string
    message: string
  }>
}

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

// 提交表单数据
export async function submitDemandForm(formData: DemandFormData): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/submit-demand', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result: ApiResponse = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: result.message || '提交失败，请稍后重试',
        errors: result.errors
      }
    }

    return result
  } catch (error) {
    console.error('Form submission error:', error)
    return {
      success: false,
      message: '网络错误，请检查网络连接后重试'
    }
  }
}

// 初始化数据库
export async function initDatabase(): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/init-database', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result: ApiResponse = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: result.message || '数据库初始化失败'
      }
    }

    return result
  } catch (error) {
    console.error('Database initialization error:', error)
    return {
      success: false,
      message: '数据库初始化过程中发生错误'
    }
  }
} 