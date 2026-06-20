import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { code } = await req.json()

  if (!code) return NextResponse.json({ error: 'Code requis' }, { status: 400 })

  const club = await prisma.club.findFirst({
    where: { code: code.trim().toUpperCase(), isActive: true },
  })

  if (!club) {
    return NextResponse.json({ error: 'Code invalide ou boutique inactive' }, { status: 404 })
  }

  return NextResponse.json({
    slug: club.slug,
    name: club.name,
    description: club.description,
    logo: club.logo,
    primaryColor: club.primaryColor,
    margin: club.margin,
  })
}
