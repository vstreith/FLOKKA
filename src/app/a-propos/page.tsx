import type { Metadata } from 'next'
import { MapPin, Heart, Sparkles, Handshake } from 'lucide-react'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { PageHero, Section, Prose, FeatureGrid, CTASection, RelatedLinks } from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/JsonLd'
import { pageMetadata, webPageSchema } from '@/lib/seo'

const PATH = '/a-propos'

export const metadata: Metadata = pageMetadata({
  title: 'Notre histoire — un couple, un atelier textile à Andlau',
  description:
    "FLOKKA, c'est nous : un couple d'Andlau, anciens présidents du Badminton Club de Barr, qui personnalise vos textiles avec soin. Un petit atelier local, en Centre Alsace.",
  path: PATH,
  keywords: ['FLOKKA', 'atelier textile Andlau', 'petit atelier textile Alsace', 'histoire FLOKKA'],
})

const values = [
  { icon: MapPin, title: 'Vraiment local', description: 'Un atelier à Andlau, et nous deux au bout du fil. Pas de standard, pas de robot.' },
  { icon: Heart, title: 'Avec le cœur', description: 'On traite votre commande comme la nôtre, même pour une seule pièce.' },
  { icon: Handshake, title: 'Du conseil sincère', description: 'On vous dit ce qui rendra le mieux, pas ce qui rapporte le plus.' },
  { icon: Sparkles, title: 'Du travail soigné', description: 'Des finitions propres, des délais tenus, sans mauvaise surprise.' },
]

export default function AboutPage() {
  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'À propos', path: PATH },
  ]
  return (
    <MarketingLayout>
      <JsonLd
        data={webPageSchema({
          title: 'Notre histoire | FLOKKA',
          description: "Un couple d'Andlau, anciens présidents du Badminton Club de Barr, derrière un petit atelier textile en Centre Alsace.",
          path: PATH,
        })}
      />
      <PageHero
        eyebrow="Bonjour, c'est nous"
        title="Un couple, un atelier, et l'envie de bien faire"
        breadcrumbs={crumbs}
        intro={
          <>
            FLOKKA, ce n&apos;est pas une usine : c&apos;est un <strong>petit atelier de
            personnalisation textile</strong> tenu par <strong>nous deux</strong>, à Andlau, en
            Centre Alsace.
          </>
        }
        primary={{ label: 'Venez nous dire bonjour', href: '/contact' }}
      />

      <Section eyebrow="Notre histoire" title="Tout a commencé sur un terrain de badminton">
        <Prose>
          <p>
            On forme un couple, on vit à <strong>Andlau</strong>, et on a un point commun qui a tout
            déclenché : nous avons tous les deux été <strong>président du Badminton Club de
            Barr</strong>. Pendant ces années, on a adoré faire vivre le club… un peu moins gérer le
            textile.
          </p>
          <p>
            Parce que commander des maillots, à l&apos;époque, c&apos;était un vrai casse-tête :
            avancer une grosse somme, faire le tour des tailles, stocker des cartons à la maison,
            puis recommander dès qu&apos;un nouveau joueur arrivait. On s&apos;est dit qu&apos;il
            devait bien y avoir une façon plus simple et plus humaine de faire. <strong>FLOKKA est né
            de là.</strong>
          </p>
          <p>
            Aujourd&apos;hui, on personnalise du textile pour les clubs et les assos, bien sûr, mais
            aussi pour les particuliers, les commerces et toutes les belles idées du coin. Toujours
            avec la même philosophie : <strong>dès une pièce</strong>, sans minimum, et avec un{' '}
            <strong>espace réassort</strong> pour que vous n&apos;ayez plus jamais à stocker.
          </p>
          <p>
            On est une toute petite structure, et c&apos;est exactement ce qui nous plaît : on prend
            le temps, on connaît nos clients, et chaque commande compte vraiment pour nous.
          </p>
        </Prose>
      </Section>

      <Section eyebrow="Ce qui compte pour nous" title="Nos petites convictions" tone="tint">
        <FeatureGrid items={values} cols={4} />
      </Section>

      <Section eyebrow="Où nous trouver" title="À Andlau, au cœur du Centre Alsace">
        <Prose>
          <p>
            Notre atelier est à <strong>Andlau</strong>, entre <strong>Barr</strong>,{' '}
            <strong>Obernai</strong> et <strong>Sélestat</strong>. On travaille avec tout le{' '}
            <strong>Centre Alsace</strong> et on adore quand les gens passent papoter de leur projet.
            Un café est toujours prêt. Pour nous écrire ou convenir d&apos;un moment, c&apos;est par{' '}
            <a href="/contact">ici</a>.
          </p>
        </Prose>
      </Section>

      <RelatedLinks
        title="Et concrètement ?"
        links={[
          { title: 'Ce qu\'on sait faire', description: 'Flocage, marquage, impression — notre savoir-faire.', href: '/flocage-textile-alsace' },
          { title: 'Le réassort sans stock', description: 'Votre petit espace pour recommander tranquille.', href: '/reassort-a-la-demande' },
          { title: 'Pour les clubs & assos', description: 'On connaît la vie de club de l\'intérieur.', href: '/clubs-sportifs' },
        ]}
      />

      <CTASection
        title="On prend un café ?"
        text="Racontez-nous votre idée, même en deux lignes. On vous répond vite, avec le sourire."
        primary={{ label: 'Nous écrire', href: '/contact' }}
      />
    </MarketingLayout>
  )
}
