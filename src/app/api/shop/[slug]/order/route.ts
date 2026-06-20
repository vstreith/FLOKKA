import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOrderNumber } from '@/lib/utils'

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { customer, items } = await req.json()

    const { name, email, phone, address, notes } = customer

    if (!name || !email || !items?.length) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
    }

    const club = await prisma.club.findUnique({
      where: { slug: params.slug, isActive: true },
    })

    if (!club) return NextResponse.json({ error: 'Boutique non trouvée' }, { status: 404 })

    const subtotal = items.reduce(
      (sum: number, item: { unitPrice: number; quantity: number }) =>
        sum + item.unitPrice * item.quantity,
      0
    )
    const total = subtotal

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        clubId: club.id,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        customerAddress: address,
        notes,
        subtotal,
        total,
        items: {
          create: items.map((item: {
            productId: string
            productName: string
            variant?: string
            quantity: number
            unitPrice: number
            customName?: string
            customNumber?: string
          }) => ({
            productId: item.productId,
            productName: item.productName,
            variant: item.variant,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            customName: item.customName,
            customNumber: item.customNumber,
          })),
        },
      },
      include: { items: true },
    })

    return NextResponse.json({ order, success: true }, { status: 201 })
  } catch (error) {
    console.error('Order error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
