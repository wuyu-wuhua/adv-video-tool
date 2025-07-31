// 广告素材生成 API
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/auth/middleware'
import { generateCopyText } from '@/lib/ai/copytext-generator'
import { processImagesForAllSizes } from '@/lib/image/processor'
import { uploadFile, downloadFileFromUrl, generateUniqueFilename, STORAGE_BUCKETS } from '@/lib/storage/supabase-storage'
import { createServerSupabaseClient } from '@/lib/database/server'
import type { GenerationHistory, BrandInfo, AdGenerationRequest } from '@/lib/database/types'

interface GenerationResponse {
  success: boolean
  generationId?: string
  message?: string
  error?: string
}

// 处理广告生成请求
async function handleAdGeneration(
  request: NextRequest, 
  user: { id: string; email: string }
): Promise<NextResponse> {
  try {
    const body = await request.json() as AdGenerationRequest

    // 验证请求数据
    if (!body.imageUrls || body.imageUrls.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No image URLs provided' 
        } as GenerationResponse,
        { status: 400 }
      )
    }

    if (!body.adPurpose || body.adPurpose.trim().length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Ad purpose is required' 
        } as GenerationResponse,
        { status: 400 }
      )
    }

    // 限制图片数量
    if (body.imageUrls.length > 5) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Maximum 5 images allowed per generation' 
        } as GenerationResponse,
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()

    // 创建生成记录
    const generationRecord: Partial<GenerationHistory> = {
      user_id: user.id,
      input_image_urls: body.imageUrls,
      ad_purpose: body.adPurpose,
      brand_info: body.brandInfo || {},
      generated_ad_urls: [],
      status: 'processing'
    }

    const { data: generation, error: insertError } = await supabase
      .from('generation_history')
      .insert(generationRecord)
      .select()
      .single()

    if (insertError || !generation) {
      console.error('Failed to create generation record:', insertError)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to create generation record' 
        } as GenerationResponse,
        { status: 500 }
      )
    }

    // 异步处理生成任务
    processGenerationAsync(generation.id, body, user.id).catch(error => {
      console.error('Async generation error:', error)
    })

    return NextResponse.json({
      success: true,
      generationId: generation.id,
      message: 'Generation started. You will be notified when complete.'
    } as GenerationResponse)

  } catch (error) {
    console.error('Generation API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Generation service error' 
      } as GenerationResponse,
      { status: 500 }
    )
  }
}

// 异步处理生成任务
async function processGenerationAsync(
  generationId: string,
  request: AdGenerationRequest,
  userId: string
): Promise<void> {
  const supabase = await createServerSupabaseClient()

  try {
    console.log(`Starting generation process for ${generationId}`)

    // 1. 生成文案
    console.log('Generating copy text...')
    const copyResult = await generateCopyText({
      adPurpose: request.adPurpose,
      brandInfo: request.brandInfo || {}
    })

    if (!copyResult.success || copyResult.copies.length === 0) {
      throw new Error(`Copy generation failed: ${copyResult.error}`)
    }

    console.log(`Generated ${copyResult.copies.length} copy variations`)

    // 2. 处理每张图片
    const allGeneratedAds: any[] = []

    for (let i = 0; i < request.imageUrls.length; i++) {
      const imageUrl = request.imageUrls[i]
      console.log(`Processing image ${i + 1}/${request.imageUrls.length}: ${imageUrl}`)

      try {
        // 下载原始图片
        const imageBuffer = await downloadFileFromUrl(imageUrl)

        // 下载Logo（如果提供）
        let logoBuffer: Buffer | undefined
        if (request.brandInfo?.logo_url) {
          try {
            logoBuffer = await downloadFileFromUrl(request.brandInfo.logo_url)
          } catch (error) {
            console.warn('Failed to download logo, continuing without it:', error)
          }
        }

        // 处理图片生成所有尺寸的广告
        const processedImages = await processImagesForAllSizes(
          imageBuffer,
          copyResult.copies,
          logoBuffer
        )

        // 上传处理后的图片
        for (const processedImage of processedImages) {
          const filename = generateUniqueFilename(
            `ad-${processedImage.size.name}-${i}.jpg`,
            userId
          )

          // 这里需要实际的图片Buffer，暂时使用占位符
          // 在实际实现中，processImagesForAllSizes应该返回Buffer
          const uploadResult = await uploadFile({
            bucket: STORAGE_BUCKETS.PROCESSED_ADS,
            path: filename,
            file: imageBuffer, // 这里应该是处理后的图片Buffer
            contentType: 'image/jpeg'
          })

          if (uploadResult.success && uploadResult.url) {
            allGeneratedAds.push({
              url: uploadResult.url,
              size: processedImage.size.name,
              format: processedImage.format,
              copytext: processedImage.copytext
            })
          }
        }
      } catch (error) {
        console.error(`Failed to process image ${imageUrl}:`, error)
      }
    }

    // 3. 更新生成记录
    const { error: updateError } = await supabase
      .from('generation_history')
      .update({
        generated_ad_urls: allGeneratedAds,
        status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', generationId)

    if (updateError) {
      console.error('Failed to update generation record:', updateError)
    } else {
      console.log(`Generation ${generationId} completed successfully with ${allGeneratedAds.length} ads`)
    }

  } catch (error) {
    console.error(`Generation ${generationId} failed:`, error)

    // 更新状态为失败
    await supabase
      .from('generation_history')
      .update({
        status: 'failed',
        updated_at: new Date().toISOString()
      })
      .eq('id', generationId)
  }
}

// 导出处理函数
export const POST = withAuth(handleAdGeneration)

// 处理其他HTTP方法
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
