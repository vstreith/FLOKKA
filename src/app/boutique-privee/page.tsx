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
      <main className="flex-1 pt-16 flex items-center justify-center">
        <section className="w-full max-w-md px-4 py-24">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-brand-black flex items-center justify-center mx-auto mb-6">
              <Lock size={24} className="text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-brand-black mb-3">
              Accès boutique privée
            </h1>
            <p className="text-brand-gray-text">
              Entrez le code unique fourni par votre club, association ou structure pour accéder à
              votre boutique dédiée.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Votre code d'accès"
              maxLength={8}
              className="w-full border-2 border-brand-gray-dark px-4 py-4 text-center text-2xl font-black tracking-[0.3em] uppercase focus:outline-none focus:border-brand-black transition-colors placeholder:text-gray-300 placeholder:text-base placeholder:tracking-normal placeholder:font-normal"
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !code.trim()}
              className="w-full bg-brand-black text-white font-semibold py-4 text-sm hover:bg-gray-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? 'Vérification...' : 'Accéder à la boutique'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="text-center text-sm text-brand-gray-text mt-8">
            Pas encore de code ?{' '}
            <Link href="/contact" className="font-semibold text-brand-black hover:underline">
              Contactez-nous
            </Link>{' '}
            pour créer la boutique de votre structure.
          </p>

          <div className="mt-8 pt-6 border-t border-brand-gray-dark text-center">
            <p className="text-xs text-brand-gray-text">
              FLOKKA · Boutiques réservées aux structures partenaires.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
