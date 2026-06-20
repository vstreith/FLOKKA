'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, MapPin, Mail, Phone, Clock } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const schema = z.object({
  name: z.string().min(2, 'Nom requis'),
  structure: z.string().optional(),
  email: z.string().email('Email invalide'),
  message: z.string().min(10, 'Message trop court'),
})

type FormData = z.infer<typeof schema>

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-xl mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-gray-text block mb-4">
              Contact
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-brand-black leading-tight mb-4">
              Parlons de votre projet.
            </h1>
            <p className="text-brand-gray-text text-lg">
              Un club à équiper, une boutique privée à créer, une question ? Écrivez-moi, je réponds
              vite et simplement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle2 size={48} className="text-green-500 mb-4" />
                  <h3 className="text-2xl font-black text-brand-black mb-2">Message envoyé !</h3>
                  <p className="text-brand-gray-text">
                    Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-brand-black mb-1.5">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('name')}
                      placeholder="Votre nom"
                      className="w-full border border-brand-gray-dark px-4 py-3 text-sm focus:outline-none focus:border-brand-black transition-colors"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-black mb-1.5">
                      Structure (optionnel)
                    </label>
                    <input
                      {...register('structure')}
                      placeholder="Nom de votre club, association..."
                      className="w-full border border-brand-gray-dark px-4 py-3 text-sm focus:outline-none focus:border-brand-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-black mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="votre@email.fr"
                      className="w-full border border-brand-gray-dark px-4 py-3 text-sm focus:outline-none focus:border-brand-black transition-colors"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-black mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="Décrivez votre projet..."
                      className="w-full border border-brand-gray-dark px-4 py-3 text-sm focus:outline-none focus:border-brand-black transition-colors resize-none"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-black text-white font-semibold py-4 text-sm hover:bg-gray-800 transition-colors disabled:opacity-60"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div>
              <h2 className="text-2xl font-black text-brand-black mb-8">Coordonnées</h2>
              <ul className="space-y-5 mb-10">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand-black mt-0.5 shrink-0" />
                  <span className="text-brand-gray-text">Andlau, Alsace (67)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-brand-black mt-0.5 shrink-0" />
                  <a href="mailto:contact@flokka.fr" className="text-brand-gray-text hover:text-brand-black transition-colors">
                    contact@flokka.fr
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-brand-black mt-0.5 shrink-0" />
                  <a href="tel:0600000000" className="text-brand-gray-text hover:text-brand-black transition-colors">
                    06 00 00 00 00
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={18} className="text-brand-black mt-0.5 shrink-0" />
                  <span className="text-brand-gray-text">Horaires flexibles — sur rendez-vous</span>
                </li>
              </ul>

              <div className="bg-brand-gray border-l-4 border-brand-black p-6">
                <h3 className="font-bold text-brand-black mb-2">Vous représentez un club ?</h3>
                <p className="text-sm text-brand-gray-text leading-relaxed">
                  Dites-moi simplement quelle structure vous représentez. On met en place votre
                  boutique privée et votre code d&apos;accès, sans engagement.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
