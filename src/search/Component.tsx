'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from 'next/navigation'

type Suggestion = {
  categories?: ({ title?: string | null } | null)[] | null
  id: number
  slug?: string | null
  title?: string | null
}

const SUGGESTION_LIMIT = 5

type SearchProps = {
  autoFocus?: boolean
  /** Live-navigate to /search?q=... as the (debounced) value changes. Only wanted on the /search page itself. */
  autoNavigate?: boolean
  className?: string
  /** Called after any navigation triggered from this component (suggestion click, submit, etc). */
  onNavigate?: () => void
}

export const Search: React.FC<SearchProps> = ({
  autoFocus,
  autoNavigate = false,
  className,
  onNavigate,
}) => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    if (!autoNavigate) return
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [autoNavigate, debouncedValue, router])

  useEffect(() => {
    if (!debouncedValue) {
      setSuggestions([])
      return
    }

    const controller = new AbortController()

    const params = new URLSearchParams({
      'where[or][0][title][like]': debouncedValue,
      'where[or][1][meta.description][like]': debouncedValue,
      'where[or][2][meta.title][like]': debouncedValue,
      'where[or][3][slug][like]': debouncedValue,
      limit: String(SUGGESTION_LIMIT),
      depth: '0',
      'select[title]': 'true',
      'select[slug]': 'true',
      'select[categories]': 'true',
    })

    fetch(`/api/search?${params.toString()}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data?.docs ?? [])
        setActiveIndex(-1)
      })
      .catch((err) => {
        if (err?.name !== 'AbortError') console.warn(err)
      })

    return () => controller.abort()
  }, [debouncedValue])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const goToSearchPage = () => {
    if (!value) return
    setIsOpen(false)
    router.push(`/search?q=${encodeURIComponent(value)}`)
    onNavigate?.()
  }

  const goToSuggestion = (slug?: string | null) => {
    if (!slug) return
    setIsOpen(false)
    router.push(`/posts/${slug}`)
    onNavigate?.()
  }

  const showDropdown = isOpen && value.length > 0

  return (
    <div className={cn('relative', className)} ref={containerRef}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          goToSearchPage()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          autoComplete="off"
          autoFocus={autoFocus}
          id="search"
          onChange={(event) => {
            setValue(event.target.value)
            setIsOpen(true)
          }}
          onFocus={() => {
            if (value) setIsOpen(true)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setIsOpen(false)
              return
            }
            if (event.key === 'ArrowDown' && suggestions.length > 0) {
              event.preventDefault()
              setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1))
            }
            if (event.key === 'ArrowUp' && suggestions.length > 0) {
              event.preventDefault()
              setActiveIndex((i) => Math.max(i - 1, -1))
            }
            if (event.key === 'Enter' && activeIndex >= 0) {
              event.preventDefault()
              goToSuggestion(suggestions[activeIndex]?.slug)
            }
          }}
          placeholder="Search"
          value={value}
        />
        <button type="submit" className="sr-only">
          submit
        </button>
      </form>

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full rounded-md border border-border bg-popover text-popover-foreground shadow-md overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <li key={suggestion.id}>
              <Link
                className={cn(
                  'block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground',
                  index === activeIndex && 'bg-accent text-accent-foreground',
                )}
                href={`/posts/${suggestion.slug}`}
                onClick={() => {
                  setIsOpen(false)
                  onNavigate?.()
                }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="font-medium">{suggestion.title}</div>
                {suggestion.categories?.[0]?.title && (
                  <div className="text-xs text-muted-foreground">
                    {suggestion.categories[0]?.title}
                  </div>
                )}
              </Link>
            </li>
          ))}
          <li className="border-t border-border">
            <button
              className="block w-full px-4 py-2 text-left text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={goToSearchPage}
              type="button"
            >
              See all results for &ldquo;{value}&rdquo;
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
