import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@flokka.fr' },
    update: {},
    create: {
      email: 'admin@flokka.fr',
      password: hashedPassword,
      name: 'Admin FLOKKA',
      role: 'admin',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: 't-shirts' }, update: {}, create: { name: 'T-shirts', slug: 't-shirts', icon: '👕' } }),
    prisma.category.upsert({ where: { slug: 'sweats' }, update: {}, create: { name: 'Sweats', slug: 'sweats', icon: '🧥' } }),
    prisma.category.upsert({ where: { slug: 'polos' }, update: {}, create: { name: 'Polos', slug: 'polos', icon: '👔' } }),
    prisma.category.upsert({ where: { slug: 'maillots' }, update: {}, create: { name: 'Maillots', slug: 'maillots', icon: '⚽' } }),
    prisma.category.upsert({ where: { slug: 'accessoires' }, update: {}, create: { name: 'Accessoires', slug: 'accessoires', icon: '🎒' } }),
  ])
  console.log('✅ Categories created:', categories.length)

  const [tshirts, sweats, polos, maillots, accessoires] = categories

  // Products
  const tshirt = await prisma.product.upsert({
    where: { id: 'prod-tshirt-1' },
    update: {},
    create: {
      id: 'prod-tshirt-1',
      name: 'T-shirt personnalisé',
      description: 'T-shirt en coton 100% avec flocage haute qualité. Disponible en plusieurs tailles.',
      basePrice: 22.0,
      images: JSON.stringify(['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format']),
      categoryId: tshirts.id,
      isCustomizable: true,
      hasNameNumber: false,
      variants: {
        create: [
          { name: 'XS', type: 'size' },
          { name: 'S', type: 'size' },
          { name: 'M', type: 'size' },
          { name: 'L', type: 'size' },
          { name: 'XL', type: 'size' },
          { name: 'XXL', type: 'size' },
        ],
      },
    },
  })

  const sweat = await prisma.product.upsert({
    where: { id: 'prod-sweat-1' },
    update: {},
    create: {
      id: 'prod-sweat-1',
      name: 'Sweat capuche personnalisé',
      description: 'Sweat à capuche en molleton 280g/m². Logo club imprimé ou floqué.',
      basePrice: 38.0,
      images: JSON.stringify(['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&auto=format']),
      categoryId: sweats.id,
      isCustomizable: true,
      hasNameNumber: false,
      variants: {
        create: [
          { name: 'S', type: 'size' },
          { name: 'M', type: 'size' },
          { name: 'L', type: 'size' },
          { name: 'XL', type: 'size' },
          { name: 'XXL', type: 'size' },
        ],
      },
    },
  })

  const polo = await prisma.product.upsert({
    where: { id: 'prod-polo-1' },
    update: {},
    create: {
      id: 'prod-polo-1',
      name: 'Polo technique',
      description: 'Polo technique respirant, idéal pour les activités sportives et les événements.',
      basePrice: 32.0,
      images: JSON.stringify([]),
      categoryId: polos.id,
      isCustomizable: true,
      hasNameNumber: false,
      variants: {
        create: [
          { name: 'S', type: 'size' },
          { name: 'M', type: 'size' },
          { name: 'L', type: 'size' },
          { name: 'XL', type: 'size' },
        ],
      },
    },
  })

  const maillot = await prisma.product.upsert({
    where: { id: 'prod-maillot-1' },
    update: {},
    create: {
      id: 'prod-maillot-1',
      name: 'Maillot sport personnalisé',
      description: 'Maillot technique avec numéro et nom du joueur. Tissu respirant haute performance.',
      basePrice: 28.0,
      images: JSON.stringify([]),
      categoryId: maillots.id,
      isCustomizable: true,
      hasNameNumber: true,
      variants: {
        create: [
          { name: 'S', type: 'size' },
          { name: 'M', type: 'size' },
          { name: 'L', type: 'size' },
          { name: 'XL', type: 'size' },
          { name: 'XXL', type: 'size' },
        ],
      },
    },
  })

  const sac = await prisma.product.upsert({
    where: { id: 'prod-sac-1' },
    update: {},
    create: {
      id: 'prod-sac-1',
      name: 'Sac de sport',
      description: 'Sac de sport 30L avec logo club. Compartiment chaussures.',
      basePrice: 45.0,
      images: JSON.stringify([]),
      categoryId: accessoires.id,
      isCustomizable: true,
      hasNameNumber: false,
      variants: { create: [] },
    },
  })

  console.log('✅ Products created:', [tshirt, sweat, polo, maillot, sac].length)

  // Clubs
  const barr = await prisma.club.upsert({
    where: { slug: 'badminton-club-barr' },
    update: {},
    create: {
      name: 'Badminton Club de Barr',
      slug: 'badminton-club-barr',
      code: 'BCB2024',
      description: 'Club de badminton de Barr et ses alentours.',
      primaryColor: '#2563EB',
      type: 'club',
      email: 'contact@bcbarr.fr',
      margin: 5,
      isActive: true,
    },
  })

  const andlau = await prisma.club.upsert({
    where: { slug: 'fc-andlau' },
    update: {},
    create: {
      name: 'FC Andlau',
      slug: 'fc-andlau',
      code: 'FCA2024',
      description: 'Football Club d\'Andlau.',
      primaryColor: '#16A34A',
      type: 'club',
      email: 'contact@fcandlau.fr',
      margin: 0,
      isActive: true,
    },
  })

  const vignes = await prisma.club.upsert({
    where: { slug: 'association-les-vignes' },
    update: {},
    create: {
      name: 'Association Les Vignes',
      slug: 'association-les-vignes',
      code: 'VIGNES',
      description: 'Association culturelle et festive d\'Andlau.',
      primaryColor: '#7C3AED',
      type: 'association',
      margin: 10,
      isActive: true,
    },
  })

  const obernai = await prisma.club.upsert({
    where: { slug: 'handball-obernai' },
    update: {},
    create: {
      name: 'Handball Obernai',
      slug: 'handball-obernai',
      code: 'HBOB67',
      description: 'Club de handball d\'Obernai.',
      primaryColor: '#DC2626',
      type: 'club',
      margin: 5,
      isActive: true,
    },
  })

  const comite = await prisma.club.upsert({
    where: { slug: 'comite-fetes-andlau' },
    update: {},
    create: {
      name: 'Comité des Fêtes d\'Andlau',
      slug: 'comite-fetes-andlau',
      code: 'FETES1',
      description: 'Organisation des fêtes locales d\'Andlau.',
      primaryColor: '#D97706',
      type: 'evenement',
      margin: 0,
      isActive: true,
    },
  })

  const menuiserie = await prisma.club.upsert({
    where: { slug: 'menuiserie-schmitt' },
    update: {},
    create: {
      name: 'Menuiserie Schmitt',
      slug: 'menuiserie-schmitt',
      code: 'SCHMT1',
      description: 'Tenues professionnelles Menuiserie Schmitt.',
      primaryColor: '#374151',
      type: 'entreprise',
      margin: 0,
      isActive: true,
    },
  })

  console.log('✅ Clubs created:', [barr, andlau, vignes, obernai, comite, menuiserie].length)

  // Assign products to clubs
  const assignments = [
    { clubId: barr.id, productId: tshirt.id },
    { clubId: barr.id, productId: sweat.id },
    { clubId: barr.id, productId: sac.id },
    { clubId: andlau.id, productId: maillot.id },
    { clubId: andlau.id, productId: sweat.id },
    { clubId: andlau.id, productId: tshirt.id },
    { clubId: vignes.id, productId: tshirt.id },
    { clubId: vignes.id, productId: polo.id },
    { clubId: obernai.id, productId: maillot.id },
    { clubId: obernai.id, productId: sweat.id },
    { clubId: comite.id, productId: tshirt.id },
    { clubId: comite.id, productId: polo.id },
    { clubId: menuiserie.id, productId: polo.id },
    { clubId: menuiserie.id, productId: sweat.id },
  ]

  for (const a of assignments) {
    await prisma.clubProduct.upsert({
      where: { clubId_productId: { clubId: a.clubId, productId: a.productId } },
      update: {},
      create: { clubId: a.clubId, productId: a.productId },
    })
  }
  console.log('✅ Club products assigned:', assignments.length)

  // Sample orders
  const order1 = await prisma.order.upsert({
    where: { orderNumber: 'FLK-DEMO-001' },
    update: {},
    create: {
      orderNumber: 'FLK-DEMO-001',
      clubId: barr.id,
      customerName: 'Marie Dupont',
      customerEmail: 'marie.dupont@email.fr',
      customerPhone: '06 12 34 56 78',
      customerAddress: '5 rue des Fleurs, 67140 Barr',
      subtotal: 60.0,
      total: 60.0,
      status: 'in_production',
      paymentStatus: 'paid',
      items: {
        create: [
          { productId: tshirt.id, productName: 'T-shirt personnalisé', variant: 'M', quantity: 2, unitPrice: 22.0 },
          { productId: sweat.id, productName: 'Sweat capuche personnalisé', variant: 'L', quantity: 1, unitPrice: 38.0, customName: 'DUPONT' },
        ],
      },
    },
  })

  const order2 = await prisma.order.upsert({
    where: { orderNumber: 'FLK-DEMO-002' },
    update: {},
    create: {
      orderNumber: 'FLK-DEMO-002',
      clubId: andlau.id,
      customerName: 'Thomas Bernard',
      customerEmail: 'tbernard@email.fr',
      customerPhone: '06 98 76 54 32',
      subtotal: 56.0,
      total: 56.0,
      status: 'pending',
      paymentStatus: 'unpaid',
      items: {
        create: [
          { productId: maillot.id, productName: 'Maillot sport personnalisé', variant: 'XL', quantity: 2, unitPrice: 28.0, customName: 'BERNARD', customNumber: '9' },
        ],
      },
    },
  })

  console.log('✅ Sample orders created:', [order1, order2].length)

  // Sample contact request
  await prisma.contactRequest.upsert({
    where: { id: 'contact-demo-1' },
    update: {},
    create: {
      id: 'contact-demo-1',
      name: 'Philippe Martin',
      structure: 'Club de tennis de Sélestat',
      email: 'p.martin@email.fr',
      message: 'Bonjour, je souhaite créer une boutique privée pour notre club de tennis. Nous avons environ 80 membres. Pouvez-vous me contacter pour discuter du projet ?',
      status: 'new',
    },
  })

  console.log('✅ Sample contact created')
  console.log('\n🎉 Database seeded successfully!')
  console.log('\nLogin: admin@flokka.fr / admin123')
  console.log('\nClub codes:')
  console.log('  BCB2024 - Badminton Club de Barr')
  console.log('  FCA2024 - FC Andlau')
  console.log('  VIGNES  - Association Les Vignes')
  console.log('  HBOB67  - Handball Obernai')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
