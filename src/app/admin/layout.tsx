import type { Metadata } from 'next'

export const metadata: Metadata = { title: { template: '%s | Admin FLOKKA', default: 'Admin' } }

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children
}
