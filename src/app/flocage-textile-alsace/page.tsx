import type { Metadata } from 'next'
import { Shirt, Stamp, Tag, Repeat, MapPin, ShieldCheck } from 'lucide-react'
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
    "Atelier de flocage textile en Centre Alsace (Andlau, Bas-Rhin). Marquage et impression de maillots, sweats, polos et vestes, dès une pièce, avec réassort à la demande sans stock.",
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
      "Dans notre atelier d'Andlau, en Centre Alsace (Bas-Rhin), entre Barr, Obernai, Sélestat et Erstein. C'est notre secteur de proximité.",
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
            Notre atelier d&apos;<strong>Andlau</strong> réalise le <strong>flocage</strong>, le
            marquage et l&apos;impression de vos textiles : maillots, sweats, polos et vestes,{' '}
            <strong>dès une pièce</strong>, pour les particuliers et structures du{' '}
            <strong>Centre Alsace</strong>.
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
            associations, commerces et particuliers du Centre Alsace : Barr, Obernai, Sélestat,
            Erstein et alentours. Chaque pièce est produite à la demande, ce qui évite tout surstock.
          </p>
        </Prose>
      </Section>

      <Section eyebrow="Techniques" title="Flocage, marquage, impression" tone="tint">
        <FeatureGrid
          items={[
            { icon: Stamp, title: 'Flocage', description: 'Rendu mat et résistant, idéal pour noms et numéros.' },
            { icon: Shirt, title: 'Impression', description: 'Visuels détaillés et multicolores, photos comprises.' },
            { icon: Tag, title: 'Marquage nom & numéro', description: 'Le marquage idéal pour les maillots d\'équipe.' },
            { icon: Repeat, title: "À l'unité", description: 'Une seule pièce floquée, à tout moment.' },
            { icon: ShieldCheck, title: 'Durable', description: 'Des marquages qui résistent aux lavages.' },
            { icon: MapPin, title: 'Local', description: 'Réalisé en Centre Alsace, à Andlau.' },
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
        title="Une idée de flocage ou de marquage ?"
        text="Montrez-nous votre visuel (même un croquis !) : on vous dit ce qui rendra le mieux, en toute franchise."
        primary={{ label: 'Nous écrire', href: '/contact' }}
        secondary={{ label: 'Pour les clubs', href: '/clubs-sportifs' }}
      />
    </MarketingLayout>
  )
}
