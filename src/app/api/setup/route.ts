import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

// One-time database initialization endpoint.
// Call POST /api/setup with { "key": "YOUR_SETUP_KEY" } after first deployment.
export async function POST(req: NextRequest) {
  try {
    const { key } = await req.json()
    const expectedKey = process.env.SETUP_KEY

    if (!expectedKey) {
      return NextResponse.json(
        { error: 'SETUP_KEY non configuré dans les variables d\'environnement' },
        { status: 500 }
      )
    }

    if (key !== expectedKey) {
      return NextResponse.json({ error: 'Clé incorrecte' }, { status: 403 })
    }

    // Check if already initialized
    const existingAdmin = await prisma.user.findFirst()
    if (existingAdmin) {
      return NextResponse.json({
        message: 'Base de données déjà initialisée',
        alreadyDone: true,
      })
    }

    // === CREATE ADMIN USER ===
    const hashedPassword = await bcrypt.hash('admin123', 12)
    await prisma.user.create({
      data: {
        email: 'admin@flokka.fr',
        password: hashedPassword,
        name: 'Admin FLOKKA',
        role: 'admin',
      },
    })

    // === CREATE CATEGORIES ===
    const categories = await Promise.all([
      prisma.category.create({ data: { name: 'T-shirts', slug: 't-shirts', icon: '👕' } }),
      prisma.category.create({ data: { name: 'Sweats', slug: 'sweats', icon: '🧥' } }),
      prisma.category.create({ data: { name: 'Polos', slug: 'polos', icon: '👔' } }),
      prisma.category.create({ data: { name: 'Maillots', slug: 'maillots', icon: '⚽' } }),
      prisma.category.create({ data: { name: 'Accessoires', slug: 'accessoires', icon: '🎒' } }),
    ])
    const [tshirts, sweats, polos, maillots, accessoires] = categories

    // === CREATE PRODUCTS ===
    const tshirt = await prisma.product.create({
      data: {
        name: 'T-shirt personnalisé',
        description: 'T-shirt en coton 100% avec flocage haute qualité.',
        basePrice: 22.0,
        images: JSON.stringify([]),
        categoryId: tshirts.id,
        isCustomizable: true,
        hasNameNumber: false,
        variants: {
          create: ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => ({ name: s, type: 'size' })),
        },
      },
    })

    const sweat = await prisma.product.create({
      data: {
        name: 'Sweat capuche personnalisé',
        description: 'Sweat à capuche en molleton 280g/m².',
        basePrice: 38.0,
        images: JSON.stringify([]),
        categoryId: sweats.id,
        isCustomizable: true,
        hasNameNumber: false,
        variants: {
          create: ['S', 'M', 'L', 'XL', 'XXL'].map((s) => ({ name: s, type: 'size' })),
        },
      },
    })

    const polo = await prisma.product.create({
      data: {
        name: 'Polo technique',
        description: 'Polo technique respirant.',
        basePrice: 32.0,
        images: JSON.stringify([]),
        categoryId: polos.id,
        isCustomizable: true,
        hasNameNumber: false,
        variants: {
          create: ['S', 'M', 'L', 'XL'].map((s) => ({ name: s, type: 'size' })),
        },
      },
    })

    const maillot = await prisma.product.create({
      data: {
        name: 'Maillot sport personnalisé',
        description: 'Maillot technique avec numéro et nom du joueur.',
        basePrice: 28.0,
        images: JSON.stringify([]),
        categoryId: maillots.id,
        isCustomizable: true,
        hasNameNumber: true,
        variants: {
          create: ['S', 'M', 'L', 'XL', 'XXL'].map((s) => ({ name: s, type: 'size' })),
        },
      },
    })

    await prisma.product.create({
      data: {
        name: 'Sac de sport',
        description: 'Sac de sport 30L avec logo club.',
        basePrice: 45.0,
        images: JSON.stringify([]),
        categoryId: accessoires.id,
        isCustomizable: true,
        hasNameNumber: false,
        variants: { create: [] },
      },
    })

    // === CREATE SAMPLE CLUBS ===
    const barr = await prisma.club.create({
      data: {
        name: 'Badminton Club de Barr',
        slug: 'badminton-club-barr',
        code: 'BCB2024',
        description: 'Club de badminton de Barr et ses alentours.',
        primaryColor: '#2563EB',
        type: 'club',
        margin: 5,
        isActive: true,
      },
    })

    const andlau = await prisma.club.create({
      data: {
        name: 'FC Andlau',
        slug: 'fc-andlau',
        code: 'FCA2024',
        description: "Football Club d'Andlau.",
        primaryColor: '#16A34A',
        type: 'club',
        margin: 0,
        isActive: true,
      },
    })

    // Assign products to clubs
    for (const productId of [tshirt.id, sweat.id]) {
      await prisma.clubProduct.create({ data: { clubId: barr.id, productId } })
    }
    for (const productId of [maillot.id, sweat.id, tshirt.id]) {
      await prisma.clubProduct.create({ data: { clubId: andlau.id, productId } })
    }

    return NextResponse.json({
      success: true,
      message: 'Base de données initialisée avec succès',
      credentials: {
        email: 'admin@flokka.fr',
        password: 'admin123',
        note: 'Changez le mot de passe dans le back-office après connexion',
      },
      clubs: [
        { name: 'Badminton Club de Barr', code: 'BCB2024' },
        { name: 'FC Andlau', code: 'FCA2024' },
      ],
    })
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({ error: 'Erreur lors de l\'initialisation' }, { status: 500 })
  }
}
