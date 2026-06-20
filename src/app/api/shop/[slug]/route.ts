import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const club = await prisma.club.findUnique({
    where: { slug: params.slug, isActive: true },
    include: {
      products: {
        where: { isActive: true },
        include: {
          product: {
            include: {
              category: true,
              variants: { where: { isActive: true } },
            },
          },
        },
      },
    },
  })

  if (!club) return NextResponse.json({ error: 'Boutique non trouvée' }, { status: 404 })

  const products = club.products.map((cp) => ({
    ...cp.product,
    images: JSON.parse(cp.product.images || '[]'),
    effectivePrice: cp.customPrice ?? cp.product.basePrice * (1 + club.margin / 100),
    customPrice: cp.customPrice,
    clubProductId: cp.id,
  }))

  return NextResponse.json({
    club: {
      id: club.id,
      name: club.name,
      slug: club.slug,
      description: club.description,
      logo: club.logo,
      primaryColor: club.primaryColor,
    },
    products,
  })
}
