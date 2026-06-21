'use client'

import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Logo FLOKKA — votre vrai logo (version bleu marine).
 *
 * Déposez UN seul fichier : `public/brand/logo.svg` (idéal, vectoriel) ou
 * `public/brand/logo.png` (PNG transparent haute résolution).
 *  - Sur fond clair (header, boutiques) : le logo s'affiche tel quel.
 *  - Sur fond foncé (footer) : il est automatiquement rendu en blanc
 *    (filtre CSS), inutile de fournir une seconde version.
 *
 * Tant qu'aucun fichier n'est présent, on affiche proprement le mot
 * « FLOKKA » (aucun visuel cassé).
 */
const LOGO_SOURCES = ['/brand/logo.png', '/brand/logo.svg']

interface FlokkaLogoProps {
  className?: string
  href?: string
  /** true = sur fond clair (logo marine) ; false = sur fond foncé (logo blanchi). */
  dark?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function FlokkaLogo({ className, href = '/', dark = true, size = 'md' }: FlokkaLogoProps) {
  const [srcIndex, setSrcIndex] = useState(0)

  const heights = { sm: 40, md: 48, lg: 72 }
  const textSizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' }
  const h = heights[size]
  const exhausted = srcIndex >= LOGO_SOURCES.length

  const content = !exhausted ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SOURCES[srcIndex]}
      alt="FLOKKA"
      onError={() => setSrcIndex((i) => i + 1)}
      style={{
        height: h,
        width: 'auto',
        // Sur fond foncé, on blanchit le logo monochrome (pas besoin d'un 2e fichier).
        ...(dark ? {} : { filter: 'brightness(0) invert(1)' }),
      }}
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
