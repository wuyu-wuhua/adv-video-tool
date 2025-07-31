'use client'

import { useState } from 'react'

export default function SetupDatabasePage() {
  const [checking, setChecking] = useState(false)
  const [result, setResult] = useState<any>(null)

  const checkTable = async () => {
    setChecking(true)
    try {
      const response = await fetch('/api/create-generation-table')
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setChecking(false)
    }
  }

  const createTable = async () => {
    setChecking(true)
    try {
      const response = await fetch('/api/create-generation-table', {
        method: 'POST'
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setChecking(false)
    }
  }

  const copySQL = () => {
    if (result?.sql) {
      navigator.clipboard.writeText(result.sql)
      alert('SQL已复制到剪贴板')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            数据库设置
          </h1>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              检查 generation_history 表
            </h2>
            
            <div className="space-x-4 mb-4">
              <button
                onClick={checkTable}
                disabled={checking}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {checking ? '检查中...' : '检查表状态'}
              </button>
              
              <button
                onClick={createTable}
                disabled={checking}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                {checking ? '处理中...' : '获取创建SQL'}
              </button>
            </div>
          </div>

          {result && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">结果</h3>
              
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
                </div>
                
                <p className="text-gray-700 mb-2">{result.message}</p>
                
                {result.tableExists !== undefined && (
                  <p className="text-sm text-gray-600">
                    表状态: {result.tableExists ? '✅ 存在' : '❌ 不存在'}
                  </p>
                )}
                
                {result.error && (
                  <p className="text-red-600 text-sm mt-2">
                    错误: {result.error}
                  </p>
                )}
              </div>

              {result.sql && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">创建表的SQL语句</h4>
                    <button
                      onClick={copySQL}
                      className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                    >
                      复制SQL
                    </button>
                  </div>
                  
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
                    {result.sql}
                  </pre>
                </div>
              )}

              {result.instructions && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-800 mb-2">操作步骤</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                    {result.instructions.map((instruction: string, index: number) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">说明</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• <strong>generation_history</strong> 表用于存储广告生成的历史记录</p>
              <p>• 包含字段：id, user_id, input_image_urls, ad_purpose, brand_info, generated_ad_urls, status, created_at, updated_at</p>
              <p>• 如果表不存在，需要在 Supabase SQL Editor 中手动执行 SQL 语句</p>
              <p>• 创建表后，重新检查状态确认是否成功</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">⚠️ 重要提示</h4>
            <p className="text-yellow-700 text-sm">
              由于安全限制，无法通过 API 直接创建数据库表。请按照上面的步骤在 Supabase 控制台中手动执行 SQL 语句。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
