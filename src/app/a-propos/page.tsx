import Link from 'next/link'
import { ArrowRight, MapPin, Heart, Shield, Zap } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const values = [
  {
    icon: MapPin,
    title: 'Proximité',
    description: 'Un atelier local, un interlocuteur unique et joignable.',
  },
  {
    icon: Zap,
    title: 'Simplicité',
    description: "Réassort à la demande : commandez juste ce qu'il faut, sans logistique.",
  },
  {
    icon: Shield,
    title: 'Fiabilité',
    description: 'Des délais tenus et des finitions soignées.',
  },
  {
    icon: Heart,
    title: 'Transparence',
    description: 'Des prix clairs, et une marge optionnelle pour votre structure.',
  },
]

export const metadata = { title: 'À propos' }

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-gray-text block mb-4">
              À propos
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-black leading-tight mb-8">
              Du local, du simple, du propre.
            </h1>
            <p className="text-xl text-brand-gray-text leading-relaxed mb-6">
              FLOKKA est un atelier de personnalisation textile basé à Andlau.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="bg-brand-gray py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <p className="text-lg text-brand-gray-text leading-relaxed mb-6">
                FLOKKA est un atelier de personnalisation textile basé à Andlau. Je travaille surtout
                avec les clubs, les associations et les petites structures locales.
              </p>
              <p className="text-lg text-brand-gray-text leading-relaxed mb-6">
                Ici, tout est fait à la demande, avec réassort à l&apos;unité : votre structure
                n&apos;a pas à surévaluer sa commande ni à gérer du stock pour ses besoins futurs.
              </p>
              <p className="text-lg text-brand-gray-text leading-relaxed mb-6">
                Les membres commandent quand ils veulent, je produis, et c&apos;est réglé.
              </p>
              <p className="text-lg font-semibold text-brand-black leading-relaxed">
                FLOKKA, c&apos;est du local, du simple, du propre — pensé par quelqu&apos;un qui
                connaît la réalité des clubs.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-brand-black mb-14">Mes valeurs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="border-t-2 border-brand-black pt-6">
                  <Icon size={24} className="mb-4" />
                  <h3 className="text-lg font-bold text-brand-black mb-2">{v.title}</h3>
                  <p className="text-brand-gray-text text-sm leading-relaxed">{v.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-black text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-6">On discute de votre projet ?</h2>
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
