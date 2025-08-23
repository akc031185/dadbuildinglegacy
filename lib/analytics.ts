// Analytics utility functions
export const analytics = {
  // Vercel Analytics (automatically included in Vercel deployments)
  // No additional setup needed for basic analytics
  
  // Google Analytics setup (if needed in the future)
  gtag: {
    pageview: (url: string) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
          page_path: url,
        });
      }
    },
    
    event: (action: string, parameters: Record<string, any>) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', action, parameters);
      }
    },
  },
  
  // Plausible Analytics (privacy-focused alternative)
  plausible: {
    trackEvent: (event: string, props?: Record<string, string | number>) => {
      if (typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible(event, { props });
      }
    },
    
    trackPageview: () => {
      if (typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible('pageview');
      }
    },
  },
};

// Custom event tracking for key interactions
export const trackEvent = {
  contactFormSubmit: (topic: string) => {
    analytics.gtag.event('contact_form_submit', {
      event_category: 'engagement',
      event_label: topic,
    });
    analytics.plausible.trackEvent('Contact Form Submit', { topic });
  },
  
  journalPostView: (slug: string, tag: string) => {
    analytics.gtag.event('journal_post_view', {
      event_category: 'content',
      event_label: slug,
      tag: tag,
    });
    analytics.plausible.trackEvent('Journal Post View', { slug, tag });
  },
  
  externalLinkClick: (url: string, location: string) => {
    analytics.gtag.event('external_link_click', {
      event_category: 'engagement',
      event_label: url,
      location: location,
    });
    analytics.plausible.trackEvent('External Link Click', { url, location });
  },
};