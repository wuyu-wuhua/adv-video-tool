import { useState, useCallback } from 'react'
import { useLanguage } from '@/lib/i18n'

type UploadedImage = {
  id: string
  file: File
  preview: string
  size: number
}

type GeneratedAd = {
  id: string
  imageUrl: string
  aspectRatio: string
  dimensions: string
  downloadUrl: string
  copytext?: {
    title: string
    description: string
    cta: string
  }
}

export function useGenerator() {
  const { t } = useLanguage()

  // 状态管理
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [adPurpose, setAdPurpose] = useState('')
  const [brandName, setBrandName] = useState('')
  const [brandSlogan, setBrandSlogan] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedAds, setGeneratedAds] = useState<GeneratedAd[]>([])
  const [error, setError] = useState('')

  // 添加图片
  const addImages = useCallback((newImages: UploadedImage[]) => {
    setUploadedImages(prev => [...prev, ...newImages])
  }, [])

  // 删除图片
  const removeImage = useCallback((id: string) => {
    setUploadedImages(prev => {
      const image = prev.find(img => img.id === id)
      if (image) {
        URL.revokeObjectURL(image.preview)
      }
      return prev.filter(img => img.id !== id)
    })
  }, [])

  // 生成广告素材
  const generateAds = useCallback(async () => {
    if (uploadedImages.length === 0) {
      setError(t('errorNoImages'))
      return
    }

    if (!adPurpose.trim()) {
      setError(t('errorNoPurpose'))
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      // 第一步：上传图片
      console.log('📤 开始上传图片...')
      const formData = new FormData()
      uploadedImages.forEach(image => {
        formData.append('images', image.file)
      })

      const uploadResponse = await fetch('/api/upload-images', {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json()
        throw new Error(errorData.error || `上传失败: ${uploadResponse.status}`)
      }

      const uploadResult = await uploadResponse.json()
      console.log('✅ 图片上传成功:', uploadResult)

      if (!uploadResult.success || !uploadResult.urls || uploadResult.urls.length === 0) {
        throw new Error('图片上传失败，未获取到有效的URL')
      }

      // 第二步：生成广告素材
      console.log('🎨 开始生成广告素材...')
      const generateRequest = {
        imageUrls: uploadResult.urls,
        adPurpose: adPurpose.trim(),
        brandInfo: {
          name: brandName.trim() || undefined,
          slogan: brandSlogan.trim() || undefined,
          url: websiteUrl.trim() || undefined,
        },
      }

      const generateResponse = await fetch('/api/generate-ads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generateRequest),
      })

      if (!generateResponse.ok) {
        const errorData = await generateResponse.json()
        throw new Error(errorData.error || `生成失败: ${generateResponse.status}`)
      }

      const generateResult = await generateResponse.json()
      console.log('✅ 广告生成请求成功:', generateResult)

      if (!generateResult.success || !generateResult.generationId) {
        throw new Error('广告生成请求失败')
      }

      // 第三步：等待生成完成并获取结果
      console.log('⏳ 正在生成广告素材，请稍候...')
      const generationId = generateResult.generationId

      // 等待一段时间让后端处理完成（AI生成需要更长时间）
      await new Promise(resolve => setTimeout(resolve, 30000)) // 等待30秒

      // 获取生成结果（带重试机制）
      let historyResult: any = null
      let retryCount = 0
      const maxRetries = 3

      while (retryCount < maxRetries) {
        try {
          console.log(`📊 尝试获取生成结果 (${retryCount + 1}/${maxRetries})...`)

          const historyResponse = await fetch(`/api/generation-history/${generationId}`)
          if (!historyResponse.ok) {
            throw new Error(`HTTP ${historyResponse.status}: 获取生成结果失败`)
          }

          const result = await historyResponse.json()
          if (!result.success || !result.data) {
            throw new Error('生成结果获取失败')
          }

          // 检查是否有生成的广告
          if (result.data.generated_ad_urls && result.data.generated_ad_urls.length > 0) {
            historyResult = result
            break
          } else {
            console.log('⏳ 广告还在生成中，等待更长时间...')
            if (retryCount < maxRetries - 1) {
              await new Promise(resolve => setTimeout(resolve, 15000)) // 再等待15秒
            }
          }
        } catch (error) {
          console.error(`获取结果失败 (尝试 ${retryCount + 1}):`, error)
          if (retryCount < maxRetries - 1) {
            await new Promise(resolve => setTimeout(resolve, 10000)) // 等待10秒后重试
          }
        }

        retryCount++
      }

      if (
        !historyResult ||
        !historyResult.data.generated_ad_urls ||
        historyResult.data.generated_ad_urls.length === 0
      ) {
        throw new Error('广告生成超时或失败，请稍后查看生成历史或重试')
      }

      // 转换生成结果为前端格式
      const generatedAds = historyResult.data.generated_ad_urls.map((ad: any, index: number) => ({
        id: `${generationId}-${index}`,
        imageUrl: ad.url,
        aspectRatio: ad.size === 'landscape' ? '1.91:1' : ad.size === 'square' ? '1:1' : '4:5',
        dimensions: ad.size === 'landscape' ? '1200x628' : ad.size === 'square' ? '1200x1200' : '960x1200',
        downloadUrl: ad.url,
        copytext: ad.copytext,
      }))

      setGeneratedAds(generatedAds)
      console.log('🎉 广告生成完成！', generatedAds)

      // 模拟生成结果（备用，如果API调用失败）
      // const mockResults: GeneratedAd[] = [
      //   {
      //     id: '1',
      //     imageUrl: '/img/1.jpg',
      //     aspectRatio: '1.91:1',
      //     dimensions: '1200x628',
      //     downloadUrl: '/api/download/1'
      //   },
      //   {
      //     id: '2',
      //     imageUrl: '/img/2.jpg',
      //     aspectRatio: '1:1',
      //     dimensions: '1080x1080',
      //     downloadUrl: '/api/download/2'
      //   },
      //   {
      //     id: '3',
      //     imageUrl: '/img/3.jpg',
      //     aspectRatio: '4:5',
      //     dimensions: '1080x1350',
      //     downloadUrl: '/api/download/3'
      //   }
      // ]
      // setGeneratedAds(mockResults)
    } catch (err) {
      console.error('❌ 广告生成错误:', err)
      const errorMessage = err instanceof Error ? err.message : '生成失败，请重试'
      setError(errorMessage)
    } finally {
      setIsGenerating(false)
    }
  }, [uploadedImages, adPurpose, brandName, brandSlogan, websiteUrl, t])

  // 下载单张图片
  const downloadImage = useCallback(
    async (ad: GeneratedAd) => {
      try {
        const response = await fetch(ad.downloadUrl)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `ad-${ad.aspectRatio.replace(':', 'x')}.jpg`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } catch (err) {
        setError(t('errorDownloadFailed'))
      }
    },
    [t],
  )

  // 下载所有图片
  const downloadAll = useCallback(async () => {
    try {
      // TODO: 调用后端 API 打包下载
      setError(t('errorBatchDownload'))
    } catch (err) {
      setError(t('errorDownloadFailed'))
    }
  }, [t])

  // 清理资源
  const cleanup = useCallback(() => {
    uploadedImages.forEach(image => {
      URL.revokeObjectURL(image.preview)
    })
  }, [uploadedImages])

  return {
    // 状态
    uploadedImages,
    adPurpose,
    brandName,
    brandSlogan,
    websiteUrl,
    isGenerating,
    generatedAds,
    error,

    // 方法
    setAdPurpose,
    setBrandName,
    setBrandSlogan,
    setWebsiteUrl,
    setError,
    addImages,
    removeImage,
    generateAds,
    downloadImage,
    downloadAll,
    cleanup,
  }
}
