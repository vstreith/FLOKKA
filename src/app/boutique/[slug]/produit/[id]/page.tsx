'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ShoppingBag, CheckCircle2, Plus, Minus } from 'lucide-react'
import { CartProvider, useCart } from '@/components/shop/CartProvider'
import { CartDrawer } from '@/components/shop/CartDrawer'
import { FlokkaLogo } from '@/components/ui/Logo'
import { formatPrice } from '@/lib/utils'

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

function ProductDetailContent({ product, slug }: { product: ShopProduct; slug: string }) {
  const { addItem, itemCount, setIsOpen } = useCart()
  const [selectedVariant, setSelectedVariant] = useState<string>('')
  const [customName, setCustomName] = useState('')
  const [customNumber, setCustomNumber] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [error, setError] = useState('')

  const sizes = product.variants.filter((v) => v.type === 'size')
  const colors = product.variants.filter((v) => v.type === 'color')

  const handleAdd = () => {
    if (sizes.length > 0 && !selectedVariant) {
      setError('Veuillez sélectionner une taille.')
      return
    }
    setError('')
    addItem({
      productId: product.id,
      productName: product.name,
      variant: selectedVariant || undefined,
      quantity,
      unitPrice: product.effectivePrice,
      customName: customName || undefined,
      customNumber: customNumber || undefined,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-white/40 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href={`/boutique/${slug}`} className="flex items-center gap-2 text-sm text-brand-gray-text hover:text-brand-violet-dark transition-colors">
            <ArrowLeft size={16} />
            Retour à la boutique
          </Link>
          <FlokkaLogo size="sm" href="/" />
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2 bg-brand-gradient text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
          >
            <ShoppingBag size={16} />
            Panier
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white text-brand-violet-dark ring-2 ring-brand-pink rounded-full text-xs flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-[2rem] bg-brand-gradient-soft ring-1 ring-brand-gray-dark shadow-soft flex items-center justify-center mb-3 overflow-hidden">
              {product.images[activeImg] ? (
                <img
                  src={product.images[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ShoppingBag size={64} className="text-brand-violet/40" />
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-xl border-2 overflow-hidden transition-colors ${i === activeImg ? 'border-brand-violet' : 'border-brand-gray-dark'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {product.category?.name && (
              <p className="text-xs text-brand-violet font-semibold uppercase tracking-widest mb-2">
                {product.category.name}
              </p>
            )}
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-black mb-3">
              {product.name}
            </h1>
            <p className="font-display text-3xl font-extrabold text-gradient mb-6">
              {formatPrice(product.effectivePrice)}
            </p>

            {product.description && (
              <p className="text-brand-gray-text leading-relaxed mb-8 border-b border-brand-gray-dark pb-8">
                {product.description}
              </p>
            )}

            {/* Tailles */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-brand-black mb-3">
                  Taille {selectedVariant && <span className="font-normal text-brand-gray-text">— {selectedVariant}</span>}
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.name)}
                      className={`min-w-[3rem] h-10 px-3 rounded-xl border text-sm font-semibold transition-all ${
                        selectedVariant === v.name
                          ? 'bg-brand-gradient text-white border-transparent shadow-soft'
                          : 'bg-white text-brand-black border-brand-gray-dark hover:border-brand-violet'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Couleurs */}
            {colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-brand-black mb-3">Couleur</p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.name)}
                      className={`px-3 h-9 rounded-xl border text-sm font-medium transition-all ${
                        selectedVariant === v.name
                          ? 'bg-brand-gradient text-white border-transparent shadow-soft'
                          : 'bg-white text-brand-black border-brand-gray-dark hover:border-brand-violet'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Personnalisation */}
            {product.hasNameNumber && (
              <div className="mb-6 p-5 rounded-2xl bg-brand-gradient-soft border border-brand-gray-dark ring-1 ring-brand-gray-dark">
                <p className="text-sm font-bold text-brand-violet-dark mb-3">Personnalisation</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-brand-gray-text block mb-1">Nom</label>
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Ex : DUPONT"
                      className="w-full rounded-xl border border-brand-gray-dark bg-white px-3 py-2 text-sm uppercase focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-gray-medium transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-brand-gray-text block mb-1">Numéro</label>
                    <input
                      type="text"
                      value={customNumber}
                      onChange={(e) => setCustomNumber(e.target.value)}
                      placeholder="Ex : 10"
                      className="w-full rounded-xl border border-brand-gray-dark bg-white px-3 py-2 text-sm focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-gray-medium transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Quantité */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-sm font-semibold text-brand-black">Quantité</p>
              <div className="flex items-center rounded-full border border-brand-gray-dark bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-brand-violet-dark hover:bg-brand-gray transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-brand-violet-dark hover:bg-brand-gray transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              onClick={handleAdd}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-sm shadow-glow hover:-translate-y-0.5 transition-all duration-300 ${
                added
                  ? 'bg-gradient-to-r from-brand-navy to-brand-black text-white'
                  : 'bg-brand-gradient text-white'
              }`}
            >
              {added ? (
                <>
                  <CheckCircle2 size={16} />
                  Ajouté au panier !
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  Ajouter au panier — {formatPrice(product.effectivePrice * quantity)}
                </>
              )}
            </button>

            <p className="text-xs text-brand-gray-text mt-3 text-center">
              Article produit à la demande. Délai de fabrication : 5 à 10 jours ouvrés.
            </p>
          </div>
        </div>
      </div>

      <CartDrawer slug={slug} />
    </div>
  )
}

export default function ProductDetailPage({ params }: { params: { slug: string; id: string } }) {
  const [product, setProduct] = useState<ShopProduct | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) { setError('Produit introuvable.'); return }
        setProduct(d.product)
      })
      .catch(() => setError('Erreur de chargement.'))
  }, [params.id])

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <p className="text-xl font-bold mb-4">{error}</p>
        <Link href={`/boutique/${params.slug}`} className="text-sm underline text-brand-gray-text">
          Retour à la boutique
        </Link>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center mesh-bg">
        <div className="w-10 h-10 border-[3px] border-brand-violet border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <CartProvider slug={params.slug}>
      <ProductDetailContent product={product} slug={params.slug} />
    </CartProvider>
  )
}
