'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, ArrowRight } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'

export default function BoutiquePriveePage() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/shop/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim().toUpperCase() }),
      })

      if (!res.ok) {
        setError('Code invalide ou boutique inactive. Vérifiez votre code.')
        return
      }

      const data = await res.json()
      sessionStorage.setItem('flokka_shop', JSON.stringify(data))
      router.push(`/boutique/${data.slug}`)
    } catch {
      setError('Une erreur est survenue. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="relative flex-1 pt-16 flex items-center justify-center overflow-hidden mesh-bg">
        <div className="pointer-events-none absolute top-20 -left-20 w-96 h-96 rounded-full bg-brand-violet/6 blur-3xl animate-blob" />
        <div className="pointer-events-none absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-brand-pink/6 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
        <section className="relative w-full max-w-md px-4 py-24 animate-fade-up">
          <div className="rounded-[2rem] bg-white/80 backdrop-blur p-8 sm:p-10 ring-1 ring-brand-gray-dark shadow-card">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center mx-auto mb-6 shadow-glow">
                <Lock size={24} className="text-white" />
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-black mb-3">
                Mon <span className="text-gradient">espace réassort</span>
              </h1>
              <p className="text-brand-gray-text">
                Entrez le code de votre structure pour accéder à votre espace dédié et recommander
                votre textile personnalisé en réassort à la demande.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Votre code d'accès"
                maxLength={8}
                className="w-full rounded-2xl border-2 border-brand-gray-dark bg-brand-gray/40 px-4 py-4 text-center text-2xl font-black tracking-[0.3em] uppercase focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-gray-medium focus:bg-white transition-all placeholder:text-gray-300 placeholder:text-base placeholder:tracking-normal placeholder:font-normal"
              />

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading || !code.trim()}
                className="w-full bg-brand-gradient text-white font-semibold py-4 text-sm rounded-full shadow-glow hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:translate-y-0 flex items-center justify-center gap-2"
              >
                {loading ? 'Vérification...' : 'Accéder à mon espace'}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>

            <p className="text-center text-sm text-brand-gray-text mt-8">
              Pas encore de code ?{' '}
              <Link href="/contact" className="font-semibold text-brand-violet-dark hover:underline">
                Contactez-nous
              </Link>{' '}
              pour mettre en place votre espace de réassort.
            </p>

            <div className="mt-8 pt-6 border-t border-brand-gray-dark text-center">
              <p className="text-xs text-brand-gray-text">
                FLOKKA · Espace réservé aux clients de l&apos;atelier.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
