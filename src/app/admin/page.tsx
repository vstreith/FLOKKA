'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, ShoppingCart, Package, MessageSquare, TrendingUp, ArrowRight, Clock } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { formatPrice, formatDateTime, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/utils'
import type { Order } from '@/types'

interface Stats {
  totalClubs: number
  activeClubs: number
  totalOrders: number
  pendingOrders: number
  totalRevenue: number
  newContacts: number
  recentOrders: Order[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('flokka_token')
    const headers = { Authorization: `Bearer ${token}` }

    Promise.all([
      fetch('/api/clubs', { headers }).then((r) => r.json()),
      fetch('/api/orders?limit=5', { headers }).then((r) => r.json()),
      fetch('/api/contact', { headers }).then((r) => r.json()),
    ]).then(([clubsData, ordersData, contactData]) => {
      const clubs = clubsData.clubs || []
      const orders = ordersData.orders || []
      const contacts = contactData.contacts || []
      const allOrdersData = ordersData

      setStats({
        totalClubs: clubs.length,
        activeClubs: clubs.filter((c: { isActive: boolean }) => c.isActive).length,
        totalOrders: allOrdersData.total || 0,
        pendingOrders: orders.filter((o: Order) => o.status === 'pending').length,
        totalRevenue: orders.reduce((s: number, o: Order) => s + o.total, 0),
        newContacts: contacts.filter((c: { status: string }) => c.status === 'new').length,
        recentOrders: orders,
      })
    })
  }, [])

  const statCards = stats
    ? [
        { label: 'Clubs partenaires', value: stats.totalClubs, sub: `${stats.activeClubs} actifs`, icon: Users, href: '/admin/clubs', color: 'bg-blue-50 text-blue-600' },
        { label: 'Commandes', value: stats.totalOrders, sub: `${stats.pendingOrders} en attente`, icon: ShoppingCart, href: '/admin/commandes', color: 'bg-yellow-50 text-yellow-600' },
        { label: 'Chiffre d\'affaires', value: formatPrice(stats.totalRevenue), sub: 'Total des commandes', icon: TrendingUp, href: '/admin/commandes', color: 'bg-green-50 text-green-600' },
        { label: 'Nouveaux contacts', value: stats.newContacts, sub: 'Non lus', icon: MessageSquare, href: '/admin/contacts', color: 'bg-purple-50 text-purple-600' },
      ]
    : []

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-brand-black">Tableau de bord</h1>
          <p className="text-brand-gray-text text-sm mt-1">Vue d&apos;ensemble de l&apos;activité FLOKKA</p>
        </div>

        {!stats ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statCards.map((card) => {
                const Icon = card.icon
                return (
                  <Link key={card.label} href={card.href} className="bg-white border border-brand-gray-dark p-5 hover:border-brand-black transition-colors">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${card.color}`}>
                      <Icon size={18} />
                    </div>
                    <p className="text-2xl font-black text-brand-black">{card.value}</p>
                    <p className="text-sm font-semibold text-brand-black mt-0.5">{card.label}</p>
                    <p className="text-xs text-brand-gray-text mt-0.5">{card.sub}</p>
                  </Link>
                )
              })}
            </div>

            {/* Recent orders */}
            <div className="bg-white border border-brand-gray-dark">
              <div className="flex items-center justify-between px-6 py-4 border-b border-brand-gray-dark">
                <h2 className="font-bold text-brand-black">Dernières commandes</h2>
                <Link href="/admin/commandes" className="text-sm text-brand-gray-text hover:text-brand-black flex items-center gap-1">
                  Tout voir <ArrowRight size={14} />
                </Link>
              </div>
              {stats.recentOrders.length === 0 ? (
                <div className="px-6 py-10 text-center text-brand-gray-text">Aucune commande pour l&apos;instant</div>
              ) : (
                <div className="divide-y divide-brand-gray-dark">
                  {stats.recentOrders.map((order) => (
                    <Link key={order.id} href={`/admin/commandes/${order.id}`} className="flex items-center gap-4 px-6 py-4 hover:bg-brand-gray transition-colors">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-brand-gray-text">{order.orderNumber}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ORDER_STATUS_COLORS[order.status]}`}>
                            {ORDER_STATUS_LABELS[order.status]}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-brand-black mt-0.5">{order.customerName}</p>
                        <p className="text-xs text-brand-gray-text">{order.club?.name}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-brand-black">{formatPrice(order.total)}</p>
                        <p className="text-xs text-brand-gray-text flex items-center gap-1 justify-end mt-0.5">
                          <Clock size={10} /> {formatDateTime(order.createdAt)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Quick links */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { href: '/admin/clubs/nouveau', label: 'Créer un club', icon: Users },
                { href: '/admin/produits/nouveau', label: 'Ajouter un produit', icon: Package },
                { href: '/admin/contacts', label: 'Voir les contacts', icon: MessageSquare },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 bg-brand-black text-white px-5 py-4 hover:bg-gray-800 transition-colors"
                  >
                    <Icon size={16} />
                    <span className="text-sm font-semibold">{item.label}</span>
                    <ArrowRight size={14} className="ml-auto" />
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}
