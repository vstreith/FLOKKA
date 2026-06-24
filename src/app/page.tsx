import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  Store,
  Repeat,
  MapPin,
  PiggyBank,
  ShieldCheck,
  Trophy,
  Users,
  Palette,
  Zap,
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
  title: 'Textile personnalisé pour clubs et associations | FLOKKA',
  description:
    "Créez une boutique textile privée pour votre club ou association. Réassort à l'unité, sans gestion de stock, fabrication locale en Alsace (Andlau, Bas-Rhin). Livraison partout en France.",
  path: '/',
  keywords: [
    'textile personnalisé club sportif',
    'boutique club sportif',
    'boutique association',
    'boutique privée club',
    "réassort à l'unité",
    'textile personnalisé Alsace',
    'textile personnalisé Bas-Rhin',
    'flocage textile Alsace',
  ],
})

const reasons = [
  { icon: PiggyBank, title: 'Zéro avance de trésorerie', description: "Aucune commande groupée à financer. Chaque membre paie sa propre pièce." },
  { icon: Repeat, title: "Réassort à l'unité", description: "Une seule pièce, à tout moment : un nouveau membre n'attend plus la commande annuelle." },
  { icon: MapPin, title: 'Fabrication locale', description: "Tout est produit dans notre atelier d'Andlau, en Alsace, avec un interlocuteur unique." },
  { icon: ShieldCheck, title: 'Qualité maîtrisée', description: 'Flocage, impression et broderie soignés, finitions homogènes saison après saison.' },
]

const steps = [
  { title: 'Une boutique dédiée', description: "On crée la boutique de votre structure avec vos produits, vos couleurs et un code d'accès unique." },
  { title: 'Les membres commandent', description: 'Chacun commande son article quand il veut, à son nom, avec sa taille, sans minimum.' },
  { title: "Réassort à l'unité", description: "Chaque commande est floquée et expédiée à l'unité, directement chez le membre." },
]

const clubBenefits = [
  'Maillots, survêtements, sweats et polos aux couleurs du club',
  'Personnalisation nom et numéro pour chaque licencié',
  'Intégration des nouveaux joueurs en cours de saison',
  'Image homogène et professionnelle sur et hors du terrain',
]

const assoBenefits = [
  "Une marge optionnelle reversée à l'association sur chaque vente",
  'Textiles pour les bénévoles, le bureau et les événements',
  'Aucun stock ni invendu à gérer dans le local',
  "Un financement complémentaire simple et récurrent",
]

const testimonials = [
  { quote: "Enfin une solution sans avancer 2 000 € de commande. Nos licenciés commandent seuls, on ne gère plus rien.", author: 'Club de handball', role: 'Bas-Rhin' },
  { quote: "La marge reversée finance une partie de notre matériel. Et zéro carton d'invendus dans le local.", author: 'Association locale', role: 'Alsace' },
  { quote: 'Un nouveau joueur arrive ? Il a son maillot floqué en quelques jours. Parfait pour nous.', author: 'Club de football', role: 'Andlau' },
]

const faq = [
  {
    question: "Qu'est-ce qu'une boutique textile privée FLOKKA ?",
    answer:
      "C'est une boutique en ligne réservée à votre club ou association, accessible via un code. Elle regroupe vos produits personnalisés à vos couleurs. Chaque membre y commande directement ce qu'il souhaite, sans que la structure n'avance d'argent ni ne gère de stock.",
  },
  {
    question: "Qu'est-ce que le réassort à l'unité ?",
    answer:
      "C'est la possibilité de commander une seule pièce à la fois, à tout moment. Plutôt que de produire un gros volume une fois par an, nous fabriquons chaque article au moment où il est commandé. Aucun minimum, aucun invendu.",
  },
  {
    question: 'Faut-il gérer un stock de vêtements ?',
    answer:
      "Non. C'est tout l'intérêt du modèle : il n'y a aucun stock à gérer. Chaque pièce est produite à la demande puis expédiée directement au membre qui l'a commandée.",
  },
  {
    question: 'Où sont fabriqués les textiles ?',
    answer:
      "Dans notre atelier d'Andlau, dans le Bas-Rhin (Alsace). Le flocage, l'impression et la broderie y sont réalisés localement, avec un interlocuteur unique pour votre structure.",
  },
  {
    question: 'Livrez-vous partout en France ?',
    answer:
      'Oui. Même si notre atelier est en Alsace, nous expédions les commandes partout en France, directement au domicile de chaque membre.',
  },
  {
    question: 'Une association peut-elle gagner de l\'argent avec sa boutique ?',
    answer:
      "Oui. Vous pouvez définir une marge reversée à votre structure, ajoutée automatiquement au prix affiché. Chaque vente génère alors un revenu pour l'association, sans aucune avance.",
  },
]

