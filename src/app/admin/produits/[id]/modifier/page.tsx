'use client'

import { useState, useEffect } from 'react'
import { ProductForm } from '@/components/admin/ProductForm'
import { AdminLayout } from '@/components/admin/AdminLayout'

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [defaultValues, setDefaultValues] = useState<Record<string, unknown> | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('flokka_token')
    fetch(`/api/products/${params.id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        const p = d.product
        if (p) setDefaultValues({
          name: p.name, description: p.description || '',
          basePrice: p.basePrice, categoryId: p.categoryId,
          isCustomizable: p.isCustomizable, hasNameNumber: p.hasNameNumber,
          isActive: p.isActive, images: p.images, variants: p.variants,
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

  return (
    <ProductForm
      productId={params.id}
      defaultValues={defaultValues as Parameters<typeof ProductForm>[0]['defaultValues']}
      isEdit
    />
  )
}
