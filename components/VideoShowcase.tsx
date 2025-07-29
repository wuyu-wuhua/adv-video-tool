'use client'

import { useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n'

interface VideoSample {
  id: string
  title: string
  description: string
  duration: string
  category: string
  thumbnail: string
  videoUrl: string
}

export default function VideoShowcase() {
  const { t } = useLanguage()
  
  // 视频播放状态管理
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const [muted, setMuted] = useState<{ [key: string]: boolean }>({})

  // 视频样本数据
  const videoSamples: VideoSample[] = [
    {
      id: '1',
      title: t('video1.title'),
      description: t('video1.description'),
      duration: '10s',
      category: t('video1.category'),
      thumbnail: '/img/1.jpg',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
    },
    {
      id: '2',
      title: t('video2.title'),
      description: t('video2.description'),
      duration: '10s',
      category: t('video2.category'),
      thumbnail: '/img/2.jpg',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4'
    },
    {
      id: '3',
      title: t('video3.title'),
      description: t('video3.description'),
      duration: '10s',
      category: t('video3.category'),
      thumbnail: '/img/3.jpg',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4'
    },
    {
      id: '4',
      title: t('video4.title'),
      description: t('video4.description'),
      duration: '10s',
      category: t('video4.category'),
      thumbnail: '/img/4.jpg',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
    },
    {
      id: '5',
      title: t('video5.title'),
      description: t('video5.description'),
      duration: '10s',
      category: t('video5.category'),
      thumbnail: '/img/5.jpg',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4'
    },
    {
      id: '6',
      title: t('video6.title'),
      description: t('video6.description'),
      duration: '10s',
      category: t('video6.category'),
      thumbnail: '/img/6.jpg',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4'
    }
  ]

  // 视频控制函数
  const handleVideoPlay = (videoId: string) => {
    setPlayingVideo(videoId)
    // 停止其他视频
    videoSamples.forEach(sample => {
      if (sample.id !== videoId) {
        const video = document.getElementById(`video-${sample.id}`) as HTMLVideoElement
        if (video) {
          video.pause()
        }
      }
    })
  }

  const handleVideoPause = () => {
    setPlayingVideo(null)
  }

  const toggleMute = (videoId: string) => {
    setMuted(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }))
  }

  const toggleFullscreen = (videoId: string) => {
    const video = document.getElementById(`video-${videoId}`) as HTMLVideoElement
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen()
      }
    }
  }

  // 视频播放/暂停切换
  const handleVideoToggle = (videoId: string) => {
    const video = document.getElementById(`video-${videoId}`) as HTMLVideoElement
    if (video) {
      if (playingVideo === videoId) {
        video.pause()
      } else {
        video.play()
      }
    }
  }

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

        {/* 视频展示网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoSamples.map((sample) => (
            <div key={sample.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden card-hover">
              {/* 视频播放区域 */}
              <div className="relative aspect-video bg-gray-100 overflow-hidden rounded-t-2xl">
                <video
                  id={`video-${sample.id}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  poster={sample.thumbnail}
                  muted={muted[sample.id] || true}
                  loop
                  onPlay={() => handleVideoPlay(sample.id)}
                  onPause={handleVideoPause}
                >
                  <source src={sample.videoUrl} type="video/mp4" />
                  {t('videoNotSupported')}
                </video>

                {/* 视频控制按钮 */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm"
                      onClick={() => handleVideoToggle(sample.id)}
                    >
                      {playingVideo === sample.id ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm"
                      onClick={() => toggleMute(sample.id)}
                    >
                      {muted[sample.id] ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm"
                      onClick={() => toggleFullscreen(sample.id)}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* 时长标签 */}
                <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                  {sample.duration}
                </div>

                {/* 分类标签 */}
                <div className="absolute top-3 left-3 bg-blue-600/90 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                  {sample.category}
                </div>
              </div>

              {/* 视频信息展示 */}
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