import { z } from 'zod'
import { ValidationError } from './types'
import { FORM_CONSTANTS } from '@/lib/core/constants'

// 基础验证规则
const emailSchema = z.string()
  .min(1, '邮箱地址不能为空')
  .email('请输入有效的邮箱地址')
  .max(FORM_CONSTANTS.MAX_EMAIL_LENGTH, `邮箱地址不能超过${FORM_CONSTANTS.MAX_EMAIL_LENGTH}个字符`)

const nameSchema = z.string()
  .min(1, '姓名不能为空')
  .max(FORM_CONSTANTS.MAX_NAME_LENGTH, `姓名不能超过${FORM_CONSTANTS.MAX_NAME_LENGTH}个字符`)
  .optional()

const descriptionSchema = z.string()
  .max(FORM_CONSTANTS.MAX_DESCRIPTION_LENGTH, `描述不能超过${FORM_CONSTANTS.MAX_DESCRIPTION_LENGTH}个字符`)
  .optional()

// 表单数据验证schema
export const demandFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  challenges: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  budget: z.string().optional(),
  interestInTrial: z.boolean().optional()
})

// 用户注册验证schema
export const userRegistrationSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: z.string()
    .min(8, '密码至少8个字符')
    .max(128, '密码不能超过128个字符')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '密码必须包含大小写字母和数字')
})

// 用户登录验证schema
export const userLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, '密码不能为空')
})

// 视频生成请求验证schema
export const videoGenerationSchema = z.object({
  prompt: z.string()
    .min(1, '提示词不能为空')
    .max(1000, '提示词不能超过1000个字符'),
  duration: z.number()
    .min(5, '视频时长至少5秒')
    .max(30, '视频时长不能超过30秒')
    .optional(),
  width: z.number()
    .min(256, '视频宽度至少256像素')
    .max(1920, '视频宽度不能超过1920像素')
    .optional(),
  height: z.number()
    .min(256, '视频高度至少256像素')
    .max(1080, '视频高度不能超过1080像素')
    .optional()
})

// 文件上传验证schema
export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine(file => file.size <= 10 * 1024 * 1024, '文件大小不能超过10MB')
    .refine(file => /\.(jpg|jpeg|png|gif|mp4|mov|avi)$/i.test(file.name), '只支持图片和视频文件')
})

// 验证表单数据
export function validateDemandForm(data: unknown) {
  try {
    const validatedData = demandFormSchema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: ValidationError[] = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        value: undefined
      }))
      return { success: false, errors }
    }
    return { 
      success: false, 
      errors: [{ 
        field: 'unknown', 
        message: '验证失败',
        value: data
      }] 
    }
  }
}

// 验证用户注册数据
export function validateUserRegistration(data: unknown) {
  try {
    const validatedData = userRegistrationSchema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: ValidationError[] = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        value: undefined
      }))
      return { success: false, errors }
    }
    return { 
      success: false, 
      errors: [{ 
        field: 'unknown', 
        message: '验证失败',
        value: data
      }] 
    }
  }
}

// 验证用户登录数据
export function validateUserLogin(data: unknown) {
  try {
    const validatedData = userLoginSchema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: ValidationError[] = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        value: undefined
      }))
      return { success: false, errors }
    }
    return { 
      success: false, 
      errors: [{ 
        field: 'unknown', 
        message: '验证失败',
        value: data
      }] 
    }
  }
}

// 验证视频生成请求
export function validateVideoGeneration(data: unknown) {
  try {
    const validatedData = videoGenerationSchema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: ValidationError[] = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        value: undefined
      }))
      return { success: false, errors }
    }
    return { 
      success: false, 
      errors: [{ 
        field: 'unknown', 
        message: '验证失败',
        value: data
      }] 
    }
  }
}

// 转换前端数据格式到数据库格式
export function transformFormDataToDatabase(data: z.infer<typeof demandFormSchema>) {
  return {
    name: data.name || null,
    email: data.email,
    challenges: data.challenges || null,
    benefits: data.benefits || null,
    budget: data.budget || null,
    interest_in_trial: data.interestInTrial || null
  }
}

// 转换数据库数据格式到前端格式
export function transformDatabaseDataToForm(data: any) {
  return {
    name: data.name || '',
    email: data.email,
    challenges: data.challenges || [],
    benefits: data.benefits || [],
    budget: data.budget || '',
    interestInTrial: data.interest_in_trial || false
  }
}

// 验证邮箱格式
export function validateEmail(email: string): boolean {
  return emailSchema.safeParse(email).success
}

// 验证密码强度
export function validatePasswordStrength(password: string): {
  isValid: boolean
  score: number
  feedback: string[]
} {
  const feedback: string[] = []
  let score = 0

  if (password.length >= 8) {
    score += 1
  } else {
    feedback.push('密码至少8个字符')
  }

  if (/[a-z]/.test(password)) {
    score += 1
  } else {
    feedback.push('包含小写字母')
  }

  if (/[A-Z]/.test(password)) {
    score += 1
  } else {
    feedback.push('包含大写字母')
  }

  if (/\d/.test(password)) {
    score += 1
  } else {
    feedback.push('包含数字')
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1
  } else {
    feedback.push('包含特殊字符')
  }

  return {
    isValid: score >= 4,
    score,
    feedback
  }
}

// 清理和验证输入数据
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // 移除潜在的HTML标签
    .replace(/\s+/g, ' ') // 合并多个空格
}

// 验证URL格式
export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// 验证文件类型
export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.some(type => 
    file.type.startsWith(type) || file.name.toLowerCase().endsWith(type)
  )
}

// 验证文件大小
export function validateFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize
} 