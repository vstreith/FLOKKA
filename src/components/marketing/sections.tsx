import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { JsonLd } from '@/components/seo/JsonLd'
import { faqPageSchema, type Crumb, type FaqItem } from '@/lib/seo'

interface CtaLink {
  label: string
  href: string
}

/* ── Hero standard des pages internes ─────────────────────── */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  primary,
  secondary,
}: {
  eyebrow?: string
  title: string
  intro?: React.ReactNode
  breadcrumbs?: Crumb[]
  primary?: CtaLink
  secondary?: CtaLink
}) {
  return (
    <section className="relative overflow-hidden mesh-bg">
      <div className="pointer-events-none absolute -top-10 right-10 w-80 h-80 rounded-full bg-brand-violet/6 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {breadcrumbs && (
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-2 text-xs font-bold tracking-widest uppercase text-brand-violet-dark ring-1 ring-brand-gray-dark mb-6">
              {eyebrow}
            </span>
          )}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-black leading-[1.08] mb-6">
            {title}
          </h1>
          {intro && <div className="text-lg sm:text-xl text-brand-gray-text leading-relaxed">{intro}</div>}
          {(primary || secondary) && (
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              {primary && (
                <Link
                  href={primary.href}
                  className="inline-flex items-center justify-center gap-2 bg-brand-gradient text-white font-semibold px-7 py-3.5 rounded-full text-sm tracking-wide shadow-glow hover:-translate-y-0.5 transition-all duration-300"
                >
                  {primary.label}
                  <ArrowRight size={16} />
                </Link>
              )}
              {secondary && (
                <Link
                  href={secondary.href}
                  className="inline-flex items-center justify-center gap-2 bg-white text-brand-black font-semibold px-7 py-3.5 rounded-full ring-1 ring-brand-gray-medium hover:text-brand-violet-dark transition-all text-sm tracking-wide shadow-soft"
                >
                  {secondary.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ── Section générique avec titre ─────────────────────────── */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = 'light',
  center = false,
}: {
  id?: string
  eyebrow?: string
  title?: string
  intro?: React.ReactNode
  children?: React.ReactNode
  tone?: 'light' | 'tint'
  center?: boolean
}) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 ${tone === 'tint' ? 'bg-brand-gradient-soft' : ''}`}
    >
      <div className="max-w-7xl mx-auto">
        {(eyebrow || title || intro) && (
          <div className={`max-w-3xl mb-10 ${center ? 'mx-auto text-center' : ''}`}>
            {eyebrow && (
              <span className="block text-xs font-bold tracking-widest uppercase text-brand-violet mb-3">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-black leading-tight">
                {title}
              </h2>
            )}
            {intro && <div className="mt-4 text-lg text-brand-gray-text leading-relaxed">{intro}</div>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

/* ── Bloc de texte long-format (typographie lisible) ──────── */
export function Prose({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`max-w-3xl space-y-4 text-brand-gray-text leading-relaxed [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-brand-black [&_h3]:mt-10 [&_h3]:mb-2 [&_h4]:font-semibold [&_h4]:text-brand-black [&_h4]:mt-6 [&_h4]:text-lg [&_strong]:text-brand-black [&_a]:text-brand-violet-dark [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 ${className}`}
    >
      {children}
    </div>
  )
}

/* ── Grille de cartes (atouts / services) ─────────────────── */
export interface Feature {
  icon?: LucideIcon
  title: string
  description: string
}

export function FeatureGrid({ items, cols = 3 }: { items: Feature[]; cols?: 2 | 3 | 4 }) {
  const grid = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[cols]
  return (
    <div className={`grid grid-cols-1 ${grid} gap-6`}>
      {items.map((f) => {
        const Icon = f.icon
        return (
          <div
            key={f.title}
            className="group rounded-3xl bg-white p-7 ring-1 ring-brand-gray-dark shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
          >
            {Icon && (
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-black flex items-center justify-center mb-5 shadow-soft group-hover:scale-110 transition-transform">
                <Icon size={20} className="text-white" />
              </div>
            )}
            <h3 className="font-display text-lg font-bold text-brand-black mb-2">{f.title}</h3>
            <p className="text-brand-gray-text text-sm leading-relaxed">{f.description}</p>
          </div>
        )
      })}
    </div>
  )
}

/* ── Étapes numérotées ────────────────────────────────────── */
export function StepList({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map((s, i) => (
        <li
          key={s.title}
          className="relative rounded-3xl bg-white p-8 ring-1 ring-brand-gray-dark shadow-soft"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-navy to-brand-black text-white font-display text-lg font-extrabold shadow-soft mb-5">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="font-display text-xl font-bold text-brand-black mb-2">{s.title}</h3>
          <p className="text-brand-gray-text leading-relaxed">{s.description}</p>
        </li>
      ))}
    </ol>
  )
}

/* ── Liste d'arguments à puces (check) ────────────────────── */
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Check size={20} className="text-brand-violet shrink-0 mt-0.5" aria-hidden="true" />
          <span className="text-brand-black/80">{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* ── Témoignages ──────────────────────────────────────────── */
export function Testimonials({ items }: { items: { quote: string; author: string; role: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((t) => (
        <figure key={t.author} className="rounded-3xl bg-white p-7 ring-1 ring-brand-gray-dark shadow-soft">
          <blockquote className="text-brand-black/85 leading-relaxed">“{t.quote}”</blockquote>
          <figcaption className="mt-5 text-sm">
            <span className="font-display font-bold text-brand-black">{t.author}</span>
            <span className="block text-brand-gray-text">{t.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

/* ── FAQ accessible (details/summary) + JSON-LD optionnel ──── */
export function FaqSection({
  items,
  title = 'Questions fréquentes',
  withSchema = true,
  id = 'faq',
}: {
  items: FaqItem[]
  title?: string
  withSchema?: boolean
  id?: string
}) {
  return (
    <Section id={id} eyebrow="FAQ" title={title}>
      {withSchema && <JsonLd data={faqPageSchema(items)} />}
      <div className="max-w-3xl divide-y divide-brand-gray-dark rounded-3xl bg-white ring-1 ring-brand-gray-dark shadow-soft overflow-hidden">
        {items.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-display font-semibold text-brand-black list-none">
              {item.question}
              <span className="text-brand-violet transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
            </summary>
            <div className="px-6 pb-6 -mt-1 text-brand-gray-text leading-relaxed">{item.answer}</div>
          </details>
        ))}
      </div>
    </Section>
  )
}

/* ── Bandeau CTA ──────────────────────────────────────────── */
export function CTASection({
  title,
  text,
  primary,
  secondary,
}: {
  title: string
  text?: string
  primary: CtaLink
  secondary?: CtaLink
}) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-dark-gradient px-6 py-16 sm:py-20 text-center shadow-card">
        <div className="pointer-events-none absolute -top-16 -left-10 w-72 h-72 rounded-full bg-brand-violet/8 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-10 w-72 h-72 rounded-full bg-brand-pink/8 blur-3xl" />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">{title}</h2>
          {text && <p className="text-white/70 text-lg mb-9">{text}</p>}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primary.href}
              className="inline-flex items-center justify-center gap-2 bg-brand-gradient text-white font-semibold px-8 py-4 rounded-full text-sm tracking-wide shadow-glow hover:-translate-y-0.5 transition-all duration-300"
            >
              {primary.label}
              <ArrowRight size={16} />
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-full ring-1 ring-white/20 hover:bg-white/20 transition-all text-sm tracking-wide"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Maillage interne : pages / articles connexes ─────────── */
export interface RelatedLink {
  title: string
  description: string
  href: string
}

export function RelatedLinks({
  title = 'À découvrir aussi',
  links,
}: {
  title?: string
  links: RelatedLink[]
}) {
  if (!links.length) return null
  return (
    <Section eyebrow="Pour aller plus loin" title={title} tone="tint">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group rounded-3xl bg-white p-6 ring-1 ring-brand-gray-dark shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="font-display text-lg font-bold text-brand-black mb-2 group-hover:text-brand-violet-dark transition-colors">
              {l.title}
            </h3>
            <p className="text-brand-gray-text text-sm leading-relaxed mb-4">{l.description}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-violet-dark">
              En savoir plus <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  )
}
