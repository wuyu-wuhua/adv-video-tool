import { Target } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/lib/i18n'

type AdPurposeFormProps = {
  adPurpose: string
  setAdPurpose: (purpose: string) => void
}

export function AdPurposeForm({ adPurpose, setAdPurpose }: AdPurposeFormProps) {
  const { t } = useLanguage()
  
  const commonPurposes = [
    t('purposeIncreaseRegistrations'),
    t('purposePromoteFeatures'),
    t('purposeAITools'),
    t('purposeProductIntro'),
    t('purposePromotion'),
    t('purposeBrandAwareness')
  ]

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Target className="w-5 h-5 mr-2" />
        {t('adPurposeTitle')}
      </h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="adPurpose">{t('adPurposeLabel')}</Label>
          <Textarea
            id="adPurpose"
            value={adPurpose}
            onChange={(e) => setAdPurpose(e.target.value)}
            placeholder={t('adPurposePlaceholder')}
            className="mt-2"
            rows={3}
          />
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">{t('commonPurposes')}</h4>
          <div className="flex flex-wrap gap-2">
            {commonPurposes.map((purpose) => (
              <button
                key={purpose}
                onClick={() => setAdPurpose(purpose)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {purpose}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 