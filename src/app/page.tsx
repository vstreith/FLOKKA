import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  Stamp,
  Scissors,
  Shirt,
  Printer,
  Repeat,
  PackageOpen,
  MapPin,
  User,
  Users,
  Building2,
  PartyPopper,
  KeySquare,
} from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import {
  Section,
  Prose,
  FeatureGrid,
  StepList,
  CheckList,
  Testimonials,
  FaqSection,
  CTASection,
  RelatedLinks,
} from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/JsonLd'
import { pageMetadata, webPageSchema } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Personnalisation textile en Centre Alsace, dès 1 pièce | FLOKKA',
  description:
    "Atelier de personnalisation textile en Centre Alsace (Andlau) : flocage, marquage et broderie sans minimum de commande, dès une pièce. Espace client dédié pour le réassort à la demande, sans stock.",
  path: '/',
  keywords: [
    'personnalisation textile Centre Alsace',
    'personnalisation textile Alsace',
    'flocage textile Alsace',
    'marquage textile Alsace',
    'broderie personnalisée Alsace',
    'textile personnalisé sans minimum',
    'réassort textile sans stock',
  ],
})

const differenceItems = [
  { icon: PackageOpen, title: 'Aucun minimum de commande', description: 'On personnalise dès une seule pièce. Pas de quantité imposée, jamais.' },
  { icon: KeySquare, title: 'Espace client dédié', description: "Un accès par code pour commander votre réassort quand vous voulez." },
  { icon: Repeat, title: 'Réassort à la demande', description: "Vous recommandez à l'unité, sans immobiliser de stock « au cas où »." },
  { icon: MapPin, title: 'Atelier en Centre Alsace', description: 'Production locale à Andlau, proximité et conseil direct.' },
]

const services = [
  { icon: Stamp, title: 'Flocage', description: 'Noms, numéros et logos en relief, mats et résistants.' },
  { icon: Printer, title: 'Impression', description: 'Visuels détaillés et multicolores, photos comprises.' },
  { icon: Scissors, title: 'Broderie', description: 'Finition haut de gamme et durable pour vos logos.' },
  { icon: Shirt, title: 'Tous supports', description: 'T-shirts, sweats, polos, vestes, maillots, casquettes, sacs.' },
]

const audiences = [
  { icon: User, title: 'Particuliers', description: 'Un cadeau, un événement de famille, une idée à personnaliser, même en un exemplaire.' },
  { icon: Users, title: 'Clubs & associations', description: 'Équipez vos membres et profitez d\'un espace de réassort à la demande, sans stock.' },
  { icon: Building2, title: 'Entreprises & commerces', description: 'Tenues de travail et textiles à votre image, en petite série.' },
  { icon: PartyPopper, title: 'Événements', description: 'Tournois, fêtes, manifestations : du textile personnalisé sur mesure.' },
]

const testimonials = [
  { quote: "J'avais besoin d'un seul sweat brodé : ailleurs on me demandait d'en commander dix. Chez FLOKKA, une pièce a suffi.", author: 'Cliente particulière', role: 'Sélestat' },
  { quote: "Notre espace dédié nous permet de recommander des maillots à l'unité quand un joueur arrive. Plus de stock à gérer.", author: 'Club sportif', role: 'Centre Alsace' },
  { quote: 'Travail soigné, conseils utiles et atelier à côté de chez nous. Exactement ce qu\'on cherchait.', author: 'Commerce local', role: 'Obernai' },
]

