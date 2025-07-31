// 测试文案生成 API
import { NextRequest, NextResponse } from 'next/server'
import { generateCopyText } from '@/lib/ai/copytext-generator'

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json()
    
    const testRequest = {
      adPurpose: body.adPurpose || '测试广告目的',
      brandInfo: {
        name: body.brandName || '测试品牌',
        slogan: body.brandSlogan || '测试口号',
        url: body.websiteUrl || 'https://example.com'
      }
    }

    console.log('🧪 Testing copy text generation...')
    console.log('Request:', testRequest)

    const startTime = Date.now()
    const result = await generateCopyText(testRequest)
    const endTime = Date.now()

    console.log(`⏱️ Generation took ${endTime - startTime}ms`)
    console.log('Result:', result)

    return NextResponse.json({
      success: true,
      result,
      timing: {
        duration: endTime - startTime,
        timestamp: new Date().toISOString()
      },
      testRequest
    })

  } catch (error) {
    console.error('Test copytext API error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    message: 'Use POST method to test copy text generation',
    example: {
      method: 'POST',
      body: {
        adPurpose: '推广新产品',
        brandName: '我的品牌',
        brandSlogan: '品质生活',
        websiteUrl: 'https://mybrand.com'
      }
    }
  })
}
