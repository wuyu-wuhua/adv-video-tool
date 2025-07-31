// 图片处理服务
import sharp from 'sharp'
import type { AdSize, CopyText, ProcessedImage } from '@/lib/database/types'

// 谷歌广告标准尺寸配置
export const AD_SIZES: AdSize[] = [
  {
    name: 'landscape',
    width: 1200,
    height: 628,
    ratio: '1.91:1'
  },
  {
    name: 'square',
    width: 1200,
    height: 1200,
    ratio: '1:1'
  },
  {
    name: 'portrait',
    width: 960,
    height: 1200,
    ratio: '4:5'
  }
]

// Logo 尺寸配置
export const LOGO_SIZES: AdSize[] = [
  {
    name: 'logo_square',
    width: 1200,
    height: 1200,
    ratio: '1:1'
  },
  {
    name: 'logo_landscape',
    width: 1200,
    height: 300,
    ratio: '4:1'
  }
]

// 图片处理选项
export interface ImageProcessOptions {
  inputBuffer: Buffer
  size: AdSize
  copytext: CopyText
  logoBuffer?: Buffer
  brandColor?: string
}

// 文字样式配置
interface TextStyle {
  fontSize: number
  fontWeight: string
  color: string
  strokeColor?: string
  strokeWidth?: number
}

// 获取文字样式
function getTextStyles(size: AdSize): {
  title: TextStyle
  description: TextStyle
  cta: TextStyle
} {
  const baseSize = Math.min(size.width, size.height)
  
  return {
    title: {
      fontSize: Math.floor(baseSize * 0.08),
      fontWeight: 'bold',
      color: '#ffffff',
      strokeColor: '#000000',
      strokeWidth: 2
    },
    description: {
      fontSize: Math.floor(baseSize * 0.05),
      fontWeight: 'normal',
      color: '#ffffff',
      strokeColor: '#000000',
      strokeWidth: 1
    },
    cta: {
      fontSize: Math.floor(baseSize * 0.06),
      fontWeight: 'bold',
      color: '#ffffff',
      strokeColor: '#000000',
      strokeWidth: 2
    }
  }
}

// 创建文字图层
async function createTextLayer(
  text: string,
  style: TextStyle,
  maxWidth: number,
  maxHeight: number
): Promise<Buffer> {
  // 创建SVG文字
  const svg = `
    <svg width="${maxWidth}" height="${maxHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .text {
            font-family: Arial, sans-serif;
            font-size: ${style.fontSize}px;
            font-weight: ${style.fontWeight};
            fill: ${style.color};
            ${style.strokeColor ? `stroke: ${style.strokeColor}; stroke-width: ${style.strokeWidth}px;` : ''}
            text-anchor: middle;
            dominant-baseline: middle;
          }
        </style>
      </defs>
      <text x="50%" y="50%" class="text">${text}</text>
    </svg>
  `

  return Buffer.from(svg)
}

// 处理单张图片
export async function processImage(options: ImageProcessOptions): Promise<Buffer> {
  const { inputBuffer, size, copytext, logoBuffer, brandColor = '#1a73e8' } = options

  try {
    // 调整原图尺寸
    let processedImage = sharp(inputBuffer)
      .resize(size.width, size.height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 90 })

    // 获取文字样式
    const textStyles = getTextStyles(size)

    // 创建文字图层
    const titleLayer = await createTextLayer(
      copytext.title,
      textStyles.title,
      size.width * 0.8,
      size.height * 0.2
    )

    const descriptionLayer = await createTextLayer(
      copytext.description,
      textStyles.description,
      size.width * 0.8,
      size.height * 0.3
    )

    const ctaLayer = await createTextLayer(
      copytext.cta,
      textStyles.cta,
      size.width * 0.4,
      size.height * 0.1
    )

    // 合成图层
    const composite: sharp.OverlayOptions[] = []

    // 添加标题（顶部）
    composite.push({
      input: titleLayer,
      top: Math.floor(size.height * 0.1),
      left: Math.floor(size.width * 0.1)
    })

    // 添加描述（中部）
    composite.push({
      input: descriptionLayer,
      top: Math.floor(size.height * 0.4),
      left: Math.floor(size.width * 0.1)
    })

    // 添加CTA（底部）
    composite.push({
      input: ctaLayer,
      top: Math.floor(size.height * 0.8),
      left: Math.floor(size.width * 0.3)
    })

    // 如果有Logo，添加到右下角
    if (logoBuffer) {
      const logoSize = Math.min(size.width * 0.15, size.height * 0.15)
      const resizedLogo = await sharp(logoBuffer)
        .resize(logoSize, logoSize, { fit: 'inside' })
        .png()
        .toBuffer()

      composite.push({
        input: resizedLogo,
        top: size.height - logoSize - 20,
        left: size.width - logoSize - 20
      })
    }

    // 应用所有图层
    const result = await processedImage
      .composite(composite)
      .jpeg({ quality: 85 })
      .toBuffer()

    return result
  } catch (error) {
    console.error('Image processing error:', error)
    throw new Error(`Failed to process image: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// 批量处理图片
export async function processImagesForAllSizes(
  inputBuffer: Buffer,
  copytexts: CopyText[],
  logoBuffer?: Buffer
): Promise<ProcessedImage[]> {
  const results: ProcessedImage[] = []

  for (const size of AD_SIZES) {
    for (const copytext of copytexts) {
      try {
        const processedBuffer = await processImage({
          inputBuffer,
          size,
          copytext,
          logoBuffer
        })

        // 这里需要将处理后的图片上传到 Supabase Storage
        // 暂时返回一个占位符 URL，实际实现时需要上传到存储服务
        const url = `processed-${Date.now()}-${size.name}.jpg`

        results.push({
          url,
          size,
          format: 'jpg',
          copytext
        })
      } catch (error) {
        console.error(`Failed to process image for size ${size.name}:`, error)
      }
    }
  }

  return results
}

// 验证图片格式和大小
export function validateImage(buffer: Buffer, maxSizeInMB: number = 10): boolean {
  // 检查文件大小
  const sizeInMB = buffer.length / (1024 * 1024)
  if (sizeInMB > maxSizeInMB) {
    throw new Error(`Image size ${sizeInMB.toFixed(2)}MB exceeds maximum ${maxSizeInMB}MB`)
  }

  return true
}

// 获取图片信息
export async function getImageInfo(buffer: Buffer): Promise<{
  width: number
  height: number
  format: string
  size: number
}> {
  const metadata = await sharp(buffer).metadata()
  
  return {
    width: metadata.width || 0,
    height: metadata.height || 0,
    format: metadata.format || 'unknown',
    size: buffer.length
  }
}
