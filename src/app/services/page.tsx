import Link from 'next/link'
import { ArrowRight, Shirt, Tag, Store, Building2, Trophy, Gift } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const services = [
  {
    icon: Shirt,
    title: 'Flocage textile',
    description: 'Flocage et marquage de t-shirts, sweats, polos, maillots et vestes.',
  },
  {
    icon: Tag,
    title: 'Personnalisation à la demande',
    description: "Nom, numéro, logo, prénom : chaque pièce est unique, produite à l'unité.",
  },
  {
    icon: Store,
    title: 'Boutiques privées',
    description: "Une boutique en ligne dédiée à votre club ou association, avec code d'accès.",
  },
  {
    icon: Building2,
    title: 'Petites séries entreprises',
    description: "Tenues d'équipe et vêtements pro pour les petites structures locales.",
  },
  {
    icon: Trophy,
    title: 'Packs clubs',
    description: 'Des ensembles cohérents (maillot, survêtement, sac) à vos couleurs.',
  },
  {
    icon: Gift,
    title: 'Goodies',
    description: 'Mugs, sacs, casquettes et accessoires personnalisés.',
  },
]

export const metadata = { title: 'Services' }

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-gray-text block mb-4">
              Services
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-black leading-tight mb-6">
              Tout ce qu&apos;il faut pour habiller votre structure.
            </h1>
            <p className="text-xl text-brand-gray-text leading-relaxed">
              Du flocage à la boutique privée, des solutions simples et locales, avec réassort à la
              demande même à l&apos;unité.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="border border-brand-gray-dark p-6 hover:border-brand-black transition-colors"
                >
                  <div className="w-10 h-10 bg-brand-black flex items-center justify-center mb-4">
                    <Icon size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-black mb-2">{service.title}</h3>
                  <p className="text-brand-gray-text text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-black text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Un projet en tête ? Parlons-en.</h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-brand-black font-semibold px-8 py-4 hover:bg-gray-100 transition-colors text-sm"
          >
            Me contacter
            <ArrowRight size={16} />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}
