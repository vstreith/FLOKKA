import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'
import { generateSlug, generateCode } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const payload = getAuthUser(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const clubs = await prisma.club.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { orders: true, products: true } },
    },
  })

  return NextResponse.json({ clubs })
}

export async function POST(req: NextRequest) {
  const payload = getAuthUser(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const data = await req.json()
    const { name, description, logo, primaryColor, type, email, phone, address, margin } = data

    if (!name) return NextResponse.json({ error: 'Nom requis' }, { status: 400 })

    let slug = generateSlug(name)
    let code = generateCode()

    // Ensure unique slug and code
    const existingSlug = await prisma.club.findUnique({ where: { slug } })
    if (existingSlug) slug = `${slug}-${Date.now()}`

    const existingCode = await prisma.club.findUnique({ where: { code } })
    if (existingCode) code = generateCode() + generateCode().slice(0, 2)

    const club = await prisma.club.create({
      data: {
        name,
        slug,
        code,
        description,
        logo,
        primaryColor: primaryColor || '#000000',
        type: type || 'club',
        email,
        phone,
        address,
        margin: margin || 0,
      },
    })

    return NextResponse.json({ club }, { status: 201 })
  } catch (error) {
    console.error('Create club error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
