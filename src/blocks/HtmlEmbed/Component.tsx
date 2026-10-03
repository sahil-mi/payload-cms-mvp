import React from 'react'

import type { HtmlEmbedBlock as HtmlEmbedBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'

import { HtmlEmbedClient, type EmbedScript } from './Component.client'

const SCRIPT_TAG = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi
const ATTRIBUTE = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g

/**
 * Splits embed code into markup and scripts. The markup is server-rendered as-is; the
 * scripts are re-created on the client, because scripts inside `dangerouslySetInnerHTML`
 * only run on a full page load, never after client-side navigation.
 */
export const splitScripts = (html: string): { markup: string; scripts: EmbedScript[] } => {
  const scripts: EmbedScript[] = []

  const markup = html.replace(SCRIPT_TAG, (_, rawAttributes: string, content: string) => {
    const attributes: Record<string, string> = {}
    for (const [, name, double, single, bare] of rawAttributes.matchAll(ATTRIBUTE)) {
      attributes[name!.toLowerCase()] = double ?? single ?? bare ?? ''
    }
    scripts.push({ attributes, content })
    return ''
  })

  return { markup, scripts }
}

const widthClasses: Record<string, string> = {
  container: 'container',
  narrow: 'container max-w-[48rem]',
  full: 'w-full',
}

export const HtmlEmbedBlock: React.FC<HtmlEmbedBlockProps> = ({ html, width }) => {
  if (!html?.trim()) return null

  const { markup, scripts } = splitScripts(html)

  return (
    <div className={cn('my-16', widthClasses[width || 'container'])}>
      <HtmlEmbedClient markup={markup} scripts={scripts} />
    </div>
  )
}
