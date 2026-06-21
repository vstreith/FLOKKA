import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { computeEffectivePrice } from '@/lib/utils'

// Détail d'un produit dans le contexte d'une boutique club :
// renvoie le prix client final (prix fournisseur + marge du club, ou prix spécial).
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string; id: string } }
) {
  const club = await prisma.club.findUnique({
    where: { slug: params.slug, isActive: true },
  })

  if (!club) return NextResponse.json({ error: 'Boutique non trouvée' }, { status: 404 })

  const clubProduct = await prisma.clubProduct.findUnique({
    where: { clubId_productId: { clubId: club.id, productId: params.id } },
    include: {
      product: {
        include: { category: true, variants: { where: { isActive: true } } },
      },
    },
  })

  if (!clubProduct || !clubProduct.isActive || !clubProduct.product.isActive) {
    return NextResponse.json({ error: 'Produit non disponible' }, { status: 404 })
  }

  const product = {
    ...clubProduct.product,
    images: JSON.parse(clubProduct.product.images || '[]'),
    effectivePrice: computeEffectivePrice(
      clubProduct.product.basePrice,
      club.margin,
      clubProduct.customPrice
    ),
  }

  return NextResponse.json({ product })
}
