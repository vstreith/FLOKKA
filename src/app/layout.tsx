import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'
import { JsonLd } from '@/components/seo/JsonLd'
import { SITE, organizationSchema, localBusinessSchema, websiteSchema } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Textile personnalisé pour clubs et associations | FLOKKA',
    template: '%s | FLOKKA',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [
    'textile personnalisé club sportif',
    'boutique club sportif',
    'boutique association',
    'vêtements personnalisés association',
    'textile personnalisé Alsace',
    'flocage textile Alsace',
    'boutique privée club',
    'vêtements personnalisés club sportif',
    'textile personnalisé Bas-Rhin',
  ],
  alternates: { canonical: SITE.url },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: 'Textile personnalisé pour clubs et associations | FLOKKA',
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: SITE.ogImageWidth, height: SITE.ogImageHeight, alt: SITE.name }],
  },
  twitter: { card: 'summary_large_image', site: SITE.twitter, creator: SITE.twitter },
  category: 'business',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${sora.variable}`}>
      <body className="antialiased" style={{ backgroundColor: '#F6F4EC', color: '#15243B' }}>
        <JsonLd data={[organizationSchema(), localBusinessSchema(), websiteSchema()]} />
        {children}
      </body>
    </html>
  )
}
