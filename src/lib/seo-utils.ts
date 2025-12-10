/**
 * SEO Helper Utility for React/TypeScript
 * Use this component to manage dynamic meta tags and structured data
 * 
 * Installation: Place in src/lib/seo-utils.ts
 * Usage: Import and use in your components or layout
 */

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  schema?: Record<string, any>;
}

/**
 * Update document head meta tags
 */
export const updateSEOMeta = (config: SEOConfig): void => {
  // Title
  if (config.title) {
    document.title = config.title;
    updateOrCreateMetaTag('name', 'og:title', config.ogTitle || config.title);
    updateOrCreateMetaTag('name', 'twitter:title', config.twitterTitle || config.title);
  }

  // Description
  if (config.description) {
    updateOrCreateMetaTag('name', 'description', config.description);
    updateOrCreateMetaTag('property', 'og:description', config.ogDescription || config.description);
    updateOrCreateMetaTag('name', 'twitter:description', config.twitterDescription || config.description);
  }

  // Keywords
  if (config.keywords) {
    updateOrCreateMetaTag('name', 'keywords', config.keywords);
  }

  // Open Graph
  if (config.ogImage) {
    updateOrCreateMetaTag('property', 'og:image', config.ogImage);
  }

  if (config.ogUrl) {
    updateOrCreateMetaTag('property', 'og:url', config.ogUrl);
  }

  // Twitter
  if (config.twitterImage) {
    updateOrCreateMetaTag('name', 'twitter:image', config.twitterImage);
  }

  // Canonical URL
  if (config.canonicalUrl) {
    updateOrCreateCanonical(config.canonicalUrl);
  }

  // Author
  if (config.author) {
    updateOrCreateMetaTag('name', 'author', config.author);
  }

  // Dates
  if (config.datePublished) {
    updateOrCreateMetaTag('property', 'article:published_time', config.datePublished);
  }

  if (config.dateModified) {
    updateOrCreateMetaTag('property', 'article:modified_time', config.dateModified);
  }
};

/**
 * Update or create a meta tag
 */
const updateOrCreateMetaTag = (
  attribute: 'name' | 'property',
  attributeValue: string,
  content: string
): void => {
  let tag = document.querySelector(`meta[${attribute}="${attributeValue}"]`) as HTMLMetaElement;

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, attributeValue);
    document.head.appendChild(tag);
  }

  tag.content = content;
};

/**
 * Update or create canonical link
 */
const updateOrCreateCanonical = (url: string): void => {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }

  link.href = url;
};

/**
 * Add JSON-LD structured data
 */
export const addJSONLD = (schema: Record<string, any>): void => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Common SEO configurations for different page types
 */
export const SEO_TEMPLATES = {
  homepage: {
    title: 'Free AI Resume Builder | Create Professional CVs in 5 Minutes',
    description: 'Create stunning AI-powered resumes and CVs in under 5 minutes with free email signup. ATS-friendly templates, instant PDF download, 5 generations per day, and 100% free forever.',
    keywords: 'free AI resume builder, CV maker, resume generator, ATS-friendly resume, professional CV',
  },

  builder: {
    title: 'Free AI-Powered Resume Builder | Create Your CV in 5 Minutes',
    description: 'Start building your professional resume now. AI-powered suggestions, multiple templates, and instant download. Free email signup. 5 free generations per day. No credit card required.',
    keywords: 'resume builder, CV creator, free resume maker, professional resume',
  },

  templates: {
    title: 'Professional Resume Templates | Free & ATS-Friendly | CVAI',
    description: 'Browse our collection of modern, classic, and creative resume templates. All templates are ATS-compatible and designed for maximum impact.',
    keywords: 'resume templates, CV templates, professional templates, ATS-friendly',
  },

  blog: {
    title: 'Resume Writing Tips & Career Advice | CVAI Blog',
    description: 'Learn expert tips for writing compelling resumes, optimizing for ATS, and landing your dream job. Updated regularly with industry insights.',
    keywords: 'resume tips, career advice, job search tips, resume writing guide',
  },

  faq: {
    title: 'FAQ | Free AI Resume Builder | CVAI',
    description: 'Find answers to common questions about CVAI, resume building, ATS optimization, and file formats.',
    keywords: 'FAQ, frequently asked questions, resume help',
  },
};

/**
 * Generate breadcrumb schema
 */
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
): Record<string, any> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

/**
 * Generate article schema
 */
export const generateArticleSchema = (config: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  url: string;
}): Record<string, any> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: config.headline,
    description: config.description,
    image: config.image,
    datePublished: config.datePublished,
    dateModified: config.dateModified,
    author: {
      '@type': 'Organization',
      name: config.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CVAI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://YOUR_DOMAIN_HERE/logo.png',
      },
    },
  };
};

/**
 * Generate product/service schema
 */
export const generateProductSchema = (config: {
  name: string;
  description: string;
  image: string;
  price: string;
  priceCurrency: string;
  availability: string;
  ratingValue: number;
  ratingCount: number;
}): Record<string, any> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: config.name,
    description: config.description,
    image: config.image,
    offers: {
      '@type': 'Offer',
      price: config.price,
      priceCurrency: config.priceCurrency,
      availability: config.availability,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: config.ratingValue,
      ratingCount: config.ratingCount,
    },
  };
};

/**
 * Generate FAQ schema
 */
export const generateFAQSchema = (
  items: Array<{ question: string; answer: string }>
): Record<string, any> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
};

/**
 * React Hook for SEO management
 * Usage: useSEO(seoConfig)
 */
export const useSEO = (config: SEOConfig): void => {
  React.useEffect(() => {
    updateSEOMeta(config);

    if (config.schema) {
      addJSONLD(config.schema);
    }

    // Cleanup (optional)
    return () => {
      // Reset to default if needed
    };
  }, [config]);
};

/**
 * Generate hreflang tags for multilingual content
 */
export const generateHreflangTags = (
  urls: Record<string, string> // locale: url
): void => {
  // Remove existing hreflang tags
  document.querySelectorAll('link[rel="alternate"]').forEach((tag) => tag.remove());

  // Add new hreflang tags
  Object.entries(urls).forEach(([locale, url]) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hrefLang = locale;
    link.href = url;
    document.head.appendChild(link);
  });

  // Add x-default
  if (urls.en) {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hrefLang = 'x-default';
    link.href = urls.en;
    document.head.appendChild(link);
  }
};

/**
 * Track Core Web Vitals for Google Search Console
 */
export const initCoreWebVitalsTracking = (): void => {
  // Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.log('LCP tracking not supported');
    }
  }

  // Cumulative Layout Shift (CLS)
  if ('PerformanceObserver' in window) {
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.log('CLS tracking not supported');
    }
  }
};

// Import React for the hook
import React from 'react';