const faq = [
  {
    question: 'Quel est le minimum de commande chez FLOKKA ?',
    answer:
      "Il n'y en a pas. Nous personnalisons votre textile dès une seule pièce. Que vous ayez besoin d'un exemplaire ou de plusieurs dizaines, c'est possible, sans quantité imposée.",
  },
  {
    question: "Qu'est-ce que l'espace client dédié ?",
    answer:
      "C'est un espace en ligne réservé à votre structure, accessible via un code. Vos produits personnalisés y sont enregistrés : vous (ou vos membres) pouvez recommander à tout moment, à la demande, sans repasser par un devis et sans stock à immobiliser.",
  },
  {
    question: "Qu'est-ce que le réassort à la demande ?",
    answer:
      "C'est la possibilité de recommander vos pièces déjà personnalisées au fil de l'eau, à l'unité. Vous évitez ainsi de surcommander « au cas où » et de stocker du textile inutilement.",
  },
  {
    question: 'Quelles techniques de personnalisation proposez-vous ?',
    answer:
      'Le flocage (noms, numéros, logos), l\'impression (visuels détaillés et multicolores) et la broderie (finition durable). Nous vous conseillons la technique la plus adaptée à votre projet.',
  },
  {
    question: 'Où se trouve votre atelier ?',
    answer:
      "À Andlau, en Centre Alsace (Bas-Rhin), entre Barr, Obernai et Sélestat. Nous travaillons en priorité avec les particuliers, clubs, associations et entreprises du secteur.",
  },
  {
    question: 'Faut-il être un club ou une association pour commander ?',
    answer:
      "Non. Nous personnalisons du textile pour tout le monde : particuliers, clubs, associations, entreprises et événements. L'espace de réassort est simplement un service en plus pour ceux qui commandent régulièrement.",
  },
]

