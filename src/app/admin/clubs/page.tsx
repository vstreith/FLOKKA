'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Search, Eye, Pencil, Trash2, Store } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { CLUB_TYPE_LABELS } from '@/lib/utils'

interface Club {
  id: string
  name: string
  slug: string
  code: string
  type: string
  isActive: boolean
  primaryColor: string
  email?: string
  _count?: { orders: number; products: number }
}

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const token = typeof window !== 'undefined' ? localStorage.getItem('flokka_token') : ''
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    fetch('/api/clubs', { headers })
      .then((r) => r.json())
      .then((d) => { setClubs(d.clubs || []); setLoading(false) })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Supprimer le club "${name}" ?`)) return
    await fetch(`/api/clubs/${id}`, { method: 'DELETE', headers })
    setClubs((prev) => prev.filter((c) => c.id !== id))
  }

  const filtered = clubs.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-brand-black">Clubs & Associations</h1>
            <p className="text-brand-gray-text text-sm mt-1">{clubs.length} structure(s) partenaire(s)</p>
          </div>
          <Link
            href="/admin/clubs/nouveau"
            className="flex items-center gap-2 bg-brand-black text-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} />
            Nouveau club
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-medium" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un club ou code..."
            className="w-full border border-brand-gray-dark pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-black"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-brand-gray-dark p-12 text-center">
            <Store size={40} className="mx-auto text-gray-200 mb-4" />
            <p className="text-brand-gray-text">Aucun club trouvé</p>
          </div>
        ) : (
          <div className="bg-white border border-brand-gray-dark divide-y divide-brand-gray-dark">
            {filtered.map((club) => (
              <div key={club.id} className="flex items-center gap-4 px-6 py-4 hover:bg-brand-gray/50 transition-colors">
                <div
                  className="w-10 h-10 rounded shrink-0 flex items-center justify-center text-white font-black text-sm"
                  style={{ backgroundColor: club.primaryColor }}
                >
                  {club.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-brand-black">{club.name}</p>
                    {!club.isActive && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Inactif</span>
                    )}
                    <span className="text-xs bg-brand-gray text-brand-gray-text px-2 py-0.5 rounded-full">
                      {CLUB_TYPE_LABELS[club.type] || club.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="font-mono text-xs bg-brand-black text-white px-2 py-0.5">{club.code}</span>
                    {club._count && (
                      <span className="text-xs text-brand-gray-text">
                        {club._count.products} produit(s) · {club._count.orders} commande(s)
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/boutique/${club.slug}`}
                    target="_blank"
                    className="p-2 text-brand-gray-text hover:text-brand-black transition-colors"
                    title="Voir la boutique"
                  >
                    <Store size={16} />
                  </Link>
                  <Link
                    href={`/admin/clubs/${club.id}`}
                    className="p-2 text-brand-gray-text hover:text-brand-black transition-colors"
                    title="Voir"
                  >
                    <Eye size={16} />
                  </Link>
                  <Link
                    href={`/admin/clubs/${club.id}/modifier`}
                    className="p-2 text-brand-gray-text hover:text-brand-black transition-colors"
                    title="Modifier"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(club.id, club.name)}
                    className="p-2 text-brand-gray-text hover:text-red-500 transition-colors"
                    title="Supprimer"
                  >
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
