'use client'

import { useLanguage } from '@/lib/i18n'

interface MaterialSample {
  id: string
  title: string
  description: string
  category: string
  thumbnail: string
}

export default function MaterialShowcase() {
  const { t } = useLanguage()

  // 素材样本数据
  const materialSamples: MaterialSample[] = [
    {
      id: '1',
      title: t('video1.title'),
      description: t('video1.description'),
      category: t('video1.category'),
      thumbnail: '/img/1.jpg'
    },
    {
      id: '2',
      title: t('video2.title'),
      description: t('video2.description'),
      category: t('video2.category'),
      thumbnail: '/img/2.jpg'
    },
    {
      id: '3',
      title: t('video3.title'),
      description: t('video3.description'),
      category: t('video3.category'),
      thumbnail: '/img/3.jpg'
    },
    {
      id: '4',
      title: t('video4.title'),
      description: t('video4.description'),
      category: t('video4.category'),
      thumbnail: '/img/4.jpg'
    },
    {
      id: '5',
      title: t('video5.title'),
      description: t('video5.description'),
      category: t('video5.category'),
      thumbnail: '/img/5.jpg'
    },
    {
      id: '6',
      title: t('video6.title'),
      description: t('video6.description'),
      category: t('video6.category'),
      thumbnail: '/img/6.jpg'
    }
  ]

  return (
    <section id="showcase" className="py-20 px-4">
      <div className="container mx-auto">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            {t('showcaseTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('showcaseSubtitle')}
          </p>
        </div>

        {/* 素材展示网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {materialSamples.map((sample) => (
            <div key={sample.id} className="group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200/60 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-blue-200/80">
              {/* 图片展示区域 */}
              <div className="relative aspect-video bg-gray-100 overflow-hidden rounded-t-2xl shadow-inner">
                <img
                  src={sample.thumbnail}
                  alt={sample.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* 分类标签 */}
                <div className="absolute top-3 left-3 bg-blue-600/90 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm shadow-md">
                  {sample.category}
                </div>
              </div>

              {/* 素材信息展示 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {sample.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {sample.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 合规说明 */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {t('showcaseCompliance.title')}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t('showcaseCompliance.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 