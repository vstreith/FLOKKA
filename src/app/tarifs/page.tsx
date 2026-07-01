import type { Metadata } from 'next'
import { Info, PackageOpen, Repeat, Ruler } from 'lucide-react'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { PageHero, Section, Prose, FeatureGrid, FaqSection, CTASection, RelatedLinks } from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/JsonLd'
import { pageMetadata, webPageSchema } from '@/lib/seo'

const PATH = '/tarifs'

export const metadata: Metadata = pageMetadata({
  title: 'Tarifs flocage textile — clairs et transparents',
  description:
    "Nos tarifs de flocage textile, en toute transparence : prix selon la taille du flocage, dégressif à la quantité, dès une pièce et sans minimum. Devis gratuit. Centre Alsace.",
  path: PATH,
  keywords: ['tarif flocage', 'prix flocage textile', 'tarif flocage maillot', 'flocage prix Alsace'],
})

// Grille indicative (à confirmer). Prix du flocage par marquage, hors textile.
const priceRows = [
  { label: 'Petit flocage', detail: 'prénom, initiales, ≤ 10 cm', p1: '6 €', p10: '5 €', p25: '4 €' },
  { label: 'Flocage moyen', detail: 'logo poitrine, format A5/A4', p1: '9 €', p10: '7 €', p25: '6 €' },
  { label: 'Grand flocage', detail: 'visuel dos, format A3', p1: '13 €', p10: '11 €', p25: '9 €' },
  { label: 'Nom + numéro', detail: 'maillot de sport', p1: '11 €', p10: '9 €', p25: '7 €' },
]

const faq = [
  {
    question: 'Y a-t-il un minimum de commande ?',
    answer:
      "Non, aucun. On floque dès une seule pièce. Le prix unitaire baisse simplement quand la quantité augmente (dégressif).",
  },
  {
    question: 'Le textile est-il compris dans ces prix ?',
    answer:
      "Non : ces tarifs concernent le flocage seul (le marquage). Vous pouvez apporter votre propre textile, ou on vous le fournit — dans ce cas, le prix du vêtement s'ajoute, en toute transparence sur le devis.",
  },
  {
    question: 'Ces prix sont-ils fermes ?',
    answer:
      "Ce sont des tarifs indicatifs pour vous donner un ordre d'idée. Le prix exact dépend de la taille du visuel, du nombre de couleurs et de la quantité. On vous fait un devis clair et gratuit avant toute commande.",
  },
  {
    question: 'Comment obtenir un prix précis ?',
    answer:
      "Envoyez-nous votre visuel et la quantité souhaitée : on vous répond vite avec un devis détaillé, sans engagement.",
  },
]

export default function TarifsPage() {
  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'Tarifs', path: PATH },
  ]
  return (
    <MarketingLayout>
      <JsonLd
        data={webPageSchema({
          title: 'Tarifs flocage textile | FLOKKA',
          description: 'Tarifs de flocage textile transparents, dégressifs à la quantité, dès une pièce.',
          path: PATH,
        })}
      />
      <PageHero
        eyebrow="Tarifs"
        title="Nos tarifs, en toute transparence"
        breadcrumbs={crumbs}
        intro={
          <>
            On préfère jouer franc jeu : voici comment on fixe nos prix de <strong>flocage</strong>.
            Pas de minimum, un tarif <strong>dégressif</strong> à la quantité, et un devis clair
            avant toute commande.
          </>
        }
        primary={{ label: 'Demander un devis', href: '/contact' }}
      />

      <Section eyebrow="Comment ça marche" title="Un prix simple à comprendre">
        <FeatureGrid
          cols={3}
          items={[
            { icon: Ruler, title: 'Selon la taille', description: 'Plus le flocage est grand, plus il demande de matière et de temps.' },
            { icon: PackageOpen, title: 'Dès 1 pièce', description: 'Aucun minimum. Le prix unitaire baisse avec la quantité.' },
            { icon: Repeat, title: 'Réassort au même prix', description: 'Vos réassorts suivent la même grille, sans surprise.' },
          ]}
        />
      </Section>

      <Section eyebrow="La grille" title="Tarifs de flocage (hors textile)" tone="tint">
        <div className="max-w-4xl overflow-x-auto rounded-3xl bg-white ring-1 ring-brand-gray-dark shadow-soft">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-brand-gray-dark bg-brand-gradient-soft">
                <th scope="col" className="px-5 py-4 font-display font-bold text-brand-black">Type de flocage</th>
                <th scope="col" className="px-5 py-4 font-semibold text-brand-black text-right">1 à 9</th>
                <th scope="col" className="px-5 py-4 font-semibold text-brand-black text-right">10 à 24</th>
                <th scope="col" className="px-5 py-4 font-semibold text-brand-black text-right">25 et +</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gray-dark">
              {priceRows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="px-5 py-4 font-semibold text-brand-black">
                    {r.label}
                    <span className="block font-normal text-brand-gray-text text-xs mt-0.5">{r.detail}</span>
                  </th>
                  <td className="px-5 py-4 text-right text-brand-gray-text">{r.p1}</td>
                  <td className="px-5 py-4 text-right text-brand-gray-text">{r.p10}</td>
                  <td className="px-5 py-4 text-right font-bold text-gradient">{r.p25}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5 max-w-4xl flex items-start gap-3 rounded-2xl bg-white ring-1 ring-brand-gray-dark p-4 text-sm text-brand-gray-text">
          <Info size={18} className="text-brand-navy shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            <strong className="text-brand-black">Tarifs indicatifs</strong>, prix par flocage, hors
            textile. Le prix final dépend du visuel (taille, nombre de couleurs) et de la quantité.
            Devis exact gratuit et sans engagement.
          </p>
        </div>
      </Section>

      <Section eyebrow="Exemples" title="Quelques exemples concrets">
        <Prose>
          <ul>
            <li>Un prénom floqué sur votre propre t-shirt : à partir de 6 €.</li>
            <li>Un logo de club (poitrine) sur 15 sweats : 7 € de flocage par sweat.</li>
            <li>Nom + numéro sur 20 maillots : 9 € par maillot.</li>
          </ul>
          <p>
            Besoin qu&apos;on fournisse aussi le textile ? Pas de souci : on vous propose des
            vêtements de qualité et on détaille tout, ligne par ligne, sur le devis. Vous pouvez
            aussi apporter vos propres textiles.
          </p>
        </Prose>
      </Section>

      <FaqSection items={faq} title="Questions sur les tarifs" />

      <RelatedLinks
        links={[
          { title: 'Notre flocage flex', description: 'Le détail de notre matériel et de notre méthode.', href: '/flocage-textile-alsace' },
          { title: 'Le réassort à la demande', description: 'Recommandez à l\'unité, aux mêmes tarifs.', href: '/reassort-a-la-demande' },
          { title: 'Nous écrire', description: 'Un visuel + une quantité = un devis rapide.', href: '/contact' },
        ]}
      />

      <CTASection
        title="Envie d'un devis précis ?"
        text="Envoyez-nous votre visuel et la quantité : on vous chiffre ça vite et clairement."
        primary={{ label: 'Demander un devis', href: '/contact' }}
      />
    </MarketingLayout>
  )
}
