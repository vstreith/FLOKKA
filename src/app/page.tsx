import Link from 'next/link'
import { ArrowRight, CheckCircle2, Store, Sparkles, Palette, Zap } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const steps = [
  {
    number: '01',
    title: 'Une boutique dédiée',
    description:
      "On crée la boutique de votre structure avec vos produits et un code d'accès unique.",
    gradient: 'from-brand-navy to-brand-black',
  },
  {
    number: '02',
    title: 'Les membres commandent',
    description: 'Chacun commande son article quand il veut, à son nom, avec sa taille.',
    gradient: 'from-brand-navy to-brand-black',
  },
  {
    number: '03',
    title: 'Réassort à la demande',
    description:
      "Chaque commande est floquée et expédiée à l'unité. Commandez juste ce qu'il faut, quand il le faut.",
    gradient: 'from-brand-navy to-brand-black',
  },
]

const benefits = [
  "Réassort à la demande, même à l'unité",
  'Qualité artisanale et finitions soignées',
  'Marge optionnelle reversée à votre structure',
  'Un interlocuteur local, disponible et direct',
]

const stats = [
  { value: '20+', label: 'Structures équipées', color: 'text-gradient' },
  { value: '100%', label: 'Produit à la demande', color: 'text-gradient-warm' },
  { value: 'Andlau', label: 'Atelier local (67)', color: 'text-gradient' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden mesh-bg">
          {/* Animated blobs */}
          <div className="pointer-events-none absolute top-10 -left-20 w-96 h-96 rounded-full bg-brand-violet/6 blur-3xl animate-blob" />
          <div className="pointer-events-none absolute top-40 right-0 w-96 h-96 rounded-full bg-brand-pink/6 blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-brand-cyan/6 blur-3xl animate-blob" style={{ animationDelay: '6s' }} />

          <div className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="max-w-4xl py-20 animate-fade-up">
              <div className="inline-flex items-center gap-2 mb-8 rounded-full bg-white/70 backdrop-blur px-4 py-2 shadow-soft ring-1 ring-brand-gray-dark">
                <span className="flex h-2 w-2 rounded-full bg-brand-gradient" />
                <span className="text-xs font-bold tracking-widest uppercase text-brand-violet-dark">
                  Atelier textile · Andlau, Alsace
                </span>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-brand-black mb-8">
                Textile personnalisé
                <br />
                <span className="text-gradient">à la demande.</span>
              </h1>
              <p className="text-lg sm:text-xl text-brand-gray-text max-w-2xl leading-relaxed mb-12">
                Réassort à la demande, même à l&apos;unité. Vos membres commandent quand ils veulent,
                FLOKKA produit, et votre structure n&apos;a rien à avancer ni à gérer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/boutique-privee"
                  className="group inline-flex items-center justify-center gap-2 bg-brand-gradient text-white font-semibold px-8 py-4 rounded-full text-sm tracking-wide shadow-glow hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Store size={16} />
                  Accéder à ma boutique privée
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-brand-black font-semibold px-8 py-4 rounded-full ring-1 ring-brand-gray-medium hover:ring-brand-violet hover:text-brand-violet-dark transition-all text-sm tracking-wide shadow-soft"
                >
                  Créer la boutique de mon club
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white/70 backdrop-blur p-5 ring-1 ring-brand-gray-dark shadow-soft">
                    <p className={`font-display text-2xl sm:text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-brand-gray-text mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Steps section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-brand-violet mb-4">
              <Zap size={14} /> Le concept
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-black leading-tight">
              Les boutiques privées pour clubs <span className="text-gradient">&amp; associations</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group relative rounded-3xl bg-white p-8 ring-1 ring-brand-gray-dark shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
              >
                <span
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-white font-display text-xl font-extrabold shadow-soft mb-6`}
                >
                  {step.number}
                </span>
                <h3 className="font-display text-xl font-bold text-brand-black mb-3">{step.title}</h3>
                <p className="text-brand-gray-text leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About section */}
        <section className="relative overflow-hidden bg-brand-gradient-soft py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-brand-pink mb-4">
                  <Palette size={14} /> Du local, du simple, du propre
                </span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-black leading-tight mb-6">
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
                      <CheckCircle2 size={20} className="text-brand-violet shrink-0" />
                      <span className="text-brand-black/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/a-propos"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-violet-dark hover:gap-3 transition-all"
                >
                  En savoir plus sur FLOKKA
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-brand-gradient rounded-[2.5rem] blur-2xl opacity-30" />
                <div className="relative aspect-square rounded-[2.5rem] bg-brand-gradient flex items-center justify-center overflow-hidden shadow-glow">
                  <div className="absolute top-8 right-8 w-24 h-24 rounded-full bg-white/15 animate-float" />
                  <div className="absolute bottom-10 left-10 w-16 h-16 rounded-2xl bg-white/10 animate-float" style={{ animationDelay: '2s' }} />
                  <div className="text-center p-12">
                    <Sparkles size={48} className="text-white/80 mx-auto mb-6" />
                    <p className="text-white font-display text-3xl font-extrabold tracking-widest uppercase">FLOKKA</p>
                    <p className="text-white/70 text-sm mt-2 tracking-wider">Andlau (67)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-dark-gradient px-6 py-20 text-center shadow-card">
            <div className="pointer-events-none absolute -top-16 -left-10 w-72 h-72 rounded-full bg-brand-violet/8 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-10 w-72 h-72 rounded-full bg-brand-pink/8 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                Votre club mérite sa propre boutique
              </h2>
              <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
                Discutons de votre projet. On met en place votre boutique privée, simplement et sans
                engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-brand-gradient text-white font-semibold px-8 py-4 rounded-full text-sm tracking-wide shadow-glow hover:-translate-y-0.5 transition-all duration-300"
                >
                  Démarrer un projet
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-full ring-1 ring-white/20 hover:bg-white/20 transition-all text-sm tracking-wide"
                >
                  Voir les services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
