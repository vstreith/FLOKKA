import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const payload = getAuthUser(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const contacts = await prisma.contactRequest.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ contacts })
}

export async function POST(req: NextRequest) {
  try {
    const { name, structure, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    const contact = await prisma.contactRequest.create({
      data: { name, structure, email, message },
    })

    return NextResponse.json({ contact, success: true }, { status: 201 })
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const payload = getAuthUser(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id, status } = await req.json()
  const contact = await prisma.contactRequest.update({ where: { id }, data: { status } })
  return NextResponse.json({ contact })
}
