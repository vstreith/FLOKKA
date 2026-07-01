import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Nous contacter — un petit atelier textile à Andlau',
  description:
    "Une idée de textile personnalisé ? Écrivez à FLOKKA, petit atelier tenu par un couple à Andlau (Centre Alsace). Réponse rapide, conseils sincères, devis sans engagement.",
  path: '/contact',
  keywords: ['contact FLOKKA', 'atelier textile Andlau', 'devis flocage Alsace', 'personnalisation textile contact'],
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
