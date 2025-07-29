'use client'

import { Video, Mail, Heart } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

export default function Footer() {
  const { t } = useLanguage()
  
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
              {t('footerDescription')}
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <span>{t('madeWith')}</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>{t('forCreators')}</span>
            </div>
          </div>

          {/* 快速链接 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('features')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('showcase')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('demand')}
                </button>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('contactUs')}</h3>
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
                {t('workingHours')}
              </p>
            </div>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            {t('footerText')}
          </p>
          <div className="flex justify-center space-x-4 mt-2 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-400 transition-colors">
              {t('privacyPolicy')}
            </a>
            <span>•</span>
            <a href="#" className="hover:text-gray-400 transition-colors">
              {t('termsOfService')}
            </a>
            <span>•</span>
            <a href="#" className="hover:text-gray-400 transition-colors">
              {t('cookiePolicy')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 