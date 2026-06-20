import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const payload = getAuthUser(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      club: true,
      items: { include: { product: { select: { id: true, name: true } } } },
    },
  })

  if (!order) return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 })

  return NextResponse.json({ order })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const payload = getAuthUser(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { status, paymentStatus, notes } = await req.json()

  const order = await prisma.order.update({
    where: { id: params.id },
    data: { status, paymentStatus, notes },
    include: { club: true, items: true },
  })

  return NextResponse.json({ order })
}
