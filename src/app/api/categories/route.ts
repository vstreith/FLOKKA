import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' },
  })
  return NextResponse.json({ categories })
}

export async function POST(req: NextRequest) {
  const payload = getAuthUser(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { name, icon } = await req.json()
  if (!name) return NextResponse.json({ error: 'Nom requis' }, { status: 400 })

  const slug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')

  const category = await prisma.category.create({ data: { name, slug, icon } })
  return NextResponse.json({ category }, { status: 201 })
}
