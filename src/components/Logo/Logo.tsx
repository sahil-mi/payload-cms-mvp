import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  logoUrl?: string | null
  siteName?: string | null
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    logoUrl,
    siteName,
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  const name = siteName || 'Northbeam'

  if (logoUrl) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        alt={name}
        width={193}
        height={34}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('max-w-[9.375rem] w-full h-[34px] object-contain object-left', className)}
        src={logoUrl}
      />
    )
  }

  return (
    <span
      className={clsx(
        'text-lg font-semibold tracking-tight max-w-[9.375rem] w-full inline-flex items-center',
        className,
      )}
    >
      {name}
    </span>
  )
}
