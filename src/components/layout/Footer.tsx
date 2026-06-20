import Link from 'next/link'
import { FlokkaLogo } from '@/components/ui/Logo'
import { MapPin, Mail, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-brand-black text-white mt-auto">
      {/* Marquee */}
      <div className="border-b border-white/10 overflow-hidden py-3">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-sm font-medium tracking-widest uppercase mx-8 opacity-60">
              FLOKKA · Atelier textile · Andlau · Flocage à la demande · Réassort à l&apos;unité ·
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
            <h4 className="text-xs font-bold tracking-widest uppercase mb-5 text-white/40">Navigation</h4>
            <ul className="space-y-3">
              {[
                { href: '/a-propos', label: 'À propos' },
                { href: '/services', label: 'Services' },
                { href: '/partenaires', label: 'Partenaires' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Espaces */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-5 text-white/40">Espaces</h4>
            <ul className="space-y-3">
              {[
                { href: '/boutique-privee', label: 'Boutique privée' },
                { href: '/contact', label: 'Contact' },
                { href: '/mentions-legales', label: 'Mentions légales & CGV' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-5 text-white/40">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/70">
                <MapPin size={14} className="shrink-0" />
                Andlau, Alsace
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail size={14} className="shrink-0" />
                <a href="mailto:contact@flokka.fr" className="hover:text-white transition-colors">
                  contact@flokka.fr
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone size={14} className="shrink-0" />
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
