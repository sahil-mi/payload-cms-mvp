import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

export async function Header() {
  const headerData = await getCachedGlobal('header', 1)()
  const siteSettings = await getCachedGlobal('siteSettings', 1)()

  const logo = siteSettings?.logo
  const logoUrl = logo && typeof logo === 'object' ? logo.url : null

  return <HeaderClient data={headerData} logoUrl={logoUrl} siteName={siteSettings?.siteName} />
}
