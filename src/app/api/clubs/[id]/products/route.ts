import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const payload = getAuthUser(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { productId, customPrice } = await req.json()

  try {
    const clubProduct = await prisma.clubProduct.upsert({
      where: { clubId_productId: { clubId: params.id, productId } },
      update: { customPrice, isActive: true },
      create: { clubId: params.id, productId, customPrice },
    })
    return NextResponse.json({ clubProduct }, { status: 201 })
  } catch (error) {
    console.error('Assign product error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const payload = getAuthUser(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { productId } = await req.json()

  await prisma.clubProduct.deleteMany({
    where: { clubId: params.id, productId },
  })

  return NextResponse.json({ success: true })
}
