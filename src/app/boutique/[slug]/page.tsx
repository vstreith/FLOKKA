'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingBag, ArrowLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { CartProvider, useCart } from '@/components/shop/CartProvider'
import { CartDrawer } from '@/components/shop/CartDrawer'
import { FlokkaLogo } from '@/components/ui/Logo'
import { formatPrice } from '@/lib/utils'
import type { ShopAccess } from '@/types'

interface ShopProduct {
  id: string
  name: string
  description?: string
  effectivePrice: number
  images: string[]
  category?: { name: string }
  variants: { id: string; name: string; type: string }[]
  isCustomizable: boolean
  hasNameNumber: boolean
}

function ShopContent({ slug, club, products }: {
  slug: string
  club: { name: string; primaryColor: string; description?: string }
  products: ShopProduct[]
}) {
  const { itemCount, setIsOpen } = useCart()
  const [filter, setFilter] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category?.name).filter(Boolean)))] as string[]
  const filtered = filter === 'all' ? products : products.filter((p) => p.category?.name === filter)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Shop header */}
      <header className="sticky top-0 z-40 bg-white border-b border-brand-gray-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/boutique-privee" className="text-brand-gray-text hover:text-brand-black transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: club.primaryColor }}
              />
              <span className="font-black tracking-wide text-brand-black">{club.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FlokkaLogo size="sm" href="/" />
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-2 bg-brand-black text-white px-4 py-2 text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              <ShoppingBag size={16} />
              Panier
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Club banner */}
      <div className="py-10 px-4 sm:px-6 lg:px-8 bg-brand-gray border-b border-brand-gray-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-brand-gray-text mb-2">
            <span>Boutique privée</span>
            <ChevronRight size={12} />
            <span className="text-brand-black font-semibold">{club.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-black">
            Boutique {club.name}
          </h1>
          {club.description && (
            <p className="text-brand-gray-text mt-2 max-w-xl">{club.description}</p>
          )}
        </div>
      </div>

      {/* Category filters */}
      {categories.length > 2 && (
        <div className="border-b border-brand-gray-dark px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex gap-6 py-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-sm font-medium whitespace-nowrap pb-1 border-b-2 transition-colors ${
                  filter === cat
                    ? 'text-brand-black border-brand-black'
                    : 'text-brand-gray-text border-transparent hover:text-brand-black'
                }`}
              >
                {cat === 'all' ? 'Tout voir' : cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-brand-gray-text">
              Aucun produit disponible pour le moment.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} slug={slug} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-brand-gray-dark py-8 text-center">
        <p className="text-xs text-brand-gray-text">
          Boutique privée FLOKKA — Andlau (67) —{' '}
          <Link href="/contact" className="hover:text-brand-black transition-colors">
            contact@flokka.fr
          </Link>
        </p>
      </div>

      <CartDrawer slug={slug} />
    </div>
  )
}

function ProductCard({ product, slug }: { product: ShopProduct; slug: string }) {
  return (
    <Link href={`/boutique/${slug}/produit/${product.id}`} className="group block">
      <div className="aspect-square bg-brand-gray flex items-center justify-center mb-3 overflow-hidden">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center text-brand-gray-dark">
            <ShoppingBag size={32} />
            <p className="text-xs mt-2 text-brand-gray-text">Photo à venir</p>
          </div>
        )}
      </div>
      <div>
        {product.category?.name && (
          <p className="text-xs text-brand-gray-text uppercase tracking-wider mb-1">
            {product.category.name}
          </p>
        )}
        <p className="font-semibold text-brand-black text-sm leading-tight mb-1 group-hover:underline">
          {product.name}
        </p>
        <p className="font-bold text-brand-black">{formatPrice(product.effectivePrice)}</p>
      </div>
    </Link>
  )
}

export default function ShopPage({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<{ club: { name: string; primaryColor: string; description?: string }; products: ShopProduct[] } | null>(null)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check session access
    const shopData = sessionStorage.getItem('flokka_shop')
    const parsed: ShopAccess | null = shopData ? JSON.parse(shopData) : null
    if (!parsed || parsed.slug !== params.slug) {
      // Try to load anyway (public access by slug knowledge)
    }

    fetch(`/api/shop/${params.slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) {
          setError('Boutique introuvable.')
          return
        }
        setData(d)
      })
      .catch(() => setError('Erreur de chargement.'))
  }, [params.slug, router])

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <p className="text-xl font-bold text-brand-black mb-4">{error}</p>
        <Link href="/boutique-privee" className="text-sm underline text-brand-gray-text">
          Retour à l&apos;accès boutique
        </Link>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <CartProvider slug={params.slug}>
      <ShopContent slug={params.slug} club={data.club} products={data.products} />
    </CartProvider>
  )
}
