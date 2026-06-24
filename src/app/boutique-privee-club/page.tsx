import type { Metadata } from 'next'
import { Lock, Store, Repeat, PiggyBank, Palette, Truck } from 'lucide-react'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import {
  PageHero,
  Section,
  Prose,
  FeatureGrid,
  StepList,
  FaqSection,
  CTASection,
  RelatedLinks,
} from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/JsonLd'
import { pageMetadata, webPageSchema } from '@/lib/seo'

const PATH = '/boutique-privee-club'

export const metadata: Metadata = pageMetadata({
  title: 'Boutique privée pour club : comment ça marche',
  description:
    "Découvrez le fonctionnement d'une boutique privée pour club : boutique en ligne à vos couleurs, code d'accès, réassort à l'unité, marge reversée et livraison directe. Sans stock.",
  path: PATH,
  keywords: [
    'boutique privée club',
    'boutique privée club sportif',
    'boutique en ligne club',
    "boutique textile club code d'accès",
  ],
})

const faq = [
  {
    question: "Qu'est-ce qu'une boutique privée pour club ?",
    answer:
      "C'est une boutique en ligne réservée aux membres d'un club, accessible via un code d'accès. Elle regroupe les produits textiles personnalisés aux couleurs du club, que chaque membre commande individuellement.",
  },
  {
    question: "Comment obtenir le code d'accès de la boutique ?",
    answer:
      "Le code est fourni par le club ou l'association à ses membres. FLOKKA le génère lors de la création de la boutique, et la structure le diffuse à qui elle souhaite.",
  },
  {
    question: 'La boutique privée a-t-elle un coût pour le club ?',
    answer:
      "La création de la boutique se fait sans engagement. Le club n'avance aucune trésorerie : ce sont les membres qui paient leurs commandes individuelles.",
  },
]

export default function BoutiquePriveeClubPage() {
  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'Boutique privée club', path: PATH },
  ]
  return (
    <MarketingLayout>
      <JsonLd
        data={webPageSchema({
          title: 'Boutique privée pour club : comment ça marche | FLOKKA',
          description:
            "Le fonctionnement d'une boutique privée pour club : code d'accès, réassort à l'unité, marge reversée.",
          path: PATH,
        })}
      />
      <PageHero
        eyebrow="Boutique privée"
        title="La boutique privée pour club, expliquée simplement"
        breadcrumbs={crumbs}
        intro={
          <>
            Une <strong>boutique en ligne dédiée</strong> à votre structure, protégée par un{' '}
            <strong>code d&apos;accès</strong>, où chaque membre commande son textile personnalisé en
            réassort à l&apos;unité. Voici comment elle fonctionne.
          </>
        }
        primary={{ label: 'Créer ma boutique privée', href: '/contact' }}
        secondary={{ label: 'Accéder à une boutique', href: '/boutique-privee' }}
      />

      <Section eyebrow="Définition" title="Qu'est-ce qu'une boutique privée ?">
        <Prose>
          <p>
            Une <strong>boutique privée club</strong> est un espace de vente en ligne réservé aux
            membres d&apos;une structure. Contrairement à une boutique publique, elle est accessible
            via un <strong>code d&apos;accès</strong> que le club distribue à ses licenciés, ses
            bénévoles ou ses adhérents.
          </p>
          <p>
            Elle regroupe une sélection de produits — maillots, sweats, polos, accessoires — déjà
            personnalisés aux <strong>couleurs du club</strong>. Chaque membre n&apos;a plus
            qu&apos;à choisir, indiquer sa taille et, si besoin, son nom et son numéro.
          </p>
        </Prose>
      </Section>

      <Section eyebrow="Les caractéristiques" title="Ce qui définit une boutique privée FLOKKA" tone="tint">
        <FeatureGrid
          items={[
            { icon: Lock, title: "Code d'accès", description: 'Réservée aux membres de la structure.' },
            { icon: Palette, title: 'À vos couleurs', description: 'Logo, couleurs et produits personnalisés.' },
            { icon: Repeat, title: "Réassort à l'unité", description: 'Une pièce, à tout moment, sans minimum.' },
            { icon: PiggyBank, title: 'Marge reversée', description: 'Un financement possible pour la structure.' },
            { icon: Store, title: 'Toujours ouverte', description: 'Accessible toute la saison, 24h/24.' },
            { icon: Truck, title: 'Livraison directe', description: 'Chaque commande expédiée au membre.' },
          ]}
        />
      </Section>

      <Section eyebrow="Le parcours" title="De la création à la livraison">
        <StepList
          steps={[
            { title: 'Création', description: "FLOKKA met en place la boutique et génère le code d'accès." },
            { title: 'Diffusion', description: 'Le club partage le code avec ses membres.' },
            { title: 'Commande & livraison', description: "Chaque membre commande ; on produit à l'unité et on livre." },
          ]}
        />
      </Section>

      <FaqSection items={faq} />

      <RelatedLinks
        links={[
          { title: 'Solution pour clubs sportifs', description: 'La boutique privée appliquée aux clubs de sport.', href: '/clubs-sportifs' },
          { title: 'Solution pour associations', description: 'La boutique privée appliquée aux associations.', href: '/associations' },
          { title: 'Guide complet de la boutique club', description: 'Le guide détaillé sur notre blog.', href: '/blog/boutique-club-sportif-guide-complet' },
        ]}
      />

      <CTASection
        title="Lancez la boutique privée de votre structure"
        text="Mise en place rapide, à vos couleurs, sans engagement."
        primary={{ label: 'Démarrer maintenant', href: '/contact' }}
      />
    </MarketingLayout>
  )
}
