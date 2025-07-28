'use client'

import { 
  Zap, 
  DollarSign, 
  Clock, 
  Palette, 
  Target, 
  Shield, 
  Sparkles,
  BarChart3
} from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

export default function FeaturesSection() {
  const features: Feature[] = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "高转化素材",
      description: "基于数据驱动的 AI 算法，生成符合用户心理的高转化率视频素材",
      color: "text-blue-600"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "成本效益",
      description: "相比传统视频制作，成本降低 90%，同时保持专业品质",
      color: "text-green-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "极速迭代",
      description: "从创意到成品仅需数小时，支持快速 A/B 测试和优化",
      color: "text-purple-600"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "品牌一致性",
      description: "智能保持品牌调性和视觉风格，确保所有素材的统一性",
      color: "text-orange-600"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "精准定位",
      description: "根据目标受众特征，自动调整视频风格和内容策略",
      color: "text-red-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "合规保障",
      description: "内置谷歌广告政策检查，确保所有素材符合平台要求",
      color: "text-indigo-600"
    }
  ]

  return (
    <section id="features" className="py-20 px-4 bg-white/50">
      <div className="container mx-auto">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            为什么选择我们的 AI 视频工具？
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我们解决了传统广告视频制作的所有痛点，让您专注于业务增长
          </p>
        </div>

        {/* 功能网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 card-hover"
            >
              <div className={`${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* 统计数据 */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">500+</div>
            <div className="text-gray-600">成功案例</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">50+</div>
            <div className="text-gray-600">行业覆盖</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">99%</div>
            <div className="text-gray-600">客户满意度</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">24h</div>
            <div className="text-gray-600">交付时间</div>
          </div>
        </div>

        {/* 技术优势 */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-800">技术优势</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">数据驱动</h4>
              <p className="text-gray-600 text-sm">基于百万级广告数据训练</p>
            </div>
            <div>
              <Target className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">精准优化</h4>
              <p className="text-gray-600 text-sm">实时优化算法提升效果</p>
            </div>
            <div>
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">安全可靠</h4>
              <p className="text-gray-600 text-sm">企业级安全保障</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 