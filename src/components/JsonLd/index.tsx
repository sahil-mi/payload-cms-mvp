import React from 'react'

/** Renders schema.org entities as a single JSON-LD `@graph` script. */
export const JsonLd: React.FC<{ data: Record<string, unknown>[] }> = ({ data }) => {
  if (!data.length) return null

  const graph = {
    '@context': 'https://schema.org',
    '@graph': data,
  }

  return (
    <script
      type="application/ld+json"
      // Escape `<` so CMS-authored strings can't close the script tag (XSS)
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
    />
  )
}
