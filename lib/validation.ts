import { z } from 'zod'

// 表单数据验证schema
export const demandFormSchema = z.object({
  name: z.string().min(1, '姓名不能为空').max(100, '姓名不能超过100个字符').optional(),
  email: z.string().email('请输入有效的邮箱地址').min(1, '邮箱不能为空'),
  challenges: z.array(z.string()).optional(),
  videoTypes: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  budget: z.string().optional(),
  interestInTrial: z.boolean().optional()
})

// 验证表单数据
export function validateDemandForm(data: unknown) {
  try {
    const validatedData = demandFormSchema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
      return { success: false, errors }
    }
    return { success: false, errors: [{ field: 'unknown', message: '验证失败' }] }
  }
}

// 转换前端数据格式到数据库格式
export function transformFormDataToDatabase(data: z.infer<typeof demandFormSchema>) {
  return {
    name: data.name || null,
    email: data.email,
    challenges: data.challenges || null,
    video_types: data.videoTypes || null,
    benefits: data.benefits || null,
    budget: data.budget || null,
    interest_in_trial: data.interestInTrial || null
  }
} 