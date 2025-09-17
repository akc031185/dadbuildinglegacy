import { NextRequest, NextResponse } from 'next/server'

// Mark this route as dynamic to avoid static generation errors
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Simulated domain availability check (in production, you'd use a real domain API)
const domainExtensions = [
  { ext: '.com', price: 12.99, yearlyPrice: 12.99, popular: true, description: 'Most popular choice' },
  { ext: '.net', price: 14.99, yearlyPrice: 14.99, popular: false, description: 'Great for tech companies' },
  { ext: '.org', price: 13.99, yearlyPrice: 13.99, popular: false, description: 'Perfect for organizations' },
  { ext: '.io', price: 39.99, yearlyPrice: 39.99, popular: true, description: 'Popular with startups' },
  { ext: '.co', price: 24.99, yearlyPrice: 24.99, popular: false, description: 'Modern alternative to .com' },
  { ext: '.app', price: 18.99, yearlyPrice: 18.99, popular: false, description: 'Perfect for apps' },
  { ext: '.dev', price: 15.99, yearlyPrice: 15.99, popular: false, description: 'Great for developers' },
  { ext: '.biz', price: 16.99, yearlyPrice: 16.99, popular: false, description: 'Business focused' },
  { ext: '.info', price: 11.99, yearlyPrice: 11.99, popular: false, description: 'Information sites' },
  { ext: '.tech', price: 22.99, yearlyPrice: 22.99, popular: false, description: 'Technology focused' }
]

// Simulate some domains being unavailable
const unavailableDomains = ['google', 'facebook', 'amazon', 'microsoft', 'apple', 'netflix']

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const domain = searchParams.get('domain')?.toLowerCase().trim()

    if (!domain || domain.length < 2) {
      return NextResponse.json({ error: 'Domain name too short' }, { status: 400 })
    }

    // Clean domain name - remove any existing extensions
    const cleanDomain = domain.replace(/\.(com|net|org|io|co|app|dev|biz|info|tech)$/i, '')

    if (cleanDomain.length < 2) {
      return NextResponse.json({ error: 'Domain name too short' }, { status: 400 })
    }

    // Check availability for each extension
    const results = domainExtensions.map(({ ext, price, yearlyPrice, popular, description }) => {
      const fullDomain = cleanDomain + ext
      const isUnavailable = unavailableDomains.some(unavailable =>
        cleanDomain.toLowerCase().includes(unavailable)
      )

      // Simulate some random unavailability for popular extensions
      const randomUnavailable = popular && Math.random() < 0.3

      return {
        domain: fullDomain,
        extension: ext,
        available: !isUnavailable && !randomUnavailable,
        price: price,
        yearlyPrice: yearlyPrice,
        popular: popular,
        description: description,
        reason: isUnavailable ? 'Domain unavailable' : undefined
      }
    })

    return NextResponse.json({
      domain: cleanDomain,
      results: results,
      searchedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error checking domain availability:', error)
    return NextResponse.json(
      { error: 'Failed to check domain availability' },
      { status: 500 }
    )
  }
}