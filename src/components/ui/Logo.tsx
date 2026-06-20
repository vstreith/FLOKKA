'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface FlokkaLogoProps {
  className?: string
  href?: string
  dark?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function FlokkaLogo({ className, href = '/', dark = true, size = 'md' }: FlokkaLogoProps) {
  const sizes = {
    sm: { width: 32, height: 36 },
    md: { width: 46, height: 52 },
    lg: { width: 66, height: 74 },
  }
  const textSizes = {
    sm: 'text-base',
    md: 'text-2xl',
    lg: 'text-4xl',
  }
  const s = sizes[size]
  const color = dark ? '#1b1b1b' : '#FCFBF8'

  /*
   * The Flokka F: a bold architectural letter with a distinctive
   * rounded arch (like a Romanesque doorway) at the inner top corner.
   *
   * Path (clockwise from bottom-left):
   * - Up the full left side
   * - Right along the top bar (full width)
   * - Down the right side of the top bar to y=42
   * - ARC counterclockwise (sweep=0) from (110,42) back to (35,42)
   *   going UP through (72.5,12) — this creates the arch ceiling
   * - Down the inner-right edge to the middle bar (y=78)
   * - Right along top of middle bar
   * - Down and left along middle bar bottom
   * - Down to bottom, close
   */
  const logo = (
    <div className={cn('flex flex-col items-start gap-0.5', className)}>
      <svg
        width={s.width}
        height={s.height}
        viewBox="0 0 110 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M 0 120 L 0 0 L 110 0 L 110 42 A 37.5 30 0 0 0 35 42 L 35 78 L 78 78 L 78 98 L 35 98 L 35 120 Z"
          fill={color}
        />
      </svg>
      <span
        className={cn(
          textSizes[size],
          'font-black uppercase leading-none',
          dark ? 'text-brand-black' : 'text-brand-white',
        )}
        style={{ letterSpacing: '0.22em' }}
      >
        FLOKKA
      </span>
    </div>
  )

  if (href) {
    return <Link href={href} aria-label="FLOKKA — Accueil">{logo}</Link>
  }

  return logo
}
