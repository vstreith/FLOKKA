'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { AdminLayout } from '@/components/admin/AdminLayout'

const schema = z.object({
  name: z.string().min(2, 'Nom requis'),
  description: z.string().optional(),
  basePrice: z.coerce.number().positive('Prix invalide'),
  categoryId: z.string().min(1, 'Catégorie requise'),
  isCustomizable: z.boolean().default(true),
  hasNameNumber: z.boolean().default(false),
  isActive: z.boolean().default(true),
})
type FormData = z.infer<typeof schema>

interface ProductFormProps {
  productId?: string
  defaultValues?: Partial<FormData & { images: string[]; variants: Array<{ name: string; type: string }> }>
  isEdit?: boolean
}

export function ProductForm({ productId, defaultValues, isEdit }: ProductFormProps) {
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
  const [images, setImages] = useState<string[]>(defaultValues?.images || [])
  const [newImage, setNewImage] = useState('')
  const [variants, setVariants] = useState<Array<{ name: string; type: string }>>(
    defaultValues?.variants || []
  )
  const [newVariantName, setNewVariantName] = useState('')
  const [newVariantType, setNewVariantType] = useState('size')
  const [newCategory, setNewCategory] = useState('')
  const [addingCategory, setAddingCategory] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || { isCustomizable: true, hasNameNumber: false, isActive: true },
  })

  const token = typeof window !== 'undefined' ? localStorage.getItem('flokka_token') : ''
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

  const loadCategories = useCallback(() => {
    fetch('/api/categories', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => setCategories(d.categories || []))
  }, [token])

  useEffect(() => { loadCategories() }, [loadCategories])

  const addCategory = async () => {
    if (!newCategory.trim()) return
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: newCategory.trim() }),
    })
    if (res.ok) {
      loadCategories()
      setNewCategory('')
      setAddingCategory(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    setSaving(true)
    setServerError('')
    try {
      const url = isEdit ? `/api/products/${productId}` : '/api/products'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({ ...data, images, variants }),
      })
      const json = await res.json()
      if (!res.ok) { setServerError(json.error || 'Erreur'); return }
      router.push('/admin/produits')
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
          <Link href="/admin/produits" className="flex items-center gap-2 text-sm text-brand-gray-text hover:text-brand-black">
            <ArrowLeft size={16} /> Produits
          </Link>
          <span className="text-brand-gray-medium">/</span>
          <h1 className="text-2xl font-black text-brand-black">
            {isEdit ? 'Modifier le produit' : 'Nouveau produit'}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white border border-brand-gray-dark p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold mb-1.5">Nom <span className="text-red-500">*</span></label>
              <input {...register('name')} placeholder="T-shirt personnalisé" className="w-full border border-brand-gray-dark px-4 py-2.5 text-sm focus:outline-none focus:border-brand-black" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5">Prix de base (€) <span className="text-red-500">*</span></label>
              <input {...register('basePrice')} type="number" step="0.01" min="0" placeholder="25.00" className="w-full border border-brand-gray-dark px-4 py-2.5 text-sm focus:outline-none focus:border-brand-black" />
              {errors.basePrice && <p className="text-red-500 text-xs mt-1">{errors.basePrice.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5">Catégorie <span className="text-red-500">*</span></label>
              <div className="flex gap-2">
                <select {...register('categoryId')} className="flex-1 border border-brand-gray-dark px-3 py-2.5 text-sm focus:outline-none focus:border-brand-black bg-white">
                  <option value="">Choisir...</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <button type="button" onClick={() => setAddingCategory(!addingCategory)} className="px-3 py-2.5 border border-brand-gray-dark hover:bg-brand-gray transition-colors text-sm">
                  <Plus size={14} />
                </button>
              </div>
              {addingCategory && (
                <div className="flex gap-2 mt-2">
                  <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Nouvelle catégorie" className="flex-1 border border-brand-gray-dark px-3 py-2 text-sm focus:outline-none" />
                  <button type="button" onClick={addCategory} className="bg-brand-black text-white px-3 py-2 text-sm">OK</button>
                </div>
              )}
              {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold mb-1.5">Description</label>
              <textarea {...register('description')} rows={3} placeholder="Description du produit..." className="w-full border border-brand-gray-dark px-4 py-2.5 text-sm focus:outline-none focus:border-brand-black resize-none" />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2 border-t border-brand-gray-dark">
            <h3 className="text-sm font-bold text-brand-black">Options</h3>
            {[
              { name: 'isCustomizable' as const, label: 'Personnalisable' },
              { name: 'hasNameNumber' as const, label: 'Avec nom/numéro (maillot)' },
              { name: 'isActive' as const, label: 'Produit actif' },
            ].map((opt) => (
              <label key={opt.name} className="flex items-center gap-3 cursor-pointer">
                <input {...register(opt.name)} type="checkbox" className="w-4 h-4 accent-brand-black" />
                <span className="text-sm text-brand-black">{opt.label}</span>
              </label>
            ))}
          </div>

          {/* Variants */}
          <div className="pt-2 border-t border-brand-gray-dark">
            <h3 className="text-sm font-bold text-brand-black mb-3">Tailles / Variants</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {variants.map((v, i) => (
                <span key={i} className="inline-flex items-center gap-1 bg-brand-gray border border-brand-gray-dark px-2.5 py-1 text-sm">
                  {v.name}
                  <span className="text-xs text-brand-gray-text">({v.type === 'size' ? 'Taille' : 'Couleur'})</span>
                  <button type="button" onClick={() => setVariants(variants.filter((_, j) => j !== i))} className="ml-1 text-brand-gray-text hover:text-red-500">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={newVariantName} onChange={(e) => setNewVariantName(e.target.value)} placeholder="Ex : S, M, L, XL" className="flex-1 border border-brand-gray-dark px-3 py-2 text-sm focus:outline-none" />
              <select value={newVariantType} onChange={(e) => setNewVariantType(e.target.value)} className="border border-brand-gray-dark px-3 py-2 text-sm bg-white focus:outline-none">
                <option value="size">Taille</option>
                <option value="color">Couleur</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  if (newVariantName.trim()) {
                    setVariants([...variants, { name: newVariantName.trim(), type: newVariantType }])
                    setNewVariantName('')
                  }
                }}
                className="bg-brand-black text-white px-3 py-2 text-sm"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Images */}
          <div className="pt-2 border-t border-brand-gray-dark">
            <h3 className="text-sm font-bold text-brand-black mb-3">Images (URLs)</h3>
            <div className="space-y-2 mb-3">
              {images.map((url, i) => (
                <div key={i} className="flex gap-2">
                  <input value={url} readOnly className="flex-1 border border-brand-gray-dark px-3 py-2 text-sm bg-brand-gray text-brand-gray-text" />
                  <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))} className="p-2 border border-brand-gray-dark text-brand-gray-text hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={newImage} onChange={(e) => setNewImage(e.target.value)} placeholder="https://..." type="url" className="flex-1 border border-brand-gray-dark px-3 py-2 text-sm focus:outline-none" />
              <button type="button" onClick={() => { if (newImage.trim()) { setImages([...images, newImage.trim()]); setNewImage('') } }} className="bg-brand-black text-white px-3 py-2 text-sm">
                <Plus size={14} />
              </button>
            </div>
          </div>

          {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="flex-1 bg-brand-black text-white font-semibold py-3 text-sm hover:bg-gray-800 transition-colors disabled:opacity-60">
              {saving ? 'Enregistrement...' : isEdit ? 'Enregistrer les modifications' : 'Créer le produit'}
            </button>
            <Link href="/admin/produits" className="px-6 py-3 border border-brand-gray-dark text-sm font-semibold text-brand-black hover:bg-brand-gray transition-colors">
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
