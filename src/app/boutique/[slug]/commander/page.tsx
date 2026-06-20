'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, ShoppingBag } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CartProvider, useCart } from '@/components/shop/CartProvider'
import { FlokkaLogo } from '@/components/ui/Logo'
import { formatPrice } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
})
type FormData = z.infer<typeof schema>

function CheckoutContent({ slug }: { slug: string }) {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (items.length === 0 && !submitted) {
      router.push(`/boutique/${slug}`)
    }
  }, [items, submitted, slug, router])

  const onSubmit = async (data: FormData) => {
    setServerError('')
    try {
      const res = await fetch(`/api/shop/${slug}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: data, items }),
      })
      const json = await res.json()
      if (!res.ok) { setServerError(json.error || 'Erreur'); return }
      clearCart()
      setOrderNumber(json.order.orderNumber)
      setSubmitted(true)
    } catch {
      setServerError('Une erreur est survenue. Réessayez.')
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <CheckCircle2 size={64} className="text-green-500 mb-6" />
        <h1 className="text-3xl font-black text-brand-black mb-2">Commande confirmée !</h1>
        <p className="text-brand-gray-text mb-2">
          Votre commande <span className="font-bold text-brand-black">{orderNumber}</span> a bien été enregistrée.
        </p>
        <p className="text-brand-gray-text mb-8 max-w-sm">
          Vous recevrez un email de confirmation. FLOKKA vous contactera pour les détails de livraison.
        </p>
        <Link href={`/boutique/${slug}`} className="bg-brand-black text-white font-semibold px-6 py-3 text-sm hover:bg-gray-800 transition-colors">
          Retour à la boutique
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 bg-white border-b border-brand-gray-dark">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href={`/boutique/${slug}`} className="flex items-center gap-2 text-sm text-brand-gray-text hover:text-brand-black">
            <ArrowLeft size={16} /> Retour au catalogue
          </Link>
          <FlokkaLogo size="sm" href="/" />
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-black text-brand-black mb-10">Commander</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <h2 className="text-lg font-bold text-brand-black mb-4">Vos informations</h2>

            <div>
              <label className="block text-sm font-semibold mb-1.5">Nom complet <span className="text-red-500">*</span></label>
              <input {...register('name')} placeholder="Prénom Nom" className="w-full border border-brand-gray-dark px-4 py-3 text-sm focus:outline-none focus:border-brand-black" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Email <span className="text-red-500">*</span></label>
              <input {...register('email')} type="email" placeholder="votre@email.fr" className="w-full border border-brand-gray-dark px-4 py-3 text-sm focus:outline-none focus:border-brand-black" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Téléphone</label>
              <input {...register('phone')} type="tel" placeholder="06 00 00 00 00" className="w-full border border-brand-gray-dark px-4 py-3 text-sm focus:outline-none focus:border-brand-black" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Adresse de livraison</label>
              <textarea {...register('address')} rows={2} placeholder="Rue, Code postal, Ville" className="w-full border border-brand-gray-dark px-4 py-3 text-sm focus:outline-none focus:border-brand-black resize-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Remarques</label>
              <textarea {...register('notes')} rows={2} placeholder="Instructions particulières..." className="w-full border border-brand-gray-dark px-4 py-3 text-sm focus:outline-none focus:border-brand-black resize-none" />
            </div>

            {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

            <button type="submit" disabled={isSubmitting} className="w-full bg-brand-black text-white font-semibold py-4 text-sm hover:bg-gray-800 transition-colors disabled:opacity-60">
              {isSubmitting ? 'Envoi...' : `Passer la commande — ${formatPrice(total)}`}
            </button>

            <p className="text-xs text-brand-gray-text text-center">
              Articles produits à la demande. Paiement à la livraison ou sur devis.
            </p>
          </form>

          {/* Order summary */}
          <div>
            <h2 className="text-lg font-bold text-brand-black mb-4">Récapitulatif</h2>
            <div className="border border-brand-gray-dark divide-y divide-brand-gray-dark">
              {items.map((item, i) => (
                <div key={i} className="flex gap-3 p-4">
                  <div className="w-10 h-10 bg-brand-gray flex items-center justify-center shrink-0">
                    <ShoppingBag size={14} className="text-brand-gray-dark" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-brand-black">{item.productName}</p>
                    {item.variant && <p className="text-xs text-brand-gray-text">Taille : {item.variant}</p>}
                    {item.customName && <p className="text-xs text-brand-gray-text">Nom : {item.customName}</p>}
                    {item.customNumber && <p className="text-xs text-brand-gray-text">N° : {item.customNumber}</p>}
                    <p className="text-xs text-brand-gray-text">Qté : {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-brand-black shrink-0">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                </div>
              ))}
              <div className="p-4 flex justify-between">
                <span className="font-bold text-brand-black">Total</span>
                <span className="text-xl font-black text-brand-black">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage({ params }: { params: { slug: string } }) {
  return (
    <CartProvider slug={params.slug}>
      <CheckoutContent slug={params.slug} />
    </CartProvider>
  )
}
