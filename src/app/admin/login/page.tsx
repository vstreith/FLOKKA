'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FlokkaLogo } from '@/components/ui/Logo'
import Link from 'next/link'

const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
})
type FormData = z.infer<typeof schema>

export default function AdminLoginPage() {
  const [error, setError] = useState('')
  const router = useRouter()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error || 'Erreur'); return }
      localStorage.setItem('flokka_token', json.token)
      localStorage.setItem('flokka_user', JSON.stringify(json.user))
      router.push('/admin')
    } catch {
      setError('Erreur de connexion.')
    }
  }

  return (
    <div className="min-h-screen bg-brand-gray flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <FlokkaLogo size="md" href="/" className="mx-auto items-center" />
          <p className="text-sm text-brand-gray-text mt-4 tracking-wider uppercase">Administration</p>
        </div>

        <div className="bg-white border border-brand-gray-dark p-8">
          <h1 className="text-xl font-black text-brand-black mb-6">Connexion</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Email</label>
              <input
                {...register('email')}
                type="email"
                placeholder="admin@flokka.fr"
                className="w-full border border-brand-gray-dark px-4 py-3 text-sm focus:outline-none focus:border-brand-black"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Mot de passe</label>
              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="w-full border border-brand-gray-dark px-4 py-3 text-sm focus:outline-none focus:border-brand-black"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-black text-white font-semibold py-3 text-sm hover:bg-gray-800 transition-colors disabled:opacity-60 mt-2"
            >
              {isSubmitting ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-brand-gray-text hover:text-brand-black transition-colors">
            ← Retour au site
          </Link>
        </div>
      </div>
    </div>
  )
}
