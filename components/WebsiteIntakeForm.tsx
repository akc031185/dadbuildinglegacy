'use client'

import { useState } from 'react'

export default function WebsiteIntakeForm() {
  const [formData, setFormData] = useState({
    domainName: '',
    siteDescription: '',
    businessType: '',
    targetAudience: '',
    logoOption: '',
    contactEmail: '',
    contactName: '',
    phone: '',
    additionalNotes: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/website-intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          domainName: '',
          siteDescription: '',
          businessType: '',
          targetAudience: '',
          logoOption: '',
          contactEmail: '',
          contactName: '',
          phone: '',
          additionalNotes: ''
        })
      } else {
        console.error('Error submitting website request:', result.error)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Network error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Website Creation Request</h2>
        <p className="text-gray-600">Tell us about your website needs and we'll get started</p>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Contact Information</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
            <input
              type="text"
              name="contactName"
              required
              value={formData.contactName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              name="contactEmail"
              required
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      {/* Website Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Website Details</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Domain Name *</label>
          <input
            type="text"
            name="domainName"
            required
            value={formData.domainName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="myawesomesite.com"
          />
          <p className="text-sm text-gray-500 mt-1">Enter your preferred domain name (we'll check availability)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business/Website Type *</label>
          <select
            name="businessType"
            required
            value={formData.businessType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select business type</option>
            <option value="restaurant">Restaurant</option>
            <option value="retail">Retail Store</option>
            <option value="services">Professional Services</option>
            <option value="healthcare">Healthcare</option>
            <option value="real-estate">Real Estate</option>
            <option value="technology">Technology</option>
            <option value="nonprofit">Non-Profit</option>
            <option value="personal">Personal/Portfolio</option>
            <option value="blog">Blog/Content Site</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Description & Main Functionality *</label>
          <textarea
            name="siteDescription"
            required
            rows={4}
            value={formData.siteDescription}
            onChange={handleChange}
            placeholder="Describe what your website should do and what your business/application is about. For example: 'A local bakery website that showcases our products, allows online ordering, and shows our location and hours.'"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience *</label>
          <input
            type="text"
            name="targetAudience"
            required
            value={formData.targetAudience}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Local customers, Small business owners, Young professionals"
          />
        </div>
      </div>

      {/* Logo Options */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Logo Preference</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Logo Option *</label>
          <div className="space-y-3">
            <label className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="logoOption"
                value="existing"
                required
                checked={formData.logoOption === 'existing'}
                onChange={handleChange}
                className="mt-1 text-blue-600"
              />
              <div>
                <div className="font-medium text-gray-900">I have an existing logo</div>
                <div className="text-sm text-gray-500">I'll provide my current logo files</div>
              </div>
            </label>

            <label className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="logoOption"
                value="create-new"
                required
                checked={formData.logoOption === 'create-new'}
                onChange={handleChange}
                className="mt-1 text-blue-600"
              />
              <div>
                <div className="font-medium text-gray-900">Create a new logo for me</div>
                <div className="text-sm text-gray-500">Design a custom logo based on my business</div>
              </div>
            </label>

            <label className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="logoOption"
                value="text-only"
                required
                checked={formData.logoOption === 'text-only'}
                onChange={handleChange}
                className="mt-1 text-blue-600"
              />
              <div>
                <div className="font-medium text-gray-900">Use text-only logo</div>
                <div className="text-sm text-gray-500">Simple text-based branding</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
        <textarea
          name="additionalNotes"
          rows={3}
          value={formData.additionalNotes}
          onChange={handleChange}
          placeholder="Any specific requirements, color preferences, features you'd like, or questions you have..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <strong>Request Submitted Successfully!</strong>
              <p className="text-sm mt-1">Thank you for your website request. We'll review your requirements and get back to you within 24-48 hours with next steps.</p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <strong>Error Submitting Request</strong>
              <p className="text-sm mt-1">There was an error submitting your request. Please try again or contact us directly.</p>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
          isSubmitting
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-blue-900 text-white hover:bg-blue-800'
        }`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting Request...
          </div>
        ) : (
          'Submit Website Request'
        )}
      </button>

      <p className="text-sm text-gray-600 text-center">
        By submitting this form, you agree to our Terms of Service and Privacy Policy.
        We typically respond within 24-48 hours with a project quote and timeline.
      </p>
    </form>
  )
}