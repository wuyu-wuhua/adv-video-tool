import { useRef, useCallback } from 'react'
import { Upload, X, Image } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

type UploadedImage = {
  id: string
  file: File
  preview: string
  size: number
}

type ImageUploadProps = {
  uploadedImages: UploadedImage[]
  onImagesUpload: (images: UploadedImage[]) => void
  onImageRemove: (id: string) => void
  error: string
  setError: (error: string) => void
}

export function ImageUpload({
  uploadedImages,
  onImagesUpload,
  onImageRemove,
  error,
  setError
}: ImageUploadProps) {
  const { t } = useLanguage()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 处理文件上传
  const handleFileUpload = useCallback((files: FileList) => {
    const newImages: UploadedImage[] = []
    
    Array.from(files).forEach((file) => {
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        setError(t('errorInvalidFile'))
        return
      }
      
      // 验证文件大小 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError(t('errorFileTooLarge'))
        return
      }
      
      const id = Math.random().toString(36).substr(2, 9)
      const preview = URL.createObjectURL(file)
      
      newImages.push({
        id,
        file,
        preview,
        size: file.size
      })
    })
    
    onImagesUpload(newImages)
    setError('')
  }, [onImagesUpload, setError, t])

  // 拖拽上传处理
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files)
    }
  }, [handleFileUpload])

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Image className="w-5 h-5 mr-2" />
        {t('uploadTitle')}
      </h2>
      
      <div
        className="border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg p-8 text-center transition-colors"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">
          {t('uploadDescription')}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-blue-600 hover:text-blue-700 font-medium ml-1"
          >
            {t('uploadClickText')}
          </button>
        </p>
        <p className="text-sm text-gray-500">
          {t('uploadFormat')}
        </p>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        />
      </div>

      {/* 已上传图片预览 */}
      {uploadedImages.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">{t('uploadedImages')}</h3>
          <div className="grid grid-cols-2 gap-4">
            {uploadedImages.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.preview}
                  alt="预览"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => onImageRemove(image.id)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="text-xs text-gray-500 mt-1">
                  {(image.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 