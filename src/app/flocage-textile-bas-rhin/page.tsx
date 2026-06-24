import type { Metadata } from 'next'
import { LocalAreaTemplate } from '@/components/marketing/LocalAreaTemplate'
import { getLocalArea } from '@/lib/local-areas'
import { pageMetadata } from '@/lib/seo'

const area = getLocalArea('/flocage-textile-bas-rhin')!

export const metadata: Metadata = pageMetadata({
  title: area.title,
  description: area.description,
  path: area.slug,
  keywords: area.keywords,
})

export default function Page() {
  return <LocalAreaTemplate area={area} />
}
