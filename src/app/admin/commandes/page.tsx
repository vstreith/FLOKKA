'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { formatPrice, formatDateTime, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/utils'
import type { Order } from '@/types'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [total, setTotal] = useState(0)

  const token = typeof window !== 'undefined' ? localStorage.getItem('flokka_token') : ''

  useEffect(() => {
    const url = new URL('/api/orders', window.location.origin)
    if (statusFilter) url.searchParams.set('status', statusFilter)
    url.searchParams.set('limit', '50')

    fetch(url.toString(), { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        setOrders(d.orders || [])
        setTotal(d.total || 0)
        setLoading(false)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter])

  const filtered = orders.filter(
    (o) =>
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.club?.name.toLowerCase().includes(search.toLowerCase())
  )

  const statuses = ['', 'pending', 'confirmed', 'in_production', 'shipped', 'delivered', 'cancelled']

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-brand-black">Commandes</h1>
          <p className="text-brand-gray-text text-sm mt-1">{total} commande(s) au total</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-medium" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="w-full border border-brand-gray-dark pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-black"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-brand-gray-medium" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-brand-gray-dark px-3 py-2.5 text-sm bg-white focus:outline-none"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s ? ORDER_STATUS_LABELS[s] : 'Tous les statuts'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-brand-gray-dark p-12 text-center text-brand-gray-text">
            Aucune commande trouvée
          </div>
        ) : (
          <div className="bg-white border border-brand-gray-dark divide-y divide-brand-gray-dark">
            {filtered.map((order) => (
              <Link
                key={order.id}
                href={`/admin/commandes/${order.id}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-brand-gray/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs text-brand-gray-text">{order.orderNumber}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ORDER_STATUS_COLORS[order.status]}`}>
                      {ORDER_STATUS_LABELS[order.status]}
                    </span>
                  </div>
                  <p className="font-bold text-brand-black mt-0.5">{order.customerName}</p>
                  <p className="text-xs text-brand-gray-text">
                    {order.club?.name} · {formatDateTime(order.createdAt)}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-brand-black">{formatPrice(order.total)}</p>
                  <p className="text-xs text-brand-gray-text">{order.items?.length || 0} article(s)</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
