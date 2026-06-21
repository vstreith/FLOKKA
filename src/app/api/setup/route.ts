import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { key } = await req.json()
    const expectedKey = process.env.SETUP_KEY

    if (!expectedKey) {
      return NextResponse.json({ error: 'SETUP_KEY manquant dans les variables Vercel' }, { status: 500 })
    }
    if (key !== expectedKey) {
      return NextResponse.json({ error: 'Clé incorrecte' }, { status: 403 })
    }

    // Step 1 — Create tables (idempotent, safe to run multiple times)
    const statements = [
      `CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL, "email" TEXT NOT NULL, "password" TEXT NOT NULL,
        "name" TEXT NOT NULL, "role" TEXT NOT NULL DEFAULT 'admin',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "User_pkey" PRIMARY KEY ("id"))`,
      `CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")`,

      `CREATE TABLE IF NOT EXISTS "Club" (
        "id" TEXT NOT NULL, "name" TEXT NOT NULL, "slug" TEXT NOT NULL,
        "code" TEXT NOT NULL, "description" TEXT, "logo" TEXT,
        "primaryColor" TEXT NOT NULL DEFAULT '#000000', "type" TEXT NOT NULL DEFAULT 'club',
        "email" TEXT, "phone" TEXT, "address" TEXT,
        "isActive" BOOLEAN NOT NULL DEFAULT true, "margin" DOUBLE PRECISION NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Club_pkey" PRIMARY KEY ("id"))`,
      `CREATE UNIQUE INDEX IF NOT EXISTS "Club_slug_key" ON "Club"("slug")`,
      `CREATE UNIQUE INDEX IF NOT EXISTS "Club_code_key" ON "Club"("code")`,

      `CREATE TABLE IF NOT EXISTS "Category" (
        "id" TEXT NOT NULL, "name" TEXT NOT NULL, "slug" TEXT NOT NULL, "icon" TEXT,
        CONSTRAINT "Category_pkey" PRIMARY KEY ("id"))`,
      `CREATE UNIQUE INDEX IF NOT EXISTS "Category_slug_key" ON "Category"("slug")`,

      `CREATE TABLE IF NOT EXISTS "Product" (
        "id" TEXT NOT NULL, "name" TEXT NOT NULL, "description" TEXT,
        "basePrice" DOUBLE PRECISION NOT NULL, "images" TEXT NOT NULL DEFAULT '[]',
        "categoryId" TEXT NOT NULL, "isCustomizable" BOOLEAN NOT NULL DEFAULT true,
        "hasNameNumber" BOOLEAN NOT NULL DEFAULT false, "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Product_pkey" PRIMARY KEY ("id"))`,

      `CREATE TABLE IF NOT EXISTS "ProductVariant" (
        "id" TEXT NOT NULL, "productId" TEXT NOT NULL,
        "name" TEXT NOT NULL, "type" TEXT NOT NULL DEFAULT 'size',
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id"))`,

      `CREATE TABLE IF NOT EXISTS "ClubProduct" (
        "id" TEXT NOT NULL, "clubId" TEXT NOT NULL, "productId" TEXT NOT NULL,
        "customPrice" DOUBLE PRECISION, "isActive" BOOLEAN NOT NULL DEFAULT true,
        CONSTRAINT "ClubProduct_pkey" PRIMARY KEY ("id"))`,
      `CREATE UNIQUE INDEX IF NOT EXISTS "ClubProduct_clubId_productId_key" ON "ClubProduct"("clubId", "productId")`,

      `CREATE TABLE IF NOT EXISTS "Order" (
        "id" TEXT NOT NULL, "orderNumber" TEXT NOT NULL, "clubId" TEXT NOT NULL,
        "customerName" TEXT NOT NULL, "customerEmail" TEXT NOT NULL,
        "customerPhone" TEXT, "customerAddress" TEXT, "notes" TEXT,
        "subtotal" DOUBLE PRECISION NOT NULL, "total" DOUBLE PRECISION NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'pending', "paymentStatus" TEXT NOT NULL DEFAULT 'unpaid',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Order_pkey" PRIMARY KEY ("id"))`,
      `CREATE UNIQUE INDEX IF NOT EXISTS "Order_orderNumber_key" ON "Order"("orderNumber")`,

      `CREATE TABLE IF NOT EXISTS "OrderItem" (
        "id" TEXT NOT NULL, "orderId" TEXT NOT NULL, "productId" TEXT NOT NULL,
        "productName" TEXT NOT NULL, "variant" TEXT, "quantity" INTEGER NOT NULL,
        "unitPrice" DOUBLE PRECISION NOT NULL, "customName" TEXT, "customNumber" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id"))`,

      `CREATE TABLE IF NOT EXISTS "ContactRequest" (
        "id" TEXT NOT NULL, "name" TEXT NOT NULL, "structure" TEXT,
        "email" TEXT NOT NULL, "message" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'new',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "ContactRequest_pkey" PRIMARY KEY ("id"))`,

      // Foreign keys (IF NOT EXISTS via DO block)
      `DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Product_categoryId_fkey') THEN
          ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey"
            FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
        END IF;
      END $$`,
      `DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ProductVariant_productId_fkey') THEN
          ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey"
            FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        END IF;
      END $$`,
      `DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ClubProduct_clubId_fkey') THEN
          ALTER TABLE "ClubProduct" ADD CONSTRAINT "ClubProduct_clubId_fkey"
            FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        END IF;
      END $$`,
      `DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ClubProduct_productId_fkey') THEN
          ALTER TABLE "ClubProduct" ADD CONSTRAINT "ClubProduct_productId_fkey"
            FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        END IF;
      END $$`,
      `DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Order_clubId_fkey') THEN
          ALTER TABLE "Order" ADD CONSTRAINT "Order_clubId_fkey"
            FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
        END IF;
      END $$`,
      `DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'OrderItem_orderId_fkey') THEN
          ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey"
            FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        END IF;
      END $$`,
      `DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'OrderItem_productId_fkey') THEN
          ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey"
            FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
        END IF;
      END $$`,
    ]

    for (const sql of statements) {
      await prisma.$executeRawUnsafe(sql)
    }

    // Step 2 — Check if already seeded
    const existingAdmin = await prisma.user.findFirst()
    if (existingAdmin) {
      return NextResponse.json({ message: 'Déjà initialisé', alreadyDone: true })
    }

    // Step 3 — Seed admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)
    await prisma.user.create({
      data: { email: 'admin@flokka.fr', password: hashedPassword, name: 'Admin FLOKKA', role: 'admin' },
    })

    // Step 4 — Seed categories
    const cats = await Promise.all([
      prisma.category.create({ data: { name: 'T-shirts', slug: 't-shirts' } }),
      prisma.category.create({ data: { name: 'Sweats', slug: 'sweats' } }),
      prisma.category.create({ data: { name: 'Polos', slug: 'polos' } }),
      prisma.category.create({ data: { name: 'Maillots', slug: 'maillots' } }),
      prisma.category.create({ data: { name: 'Accessoires', slug: 'accessoires' } }),
    ])
    const [tshirts, sweats, polos, maillots, accessoires] = cats

    // Step 5 — Seed products
    const mkVariants = (sizes: string[]) => ({ create: sizes.map((s) => ({ name: s, type: 'size' })) })
    const tshirt = await prisma.product.create({ data: { name: 'T-shirt personnalisé', description: 'T-shirt coton 100%, flocage haute qualité.', basePrice: 22, images: '[]', categoryId: tshirts.id, isCustomizable: true, hasNameNumber: false, variants: mkVariants(['XS','S','M','L','XL','XXL']) } })
    const sweat  = await prisma.product.create({ data: { name: 'Sweat capuche', description: 'Sweat à capuche molleton 280g/m².', basePrice: 38, images: '[]', categoryId: sweats.id, isCustomizable: true, hasNameNumber: false, variants: mkVariants(['S','M','L','XL','XXL']) } })
    const polo   = await prisma.product.create({ data: { name: 'Polo technique', description: 'Polo respirant, idéal pour les événements.', basePrice: 32, images: '[]', categoryId: polos.id, isCustomizable: true, hasNameNumber: false, variants: mkVariants(['S','M','L','XL']) } })
    const mail   = await prisma.product.create({ data: { name: 'Maillot sport personnalisé', description: 'Maillot avec numéro et nom du joueur.', basePrice: 28, images: '[]', categoryId: maillots.id, isCustomizable: true, hasNameNumber: true, variants: mkVariants(['S','M','L','XL','XXL']) } })
    await prisma.product.create({ data: { name: 'Sac de sport', description: 'Sac 30L avec logo club.', basePrice: 45, images: '[]', categoryId: accessoires.id, isCustomizable: true, hasNameNumber: false, variants: { create: [] } } })

    // Step 6 — Seed clubs
    const barr = await prisma.club.create({ data: { name: 'Badminton Club de Barr', slug: 'badminton-club-barr', code: 'BCB2024', description: 'Club de badminton de Barr.', primaryColor: '#2563EB', type: 'club', margin: 5 } })
    const fc   = await prisma.club.create({ data: { name: 'FC Andlau', slug: 'fc-andlau', code: 'FCA2024', description: "Football Club d'Andlau.", primaryColor: '#16A34A', type: 'club', margin: 0 } })

    // Assign products to clubs
    for (const productId of [tshirt.id, sweat.id]) {
      await prisma.clubProduct.create({ data: { clubId: barr.id, productId } })
    }
    for (const productId of [mail.id, sweat.id, tshirt.id]) {
      await prisma.clubProduct.create({ data: { clubId: fc.id, productId } })
    }

    return NextResponse.json({
      success: true,
      message: 'Base de données initialisée',
      admin: { email: 'admin@flokka.fr', password: 'admin123' },
      clubs: [
        { name: 'Badminton Club de Barr', code: 'BCB2024' },
        { name: 'FC Andlau', code: 'FCA2024' },
      ],
    })
  } catch (error) {
    console.error('Setup error:', error)
    const msg = error instanceof Error ? error.message : 'Erreur inconnue'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
