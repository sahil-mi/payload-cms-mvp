// Generates simple flat SVG "wordmark" placeholders so the seed script never depends on
// real company trademarks. Used both for the LogoCloud block's fictional client logos
// and for the studio's own siteSettings.logo.

const ACCENT_COLORS = ['#c7d0ff', '#ffd9c2', '#cdeeda', '#f4d9ff', '#ffe4b8', '#c9ecff']

export const fictionalClients = [
  'Arclight Partners',
  'Vesper & Co',
  'Meridian Robotics',
  'Palisade Health',
  'Tidewater Capital',
  'Kestrel Aerospace',
]

const escapeXml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Builds a minimal 240x80 SVG wordmark: a soft accent-colored rect behind a centered,
 * clean sans-serif label. Returns a Buffer ready to hand to `payload.create` as a file.
 */
export const wordmarkSvg = (name: string, accent: string): Buffer => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="80" viewBox="0 0 240 80">
  <rect width="240" height="80" rx="8" fill="${accent}" fill-opacity="0.35" />
  <text x="120" y="46" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="17" font-weight="600" fill="#1a1a1a" letter-spacing="0.3">${escapeXml(
    name,
  )}</text>
</svg>`
  return Buffer.from(svg, 'utf-8')
}

export const clientLogoSvgs: { name: string; buffer: Buffer }[] = fictionalClients.map(
  (name, i) => ({
    name,
    buffer: wordmarkSvg(name, ACCENT_COLORS[i % ACCENT_COLORS.length]),
  }),
)

/**
 * The studio's own "Northbeam" wordmark, used for siteSettings.logo.
 */
export const studioLogoSvg = (): Buffer => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="80" viewBox="0 0 240 80">
  <rect width="240" height="80" rx="8" fill="#111111" />
  <text x="120" y="46" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="19" font-weight="700" fill="#ffffff" letter-spacing="0.5">NORTHBEAM</text>
</svg>`
  return Buffer.from(svg, 'utf-8')
}