const relatedLinks = [
  { title: 'Flocage textile en Alsace', description: 'Notre savoir-faire de marquage : flocage, impression, broderie.', href: '/flocage-textile-alsace' },
  { title: 'Réassort à la demande', description: "L'espace client dédié pour recommander sans stock.", href: '/reassort-a-la-demande' },
  { title: 'Textile pour clubs & associations', description: 'Un service pensé pour les structures locales.', href: '/clubs-sportifs' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd
        data={[
          webPageSchema({
            title: 'Personnalisation textile en Centre Alsace, dès 1 pièce | FLOKKA',
            description:
              'Atelier de personnalisation textile en Centre Alsace : flocage, marquage, broderie, sans minimum, avec réassort à la demande.',
            path: '/',
          }),
        ]}
      />
      <Header />

      <main className="flex-1 pt-16">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden mesh-bg">
          <div className="pointer-events-none absolute top-10 -left-20 w-96 h-96 rounded-full bg-brand-violet/6 blur-3xl animate-blob" />
          <div className="pointer-events-none absolute top-40 right-0 w-96 h-96 rounded-full bg-brand-pink/6 blur-3xl animate-blob" style={{ animationDelay: '3s' }} />

          <div className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="max-w-4xl py-20 animate-fade-up">
              <div className="inline-flex items-center gap-2 mb-8 rounded-full bg-white/70 backdrop-blur px-4 py-2 shadow-soft ring-1 ring-brand-gray-dark">
                <span className="flex h-2 w-2 rounded-full bg-brand-gradient" aria-hidden="true" />
                <span className="text-xs font-bold tracking-widest uppercase text-brand-violet-dark">
                  Atelier textile · Andlau, Centre Alsace
                </span>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-brand-black mb-8">
                Personnalisation textile
                <br />
                <span className="text-gradient">en Centre Alsace.</span>
              </h1>
              <p className="text-lg sm:text-xl text-brand-gray-text max-w-2xl leading-relaxed mb-10">
                Flocage, marquage et broderie sur tous vos textiles — <strong className="text-brand-black">dès une seule pièce</strong>,
                sans minimum de commande. Et pour ceux qui commandent régulièrement, un{' '}
                <strong className="text-brand-black">espace dédié avec réassort à la demande</strong>,
                sans stock à immobiliser.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 bg-brand-gradient text-white font-semibold px-8 py-4 rounded-full text-sm tracking-wide shadow-glow hover:-translate-y-0.5 transition-all duration-300"
                >
                  Demander un devis
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/boutique-privee"
                  className="inline-flex items-center justify-center gap-2 bg-white text-brand-black font-semibold px-8 py-4 rounded-full ring-1 ring-brand-gray-medium hover:text-brand-violet-dark transition-all text-sm tracking-wide shadow-soft"
                >
                  <KeySquare size={16} />
                  Accéder à mon espace réassort
                </Link>
              </div>

              <dl className="mt-16 grid grid-cols-3 gap-4 max-w-2xl">
                {[
                  { value: 'Dès 1', label: 'Pièce, sans minimum de commande' },
                  { value: '0 stock', label: 'Réassort à la demande' },
                  { value: 'Andlau', label: 'Atelier en Centre Alsace' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white/70 backdrop-blur p-5 ring-1 ring-brand-gray-dark shadow-soft">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="font-display text-2xl sm:text-3xl font-extrabold text-gradient block">{stat.value}</span>
                      <span className="text-xs text-brand-gray-text mt-1 block">{stat.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── Nos différences ── */}
        <Section
          eyebrow="Ce qui nous distingue"
          title="Une petite entreprise de personnalisation textile, deux vraies différences"
          intro="FLOKKA est un atelier de personnalisation textile basé à Andlau, en Centre Alsace. Notre métier : flocage, marquage et broderie. Notre façon de le faire change tout."
        >
          <div className="mb-12">
            <FeatureGrid items={differenceItems} cols={4} />
          </div>
          <Prose>
            <p>
              La plupart des ateliers imposent un <strong>minimum de commande</strong> : dix, vingt,
              parfois cinquante pièces. Pour un particulier qui veut un seul vêtement personnalisé,
              ou pour une petite structure, c&apos;est rédhibitoire. Chez FLOKKA, nous personnalisons{' '}
              <strong>dès une pièce</strong>, sans quantité imposée.
            </p>
            <p>
              Notre seconde différence, c&apos;est l&apos;<strong>espace client dédié</strong>. Pour
              ceux qui reviennent régulièrement, nous mettons en place un accès par code où vos
              produits personnalisés sont enregistrés. Vous pouvez ainsi commander votre{' '}
              <strong>réassort à la demande</strong>, à l&apos;unité, sans avoir à immobiliser du
              stock « au cas où ». C&apos;est ce service qui nous démarque des autres ateliers de la
              région.
            </p>
          </Prose>
        </Section>

        {/* ── Ce que nous personnalisons ── */}
        <Section
          eyebrow="Notre savoir-faire"
          title="Ce que nous personnalisons"
          intro="Flocage, impression et broderie sur une large gamme de textiles, avec des finitions soignées."
          tone="tint"
        >
          <FeatureGrid items={services} cols={4} />
          <div className="mt-10">
            <Prose>
              <p>
                Nous appliquons noms, numéros, prénoms, logos et visuels sur t-shirts, sweats, polos,
                maillots, vestes, casquettes et accessoires. Selon le rendu recherché, nous
                choisissons la technique la plus adaptée : <strong>flocage</strong> pour les lettrages
                et numéros, <strong>impression</strong> pour les visuels complexes,{' '}
                <strong>broderie</strong> pour une finition haut de gamme. Découvrez le détail de
                notre <a href="/flocage-textile-alsace">savoir-faire de flocage en Alsace</a>.
              </p>
            </Prose>
          </div>
        </Section>

        {/* ── Sans minimum ── */}
        <Section eyebrow="Différence n°1" title="Sans minimum de commande, dès une pièce">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Prose>
              <p>
                Vous avez besoin d&apos;un <strong>seul</strong> t-shirt floqué, d&apos;un sweat brodé
                pour offrir, ou de trois polos pour votre commerce ? Aucun problème. Nous travaillons{' '}
                <strong>sans minimum de quantité</strong>, ce qui est rare dans le secteur.
              </p>
              <p>
                Cette souplesse profite à tout le monde : aux particuliers qui veulent une pièce
                unique, comme aux clubs, associations et entreprises qui préfèrent commander au juste
                besoin plutôt que par gros lots.
              </p>
            </Prose>
            <div className="rounded-3xl bg-white p-8 ring-1 ring-brand-gray-dark shadow-soft">
              <h3 className="font-display text-xl font-bold text-brand-black mb-5">Idéal pour</h3>
              <CheckList
                items={[
                  'Une pièce unique (cadeau, événement personnel)',
                  'Une petite série pour un commerce ou une équipe',
                  'Un test avant une commande plus importante',
                  'Le complément ponctuel d\'une commande passée',
                ]}
              />
            </div>
          </div>
        </Section>

        {/* ── Espace réassort ── */}
        <Section eyebrow="Différence n°2" title="Un espace dédié pour le réassort à la demande" tone="tint">
          <StepList
            steps={[
              { title: 'On enregistre vos produits', description: 'Vos textiles personnalisés sont sauvegardés dans un espace à votre nom.' },
              { title: 'Vous accédez par un code', description: "Un simple code donne accès à votre espace, quand vous le souhaitez." },
              { title: 'Vous recommandez à la demande', description: "Réassort à l'unité, sans repasser par un devis et sans stocker." },
            ]}
          />
          <div className="mt-10">
            <Prose>
              <p>
                Fini le textile qui dort dans un placard « au cas où ». Avec l&apos;
                <strong>espace client dédié</strong>, vous gardez la main sur vos produits et vous
                recommandez uniquement ce dont vous avez besoin, au moment où vous en avez besoin.
                C&apos;est particulièrement utile pour les clubs, associations et commerces qui
                renouvellent régulièrement. En savoir plus sur{' '}
                <a href="/reassort-a-la-demande">le réassort à la demande</a>.
              </p>
            </Prose>
          </div>
        </Section>

        {/* ── Pour qui ── */}
        <Section eyebrow="Pour qui" title="Du particulier à l'entreprise">
          <FeatureGrid items={audiences} cols={4} />
        </Section>

        {/* ── Ancrage local ── */}
        <Section eyebrow="Local" title="Ancrés en Centre Alsace" tone="tint">
          <Prose>
            <p>
              FLOKKA est une <strong>petite entreprise locale</strong> installée à{' '}
              <strong>Andlau</strong>, au cœur du <strong>Centre Alsace</strong>. Nous avons fait le
              choix de nous concentrer sur notre territoire : proximité, conseil direct et réactivité
              pour les habitants et les structures de <strong>Sélestat</strong>,{' '}
              <strong>Obernai</strong>, <strong>Barr</strong>, <strong>Erstein</strong> et des
              communes environnantes.
            </p>
            <p>
              Travailler localement, c&apos;est échanger facilement, valider rapidement vos maquettes
              et soutenir une production de proximité. Voir nos zones :{' '}
              <a href="/textile-personnalise-selestat">Sélestat</a>,{' '}
              <a href="/textile-personnalise-obernai">Obernai</a>,{' '}
              <a href="/textile-personnalise-barr">Barr</a>,{' '}
              <a href="/textile-personnalise-erstein">Erstein</a>.
            </p>
          </Prose>
        </Section>

        {/* ── Témoignages ── */}
        <Section eyebrow="Ils nous font confiance" title="Ce que disent nos clients" center>
          <Testimonials items={testimonials} />
        </Section>

        {/* ── FAQ ── */}
        <FaqSection items={faq} />

        {/* ── Maillage interne ── */}
        <RelatedLinks links={relatedLinks} />

        {/* ── CTA ── */}
        <CTASection
          title="Un projet de personnalisation textile ?"
          text="Une pièce ou une série, un particulier ou une structure : parlons-en. Devis rapide, sans engagement."
          primary={{ label: 'Demander un devis', href: '/contact' }}
          secondary={{ label: 'Voir nos services', href: '/services' }}
        />
      </main>

      <Footer />
    </div>
  )
}
