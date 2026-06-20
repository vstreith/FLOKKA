'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Copy, Check, Store, Package, ShoppingCart, Pencil, Plus, Trash2 } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { formatPrice, formatDate, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, CLUB_TYPE_LABELS } from '@/lib/utils'
import type { Order } from '@/types'

interface ClubDetail {
  id: string
  name: string
  slug: string
  code: string
  description?: string
  primaryColor: string
  type: string
  email?: string
  phone?: string
  address?: string
  isActive: boolean
  margin: number
  products: Array<{
    id: string
    product: { id: string; name: string; basePrice: number; category?: { name: string } }
    customPrice?: number
    isActive: boolean
  }>
  orders: Order[]
  _count: { orders: number; products: number }
}

interface Product {
  id: string
  name: string
  basePrice: number
  category?: { name: string }
}

export default function ClubDetailPage({ params }: { params: { id: string } }) {
  const [club, setClub] = useState<ClubDetail | null>(null)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [copied, setCopied] = useState(false)
  const [addingProduct, setAddingProduct] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState('')
  const [customPrice, setCustomPrice] = useState('')

  const token = typeof window !== 'undefined' ? localStorage.getItem('flokka_token') : ''
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

  useEffect(() => {
    fetch(`/api/clubs/${params.id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => setClub(d.club))
    fetch('/api/products', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => setAllProducts(d.products || []))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const copyCode = () => {
    if (!club) return
    navigator.clipboard.writeText(club.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const addProduct = async () => {
    if (!selectedProductId) return
    const res = await fetch(`/api/clubs/${params.id}/products`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ productId: selectedProductId, customPrice: customPrice ? parseFloat(customPrice) : null }),
    })
    if (res.ok) {
      // Refresh
      const d = await fetch(`/api/clubs/${params.id}`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json())
      setClub(d.club)
      setSelectedProductId('')
      setCustomPrice('')
      setAddingProduct(false)
    }
  }

  const removeProduct = async (productId: string) => {
    if (!confirm('Retirer ce produit ?')) return
    await fetch(`/api/clubs/${params.id}/products`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ productId }),
    })
    const d = await fetch(`/api/clubs/${params.id}`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json())
    setClub(d.club)
  }

  const toggleActive = async () => {
    if (!club) return
    const res = await fetch(`/api/clubs/${params.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ isActive: !club.isActive }),
    })
    const d = await res.json()
    setClub(d.club)
  }

  if (!club) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    )
  }

  const assignedProductIds = club.products.map((cp) => cp.product.id)
  const availableProducts = allProducts.filter((p) => !assignedProductIds.includes(p.id))

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div className="flex items-start gap-4">
            <Link href="/admin/clubs" className="flex items-center gap-2 text-sm text-brand-gray-text hover:text-brand-black mt-1">
              <ArrowLeft size={16} />
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded flex items-center justify-center text-white font-black text-sm" style={{ backgroundColor: club.primaryColor }}>
                  {club.name.charAt(0)}
                </div>
                <h1 className="text-2xl font-black text-brand-black">{club.name}</h1>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${club.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {club.isActive ? 'Actif' : 'Inactif'}
                </span>
              </div>
              <p className="text-sm text-brand-gray-text">{CLUB_TYPE_LABELS[club.type]}</p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={toggleActive} className="text-xs px-3 py-2 border border-brand-gray-dark hover:bg-brand-gray transition-colors font-medium">
              {club.isActive ? 'Désactiver' : 'Activer'}
            </button>
            <Link href={`/admin/clubs/${club.id}/modifier`} className="flex items-center gap-2 bg-brand-black text-white px-3 py-2 text-sm font-semibold hover:bg-gray-800 transition-colors">
              <Pencil size={14} /> Modifier
            </Link>
            <Link href={`/boutique/${club.slug}`} target="_blank" className="flex items-center gap-2 border border-brand-black text-brand-black px-3 py-2 text-sm font-semibold hover:bg-brand-gray transition-colors">
              <Store size={14} /> Boutique
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white border border-brand-gray-dark p-5">
              <h3 className="font-bold text-brand-black text-sm mb-4 uppercase tracking-wider">Code d&apos;accès</h3>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-2xl font-black tracking-[0.2em] bg-brand-gray px-4 py-3 text-center">
                  {club.code}
                </code>
                <button onClick={copyCode} className="p-3 border border-brand-gray-dark hover:bg-brand-gray transition-colors">
                  {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="bg-white border border-brand-gray-dark p-5 space-y-3 text-sm">
              <h3 className="font-bold text-brand-black text-sm mb-2 uppercase tracking-wider">Informations</h3>
              {club.email && <p className="text-brand-gray-text">{club.email}</p>}
              {club.phone && <p className="text-brand-gray-text">{club.phone}</p>}
              {club.address && <p className="text-brand-gray-text">{club.address}</p>}
              <p className="text-brand-gray-text">Marge : <strong className="text-brand-black">{club.margin}%</strong></p>
              {club.description && <p className="text-brand-gray-text mt-2 pt-2 border-t border-brand-gray-dark">{club.description}</p>}
            </div>

            <div className="bg-white border border-brand-gray-dark p-5">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-2xl font-black text-brand-black">{club._count.products}</p>
                  <p className="text-xs text-brand-gray-text">Produits</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-brand-black">{club._count.orders}</p>
                  <p className="text-xs text-brand-gray-text">Commandes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Products + Orders */}
          <div className="lg:col-span-2 space-y-6">
            {/* Products */}
            <div className="bg-white border border-brand-gray-dark">
              <div className="flex items-center justify-between px-5 py-4 border-b border-brand-gray-dark">
                <h3 className="font-bold text-brand-black flex items-center gap-2">
                  <Package size={16} /> Produits de la boutique
                </h3>
                <button
                  onClick={() => setAddingProduct(!addingProduct)}
                  className="flex items-center gap-1 text-sm text-brand-gray-text hover:text-brand-black"
                >
                  <Plus size={14} /> Ajouter
                </button>
              </div>

              {addingProduct && (
                <div className="px-5 py-4 border-b border-brand-gray-dark bg-brand-gray flex gap-3 flex-wrap">
                  <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)} className="flex-1 min-w-[200px] border border-brand-gray-dark px-3 py-2 text-sm bg-white focus:outline-none">
                    <option value="">Sélectionner un produit</option>
                    {availableProducts.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} — {formatPrice(p.basePrice)}</option>
                    ))}
                  </select>
                  <input type="number" value={customPrice} onChange={(e) => setCustomPrice(e.target.value)} placeholder="Prix spécial (optionnel)" step="0.01" className="w-48 border border-brand-gray-dark px-3 py-2 text-sm focus:outline-none" />
                  <button onClick={addProduct} disabled={!selectedProductId} className="bg-brand-black text-white px-4 py-2 text-sm font-semibold disabled:opacity-50">Ajouter</button>
                  <button onClick={() => setAddingProduct(false)} className="px-4 py-2 text-sm text-brand-gray-text hover:text-brand-black">Annuler</button>
                </div>
              )}

              {club.products.length === 0 ? (
                <div className="px-5 py-8 text-center text-brand-gray-text text-sm">Aucun produit assigné</div>
              ) : (
                <div className="divide-y divide-brand-gray-dark">
                  {club.products.map((cp) => (
                    <div key={cp.id} className="flex items-center gap-3 px-5 py-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-brand-black">{cp.product.name}</p>
                        <p className="text-xs text-brand-gray-text">{cp.product.category?.name}</p>
                      </div>
                      <div className="text-sm text-right">
                        {cp.customPrice ? (
                          <span className="font-bold text-brand-black">{formatPrice(cp.customPrice)}</span>
                        ) : (
                          <span className="text-brand-gray-text">{formatPrice(cp.product.basePrice)}</span>
                        )}
                      </div>
                      <button onClick={() => removeProduct(cp.product.id)} className="p-1.5 text-brand-gray-text hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent orders */}
            <div className="bg-white border border-brand-gray-dark">
              <div className="flex items-center justify-between px-5 py-4 border-b border-brand-gray-dark">
                <h3 className="font-bold text-brand-black flex items-center gap-2">
                  <ShoppingCart size={16} /> Dernières commandes
                </h3>
                <Link href={`/admin/commandes?clubId=${club.id}`} className="text-sm text-brand-gray-text hover:text-brand-black">Tout voir</Link>
              </div>
              {club.orders.length === 0 ? (
                <div className="px-5 py-8 text-center text-brand-gray-text text-sm">Aucune commande</div>
              ) : (
                <div className="divide-y divide-brand-gray-dark">
                  {club.orders.slice(0, 5).map((order) => (
                    <Link key={order.id} href={`/admin/commandes/${order.id}`} className="flex items-center gap-4 px-5 py-3 hover:bg-brand-gray/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-brand-black">{order.customerName}</p>
                        <p className="text-xs text-brand-gray-text font-mono">{order.orderNumber} · {formatDate(order.createdAt)}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ORDER_STATUS_COLORS[order.status]}`}>
                          {ORDER_STATUS_LABELS[order.status]}
                        </span>
                        <p className="text-sm font-bold text-brand-black mt-0.5">{formatPrice(order.total)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
