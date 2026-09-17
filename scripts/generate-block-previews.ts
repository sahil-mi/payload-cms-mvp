import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

// Generates small on-brand wireframe SVGs used as `admin.images.thumbnail` previews
// for each Pages layout block, so editors can recognize blocks visually in the
// "Add Block" drawer instead of only by name. Run with `pnpm block-previews`.

const OUT_DIR = join(process.cwd(), 'public/block-previews')

const COLOR = {
  bg: '#FAF6EF',
  card: '#FFFFFF',
  ink: '#19171C',
  border: '#E4DED0',
  muted: '#B8B0A0',
  violet: '#7C5CFC',
  lime: '#C6F24E',
  coral: '#FF7A5C',
  cyan: '#57D6E0',
}

const W = 600
const H = 400

const rect = (x: number, y: number, w: number, h: number, fill: string, rx = 8, opacity = 1) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${opacity !== 1 ? `opacity="${opacity}"` : ''} />`

// A short horizontal bar standing in for a line of text.
const bar = (x: number, y: number, w: number, h: number, fill: string, opacity = 1) =>
  rect(x, y, w, h, fill, h / 2, opacity)

const circle = (cx: number, cy: number, r: number, fill: string, opacity = 1) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${opacity !== 1 ? `opacity="${opacity}"` : ''} />`

const frame = (inner: string) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${COLOR.bg}" />
  ${inner}
