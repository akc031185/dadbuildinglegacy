'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { WebsiteRequestSchema, type WebsiteRequest } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const PAGE_OPTIONS = [
  'Home/Landing Page',
  'About Us',
  'Services',
  'Portfolio/Gallery',
  'Testimonials',
  'Contact',
  'Blog',
  'FAQ',
  'Team',
  'Pricing'
]

const FEATURE_OPTIONS = [
  'Contact Forms',
  'Online Booking/Scheduling',
  'E-commerce/Online Store',
  'Blog/News Section',
  'Photo Gallery',
  'Video Integration',
  'Live Chat',
  'Social Media Integration',
  'Email Newsletter Signup',
  'Customer Reviews/Testimonials',
  'Multi-language Support',
  'Analytics/Tracking'
]

const TONE_OPTIONS = [
  'Professional',
  'Friendly & Casual',
  'Authoritative',
  'Creative & Playful',
  'Luxury/Premium',
  'Technical/Detailed'
]

export default function BuildMySitePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{
    success: boolean
    message: string
    requestId?: string
  } | null>(null)

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<WebsiteRequest>({
    resolver: zodResolver(WebsiteRequestSchema),
    defaultValues: {
      pagesWanted: [],
      features: [],
      hasDomain: false,
      hasLogo: false,
      autoRegister: false,
    }
  })

  const watchHasDomain = watch('hasDomain')
  const watchHasLogo = watch('hasLogo')
  const watchPagesWanted = watch('pagesWanted') || []
  const watchFeatures = watch('features') || []

  const onSubmit = async (data: WebsiteRequest) => {
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitResult({
          success: true,
          message: result.message,
          requestId: result.requestId
        })
      } else {
        setSubmitResult({
          success: false,
          message: result.error || 'Failed to submit request'
        })
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'Network error. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePage = (page: string) => {
    const current = watchPagesWanted
    const updated = current.includes(page)
      ? current.filter(p => p !== page)
      : [...current, page]
    setValue('pagesWanted', updated)
  }

  const toggleFeature = (feature: string) => {
    const current = watchFeatures
    const updated = current.includes(feature)
      ? current.filter(f => f !== feature)
      : [...current, feature]
    setValue('features', updated)
  }

  if (submitResult?.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h1>
          <p className="text-gray-600 mb-4">{submitResult.message}</p>
          {submitResult.requestId && (
            <p className="text-sm text-gray-500 font-mono bg-gray-100 p-2 rounded mb-4">
              Request ID: {submitResult.requestId}
            </p>
          )}
          <Link href="/">
            <Button className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dad Building Legacy
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Build My Website
          </h1>
          <p className="text-lg text-gray-600">
            Get a professional website created for your business by the Dad Building Legacy team
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    {...register('fullName')}
                    className={errors.fullName ? 'border-red-500' : ''}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                  />
                </div>

                <div>
                  <Label htmlFor="community">Community *</Label>
                  <Controller
                    name="community"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={errors.community ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select your community" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Gator">Gator</SelectItem>
                          <SelectItem value="SubTo">SubTo</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.community && (
                    <p className="text-red-500 text-sm mt-1">{errors.community.message}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Business Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Business Information</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="companyName">Company/Business Name *</Label>
                  <Input
                    id="companyName"
                    {...register('companyName')}
                    className={errors.companyName ? 'border-red-500' : ''}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="siteGoal">What's the main goal of your website? *</Label>
                  <Textarea
                    id="siteGoal"
                    {...register('siteGoal')}
                    placeholder="e.g., Generate leads, showcase services, sell products, build brand awareness..."
                    className={errors.siteGoal ? 'border-red-500' : ''}
                  />
                  {errors.siteGoal && (
                    <p className="text-red-500 text-sm mt-1">{errors.siteGoal.message}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Domain Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Domain & Branding</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="hasDomain"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label>I already have a domain name</Label>
                  </div>
                </div>

                {watchHasDomain ? (
                  <div>
                    <Label htmlFor="currentDomain">Your Current Domain</Label>
                    <Input
                      id="currentDomain"
                      {...register('currentDomain')}
                      placeholder="e.g., mybusiness.com"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label>Domain Preferences (optional)</Label>
                      <Input
                        placeholder="Enter preferred domain names, separated by commas"
                        onChange={(e) => {
                          const domains = e.target.value.split(',').map(d => d.trim()).filter(Boolean)
                          setValue('domainPreferences', domains)
                        }}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        We'll check availability and suggest alternatives if needed
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Controller
                        name="autoRegister"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label>Automatically register the best available domain for me</Label>
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Controller
                      name="hasLogo"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label>I need a logo created</Label>
                  </div>
                  
                  {watchHasLogo && (
                    <div>
                      <Label htmlFor="logoPrompt">Logo Description/Requirements</Label>
                      <Textarea
                        id="logoPrompt"
                        {...register('logoPrompt')}
                        placeholder="Describe your vision for the logo, preferred colors, style, symbols, etc."
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Website Structure */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Website Structure</h2>
              
              <div className="space-y-6">
                <div>
                  <Label>Pages Needed *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {PAGE_OPTIONS.map((page) => (
                      <div key={page} className="flex items-center space-x-2">
                        <Checkbox
                          checked={watchPagesWanted.includes(page)}
                          onCheckedChange={() => togglePage(page)}
                        />
                        <Label className="text-sm">{page}</Label>
                      </div>
                    ))}
                  </div>
                  {errors.pagesWanted && (
                    <p className="text-red-500 text-sm mt-1">{errors.pagesWanted.message}</p>
                  )}
                </div>

                <div>
                  <Label>Features & Functionality</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {FEATURE_OPTIONS.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          checked={watchFeatures.includes(feature)}
                          onCheckedChange={() => toggleFeature(feature)}
                        />
                        <Label className="text-sm">{feature}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Additional Details */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Additional Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="copyTone">Content Tone & Style</Label>
                  <Controller
                    name="copyTone"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          {TONE_OPTIONS.map((tone) => (
                            <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="crmProvider">CRM/Lead Management</Label>
                  <Input
                    id="crmProvider"
                    {...register('crmProvider')}
                    placeholder="e.g., GoHighLevel, HubSpot, Salesforce"
                  />
                </div>

                <div>
                  <Label htmlFor="timeline">Preferred Timeline</Label>
                  <Input
                    id="timeline"
                    {...register('timeline')}
                    placeholder="e.g., ASAP, 2 weeks, 1 month"
                  />
                </div>

                <div>
                  <Label htmlFor="budget">Budget Range</Label>
                  <Input
                    id="budget"
                    {...register('budget')}
                    placeholder="e.g., $500-1000, Flexible"
                  />
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor="specialRequests">Special Requests or Additional Info</Label>
                <Textarea
                  id="specialRequests"
                  {...register('specialRequests')}
                  placeholder="Any specific requirements, inspirational websites, or additional details..."
                />
              </div>
            </section>

            {/* Submit */}
            <div className="pt-6 border-t">
              {submitResult && !submitResult.success && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-700">{submitResult.message}</span>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Submitting Request...
                  </>
                ) : (
                  'Submit Website Request'
                )}
              </Button>

              <p className="text-sm text-gray-500 text-center mt-4">
                We'll review your request and contact you within 24 hours to discuss next steps.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}