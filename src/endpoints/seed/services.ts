import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Page } from '@/payload-types'

import { lexicalHeading, lexicalParagraph, richText } from './lexical'

type ServicesArgs = {
  contactPage: Page
}

export const services = ({ contactPage }: ServicesArgs): RequiredDataFromCollectionSlug<'pages'> => {
  return {
    slug: 'services',
    title: 'Services',
    _status: 'published',
    publishedAt: '2026-01-05T09:00:00.000Z',
    hero: {
      type: 'lowImpact',
      richText: richText([
        lexicalHeading('h1', 'Services'),
        lexicalParagraph(
          'One team, six disciplines. We scope engagements around the outcome you need, not a fixed menu of deliverables.',
        ),
      ]),
    },
    layout: [
      {
        blockType: 'featureGrid',
        blockName: 'Capabilities',
        eyebrow: 'Capabilities',
        heading: 'What we do',
        description:
          'Every engagement draws from the same senior team across these disciplines, scoped to what your project actually needs.',
        features: [
          {
            icon: 'Palette',
            title: 'Brand Identity',
            description: 'Visual and verbal identity systems — naming, logo, typography, and the governance to keep it consistent.',
          },
          {
            icon: 'Layers',
            title: 'Product Design',
            description: 'End-to-end product design, from research and IA through high-fidelity UI and design systems.',
          },
          {
            icon: 'Target',
            title: 'UX Research',
            description: 'Usability testing, discovery interviews, and analytics review that keeps decisions grounded in evidence.',
          },
          {
            icon: 'Zap',
            title: 'Web Engineering',
            description: 'Production-grade builds on modern stacks, with documentation and handoff that outlasts the engagement.',
          },
          {
            icon: 'Target',
            title: 'Growth & Strategy',
            description: 'Positioning, go-to-market planning, and conversion-focused iteration once a product is live.',
          },
          {
            icon: 'Sparkles',
            title: 'Motion & Animation',
            description: 'Interface motion systems and brand animation, built as a documented, reusable vocabulary.',
          },
          {
            icon: 'Gauge',
            title: 'AI & Data',
            description: 'Applied AI features scoped around a real task, plus the dashboards and analytics to see if they work.',
          },
          {
            icon: 'Shield',
            title: 'Design Systems',
            description: 'Component libraries and documentation staffed and versioned like the internal product they are.',
          },
        ],
      },
      {
        blockType: 'pricing',
        blockName: 'Ways to work together',
        heading: 'Ways to work together',
        tiers: [
          {
            name: 'Sprint',
            price: 'From $18,000',
            interval: 'per sprint',
            description: 'A focused, fixed-scope engagement — a brand refresh, a single product flow, or a landing experience. Typically two to four weeks.',
            features: [
              { text: 'Fixed scope and timeline' },
              { text: 'Direct access to a senior lead' },
              { text: 'One round of structured revisions' },
            ],
            featured: false,
            link: {
              type: 'custom',
              appearance: 'outline',
              label: 'Scope a sprint',
              url: '/contact',
            },
          },
          {
            name: 'Partnership',
            price: 'Custom quote',
            interval: 'per engagement',
            description: 'Our most common engagement — a multi-month project spanning strategy, design, and build, scoped around a launch.',
            features: [
              { text: 'Dedicated 3–5 person team' },
              { text: 'Strategy, design, and engineering under one roof' },
              { text: 'Weekly working sessions, not status calls' },
              { text: 'Post-launch support window included' },
            ],
            featured: true,
            link: {
              type: 'reference',
              appearance: 'default',
              label: 'Start a partnership',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
          {
            name: 'Retainer',
            price: 'From $12,000',
            interval: '/month',
            description: 'Ongoing work structured in 90-day cycles, for teams that need continuous design and engineering capacity.',
            features: [
              { text: 'Quarterly priority-setting session' },
              { text: 'Flexible allocation across disciplines' },
              { text: 'Results review at the end of each cycle' },
            ],
            featured: false,
            link: {
              type: 'custom',
              appearance: 'outline',
              label: 'Ask about retainers',
              url: '/contact',
            },
          },
        ],
      },
      {
        blockType: 'faq',
        blockName: 'Services FAQ',
        heading: 'Common questions',
        items: [
          {
            question: 'How does an engagement usually start?',
            answer:
              'With a short discovery call to understand scope and timeline, followed by a written proposal within a week. We rarely start work without a scoping conversation first.',
          },
          {
            question: 'What is your typical timeline for a full brand and product launch?',
            answer:
              'Most brand-and-product engagements run 10 to 16 weeks from kickoff to launch, depending on scope. Sprint engagements are two to four weeks.',
          },
          {
            question: 'Do you work with in-house design and engineering teams?',
            answer:
              'Often, yes. We frequently embed alongside an existing internal team rather than replacing one, particularly on retainer engagements.',
          },
          {
            question: 'Can we engage you for just one discipline, like brand or engineering?',
            answer:
              'Yes. Many engagements start narrow — a rebrand or a single product build — and roughly a third expand into a broader partnership once the first phase ships.',
          },
          {
            question: 'What does a typical project cost?',
            answer:
              'Sprint engagements start around $18,000. Full brand and product partnerships are scoped individually based on complexity and typically range from $60,000 to $250,000+. We provide a fixed quote before work begins.',
          },
          {
            question: 'Do you sign NDAs before a scoping call?',
            answer:
              'Happy to. Send us your standard NDA ahead of the call and we’ll turn it around promptly.',
          },
        ],
      },
      {
        blockType: 'cta',
        blockName: 'Services CTA',
        richText: richText([
          lexicalHeading('h2', 'Not sure which engagement fits?'),
          lexicalParagraph('Tell us what you’re working on and we’ll recommend a starting point.'),
        ]),
        links: [
          {
            link: {
              type: 'reference',
              appearance: 'default',
              label: 'Talk to us',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
        ],
      },
    ],
    meta: {
      title: 'Services | Northbeam Studio',
      description:
        'Brand identity, product design, web engineering, growth strategy, motion, and applied AI — one senior team across six disciplines.',
    },
  }
}
