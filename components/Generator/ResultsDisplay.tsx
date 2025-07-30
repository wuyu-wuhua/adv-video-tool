import { Download, DownloadCloud, CheckCircle, Image } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n'

type GeneratedAd = {
  id: string
  imageUrl: string
  aspectRatio: string
  dimensions: string
  downloadUrl: string
}

type ResultsDisplayProps = {
  generatedAds: GeneratedAd[]
  onDownloadImage: (ad: GeneratedAd) => void
  onDownloadAll: () => void
}

export function ResultsDisplay({
  generatedAds,
  onDownloadImage,
  onDownloadAll
}: ResultsDisplayProps) {
  const { t } = useLanguage()

  if (generatedAds.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          {t('resultsTitle')}
        </h2>
        <div className="text-center py-12 text-gray-500">
          <Image className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>{t('resultsEmpty')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <CheckCircle className="w-5 h-5 mr-2" />
        {t('resultsTitle')}
      </h2>
      
      <div className="space-y-6">
        {/* 批量下载按钮 */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {t('totalGenerated').replace('{count}', generatedAds.length.toString())}
          </span>
          <Button
            onClick={onDownloadAll}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <DownloadCloud className="w-4 h-4 mr-2" />
            {t('downloadAll')}
          </Button>
        </div>
        
        {/* 广告素材预览 */}
        <div className="space-y-4">
          {generatedAds.map((ad) => (
            <div key={ad.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    {ad.aspectRatio}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({ad.dimensions})
                  </span>
                </div>
                <Button
                  onClick={() => onDownloadImage(ad)}
                  size="sm"
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-1" />
                  {t('downloadSingle')}
                </Button>
              </div>
              <img
                src={ad.imageUrl}
                alt={`广告素材 ${ad.aspectRatio}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 