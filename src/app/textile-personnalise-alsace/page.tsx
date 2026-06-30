import type { Metadata } from 'next'
import { Repeat, MapPin, Users, Palette, KeySquare, PackageOpen } from 'lucide-react'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import {
  PageHero,
  Section,
  Prose,
  FeatureGrid,
  FaqSection,
  CTASection,
  RelatedLinks,
} from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/JsonLd'
import { pageMetadata, webPageSchema } from '@/lib/seo'

const PATH = '/textile-personnalise-alsace'

export const metadata: Metadata = pageMetadata({
  title: 'Textile personnalisé en Alsace (Centre Alsace) — dès 1 pièce',
  description:
    "Textile personnalisé en Alsace : flocage, marquage et broderie sans minimum, dès une pièce. Atelier à Andlau, en Centre Alsace, avec réassort à la demande sans stock.",
  path: PATH,
  keywords: [
    'textile personnalisé Alsace',
    'personnalisation textile Alsace',
    'flocage Alsace',
    'broderie Alsace',
    'textile personnalisé Centre Alsace',
  ],
})

const faq = [
  {
    question: 'Où se trouve votre atelier en Alsace ?',
    answer:
      "À Andlau (67140), en Centre Alsace, entre Barr, Obernai, Sélestat et Erstein. C'est là que nous réalisons toute la personnalisation textile.",
  },
  {
    question: 'Faut-il commander en quantité ?',
    answer:
      "Non. Nous personnalisons dès une seule pièce, sans minimum de commande, pour les particuliers comme pour les structures.",
  },
  {
    question: "Qu'est-ce que le réassort à la demande ?",
    answer:
      "Un espace client dédié, accessible par code, qui vous permet de recommander vos produits personnalisés à l'unité, sans immobiliser de stock.",
  },
]

export default function TextileAlsacePage() {
  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'Textile personnalisé Alsace', path: PATH },
  ]
  return (
    <MarketingLayout>
      <JsonLd
        data={webPageSchema({
          title: 'Textile personnalisé en Alsace | FLOKKA',
          description:
            "Textile personnalisé en Alsace : flocage, marquage, broderie, sans minimum, avec réassort à la demande. Atelier en Centre Alsace.",
          path: PATH,
        })}
      />
      <PageHero
        eyebrow="Alsace"
        title="Textile personnalisé en Alsace"
        breadcrumbs={crumbs}
        intro={
          <>
            Flocage, marquage et broderie sur tous vos textiles, <strong>dès une pièce</strong> et
            sans minimum. Un atelier ancré en <strong>Centre Alsace</strong>, avec un{' '}
            <strong>réassort à la demande</strong> sans stock.
          </>
        }
        primary={{ label: 'Demander un devis', href: '/contact' }}
        secondary={{ label: 'Notre flocage', href: '/flocage-textile-alsace' }}
      />

      <Section eyebrow="Local" title="Un atelier textile ancré en Centre Alsace">
        <Prose>
          <p>
            FLOKKA est une petite entreprise <strong>alsacienne</strong> de personnalisation textile.
            Depuis Andlau, au cœur du <strong>Centre Alsace</strong>, nous personnalisons vos{' '}
            <strong>vêtements</strong> — maillots, sweats, polos, vestes, t-shirts et accessoires —
            avec un rendu soigné et sans contrainte de quantité.
          </p>
          <p>
            Nous avons choisi de nous concentrer sur notre territoire pour offrir proximité, conseil
            direct et réactivité. Particuliers, clubs, associations, commerces et entreprises y
            trouvent un partenaire textile fiable et local.
          </p>
        </Prose>
      </Section>

      <Section eyebrow="Notre approche" title="Le textile personnalisé sans contraintes" tone="tint">
        <FeatureGrid
          items={[
            { icon: PackageOpen, title: 'Dès une pièce', description: 'Aucun minimum de commande.' },
            { icon: KeySquare, title: 'Réassort à la demande', description: 'Espace dédié, sans stock.' },
            { icon: Palette, title: 'Flocage & broderie', description: 'Marquage soigné sur tous supports.' },
            { icon: Users, title: 'Tous publics', description: 'Particuliers, clubs, assos, entreprises.' },
            { icon: MapPin, title: 'Centre Alsace', description: 'Atelier local à Andlau (67).' },
            { icon: Repeat, title: 'Sur-mesure', description: 'Du conseil jusqu\'à la pièce finie.' },
          ]}
        />
      </Section>

      <Section eyebrow="Proximité" title="Notre secteur en Centre Alsace">
        <Prose>
          <p>
            Que vous soyez à <a href="/textile-personnalise-selestat">Sélestat</a>, à{' '}
            <a href="/textile-personnalise-obernai">Obernai</a>, à{' '}
            <a href="/textile-personnalise-barr">Barr</a> ou à{' '}
            <a href="/textile-personnalise-erstein">Erstein</a>, notre atelier d&apos;Andlau est tout
            proche. Cette implantation centrale nous rend particulièrement réactifs sur le Centre
            Alsace.
          </p>
        </Prose>
      </Section>

      <FaqSection items={faq} />

      <RelatedLinks
        links={[
          { title: 'Flocage textile Alsace', description: 'Notre savoir-faire de marquage textile détaillé.', href: '/flocage-textile-alsace' },
          { title: 'Réassort à la demande', description: "L'espace client pour recommander sans stock.", href: '/reassort-a-la-demande' },
          { title: 'Personnalisation textile à Sélestat', description: 'Notre offre au cœur du Centre Alsace.', href: '/textile-personnalise-selestat' },
        ]}
      />

      <CTASection
        title="On personnalise vos textiles ?"
        text="Une pièce ou une série, un particulier ou une asso : écrivez-nous, on adore les nouveaux projets."
        primary={{ label: 'Nous écrire', href: '/contact' }}
      />
    </MarketingLayout>
  )
}
