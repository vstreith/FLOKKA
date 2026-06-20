'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Package, User, MapPin, Phone, Mail, FileText } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import {
  formatPrice,
  formatDateTime,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUS_COLORS,
} from '@/lib/utils'
import type { Order } from '@/types'

const ORDER_STATUSES = ['pending', 'confirmed', 'in_production', 'shipped', 'delivered', 'cancelled']
const PAYMENT_STATUSES = ['unpaid', 'paid', 'refunded']

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [saving, setSaving] = useState(false)

  const token = typeof window !== 'undefined' ? localStorage.getItem('flokka_token') : ''
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

  useEffect(() => {
    fetch(`/api/orders/${params.id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => setOrder(d.order))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const updateStatus = async (status: string) => {
    if (!order) return
    setSaving(true)
    const res = await fetch(`/api/orders/${params.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ status }),
    })
    const d = await res.json()
    setOrder(d.order)
    setSaving(false)
  }

  const updatePayment = async (paymentStatus: string) => {
    if (!order) return
    setSaving(true)
    const res = await fetch(`/api/orders/${params.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ paymentStatus }),
    })
    const d = await res.json()
    setOrder(d.order)
    setSaving(false)
  }

  if (!order) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div className="flex items-start gap-4">
            <Link href="/admin/commandes" className="mt-1 flex items-center gap-2 text-sm text-brand-gray-text hover:text-brand-black">
              <ArrowLeft size={16} />
            </Link>
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="text-xl font-black text-brand-black font-mono">{order.orderNumber}</h1>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${ORDER_STATUS_COLORS[order.status]}`}>
                  {ORDER_STATUS_LABELS[order.status]}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${PAYMENT_STATUS_COLORS[order.paymentStatus]}`}>
                  {PAYMENT_STATUS_LABELS[order.paymentStatus]}
                </span>
              </div>
              <p className="text-sm text-brand-gray-text">{formatDateTime(order.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-brand-gray-dark">
              <div className="px-5 py-4 border-b border-brand-gray-dark">
                <h3 className="font-bold text-brand-black flex items-center gap-2">
                  <Package size={16} /> Articles commandés
                </h3>
              </div>
              <div className="divide-y divide-brand-gray-dark">
                {order.items.map((item, i) => (
                  <div key={i} className="px-5 py-4 flex gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-brand-black">{item.productName}</p>
                      {item.variant && <p className="text-sm text-brand-gray-text">Taille : {item.variant}</p>}
                      {item.customName && <p className="text-sm text-brand-gray-text">Nom : {item.customName}</p>}
                      {item.customNumber && <p className="text-sm text-brand-gray-text">Numéro : {item.customNumber}</p>}
                      <p className="text-sm text-brand-gray-text">Qté : {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-brand-gray-text">{formatPrice(item.unitPrice)} × {item.quantity}</p>
                      <p className="font-bold text-brand-black">{formatPrice(item.unitPrice * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 py-4 border-t border-brand-gray-dark">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-brand-black">Total</span>
                  <span className="text-xl font-black text-brand-black">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="bg-white border border-brand-gray-dark p-5">
                <h3 className="font-bold text-brand-black mb-2 flex items-center gap-2">
                  <FileText size={16} /> Remarques
                </h3>
                <p className="text-sm text-brand-gray-text">{order.notes}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Customer */}
            <div className="bg-white border border-brand-gray-dark p-5">
              <h3 className="font-bold text-brand-black mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                <User size={14} /> Client
              </h3>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-brand-black">{order.customerName}</p>
                <p className="flex items-center gap-2 text-brand-gray-text">
                  <Mail size={12} />
                  <a href={`mailto:${order.customerEmail}`} className="hover:text-brand-black">{order.customerEmail}</a>
                </p>
                {order.customerPhone && (
                  <p className="flex items-center gap-2 text-brand-gray-text">
                    <Phone size={12} /> {order.customerPhone}
                  </p>
                )}
                {order.customerAddress && (
                  <p className="flex items-start gap-2 text-brand-gray-text">
                    <MapPin size={12} className="mt-0.5 shrink-0" /> {order.customerAddress}
                  </p>
                )}
              </div>
            </div>

            {/* Club */}
            <div className="bg-white border border-brand-gray-dark p-5">
              <h3 className="font-bold text-brand-black mb-3 text-sm uppercase tracking-wider">Club</h3>
              <p className="font-semibold text-brand-black text-sm">{order.club?.name}</p>
              <Link href={`/admin/clubs/${order.clubId}`} className="text-xs text-brand-gray-text hover:text-brand-black mt-1 block">
                Voir le club →
              </Link>
            </div>

            {/* Update status */}
            <div className="bg-white border border-brand-gray-dark p-5">
              <h3 className="font-bold text-brand-black mb-3 text-sm uppercase tracking-wider">Statut commande</h3>
              <div className="space-y-1.5">
                {ORDER_STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(s)}
                    disabled={saving || s === order.status}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      s === order.status
                        ? 'bg-brand-black text-white font-semibold'
                        : 'hover:bg-brand-gray text-brand-gray-text'
                    }`}
                  >
                    {ORDER_STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-brand-gray-dark p-5">
              <h3 className="font-bold text-brand-black mb-3 text-sm uppercase tracking-wider">Statut paiement</h3>
              <div className="space-y-1.5">
                {PAYMENT_STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => updatePayment(s)}
                    disabled={saving || s === order.paymentStatus}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      s === order.paymentStatus
                        ? 'bg-brand-black text-white font-semibold'
                        : 'hover:bg-brand-gray text-brand-gray-text'
                    }`}
                  >
                    {PAYMENT_STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
