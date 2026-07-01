import type { Metadata } from 'next'
import { Trophy, Repeat, Users, Shirt, PiggyBank, Zap } from 'lucide-react'
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

const PATH = '/clubs-sportifs'

export const metadata: Metadata = pageMetadata({
  title: 'Textile personnalisé pour club sportif | Flocage maillots',
  description:
    "Personnalisation textile pour votre club sportif en Centre Alsace : maillots, sweats et tenues floqués à vos couleurs, dès une pièce, avec réassort à la demande sans stock.",
  path: PATH,
  keywords: [
    'textile personnalisé club sportif',
    'vêtements personnalisés club sportif',
    'maillot personnalisé club',
    'flocage maillot club',
    'réassort textile club',
  ],
})

const faq = [
  {
    question: 'Comment équiper un club sportif sans avancer de trésorerie ?',
    answer:
      "Via un espace de commande dédié, chaque licencié commande et paie sa propre pièce. Le club n'avance rien et ne gère aucun stock : tout est produit à l'unité, à la commande.",
  },
  {
    question: 'Peut-on personnaliser les maillots avec nom et numéro ?',
    answer:
      'Oui. La personnalisation nom et numéro est disponible au moment de la commande, pour chaque licencié individuellement.',
  },
  {
    question: 'Un nouveau joueur peut-il commander en cours de saison ?',
    answer:
      "Absolument. Le réassort à l'unité permet à un nouveau licencié de commander son équipement à tout moment, sans attendre une commande groupée.",
  },
  {
    question: 'Quels produits peut-on personnaliser pour un club ?',
    answer:
      "Maillots et tenues d'entraînement, survêtements, sweats à capuche, polos pour le staff, sacs et accessoires. Vous choisissez la sélection adaptée à votre club.",
  },
]

export default function ClubsSportifsPage() {
  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'Clubs sportifs', path: PATH },
  ]
  return (
    <MarketingLayout>
      <JsonLd
        data={webPageSchema({
          title: 'Textile personnalisé pour club sportif | FLOKKA',
          description:
            "Personnalisation textile et flocage pour clubs sportifs. Dès une pièce, réassort à la demande, sans stock.",
          path: PATH,
        })}
      />
      <PageHero
        eyebrow="Clubs sportifs"
        title="Textile personnalisé pour votre club sportif"
        breadcrumbs={crumbs}
        intro={
          <>
            On a nous-mêmes présidé un club (le Badminton Club de Barr !), alors on sait ce que
            c&apos;est. Maillots et sweats <strong>floqués à vos couleurs</strong>, commandés par vos
            licenciés en <strong>réassort à l&apos;unité</strong> — sans avance, sans stock, et avec
            des gens qui comprennent votre quotidien.
          </>
        }
        primary={{ label: 'Demander un devis', href: '/contact' }}
        secondary={{ label: 'Le réassort à la demande', href: '/reassort-a-la-demande' }}
      />

      <Section
        eyebrow="Le problème"
        title="Équiper un club ne devrait pas être un casse-tête"
      >
        <Prose>
          <p>
            Chaque saison, le même scénario : il faut collecter les tailles des licenciés sur un
            tableur, avancer une commande groupée parfois coûteuse, stocker les cartons dans le
            local, puis redistribuer les pièces une à une. Et quand un nouveau joueur arrive en
            cours d&apos;année, il faut tout recommencer. Pour un club animé par des bénévoles,
            c&apos;est une charge lourde et un risque financier.
          </p>
          <p>
            FLOKKA propose une autre approche : un <strong>espace de commande dédié</strong> à votre
            club, accessible par code, où chaque licencié commande lui-même son{' '}
            <strong>textile personnalisé</strong>, à sa taille, avec son nom et son numéro, en{' '}
            réassort à la demande. Le club ne porte plus aucune logistique.
          </p>
        </Prose>
      </Section>

      <Section eyebrow="La solution" title="Une solution textile clé en main pour votre club" tone="tint">
        <FeatureGrid
          items={[
            { icon: Trophy, title: 'À vos couleurs', description: 'Maillots et tenues personnalisés à l\'identité du club.' },
            { icon: Repeat, title: "Réassort à l'unité", description: 'Une seule pièce, à tout moment, sans minimum.' },
            { icon: Users, title: 'Pour tous', description: 'Joueurs, staff, dirigeants, parents et supporters.' },
            { icon: PiggyBank, title: 'Zéro avance', description: "Le club n'avance pas un centime." },
            { icon: Shirt, title: 'Nom & numéro', description: 'Personnalisation individuelle de chaque pièce.' },
            { icon: Zap, title: 'Rapide', description: 'Espace prêt sans effort, production à l\'unité.' },
          ]}
        />
      </Section>

      <Section eyebrow="En pratique" title="Comment équiper votre club, étape par étape">
        <StepList
          steps={[
            { title: 'On met en place votre espace', description: "Avec vos couleurs, votre logo et un code d'accès réservé au club." },
            { title: 'Vos licenciés commandent', description: 'Chacun choisit ses produits, sa taille, son nom et son numéro.' },
            { title: 'On produit et on livre', description: "Chaque pièce est floquée à l'unité et expédiée directement." },
          ]}
        />
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="rounded-3xl bg-white p-8 ring-1 ring-brand-gray-dark shadow-soft">
            <h3 className="font-display text-xl font-bold text-brand-black mb-5">Ce que le club y gagne</h3>
            <CheckList
              items={[
                'Une image homogène et professionnelle',
                'Zéro logistique pour le bureau',
                "Un financement possible via une marge club",
                'Un espace de réassort ouvert toute la saison',
              ]}
            />
          </div>
          <Prose>
            <p>
              Vous pouvez aussi <strong>reverser une marge au club</strong> sur chaque vente : le
              prix affiché aux licenciés intègre alors automatiquement votre marge, qui devient une
              source de financement pour le matériel, les déplacements ou les projets de la saison.
            </p>
            <p>
              Notre atelier d&apos;Andlau réalise tout le <strong>flocage</strong> en interne, avec
              des finitions pensées pour résister aux entraînements et aux lavages répétés.
            </p>
          </Prose>
        </div>
      </Section>

      <FaqSection items={faq} />

      <RelatedLinks
        links={[
          { title: 'Réassort à la demande', description: "L'espace dédié pour recommander le textile du club sans stock.", href: '/reassort-a-la-demande' },
          { title: 'Flocage textile en Alsace', description: 'Notre matériel et notre méthode de flocage flex.', href: '/flocage-textile-alsace' },
          { title: 'Guide complet de la boutique club sportif', description: 'Tout comprendre, étape par étape, sur le blog.', href: '/blog/boutique-club-sportif-guide-complet' },
        ]}
      />

      <CTASection
        title="On équipe votre club ?"
        text="Écrivez-nous un mot : on connaît la vie de club de l'intérieur, et on adore ça. Sans engagement, promis."
        primary={{ label: 'Nous écrire', href: '/contact' }}
        secondary={{ label: 'Et pour les assos', href: '/associations' }}
      />
    </MarketingLayout>
  )
}
