'use client'

import { useState, useEffect, ChangeEvent } from 'react'

interface DomainOption {
  domain: string
  extension: string
  available: boolean
  price: number
  yearlyPrice: number
  popular: boolean
  description: string
  reason?: string
}

interface DomainSearchResult {
  domain: string
  results: DomainOption[]
  searchedAt: string
}

export default function BuildMySitePage() {
  const [domainInput, setDomainInput] = useState('')
  const [domainResults, setDomainResults] = useState<DomainSearchResult | null>(null)
  const [selectedDomain, setSelectedDomain] = useState<DomainOption | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null)
  const [logoInput, setLogoInput] = useState('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [logoAction, setLogoAction] = useState<'generate' | 'upload' | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const searchDomains = async (domainName: string) => {
    if (domainName.length < 3) {
      setDomainResults(null)
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`/api/domain-check?domain=${encodeURIComponent(domainName)}`)
      if (response.ok) {
        const data = await response.json()
        setDomainResults(data)
      } else {
        console.error('Failed to search domains')
      }
    } catch (error) {
      console.error('Error searching domains:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleDomainInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\.[a-z]+$/i, '').toLowerCase()
    setDomainInput(value)

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    // Set new timeout for search
    const timeout = setTimeout(() => {
      searchDomains(value)
    }, 500) // 500ms delay

    setSearchTimeout(timeout)
  }

  const selectDomain = (domain: DomainOption) => {
    setSelectedDomain(domain)
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      setLogoAction('upload')
    }
  }

  const handleLogoGenerate = () => {
    if (logoInput.trim()) {
      setLogoAction('generate')
      // Here you would typically call your AI logo generation API
      console.log('Generating logo with prompt:', logoInput)
    }
  }

  const handleLogoInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLogoInput(e.target.value)
    // Reset file selection if user starts typing
    if (e.target.value.trim()) {
      setLogoFile(null)
      setLogoPreview(null)
    }
  }

  // Calculate costs
  const websiteDesignCost = 299
  const hostingMonthlyCost = 9.99
  const hostingYearlyCost = hostingMonthlyCost * 12
  const domainYearlyCost = selectedDomain?.yearlyPrice || 0
  const domainMonthlyCost = domainYearlyCost / 12
  const totalOneTimeCost = websiteDesignCost + domainYearlyCost + hostingYearlyCost
  const totalMonthlyCost = hostingMonthlyCost + domainMonthlyCost
  const monthlyAfterFirstYear = hostingMonthlyCost
  const yearlyAfterFirstYear = hostingYearlyCost + domainYearlyCost

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)', padding: 'clamp(1rem, 5vw, 3rem) clamp(0.5rem, 3vw, 1rem)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
            Build My Website
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: '#6b7280', maxWidth: '32rem', margin: '0 auto' }}>
            Professional website creation for your business. From domain selection to logo design,
            we'll handle everything to get your online presence up and running.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', gap: 'clamp(1rem, 4vw, 2rem)', marginBottom: 'clamp(2rem, 6vw, 3rem)' }}>
          <div style={{ background: 'white', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌐</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>Domain & Hosting</h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>We'll help you secure the perfect domain name and set up reliable hosting</p>
          </div>

          <div style={{ background: 'white', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎨</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>Custom Design</h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Professional design tailored to your business and target audience</p>
          </div>

          <div style={{ background: 'white', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚀</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>Quick Launch</h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Fast turnaround to get your website live and generating results</p>
          </div>
        </div>

        <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
          {!isClient ? (
            <div style={{ background: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>Website Creation Request</div>
              <p style={{ color: '#6b7280' }}>Loading form...</p>
            </div>
          ) : (
            <>
              {/* Cost Breakdown Section */}
              {selectedDomain && (
                <div style={{ background: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem', textAlign: 'center' }}>
                    💰 Cost Breakdown
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(1rem, 4vw, 2rem)' }}>
                    {/* First Year Costs */}
                    <div style={{ background: '#f8fafc', borderRadius: '0.5rem', padding: '1.5rem' }}>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e3a8a', marginBottom: '1rem' }}>
                        💳 First Year Costs
                      </h4>
                      <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#374151' }}>Website Design & Development</span>
                        <span style={{ fontWeight: '600', color: '#111827' }}>${websiteDesignCost}</span>
                      </div>
                      <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#374151' }}>Domain ({selectedDomain.domain})</span>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: '600', color: '#111827' }}>${selectedDomain.yearlyPrice}/year</div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>(${domainMonthlyCost.toFixed(2)}/month)</div>
                        </div>
                      </div>
                      <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#374151' }}>Hosting (First Year)</span>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: '600', color: '#111827' }}>${hostingYearlyCost.toFixed(2)}/year</div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>(${hostingMonthlyCost}/month)</div>
                        </div>
                      </div>
                      <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: 'bold' }}>
                          <span style={{ color: '#111827' }}>Total First Year</span>
                          <span style={{ color: '#1e3a8a' }}>${totalOneTimeCost.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                          <span style={{ color: '#6b7280' }}>Monthly equivalent</span>
                          <span style={{ color: '#6b7280' }}>${totalMonthlyCost.toFixed(2)}/month</span>
                        </div>
                      </div>
                    </div>

                    {/* Ongoing Costs */}
                    <div style={{ background: '#f0f9ff', borderRadius: '0.5rem', padding: '1.5rem' }}>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e3a8a', marginBottom: '1rem' }}>
                        🔄 Ongoing Costs (Year 2+)
                      </h4>
                      <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#374151' }}>Hosting & Maintenance</span>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: '600', color: '#111827' }}>${hostingMonthlyCost}/month</div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>(${hostingYearlyCost.toFixed(2)}/year)</div>
                        </div>
                      </div>
                      <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#374151' }}>Domain Renewal</span>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: '600', color: '#111827' }}>${domainMonthlyCost.toFixed(2)}/month</div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>(${selectedDomain.yearlyPrice}/year)</div>
                        </div>
                      </div>
                      <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: 'bold' }}>
                          <span style={{ color: '#111827' }}>Total Monthly</span>
                          <span style={{ color: '#1e3a8a' }}>${totalMonthlyCost.toFixed(2)}/month</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                          <span style={{ color: '#6b7280' }}>Annual equivalent</span>
                          <span style={{ color: '#6b7280' }}>${yearlyAfterFirstYear.toFixed(2)}/year</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 12-Month Breakdown */}
                  <div style={{ marginTop: '2rem', background: '#fefce8', borderRadius: '0.5rem', padding: '1.5rem', border: '1px solid #fde047' }}>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#a16207', marginBottom: '1rem', textAlign: 'center' }}>
                      📊 12-Month Cost Summary
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.875rem', color: '#a16207', marginBottom: '0.25rem' }}>Year 1 Total</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>${totalOneTimeCost.toFixed(2)}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Design + Domain + Hosting</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.875rem', color: '#a16207', marginBottom: '0.25rem' }}>Monthly (Year 2+)</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>${totalMonthlyCost.toFixed(2)}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Hosting + Domain</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.875rem', color: '#a16207', marginBottom: '0.25rem' }}>Annual (Year 2+)</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>${yearlyAfterFirstYear.toFixed(2)}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Yearly renewal</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#ecfdf5', borderRadius: '0.5rem', border: '1px solid #a7f3d0' }}>
                    <p style={{ color: '#065f46', fontSize: '0.875rem', margin: 0, textAlign: 'center' }}>
                      ✅ <strong>What's Included:</strong> Professional design, mobile-responsive layout, basic SEO setup,
                      contact forms, hosting, SSL certificate, and ongoing technical support.
                    </p>
                  </div>
                </div>
              )}

              <form action="/api/website-intake" method="POST" style={{ background: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>Website Creation Request</h2>
                  <p style={{ color: '#6b7280' }}>Tell us about your website needs and we'll get started</p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Contact Information</h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Your Name *</label>
                      <input
                        type="text"
                        name="contactName"
                        required
                        placeholder="John Doe"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Email Address *</label>
                      <input
                        type="email"
                        name="contactEmail"
                        required
                        placeholder="john@example.com"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(555) 123-4567"
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Website Details</h3>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Business Description & Website Purpose *</label>
                    <textarea
                      name="siteDescription"
                      required
                      rows={5}
                      placeholder="Describe your business, what your website should do, and your target audience. For example: 'ABC Construction LLC is a local contractor specializing in residential renovations for homeowners and property investors. We need a website to showcase our projects, get customer inquiries, and display our services. Our target audience includes local homeowners looking for renovations and real estate investors seeking reliable contractors.' OR paste a link to an existing site you'd like to replicate: 'Build a site exactly like https://example.com'"
                      title="Describe your business and website goals, OR paste a URL of an existing website you'd like to replicate"
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', resize: 'none' }}
                    />
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                      💡 <strong>Tip:</strong> Include your business type, company/LLC name, services, target audience, and website goals. <strong>Or simply paste a URL</strong> of an existing website you'd like to replicate (e.g., "Build exactly like https://example.com").
                    </p>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                      🌐 Enter your domain/company/LLC name *
                    </label>
                    <input
                      type="text"
                      value={domainInput}
                      onChange={handleDomainInputChange}
                      placeholder="Enter your company name (e.g., 'ABC Construction LLC' or 'mystore')"
                      title="Search using your business name, LLC name, or any domain idea. We'll show you available options with pricing."
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem'
                      }}
                    />

                    {isSearching && (
                      <div style={{ marginTop: '0.75rem', textAlign: 'center', color: '#6b7280' }}>
                        🔍 Searching available domains...
                      </div>
                    )}

                    {domainResults && domainResults.results.length > 0 && (
                      <div style={{ marginTop: '0.75rem' }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.75rem' }}>
                          Available domains for "{domainResults.domain}":
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', gap: '0.75rem', maxHeight: '300px', overflowY: 'auto' }}>
                          {domainResults.results
                            .filter(option => option.available)
                            .sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
                            .map((option) => (
                              <div
                                key={option.domain}
                                onClick={() => selectDomain(option)}
                                style={{
                                  cursor: 'pointer',
                                  padding: '1rem',
                                  border: selectedDomain?.domain === option.domain ? '2px solid #2563eb' : '1px solid #e5e7eb',
                                  borderRadius: '0.5rem',
                                  background: selectedDomain?.domain === option.domain ? '#eff6ff' : '#f9fafb',
                                  transition: 'all 0.2s',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '0.5rem'
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span style={{ fontWeight: '600', color: '#111827' }}>{option.domain}</span>
                                  {option.popular && <span style={{ fontSize: '0.75rem', color: '#f59e0b' }}>⭐ Popular</span>}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{option.description}</span>
                                  <span style={{ fontWeight: '600', color: '#059669' }}>${option.price}/year</span>
                                </div>
                              </div>
                            ))}
                        </div>

                        {domainResults.results.some(option => !option.available) && (
                          <details style={{ marginTop: '1rem' }}>
                            <summary style={{ fontSize: '0.875rem', color: '#6b7280', cursor: 'pointer' }}>
                              Show unavailable domains ({domainResults.results.filter(option => !option.available).length})
                            </summary>
                            <div style={{ marginTop: '0.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.5rem' }}>
                              {domainResults.results
                                .filter(option => !option.available)
                                .map((option) => (
                                  <div
                                    key={option.domain}
                                    style={{
                                      padding: '0.75rem',
                                      border: '1px solid #fca5a5',
                                      borderRadius: '0.5rem',
                                      background: '#fef2f2',
                                      opacity: 0.7
                                    }}
                                  >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <span style={{ color: '#991b1b' }}>{option.domain}</span>
                                      <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>❌ Unavailable</span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </details>
                        )}
                      </div>
                    )}

                    {/* Hidden input to store selected domain */}
                    <input
                      type="hidden"
                      name="domainName"
                      value={selectedDomain?.domain || ''}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                    🎨 Logo Creation
                  </h3>

                  <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.75rem' }}>
                      Describe your logo or upload an existing one *
                    </label>

                    <div style={{ marginBottom: '1rem' }}>
                      <textarea
                        value={logoInput}
                        onChange={handleLogoInputChange}
                        name="logoDescription"
                        rows={4}
                        placeholder="Describe your ideal logo (e.g., 'Modern minimalist logo for ABC Construction LLC with a hammer and house icon, blue and gray colors, professional feel') OR paste a link to your existing logo..."
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '1rem',
                          resize: 'none',
                          marginBottom: '0.75rem'
                        }}
                      />

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1rem',
                        fontSize: '0.875rem',
                        color: '#6b7280'
                      }}>
                        <span>OR</span>
                        <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label
                          htmlFor="logoFile"
                          style={{
                            display: 'inline-block',
                            padding: '0.75rem 1rem',
                            background: 'white',
                            border: '2px dashed #d1d5db',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            textAlign: 'center',
                            width: '100%',
                            transition: 'all 0.2s',
                            fontSize: '0.875rem',
                            color: '#374151'
                          }}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault()
                            const files = e.dataTransfer.files
                            if (files[0]) {
                              const syntheticEvent = {
                                target: { files: [files[0]] }
                              } as any
                              handleFileUpload(syntheticEvent)
                            }
                          }}
                        >
                          📁 Click to upload or drag & drop your existing logo
                          <br />
                          <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                            PNG, JPG, SVG, or PDF (max 5MB)
                          </span>
                        </label>
                        <input
                          id="logoFile"
                          type="file"
                          onChange={handleFileUpload}
                          accept="image/*,.pdf"
                          style={{ display: 'none' }}
                        />
                      </div>

                      {logoPreview && (
                        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                          <img
                            src={logoPreview}
                            alt="Logo preview"
                            style={{
                              maxWidth: '200px',
                              maxHeight: '100px',
                              borderRadius: '0.5rem',
                              border: '1px solid #e5e7eb'
                            }}
                          />
                          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                            ✅ Logo uploaded successfully
                          </p>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleLogoGenerate}
                        disabled={!logoInput.trim() && !logoFile}
                        style={{
                          width: '100%',
                          padding: '0.875rem',
                          background: (logoInput.trim() || logoFile) ? '#2563eb' : '#9ca3af',
                          color: 'white',
                          borderRadius: '0.5rem',
                          fontSize: '1rem',
                          fontWeight: '600',
                          border: 'none',
                          cursor: (logoInput.trim() || logoFile) ? 'pointer' : 'not-allowed',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        {logoFile ? '📁 Add Existing Logo' : '🤖 Generate Logo with AI'}
                      </button>

                      {logoAction && (
                        <div style={{
                          marginTop: '1rem',
                          padding: '0.75rem',
                          background: logoAction === 'generate' ? '#ecfdf5' : '#eff6ff',
                          borderRadius: '0.5rem',
                          border: `1px solid ${logoAction === 'generate' ? '#a7f3d0' : '#bfdbfe'}`,
                          fontSize: '0.875rem'
                        }}>
                          {logoAction === 'generate' ? (
                            <span style={{ color: '#065f46' }}>
                              ✨ <strong>AI Logo Generation:</strong> We'll create a custom logo based on your description: "{logoInput}"
                            </span>
                          ) : (
                            <span style={{ color: '#1e40af' }}>
                              📁 <strong>Existing Logo:</strong> We'll use your uploaded logo file for your website
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                      💡 <strong>Tip:</strong> For AI generation, include your business name, preferred colors, style (modern, vintage, etc.), and any symbols or icons you'd like
                    </p>

                    {/* Hidden inputs for form submission */}
                    <input type="hidden" name="logoAction" value={logoAction || ''} />
                    <input type="hidden" name="logoDescription" value={logoInput} />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Additional Notes</label>
                  <textarea
                    name="additionalNotes"
                    rows={3}
                    placeholder="Any specific requirements, color preferences, features you'd like, or questions you have..."
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', resize: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!selectedDomain}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: selectedDomain ? '#1e3a8a' : '#9ca3af',
                    color: 'white',
                    borderRadius: '0.5rem',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: selectedDomain ? 'pointer' : 'not-allowed',
                    transition: 'background-color 0.2s'
                  }}
                >
                  {selectedDomain ? 'Submit Website Request' : 'Please Select a Domain First'}
                </button>

                <p style={{ fontSize: '0.875rem', color: '#6b7280', textAlign: 'center', marginTop: '1rem' }}>
                  By submitting this form, you agree to our Terms of Service and Privacy Policy.
                  We typically respond within 24-48 hours with a project quote and timeline.
                </p>
              </form>
            </>
          )}
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <div style={{ background: 'white', borderRadius: '0.5rem', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>What Happens Next?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', gap: 'clamp(1rem, 4vw, 1.5rem)', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ flexShrink: 0, width: '2rem', height: '2rem', background: '#2563eb', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>1</div>
                <div>
                  <h4 style={{ fontWeight: '600', color: '#111827' }}>Review & Quote</h4>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>We'll review your requirements and send you a detailed quote within 24-48 hours</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ flexShrink: 0, width: '2rem', height: '2rem', background: '#2563eb', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>2</div>
                <div>
                  <h4 style={{ fontWeight: '600', color: '#111827' }}>Design & Build</h4>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Once approved, we'll start designing and building your website</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ flexShrink: 0, width: '2rem', height: '2rem', background: '#2563eb', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>3</div>
                <div>
                  <h4 style={{ fontWeight: '600', color: '#111827' }}>Launch & Support</h4>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>We'll launch your site and provide ongoing support and maintenance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}