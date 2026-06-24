import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // L'espace boutique privée et l'admin n'ont pas d'intérêt SEO public.
        disallow: ['/admin', '/admin/', '/boutique/', '/api/'],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
