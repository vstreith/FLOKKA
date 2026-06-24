import Link from 'next/link'
import { FlokkaLogo } from '@/components/ui/Logo'
import { MapPin, Mail, Phone } from 'lucide-react'
import { FOOTER_NAV } from '@/lib/navigation'
import { SITE } from '@/lib/seo'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dark-gradient text-white mt-auto">
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-brand-violet/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 w-80 h-80 rounded-full bg-brand-pink/6 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <FlokkaLogo size="md" href="/" dark={false} />
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
              Atelier de personnalisation textile à Andlau (Bas-Rhin). Boutiques privées pour clubs
              sportifs et associations, réassort à l&apos;unité, fabrication locale en Alsace.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/70">
                <MapPin size={14} className="shrink-0 text-brand-pink" aria-hidden="true" />
                {SITE.address.city}, {SITE.address.regionShort} ({SITE.address.postalCode})
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail size={14} className="shrink-0 text-brand-cyan" aria-hidden="true" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone size={14} className="shrink-0 text-brand-amber" aria-hidden="true" />
                <a href={`tel:${SITE.phoneE164}`} className="hover:text-white transition-colors">
                  {SITE.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {FOOTER_NAV.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-xs font-bold tracking-widest uppercase mb-5 text-white/50">{col.title}</h2>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} FLOKKA — Tous droits réservés.</p>
          <div className="flex items-center gap-5">
            <Link href="/mentions-legales" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Mentions légales &amp; CGV
            </Link>
            <Link href="/admin" className="text-xs text-white/20 hover:text-white/40 transition-colors">
              Administration
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
