import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Accès à votre boutique privée',
  description:
    "Accédez à la boutique privée de votre club ou association avec votre code d'accès. Commandez votre textile personnalisé en réassort à l'unité, livré partout en France.",
  path: '/boutique-privee',
  keywords: ['boutique privée', "code d'accès boutique", 'accès boutique club'],
})

export default function BoutiquePriveeLayout({ children }: { children: React.ReactNode }) {
  return children
}
