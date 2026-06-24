import type { MetadataRoute } from 'next'
import { SITE, absoluteUrl } from '@/lib/seo'
import { STATIC_ROUTES } from '@/lib/navigation'
import { LOCAL_AREAS } from '@/lib/local-areas'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  const localPages: MetadataRoute.Sitemap = LOCAL_AREAS.map((a) => ({
    url: absoluteUrl(a.slug),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.dateModified ?? p.datePublished),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...staticPages, ...localPages, ...blogPosts]
}
