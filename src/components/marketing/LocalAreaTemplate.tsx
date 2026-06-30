import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { PageHero, Section, Prose, FaqSection, CTASection, RelatedLinks } from '@/components/marketing/sections'
import { JsonLd } from '@/components/seo/JsonLd'
import { webPageSchema } from '@/lib/seo'
import { LOCAL_AREAS, type LocalArea } from '@/lib/local-areas'

export function LocalAreaTemplate({ area }: { area: LocalArea }) {
  const crumbs = [
    { name: 'Accueil', path: '/' },
    { name: 'Centre Alsace', path: '/textile-personnalise-alsace' },
    { name: area.city, path: area.slug },
  ]

  // Maillage : autres zones + pages piliers (en excluant la page courante).
  const otherAreas = LOCAL_AREAS.filter((a) => a.slug !== area.slug)
    .slice(0, 2)
    .map((a) => ({ title: a.label, description: a.title, href: a.slug }))

  const related = [
    ...otherAreas,
    { title: 'Textile personnalisé en Alsace', description: "L'offre régionale complète.", href: '/textile-personnalise-alsace' },
  ]

  return (
    <MarketingLayout>
      <JsonLd
        data={webPageSchema({ title: `${area.title} | FLOKKA`, description: area.description, path: area.slug })}
      />
      <PageHero
        eyebrow={`Zone desservie · ${area.city}`}
        title={area.h1}
        breadcrumbs={crumbs}
        intro={area.lead}
        primary={{ label: 'Demander un devis', href: '/contact' }}
        secondary={{ label: 'Nos services', href: '/services' }}
      />

      {area.sections.map((s, i) => (
        <Section key={s.h2} title={s.h2} tone={i % 2 === 1 ? 'tint' : 'light'}>
          <Prose>
            {s.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
            {s.list && (
              <ul>
                {s.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
          </Prose>
        </Section>
      ))}

      <FaqSection items={area.faq} />

      <RelatedLinks links={related} />

      <CTASection
        title={`Un projet textile à ${area.city} ?`}
        text="Écrivez-nous un petit mot : on habite le coin, on répond vite et avec le sourire."
        primary={{ label: 'Nous écrire', href: '/contact' }}
      />
    </MarketingLayout>
  )
}
