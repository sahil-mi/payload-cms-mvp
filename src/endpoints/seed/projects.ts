import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Category, Media } from '@/payload-types'

import type { CategoryTitle } from './categories'
import { lexicalHeading, lexicalParagraph, richText } from './lexical'

export type ProjectsContext = {
  categories: Record<CategoryTitle, Category>
  media: Record<string, Media>
}

export const buildProjects = ({
  categories,
  media,
}: ProjectsContext): RequiredDataFromCollectionSlug<'projects'>[] => {
  const svc = (titles: CategoryTitle[]) => titles.map((t) => categories[t].id)

  return [
    {
      title: 'Meridian Robotics — Brand & Product Launch',
      slug: 'meridian-robotics-brand-product-launch',
      _status: 'published',
      client: 'Meridian Robotics',
      year: '2024',
      services: svc(['Brand Identity', 'Product Design']),
      coverImage: media.projectMeridianCover.id,
      content: richText([
        lexicalHeading('h2', 'The challenge'),
        lexicalParagraph(
          'Meridian Robotics builds warehouse automation hardware, but their brand looked like a Series A pitch deck: generic, interchangeable with a dozen competitors. They were closing enterprise contracts on the strength of their engineering, then losing momentum the moment a buyer visited the website. Procurement teams need to trust a vendor before they trust a robot arm, and the site was not doing that job.',
        ),
        lexicalHeading('h2', 'Our approach'),
        lexicalParagraph(
          "We spent the first three weeks in Meridian's fulfillment centers, not their boardroom. The brand system we built — a restrained industrial palette, a wordmark with the geometric precision of the hardware itself, a photography direction that treated the machines as the hero rather than the humans around them — came directly from watching how operators actually talked about the product. We rebuilt the site as a technical sales tool first and a brand showcase second: spec sheets and ROI calculators sit above the fold, not buried in a PDF.",
        ),
        lexicalHeading('h2', 'The outcome'),
        lexicalParagraph(
          'Meridian closed its Series C four months after launch, and their VP of Sales credited the new site directly in the investor deck. More telling: the sales cycle for enterprise deals shortened because prospects arrived pre-sold on the technical credibility the brand now signals.',
        ),
      ]),
      stats: [
        { label: 'Increase in qualified demo requests', value: '2.6x' },
        { label: 'Reduction in average sales cycle', value: '34%' },
        { label: 'Weeks from kickoff to launch', value: '14' },
      ],
      gallery: [
        { image: media.meridianGallery1.id },
        { image: media.meridianGallery2.id },
        { image: media.meridianGallery3.id },
      ],
      meta: {
        title: 'Meridian Robotics — Brand & Product Launch | Northbeam Studio',
        description:
          'How we rebuilt Meridian Robotics’ brand and website around technical credibility, shortening their enterprise sales cycle by a third.',
        image: media.projectMeridianCover.id,
      },
      publishedAt: '2024-11-08T09:00:00.000Z',
    },
    {
      title: 'Palisade Health — Patient Portal Redesign',
      slug: 'palisade-health-patient-portal-redesign',
      _status: 'published',
      client: 'Palisade Health',
      year: '2024',
      services: svc(['Product Design', 'Web Engineering']),
      coverImage: media.projectPalisadeCover.id,
      content: richText([
        lexicalHeading('h2', 'The challenge'),
        lexicalParagraph(
          "Palisade's patient portal had a 61% task-abandonment rate on appointment scheduling — the single most important flow in the product. Support tickets ran nearly 400 a week for issues that traced back to confusing form logic and a visual language that gave every action the same weight, from “reschedule” to “delete your account.”",
        ),
        lexicalHeading('h2', 'Our approach'),
        lexicalParagraph(
          'We ran the redesign as a clinical-adjacent product problem, not a visual refresh. That meant sitting with intake coordinators, shadowing calls, and mapping every point where the interface asked patients to make a decision they were not equipped to make unassisted. The resulting design system prioritizes one action per screen, uses plain language instead of internal Palisade terminology, and rebuilds the scheduling flow around how patients actually think about time — "next available" before "choose provider."',
        ),
        lexicalHeading('h2', 'The outcome'),
        lexicalParagraph(
          'We shipped the new portal in three phases over five months, instrumenting each release so we could validate against real usage rather than assumptions. Abandonment on the scheduling flow dropped to 18%, and Palisade’s support team reported a measurable drop in portal-related tickets within the first full quarter post-launch.',
        ),
      ]),
      stats: [
        { label: 'Reduction in scheduling task abandonment', value: '70%' },
        { label: 'Drop in portal-related support tickets', value: '41%' },
        { label: 'Patient satisfaction score (post-launch)', value: '4.7/5' },
      ],
      gallery: [
        { image: media.palisadeGallery1.id },
        { image: media.palisadeGallery2.id },
        { image: media.palisadeGallery3.id },
      ],
      meta: {
        title: 'Palisade Health — Patient Portal Redesign | Northbeam Studio',
        description:
          'A ground-up redesign of Palisade Health’s patient portal that cut scheduling abandonment by 70% and reduced support load.',
        image: media.projectPalisadeCover.id,
      },
      publishedAt: '2024-06-17T09:00:00.000Z',
    },
    {
      title: 'Vesper & Co — Commerce Platform Rebuild',
      slug: 'vesper-and-co-commerce-platform-rebuild',
      _status: 'published',
      client: 'Vesper & Co',
      year: '2023',
      services: svc(['Web Engineering', 'Growth & Strategy']),
      coverImage: media.projectVesperCover.id,
      content: richText([
        lexicalHeading('h2', 'The challenge'),
        lexicalParagraph(
          "Vesper & Co's storefront ran on a five-year-old headless setup that had accumulated enough one-off integrations that no one on their team fully understood how checkout worked anymore. Page speed had degraded to the point that mobile conversion was nearly half of desktop, and every new promotion required an engineer to hand-code a landing page.",
        ),
        lexicalHeading('h2', 'Our approach'),
        lexicalParagraph(
          'We rebuilt the storefront on a modern composable stack with a real content model behind it, so merchandising could build campaign pages without filing an engineering ticket. Performance work focused on the metrics that actually correlate with revenue — largest contentful paint on product pages and time-to-interactive on checkout — rather than chasing a vanity Lighthouse score.',
        ),
        lexicalHeading('h2', 'The outcome'),
        lexicalParagraph(
          'Mobile conversion closed most of the gap with desktop within the first two months. More durably, Vesper’s marketing team now ships seasonal campaigns in days instead of weeks, without touching a line of code.',
        ),
      ]),
      stats: [
        { label: 'Mobile conversion rate increase', value: '58%' },
        { label: 'Improvement in mobile page speed score', value: '3.1x' },
        { label: 'Campaign pages shipped without engineering', value: '100%' },
      ],
      meta: {
        title: 'Vesper & Co — Commerce Platform Rebuild | Northbeam Studio',
        description:
          'Rebuilding Vesper & Co’s storefront on a composable stack lifted mobile conversion 58% and freed marketing from engineering bottlenecks.',
        image: media.projectVesperCover.id,
      },
      publishedAt: '2023-09-22T09:00:00.000Z',
    },
    {
      title: 'Tidewater Capital — Investor Relations Site',
      slug: 'tidewater-capital-investor-relations-site',
      _status: 'published',
      client: 'Tidewater Capital',
      year: '2025',
      services: svc(['Brand Identity', 'Web Engineering']),
      coverImage: media.projectTidewaterCover.id,
      content: richText([
        lexicalHeading('h2', 'The challenge'),
        lexicalParagraph(
          "Ahead of raising a new fund, Tidewater Capital needed an investor-facing presence that read as established rather than emerging — without the generic “private equity in navy blue” look that makes every fund site indistinguishable from the next. Limited partners were forming impressions before the first call.",
        ),
        lexicalHeading('h2', 'Our approach'),
        lexicalParagraph(
          'We built a restrained, editorial identity around a single idea: clarity as a form of confidence. Long-form thesis writing, portfolio detail, and fund performance data are presented with the density of a serious research publication rather than a marketing brochure, with a typographic system built to make dense financial information genuinely readable.',
        ),
        lexicalHeading('h2', 'The outcome'),
        lexicalParagraph(
          "The site launched six weeks ahead of Tidewater's fund-raising roadshow. Their managing partner told us the most common piece of feedback from LPs during first meetings was that the firm “felt more established” than its actual fund history — exactly the perception gap we were hired to close.",
        ),
      ]),
      stats: [
        { label: 'Weeks ahead of fundraising roadshow', value: '6' },
        { label: 'Portfolio companies documented', value: '24' },
      ],
      meta: {
        title: 'Tidewater Capital — Investor Relations Site | Northbeam Studio',
        description:
          'An editorial brand and IR site for Tidewater Capital designed to signal institutional credibility ahead of a new fund raise.',
        image: media.projectTidewaterCover.id,
      },
      publishedAt: '2025-02-11T09:00:00.000Z',
    },
    {
      title: 'Kestrel Aerospace — Internal Ops Dashboard',
      slug: 'kestrel-aerospace-internal-ops-dashboard',
      _status: 'published',
      client: 'Kestrel Aerospace',
      year: '2023',
      services: svc(['Product Design', 'AI & Data']),
      coverImage: media.projectKestrelCover.id,
      content: richText([
        lexicalHeading('h2', 'The challenge'),
        lexicalParagraph(
          "Kestrel's operations team was running fleet-readiness decisions out of six disconnected spreadsheets and a legacy tool nobody trusted enough to use without double-checking it manually. Every status meeting started with twenty minutes of reconciling numbers instead of making decisions.",
        ),
        lexicalHeading('h2', 'Our approach'),
        lexicalParagraph(
          'We designed and built a single operations dashboard that pulls from Kestrel’s existing systems of record rather than replacing them, with a predictive maintenance layer that flags parts likely to need attention before they fail. The interface was built around the actual decisions operators make — not a generic admin-panel template — so the loudest signal is always the one that needs a human call.',
        ),
        lexicalHeading('h2', 'The outcome'),
        lexicalParagraph(
          'Status meetings shrank from forty-five minutes to fifteen. More significantly, the predictive layer flagged two maintenance issues in its first quarter that would otherwise have surfaced as unplanned downtime.',
        ),
      ]),
      stats: [
        { label: 'Reduction in status-meeting time', value: '67%' },
        { label: 'Systems consolidated into one view', value: '6' },
        { label: 'Unplanned-downtime incidents prevented (Q1)', value: '2' },
      ],
      meta: {
        title: 'Kestrel Aerospace — Internal Ops Dashboard | Northbeam Studio',
        description:
          'A unified, predictive operations dashboard that cut Kestrel Aerospace’s status-meeting time by two-thirds.',
        image: media.projectKestrelCover.id,
      },
      publishedAt: '2023-04-03T09:00:00.000Z',
    },
    {
      title: 'Arclight Partners — Rebrand & Motion System',
      slug: 'arclight-partners-rebrand-motion-system',
      _status: 'published',
      client: 'Arclight Partners',
      year: '2025',
      services: svc(['Brand Identity', 'Motion & Animation']),
      coverImage: media.projectArclightCover.id,
      content: richText([
        lexicalHeading('h2', 'The challenge'),
        lexicalParagraph(
          'Arclight Partners had grown through three acquisitions in two years, and their brand showed it: five sub-brands, no shared visual language, and a marketing team spending more time reconciling templates than doing actual marketing.',
        ),
        lexicalHeading('h2', 'Our approach'),
        lexicalParagraph(
          'Rather than force every sub-brand into an identical template, we built a flexible identity system anchored by a shared motion language — consistent easing curves, a signature transition, a restrained animation vocabulary that could flex across five distinct product lines while still reading unmistakably as one company. The motion system doubled as a practical engineering deliverable: a documented set of tokens and easing functions the internal team could implement without design review on every ticket.',
        ),
        lexicalHeading('h2', 'The outcome'),
        lexicalParagraph(
          "Arclight's five sub-brands now share a visual and motion language while retaining distinct product identities. Internal production time on marketing assets dropped substantially once the team had a system to work from instead of starting from a blank file each time.",
        ),
      ]),
      stats: [
        { label: 'Sub-brands unified under one system', value: '5' },
        { label: 'Reduction in asset production time', value: '45%' },
      ],
      gallery: [
        { image: media.arclightGallery1.id },
        { image: media.arclightGallery2.id },
        { image: media.arclightGallery3.id },
      ],
      meta: {
        title: 'Arclight Partners — Rebrand & Motion System | Northbeam Studio',
        description:
          'A unified brand and motion system across Arclight Partners’ five acquired product lines, cutting asset production time by 45%.',
        image: media.projectArclightCover.id,
      },
      publishedAt: '2025-05-27T09:00:00.000Z',
    },
  ]
}
