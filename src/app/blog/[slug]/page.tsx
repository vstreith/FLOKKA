import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, ArrowLeft } from 'lucide-react'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { FaqSection, CTASection, RelatedLinks } from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/JsonLd'
import { pageMetadata, articleSchema, webPageSchema } from '@/lib/seo'
import { getAllPosts, getPost, type BlogBlock } from '@/lib/blog'

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug)
  if (!post) return {}
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
    ogType: 'article',
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified ?? post.datePublished,
  })
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(iso),
  )
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-black mt-10 mb-3">{block.text}</h2>
    case 'h3':
      return <h3 className="font-display text-xl font-bold text-brand-black mt-8 mb-2">{block.text}</h3>
    case 'ul':
      return (
        <ul className="list-disc pl-5 space-y-2 my-4">
          {block.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      )
    case 'quote':
      return (
        <blockquote className="border-l-4 border-brand-violet pl-4 italic text-brand-black/80 my-6">
          {block.text}
        </blockquote>
      )
    default:
      return <p className="my-4">{block.text}</p>
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const path = `/blog/${post.slug}`
  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.h1, path },
  ]
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)
    .map((p) => ({ title: p.h1, description: p.description, href: `/blog/${p.slug}` }))

  return (
    <MarketingLayout>
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.description,
            path,
            datePublished: post.datePublished,
            dateModified: post.dateModified,
            author: post.author,
          }),
          webPageSchema({ title: post.title, description: post.description, path }),
        ]}
      />

      <section className="relative overflow-hidden mesh-bg">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          <div className="mb-8">
            <Breadcrumbs items={crumbs} />
          </div>
          <div className="flex items-center gap-3 text-xs text-brand-gray-text mb-4">
            <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} aria-hidden="true" /> {post.readingMinutes} min de lecture
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-brand-black leading-[1.1]">
            {post.h1}
          </h1>
          <p className="mt-5 text-lg text-brand-gray-text leading-relaxed">{post.description}</p>
        </div>
      </section>

      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <article className="max-w-3xl mx-auto text-brand-gray-text leading-relaxed [&_strong]:text-brand-black [&_a]:text-brand-violet-dark [&_a]:underline [&_a]:underline-offset-2">
          {post.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </article>
      </div>

      {post.faq && post.faq.length > 0 && <FaqSection items={post.faq} title="Questions fréquentes" />}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-violet-dark"
        >
          <ArrowLeft size={14} /> Retour au blog
        </Link>
      </div>

      <RelatedLinks title="Articles connexes" links={related} />

      <CTASection
        title="Passez de la théorie à la pratique"
        text="Créons la boutique textile de votre club ou association."
        primary={{ label: 'Démarrer un projet', href: '/contact' }}
        secondary={{ label: 'Voir nos solutions', href: '/clubs-sportifs' }}
      />
    </MarketingLayout>
  )
}
