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
      // TODO: 调用后端 API
      // const formData = new FormData()
      // uploadedImages.forEach(image => {
      //   formData.append('images', image.file)
      // })
      // formData.append('adPurpose', adPurpose)
      // formData.append('brandName', brandName)
      // formData.append('brandSlogan', brandSlogan)
      // formData.append('websiteUrl', websiteUrl)
      
      // const response = await fetch('/api/generate-ads', {
      //   method: 'POST',
      //   body: formData
      // })
      
      // 模拟生成过程
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // 模拟生成结果
      const mockResults: GeneratedAd[] = [
        {
          id: '1',
          imageUrl: '/img/1.jpg',
          aspectRatio: '1.91:1',
          dimensions: '1200x628',
          downloadUrl: '/api/download/1'
        },
        {
          id: '2',
          imageUrl: '/img/2.jpg',
          aspectRatio: '1:1',
          dimensions: '1080x1080',
          downloadUrl: '/api/download/2'
        },
        {
          id: '3',
          imageUrl: '/img/3.jpg',
          aspectRatio: '4:5',
          dimensions: '1080x1350',
          downloadUrl: '/api/download/3'
        }
      ]
      
      setGeneratedAds(mockResults)
    } catch (err) {
      setError(t('errorGenerationFailed'))
    } finally {
      setIsGenerating(false)
    }
  }, [uploadedImages, adPurpose, brandName, brandSlogan, websiteUrl, t])

  // 下载单张图片
  const downloadImage = useCallback(async (ad: GeneratedAd) => {
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
  }, [t])

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
    cleanup
  }
} 