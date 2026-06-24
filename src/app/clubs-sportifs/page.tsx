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
  title: 'Boutique textile pour club sportif | Maillots & flocage',
  description:
    "Équipez votre club sportif d'une boutique en ligne privée : maillots, sweats et textiles floqués à vos couleurs, réassort à l'unité, sans stock ni avance. Fabrication en Alsace.",
  path: PATH,
  keywords: [
    'textile personnalisé club sportif',
    'boutique club sportif',
    'vêtements personnalisés club sportif',
    'boutique privée club',
    'maillot personnalisé club',
  ],
})

const faq = [
  {
    question: 'Comment équiper un club sportif sans avancer de trésorerie ?',
    answer:
      "Avec une boutique privée FLOKKA, chaque licencié commande et paie sa propre pièce. Le club n'avance rien et ne gère aucun stock : tout est produit à l'unité, à la commande.",
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
    question: 'Quels produits proposer dans la boutique du club ?',
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
          title: 'Boutique textile pour club sportif | FLOKKA',
          description:
            "Boutique privée, maillots et flocage pour clubs sportifs. Réassort à l'unité, sans stock.",
          path: PATH,
        })}
      />
      <PageHero
        eyebrow="Clubs sportifs"
        title="La boutique textile de votre club sportif"
        breadcrumbs={crumbs}
        intro={
          <>
            Maillots, survêtements et sweats <strong>floqués à vos couleurs</strong>, commandés
            directement par vos licenciés en <strong>réassort à l&apos;unité</strong>. Sans avance,
            sans stock, fabriqués en Alsace.
          </>
        }
        primary={{ label: 'Créer la boutique de mon club', href: '/contact' }}
        secondary={{ label: 'Voir comment ça marche', href: '/boutique-privee-club' }}
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
            FLOKKA propose une autre approche : une <strong>boutique en ligne privée</strong>{' '}
            dédiée à votre club, où chaque licencié commande lui-même son{' '}
            <strong>textile personnalisé</strong>, à sa taille, avec son nom et son numéro. Le club
            ne porte plus aucune logistique.
          </p>
        </Prose>
      </Section>

      <Section eyebrow="La solution" title="Une boutique club sportif clé en main" tone="tint">
        <FeatureGrid
          items={[
            { icon: Trophy, title: 'À vos couleurs', description: 'Maillots et tenues personnalisés à l\'identité du club.' },
            { icon: Repeat, title: "Réassort à l'unité", description: 'Une seule pièce, à tout moment, sans minimum.' },
            { icon: Users, title: 'Pour tous', description: 'Joueurs, staff, dirigeants, parents et supporters.' },
            { icon: PiggyBank, title: 'Zéro avance', description: "Le club n'avance pas un centime." },
            { icon: Shirt, title: 'Nom & numéro', description: 'Personnalisation individuelle de chaque pièce.' },
            { icon: Zap, title: 'Rapide', description: 'Boutique prête sans effort, livraison directe.' },
          ]}
        />
      </Section>

      <Section eyebrow="En pratique" title="Comment lancer la boutique de votre club">
        <StepList
          steps={[
            { title: 'On crée la boutique', description: "Avec vos couleurs, votre logo et un code d'accès réservé au club." },
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
                'Une boutique ouverte toute la saison',
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
              Notre atelier d&apos;Andlau réalise l&apos;ensemble du <strong>flocage</strong> et du
              marquage, avec des finitions pensées pour résister aux entraînements et aux lavages
              répétés.
            </p>
          </Prose>
        </div>
      </Section>

      <FaqSection items={faq} />

      <RelatedLinks
        links={[
          { title: 'Boutique privée club : le fonctionnement', description: 'Le détail du modèle de boutique privée pour un club.', href: '/boutique-privee-club' },
          { title: 'Flocage textile en Alsace', description: 'Notre savoir-faire de marquage textile au cœur du Bas-Rhin.', href: '/flocage-textile-alsace' },
          { title: 'Guide complet de la boutique club sportif', description: 'Tout comprendre, étape par étape, sur le blog.', href: '/blog/boutique-club-sportif-guide-complet' },
        ]}
      />

      <CTASection
        title="Prêt à équiper votre club ?"
        text="On met en place votre boutique privée, à vos couleurs, sans engagement."
        primary={{ label: 'Créer ma boutique club', href: '/contact' }}
        secondary={{ label: 'Solutions associations', href: '/associations' }}
      />
    </MarketingLayout>
  )
}
