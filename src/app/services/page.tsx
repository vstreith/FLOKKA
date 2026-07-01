import Link from 'next/link'
import { ArrowRight, Shirt, Tag, Store, Building2, Trophy, Gift } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { pageMetadata } from '@/lib/seo'

const services = [
  {
    icon: Shirt,
    title: 'Flocage flex',
    description: 'Noms, numéros, logos et textes floqués sur t-shirts, sweats, polos, maillots et vestes.',
    gradient: 'from-brand-navy to-brand-black',
  },
  {
    icon: Tag,
    title: 'Personnalisation à la demande',
    description: "Nom, numéro, logo, prénom : chaque pièce est unique, produite à l'unité.",
    gradient: 'from-brand-navy to-brand-black',
  },
  {
    icon: Store,
    title: 'Réassort à la demande',
    description: "Un espace client dédié, avec code d'accès, pour recommander sans stock.",
    gradient: 'from-brand-navy to-brand-black',
  },
  {
    icon: Building2,
    title: 'Petites séries entreprises',
    description: "Tenues d'équipe et vêtements pro pour les petites structures locales.",
    gradient: 'from-brand-navy to-brand-black',
  },
  {
    icon: Trophy,
    title: 'Packs clubs',
    description: 'Des ensembles cohérents (maillot, survêtement, sac) à vos couleurs.',
    gradient: 'from-brand-navy to-brand-black',
  },
  {
    icon: Gift,
    title: 'Accessoires',
    description: 'Casquettes, sacs et tote bags floqués à vos couleurs.',
    gradient: 'from-brand-navy to-brand-black',
  },
]

export const metadata = pageMetadata({
  title: 'Services de personnalisation textile pour clubs et associations',
  description:
    "Flocage, réassort à la demande et packs personnalisés : les services de personnalisation textile FLOKKA, dès une pièce, en Centre Alsace.",
  path: '/services',
  keywords: ['services personnalisation textile', 'flocage', 'marquage textile', 'flocage textile', 'réassort à la demande'],
})

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden mesh-bg py-24 px-4 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute -top-10 right-10 w-80 h-80 rounded-full bg-brand-violet/6 blur-3xl animate-blob" />
          <div className="relative max-w-7xl mx-auto">
            <div className="max-w-3xl mb-16 animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-2 text-xs font-bold tracking-widest uppercase text-brand-violet-dark ring-1 ring-brand-gray-dark mb-6">
                Services
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-black leading-tight mb-6">
                Tout ce qu&apos;il faut pour <span className="text-gradient">habiller votre structure.</span>
              </h1>
              <p className="text-xl text-brand-gray-text leading-relaxed">
                Le flocage flex, notre unique métier — des solutions simples et locales, sans minimum
                de commande et avec réassort à la demande.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <div
                    key={service.title}
                    className="group rounded-3xl bg-white p-7 ring-1 ring-brand-gray-dark shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 shadow-soft group-hover:scale-110 transition-transform`}
                    >
                      <Icon size={20} className="text-white" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-brand-black mb-2">{service.title}</h3>
                    <p className="text-brand-gray-text text-sm leading-relaxed">{service.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24 max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-dark-gradient py-20 px-6 text-center shadow-card">
            <div className="pointer-events-none absolute -top-16 left-1/4 w-72 h-72 rounded-full bg-brand-pink/8 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-6">
                Un projet en tête ? Parlons-en.
              </h2>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-gradient text-white font-semibold px-8 py-4 rounded-full shadow-glow hover:-translate-y-0.5 transition-all text-sm"
              >
                Me contacter
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
