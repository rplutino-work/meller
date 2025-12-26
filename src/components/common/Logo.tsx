'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'horizontal' | 'vertical'
  size?: 'small' | 'medium' | 'large'
  className?: string
  showSubtitle?: boolean
  subtitle?: string
  href?: string
  borderColor?: 'black' | 'white'
}

export default function Logo({
  variant = 'horizontal',
  size = 'medium',
  className = '',
  showSubtitle = false,
  subtitle = 'Cortinas y Cerramientos',
  href = '/',
  borderColor = 'black'
}: LogoProps) {
  // Tamaños según la variante
  const sizeClasses = {
    small: {
      horizontal: { width: 120, height: 30 },
      vertical: { width: 60, height: 80 }
    },
    medium: {
      horizontal: { width: 160, height: 40 },
      vertical: { width: 80, height: 100 }
    },
    large: {
      horizontal: { width: 200, height: 50 },
      vertical: { width: 100, height: 120 }
    }
  }

  const dimensions = sizeClasses[size][variant]
  const logoPath = variant === 'horizontal' 
    ? '/images/logos/logo-horizontal.png'
    : '/images/logos/logo-vertical.png'

  return (
    <Link href={href} className={`flex items-center gap-4 ${className}`}>
      <div className="relative" style={{ width: dimensions.width, height: dimensions.height }}>
        <Image
          src={logoPath}
          alt="MELE ROLLER"
          fill
          sizes={`${dimensions.width}px`}
          style={{ objectFit: 'contain' }}
          priority
          unoptimized
        />
      </div>
      {showSubtitle && (
        <span 
          className={`hidden lg:block text-[12px] font-light tracking-wide ${borderColor === 'white' ? 'text-white' : 'text-black'} uppercase leading-tight`}
        >
          {subtitle}
        </span>
      )}
    </Link>
  )
}

