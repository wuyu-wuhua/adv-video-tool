'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(
        searchParams.get('code') || ''
      )

      if (error) {
        console.error('Auth callback error:', error)
        router.push('/?error=auth_failed')
      } else {
        router.push('/')
      }
    }

    if (searchParams.get('code')) {
      handleCallback()
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-2">处理登录中...</h1>
        <p className="text-gray-600">请稍等</p>
      </div>
    </div>
  )
} 