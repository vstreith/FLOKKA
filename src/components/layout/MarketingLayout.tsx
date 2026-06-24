import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

/** Coquille standard des pages marketing : header fixe + main + footer. */
export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  )
}
