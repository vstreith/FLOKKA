import type { Metadata } from 'next'
import { Shirt, Stamp, Scissors, Repeat, MapPin, ShieldCheck } from 'lucide-react'
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

const PATH = '/flocage-textile-alsace'

export const metadata: Metadata = pageMetadata({
  title: 'Flocage textile en Alsace | Marquage de maillots & sweats',
  description:
    "Atelier de flocage textile en Alsace (Andlau, Bas-Rhin). Marquage de maillots, sweats, polos et vestes pour clubs et associations, à l'unité, avec boutique privée et fabrication locale.",
  path: PATH,
  keywords: [
    'flocage textile Alsace',
    'flocage Alsace',
    'marquage textile Alsace',
    'flocage maillot Alsace',
    'flocage sweat Alsace',
  ],
})

const faq = [
  {
    question: "Qu'est-ce que le flocage textile ?",
    answer:
      "Le flocage consiste à découper un motif (nom, numéro, logo) dans un film thermocollant puis à le presser à chaud sur le textile, pour un marquage en relief, mat et durable.",
  },
  {
    question: 'Où réalisez-vous le flocage en Alsace ?',
    answer:
      "Dans notre atelier d'Andlau, dans le Bas-Rhin, entre Barr, Obernai et Sélestat. Nous servons toute l'Alsace et expédions partout en France.",
  },
  {
    question: 'Peut-on floquer une seule pièce ?',
    answer:
      "Oui. Le réassort à l'unité permet de floquer un seul textile, à tout moment, sans minimum de commande.",
  },
  {
    question: 'Le flocage résiste-t-il aux lavages ?',
    answer:
      "Oui, un flocage de qualité résiste à de nombreux lavages s'il est entretenu correctement (lavage à l'envers, basse température, sans sèche-linge).",
  },
]

export default function FlocageAlsacePage() {
  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'Flocage textile Alsace', path: PATH },
  ]
  return (
    <MarketingLayout>
      <JsonLd
        data={webPageSchema({
          title: 'Flocage textile en Alsace | FLOKKA',
          description:
            "Atelier de flocage textile en Alsace : maillots, sweats, polos. Réassort à l'unité, fabrication locale.",
          path: PATH,
        })}
      />
      <PageHero
        eyebrow="Savoir-faire"
        title="Flocage textile en Alsace"
        breadcrumbs={crumbs}
        intro={
          <>
            Notre atelier d&apos;<strong>Andlau</strong> réalise le <strong>flocage</strong> et le
            marquage de vos textiles : maillots, sweats, polos et vestes, à l&apos;unité, pour les
            clubs et associations de toute l&apos;Alsace.
          </>
        }
        primary={{ label: 'Demander un flocage', href: '/contact' }}
        secondary={{ label: 'Flocage dans le Bas-Rhin', href: '/flocage-textile-bas-rhin' }}
      />

      <Section eyebrow="Le métier" title="Un flocage soigné, au cœur de l'Alsace">
        <Prose>
          <p>
            Le <strong>flocage textile</strong> est notre cœur de métier. Il consiste à appliquer de
            manière durable des noms, numéros, logos et visuels sur un vêtement. Le rendu, mat et
            légèrement en relief, est particulièrement adapté aux <strong>maillots de sport</strong>{' '}
            et aux textiles d&apos;équipe.
          </p>
          <p>
            Implantés à Andlau, dans le <strong>Bas-Rhin</strong>, nous travaillons avec les clubs,
            associations et structures de toute l&apos;Alsace, de Strasbourg à Colmar en passant par
            Sélestat et Obernai. Chaque pièce est produite à la demande, ce qui évite tout surstock.
          </p>
        </Prose>
      </Section>

      <Section eyebrow="Techniques" title="Flocage, impression, broderie" tone="tint">
        <FeatureGrid
          items={[
            { icon: Stamp, title: 'Flocage', description: 'Rendu mat et résistant, idéal pour noms et numéros.' },
            { icon: Shirt, title: 'Impression', description: 'Visuels détaillés et multicolores, photos comprises.' },
            { icon: Scissors, title: 'Broderie', description: 'Finition haut de gamme et durable pour les logos.' },
            { icon: Repeat, title: "À l'unité", description: 'Une seule pièce floquée, à tout moment.' },
            { icon: ShieldCheck, title: 'Durable', description: 'Des marquages qui résistent aux lavages.' },
            { icon: MapPin, title: 'Local', description: 'Réalisé en Alsace, livré partout en France.' },
          ]}
        />
        <div className="mt-10">
          <Prose>
            <p>
              Nous vous conseillons la <strong>technique la plus adaptée</strong> à votre support et
              au rendu souhaité. Pour aller plus loin, consultez notre article&nbsp;:{' '}
              <a href="/blog/comprendre-flocage-textile">tout comprendre au flocage textile</a>.
            </p>
          </Prose>
        </div>
      </Section>

      <FaqSection items={faq} />

      <RelatedLinks
        links={[
          { title: 'Textile personnalisé en Alsace', description: "L'offre complète de personnalisation textile en Alsace.", href: '/textile-personnalise-alsace' },
          { title: 'Flocage dans le Bas-Rhin', description: 'Notre zone de proximité, département du 67.', href: '/flocage-textile-bas-rhin' },
          { title: 'Tout comprendre au flocage', description: 'Le guide complet des techniques de marquage.', href: '/blog/comprendre-flocage-textile' },
        ]}
      />

      <CTASection
        title="Un flocage pour votre club ou votre équipe ?"
        text="Parlons de votre projet : conseil, devis et fabrication en Alsace."
        primary={{ label: 'Nous contacter', href: '/contact' }}
        secondary={{ label: 'Solutions clubs', href: '/clubs-sportifs' }}
      />
    </MarketingLayout>
  )
}
