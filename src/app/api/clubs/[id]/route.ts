import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const payload = getAuthUser(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const club = await prisma.club.findUnique({
    where: { id: params.id },
    include: {
      products: {
        include: { product: { include: { category: true, variants: true } } },
      },
      orders: {
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { items: true },
      },
      _count: { select: { orders: true, products: true } },
    },
  })

  if (!club) return NextResponse.json({ error: 'Club non trouvé' }, { status: 404 })

  return NextResponse.json({ club })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const payload = getAuthUser(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const data = await req.json()
    const { name, description, logo, primaryColor, type, email, phone, address, margin, isActive } = data

    const club = await prisma.club.update({
      where: { id: params.id },
      data: {
        name,
        description,
        logo,
        primaryColor,
        type,
        email,
        phone,
        address,
        margin,
        isActive,
      },
    })

    return NextResponse.json({ club })
  } catch (error) {
    console.error('Update club error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const payload = getAuthUser(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  await prisma.club.delete({ where: { id: params.id } })

  return NextResponse.json({ success: true })
}
