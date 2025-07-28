'use client'

import { Video, Mail, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo 和描述 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Video className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">AI Video Tool</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              通过 AI 技术革新广告视频制作，让每个品牌都能拥有专业级的视频素材。
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for creators</span>
            </div>
          </div>

          {/* 快速链接 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  首页
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  功能特性
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  视频样本
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  提交需求
                </button>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">联系我们</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <a 
                  href="mailto:contact@aivideotool.com" 
                  className="hover:text-white transition-colors"
                >
                  contact@aivideotool.com
                </a>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-gray-400 text-sm">
                工作时间：周一至周五 9:00-18:00
              </p>
            </div>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 AI Video Tool. 保留所有权利。
          </p>
          <div className="flex justify-center space-x-4 mt-2 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-400 transition-colors">
              隐私政策
            </a>
            <span>•</span>
            <a href="#" className="hover:text-gray-400 transition-colors">
              服务条款
            </a>
            <span>•</span>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Cookie 政策
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 