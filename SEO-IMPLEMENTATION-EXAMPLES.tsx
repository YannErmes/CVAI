/**
 * SEO IMPLEMENTATION EXAMPLES
 * Copy-paste these examples into your React components
 */

// ============================================
// EXAMPLE 1: Homepage with SEO
// ============================================

import React from 'react';
import SEOHelmet from '@/components/SEOHelmet';
import { SEO_TEMPLATES, generateBreadcrumbSchema } from '@/lib/seo-utils';

export default function HomePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://YOUR_DOMAIN_HERE/' },
  ]);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://YOUR_DOMAIN_HERE/#organization",
    "name": "CVAI",
    "url": "https://YOUR_DOMAIN_HERE/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://YOUR_DOMAIN_HERE/logo-512x512.png"
    },
    "description": "Free AI-powered resume and CV builder",
    "sameAs": [
      "https://www.twitter.com/YourTwitterHandle",
      "https://www.linkedin.com/company/cvai"
    ]
  };

  return (
    <>
      <SEOHelmet
        title={SEO_TEMPLATES.homepage.title}
        description={SEO_TEMPLATES.homepage.description}
        keywords={SEO_TEMPLATES.homepage.keywords}
        ogTitle="Free AI Resume Builder - Create Professional CVs in 5 Minutes"
        ogDescription="100% free, no sign-up resume builder powered by AI. Create ATS-friendly resumes instantly."
        ogImage="https://YOUR_DOMAIN_HERE/og-image-1200x630.jpg"
        ogUrl="https://YOUR_DOMAIN_HERE/"
        canonicalUrl="https://YOUR_DOMAIN_HERE/"
        author="CVAI Team"
        datePublished="2024-01-01T00:00:00Z"
        dateModified="2025-01-15T00:00:00Z"
        schema={[organizationSchema, breadcrumbSchema]}
      />

      <main>
        <h1>Create Professional Resumes with AI in Just 5 Minutes</h1>
        <p>Craft a stunning, ATS-friendly resume in minutes, not hours...</p>
        
        {/* Rest of homepage content */}
      </main>
    </>
  );
}

// ============================================
// EXAMPLE 2: Resume Builder Page
// ============================================

import React from 'react';
import SEOHelmet from '@/components/SEOHelmet';
import { SEO_TEMPLATES, generateBreadcrumbSchema } from '@/lib/seo-utils';

export default function ResumeBuilder() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://YOUR_DOMAIN_HERE/' },
    { name: 'Resume Builder', url: 'https://YOUR_DOMAIN_HERE/resume-builder' },
  ]);

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CVAI - AI Resume Builder",
    "description": "Free AI-powered resume and CV builder",
    "url": "https://YOUR_DOMAIN_HERE/resume-builder",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <SEOHelmet
        title={SEO_TEMPLATES.builder.title}
        description={SEO_TEMPLATES.builder.description}
        keywords={SEO_TEMPLATES.builder.keywords}
        canonicalUrl="https://YOUR_DOMAIN_HERE/resume-builder"
        schema={[softwareAppSchema, breadcrumbSchema]}
      />

      <main>
        <h1>Build Your Resume - AI Resume Builder</h1>
        {/* Builder component */}
      </main>
    </>
  );
}

// ============================================
// EXAMPLE 3: Blog Post Page
// ============================================

import React from 'react';
import SEOHelmet from '@/components/SEOHelmet';
import { generateBreadcrumbSchema, generateArticleSchema } from '@/lib/seo-utils';

interface BlogPostProps {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  imageUrl: string;
  content: string;
}

export default function BlogPost({
  title,
  description,
  author,
  datePublished,
  dateModified,
  imageUrl,
  content,
}: BlogPostProps) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const canonicalUrl = `https://YOUR_DOMAIN_HERE/blog/${slug}`;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://YOUR_DOMAIN_HERE/' },
    { name: 'Blog', url: 'https://YOUR_DOMAIN_HERE/blog' },
    { name: title, url: canonicalUrl },
  ]);

  const articleSchema = generateArticleSchema({
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: datePublished,
    dateModified: dateModified,
    author: author,
    url: canonicalUrl,
  });

  return (
    <>
      <SEOHelmet
        title={`${title} - CVAI Blog`}
        description={description}
        keywords={`resume tips, career advice, ${title.toLowerCase()}`}
        ogTitle={title}
        ogDescription={description}
        ogImage={imageUrl}
        ogUrl={canonicalUrl}
        canonicalUrl={canonicalUrl}
        author={author}
        datePublished={datePublished}
        dateModified={dateModified}
        schema={[articleSchema, breadcrumbSchema]}
      />

      <article>
        <h1>{title}</h1>
        <div className="article-meta">
          <span>By {author}</span>
          <span>Published {datePublished}</span>
        </div>
        <img src={imageUrl} alt={title} width={800} height={600} />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </>
  );
}

