'use client'

import React, { useEffect, useRef, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Search } from '@/search/Component'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!searchOpen) return

    const handleClick = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [searchOpen])

  return (
    <nav className="hidden md:flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
      <div className="relative" ref={searchRef}>
        <button
          aria-expanded={searchOpen}
          aria-label={searchOpen ? 'Close search' : 'Open search'}
          onClick={() => setSearchOpen((v) => !v)}
          type="button"
        >
          <SearchIcon className="w-5 text-primary" />
        </button>
        {searchOpen && (
          <Search
            autoFocus
            className="absolute right-0 top-full mt-3 w-72"
            onNavigate={() => setSearchOpen(false)}
          />
        )}
      </div>
    </nav>
  )
}
