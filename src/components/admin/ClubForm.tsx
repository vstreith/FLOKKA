'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { CLUB_TYPE_LABELS } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Nom requis'),
  description: z.string().optional(),
  logo: z.string().optional(),
  primaryColor: z.string().default('#000000'),
  type: z.string().default('club'),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  margin: z.coerce.number().min(0).max(100).default(0),
})
type FormData = z.infer<typeof schema>

interface ClubFormProps {
  clubId?: string
  defaultValues?: Partial<FormData>
  isEdit?: boolean
}

export function ClubForm({ clubId, defaultValues, isEdit }: ClubFormProps) {
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || { primaryColor: '#000000', type: 'club', margin: 0 },
  })

  const onSubmit = async (data: FormData) => {
    setSaving(true)
    setServerError('')
    const token = localStorage.getItem('flokka_token')
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    try {
      const url = isEdit ? `/api/clubs/${clubId}` : '/api/clubs'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers, body: JSON.stringify(data) })
      const json = await res.json()
      if (!res.ok) { setServerError(json.error || 'Erreur'); return }
      router.push(isEdit ? `/admin/clubs/${clubId}` : `/admin/clubs/${json.club.id}`)
    } catch {
      setServerError('Erreur serveur')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/clubs" className="flex items-center gap-2 text-sm text-brand-gray-text hover:text-brand-black">
            <ArrowLeft size={16} /> Clubs
          </Link>
          <span className="text-brand-gray-medium">/</span>
          <h1 className="text-2xl font-black text-brand-black">
            {isEdit ? 'Modifier le club' : 'Nouveau club'}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white border border-brand-gray-dark p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold mb-1.5">Nom <span className="text-red-500">*</span></label>
              <input {...register('name')} placeholder="Badminton Club de Barr" className="w-full border border-brand-gray-dark px-4 py-2.5 text-sm focus:outline-none focus:border-brand-black" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5">Type</label>
              <select {...register('type')} className="w-full border border-brand-gray-dark px-4 py-2.5 text-sm focus:outline-none focus:border-brand-black bg-white">
                {Object.entries(CLUB_TYPE_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5">Couleur principale</label>
              <div className="flex gap-2">
                <input {...register('primaryColor')} type="color" className="w-12 h-10 border border-brand-gray-dark cursor-pointer p-0.5" />
                <input {...register('primaryColor')} type="text" placeholder="#000000" className="flex-1 border border-brand-gray-dark px-4 py-2.5 text-sm focus:outline-none focus:border-brand-black" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold mb-1.5">Description</label>
              <textarea {...register('description')} rows={3} placeholder="Description courte du club..." className="w-full border border-brand-gray-dark px-4 py-2.5 text-sm focus:outline-none focus:border-brand-black resize-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5">Email</label>
              <input {...register('email')} type="email" placeholder="club@email.fr" className="w-full border border-brand-gray-dark px-4 py-2.5 text-sm focus:outline-none focus:border-brand-black" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5">Téléphone</label>
              <input {...register('phone')} type="tel" placeholder="06 00 00 00 00" className="w-full border border-brand-gray-dark px-4 py-2.5 text-sm focus:outline-none focus:border-brand-black" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold mb-1.5">Adresse</label>
              <input {...register('address')} placeholder="Rue, Code postal, Ville" className="w-full border border-brand-gray-dark px-4 py-2.5 text-sm focus:outline-none focus:border-brand-black" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5">
                Marge (%)
                <span className="font-normal text-brand-gray-text ml-1">reversée au club</span>
              </label>
              <input {...register('margin')} type="number" min="0" max="100" step="1" placeholder="0" className="w-full border border-brand-gray-dark px-4 py-2.5 text-sm focus:outline-none focus:border-brand-black" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5">Logo (URL)</label>
              <input {...register('logo')} type="url" placeholder="https://..." className="w-full border border-brand-gray-dark px-4 py-2.5 text-sm focus:outline-none focus:border-brand-black" />
            </div>
          </div>

          {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="flex-1 bg-brand-black text-white font-semibold py-3 text-sm hover:bg-gray-800 transition-colors disabled:opacity-60">
              {saving ? 'Enregistrement...' : isEdit ? 'Enregistrer les modifications' : 'Créer le club'}
            </button>
            <Link href="/admin/clubs" className="px-6 py-3 border border-brand-gray-dark text-sm font-semibold text-brand-black hover:bg-brand-gray transition-colors">
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
