import type { Metadata } from 'next'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { PageHero, FaqSection, CTASection, RelatedLinks } from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/JsonLd'
import { pageMetadata, webPageSchema } from '@/lib/seo'

const PATH = '/faq'

export const metadata: Metadata = pageMetadata({
  title: 'FAQ — Boutiques textiles privées pour clubs et associations',
  description:
    "Toutes les réponses sur les boutiques textiles privées FLOKKA : réassort à l'unité, absence de stock, marge reversée, personnalisation, livraison et fabrication en Alsace.",
  path: PATH,
  keywords: ['FAQ FLOKKA', 'boutique textile club questions', "réassort à l'unité", 'boutique association'],
})

const faq = [
  {
    question: "Qu'est-ce qu'une boutique textile privée ?",
    answer:
      "C'est une boutique en ligne réservée à votre club ou association, accessible via un code. Elle regroupe vos produits personnalisés ; chaque membre y commande directement sans que la structure n'avance d'argent ni ne gère de stock.",
  },
  {
    question: "Qu'est-ce que le réassort à l'unité ?",
    answer:
      "C'est la possibilité de commander une seule pièce à la fois, à tout moment, sans minimum. Chaque article est fabriqué au moment de la commande.",
  },
  {
    question: 'Faut-il gérer un stock ?',
    answer:
      "Non. Aucun stock, aucun invendu : tout est produit à la demande puis expédié directement au membre.",
  },
  {
    question: 'Faut-il avancer de la trésorerie ?',
    answer:
      "Non. La création de la boutique est sans engagement et les membres paient leurs propres commandes. La structure n'avance rien.",
  },
  {
    question: 'Comment fonctionne la marge reversée ?',
    answer:
      "Vous définissez un pourcentage de marge ajouté au prix de fabrication. Il est intégré automatiquement au prix affiché et vous est reversé sur chaque vente.",
  },
  {
    question: 'Peut-on personnaliser avec un nom et un numéro ?',
    answer:
      'Oui, la personnalisation nom et numéro est disponible sur les produits concernés, au moment de la commande, pour chaque membre.',
  },
  {
    question: 'Quels types de textiles proposez-vous ?',
    answer:
      'Maillots, t-shirts, sweats, polos, vestes, ainsi que divers accessoires (sacs, casquettes…), selon votre sélection.',
  },
  {
    question: 'Où sont fabriqués les produits ?',
    answer:
      "Dans notre atelier d'Andlau, dans le Bas-Rhin (Alsace). Le flocage, l'impression et la broderie y sont réalisés localement.",
  },
  {
    question: 'Livrez-vous partout en France ?',
    answer:
      'Oui. Les commandes sont expédiées partout en France, directement au domicile de chaque membre.',
  },
  {
    question: 'Combien de temps pour recevoir une commande ?',
    answer:
      "Les articles étant produits à la demande, comptez un délai de fabrication de quelques jours ouvrés avant l'expédition.",
  },
  {
    question: 'Comment se passe le paiement ?',
    answer:
      "Le paiement se fait directement auprès de votre club ou association selon les modalités qu'il définit. Il n'y a pas de flux financier via le site.",
  },
  {
    question: 'Comment créer la boutique de ma structure ?',
    answer:
      "Contactez-nous : nous créons votre boutique à vos couleurs, avec un code d'accès, et vous n'avez plus qu'à la diffuser à vos membres.",
  },
]

export default function FaqPage() {
  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'FAQ', path: PATH },
  ]
  return (
    <MarketingLayout>
      <JsonLd
        data={webPageSchema({
          title: 'FAQ | FLOKKA',
          description: 'Questions fréquentes sur les boutiques textiles privées FLOKKA.',
          path: PATH,
        })}
      />
      <PageHero
        eyebrow="FAQ"
        title="Questions fréquentes"
        breadcrumbs={crumbs}
        intro="Tout ce que vous devez savoir sur les boutiques textiles privées, le réassort à l'unité et notre fonctionnement."
      />
      <FaqSection items={faq} title="Vos questions, nos réponses" />
      <RelatedLinks
        links={[
          { title: 'Solutions clubs sportifs', description: 'La boutique textile pour les clubs.', href: '/clubs-sportifs' },
          { title: 'Solutions associations', description: 'La boutique textile pour les associations.', href: '/associations' },
          { title: 'Notre blog', description: 'Guides et conseils sur le textile personnalisé.', href: '/blog' },
        ]}
      />
      <CTASection
        title="Une autre question ?"
        text="Écrivez-nous, nous répondons vite et simplement."
        primary={{ label: 'Nous contacter', href: '/contact' }}
      />
    </MarketingLayout>
  )
}
