import type { Metadata } from 'next'
import { Building2, Shirt, Repeat, ShieldCheck, MapPin, Briefcase } from 'lucide-react'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import {
  PageHero,
  Section,
  Prose,
  FeatureGrid,
  CheckList,
  FaqSection,
  CTASection,
  RelatedLinks,
} from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/JsonLd'
import { pageMetadata, webPageSchema } from '@/lib/seo'

const PATH = '/entreprises'

export const metadata: Metadata = pageMetadata({
  title: 'Textile personnalisé pour entreprises et collectivités',
  description:
    "Vêtements de travail et textiles personnalisés pour petites entreprises, PME et collectivités locales. Petites séries, réassort à l'unité, flocage et broderie en Alsace.",
  path: PATH,
  keywords: [
    'textile personnalisé entreprise',
    'vêtements de travail personnalisés',
    'textile professionnel Alsace',
    'flocage entreprise',
    'petite série textile',
  ],
})

const faq = [
  {
    question: 'Travaillez-vous avec les petites entreprises et les PME ?',
    answer:
      "Oui. FLOKKA est pensé pour les petites structures locales : artisans, commerces, PME et collectivités. Nous produisons aussi bien à l'unité qu'en petite série.",
  },
  {
    question: "Peut-on commander des vêtements de travail floqués ?",
    answer:
      'Oui : t-shirts, polos, sweats et vestes de travail floqués ou brodés à votre logo, avec possibilité de personnaliser le prénom de chaque collaborateur.',
  },
  {
    question: 'Y a-t-il un minimum de commande pour une entreprise ?',
    answer:
      "Non. Vous pouvez commander une seule pièce comme une petite série, et réapprovisionner à l'unité au fil de vos recrutements.",
  },
]

export default function EntreprisesPage() {
  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'Entreprises', path: PATH },
  ]
  return (
    <MarketingLayout>
      <JsonLd
        data={webPageSchema({
          title: 'Textile personnalisé pour entreprises et collectivités | FLOKKA',
          description:
            "Vêtements de travail et textiles personnalisés pour PME et collectivités. Petites séries, réassort à l'unité.",
          path: PATH,
        })}
      />
      <PageHero
        eyebrow="Entreprises & collectivités"
        title="Textile personnalisé pour entreprises et collectivités"
        breadcrumbs={crumbs}
        intro={
          <>
            Habillez vos équipes avec des <strong>vêtements de travail personnalisés</strong> à votre
            image. Petites séries, <strong>réassort à l&apos;unité</strong>, flocage et broderie
            soignés, fabriqués localement en Alsace.
          </>
        }
        primary={{ label: 'Demander un devis', href: '/contact' }}
        secondary={{ label: 'Nos services', href: '/services' }}
      />

      <Section eyebrow="Pour qui" title="Un partenaire textile pour les structures locales">
        <Prose>
          <p>
            Au-delà des clubs et des associations, FLOKKA accompagne les{' '}
            <strong>petites entreprises, artisans, commerces et collectivités</strong> qui souhaitent
            une tenue professionnelle à leur image. Une identité visuelle soignée renforce la
            confiance des clients et la cohésion des équipes.
          </p>
          <p>
            Notre modèle s&apos;adapte aux besoins des PME : pas besoin de commander des centaines de
            pièces. Vous démarrez avec une <strong>petite série</strong>, puis vous réapprovisionnez
            à l&apos;unité à chaque nouvelle embauche.
          </p>
        </Prose>
      </Section>

      <Section eyebrow="Nos atouts" title="Pourquoi nous choisir" tone="tint">
        <FeatureGrid
          items={[
            { icon: Briefcase, title: 'Tenues pro', description: 'Polos, t-shirts, sweats et vestes à votre logo.' },
            { icon: Shirt, title: 'Flocage & broderie', description: 'Le rendu adapté à votre image de marque.' },
            { icon: Repeat, title: "Réassort à l'unité", description: 'Une pièce pour chaque nouveau collaborateur.' },
            { icon: Building2, title: 'Petites séries', description: 'Pas de minimum contraignant pour les PME.' },
            { icon: ShieldCheck, title: 'Qualité durable', description: 'Des finitions qui tiennent dans le temps.' },
            { icon: MapPin, title: 'Production locale', description: 'Atelier en Alsace, interlocuteur unique.' },
          ]}
        />
      </Section>

      <Section title="Ce que vous obtenez">
        <div className="max-w-3xl">
          <CheckList
            items={[
              'Une tenue cohérente pour toute votre équipe',
              'La personnalisation du logo et du prénom',
              'La possibilité de réapprovisionner à tout moment',
              'Un interlocuteur unique et réactif en Alsace',
            ]}
          />
        </div>
      </Section>

      <FaqSection items={faq} />

      <RelatedLinks
        links={[
          { title: 'Flocage textile en Alsace', description: 'Notre savoir-faire de marquage textile.', href: '/flocage-textile-alsace' },
          { title: 'Tout comprendre au flocage', description: 'Flocage, impression, broderie : les différences.', href: '/blog/comprendre-flocage-textile' },
          { title: 'Nos services', description: "L'ensemble de nos prestations de personnalisation.", href: '/services' },
        ]}
      />

      <CTASection
        title="Un projet textile pour votre entreprise ?"
        text="Parlons-en : devis rapide, sans engagement."
        primary={{ label: 'Demander un devis', href: '/contact' }}
      />
    </MarketingLayout>
  )
}
