// 图片上传 API
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/auth/middleware'
import { uploadFile, generateUniqueFilename, STORAGE_BUCKETS } from '@/lib/storage/supabase-storage'
import { validateImage, getImageInfo } from '@/lib/image/processor'

interface UploadResponse {
  success: boolean
  urls?: string[]
  error?: string
}

// 处理图片上传
async function handleImageUpload(request: NextRequest, user: { id: string; email: string }): Promise<NextResponse> {
  try {
    const formData = await request.formData()
    const files = formData.getAll('images') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No images provided',
        } as UploadResponse,
        { status: 400 },
      )
    }

    // 限制上传文件数量
    if (files.length > 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'Maximum 10 images allowed per upload',
        } as UploadResponse,
        { status: 400 },
      )
    }

    const uploadedUrls: string[] = []
    const errors: string[] = []

    for (const file of files) {
      try {
        // 验证文件类型
        if (!file.type.startsWith('image/')) {
          errors.push(`${file.name}: Invalid file type. Only images are allowed.`)
          continue
        }

        // 转换为Buffer
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // 验证图片
        validateImage(buffer, 10) // 最大10MB

        // 获取图片信息
        const imageInfo = await getImageInfo(buffer)
        console.log(`Processing image: ${file.name}, ${imageInfo.width}x${imageInfo.height}, ${imageInfo.format}`)

        // 生成唯一文件名
        const filename = generateUniqueFilename(file.name, user.id)

        // 上传到 Supabase Storage
        const uploadResult = await uploadFile({
          bucket: STORAGE_BUCKETS.ORIGINAL_IMAGES,
          path: filename,
          file: buffer,
          contentType: file.type,
          cacheControl: '3600',
        })

        if (uploadResult.success && uploadResult.url) {
          uploadedUrls.push(uploadResult.url)
        } else {
          errors.push(`${file.name}: ${uploadResult.error || 'Upload failed'}`)
        }
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error)
        errors.push(`${file.name}: ${error instanceof Error ? error.message : 'Processing failed'}`)
      }
    }

    // 如果没有成功上传任何文件
    if (uploadedUrls.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: `All uploads failed: ${errors.join(', ')}`,
        } as UploadResponse,
        { status: 400 },
      )
    }

    // 返回结果
    const response: UploadResponse = {
      success: true,
      urls: uploadedUrls,
    }

    // 如果有部分失败，在响应中包含错误信息
    if (errors.length > 0) {
      console.warn('Partial upload failures:', errors)
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Upload API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Upload service error',
      } as UploadResponse,
      { status: 500 },
    )
  }
}

// 导出处理函数
export const POST = withAuth(handleImageUpload)

// 处理其他HTTP方法
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
