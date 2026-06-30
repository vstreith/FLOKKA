import type { Metadata } from 'next'
import { PiggyBank, Palette, ShieldCheck, HeartHandshake, Repeat, MapPin } from 'lucide-react'
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

const PATH = '/associations'

export const metadata: Metadata = pageMetadata({
  title: 'Textile personnalisé pour association | Vêtements floqués',
  description:
    "Personnalisation textile pour votre association en Centre Alsace : vêtements pour bénévoles et événements, dès une pièce, avec réassort à la demande sans stock. Marge reversée possible.",
  path: PATH,
  keywords: [
    'textile personnalisé association',
    'vêtements personnalisés association',
    'flocage association',
    'financement association textile',
    'réassort textile association',
  ],
})

const faq = [
  {
    question: 'Une association peut-elle se financer avec une boutique textile ?',
    answer:
      "Oui. Vous définissez une marge ajoutée au prix de fabrication ; elle vous est intégralement reversée. Chaque vente devient une source de financement, sans aucune avance de trésorerie.",
  },
  {
    question: "Faut-il gérer un stock de vêtements dans l'association ?",
    answer:
      "Non. Chaque pièce est produite à l'unité, à la commande. Aucun carton d'invendus, aucun espace de stockage nécessaire.",
  },
  {
    question: 'Quels textiles pour une association ?',
    answer:
      'T-shirts pour vos événements, sweats et polos pour les bénévoles et le bureau, accessoires personnalisés : on adapte la sélection à vos besoins et à vos couleurs.',
  },
  {
    question: 'Comment les adhérents commandent-ils ?',
    answer:
      "Nous mettons en place un espace dédié avec un code d'accès que vous diffusez à vos adhérents. Chacun commande de façon autonome, en réassort à la demande.",
  },
]

export default function AssociationsPage() {
  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'Associations', path: PATH },
  ]
  return (
    <MarketingLayout>
      <JsonLd
        data={webPageSchema({
          title: 'Textile personnalisé pour association | FLOKKA',
          description:
            "Vêtements personnalisés pour associations, dès une pièce, avec réassort à la demande. Marge reversée possible.",
          path: PATH,
        })}
      />
      <PageHero
        eyebrow="Associations"
        title="Textile personnalisé pour votre association"
        breadcrumbs={crumbs}
        intro={
          <>
            On adore les projets associatifs (on en a fait notre quotidien). Des{' '}
            <strong>vêtements personnalisés</strong> pour vos bénévoles et vos événements, une{' '}
            <strong>marge reversée</strong> à votre asso, et <strong>zéro stock</strong> à gérer.
          </>
        }
        primary={{ label: 'Demander un devis', href: '/contact' }}
        secondary={{ label: 'Comprendre le modèle sans stock', href: '/blog/eviter-stocks-association-textile' }}
      />

      <Section eyebrow="Pourquoi" title="Le textile, un atout pour votre association">
        <Prose>
          <p>
            Une <strong>association</strong> vit grâce à ses bénévoles, ses adhérents et ses
            événements. Le textile personnalisé renforce son identité, fédère ses membres et peut
            même devenir un <strong>levier de financement</strong>. Mais gérer des commandes
            groupées, avancer l&apos;argent et stocker les invendus décourage beaucoup de structures.
          </p>
          <p>
            Avec FLOKKA, ces freins disparaissent. Vous disposez d&apos;un{' '}
            <strong>espace dédié</strong> à vos couleurs, accessible par code : vos adhérents
            commandent eux-mêmes en réassort à la demande, et vous pouvez reverser une marge à
            l&apos;association sur chaque vente.
          </p>
        </Prose>
      </Section>

      <Section eyebrow="Les avantages" title="Ce que FLOKKA apporte à votre association" tone="tint">
        <FeatureGrid
          items={[
            { icon: PiggyBank, title: 'Financement', description: 'Une marge reversée à l\'association sur chaque commande.' },
            { icon: ShieldCheck, title: 'Sans risque', description: 'Aucun stock, aucun invendu, aucune avance.' },
            { icon: Palette, title: 'À vos couleurs', description: 'Textiles personnalisés pour bénévoles et événements.' },
            { icon: Repeat, title: "Réassort à l'unité", description: 'Une pièce à la fois, à tout moment.' },
            { icon: HeartHandshake, title: 'Fédérateur', description: 'Une identité commune qui rassemble vos membres.' },
            { icon: MapPin, title: 'Local', description: "Atelier en Centre Alsace, interlocuteur unique." },
          ]}
        />
      </Section>

      <Section eyebrow="En pratique" title="Équiper votre association, étape par étape">
        <StepList
          steps={[
            { title: "Mise en place de l'espace", description: "À vos couleurs, avec votre logo et un code d'accès adhérents." },
            { title: 'Diffusion aux adhérents', description: 'Vous partagez le code par e-mail ou sur vos réseaux.' },
            { title: 'Commande & financement', description: 'Chacun commande, et votre marge alimente le budget de l\'association.' },
          ]}
        />
        <div className="mt-10">
          <Prose>
            <p>
              Ce modèle convient à tous les types de structures : associations sportives, culturelles,
              comités des fêtes, amicales, associations de quartier ou de parents d&apos;élèves.
              Découvrez comment <strong>financer votre association</strong> grâce au textile dans
              notre article dédié, ou comment <strong>éviter totalement les stocks</strong>.
            </p>
          </Prose>
        </div>
      </Section>

      <FaqSection items={faq} />

      <RelatedLinks
        links={[
          { title: 'Financer son association avec le textile', description: 'La méthode pour transformer le textile en source de revenu.', href: '/blog/financer-association-boutique-textile' },
          { title: 'Éviter les stocks dans une association', description: 'Pourquoi et comment supprimer totalement le stock textile.', href: '/blog/eviter-stocks-association-textile' },
          { title: 'Solutions pour clubs sportifs', description: 'Le même modèle, décliné pour les clubs de sport.', href: '/clubs-sportifs' },
        ]}
      />

      <CTASection
        title="On habille votre association ?"
        text="Racontez-nous votre projet en deux lignes. On vous répond vite, avec des idées et le sourire."
        primary={{ label: 'Nous écrire', href: '/contact' }}
        secondary={{ label: 'Voir nos services', href: '/services' }}
      />
    </MarketingLayout>
  )
}
