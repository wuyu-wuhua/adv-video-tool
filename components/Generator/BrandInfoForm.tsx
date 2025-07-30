import { Building2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/lib/i18n'

type BrandInfoFormProps = {
  brandName: string
  setBrandName: (name: string) => void
  brandSlogan: string
  setBrandSlogan: (slogan: string) => void
  websiteUrl: string
  setWebsiteUrl: (url: string) => void
}

export function BrandInfoForm({
  brandName,
  setBrandName,
  brandSlogan,
  setBrandSlogan,
  websiteUrl,
  setWebsiteUrl
}: BrandInfoFormProps) {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Building2 className="w-5 h-5 mr-2" />
        {t('brandInfoTitle')}
      </h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="brandName">{t('brandNameLabel')}</Label>
          <Input
            id="brandName"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder={t('brandNamePlaceholder')}
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="brandSlogan">{t('brandSloganLabel')}</Label>
          <Input
            id="brandSlogan"
            value={brandSlogan}
            onChange={(e) => setBrandSlogan(e.target.value)}
            placeholder={t('brandSloganPlaceholder')}
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="websiteUrl">{t('websiteUrlLabel')}</Label>
          <Input
            id="websiteUrl"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder={t('websiteUrlPlaceholder')}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  )
} 