import type { Metadata } from 'next'
import { KeySquare, Repeat, PackageOpen, Clock, Palette, Users } from 'lucide-react'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import {
  PageHero,
  Section,
  Prose,
  FeatureGrid,
  StepList,
  CheckList,
  FaqSection,
  CTASection,
  RelatedLinks,
} from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/JsonLd'
import { pageMetadata, webPageSchema } from '@/lib/seo'

const PATH = '/reassort-a-la-demande'

export const metadata: Metadata = pageMetadata({
  title: 'Réassort textile à la demande, sans stock | Espace client',
  description:
    "Notre service différenciant : un espace client dédié, accessible par code, pour recommander votre textile personnalisé à la demande, à l'unité, sans immobiliser de stock. Centre Alsace.",
  path: PATH,
  keywords: [
    'réassort textile à la demande',
    'réassort textile sans stock',
    'espace client textile personnalisé',
    'recommander textile à l\'unité',
  ],
})

const faq = [
  {
    question: "Qu'est-ce que l'espace client dédié ?",
    answer:
      "C'est un espace en ligne réservé à votre structure, accessible par un code. Vos produits personnalisés y sont enregistrés, prêts à être recommandés à tout moment, sans repasser par un devis.",
  },
  {
    question: 'Comment fonctionne le réassort à la demande ?',
    answer:
      "Vous accédez à votre espace avec votre code, vous choisissez les produits déjà personnalisés à réapprovisionner, et nous les fabriquons à l'unité avant de vous les remettre. Aucun stock à gérer de votre côté.",
  },
  {
    question: 'Faut-il un minimum pour réapprovisionner ?',
    answer:
      "Non. Le réassort se fait à l'unité : vous recommandez exactement la quantité dont vous avez besoin, même une seule pièce.",
  },
  {
    question: "À qui s'adresse ce service ?",
    answer:
      'Surtout aux structures qui commandent régulièrement (clubs, associations, commerces, entreprises). Mais tout client peut en bénéficier dès lors qu\'il souhaite réapprovisionner ses produits.',
  },
]

export default function ReassortPage() {
  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'Réassort à la demande', path: PATH },
  ]
  return (
    <MarketingLayout>
      <JsonLd
        data={webPageSchema({
          title: 'Réassort textile à la demande, sans stock | FLOKKA',
          description:
            "Espace client dédié pour recommander votre textile personnalisé à la demande, sans stock.",
          path: PATH,
        })}
      />
      <PageHero
        eyebrow="Notre service différenciant"
        title="Le réassort textile à la demande, sans stock"
        breadcrumbs={crumbs}
        intro={
          <>
            Un <strong>espace client dédié</strong>, accessible par code, où vos produits
            personnalisés sont enregistrés. Vous recommandez à l&apos;<strong>unité</strong>, quand
            vous voulez, sans immobiliser de <strong>stock</strong>.
          </>
        }
        primary={{ label: 'Mettre en place mon espace', href: '/contact' }}
        secondary={{ label: 'Accéder à mon espace', href: '/boutique-privee' }}
      />

      <Section eyebrow="Le constat" title="Le stock textile, un faux ami">
        <Prose>
          <p>
            Pour éviter de recommander trop souvent, beaucoup de structures commandent un gros volume
            de textile « <strong>au cas où</strong> », puis le stockent. Résultat : de la trésorerie
            immobilisée, des cartons qui prennent la poussière, et parfois des tailles ou des modèles
            qui ne partent jamais.
          </p>
          <p>
            Nous avons conçu un service qui supprime ce problème : le <strong>réassort à la
            demande</strong>, via un espace en ligne dédié à votre structure. C&apos;est ce qui nous
            distingue des autres ateliers de personnalisation de la région.
          </p>
        </Prose>
      </Section>

      <Section eyebrow="Le fonctionnement" title="Comment ça marche" tone="tint">
        <StepList
          steps={[
            { title: 'On enregistre vos produits', description: 'Vos textiles personnalisés sont sauvegardés dans un espace à votre nom.' },
            { title: 'Vous accédez par un code', description: 'Un simple code donne accès à votre espace, à tout moment.' },
            { title: 'Vous recommandez à la demande', description: "Réassort à l'unité, sans nouveau devis et sans stocker." },
          ]}
        />
      </Section>

      <Section eyebrow="Les avantages" title="Ce que ce service vous apporte">
        <FeatureGrid
          items={[
            { icon: PackageOpen, title: 'Zéro stock', description: 'Vous ne stockez plus rien « au cas où ».' },
            { icon: Repeat, title: "À l'unité", description: 'Recommandez exactement ce qu\'il vous faut.' },
            { icon: KeySquare, title: 'Accès par code', description: 'Votre espace dédié, disponible quand vous voulez.' },
            { icon: Clock, title: 'Gain de temps', description: 'Plus besoin de redemander un devis à chaque fois.' },
            { icon: Palette, title: 'Produits enregistrés', description: 'Vos visuels et personnalisations sont conservés.' },
            { icon: Users, title: 'Idéal pour les structures', description: 'Clubs, associations, commerces, entreprises.' },
          ]}
        />
        <div className="mt-10 max-w-3xl">
          <CheckList
            items={[
              'Aucune trésorerie immobilisée dans du stock',
              "Un réassort possible dès une pièce",
              'Des produits déjà personnalisés, prêts à recommander',
              'Un interlocuteur unique en Centre Alsace',
            ]}
          />
        </div>
      </Section>

      <FaqSection items={faq} />

      <RelatedLinks
        links={[
          { title: 'Notre savoir-faire flocage', description: 'Flocage, impression et broderie en Alsace.', href: '/flocage-textile-alsace' },
          { title: 'Textile pour clubs & associations', description: 'Le réassort à la demande pour les structures.', href: '/clubs-sportifs' },
          { title: 'Éviter les stocks dans une association', description: 'Notre article dédié sur le sujet.', href: '/blog/eviter-stocks-association-textile' },
        ]}
      />

      <CTASection
        title="Envie d'un réassort sans contrainte ?"
        text="Mettons en place votre espace dédié. Sans engagement."
        primary={{ label: 'Nous contacter', href: '/contact' }}
      />
    </MarketingLayout>
  )
}
