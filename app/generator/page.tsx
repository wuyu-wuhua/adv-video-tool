'use client'

import { useEffect } from 'react'
import { Sparkles, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n'
import { useGenerator } from '@/lib/hooks/useGenerator'
import { ImageUpload } from '@/components/Generator/ImageUpload'
import { AdPurposeForm } from '@/components/Generator/AdPurposeForm'
import { BrandInfoForm } from '@/components/Generator/BrandInfoForm'
import { ResultsDisplay } from '@/components/Generator/ResultsDisplay'

export default function Generator() {
  const { t } = useLanguage()
  const {
    uploadedImages,
    adPurpose,
    brandName,
    brandSlogan,
    websiteUrl,
    isGenerating,
    generatedAds,
    error,
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
  } = useGenerator()

  // 组件卸载时清理资源
  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [cleanup])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            {t('pageTitle')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('pageDescription')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* 错误提示 */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* 左侧：上传和配置区域 */}
            <div className="space-y-6">
              {/* 图片上传组件 */}
              <ImageUpload
                uploadedImages={uploadedImages}
                onImagesUpload={addImages}
                onImageRemove={removeImage}
                error={error}
                setError={setError}
              />

              {/* 广告目的表单 */}
              <AdPurposeForm
                adPurpose={adPurpose}
                setAdPurpose={setAdPurpose}
              />

              {/* 品牌信息表单 */}
              <BrandInfoForm
                brandName={brandName}
                setBrandName={setBrandName}
                brandSlogan={brandSlogan}
                setBrandSlogan={setBrandSlogan}
                websiteUrl={websiteUrl}
                setWebsiteUrl={setWebsiteUrl}
              />

              {/* 生成按钮 */}
              <Button
                onClick={generateAds}
                disabled={isGenerating || uploadedImages.length === 0 || !adPurpose.trim()}
                className="w-full py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {t('generating')}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    {t('generateButton')}
                  </>
                )}
              </Button>
            </div>

            {/* 右侧：结果展示区域 */}
            <ResultsDisplay
              generatedAds={generatedAds}
              onDownloadImage={downloadImage}
              onDownloadAll={downloadAll}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 