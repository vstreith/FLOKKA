'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Store } from 'lucide-react'
import { FlokkaLogo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/a-propos', label: 'À propos' },
  { href: '/services', label: 'Services' },
  { href: '/partenaires', label: 'Partenaires' },
  { href: '/contact', label: 'Contact' },
]

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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        scrolled
          ? 'border-b border-brand-gray-dark shadow-sm'
          : 'border-b border-brand-gray-dark'
      )}
      style={{ backgroundColor: '#FCFBF8' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <FlokkaLogo size="sm" href="/" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium tracking-wide transition-colors hover:text-brand-black',
                  pathname === link.href
                    ? 'text-brand-black'
                    : 'text-brand-gray-text'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/boutique-privee"
              className="hidden md:inline-flex items-center gap-2 bg-brand-black text-white text-sm font-semibold px-4 py-2 hover:bg-gray-800 transition-colors"
            >
              <Store size={14} />
              Boutique privée
            </Link>
            <button
              className="md:hidden p-2"
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
        <div className="md:hidden border-t border-brand-gray-dark animate-fade-in" style={{ backgroundColor: '#FCFBF8' }}>
          <div className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-base font-medium py-1 border-b border-brand-gray-dark pb-3',
                  pathname === link.href ? 'text-brand-black' : 'text-brand-gray-text'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/boutique-privee"
              className="inline-flex items-center justify-center gap-2 bg-brand-black text-white text-sm font-semibold px-4 py-3 mt-2"
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
