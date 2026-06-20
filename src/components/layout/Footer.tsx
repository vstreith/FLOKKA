import Link from 'next/link'
import { FlokkaLogo } from '@/components/ui/Logo'
import { MapPin, Mail, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dark-gradient text-white mt-auto">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-brand-violet/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 w-80 h-80 rounded-full bg-brand-pink/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <FlokkaLogo size="md" href="/" dark={false} />
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
              Atelier de personnalisation textile à la demande, à Andlau. Pensé pour les clubs,
              associations et structures locales.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-5 text-brand-pink">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/a-propos', label: 'À propos' },
                { href: '/services', label: 'Services' },
                { href: '/partenaires', label: 'Partenaires' },
              ].map((link) => (
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
          </div>

          {/* Espaces */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-5 text-brand-cyan">Espaces</h4>
            <ul className="space-y-3">
              {[
                { href: '/boutique-privee', label: 'Boutique privée' },
                { href: '/contact', label: 'Contact' },
                { href: '/mentions-legales', label: 'Mentions légales & CGV' },
              ].map((link) => (
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
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-5 text-brand-amber">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/70">
                <MapPin size={14} className="shrink-0 text-brand-pink" />
                Andlau, Alsace
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail size={14} className="shrink-0 text-brand-cyan" />
                <a href="mailto:contact@flokka.fr" className="hover:text-white transition-colors">
                  contact@flokka.fr
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone size={14} className="shrink-0 text-brand-amber" />
                <a href="tel:0600000000" className="hover:text-white transition-colors">
                  06 00 00 00 00
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© 2026 FLOKKA — Tous droits réservés.</p>
          <Link href="/admin" className="text-xs text-white/20 hover:text-white/40 transition-colors">
            Administration
          </Link>
        </div>
      </div>
    </footer>
  )
}
