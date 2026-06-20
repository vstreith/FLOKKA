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
      <header className="sticky top-0 z-40 bg-white border-b border-brand-gray-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href={`/boutique/${slug}`} className="flex items-center gap-2 text-sm text-brand-gray-text hover:text-brand-black transition-colors">
            <ArrowLeft size={16} />
            Retour à la boutique
          </Link>
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
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div>
            <div className="aspect-square bg-brand-gray flex items-center justify-center mb-3 overflow-hidden">
              {product.images[activeImg] ? (
                <img
                  src={product.images[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ShoppingBag size={64} className="text-brand-gray-dark" />
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 border-2 overflow-hidden ${i === activeImg ? 'border-brand-black' : 'border-brand-gray-dark'}`}
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
              <p className="text-xs text-brand-gray-text uppercase tracking-widest mb-2">
                {product.category.name}
              </p>
            )}
            <h1 className="text-3xl sm:text-4xl font-black text-brand-black mb-3">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-brand-black mb-6">
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
                      className={`min-w-[3rem] h-10 px-3 border text-sm font-semibold transition-colors ${
                        selectedVariant === v.name
                          ? 'bg-brand-black text-white border-brand-black'
                          : 'bg-white text-brand-black border-brand-gray-dark hover:border-brand-black'
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
                      className={`px-3 h-9 border text-sm font-medium transition-colors ${
                        selectedVariant === v.name
                          ? 'bg-brand-black text-white border-brand-black'
                          : 'bg-white text-brand-black border-brand-gray-dark hover:border-brand-black'
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
              <div className="mb-6 p-4 bg-brand-gray border border-brand-gray-dark">
                <p className="text-sm font-bold text-brand-black mb-3">Personnalisation</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-brand-gray-text block mb-1">Nom</label>
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Ex : DUPONT"
                      className="w-full border border-brand-gray-dark px-3 py-2 text-sm uppercase focus:outline-none focus:border-brand-black"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-brand-gray-text block mb-1">Numéro</label>
                    <input
                      type="text"
                      value={customNumber}
                      onChange={(e) => setCustomNumber(e.target.value)}
                      placeholder="Ex : 10"
                      className="w-full border border-brand-gray-dark px-3 py-2 text-sm focus:outline-none focus:border-brand-black"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Quantité */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-sm font-semibold text-brand-black">Quantité</p>
              <div className="flex items-center border border-brand-gray-dark">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-brand-gray transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-brand-gray transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              onClick={handleAdd}
              className={`w-full flex items-center justify-center gap-2 py-4 font-semibold text-sm transition-colors ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-brand-black text-white hover:bg-gray-800'
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <CartProvider slug={params.slug}>
      <ProductDetailContent product={product} slug={params.slug} />
    </CartProvider>
  )
}