</svg>`

const previews: Record<string, string> = {
  // CTA: an accent card with two heading bars on the left, a pill button on the right.
  cta: frame(`
    ${rect(60, 130, 480, 140, COLOR.violet, 20)}
    ${bar(100, 175, 220, 16, COLOR.bg)}
    ${bar(100, 205, 150, 16, COLOR.bg, 0.7)}
    ${rect(400, 182, 100, 36, COLOR.bg, 18)}
  `),

  // Content / RichText: a heading bar plus paragraph lines of decreasing width.
  content: frame(`
    ${bar(80, 110, 220, 22, COLOR.ink)}
    ${bar(80, 160, 440, 14, COLOR.muted, 0.6)}
    ${bar(80, 186, 440, 14, COLOR.muted, 0.6)}
    ${bar(80, 212, 380, 14, COLOR.muted, 0.6)}
    ${bar(80, 238, 410, 14, COLOR.muted, 0.6)}
    ${bar(80, 264, 260, 14, COLOR.muted, 0.6)}
  `),

  // Image (MediaBlock): a single large photo placeholder with a mountain/sun glyph.
  mediaBlock: frame(`
    ${rect(90, 80, 420, 240, COLOR.card, 20)}
    <rect x="90" y="80" width="420" height="240" rx="20" fill="none" stroke="${COLOR.border}" stroke-width="2" />
    ${circle(200, 150, 24, COLOR.coral)}
    <path d="M110 300 L230 190 L300 250 L370 170 L490 300 Z" fill="${COLOR.cyan}" opacity="0.55" />
  `),

  // BlogGrid (Archive): three small cards, each image + two text lines.
  archive: frame(`
    ${[80, 240, 400].map((x) => `
      ${rect(x, 100, 120, 80, COLOR.card, 14)}
      <rect x="${x}" y="100" width="120" height="80" rx="14" fill="none" stroke="${COLOR.border}" stroke-width="2" />
      ${bar(x, 196, 100, 12, COLOR.ink)}
      ${bar(x, 216, 70, 10, COLOR.muted, 0.7)}
    `).join('')}
  `),

  // Newsletter/Form: stacked input bars plus a filled submit pill.
  formBlock: frame(`
    ${[0, 1, 2].map((i) => `
      <rect x="150" y="${90 + i * 56}" width="300" height="38" rx="10" fill="${COLOR.card}" stroke="${COLOR.border}" stroke-width="2" />
    `).join('')}
    ${rect(150, 270, 130, 38, COLOR.violet, 10)}
  `),

  // FeatureGrid: 2x2 icon chips each with two lines.
  featureGrid: frame(`
    ${([
      [80, 90, COLOR.violet],
      [320, 90, COLOR.lime],
      [80, 220, COLOR.coral],
      [320, 220, COLOR.cyan],
    ] as const)
      .map(
        ([x, y, c]) => `
      ${rect(x, y, 200, 100, COLOR.card, 16)}
      <rect x="${x}" y="${y}" width="200" height="100" rx="16" fill="none" stroke="${COLOR.border}" stroke-width="2" />
      ${circle(x + 34, y + 34, 16, c, 0.85)}
      ${bar(x + 20, y + 64, 140, 10, COLOR.ink)}
      ${bar(x + 20, y + 80, 100, 8, COLOR.muted, 0.7)}
    `,
      )
      .join('')}
  `),

  // Image + Text: photo on the left, text block on the right.
  imageText: frame(`
    ${rect(70, 90, 220, 220, COLOR.card, 18)}
    <rect x="70" y="90" width="220" height="220" rx="18" fill="none" stroke="${COLOR.border}" stroke-width="2" />
    ${circle(150, 160, 18, COLOR.lime)}
    <path d="M90 280 L170 200 L210 240 L250 210 L290 280 Z" fill="${COLOR.violet}" opacity="0.4" />
    ${bar(330, 120, 60, 12, COLOR.coral, 0.9)}
    ${bar(330, 150, 200, 20, COLOR.ink)}
    ${bar(330, 190, 220, 12, COLOR.muted, 0.6)}
    ${bar(330, 212, 190, 12, COLOR.muted, 0.6)}
    ${rect(330, 246, 110, 34, COLOR.ink, 17)}
  `),

  // Stats: four bold metric bars of varying height with a caption line under each.
  stats: frame(`
    ${([
      [100, 90, COLOR.violet],
      [230, 130, COLOR.lime],
      [360, 70, COLOR.coral],
      [450, 110, COLOR.cyan],
    ] as const)
      .map(([x, y, c]) => `
      ${rect(x - 20, y, 60, 300 - y - 40, c, 12, 0.9)}
      ${bar(x - 20, 300, 60, 10, COLOR.muted, 0.6)}
    `)
      .join('')}
  `),

  // Testimonials: two quote cards with an avatar + name line each.
  testimonials: frame(`
    ${[80, 320].map((x) => `
      ${rect(x, 90, 200, 190, COLOR.card, 18)}
      <rect x="${x}" y="90" width="200" height="190" rx="18" fill="none" stroke="${COLOR.border}" stroke-width="2" />
      <text x="${x + 20}" y="140" font-family="Georgia, serif" font-size="56" fill="${COLOR.coral}" opacity="0.5">&#8220;</text>
      ${bar(x + 20, 150, 160, 10, COLOR.muted, 0.6)}
      ${bar(x + 20, 168, 140, 10, COLOR.muted, 0.6)}
      ${circle(x + 34, 232, 14, COLOR.violet, 0.8)}
      ${bar(x + 56, 226, 90, 10, COLOR.ink)}
    `).join('')}
  `),

  // Logo Cloud: a row of evenly spaced wordmark pills.
  logoCloud: frame(`
    ${[70, 190, 310, 430].map((x, i) => rect(x, 180, 100, 40, COLOR.ink, 8, 0.18 + (i % 2) * 0.06)).join('')}
  `),

  // Gallery: a 3x2 grid of photo tiles.
  gallery: frame(`
    ${[0, 1, 2].flatMap((col) =>
      [0, 1].map(
        (row) => `
      ${rect(80 + col * 150, 90 + row * 120, 130, 100, COLOR.card, 14)}
      <rect x="${80 + col * 150}" y="${90 + row * 120}" width="130" height="100" rx="14" fill="none" stroke="${COLOR.border}" stroke-width="2" />
      ${circle(80 + col * 150 + 34, 90 + row * 120 + 34, 12, [COLOR.violet, COLOR.lime, COLOR.coral, COLOR.cyan][(col + row) % 4], 0.7)}
    `,
      ),
    ).join('')}
  `),

  // FAQ: three accordion rows, a question line plus a chevron, divided by rules.
  faq: frame(`
    ${[0, 1, 2]
      .map((i) => {
        const rowY = 110 + i * 66
        const iconY = rowY + 8
        return `
      ${bar(90, rowY, 320, 16, COLOR.ink)}
      <circle cx="480" cy="${iconY}" r="14" fill="none" stroke="${COLOR.violet}" stroke-width="2" />
      <line x1="473" y1="${iconY}" x2="487" y2="${iconY}" stroke="${COLOR.violet}" stroke-width="2" />
      <line x1="480" y1="${iconY - 7}" x2="480" y2="${iconY + 7}" stroke="${COLOR.violet}" stroke-width="2" />
      <line x1="80" y1="${rowY + 40}" x2="520" y2="${rowY + 40}" stroke="${COLOR.border}" stroke-width="2" />
    `
      })
      .join('')}
  `),

  // Pricing: three columns, the middle one raised/highlighted as the featured tier.
  pricing: frame(`
    ${rect(80, 130, 140, 190, COLOR.card, 16)}
    <rect x="80" y="130" width="140" height="190" rx="16" fill="none" stroke="${COLOR.border}" stroke-width="2" />
    ${rect(230, 90, 140, 230, COLOR.violet, 16)}
    ${rect(380, 130, 140, 190, COLOR.card, 16)}
    <rect x="380" y="130" width="140" height="190" rx="16" fill="none" stroke="${COLOR.border}" stroke-width="2" />
    ${([
      [80, 130, COLOR.ink],
      [230, 90, COLOR.bg],
      [380, 130, COLOR.ink],
    ] as const)
      .map(([x, y, c]) => `
        ${bar(x + 20, y + 28, 60, 16, c)}
        ${bar(x + 20, y + 60, 100, 10, c, 0.6)}
        ${bar(x + 20, y + 80, 100, 10, c, 0.6)}
        ${rect(x + 20, y + 130, 100, 30, c === COLOR.bg ? COLOR.bg : COLOR.violet, 15)}
      `)
      .join('')}
  `),

  // Project Grid: three tall project-cover cards, image-forward with a single title line.
  projectGrid: frame(`
    ${[70, 230, 390].map((x, i) => `
      ${rect(x, 80, 140, 170, COLOR.card, 16)}
      <rect x="${x}" y="80" width="140" height="170" rx="16" fill="none" stroke="${COLOR.border}" stroke-width="2" />
      <path d="M${x + 10} ${230} L${x + 60} ${170} L${x + 90} ${200} L${x + 130} ${160} L${x + 130} ${240} Z" fill="${[COLOR.violet, COLOR.coral, COLOR.cyan][i]}" opacity="0.5" />
      ${bar(x, 268, 110, 12, COLOR.ink)}
    `).join('')}
  `),

  // Spacer: two content bars with a dashed measuring line and arrows in the gap between them.
  spacer: frame(`
    ${bar(140, 90, 320, 16, COLOR.ink, 0.85)}
    <line x1="300" y1="130" x2="300" y2="270" stroke="${COLOR.violet}" stroke-width="2" stroke-dasharray="6 8" />
    <path d="M292 138 L300 126 L308 138" fill="none" stroke="${COLOR.violet}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M292 262 L300 274 L308 262" fill="none" stroke="${COLOR.violet}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    ${bar(140, 294, 320, 16, COLOR.ink, 0.85)}
  `),
}

mkdirSync(OUT_DIR, { recursive: true })

for (const [slug, svg] of Object.entries(previews)) {
  writeFileSync(join(OUT_DIR, `${slug}.svg`), svg.trim() + '\n')
}

console.log(`Wrote ${Object.keys(previews).length} block preview SVGs to ${OUT_DIR}`)
