import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  Stamp,
  Tag,
  Shirt,
  Printer,
  Repeat,
  PackageOpen,
  MapPin,
  Heart,
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
  title: 'Petit atelier de personnalisation textile en Centre Alsace | FLOKKA',
  description:
    "FLOKKA, c'est un petit atelier textile tenu par un couple à Andlau. Flocage, marquage et impression avec le sourire, dès une pièce et sans minimum. Réassort à la demande, en Centre Alsace.",
  path: '/',
  keywords: [
    'personnalisation textile Centre Alsace',
    'petit atelier textile Alsace',
    'flocage textile Alsace',
    'marquage textile Alsace',
    'textile personnalisé sans minimum',
    'réassort textile sans stock',
    'textile personnalisé Andlau',
  ],
})

const differenceItems = [
  { icon: PackageOpen, title: 'Dès une seule pièce', description: "Pas de minimum, jamais. Une pièce vous suffit ? Nous aussi." },
  { icon: KeySquare, title: 'Votre espace à vous', description: 'Un accès par code pour recommander quand ça vous arrange.' },
  { icon: Repeat, title: 'Réassort tranquille', description: "Vous commandez à l'unité, on garde vos modèles. Zéro stock chez vous." },
  { icon: Heart, title: 'Fait avec soin', description: 'Deux paires de mains, beaucoup d\'attention, près de chez vous.' },
]

const services = [
  { icon: Stamp, title: 'Flocage', description: 'Noms, numéros et logos en relief, nets et qui tiennent.' },
  { icon: Printer, title: 'Impression', description: 'Pour les visuels en couleurs et les photos.' },
  { icon: Tag, title: 'Marquage', description: 'Noms, numéros et prénoms, nets et bien placés.' },
  { icon: Shirt, title: 'Sur tout', description: 'T-shirts, sweats, polos, vestes, casquettes, sacs…' },
]

const audiences = [
  { icon: User, title: 'Les particuliers', description: 'Un cadeau, un tee-shirt de famille, une idée à offrir — même en un seul exemplaire.' },
  { icon: Users, title: 'Les clubs & assos', description: "On connaît la musique : on a nous-mêmes présidé un club. On vous simplifie tout." },
  { icon: Building2, title: 'Les commerces & TPE', description: 'Des tenues à votre image, en petite série, sans prise de tête.' },
  { icon: PartyPopper, title: 'Les événements', description: 'Tournois, fêtes de village, EVJF… on adore ces projets-là.' },
]

const testimonials = [
  { quote: "Je voulais un seul sweat floqué pour offrir. Partout on me parlait de minimum… eux l'ont fait avec le sourire.", author: 'Marie', role: 'Sélestat' },
  { quote: "On recommande nos maillots à l'unité dès qu'un joueur arrive. Plus de cartons dans le local, c'est le bonheur.", author: 'Un club voisin', role: 'Centre Alsace' },
  { quote: 'Accueil au top, conseils sincères et atelier juste à côté. On ne va plus voir ailleurs.', author: 'Thomas', role: 'Obernai' },
]

const faq = [
  {
    question: 'Vraiment, on peut commander une seule pièce ?',
    answer:
      "Oui, vraiment ! Une pièce, c'est parfait pour nous. On n'impose aucun minimum : un cadeau unique comme une petite série, c'est avec le même plaisir.",
  },
  {
    question: "C'est quoi votre fameux espace réassort ?",
    answer:
      "Un petit espace en ligne rien que pour vous, avec un code. On y garde vos modèles déjà personnalisés : quand vous en voulez d'autres, vous recommandez en deux clics, à l'unité, sans rien stocker chez vous.",
  },
  {
    question: 'Qui se cache derrière FLOKKA ?',
    answer:
      "Nous : un couple installé à Andlau, en Centre Alsace. Anciens présidents du Badminton Club de Barr, on a vécu de l'intérieur la galère d'équiper un club — d'où l'idée de FLOKKA.",
  },
  {
    question: 'Vous faites quoi, exactement ?',
    answer:
      'Du flocage (noms, numéros, logos) et de l\'impression (visuels en couleurs et photos). On vous conseille la technique la mieux adaptée à votre idée.',
  },
  {
    question: 'On peut passer vous voir ?',
    answer:
      "Avec plaisir. On est à Andlau, entre Barr, Obernai et Sélestat. Écrivez-nous un mot et on convient d'un moment pour discuter de votre projet autour d'un café.",
  },
  {
    question: 'Faut-il être un club pour commander ?',
    answer:
      "Pas du tout. Particuliers, familles, commerces, assos, équipes : tout le monde est le bienvenu. L'espace réassort est juste un petit plus pour celles et ceux qui reviennent souvent.",
  },
]

