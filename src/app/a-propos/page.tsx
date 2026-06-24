import Link from 'next/link'
import { ArrowRight, MapPin, Heart, Shield, Zap } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { pageMetadata } from '@/lib/seo'

const values = [
  {
    icon: MapPin,
    title: 'Proximité',
    description: 'Un atelier local, un interlocuteur unique et joignable.',
    gradient: 'from-brand-navy to-brand-black',
  },
  {
    icon: Zap,
    title: 'Simplicité',
    description: "Réassort à la demande : commandez juste ce qu'il faut, sans logistique.",
    gradient: 'from-brand-navy to-brand-black',
  },
  {
    icon: Shield,
    title: 'Fiabilité',
    description: 'Des délais tenus et des finitions soignées.',
    gradient: 'from-brand-navy to-brand-black',
  },
  {
    icon: Heart,
    title: 'Transparence',
    description: 'Des prix clairs, et une marge optionnelle pour votre structure.',
    gradient: 'from-brand-navy to-brand-black',
  },
]

export const metadata = pageMetadata({
  title: 'À propos de FLOKKA, atelier textile à Andlau (Alsace)',
  description:
    "FLOKKA est un atelier de personnalisation textile à Andlau, dans le Bas-Rhin. Notre histoire, nos valeurs et notre engagement local au service des clubs et associations d'Alsace.",
  path: '/a-propos',
  keywords: ['FLOKKA', 'atelier textile Andlau', 'personnalisation textile Alsace', 'à propos'],
})

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden mesh-bg py-24 px-4 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute top-0 -left-10 w-80 h-80 rounded-full bg-brand-pink/6 blur-3xl animate-blob" />
          <div className="relative max-w-7xl mx-auto">
            <div className="max-w-3xl animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-2 text-xs font-bold tracking-widest uppercase text-brand-violet-dark ring-1 ring-brand-gray-dark mb-6">
                À propos
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-black leading-tight mb-8">
                Du local, du simple, <span className="text-gradient">du propre.</span>
              </h1>
              <p className="text-xl text-brand-gray-text leading-relaxed mb-6">
                FLOKKA est un atelier de personnalisation textile basé à Andlau.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="bg-brand-gradient-soft py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl rounded-3xl bg-white/70 backdrop-blur p-8 sm:p-10 ring-1 ring-brand-gray-dark shadow-soft border-l-4 border-brand-violet">
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
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-black mb-14">
            Mes <span className="text-gradient">valeurs</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className="group rounded-3xl bg-white p-7 ring-1 ring-brand-gray-dark shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${v.gradient} flex items-center justify-center mb-5 shadow-soft group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-brand-black mb-2">{v.title}</h3>
                  <p className="text-brand-gray-text text-sm leading-relaxed">{v.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24 max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-dark-gradient py-20 px-6 text-center shadow-card">
            <div className="pointer-events-none absolute -bottom-16 right-1/4 w-72 h-72 rounded-full bg-brand-violet/8 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-6">
                On discute de votre projet ?
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
