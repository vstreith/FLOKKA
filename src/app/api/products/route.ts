import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const isAdmin = !!getAuthUser(req)
  const categoryId = searchParams.get('category')

  const where: { isActive?: boolean; categoryId?: string } = {}
  if (!isAdmin) where.isActive = true
  if (categoryId) where.categoryId = categoryId

  const products = await prisma.product.findMany({
    where,
    include: { category: true, variants: { where: { isActive: true } } },
    orderBy: { createdAt: 'desc' },
  })

  const productsWithImages = products.map((p) => ({
    ...p,
    images: JSON.parse(p.images || '[]'),
  }))

  return NextResponse.json({ products: productsWithImages })
}

export async function POST(req: NextRequest) {
  const payload = getAuthUser(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const data = await req.json()
    const { name, description, basePrice, images, categoryId, isCustomizable, hasNameNumber, variants } = data

    if (!name || !basePrice || !categoryId) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        basePrice: parseFloat(basePrice),
        images: JSON.stringify(images || []),
        categoryId,
        isCustomizable: isCustomizable ?? true,
        hasNameNumber: hasNameNumber ?? false,
        variants: variants?.length
          ? {
              create: variants.map((v: { name: string; type?: string }) => ({
                name: v.name,
                type: v.type || 'size',
              })),
            }
          : undefined,
      },
      include: { category: true, variants: true },
    })

    return NextResponse.json({ product: { ...product, images: JSON.parse(product.images) } }, { status: 201 })
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
