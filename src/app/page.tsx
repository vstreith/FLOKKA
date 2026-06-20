import Link from 'next/link'
import { ArrowRight, CheckCircle2, Store, Sparkles } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const steps = [
  {
    number: '01',
    title: 'Une boutique dédiée',
    description:
      "On crée la boutique de votre structure avec vos produits et un code d'accès unique.",
  },
  {
    number: '02',
    title: 'Les membres commandent',
    description: 'Chacun commande son article quand il veut, à son nom, avec sa taille.',
  },
  {
    number: '03',
    title: 'Réassort à la demande',
    description:
      "Chaque commande est floquée et expédiée à l'unité. Commandez juste ce qu'il faut, quand il le faut.",
  },
]

const benefits = [
  "Réassort à la demande, même à l'unité",
  'Qualité artisanale et finitions soignées',
  'Marge optionnelle reversée à votre structure',
  'Un interlocuteur local, disponible et direct',
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="min-h-[calc(100vh-64px)] flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-4xl py-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-brand-black" />
              <span className="text-xs font-bold tracking-widest uppercase text-brand-gray-text">
                Atelier textile · Andlau, Alsace
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-brand-black mb-8">
              Textile personnalisé
              <br />
              à la demande.
            </h1>
            <p className="text-lg sm:text-xl text-brand-gray-text max-w-2xl leading-relaxed mb-12">
              Réassort à la demande, même à l&apos;unité. Vos membres commandent quand ils veulent,
              FLOKKA produit, et votre structure n&apos;a rien à avancer ni à gérer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/boutique-privee"
                className="inline-flex items-center justify-center gap-2 bg-brand-black text-white font-semibold px-8 py-4 hover:bg-gray-800 transition-colors text-sm tracking-wide"
              >
                <Store size={16} />
                Accéder à ma boutique privée
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-brand-black text-brand-black font-semibold px-8 py-4 hover:bg-brand-gray transition-colors text-sm tracking-wide"
              >
                Créer la boutique de mon club
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-brand-gray-dark" />

        {/* Steps section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-gray-text block mb-4">
              Le concept
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-black leading-tight">
              Les boutiques privées pour clubs &amp; associations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step) => (
              <div key={step.number} className="border-t-2 border-brand-black pt-6">
                <span className="text-4xl font-black text-brand-gray-dark block mb-4">
                  {step.number}
                </span>
                <h3 className="text-xl font-bold text-brand-black mb-3">{step.title}</h3>
                <p className="text-brand-gray-text leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About section */}
        <section className="bg-brand-gray py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-brand-gray-text block mb-4">
                  Du local, du simple, du propre
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-black leading-tight mb-6">
                  Pensé par quelqu&apos;un qui connaît la réalité des clubs
                </h2>
                <p className="text-brand-gray-text leading-relaxed mb-8 text-lg">
                  FLOKKA, c&apos;est un atelier de personnalisation textile basé à Andlau. Je travaille
                  surtout avec les clubs, les associations et les petites structures locales — sans
                  jargon, sans complications.
                </p>
                <ul className="space-y-3 mb-10">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-brand-black shrink-0" />
                      <span className="text-brand-gray-text">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/a-propos"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-black border-b-2 border-brand-black pb-0.5 hover:opacity-70 transition-opacity"
                >
                  En savoir plus sur FLOKKA
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="relative">
                <div className="aspect-square bg-brand-black flex items-center justify-center">
                  <div className="text-center p-12">
                    <Sparkles size={48} className="text-white/30 mx-auto mb-6" />
                    <p className="text-white text-2xl font-black tracking-widest uppercase">FLOKKA</p>
                    <p className="text-white/50 text-sm mt-2 tracking-wider">Andlau (67)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-black leading-tight mb-4">
            Votre club mérite sa propre boutique
          </h2>
          <p className="text-brand-gray-text text-lg mb-10 max-w-xl mx-auto">
            Discutons de votre projet. On met en place votre boutique privée, simplement et sans
            engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-brand-black text-white font-semibold px-8 py-4 hover:bg-gray-800 transition-colors text-sm tracking-wide"
            >
              Démarrer un projet
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 border border-brand-black text-brand-black font-semibold px-8 py-4 hover:bg-brand-gray transition-colors text-sm tracking-wide"
            >
              Voir les services
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
