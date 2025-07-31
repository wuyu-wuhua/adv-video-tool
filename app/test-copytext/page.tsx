'use client'

import { useState } from 'react'

export default function TestCopytextPage() {
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [formData, setFormData] = useState({
    adPurpose: '推广新产品，提高品牌知名度',
    brandName: '测试品牌',
    brandSlogan: '品质生活，值得信赖',
    websiteUrl: 'https://example.com'
  })

  const testCopyGeneration = async () => {
    setTesting(true)
    setResult(null)

    try {
      console.log('🧪 Starting copy text test...')
      
      const response = await fetch('/api/test-copytext', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      setResult(data)

      console.log('Test result:', data)
    } catch (error) {
      console.error('Test error:', error)
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            文案生成测试
          </h1>

          {/* 测试表单 */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">测试参数</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  广告目的
                </label>
                <textarea
                  value={formData.adPurpose}
                  onChange={(e) => setFormData({...formData, adPurpose: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  品牌名称
                </label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => setFormData({...formData, brandName: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  品牌口号
                </label>
                <input
                  type="text"
                  value={formData.brandSlogan}
                  onChange={(e) => setFormData({...formData, brandSlogan: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  网站URL
                </label>
                <input
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <button
              onClick={testCopyGeneration}
              disabled={testing}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {testing ? '测试中...' : '开始测试文案生成'}
            </button>
          </div>

          {/* 测试结果 */}
          {result && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">测试结果</h2>
              
              <div className={`p-4 rounded-lg border ${
                result.success 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="mb-2">
                  <span className={`font-medium ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.success ? '✅ 成功' : '❌ 失败'}
                  </span>
                  
                  {result.timing && (
                    <span className="ml-4 text-sm text-gray-600">
                      耗时: {result.timing.duration}ms
                    </span>
                  )}
                </div>

                {result.error && (
                  <p className="text-red-600 text-sm mb-2">
                    错误: {result.error}
                  </p>
                )}

                {result.result && result.result.copies && (
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-800 mb-2">生成的文案:</h3>
                    <div className="space-y-3">
                      {result.result.copies.map((copy: any, index: number) => (
                        <div key={index} className="bg-white p-3 rounded border">
                          <div className="text-sm text-gray-600 mb-1">版本 {index + 1}</div>
                          <div><strong>标题:</strong> {copy.title}</div>
                          <div><strong>描述:</strong> {copy.description}</div>
                          <div><strong>CTA:</strong> {copy.cta}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                    查看完整响应
                  </summary>
                  <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">测试说明</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• 这个测试会直接调用文案生成API</p>
              <p>• 如果AI服务超时或失败，会自动使用默认文案</p>
              <p>• 观察控制台日志可以看到详细的执行过程</p>
              <p>• 正常情况下应该在45秒内返回结果</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
