'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Search, Pencil, Trash2, Package, Tag } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { formatPrice } from '@/lib/utils'

interface Product {
  id: string
  name: string
  basePrice: number
  isActive: boolean
  isCustomizable: boolean
  hasNameNumber: boolean
  category?: { name: string }
  variants: { id: string; name: string; type: string }[]
  images: string[]
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const token = typeof window !== 'undefined' ? localStorage.getItem('flokka_token') : ''
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    fetch('/api/products', { headers })
      .then((r) => r.json())
      .then((d) => { setProducts(d.products || []); setLoading(false) })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Supprimer le produit "${name}" ?`)) return
    await fetch(`/api/products/${id}`, { method: 'DELETE', headers })
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-brand-black">Produits</h1>
            <p className="text-brand-gray-text text-sm mt-1">{products.length} produit(s) au catalogue</p>
          </div>
          <Link
            href="/admin/produits/nouveau"
            className="flex items-center gap-2 bg-brand-black text-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} />
            Nouveau produit
          </Link>
        </div>

        <div className="relative mb-6">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-medium" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full border border-brand-gray-dark pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-black"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-brand-gray-dark p-12 text-center">
            <Package size={40} className="mx-auto text-gray-200 mb-4" />
            <p className="text-brand-gray-text">Aucun produit trouvé</p>
          </div>
        ) : (
          <div className="bg-white border border-brand-gray-dark divide-y divide-brand-gray-dark">
            {filtered.map((product) => (
              <div key={product.id} className="flex items-center gap-4 px-6 py-4 hover:bg-brand-gray/50 transition-colors">
                {/* Preview image or icon */}
                <div className="w-12 h-12 bg-brand-gray flex items-center justify-center shrink-0 overflow-hidden">
                  {product.images[0] ? (
                    <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Package size={20} className="text-brand-gray-dark" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-brand-black">{product.name}</p>
                    {!product.isActive && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Inactif</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    {product.category && (
                      <span className="flex items-center gap-1 text-xs text-brand-gray-text">
                        <Tag size={10} /> {product.category.name}
                      </span>
                    )}
                    {product.variants.length > 0 && (
                      <span className="text-xs text-brand-gray-text">
                        Tailles : {product.variants.map((v) => v.name).join(', ')}
                      </span>
                    )}
                    {product.hasNameNumber && (
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">Personnalisable</span>
                    )}
                  </div>
                </div>
                <div className="font-bold text-brand-black shrink-0">{formatPrice(product.basePrice)}</div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/admin/produits/${product.id}/modifier`} className="p-2 text-brand-gray-text hover:text-brand-black transition-colors">
                    <Pencil size={16} />
                  </Link>
                  <button onClick={() => handleDelete(product.id, product.name)} className="p-2 text-brand-gray-text hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
