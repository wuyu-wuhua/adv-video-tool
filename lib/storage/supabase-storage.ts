// Supabase 存储服务
import { createServerSupabaseClient } from '@/lib/database/server'
import { createAdminSupabaseClient } from '@/lib/database/client'

export interface UploadResult {
  success: boolean
  url?: string
  path?: string
  error?: string
}

export interface UploadOptions {
  bucket: string
  path: string
  file: Buffer
  contentType?: string
  cacheControl?: string
  upsert?: boolean
}

// 存储桶配置
export const STORAGE_BUCKETS = {
  ORIGINAL_IMAGES: 'original-images',
  PROCESSED_ADS: 'processed-ads',
  LOGOS: 'logos'
} as const

// 上传文件到 Supabase Storage
export async function uploadFile(options: UploadOptions): Promise<UploadResult> {
  try {
    const supabase = createAdminSupabaseClient()
    
    const { bucket, path, file, contentType = 'image/jpeg', cacheControl = '3600', upsert = false } = options

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        contentType,
        cacheControl,
        upsert
      })

    if (error) {
      console.error('Upload error:', error)
      return {
        success: false,
        error: error.message
      }
    }

    // 获取公共URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)

    return {
      success: true,
      url: urlData.publicUrl,
      path: data.path
    }
  } catch (error) {
    console.error('Upload service error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown upload error'
    }
  }
}

// 批量上传文件
export async function uploadMultipleFiles(
  files: { buffer: Buffer; filename: string; contentType?: string }[],
  bucket: string,
  pathPrefix: string = ''
): Promise<UploadResult[]> {
  const results: UploadResult[] = []

  for (const file of files) {
    const path = pathPrefix ? `${pathPrefix}/${file.filename}` : file.filename
    
    const result = await uploadFile({
      bucket,
      path,
      file: file.buffer,
      contentType: file.contentType
    })

    results.push(result)
  }

  return results
}

// 删除文件
export async function deleteFile(bucket: string, path: string): Promise<boolean> {
  try {
    const supabase = createAdminSupabaseClient()

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) {
      console.error('Delete error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Delete service error:', error)
    return false
  }
}

// 获取文件公共URL
export function getPublicUrl(bucket: string, path: string): string {
  const supabase = createAdminSupabaseClient()
  
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  return data.publicUrl
}

// 生成唯一文件名
export function generateUniqueFilename(originalName: string, userId: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split('.').pop() || 'jpg'
  
  return `${userId}/${timestamp}-${random}.${extension}`
}

// 初始化存储桶（如果不存在则创建）
export async function initializeStorageBuckets(): Promise<boolean> {
  try {
    const supabase = createAdminSupabaseClient()

    // 检查并创建存储桶
    for (const bucketName of Object.values(STORAGE_BUCKETS)) {
      const { data: buckets } = await supabase.storage.listBuckets()
      
      const bucketExists = buckets?.some(bucket => bucket.name === bucketName)
      
      if (!bucketExists) {
        const { error } = await supabase.storage.createBucket(bucketName, {
          public: true,
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
          fileSizeLimit: 10485760 // 10MB
        })

        if (error) {
          console.error(`Failed to create bucket ${bucketName}:`, error)
          return false
        }

        console.log(`Created storage bucket: ${bucketName}`)
      }
    }

    return true
  } catch (error) {
    console.error('Storage initialization error:', error)
    return false
  }
}

// 从URL下载文件
export async function downloadFileFromUrl(url: string): Promise<Buffer> {
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    return Buffer.from(arrayBuffer)
  } catch (error) {
    console.error('Download error:', error)
    throw new Error(`Failed to download file from URL: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// 清理过期文件（可选功能）
export async function cleanupExpiredFiles(bucket: string, olderThanDays: number = 30): Promise<number> {
  try {
    const supabase = createAdminSupabaseClient()
    
    const { data: files, error } = await supabase.storage
      .from(bucket)
      .list()

    if (error || !files) {
      console.error('Failed to list files:', error)
      return 0
    }

    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays)

    const expiredFiles = files.filter(file => {
      const fileDate = new Date(file.created_at)
      return fileDate < cutoffDate
    })

    if (expiredFiles.length === 0) {
      return 0
    }

    const filePaths = expiredFiles.map(file => file.name)
    
    const { error: deleteError } = await supabase.storage
      .from(bucket)
      .remove(filePaths)

    if (deleteError) {
      console.error('Failed to delete expired files:', deleteError)
      return 0
    }

    console.log(`Cleaned up ${expiredFiles.length} expired files from ${bucket}`)
    return expiredFiles.length
  } catch (error) {
    console.error('Cleanup error:', error)
    return 0
  }
}
