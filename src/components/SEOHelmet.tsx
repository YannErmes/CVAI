/**
 * SEO Helmet Component
 * Wrapper component for managing head elements in React
 * Place in src/components/SEOHelmet.tsx
 * 
 * Usage in components:
 * <SEOHelmet
 *   title="Page Title"
 *   description="Page description"
 *   schema={seoSchema}
 * />
 */

import React from 'react';
import { useEffect } from 'react';

interface SEOHelmetProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterCreator?: string;
  canonicalUrl?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  schema?: Record<string, any>[];
  robots?: string;
  children?: React.ReactNode;
}

/**
 * SEO Helmet Component for managing document head
 */
export const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterCard = 'summary_large_image',
  twitterCreator,
  canonicalUrl,
  author,
  datePublished,
  dateModified,
  schema,
  robots,
  children,
}) => {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
    }

    // Helper function to update or create meta tags
    const updateMetaTag = (
      selector: string,
      attribute: string,
      attributeValue: string,
      content: string
    ) => {
      let tag = document.querySelector(selector) as HTMLMetaElement;
      if (!tag) {
        tag = document.createElement('meta');
        if (attribute === 'property') {
          tag.setAttribute('property', attributeValue);
        } else {
          tag.setAttribute('name', attributeValue);
        }
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Update meta tags
    if (description) {
      updateMetaTag('meta[name="description"]', 'name', 'description', description);
    }

    if (keywords) {
      updateMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    if (author) {
      updateMetaTag('meta[name="author"]', 'name', 'author', author);
    }

    if (robots) {
      updateMetaTag('meta[name="robots"]', 'name', 'robots', robots);
    }

    // Open Graph tags
    if (ogTitle) {
      updateMetaTag('meta[property="og:title"]', 'property', 'og:title', ogTitle || title || '');
    }

    if (ogDescription) {
      updateMetaTag(
        'meta[property="og:description"]',
        'property',
        'og:description',
        ogDescription || description || ''
      );
    }

    if (ogImage) {
      updateMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    }

    if (ogUrl) {
      updateMetaTag('meta[property="og:url"]', 'property', 'og:url', ogUrl);
    }

    // Twitter tags
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', twitterCard);

    if (twitterCreator) {
      updateMetaTag('meta[name="twitter:creator"]', 'name', 'twitter:creator', twitterCreator);
    }

    // Canonical URL
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
    }

    // Date tags
    if (datePublished) {
      updateMetaTag(
        'meta[property="article:published_time"]',
        'property',
        'article:published_time',
        datePublished
      );
    }

    if (dateModified) {
      updateMetaTag(
        'meta[property="article:modified_time"]',
        'property',
        'article:modified_time',
        dateModified
      );
    }

    // JSON-LD Schema
    if (schema && schema.length > 0) {
      // Remove existing schema scripts
      document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
        if (script.dataset.managed === 'true') {
          script.remove();
        }
      });

      // Add new schema scripts
      schema.forEach((schemaItem) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schemaItem);
        script.dataset.managed = 'true';
        document.head.appendChild(script);
      });
    }
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    twitterCard,
    twitterCreator,
    canonicalUrl,
    author,
    datePublished,
    dateModified,
    schema,
    robots,
  ]);

  return <>{children}</>;
};

export default SEOHelmet;
