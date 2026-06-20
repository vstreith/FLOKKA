'use client'

import Link from 'next/link'
import { useId } from 'react'
import { cn } from '@/lib/utils'

interface FlokkaLogoProps {
  className?: string
  href?: string
  dark?: boolean
  size?: 'sm' | 'md' | 'lg'
  /** Use the vibrant brand gradient for the mark + wordmark. Defaults to true. */
  gradient?: boolean
}

export function FlokkaLogo({
  className,
  href = '/',
  dark = true,
  size = 'md',
  gradient = true,
}: FlokkaLogoProps) {
  const gradId = useId()
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
  const solidColor = dark ? '#160f29' : '#FCFBFF'
  const fill = gradient ? `url(#${gradId})` : solidColor

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
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="110" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366f1" />
            <stop offset="0.5" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <path
          d="M 0 120 L 0 0 L 110 0 L 110 42 A 37.5 30 0 0 0 35 42 L 35 78 L 78 78 L 78 98 L 35 98 L 35 120 Z"
          fill={fill}
        />
      </svg>
      <span
        className={cn(
          textSizes[size],
          'font-display font-extrabold uppercase leading-none',
          gradient ? 'text-gradient' : dark ? 'text-brand-black' : 'text-brand-white',
        )}
        style={{ letterSpacing: '0.22em' }}
      >
        FLOKKA
      </span>
    </div>
  )

  if (href) {
    return (
      <Link href={href} aria-label="FLOKKA — Accueil">
        {logo}
      </Link>
    )
  }

  return logo
}
