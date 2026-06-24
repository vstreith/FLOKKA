import Link from 'next/link'
import { ArrowRight, Trophy, Building2, Users } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { pageMetadata } from '@/lib/seo'

const partners = [
  { name: 'Badminton Club de Barr', type: 'Club sportif', icon: Trophy, gradient: 'from-brand-navy to-brand-black' },
  { name: 'FC Andlau', type: 'Club de football', icon: Trophy, gradient: 'from-brand-navy to-brand-black' },
  { name: 'Association Les Vignes', type: 'Association locale', icon: Users, gradient: 'from-brand-navy to-brand-black' },
  { name: 'Handball Obernai', type: 'Club sportif', icon: Trophy, gradient: 'from-brand-navy to-brand-black' },
  { name: "Comité des Fêtes d'Andlau", type: 'Association', icon: Users, gradient: 'from-brand-navy to-brand-black' },
  { name: 'Menuiserie Schmitt', type: 'Petite entreprise', icon: Building2, gradient: 'from-brand-navy to-brand-black' },
]

export const metadata = pageMetadata({
  title: 'Partenaires — clubs et associations qui nous font confiance',
  description:
    "Découvrez les clubs, associations et structures du Centre Alsace qui personnalisent leur textile avec FLOKKA. Rejoignez les acteurs locaux qui nous font confiance.",
  path: '/partenaires',
  keywords: ['partenaires FLOKKA', 'clubs partenaires', 'associations partenaires Alsace'],
})

export default function PartnersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden mesh-bg py-24 px-4 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute -top-10 right-1/4 w-80 h-80 rounded-full bg-brand-cyan/6 blur-3xl animate-blob" />
          <div className="relative max-w-7xl mx-auto">
            <div className="max-w-2xl mb-16 animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-2 text-xs font-bold tracking-widest uppercase text-brand-violet-dark ring-1 ring-brand-gray-dark mb-6">
                Partenaires
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-black leading-tight">
                Ils font confiance à <span className="text-gradient">FLOKKA.</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner) => {
                const Icon = partner.icon
                return (
                  <div
                    key={partner.name}
                    className="group flex items-center gap-4 rounded-3xl bg-white p-6 ring-1 ring-brand-gray-dark shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${partner.gradient} flex items-center justify-center shrink-0 shadow-soft group-hover:scale-110 transition-transform`}
                    >
                      <Icon size={22} className="text-white" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-brand-black">{partner.name}</p>
                      <p className="text-sm text-brand-gray-text">{partner.type}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24 max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-dark-gradient py-24 px-6 shadow-card">
            <div className="pointer-events-none absolute -top-16 left-1/3 w-72 h-72 rounded-full bg-brand-pink/8 blur-3xl" />
            <div className="relative max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Vous aussi, rejoignez FLOKKA
              </h2>
              <p className="text-white/70 mb-10 text-lg">
                On personnalise vos textiles, dès une pièce, gratuitement et sans engagement pour le devis.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-gradient text-white font-semibold px-8 py-4 rounded-full shadow-glow hover:-translate-y-0.5 transition-all text-sm"
              >
                Demander un devis
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
