'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Store } from 'lucide-react'
import { FlokkaLogo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'
import { MAIN_NAV as navLinks } from '@/lib/navigation'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass',
        scrolled ? 'border-b border-white/40 shadow-soft' : 'border-b border-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <FlokkaLogo size="sm" href="/" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-sm font-medium tracking-wide px-4 py-2 rounded-full transition-all',
                    active
                      ? 'text-brand-violet-dark bg-brand-gray'
                      : 'text-brand-gray-text hover:text-brand-black hover:bg-white/60',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* CTA + Mobile menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/boutique-privee"
              className="hidden md:inline-flex items-center gap-2 bg-brand-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
            >
              <Store size={14} />
              Boutique privée
            </Link>
            <button
              className="md:hidden p-2 rounded-full hover:bg-white/60 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/40 glass animate-fade-in">
          <div className="px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-base font-medium py-2.5 px-4 rounded-xl transition-colors',
                  pathname === link.href
                    ? 'text-brand-violet-dark bg-brand-gray'
                    : 'text-brand-gray-text hover:bg-white/60',
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/boutique-privee"
              className="inline-flex items-center justify-center gap-2 bg-brand-gradient text-white text-sm font-semibold px-4 py-3 mt-2 rounded-full shadow-soft"
            >
              <Store size={14} />
              Boutique privée
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
