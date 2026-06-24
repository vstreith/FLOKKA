import type { Metadata } from 'next'

/**
 * Configuration SEO centrale de FLOKKA.
 * L'URL de production est pilotable via NEXT_PUBLIC_SITE_URL (Vercel),
 * avec repli sur le domaine de marque.
 */
export const SITE = {
  name: 'FLOKKA',
  legalName: 'FLOKKA',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.flokka.fr').replace(/\/+$/, ''),
  locale: 'fr_FR',
  lang: 'fr',
  description:
    "FLOKKA crée des boutiques textiles privées pour clubs sportifs et associations. Réassort à l'unité, sans gestion de stock, fabrication locale en Alsace (Andlau, Bas-Rhin).",
  slogan: 'Le textile personnalisé des clubs et associations, sans stock.',
  email: 'contact@flokka.fr',
  phoneDisplay: '06 00 00 00 00',
  phoneE164: '+33600000000',
  address: {
    street: 'Andlau',
    city: 'Andlau',
    postalCode: '67140',
    region: 'Grand Est',
    regionShort: 'Alsace',
    department: 'Bas-Rhin',
    country: 'FR',
  },
  geo: { lat: 48.387, lng: 7.418 },
  ogImage: '/brand/logo.png',
  ogImageWidth: 2000,
  ogImageHeight: 1010,
  twitter: '@flokka',
  foundingYear: '2024',
  sameAs: [] as string[],
  areaServed: ['France', 'Alsace', 'Bas-Rhin', 'Grand Est'],
} as const

export function absoluteUrl(path = '/'): string {
  if (path.startsWith('http')) return path
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}

interface PageMetaInput {
  title: string
  description: string
  path: string
  keywords?: string[]
  ogType?: 'website' | 'article'
  image?: string
  publishedTime?: string
  modifiedTime?: string
  noindex?: boolean
}

/** Construit un objet Metadata Next.js complet (title, description, canonical, OG, Twitter, robots). */
export function pageMetadata(input: PageMetaInput): Metadata {
  const url = absoluteUrl(input.path)
  const image = absoluteUrl(input.image || SITE.ogImage)

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical: url },
    robots: input.noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        },
    openGraph: {
      type: input.ogType ?? 'website',
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      title: input.title,
      description: input.description,
      images: [{ url: image, width: SITE.ogImageWidth, height: SITE.ogImageHeight, alt: `${SITE.name} — ${input.title}` }],
      ...(input.ogType === 'article'
        ? { publishedTime: input.publishedTime, modifiedTime: input.modifiedTime ?? input.publishedTime }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [image],
    },
  }
}

/* ──────────────────────────────────────────────────────────
 * Schema.org (JSON-LD) builders
 * ────────────────────────────────────────────────────────── */

const ORG_ID = `${SITE.url}/#organization`
const WEBSITE_ID = `${SITE.url}/#website`

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: absoluteUrl('/brand/logo.png'),
    image: absoluteUrl(SITE.ogImage),
    email: SITE.email,
    telephone: SITE.phoneE164,
    foundingDate: SITE.foundingYear,
    slogan: SITE.slogan,
    description: SITE.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postalCode,
      addressRegion: SITE.address.regionShort,
      addressCountry: SITE.address.country,
    },
    areaServed: SITE.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
    sameAs: SITE.sameAs,
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    '@id': `${SITE.url}/#localbusiness`,
    name: SITE.name,
    image: absoluteUrl(SITE.ogImage),
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phoneE164,
    priceRange: '€€',
    description: SITE.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postalCode,
      addressRegion: SITE.address.regionShort,
      addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    areaServed: SITE.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
    parentOrganization: { '@id': ORG_ID },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    inLanguage: SITE.lang,
    description: SITE.description,
    publisher: { '@id': ORG_ID },
  }
}

export function webPageSchema(input: { title: string; description: string; path: string }) {
  const url = absoluteUrl(input.path)
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: input.title,
    description: input.description,
    inLanguage: SITE.lang,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
  }
}

export interface Crumb {
  name: string
  path: string
}

export function breadcrumbSchema(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export interface FaqItem {
  question: string
  answer: string
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function articleSchema(input: {
  title: string
  description: string
  path: string
  datePublished: string
  dateModified?: string
  author?: string
  image?: string
}) {
  const url = absoluteUrl(input.path)
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    image: absoluteUrl(input.image || SITE.ogImage),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: SITE.lang,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: input.author || SITE.name, url: SITE.url },
    publisher: { '@id': ORG_ID },
  }
}
