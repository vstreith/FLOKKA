import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Mon espace réassort — accès client',
  description:
    "Accédez à votre espace client FLOKKA avec votre code. Recommandez votre textile personnalisé en réassort à la demande, à l'unité, sans stock. Atelier en Centre Alsace.",
  path: '/boutique-privee',
  keywords: ['espace client textile', "code d'accès réassort", 'réassort textile à la demande'],
})

export default function BoutiquePriveeLayout({ children }: { children: React.ReactNode }) {
  return children
}
