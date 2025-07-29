'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { submitDemandForm, initDatabase, type DemandFormData } from '@/lib/api-utils'
import { useLanguage } from '@/lib/i18n'

interface FormData {
  name: string
  email: string
  challenges: string[]
  videoTypes: string[]
  benefits: string[]
  budget: string
  trialInterest: string
  otherChallenges: string
  otherVideoTypes: string
  otherBenefits: string
}

export default function DemandForm() {
  const { t } = useLanguage()
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    challenges: [],
    videoTypes: [],
    benefits: [],
    budget: '',
    trialInterest: '',
    otherChallenges: '',
    otherVideoTypes: '',
    otherBenefits: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  // 组件挂载时初始化数据库
  useEffect(() => {
    const initializeDb = async () => {
      try {
        await initDatabase()
      } catch (error) {
        console.error('Database initialization failed:', error)
      }
    }
    initializeDb()
  }, [])

  const challengeOptions = [
    t('challengesOptions.time'),
    t('challengesOptions.skills'),
    t('challengesOptions.cost'),
    t('challengesOptions.quality'),
    t('challengesOptions.other')
  ]

  const videoTypeOptions = [
    t('videoTypesOptions.marketing'),
    t('videoTypesOptions.training'),
    t('videoTypesOptions.entertainment'),
    t('videoTypesOptions.education'),
    t('videoTypesOptions.other')
  ]

  const benefitOptions = [
    t('benefitsOptions.efficiency'),
    t('benefitsOptions.quality'),
    t('benefitsOptions.cost'),
    t('benefitsOptions.time'),
    t('benefitsOptions.other')
  ]

  const budgetOptions = [
    t('budgetOptions.low'),
    t('budgetOptions.medium'),
    t('budgetOptions.high'),
    t('budgetOptions.enterprise')
  ]

  const handleCheckboxChange = (field: keyof FormData, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value]
      return { ...prev, [field]: newArray }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email) {
      setSubmitStatus('error')
      setSubmitMessage('请填写邮箱地址')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // 处理"其他"选项
      const processedChallenges = formData.challenges.includes('其他') && formData.otherChallenges
        ? [...formData.challenges.filter(c => c !== '其他'), formData.otherChallenges]
        : formData.challenges.filter(c => c !== '其他')

      const processedVideoTypes = formData.videoTypes.includes('其他') && formData.otherVideoTypes
        ? [...formData.videoTypes.filter(v => v !== '其他'), formData.otherVideoTypes]
        : formData.videoTypes.filter(v => v !== '其他')

      const processedBenefits = formData.benefits.includes('其他') && formData.otherBenefits
        ? [...formData.benefits.filter(b => b !== '其他'), formData.otherBenefits]
        : formData.benefits.filter(b => b !== '其他')
      
      // 准备提交数据
      const submitData: DemandFormData = {
        name: formData.name || undefined,
        email: formData.email,
        challenges: processedChallenges.length > 0 ? processedChallenges : undefined,
        videoTypes: processedVideoTypes.length > 0 ? processedVideoTypes : undefined,
        benefits: processedBenefits.length > 0 ? processedBenefits : undefined,
        budget: formData.budget || undefined,
        interestInTrial: formData.trialInterest === 'yes'
      }

      // 提交到后端API
      const result = await submitDemandForm(submitData)
      
      if (result.success) {
      setSubmitStatus('success')
        setSubmitMessage(result.message)
        // 重置表单
      setFormData({
        name: '',
        email: '',
        challenges: [],
        videoTypes: [],
        benefits: [],
        budget: '',
        trialInterest: '',
        otherChallenges: '',
        otherVideoTypes: '',
        otherBenefits: ''
      })
      } else {
        setSubmitStatus('error')
        setSubmitMessage(result.message)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setSubmitMessage(t('submitError'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="form" className="py-20 px-4 bg-white/50">
      <div className="container mx-auto max-w-4xl">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            {t('formTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('formSubtitle')}
          </p>
        </div>

        {/* 表单 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 基本信息 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">{t('name')} (可选)</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={t('namePlaceholder')}
                />
              </div>
              <div>
                <Label htmlFor="email">{t('email')} *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder={t('emailPlaceholder')}
                />
              </div>
            </div>

            {/* 当前挑战 */}
            <div>
              <Label className="text-base font-semibold">{t('challenges')} (多选)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {challengeOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`challenge-${option}`}
                      checked={formData.challenges.includes(option)}
                      onCheckedChange={() => handleCheckboxChange('challenges', option)}
                    />
                    <Label htmlFor={`challenge-${option}`} className="text-sm">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.challenges.includes(t('challengesOptions.other')) && (
                <Textarea
                  className="mt-4"
                  placeholder={t('otherChallengesPlaceholder')}
                  value={formData.otherChallenges}
                  onChange={(e) => setFormData(prev => ({ ...prev, otherChallenges: e.target.value }))}
                />
              )}
            </div>

            {/* 期望视频类型 */}
            <div>
              <Label className="text-base font-semibold">{t('videoTypes')} (多选)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {videoTypeOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`videoType-${option}`}
                      checked={formData.videoTypes.includes(option)}
                      onCheckedChange={() => handleCheckboxChange('videoTypes', option)}
                    />
                    <Label htmlFor={`videoType-${option}`} className="text-sm">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.videoTypes.includes(t('videoTypesOptions.other')) && (
                <Textarea
                  className="mt-4"
                  placeholder={t('otherVideoTypesPlaceholder')}
                  value={formData.otherVideoTypes}
                  onChange={(e) => setFormData(prev => ({ ...prev, otherVideoTypes: e.target.value }))}
                />
              )}
            </div>

            {/* 期望的 AI 解决方案优势 */}
            <div>
              <Label className="text-base font-semibold">{t('benefits')} (多选)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {benefitOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`benefit-${option}`}
                      checked={formData.benefits.includes(option)}
                      onCheckedChange={() => handleCheckboxChange('benefits', option)}
                    />
                    <Label htmlFor={`benefit-${option}`} className="text-sm">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.benefits.includes(t('benefitsOptions.other')) && (
                <Textarea
                  className="mt-4"
                  placeholder={t('otherBenefitsPlaceholder')}
                  value={formData.otherBenefits}
                  onChange={(e) => setFormData(prev => ({ ...prev, otherBenefits: e.target.value }))}
                />
              )}
            </div>

            {/* 预算期望 */}
            <div>
              <Label className="text-base font-semibold">
                {t('budget')}
              </Label>
              <RadioGroup
                value={formData.budget}
                onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
              >
                {budgetOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`budget-${option}`} />
                    <Label htmlFor={`budget-${option}`} className="text-sm">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* 免费试用兴趣 */}
            <div>
              <Label className="text-base font-semibold">
                {t('interestInTrial')}
              </Label>
              <RadioGroup
                value={formData.trialInterest}
                onValueChange={(value) => setFormData(prev => ({ ...prev, trialInterest: value }))}
                className="flex space-x-6 mt-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="trial-yes" />
                  <Label htmlFor="trial-yes">{t('trialYes')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="trial-no" />
                  <Label htmlFor="trial-no">{t('trialNo')}</Label>
                </div>
              </RadioGroup>
            </div>

            {/* 提交按钮 */}
            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || !formData.email}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {t('submitting')}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {t('submit')}
                  </>
                )}
              </Button>
            </div>

            {/* 提交状态 */}
            {submitStatus === 'success' && (
              <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 p-4 rounded-lg">
                <CheckCircle className="w-5 h-5" />
                <span>{submitMessage}</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center justify-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span>{submitMessage}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
} 