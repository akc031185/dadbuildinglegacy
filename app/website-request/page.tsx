export default function WebsiteRequestPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)', padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
            Get Your Website Built
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '32rem', margin: '0 auto' }}>
            Professional website creation for your business. From domain selection to logo design,
            we'll handle everything to get your online presence up and running.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
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
          <form style={{ background: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
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
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Preferred Domain Name *</label>
                <input
                  type="text"
                  name="domainName"
                  required
                  placeholder="myawesomesite.com"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                />
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Enter your preferred domain name (we'll check availability)</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Business/Website Type *</label>
                <select
                  name="businessType"
                  required
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
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

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Site Description & Main Functionality *</label>
                <textarea
                  name="siteDescription"
                  required
                  rows={4}
                  placeholder="Describe what your website should do and what your business/application is about. For example: 'A local bakery website that showcases our products, allows online ordering, and shows our location and hours.'"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', resize: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Target Audience *</label>
                <input
                  type="text"
                  name="targetAudience"
                  required
                  placeholder="e.g., Local customers, Small business owners, Young professionals"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Logo Preference</h3>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.75rem' }}>Logo Option *</label>
                <div style={{ marginBottom: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', cursor: 'pointer' }}>
                    <input type="radio" name="logoOption" value="existing" required style={{ marginTop: '0.25rem' }} />
                    <div>
                      <div style={{ fontWeight: '500', color: '#111827' }}>I have an existing logo</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>I'll provide my current logo files</div>
                    </div>
                  </label>
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', cursor: 'pointer' }}>
                    <input type="radio" name="logoOption" value="create-new" required style={{ marginTop: '0.25rem' }} />
                    <div>
                      <div style={{ fontWeight: '500', color: '#111827' }}>Create a new logo for me</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Design a custom logo based on my business</div>
                    </div>
                  </label>
                </div>

                <div>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', cursor: 'pointer' }}>
                    <input type="radio" name="logoOption" value="text-only" required style={{ marginTop: '0.25rem' }} />
                    <div>
                      <div style={{ fontWeight: '500', color: '#111827' }}>Use text-only logo</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Simple text-based branding</div>
                    </div>
                  </label>
                </div>
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
              style={{
                width: '100%',
                padding: '1rem',
                background: '#1e3a8a',
                color: 'white',
                borderRadius: '0.5rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              Submit Website Request
            </button>

            <p style={{ fontSize: '0.875rem', color: '#6b7280', textAlign: 'center', marginTop: '1rem' }}>
              By submitting this form, you agree to our Terms of Service and Privacy Policy.
              We typically respond within 24-48 hours with a project quote and timeline.
            </p>
          </form>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <div style={{ background: 'white', borderRadius: '0.5rem', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>What Happens Next?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
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