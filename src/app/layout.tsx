import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

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
    <html lang="fr" className={inter.variable}>
      <body className="antialiased" style={{ backgroundColor: '#FCFBF8', color: '#1b1b1b' }}>{children}</body>
    </html>
  )
}
