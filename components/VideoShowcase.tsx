'use client'

import { useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const [muted, setMuted] = useState<{ [key: string]: boolean }>({})

  const videoSamples: VideoSample[] = [
    {
      id: '1',
      title: '电商产品展示',
      description: '突出产品特性和使用场景，适合电商平台推广',
      duration: '20s',
      category: '电商',
      thumbnail: '/api/placeholder/400/225',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
    },
    {
      id: '2',
      title: '品牌故事短片',
      description: '讲述品牌理念和价值观，建立情感连接',
      duration: '15s',
      category: '品牌',
      thumbnail: '/api/placeholder/400/225',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4'
    },
    {
      id: '3',
      title: '促销活动宣传',
      description: '突出优惠信息和限时性，刺激用户行动',
      duration: '30s',
      category: '促销',
      thumbnail: '/api/placeholder/400/225',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4'
    },
    {
      id: '4',
      title: '用户证言视频',
      description: '真实用户分享使用体验，增强信任度',
      duration: '25s',
      category: '证言',
      thumbnail: '/api/placeholder/400/225',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
    },
    {
      id: '5',
      title: '社交媒体短视频',
      description: '适合各平台传播的竖屏短视频格式',
      duration: '15s',
      category: '社交',
      thumbnail: '/api/placeholder/400/225',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4'
    },
    {
      id: '6',
      title: '动画解释视频',
      description: '复杂概念的可视化解释，易于理解',
      duration: '45s',
      category: '教育',
      thumbnail: '/api/placeholder/400/225',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4'
    }
  ]

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

  return (
    <section id="showcase" className="py-20 px-4">
      <div className="container mx-auto">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            高质量视频样本展示
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            基于 Runway Gen-4 技术生成的多样化视频素材，满足不同广告需求
          </p>
        </div>

        {/* 视频网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoSamples.map((sample) => (
            <div key={sample.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden card-hover">
              {/* 视频容器 */}
              <div className="relative aspect-video bg-gray-100">
                <video
                  id={`video-${sample.id}`}
                  className="w-full h-full object-cover"
                  poster={sample.thumbnail}
                  muted={muted[sample.id] || true}
                  loop
                  onPlay={() => handleVideoPlay(sample.id)}
                  onPause={handleVideoPause}
                >
                  <source src={sample.videoUrl} type="video/mp4" />
                  您的浏览器不支持视频播放。
                </video>

                {/* 视频控制按钮 */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-black/50 text-white hover:bg-black/70"
                      onClick={() => {
                        const video = document.getElementById(`video-${sample.id}`) as HTMLVideoElement
                        if (video) {
                          if (playingVideo === sample.id) {
                            video.pause()
                          } else {
                            video.play()
                          }
                        }
                      }}
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
                      className="bg-black/50 text-white hover:bg-black/70"
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
                      className="bg-black/50 text-white hover:bg-black/70"
                      onClick={() => toggleFullscreen(sample.id)}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* 时长标签 */}
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {sample.duration}
                </div>

                {/* 分类标签 */}
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  {sample.category}
                </div>
              </div>

              {/* 视频信息 */}
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

        {/* 说明文字 */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              🎬 所有视频均符合谷歌广告规范
            </h3>
            <p className="text-gray-600 leading-relaxed">
              我们的 AI 系统会自动检查并确保生成的视频素材符合谷歌广告政策要求，
              包括内容合规性、时长限制、格式规范等，让您无需担心审核问题。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 