const relatedLinks = [
  { title: 'Notre savoir-faire : flocage & marquage', description: 'Comment on personnalise vos textiles, avec soin.', href: '/flocage-textile-alsace' },
  { title: 'Le réassort, sans stock', description: 'Votre petit espace pour recommander tranquillement.', href: '/reassort-a-la-demande' },
  { title: 'Notre histoire', description: 'Un couple, un club de badminton, et une idée.', href: '/a-propos' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd
        data={[
          webPageSchema({
            title: 'Petit atelier de personnalisation textile en Centre Alsace | FLOKKA',
            description:
              "Petit atelier textile tenu par un couple à Andlau : flocage, marquage, impression dès une pièce, avec réassort à la demande. En Centre Alsace.",
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
                  Petit atelier textile · Andlau, Centre Alsace
                </span>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-brand-black mb-8">
                Votre petit atelier
                <br />
                <span className="text-gradient">textile, près de chez vous.</span>
              </h1>
              <p className="text-lg sm:text-xl text-brand-gray-text max-w-2xl leading-relaxed mb-10">
                Nous sommes un <strong className="text-brand-black">couple d&apos;Andlau</strong> qui
                personnalise vos textiles avec soin — flocage, marquage, impression. Chez nous,{' '}
                <strong className="text-brand-black">une seule pièce suffit</strong> (jamais de
                minimum), et on vous crée même un petit <strong className="text-brand-black">espace
                réassort</strong> pour recommander sans rien stocker.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 bg-brand-gradient text-white font-semibold px-8 py-4 rounded-full text-sm tracking-wide shadow-glow hover:-translate-y-0.5 transition-all duration-300"
                >
                  Venez nous en parler
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/a-propos"
                  className="inline-flex items-center justify-center gap-2 bg-white text-brand-black font-semibold px-8 py-4 rounded-full ring-1 ring-brand-gray-medium hover:text-brand-violet-dark transition-all text-sm tracking-wide shadow-soft"
                >
                  <Heart size={16} />
                  Faire connaissance
                </Link>
              </div>

              <dl className="mt-16 grid grid-cols-3 gap-4 max-w-2xl">
                {[
                  { value: 'Dès 1', label: 'Pièce, sans minimum' },
                  { value: '0 stock', label: 'Réassort quand vous voulez' },
                  { value: 'Andlau', label: 'À deux pas de chez vous' },
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

        {/* ── Notre histoire ── */}
        <Section eyebrow="Bonjour, c'est nous" title="Un couple, un club de badminton, et une idée">
          <Prose>
            <p>
              FLOKKA, ce n&apos;est pas une grande enseigne : c&apos;est <strong>nous deux</strong>, un
              couple installé à <strong>Andlau</strong>, au cœur du <strong>Centre Alsace</strong>.
              Un tout <strong>petit atelier</strong>, deux paires de mains, et beaucoup d&apos;envie de
              bien faire.
            </p>
            <p>
              On a tous les deux été <strong>président du Badminton Club de Barr</strong>. Alors la
              galère d&apos;équiper un club en textile, on la connaît par cœur : avancer l&apos;argent,
              courir après les tailles, stocker des cartons… C&apos;est précisément de là qu&apos;est
              née l&apos;idée de FLOKKA. On a voulu un atelier qui rende ça simple, humain et
              sympathique — pour les clubs, mais aussi pour les particuliers, les commerces et les
              associations du coin.
            </p>
            <p>
              Du coup, chez nous, on prend le temps de discuter, on conseille pour de vrai, et on
              traite votre commande comme si c&apos;était la nôtre. <a href="/a-propos">Découvrez notre
              histoire</a> si le cœur vous en dit.
            </p>
          </Prose>
        </Section>

        {/* ── Ce qui nous distingue ── */}
        <Section
          eyebrow="Ce qui nous rend différents"
          title="Deux petites choses qui changent tout"
          tone="tint"
        >
          <FeatureGrid items={differenceItems} cols={4} />
        </Section>

        {/* ── Ce que nous personnalisons ── */}
        <Section
          eyebrow="Notre savoir-faire"
          title="Ce qu'on aime faire"
          intro="Flocage, marquage et impression sur à peu près tout ce qui se porte — avec des finitions soignées."
        >
          <FeatureGrid items={services} cols={4} />
          <div className="mt-10">
            <Prose>
              <p>
                On applique noms, prénoms, numéros, logos et visuels sur t-shirts, sweats, polos,
                maillots, vestes, casquettes et accessoires. Pas sûr de la bonne technique ? C&apos;est
                normal, et c&apos;est notre métier : on vous oriente vers ce qui rendra le mieux.
                Curieux ? Jetez un œil à <a href="/flocage-textile-alsace">notre savoir-faire de
                flocage et marquage</a>.
              </p>
            </Prose>
          </div>
        </Section>

        {/* ── Sans minimum ── */}
        <Section eyebrow="Promesse n°1" title="Une seule pièce ? Avec plaisir.">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Prose>
              <p>
                Vous voulez <strong>un seul</strong> t-shirt floqué, un sweat personnalisé à offrir, ou trois
                polos pour la boutique ? Parfait. On travaille <strong>sans minimum</strong>, parce
                qu&apos;une petite commande mérite autant d&apos;attention qu&apos;une grande.
              </p>
              <p>
                C&apos;est rare dans le métier, et c&apos;est un parti pris : ici, votre projet compte,
                quelle que soit sa taille.
              </p>
            </Prose>
            <div className="rounded-3xl bg-white p-8 ring-1 ring-brand-gray-dark shadow-soft">
              <h3 className="font-display text-xl font-bold text-brand-black mb-5">Parfait pour…</h3>
              <CheckList
                items={[
                  'Une pièce unique à offrir',
                  'Un petit lot pour une équipe ou un commerce',
                  'Un essai avant de commander davantage',
                  'Un petit complément à une commande passée',
                ]}
              />
            </div>
          </div>
        </Section>

        {/* ── Espace réassort ── */}
        <Section eyebrow="Promesse n°2" title="Votre petit espace réassort, sans stock" tone="tint">
          <StepList
            steps={[
              { title: 'On garde vos modèles', description: 'Vos textiles personnalisés sont enregistrés dans un espace à votre nom.' },
              { title: 'Vous avez votre code', description: 'Un simple code, et vous voilà chez vous, quand vous voulez.' },
              { title: 'Vous recommandez tranquille', description: "À l'unité, sans repasser par un devis, sans rien stocker." },
            ]}
          />
          <div className="mt-10">
            <Prose>
              <p>
                Fini les cartons qui dorment « au cas où ». Avec votre <strong>espace réassort</strong>,
                vous recommandez juste ce qu&apos;il faut, au moment où il le faut. On s&apos;occupe du
                reste. <a href="/reassort-a-la-demande">On vous explique tout ici</a>.
              </p>
            </Prose>
          </div>
        </Section>

        {/* ── Pour qui ── */}
        <Section eyebrow="Pour qui" title="On travaille avec tout le monde">
          <FeatureGrid items={audiences} cols={4} />
        </Section>

        {/* ── Témoignages ── */}
        <Section eyebrow="On nous fait confiance" title="Ce qu'on nous dit" center>
          <Testimonials items={testimonials} />
        </Section>

        {/* ── FAQ ── */}
        <FaqSection items={faq} title="Vos questions (et nos réponses)" />

        {/* ── Maillage interne ── */}
        <RelatedLinks links={relatedLinks} title="Pour faire connaissance" />

        {/* ── CTA ── */}
        <CTASection
          title="On se rencontre ?"
          text="Un projet, une idée, une simple question ? Écrivez-nous un petit mot — on adore en discuter, et on répond vite."
          primary={{ label: 'Nous écrire', href: '/contact' }}
          secondary={{ label: 'Notre histoire', href: '/a-propos' }}
        />
      </main>

      <Footer />
    </div>
  )
}
