'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Mail, Check, Clock } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { formatDateTime } from '@/lib/utils'
import type { ContactRequest } from '@/types'

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const token = typeof window !== 'undefined' ? localStorage.getItem('flokka_token') : ''
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

  useEffect(() => {
    fetch('/api/contact', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { setContacts(d.contacts || []); setLoading(false) })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const markStatus = async (id: string, status: string) => {
    const res = await fetch('/api/contact', {
      method: 'PUT',
      headers,
      body: JSON.stringify({ id, status }),
    })
    const d = await res.json()
    setContacts((prev) => prev.map((c) => (c.id === id ? d.contact : c)))
  }

  const filtered = filter === 'all' ? contacts : contacts.filter((c) => c.status === filter)
  const newCount = contacts.filter((c) => c.status === 'new').length

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      new: 'bg-blue-100 text-blue-700',
      read: 'bg-gray-100 text-gray-600',
      replied: 'bg-green-100 text-green-700',
    }
    const label: Record<string, string> = { new: 'Nouveau', read: 'Lu', replied: 'Répondu' }
    return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[status]}`}>{label[status]}</span>
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-brand-black">Contacts</h1>
            <p className="text-brand-gray-text text-sm mt-1">
              {newCount > 0 ? <span className="text-blue-600 font-semibold">{newCount} nouveau(x)</span> : 'Aucun nouveau message'}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          {[
            { value: 'all', label: 'Tous' },
            { value: 'new', label: 'Nouveaux' },
            { value: 'read', label: 'Lus' },
            { value: 'replied', label: 'Répondus' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                filter === f.value
                  ? 'bg-brand-black text-white'
                  : 'bg-white border border-brand-gray-dark text-brand-gray-text hover:border-brand-black'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-brand-gray-dark p-12 text-center">
            <MessageSquare size={40} className="mx-auto text-gray-200 mb-4" />
            <p className="text-brand-gray-text">Aucun message</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((contact) => (
              <div
                key={contact.id}
                className={`bg-white border p-5 transition-colors ${
                  contact.status === 'new'
                    ? 'border-blue-200 bg-blue-50/30'
                    : 'border-brand-gray-dark'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-bold text-brand-black">{contact.name}</p>
                    {contact.structure && (
                      <span className="text-xs bg-brand-gray text-brand-gray-text px-2 py-0.5 rounded-full">
                        {contact.structure}
                      </span>
                    )}
                    {statusBadge(contact.status)}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Clock size={12} className="text-brand-gray-text" />
                    <span className="text-xs text-brand-gray-text">{formatDateTime(contact.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Mail size={12} className="text-brand-gray-text" />
                  <a href={`mailto:${contact.email}`} className="text-sm text-brand-gray-text hover:text-brand-black transition-colors">
                    {contact.email}
                  </a>
                </div>

                <p className="text-sm text-brand-black leading-relaxed bg-brand-gray px-4 py-3 mb-4">
                  {contact.message}
                </p>

                <div className="flex items-center gap-2">
                  {contact.status === 'new' && (
                    <button
                      onClick={() => markStatus(contact.id, 'read')}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-brand-gray-dark hover:bg-brand-gray transition-colors"
                    >
                      Marquer comme lu
                    </button>
                  )}
                  {contact.status !== 'replied' && (
                    <button
                      onClick={() => markStatus(contact.id, 'replied')}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-green-600 text-white hover:bg-green-700 transition-colors"
                    >
                      <Check size={12} /> Marquer comme répondu
                    </button>
                  )}
                  <a
                    href={`mailto:${contact.email}?subject=Re: Votre message à FLOKKA`}
                    onClick={() => contact.status === 'new' && markStatus(contact.id, 'read')}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-brand-black text-brand-black hover:bg-brand-black hover:text-white transition-colors ml-auto"
                  >
                    <Mail size={12} /> Répondre par email
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
