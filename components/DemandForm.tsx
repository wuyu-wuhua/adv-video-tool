'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

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

  const challengeOptions = [
    '制作成本高',
    '制作周期长',
    '创意迭代慢',
    '缺乏高质量素材',
    '素材与品牌不符',
    '不确定广告效果',
    '其他'
  ]

  const videoTypeOptions = [
    '产品展示',
    '品牌宣传',
    '促销活动',
    '动画解释',
    '用户证言',
    '社交媒体短视频',
    '其他'
  ]

  const benefitOptions = [
    '降低成本',
    '加快制作速度',
    '提高创意多样性',
    '批量生成',
    '提高广告效果',
    '操作简单',
    '其他'
  ]

  const budgetOptions = [
    '$0 - $50',
    '$51 - $100',
    '$101 - $200',
    '$200+',
    '不确定'
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
      return
    }

    setIsSubmitting(true)
    
    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 这里将来会集成 Supabase
      console.log('Form data:', formData)
      
      setSubmitStatus('success')
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
    } catch (error) {
      setSubmitStatus('error')
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
            告诉我们您的需求
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            填写以下表单，我们将为您提供个性化的 AI 视频解决方案
          </p>
        </div>

        {/* 表单 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 基本信息 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">姓名/公司名称 (可选)</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="请输入您的姓名或公司名称"
                />
              </div>
              <div>
                <Label htmlFor="email">邮箱地址 *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="请输入您的邮箱地址"
                />
              </div>
            </div>

            {/* 当前挑战 */}
            <div>
              <Label className="text-base font-semibold">当前面临的挑战 (多选)</Label>
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
              {formData.challenges.includes('其他') && (
                <Textarea
                  className="mt-4"
                  placeholder="请详细描述您面临的其他挑战..."
                  value={formData.otherChallenges}
                  onChange={(e) => setFormData(prev => ({ ...prev, otherChallenges: e.target.value }))}
                />
              )}
            </div>

            {/* 期望视频类型 */}
            <div>
              <Label className="text-base font-semibold">期望的视频类型 (多选)</Label>
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
              {formData.videoTypes.includes('其他') && (
                <Textarea
                  className="mt-4"
                  placeholder="请描述您期望的其他视频类型..."
                  value={formData.otherVideoTypes}
                  onChange={(e) => setFormData(prev => ({ ...prev, otherVideoTypes: e.target.value }))}
                />
              )}
            </div>

            {/* 期望的 AI 解决方案优势 */}
            <div>
              <Label className="text-base font-semibold">期望的 AI 解决方案优势 (多选)</Label>
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
              {formData.benefits.includes('其他') && (
                <Textarea
                  className="mt-4"
                  placeholder="请描述您期望的其他优势..."
                  value={formData.otherBenefits}
                  onChange={(e) => setFormData(prev => ({ ...prev, otherBenefits: e.target.value }))}
                />
              )}
            </div>

            {/* 预算期望 */}
            <div>
              <Label className="text-base font-semibold">
                针对 15-30 秒定制视频，您愿意支付的预算？
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
                是否愿意参与免费试用或一对一访谈？
              </Label>
              <RadioGroup
                value={formData.trialInterest}
                onValueChange={(value) => setFormData(prev => ({ ...prev, trialInterest: value }))}
                className="flex space-x-6 mt-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="trial-yes" />
                  <Label htmlFor="trial-yes">是，我愿意参与免费试用或一对一访谈</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="trial-no" />
                  <Label htmlFor="trial-no">否，我只想提交我的需求</Label>
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
                    提交中...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    提交需求
                  </>
                )}
              </Button>
            </div>

            {/* 提交状态 */}
            {submitStatus === 'success' && (
              <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 p-4 rounded-lg">
                <CheckCircle className="w-5 h-5" />
                <span>感谢您的反馈！我们已收到您的需求，并将尽快与您联系。</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center justify-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span>提交失败，请检查必填字段并重试。</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
} 