// ============================================
// EXAMPLE 4: Templates Page with Product Schema
// ============================================

import React from 'react';
import SEOHelmet from '@/components/SEOHelmet';
import { generateBreadcrumbSchema, generateProductSchema } from '@/lib/seo-utils';

interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
}

const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern Resume',
    description: 'Contemporary design with clean typography',
    image: 'https://YOUR_DOMAIN_HERE/template-modern.jpg',
  },
  {
    id: 'classic',
    name: 'Classic Resume',
    description: 'Traditional format preferred by conservative industries',
    image: 'https://YOUR_DOMAIN_HERE/template-classic.jpg',
  },
  {
    id: 'creative',
    name: 'Creative Resume',
    description: 'Bold design for creative industries',
    image: 'https://YOUR_DOMAIN_HERE/template-creative.jpg',
  },
];

export default function TemplatesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://YOUR_DOMAIN_HERE/' },
    { name: 'Templates', url: 'https://YOUR_DOMAIN_HERE/templates' },
  ]);

  return (
    <>
      <SEOHelmet
        title={`Professional Resume Templates | Free & ATS-Friendly | CVAI`}
        description="Browse our collection of modern, classic, and creative resume templates. All templates are ATS-compatible and designed for maximum impact."
        keywords="resume templates, CV templates, professional templates, ATS-friendly"
        canonicalUrl="https://YOUR_DOMAIN_HERE/templates"
        schema={[breadcrumbSchema]}
      />

      <main>
        <h1>Professional Resume Templates</h1>
        
        <div className="templates-grid">
          {templates.map((template) => (
            <div key={template.id} className="template-card">
              <h2>{template.name}</h2>
              <img
                src={template.image}
                alt={`${template.name} template preview`}
                width={300}
                height={400}
              />
              <p>{template.description}</p>
              <a href={`/templates/${template.id}`}>
                Use this template
              </a>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

// ============================================
// EXAMPLE 5: Using SEO Utilities in Components
// ============================================

import React, { useEffect } from 'react';
import {
  updateSEOMeta,
  addJSONLD,
  initCoreWebVitalsTracking,
} from '@/lib/seo-utils';

export default function PerformanceOptimizedPage() {
  useEffect(() => {
    // Update meta tags dynamically
    updateSEOMeta({
      title: 'ATS Resume Checker - Free Tool | CVAI',
      description: 'Check if your resume will pass ATS systems. Free online tool with detailed analysis.',
      keywords: 'ATS checker, resume ATS, applicant tracking system',
      canonicalUrl: 'https://YOUR_DOMAIN_HERE/ats-checker',
    });

    // Add schema
    addJSONLD({
      "@context": "https://schema.org",
      "@type": "Tool",
      "name": "ATS Resume Checker",
      "description": "Check your resume for ATS compatibility",
      "url": "https://YOUR_DOMAIN_HERE/ats-checker"
    });

    // Initialize Core Web Vitals tracking
    initCoreWebVitalsTracking();

    // Track custom events
    if (window.gtag) {
      gtag('event', 'page_view', {
        'page_title': 'ATS Resume Checker',
      });
    }
  }, []);

  return (
    <main>
      <h1>Check Your Resume for ATS Compatibility</h1>
      {/* ATS Checker component */}
    </main>
  );
}

// ============================================
// EXAMPLE 6: FAQ Page with FAQ Schema
// ============================================

import React from 'react';
import SEOHelmet from '@/components/SEOHelmet';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo-utils';

const faqItems = [
  {
    question: "What is an AI resume builder?",
    answer: "An AI resume builder is an intelligent tool that uses artificial intelligence to help you create professional, ATS-friendly resumes. It analyzes your information and optimizes it for maximum impact."
  },
  {
    question: "Is CVAI completely free?",
    answer: "Yes, CVAI is 100% free forever. There are no hidden charges, no premium subscriptions, or credit card requirements."
  },
  {
    question: "Do I need to sign up to use CVAI?",
    answer: "No, you don't need to sign up or create an account. Simply visit CVAI, fill in your information, choose a template, and download."
  },
];

export default function FAQPage() {
  const faqSchema = generateFAQSchema(faqItems);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://YOUR_DOMAIN_HERE/' },
    { name: 'FAQ', url: 'https://YOUR_DOMAIN_HERE/faq' },
  ]);

  return (
    <>
      <SEOHelmet
        title="FAQ | Free AI Resume Builder | CVAI"
        description="Find answers to common questions about CVAI, resume building, ATS optimization, and file formats."
        keywords="FAQ, frequently asked questions, resume help"
        canonicalUrl="https://YOUR_DOMAIN_HERE/faq"
        schema={[faqSchema, breadcrumbSchema]}
      />

      <main>
        <h1>Frequently Asked Questions</h1>

        <div className="faq-list">
          {faqItems.map((item, index) => (
            <div key={index} className="faq-item">
              <h2>{item.question}</h2>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

// ============================================
// EXAMPLE 7: Google Analytics Event Tracking
// ============================================

// Add to your main App.tsx or tracking module
export function setupAnalyticsEvents() {
  // Track resume creation
  window.gtag?.('event', 'resume_created', {
    'template': 'modern',
    'time_to_complete': 287,
    'device': 'mobile',
    'event_category': 'engagement',
    'event_label': 'resume_completed'
  });

  // Track resume download
  window.gtag?.('event', 'resume_downloaded', {
    'format': 'pdf',
    'template': 'modern',
    'event_category': 'conversion',
    'event_label': 'download_pdf'
  });

  // Track template selection
  window.gtag?.('event', 'template_selected', {
    'template': 'modern',
    'event_category': 'engagement'
  });

  // Track form abandonment
  window.gtag?.('event', 'form_abandoned', {
    'section': 'work_experience',
    'event_category': 'engagement'
  });

  // Track ATS checker usage
  window.gtag?.('event', 'ats_checker_used', {
    'score': 85,
    'event_category': 'engagement'
  });
}

// ============================================
// EXAMPLE 8: Multilingual SEO (Hreflang)
// ============================================

import { generateHreflangTags } from '@/lib/seo-utils';

// Call this on page load for multilingual support
export function setupMultilingualSEO() {
  generateHreflangTags({
    'en-US': 'https://YOUR_DOMAIN_HERE/',
    'en-GB': 'https://YOUR_DOMAIN_HERE/en-gb/',
    'es': 'https://es.YOUR_DOMAIN_HERE/',
    'fr': 'https://fr.YOUR_DOMAIN_HERE/',
  });
}

// ============================================
// EXAMPLE 9: Dynamic Meta Tags Based on Route
// ============================================

import { useLocation } from 'react-router-dom';
import SEOHelmet from '@/components/SEOHelmet';

export default function DynamicSEOLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const pageConfigs: Record<string, any> = {
    '/': {
      title: 'Free AI Resume Builder',
      description: 'Create professional resumes in 5 minutes',
    },
    '/resume-builder': {
      title: 'Resume Builder',
      description: 'Start building your resume now',
    },
    '/templates': {
      title: 'Resume Templates',
      description: 'Choose from professional templates',
    },
  };

  const pageConfig = pageConfigs[location.pathname] || pageConfigs['/'];

  return (
    <>
      <SEOHelmet
        title={pageConfig.title + ' - CVAI'}
        description={pageConfig.description}
        canonicalUrl={`https://YOUR_DOMAIN_HERE${location.pathname}`}
      />
      {children}
    </>
  );
}

// ============================================
// EXAMPLE 10: Internal Link Component with SEO
// ============================================

import React from 'react';

interface SEOLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function SEOLink({ href, children, className, title }: SEOLinkProps) {
  return (
    <a
      href={href}
      className={className}
      title={title || String(children)}
      rel="internal"
    >
      {children}
    </a>
  );
}

// Usage:
// <SEOLink href="/templates" title="Browse professional resume templates">
//   View All Templates
// </SEOLink>

export default {
  setupAnalyticsEvents,
  setupMultilingualSEO,
};
