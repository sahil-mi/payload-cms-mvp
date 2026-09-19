'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, SearchIcon, X } from 'lucide-react'

import type { Header } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  logoUrl?: string | null
  siteName?: string | null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, logoUrl, siteName }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  const navItems = data?.navItems || []

  useEffect(() => {
    setHeaderTheme(null)
    setMobileNavOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <>
      <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
        <div className="py-8 flex items-center justify-between">
          <Link href="/">
            <Logo
              loading="eager"
              priority="high"
              className="invert dark:invert-0"
              logoUrl={logoUrl}
              siteName={siteName}
            />
          </Link>
          <HeaderNav data={data} />
          <button
            aria-expanded={mobileNavOpen}
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden text-primary"
            onClick={() => setMobileNavOpen((v) => !v)}
            type="button"
          >
            <Menu className="w-6" />
          </button>
        </div>
      </header>

      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-background flex flex-col animate-in fade-in duration-200">
          <div className="container flex items-center justify-between py-8">
            <Link href="/" onClick={() => setMobileNavOpen(false)}>
              <Logo logoUrl={logoUrl} siteName={siteName} />
            </Link>
            <button
              aria-label="Close menu"
              className="text-foreground"
              onClick={() => setMobileNavOpen(false)}
              type="button"
            >
              <X className="w-6" />
            </button>
          </div>
          <nav className="container flex flex-col">
            {navItems.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                appearance="inline"
                className="text-2xl font-medium py-4 border-b border-border"
                onClick={() => setMobileNavOpen(false)}
              />
            ))}
            <Link
              className="flex items-center gap-2 text-2xl font-medium py-4"
              href="/search"
              onClick={() => setMobileNavOpen(false)}
            >
              <SearchIcon className="w-5" />
              Search
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
