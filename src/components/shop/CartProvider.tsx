'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { CartItem } from '@/types'

interface CartContextValue {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (index: number) => void
  updateQuantity: (index: number, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  /** true une fois le panier chargé depuis le localStorage (évite les redirections prématurées). */
  hydrated: boolean
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children, slug }: { children: React.ReactNode; slug: string }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(`flokka_cart_${slug}`)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // Nettoyage défensif : on écarte les entrées corrompues (prix/quantité invalides)
        // afin que l'interface n'affiche jamais "NaN".
        const clean: CartItem[] = Array.isArray(parsed)
          ? parsed
              .map((i: CartItem) => ({
                ...i,
                unitPrice: Number(i.unitPrice),
                quantity: Math.max(1, Math.floor(Number(i.quantity) || 1)),
              }))
              .filter((i) => i.productId && Number.isFinite(i.unitPrice) && i.unitPrice >= 0)
          : []
        setItems(clean)
      } catch {
        setItems([])
      }
    }
    setHydrated(true)
  }, [slug])

  const persist = useCallback(
    (newItems: CartItem[]) => {
      setItems(newItems)
      localStorage.setItem(`flokka_cart_${slug}`, JSON.stringify(newItems))
    },
    [slug]
  )

  const addItem = (item: CartItem) => {
    const existing = items.findIndex(
      (i) =>
        i.productId === item.productId &&
        i.variant === item.variant &&
        i.customName === item.customName &&
        i.customNumber === item.customNumber
    )
    if (existing >= 0) {
      const updated = [...items]
      updated[existing].quantity += item.quantity
      persist(updated)
    } else {
      persist([...items, item])
    }
    setIsOpen(true)
  }

  const removeItem = (index: number) => {
    persist(items.filter((_, i) => i !== index))
  }

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(index)
      return
    }
    const updated = [...items]
    updated[index].quantity = quantity
    persist(updated)
  }

  const clearCart = () => persist([])

  const total = items.reduce(
    (sum, i) => sum + (Number(i.unitPrice) || 0) * (Number(i.quantity) || 0),
    0
  )
  const itemCount = items.reduce((sum, i) => sum + (Number(i.quantity) || 0), 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount, isOpen, setIsOpen, hydrated }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
