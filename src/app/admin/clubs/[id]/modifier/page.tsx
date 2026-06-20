'use client'

import { useState, useEffect } from 'react'
import { ClubForm } from '@/components/admin/ClubForm'
import { AdminLayout } from '@/components/admin/AdminLayout'

export default function EditClubPage({ params }: { params: { id: string } }) {
  const [defaultValues, setDefaultValues] = useState<Record<string, unknown> | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('flokka_token')
    fetch(`/api/clubs/${params.id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        const c = d.club
        if (c) setDefaultValues({
          name: c.name, description: c.description || '', logo: c.logo || '',
          primaryColor: c.primaryColor, type: c.type, email: c.email || '',
          phone: c.phone || '', address: c.address || '', margin: c.margin,
        })
      })
  }, [params.id])

  if (!defaultValues) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    )
  }

  return <ClubForm clubId={params.id} defaultValues={defaultValues as Parameters<typeof ClubForm>[0]['defaultValues']} isEdit />
}
