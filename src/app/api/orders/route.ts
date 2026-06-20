import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const payload = getAuthUser(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const clubId = searchParams.get('clubId')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')

  const where: { status?: string; clubId?: string } = {}
  if (status) where.status = status
  if (clubId) where.clubId = clubId

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        club: { select: { id: true, name: true, slug: true, primaryColor: true } },
        items: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.order.count({ where }),
  ])

  return NextResponse.json({ orders, total, page, limit })
}
