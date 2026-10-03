'use client'

import React, { useEffect, useRef } from 'react'

export type EmbedScript = {
  attributes: Record<string, string>
  content: string
}

/** Appends a script so it executes, resolving once an external script has loaded. */
const runScript = (container: HTMLElement, { attributes, content }: EmbedScript) =>
  new Promise<void>((resolve) => {
    const script = document.createElement('script')
    for (const [name, value] of Object.entries(attributes)) script.setAttribute(name, value)

    if (attributes.src) {
      script.onload = () => resolve()
      script.onerror = () => resolve()
    } else {
      script.text = content
    }

    container.appendChild(script)
    if (!attributes.src || 'async' in attributes) resolve()
  })

export const HtmlEmbedClient: React.FC<{ markup: string; scripts: EmbedScript[] }> = ({
  markup,
  scripts,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  // Refs survive React Strict Mode's simulated remount, so scripts run once in dev too
  const hasRun = useRef(false)

  useEffect(() => {
    const container = ref.current
    if (!container || hasRun.current || !scripts.length) return
    hasRun.current = true

    // In order, like the browser would: an external script loads before the next one runs
    void scripts.reduce(
      (previous, script) => previous.then(() => runScript(container, script)),
      Promise.resolve(),
    )
  }, [scripts])

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: markup }} />
}
