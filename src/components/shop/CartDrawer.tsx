'use client'

import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/components/shop/CartProvider'
import { formatPrice } from '@/lib/utils'

interface CartDrawerProps {
  slug: string
}

export function CartDrawer({ slug }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, total, itemCount, isOpen, setIsOpen } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-brand-gradient-soft border-b border-brand-gray-dark">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center shadow-soft">
              <ShoppingBag size={16} className="text-white" />
            </span>
            <span className="font-display font-bold text-brand-black">
              Panier {itemCount > 0 && `(${itemCount})`}
            </span>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/70 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag size={48} className="text-gray-200 mb-4" />
              <p className="text-brand-gray-text">Votre panier est vide</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex gap-3 py-3 border-b border-brand-gray-dark">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-brand-black text-sm truncate">
                      {item.productName}
                    </p>
                    {item.variant && (
                      <p className="text-xs text-brand-gray-text mt-0.5">Taille : {item.variant}</p>
                    )}
                    {item.customName && (
                      <p className="text-xs text-brand-gray-text">Nom : {item.customName}</p>
                    )}
                    {item.customNumber && (
                      <p className="text-xs text-brand-gray-text">Numéro : {item.customNumber}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center rounded-full border border-brand-gray-dark overflow-hidden">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-sm text-brand-violet-dark hover:bg-brand-gray transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-sm text-brand-violet-dark hover:bg-brand-gray transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-bold text-gradient">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="p-1 text-brand-gray-text hover:text-red-500 transition-colors self-start mt-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-brand-gray-dark">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-brand-black">Total</span>
              <span className="font-display text-2xl font-extrabold text-gradient">{formatPrice(total)}</span>
            </div>
            <Link
              href={`/boutique/${slug}/commander`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-brand-gradient text-white font-semibold py-4 text-sm rounded-full shadow-glow hover:-translate-y-0.5 transition-all duration-300"
            >
              Commander
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
