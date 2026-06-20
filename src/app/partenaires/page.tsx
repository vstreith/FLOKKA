import Link from 'next/link'
import { ArrowRight, Trophy, Building2, Users, Building } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const partners = [
  { name: 'Badminton Club de Barr', type: 'Club sportif', icon: Trophy },
  { name: 'FC Andlau', type: 'Club de football', icon: Trophy },
  { name: 'Association Les Vignes', type: 'Association locale', icon: Users },
  { name: 'Handball Obernai', type: 'Club sportif', icon: Trophy },
  { name: 'Comité des Fêtes d\'Andlau', type: 'Association', icon: Users },
  { name: 'Menuiserie Schmitt', type: 'Petite entreprise', icon: Building2 },
]

export const metadata = { title: 'Partenaires' }

export default function PartnersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-gray-text block mb-4">
              Partenaires
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-black leading-tight">
              Ils font confiance à FLOKKA.
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => {
              const Icon = partner.icon
              return (
                <div
                  key={partner.name}
                  className="flex items-center gap-4 border border-brand-gray-dark p-6 hover:border-brand-black transition-colors"
                >
                  <div className="w-12 h-12 bg-brand-gray flex items-center justify-center shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-brand-black">{partner.name}</p>
                    <p className="text-sm text-brand-gray-text">{partner.type}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-black text-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Vous aussi, rejoignez FLOKKA
            </h2>
            <p className="text-white/70 mb-10 text-lg">
              On crée la boutique privée de votre structure, gratuitement et sans engagement.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-brand-black font-semibold px-8 py-4 hover:bg-gray-100 transition-colors text-sm"
            >
              Créer ma boutique
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
