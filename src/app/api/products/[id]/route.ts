import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { category: true, variants: { where: { isActive: true } } },
  })
  if (!product) return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 })
  return NextResponse.json({ product: { ...product, images: JSON.parse(product.images || '[]') } })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const payload = getAuthUser(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const data = await req.json()
    const { name, description, basePrice, images, categoryId, isCustomizable, hasNameNumber, isActive, variants } = data

    await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        description,
        basePrice: basePrice ? parseFloat(basePrice) : undefined,
        images: images ? JSON.stringify(images) : undefined,
        categoryId,
        isCustomizable,
        hasNameNumber,
        isActive,
      },
    })

    if (variants) {
      await prisma.productVariant.deleteMany({ where: { productId: params.id } })
      if (variants.length > 0) {
        await prisma.productVariant.createMany({
          data: variants.map((v: { name: string; type?: string }) => ({
            productId: params.id,
            name: v.name,
            type: v.type || 'size',
          })),
        })
      }
    }

    const updated = await prisma.product.findUnique({
      where: { id: params.id },
      include: { category: true, variants: true },
    })

    return NextResponse.json({ product: { ...updated, images: JSON.parse(updated?.images || '[]') } })
  } catch (error) {
    console.error('Update product error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const payload = getAuthUser(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  await prisma.product.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
