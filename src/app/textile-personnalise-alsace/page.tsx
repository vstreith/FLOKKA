import type { Metadata } from 'next'
import { Repeat, MapPin, PiggyBank, Users, Palette, Truck } from 'lucide-react'
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
  title: 'Textile personnalisé en Alsace pour clubs et associations',
  description:
    "Textile personnalisé en Alsace : boutiques privées, flocage et réassort à l'unité pour clubs sportifs et associations. Atelier à Andlau (Bas-Rhin), livraison partout en France.",
  path: PATH,
  keywords: [
    'textile personnalisé Alsace',
    'vêtements personnalisés Alsace',
    'textile club Alsace',
    'textile association Alsace',
    'flocage Alsace',
  ],
})

const faq = [
  {
    question: 'Où se trouve votre atelier en Alsace ?',
    answer:
      "Notre atelier est à Andlau (67140), dans le Bas-Rhin, entre Barr, Obernai et Sélestat. Nous servons toute l'Alsace et livrons partout en France.",
  },
  {
    question: 'Quelles structures équipez-vous en Alsace ?',
    answer:
      "Principalement des clubs sportifs et des associations, mais aussi des petites entreprises et collectivités alsaciennes souhaitant du textile personnalisé.",
  },
  {
    question: 'Proposez-vous le réassort à l\'unité partout en Alsace ?',
    answer:
      "Oui. Le réassort à l'unité s'applique à toutes les structures, où qu'elles soient en Alsace : une seule pièce peut être commandée à tout moment.",
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
            "Textile personnalisé en Alsace pour clubs et associations : boutiques privées, flocage, réassort à l'unité.",
          path: PATH,
        })}
      />
      <PageHero
        eyebrow="Alsace"
        title="Textile personnalisé en Alsace"
        breadcrumbs={crumbs}
        intro={
          <>
            Boutiques privées, flocage et <strong>réassort à l&apos;unité</strong> pour les clubs et
            associations de toute l&apos;<strong>Alsace</strong>. Une fabrication locale depuis notre
            atelier d&apos;Andlau, dans le Bas-Rhin.
          </>
        }
        primary={{ label: 'Créer ma boutique', href: '/contact' }}
        secondary={{ label: 'Notre flocage', href: '/flocage-textile-alsace' }}
      />

      <Section eyebrow="Local" title="Un acteur textile ancré en Alsace">
        <Prose>
          <p>
            FLOKKA est un atelier <strong>alsacien</strong> de personnalisation textile. Depuis
            Andlau, au cœur du <strong>Bas-Rhin</strong>, nous équipons les structures locales en{' '}
            <strong>vêtements personnalisés</strong> : maillots, sweats, polos, vestes et
            accessoires, le tout sans contrainte de stock.
          </p>
          <p>
            L&apos;Alsace possède un tissu associatif et sportif particulièrement dense. Notre
            mission est de permettre à chaque club et association de la région de proposer un textile
            de qualité à ses membres, sans avancer de trésorerie ni gérer de logistique.
          </p>
        </Prose>
      </Section>

      <Section eyebrow="Notre approche" title="Le textile personnalisé sans contraintes" tone="tint">
        <FeatureGrid
          items={[
            { icon: Repeat, title: "Réassort à l'unité", description: 'Une pièce à la fois, sans minimum.' },
            { icon: PiggyBank, title: 'Sans avance', description: 'La structure ne finance aucun stock.' },
            { icon: Palette, title: 'À vos couleurs', description: 'Personnalisation complète à votre identité.' },
            { icon: Users, title: 'Clubs & assos', description: 'Une solution pensée pour les structures locales.' },
            { icon: MapPin, title: 'Fabrication locale', description: "Produit en Alsace, à Andlau (67)." },
            { icon: Truck, title: 'Livraison France', description: 'Expédition partout en France.' },
          ]}
        />
      </Section>

      <Section eyebrow="Proximité" title="Nous desservons toute l'Alsace">
        <Prose>
          <p>
            Que votre structure soit à <a href="/textile-personnalise-strasbourg">Strasbourg</a>, à{' '}
            <a href="/textile-personnalise-colmar">Colmar</a>, à{' '}
            <a href="/textile-personnalise-obernai">Obernai</a> ou à{' '}
            <a href="/textile-personnalise-selestat">Sélestat</a>, nous sommes à vos côtés. Notre
            implantation centrale dans le Bas-Rhin nous permet d&apos;être réactifs sur l&apos;ensemble
            du territoire alsacien.
          </p>
        </Prose>
      </Section>

      <FaqSection items={faq} />

      <RelatedLinks
        links={[
          { title: 'Flocage textile Alsace', description: 'Notre savoir-faire de marquage textile détaillé.', href: '/flocage-textile-alsace' },
          { title: 'Textile personnalisé à Strasbourg', description: "Notre offre pour l'Eurométropole.", href: '/textile-personnalise-strasbourg' },
          { title: 'Flocage dans le Bas-Rhin', description: 'Le marquage textile au plus près du 67.', href: '/flocage-textile-bas-rhin' },
        ]}
      />

      <CTASection
        title="Votre projet textile en Alsace commence ici"
        text="Clubs, associations, entreprises : créons ensemble votre boutique."
        primary={{ label: 'Démarrer un projet', href: '/contact' }}
      />
    </MarketingLayout>
  )
}
