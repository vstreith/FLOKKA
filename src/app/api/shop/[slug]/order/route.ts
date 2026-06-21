import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOrderNumber, computeEffectivePrice } from '@/lib/utils'

interface IncomingItem {
  productId: string
  variant?: string
  quantity: number
  customName?: string
  customNumber?: string
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { customer, items } = await req.json()

    const { name, email, phone, address, notes } = customer || {}

    if (!name || !email || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
    }

    const club = await prisma.club.findUnique({
      where: { slug: params.slug, isActive: true },
      include: {
        products: { include: { product: true } },
      },
    })

    if (!club) return NextResponse.json({ error: 'Boutique non trouvée' }, { status: 404 })

    // Index des produits réellement proposés par ce club (avec leur prix spécial éventuel).
    const clubProductByProductId = new Map(
      club.products
        .filter((cp) => cp.isActive && cp.product.isActive)
        .map((cp) => [cp.productId, cp])
    )

    // Prix recalculés côté serveur (on ne fait jamais confiance au prix envoyé par le client).
    const orderItems = []
    for (const raw of items as IncomingItem[]) {
      const cp = clubProductByProductId.get(raw.productId)
      if (!cp) {
        return NextResponse.json(
          { error: 'Un produit de votre panier n\'est plus disponible.' },
          { status: 400 }
        )
      }
      const quantity = Math.max(1, Math.floor(Number(raw.quantity) || 1))
      const unitPrice = computeEffectivePrice(cp.product.basePrice, club.margin, cp.customPrice)
      orderItems.push({
        productId: cp.productId,
        productName: cp.product.name,
        variant: raw.variant || null,
        quantity,
        unitPrice,
        customName: raw.customName || null,
        customNumber: raw.customNumber || null,
      })
    }

    const subtotal = orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
    const total = Math.round(subtotal * 100) / 100

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        clubId: club.id,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        customerAddress: address,
        notes,
        subtotal: total,
        total,
        status: 'pending',
        // Pas de paiement en ligne : le client règle directement auprès de son club.
        paymentStatus: 'unpaid',
        items: { create: orderItems },
      },
      include: { items: true },
    })

    return NextResponse.json({ order, success: true }, { status: 201 })
  } catch (error) {
    console.error('Order error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
