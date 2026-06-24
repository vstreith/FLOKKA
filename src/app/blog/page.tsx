import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { PageHero, CTASection } from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/JsonLd'
import { pageMetadata, webPageSchema } from '@/lib/seo'
import { getAllPosts } from '@/lib/blog'

const PATH = '/blog'

export const metadata: Metadata = pageMetadata({
  title: 'Blog — Conseils textile pour clubs et associations',
  description:
    "Guides et conseils sur le textile personnalisé : financer son association, équiper un club sportif, éviter les stocks, choisir un sweat, comprendre le flocage. Par FLOKKA, atelier en Alsace.",
  path: PATH,
  keywords: ['blog textile personnalisé', 'conseils club sportif', 'conseils association', 'flocage textile'],
})

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(iso),
  )
}

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'Blog', path: PATH },
  ]
  return (
    <MarketingLayout>
      <JsonLd
        data={webPageSchema({
          title: 'Blog | FLOKKA',
          description: 'Guides et conseils sur le textile personnalisé pour clubs et associations.',
          path: PATH,
        })}
      />
      <PageHero
        eyebrow="Blog"
        title="Conseils & guides textile"
        breadcrumbs={crumbs}
        intro="Nos ressources pour les clubs, les associations et les structures locales : financement, organisation, personnalisation et savoir-faire."
      />

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-3xl bg-white p-7 ring-1 ring-brand-gray-dark shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 text-xs text-brand-gray-text mb-3">
                <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} aria-hidden="true" /> {post.readingMinutes} min
                </span>
              </div>
              <h2 className="font-display text-xl font-bold text-brand-black mb-2 leading-snug group-hover:text-brand-violet-dark transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.h1}</Link>
              </h2>
              <p className="text-brand-gray-text text-sm leading-relaxed flex-1">{post.description}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-violet-dark"
              >
                Lire l&apos;article
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        title="Besoin de personnaliser du textile ?"
        text="Mettez en pratique nos conseils : parlons de votre projet, dès une pièce."
        primary={{ label: 'Démarrer un projet', href: '/contact' }}
        secondary={{ label: 'Voir les solutions clubs', href: '/clubs-sportifs' }}
      />
    </MarketingLayout>
  )
}
