'use client'

import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Logo FLOKKA.
 *
 * Pour utiliser le vrai logo, déposez vos fichiers dans `public/brand/` :
 *   - `public/brand/logo.svg`        → version foncée (pour fonds clairs : header, boutiques)
 *   - `public/brand/logo-white.svg`  → version claire (pour fonds foncés : footer)
 * (Le format SVG est idéal ; un PNG transparent haute résolution fonctionne aussi —
 *  dans ce cas renommez en `logo.png` / `logo-white.png` et changez LOGO_* ci-dessous.)
 *
 * Tant qu'aucun fichier n'est présent, on affiche proprement le mot « FLOKKA »
 * (aucun visuel cassé).
 */
const LOGO_LIGHT_BG = '/brand/logo.svg' // logo foncé, sur fond clair
const LOGO_DARK_BG = '/brand/logo-white.svg' // logo clair, sur fond foncé

interface FlokkaLogoProps {
  className?: string
  href?: string
  /** true = sur fond clair (logo foncé) ; false = sur fond foncé (logo clair). */
  dark?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function FlokkaLogo({ className, href = '/', dark = true, size = 'md' }: FlokkaLogoProps) {
  const [imgOk, setImgOk] = useState(true)

  const heights = { sm: 30, md: 40, lg: 56 }
  const textSizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' }
  const h = heights[size]
  const src = dark ? LOGO_LIGHT_BG : LOGO_DARK_BG

  const content = imgOk ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="FLOKKA"
      onError={() => setImgOk(false)}
      style={{ height: h, width: 'auto' }}
      className={cn('block w-auto object-contain', className)}
    />
  ) : (
    <span
      className={cn(
        textSizes[size],
        'font-display font-extrabold uppercase leading-none',
        dark ? 'text-brand-black' : 'text-brand-white',
        className,
      )}
      style={{ letterSpacing: '0.22em' }}
    >
      FLOKKA
    </span>
  )

  if (href) {
    return (
      <Link href={href} aria-label="FLOKKA — Accueil" className="inline-flex items-center">
        {content}
      </Link>
    )
  }

  return content
}
