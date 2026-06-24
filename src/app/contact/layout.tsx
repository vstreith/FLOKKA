import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Contact — Créez la boutique textile de votre structure',
  description:
    "Contactez FLOKKA pour créer la boutique textile privée de votre club ou association. Atelier à Andlau (Bas-Rhin), réponse rapide, devis sans engagement, fabrication en Alsace.",
  path: '/contact',
  keywords: ['contact FLOKKA', 'devis textile club', 'créer boutique association', 'contact flocage Alsace'],
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