const relatedLinks = [
  { title: 'Boutique pour club sportif', description: 'La solution textile complète pour équiper votre club sans logistique.', href: '/clubs-sportifs' },
  { title: 'Boutique pour association', description: 'Habillez vos bénévoles et financez vos projets via une boutique privée.', href: '/associations' },
  { title: 'Flocage textile en Alsace', description: "Notre savoir-faire de marquage textile, au cœur du Bas-Rhin.", href: '/flocage-textile-alsace' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd
        data={[
          webPageSchema({
            title: 'Textile personnalisé pour clubs et associations | FLOKKA',
            description:
              "Boutique textile privée pour clubs et associations. Réassort à l'unité, sans stock, fabrication locale en Alsace.",
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
                  Atelier textile · Andlau, Alsace (Bas-Rhin)
                </span>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-brand-black mb-8">
                Textile personnalisé pour
                <br />
                <span className="text-gradient">clubs sportifs &amp; associations.</span>
              </h1>
              <p className="text-lg sm:text-xl text-brand-gray-text max-w-2xl leading-relaxed mb-10">
                FLOKKA crée la <strong className="text-brand-black">boutique privée</strong> de votre
                structure : vos membres commandent leur textile personnalisé quand ils veulent, en{' '}
                <strong className="text-brand-black">réassort à l&apos;unité</strong>. Aucune avance,
                aucun stock à gérer. Fabrication locale en Alsace, livraison partout en France.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 bg-brand-gradient text-white font-semibold px-8 py-4 rounded-full text-sm tracking-wide shadow-glow hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Store size={16} />
                  Créer la boutique de ma structure
                </Link>
                <Link
                  href="/boutique-privee"
                  className="inline-flex items-center justify-center gap-2 bg-white text-brand-black font-semibold px-8 py-4 rounded-full ring-1 ring-brand-gray-medium hover:text-brand-violet-dark transition-all text-sm tracking-wide shadow-soft"
                >
                  Accéder à ma boutique privée
                  <ArrowRight size={16} />
                </Link>
              </div>

              <dl className="mt-16 grid grid-cols-3 gap-4 max-w-2xl">
                {[
                  { value: '0 €', label: 'À avancer pour la structure' },
                  { value: '1', label: "Pièce minimum (réassort à l'unité)" },
                  { value: 'Alsace', label: 'Fabrication locale, livraison France' },
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

        {/* ── Pourquoi FLOKKA ── */}
        <Section
          eyebrow="Pourquoi FLOKKA"
          title="Le textile des clubs et associations, enfin sans contraintes"
          intro="Équiper une structure en textile a longtemps été un casse-tête : avancer l'argent, collecter les tailles, stocker les cartons, gérer les invendus. FLOKKA supprime tout cela."
        >
          <div className="mb-12">
            <FeatureGrid items={reasons} cols={4} />
          </div>
          <Prose>
            <p>
              FLOKKA est un atelier de personnalisation textile basé à{' '}
              <strong>Andlau, dans le Bas-Rhin</strong>, au cœur de l&apos;Alsace. Notre métier :
              concevoir des <strong>boutiques textiles privées pour les clubs sportifs et les
              associations</strong>, afin qu&apos;ils puissent proposer des vêtements personnalisés à
              leurs membres sans aucune logistique. Maillots, sweats, polos, vestes, sacs : tout est
              floqué à vos couleurs et produit à la demande.
            </p>
            <p>
              La plupart des structures locales fonctionnent avec des bénévoles et une trésorerie
              limitée. Demander à un club de commander cent sweats d&apos;un coup, de les payer
              d&apos;avance, puis de les redistribuer, c&apos;est prendre un risque financier et y
              passer un temps précieux. Notre modèle de <strong>réassort à l&apos;unité</strong>{' '}
              renverse cette logique : on ne produit que ce qui est réellement commandé, pièce par
              pièce.
            </p>
          </Prose>
        </Section>

        {/* ── Comment fonctionne la boutique privée ── */}
        <Section
          eyebrow="Le concept"
          title="Comment fonctionne la boutique privée"
          intro="Trois étapes simples, de la création de la boutique à la livraison de chaque commande."
          tone="tint"
        >
          <StepList steps={steps} />
          <div className="mt-10">
            <Prose>
              <p>
                Concrètement, nous mettons en place une <strong>boutique en ligne dédiée</strong> à
                votre structure, protégée par un code d&apos;accès que vous distribuez à vos membres.
                Chaque licencié ou adhérent s&apos;y connecte, choisit ses produits, indique sa
                taille et, le cas échéant, son nom et son numéro. La commande nous parvient
                directement, nous la fabriquons puis nous l&apos;expédions. Le bureau du club ou de
                l&apos;association n&apos;a plus rien à gérer.
              </p>
            </Prose>
          </div>
        </Section>

        {/* ── Réassort à l'unité ── */}
        <Section eyebrow="Sans stock" title="Le réassort à l'unité, notre principe fondateur">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Prose>
              <p>
                Le <strong>réassort à l&apos;unité</strong> signifie qu&apos;une seule pièce peut
                être commandée à tout moment, sans minimum de quantité. C&apos;est ce qui distingue
                FLOKKA des commandes groupées classiques.
              </p>
              <p>
                Un nouveau membre rejoint le club en milieu de saison ? Il commande son maillot
                immédiatement. Un sweat est perdu ou devenu trop petit ? On en refait un seul. Plus
                besoin d&apos;attendre, plus besoin de surévaluer les quantités « au cas où ». Vous
                évitez ainsi les invendus, les mauvaises tailles et la trésorerie immobilisée.
              </p>
            </Prose>
            <div className="rounded-3xl bg-white p-8 ring-1 ring-brand-gray-dark shadow-soft">
              <h3 className="font-display text-xl font-bold text-brand-black mb-5">Ce que vous évitez</h3>
              <CheckList
                items={[
                  "L'avance d'une grosse commande groupée",
                  'Les cartons de textile invendu',
                  'La collecte fastidieuse des tailles',
                  'La redistribution des pièces aux membres',
                ]}
              />
            </div>
          </div>
        </Section>

        {/* ── Fabrication locale ── */}
        <Section eyebrow="Production locale" title="Une fabrication alsacienne, à Andlau" tone="tint">
          <Prose>
            <p>
              Tout est fabriqué dans notre <strong>atelier d&apos;Andlau</strong>, idéalement situé
              entre Barr, Obernai et Sélestat, dans le <strong>Bas-Rhin</strong>. Cette implantation
              locale nous permet de servir rapidement les structures de toute l&apos;Alsace tout en
              expédiant partout en France.
            </p>
            <p>
              Produire localement, c&apos;est garantir des <strong>finitions homogènes</strong>, des
              délais maîtrisés et un interlocuteur unique qui connaît votre dossier. C&apos;est aussi
              soutenir une production de proximité plutôt qu&apos;une fabrication délocalisée et
              anonyme.
            </p>
          </Prose>
        </Section>

        {/* ── Pour les clubs sportifs ── */}
        <Section eyebrow="Clubs sportifs" title="Pour les clubs sportifs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Prose>
                <p>
                  Football, handball, basket, gymnastique, cyclisme, badminton… Chaque{' '}
                  <strong>club sportif</strong> a besoin d&apos;une identité visuelle forte et
                  d&apos;équipements à ses couleurs. Avec une <strong>boutique club sportif</strong>{' '}
                  FLOKKA, vos licenciés s&apos;équipent en quelques clics, du maillot d&apos;entraînement
                  au sweat de supporter.
                </p>
              </Prose>
              <div className="mt-6">
                <CheckList items={clubBenefits} />
              </div>
              <Link
                href="/clubs-sportifs"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-violet-dark hover:gap-3 transition-all"
              >
                Découvrir la solution clubs sportifs <ArrowRight size={14} />
              </Link>
            </div>
            <FeatureGrid
              cols={2}
              items={[
                { icon: Trophy, title: 'Maillots & tenues', description: 'Aux couleurs du club, avec nom et numéro.' },
                { icon: Users, title: 'Pour tous les licenciés', description: 'Joueurs, staff, dirigeants et supporters.' },
                { icon: Repeat, title: 'Toute la saison', description: 'Boutique ouverte en continu, réassort immédiat.' },
                { icon: Zap, title: 'Mise en place rapide', description: 'Votre boutique prête sans effort de votre part.' },
              ]}
            />
          </div>
        </Section>

        {/* ── Pour les associations ── */}
        <Section eyebrow="Associations" title="Pour les associations" tone="tint">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FeatureGrid
              cols={2}
              items={[
                { icon: PiggyBank, title: 'Financement', description: 'Une marge reversée à votre association sur chaque vente.' },
                { icon: Palette, title: 'À vos couleurs', description: 'Textiles personnalisés pour bénévoles et événements.' },
                { icon: ShieldCheck, title: 'Sans risque', description: 'Aucun stock, aucun invendu, aucune avance.' },
                { icon: MapPin, title: 'Local & humain', description: 'Un atelier alsacien et un interlocuteur dédié.' },
              ]}
            />
            <div>
              <Prose>
                <p>
                  Pour une <strong>association</strong>, le textile personnalisé est à la fois un
                  outil d&apos;identité et un levier de <strong>financement</strong>. Avec une{' '}
                  <strong>boutique association</strong> FLOKKA, vous habillez vos bénévoles, créez
                  des t-shirts pour vos événements, et pouvez reverser une marge à votre structure
                  sur chaque commande.
                </p>
              </Prose>
              <div className="mt-6">
                <CheckList items={assoBenefits} />
              </div>
              <Link
                href="/associations"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-violet-dark hover:gap-3 transition-all"
              >
                Découvrir la solution associations <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </Section>

        {/* ── Témoignages ── */}
        <Section eyebrow="Ils nous font confiance" title="Ce que disent les structures locales" center>
          <Testimonials items={testimonials} />
        </Section>

        {/* ── FAQ ── */}
        <FaqSection items={faq} />

        {/* ── Maillage interne ── */}
        <RelatedLinks links={relatedLinks} />

        {/* ── CTA ── */}
        <CTASection
          title="Votre club ou association mérite sa propre boutique"
          text="Discutons de votre projet. On met en place votre boutique privée, simplement et sans engagement."
          primary={{ label: 'Démarrer un projet', href: '/contact' }}
          secondary={{ label: 'Voir nos services', href: '/services' }}
        />
      </main>

      <Footer />
    </div>
  )
}
