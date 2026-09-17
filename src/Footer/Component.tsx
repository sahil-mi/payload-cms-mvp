import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()
  const siteSettings = await getCachedGlobal('siteSettings', 1)()

  const navItems = footerData?.navItems || []
  const socialLinks = footerData?.socialLinks || []
  const copyrightText = footerData?.copyrightText
  const logo = siteSettings?.logo
  const logoUrl = logo && typeof logo === 'object' ? logo.url : null

  return (
    <footer className="mt-auto border-t border-border bg-black text-white">
      <div className="container py-12 gap-8 flex flex-col">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <Link className="flex items-center" href="/">
            <Logo logoUrl={logoUrl} siteName={siteSettings?.siteName} />
          </Link>

          <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
            <nav className="flex flex-col md:flex-row gap-4">
              {navItems.map(({ link }, i) => {
                return <CMSLink className="text-white" key={i} {...link} />
              })}
            </nav>
          </div>
        </div>

        {(socialLinks.length > 0 || copyrightText) && (
          <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between border-t border-white/10 pt-8 text-sm text-white/60">
            {copyrightText && <p>{copyrightText}</p>}
            {socialLinks.length > 0 && (
              <nav className="flex gap-4">
                {socialLinks.map(({ platform, url }, i) => (
                  <a
                    key={i}
                    className="hover:text-white transition-colors"
                    href={url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {platform}
                  </a>
                ))}
              </nav>
            )}
          </div>
        )}
      </div>
    </footer>
  )
}
