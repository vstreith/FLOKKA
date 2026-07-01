import type { Metadata } from 'next'
import { Scissors, Flame, Layers, Repeat, MapPin, ShieldCheck, Hash, PackageOpen } from 'lucide-react'
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

const PATH = '/flocage-textile-alsace'

export const metadata: Metadata = pageMetadata({
  title: 'Flocage textile en Alsace (flex) — dès 1 pièce',
  description:
    "Atelier de flocage textile en flex en Centre Alsace (Andlau). Découpe au plotter Graphtec CE7000, pose à la presse Secabo V7 lite. Noms, numéros, logos — dès une pièce, sans minimum.",
  path: PATH,
  keywords: [
    'flocage textile Alsace',
    'flocage flex Alsace',
    'flocage maillot Alsace',
    'flocage Centre Alsace',
    'flocage Andlau',
  ],
})

const faq = [
  {
    question: "Qu'est-ce que le flocage flex ?",
    answer:
      "C'est notre technique : on découpe votre visuel (nom, numéro, logo, texte) dans un film flex de qualité, puis on le pose à chaud sur le textile. Le rendu est net, souple, mat et très résistant aux lavages.",
  },
  {
    question: 'Avec quel matériel travaillez-vous ?',
    answer:
      "On découpe le flex sur un plotter Graphtec CE7000 (précis au dixième de millimètre) et on le presse avec une Secabo V7 lite, une presse à chaud qui garantit une pose homogène et durable.",
  },
  {
    question: 'Peut-on floquer une seule pièce ?',
    answer:
      "Oui, et avec plaisir. On travaille sans minimum : une seule pièce, c'est parfait pour nous.",
  },
  {
    question: 'Le flocage résiste-t-il aux lavages ?',
    answer:
      "Oui. Un flocage flex bien posé tient très bien dans le temps si on l'entretient simplement : lavage à l'envers, à 30 °C, sans sèche-linge ni repassage direct sur le motif.",
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
          title: 'Flocage textile en Alsace (flex) | FLOKKA',
          description:
            "Atelier de flocage flex en Centre Alsace : découpe Graphtec CE7000, presse Secabo V7 lite. Dès une pièce, sans minimum.",
          path: PATH,
        })}
      />
      <PageHero
        eyebrow="Notre savoir-faire"
        title="Le flocage textile, c'est tout ce qu'on fait — et on le fait bien"
        breadcrumbs={crumbs}
        intro={
          <>
            Chez FLOKKA, on ne fait <strong>que du flocage</strong>, en <strong>flex</strong>. Noms,
            numéros, prénoms, logos et textes, posés avec soin dans notre atelier d&apos;Andlau —{' '}
            <strong>dès une seule pièce</strong>.
          </>
        }
        primary={{ label: 'Nous écrire', href: '/contact' }}
        secondary={{ label: 'Voir nos tarifs', href: '/tarifs' }}
      />

      <Section eyebrow="Le principe" title="Le flocage flex, en deux mots">
        <Prose>
          <p>
            Le <strong>flocage</strong> consiste à découper votre visuel dans un film{' '}
            <strong>flex</strong> (un textile thermocollant souple), puis à le presser à chaud sur le
            vêtement. Le résultat : un marquage <strong>net, souple au toucher, mat et durable</strong>,
            parfait pour les <strong>noms et numéros de maillots</strong>, les logos de club et les
            textes.
          </p>
          <p>
            On a choisi de nous concentrer sur cette seule technique pour la <strong>maîtriser à
            fond</strong> — plutôt que de tout faire à moitié. C&apos;est, selon nous, le meilleur
            compromis entre qualité, tenue et prix pour les clubs, les assos et les particuliers.
          </p>
        </Prose>
      </Section>

      <Section eyebrow="Notre matériel" title="Un petit atelier, du bon matériel" tone="tint">
        <FeatureGrid
          items={[
            { icon: Scissors, title: 'Plotter Graphtec CE7000', description: 'La découpe de précision du flex, jusque dans les petits détails.' },
            { icon: Flame, title: 'Presse Secabo V7 lite', description: 'Une pose à chaud homogène, pour un flocage qui tient.' },
            { icon: Layers, title: 'Flex de qualité', description: 'Un film souple et résistant, mat, agréable à porter.' },
            { icon: Hash, title: 'Noms & numéros', description: 'Notre spécialité pour les maillots d\'équipe.' },
            { icon: ShieldCheck, title: 'Durable', description: 'Un marquage qui résiste aux lavages répétés.' },
            { icon: MapPin, title: 'Fait à Andlau', description: 'Tout est réalisé par nous, en Centre Alsace.' },
          ]}
        />
      </Section>

      <Section eyebrow="Notre façon de faire" title="Du visuel au vêtement, étape par étape">
        <StepList
          steps={[
            { title: 'On prépare le visuel', description: 'On met au propre votre nom, numéro ou logo pour la découpe.' },
            { title: 'On découpe le flex', description: 'Découpe de précision sur notre plotter Graphtec CE7000, puis échenillage à la main.' },
            { title: 'On presse à chaud', description: 'Pose à la Secabo V7 lite, à la bonne température, pour une tenue durable.' },
          ]}
        />
      </Section>

      <Section eyebrow="Sur quoi" title="Ce qu'on peut floquer" tone="tint">
        <div className="max-w-3xl">
          <CheckList
            items={[
              'Maillots, t-shirts, sweats, polos et vestes',
              'Noms, numéros, prénoms, logos et textes',
              'Sacs, casquettes et petits accessoires',
              'Dès une pièce, sans minimum de commande',
            ]}
          />
        </div>
      </Section>

      <FaqSection items={faq} />

      <RelatedLinks
        links={[
          { title: 'Nos tarifs', description: 'Des prix clairs et transparents pour le flocage.', href: '/tarifs' },
          { title: 'Le réassort sans stock', description: 'Recommandez vos flocages à l\'unité, quand vous voulez.', href: '/reassort-a-la-demande' },
          { title: 'Tout comprendre au flocage', description: 'Le guide, sur notre blog.', href: '/blog/comprendre-flocage-textile' },
        ]}
      />

      <CTASection
        title="Une idée à floquer ?"
        text="Envoyez-nous votre visuel (même un croquis !) : on vous dit tout de suite ce que ça donne."
        primary={{ label: 'Nous écrire', href: '/contact' }}
        secondary={{ label: 'Voir les tarifs', href: '/tarifs' }}
      />
    </MarketingLayout>
  )
}
