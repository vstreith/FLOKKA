import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema, type Crumb } from '@/lib/seo'

/** Fil d'Ariane accessible + JSON-LD BreadcrumbList. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm">
      <JsonLd data={breadcrumbSchema(items)} />
      <ol className="flex flex-wrap items-center gap-1.5 text-brand-gray-text">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={13} className="text-brand-gray-medium" aria-hidden="true" />}
              {last ? (
                <span aria-current="page" className="font-semibold text-brand-black">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-brand-violet-dark transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
