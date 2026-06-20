import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const sora = Sora({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-display' })

export const metadata: Metadata = {
  title: {
    default: 'FLOKKA — Atelier de personnalisation textile à Andlau',
    template: '%s | FLOKKA',
  },
  description:
    "FLOKKA est un atelier de personnalisation textile à Andlau. Boutiques privées pour clubs, associations et structures locales. Réassort à la demande, même à l'unité.",
  keywords: ['flocage', 'textile personnalisé', 'Andlau', 'Alsace', 'clubs', 'associations', 'boutique privée'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${sora.variable}`}>
      <body className="antialiased" style={{ backgroundColor: '#F6F4EC', color: '#15243B' }}>{children}</body>
    </html>
  )
}
