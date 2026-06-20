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
    sm: { icon: 36, text: 'text-lg' },
    md: { icon: 48, text: 'text-2xl' },
    lg: { icon: 64, text: 'text-4xl' },
  }
  const s = sizes[size]
  const color = dark ? '#0A0A0A' : '#FFFFFF'

  const logo = (
    <div className={cn('flex flex-col items-start gap-1', className)}>
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stylized F icon */}
        {/* Top horizontal bar */}
        <rect x="0" y="0" width="100" height="32" fill={color} />
        {/* Left vertical bar */}
        <rect x="0" y="0" width="33" height="110" fill={color} />
        {/* Arch cutout at inner top corner — concave quarter-circle */}
        <circle cx="33" cy="32" r="22" fill={dark ? '#FFFFFF' : '#0A0A0A'} />
        {/* Restore the top bar above the arch */}
        <rect x="33" y="0" width="67" height="10" fill={color} />
        {/* Middle horizontal bar */}
        <rect x="0" y="58" width="70" height="25" fill={color} />
      </svg>
      <span
        className={cn(
          s.text,
          'font-black tracking-[0.25em] uppercase leading-none',
          dark ? 'text-brand-black' : 'text-white'
        )}
      >
        FLOKKA
      </span>
    </div>
  )

  if (href) {
    return <Link href={href}>{logo}</Link>
  }

  return logo
}
