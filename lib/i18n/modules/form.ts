import type { FormTranslations } from '../types'

export const formTranslations: Record<'en' | 'zh', FormTranslations> = {
  en: {
    formTitle: 'Tell Us Your Needs',
    formSubtitle: 'Fill out the form below and we will provide you with a personalized AI material solution',
    name: 'Name/Company Name',
    email: 'Email Address',
    namePlaceholder: 'Please enter your name or company name',
    emailPlaceholder: 'Please enter your email address',
    challenges: 'Current challenges you face (multiple choice)',
    benefits: 'Expected AI solution advantages (multiple choice)',
    budget: 'For single project AI services, what budget are you willing to pay?',
    interestInTrial: 'Are you willing to participate in a free trial or one-on-one interview?',
    trialYes: 'Yes, I am willing to participate in a free trial or one-on-one interview',
    trialNo: 'No, I just want to submit my requirements',
    submit: 'Submit Requirements',
    submitting: 'Submitting...',
    submitError: 'Submission failed, please try again later',
    otherChallengesPlaceholder: 'Please describe in detail the other challenges you face...',
    otherBenefitsPlaceholder: 'Please describe the other advantages you expect...',
    challengesOptions: {
      time: 'Time consuming',
      skills: 'Lack of skills',
      cost: 'High cost',
      quality: 'Quality issues',
      other: 'Other'
    },
    benefitsOptions: {
      efficiency: 'Improve efficiency',
      quality: 'Better quality',
      cost: 'Reduce costs',
      time: 'Save time',
      other: 'Other'
    },
    budgetOptions: {
      low: 'Under $100',
      medium: '$100-$500',
      high: '$500-$1000',
      enterprise: 'Over $1000'
    }
  },
  zh: {
    formTitle: '告诉我们您的需求',
    formSubtitle: '填写以下表单，我们将为您提供个性化的 AI 素材解决方案',
    name: '姓名/公司名称',
    email: '邮箱地址',
    namePlaceholder: '请输入您的姓名或公司名称',
    emailPlaceholder: '请输入您的邮箱地址',
    challenges: '当前面临的挑战 (多选)',
    benefits: '期望的 AI 解决方案优势 (多选)',
    budget: '针对单个项目的AI服务，您愿意支付的预算？',
    interestInTrial: '是否愿意参与免费试用或一对一访谈？',
    trialYes: '是，我愿意参与免费试用或一对一访谈',
    trialNo: '否，我只想提交我的需求',
    submit: '提交需求',
    submitting: '提交中...',
    submitError: '提交失败，请稍后重试',
    otherChallengesPlaceholder: '请详细描述您面临的其他挑战...',
    otherBenefitsPlaceholder: '请描述您期望的其他优势...',
    challengesOptions: {
      time: '耗时',
      skills: '缺乏技能',
      cost: '成本高',
      quality: '质量问题',
      other: '其他'
    },
    benefitsOptions: {
      efficiency: '提高效率',
      quality: '更好质量',
      cost: '降低成本',
      time: '节省时间',
      other: '其他'
    },
    budgetOptions: {
      low: '100美元以下',
      medium: '100-500美元',
      high: '500-1000美元',
      enterprise: '1000美元以上'
    }
  }
} 