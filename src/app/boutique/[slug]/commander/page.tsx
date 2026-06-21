'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, ShoppingBag, Info } from 'lucide-react'
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
  const { items, total, clearCart, hydrated } = useCart()
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    // On attend l'hydratation du panier (localStorage) avant de rediriger,
    // sinon on repart au shop alors que le panier n'est pas encore chargé.
    if (hydrated && items.length === 0 && !submitted) {
      router.push(`/boutique/${slug}`)
    }
  }, [hydrated, items, submitted, slug, router])

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
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 mesh-bg">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-navy to-brand-black flex items-center justify-center mb-6 shadow-glow">
          <CheckCircle2 size={40} className="text-white" />
        </div>
        <h1 className="font-display text-3xl font-extrabold text-brand-black mb-2">Commande confirmée !</h1>
        <p className="text-brand-gray-text mb-2">
          Votre commande <span className="font-bold text-brand-violet-dark">{orderNumber}</span> a bien été enregistrée.
        </p>
        <p className="text-brand-gray-text mb-8 max-w-md">
          Aucun paiement n&apos;est requis sur le site : le règlement se fait directement auprès de
          votre club. Votre club et FLOKKA reçoivent votre commande et vous recontacteront pour la
          suite (paiement, retrait ou livraison).
        </p>
        <Link href={`/boutique/${slug}`} className="bg-brand-gradient text-white font-semibold px-8 py-4 rounded-full text-sm shadow-glow hover:-translate-y-0.5 transition-all duration-300">
          Retour à la boutique
        </Link>
      </div>
    )
  }

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center mesh-bg">
        <div className="w-10 h-10 border-[3px] border-brand-navy border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 glass border-b border-white/40 shadow-soft">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href={`/boutique/${slug}`} className="flex items-center gap-2 text-sm text-brand-gray-text hover:text-brand-violet-dark transition-colors">
            <ArrowLeft size={16} /> Retour au catalogue
          </Link>
          <FlokkaLogo size="sm" href="/" />
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display text-3xl font-extrabold text-brand-black mb-4">Valider ma commande</h1>

        <div className="mb-10 flex items-start gap-3 rounded-2xl bg-brand-gradient-soft ring-1 ring-brand-gray-dark p-4 max-w-2xl">
          <Info size={18} className="text-brand-navy shrink-0 mt-0.5" />
          <p className="text-sm text-brand-gray-text leading-relaxed">
            <span className="font-semibold text-brand-black">Aucun paiement en ligne.</span>{' '}
            Vous validez simplement votre commande ici. Le règlement se fait{' '}
            <span className="font-semibold text-brand-black">directement auprès de votre club</span>,
            qui vous communiquera les modalités.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <h2 className="text-lg font-bold text-brand-black mb-4">Vos informations</h2>

            <div>
              <label className="block text-sm font-semibold mb-1.5">Nom complet <span className="text-red-500">*</span></label>
              <input {...register('name')} placeholder="Prénom Nom" className="w-full rounded-xl border border-brand-gray-dark bg-brand-gray/40 px-4 py-3 text-sm focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-gray-medium focus:bg-white transition-all" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Email <span className="text-red-500">*</span></label>
              <input {...register('email')} type="email" placeholder="votre@email.fr" className="w-full rounded-xl border border-brand-gray-dark bg-brand-gray/40 px-4 py-3 text-sm focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-gray-medium focus:bg-white transition-all" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Téléphone</label>
              <input {...register('phone')} type="tel" placeholder="06 00 00 00 00" className="w-full rounded-xl border border-brand-gray-dark bg-brand-gray/40 px-4 py-3 text-sm focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-gray-medium focus:bg-white transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Adresse de livraison</label>
              <textarea {...register('address')} rows={2} placeholder="Rue, Code postal, Ville" className="w-full rounded-xl border border-brand-gray-dark bg-brand-gray/40 px-4 py-3 text-sm focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-gray-medium focus:bg-white transition-all resize-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Remarques</label>
              <textarea {...register('notes')} rows={2} placeholder="Instructions particulières..." className="w-full rounded-xl border border-brand-gray-dark bg-brand-gray/40 px-4 py-3 text-sm focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-gray-medium focus:bg-white transition-all resize-none" />
            </div>

            {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

            <button type="submit" disabled={isSubmitting} className="w-full bg-brand-gradient text-white font-semibold py-4 text-sm rounded-full shadow-glow hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:translate-y-0">
              {isSubmitting ? 'Envoi...' : `Valider ma commande — ${formatPrice(total)}`}
            </button>

            <p className="text-xs text-brand-gray-text text-center">
              Articles produits à la demande. Aucun paiement en ligne — règlement directement auprès de votre club.
            </p>
          </form>

          {/* Order summary */}
          <div>
            <h2 className="text-lg font-bold text-brand-black mb-4">Récapitulatif</h2>
            <div className="rounded-2xl bg-white ring-1 ring-brand-gray-dark shadow-soft divide-y divide-brand-gray-dark overflow-hidden">
              {items.map((item, i) => (
                <div key={i} className="flex gap-3 p-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft flex items-center justify-center shrink-0">
                    <ShoppingBag size={14} className="text-brand-violet" />
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
              <div className="p-4 flex justify-between items-center bg-brand-gradient-soft">
                <span className="font-bold text-brand-black">Total</span>
                <span className="font-display text-2xl font-extrabold text-gradient">{formatPrice(total)}</span>
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
