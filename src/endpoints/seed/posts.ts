import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Author, Category, Media } from '@/payload-types'

import type { CategoryTitle } from './categories'
import { lexicalHeading, lexicalList, lexicalParagraph, richText } from './lexical'

export type PostsContext = {
  authors: Record<'mara' | 'theo' | 'priya' | 'owen', Author>
  categories: Record<CategoryTitle, Category>
  media: Record<string, Media>
}

export const buildPosts = ({
  authors,
  categories,
  media,
}: PostsContext): RequiredDataFromCollectionSlug<'posts'>[] => {
  const cat = (titles: CategoryTitle[]) => titles.map((t) => categories[t].id)

  return [
    {
      title: 'Why most rebrands fail in the first 90 days',
      slug: 'why-most-rebrands-fail-in-the-first-90-days',
      _status: 'published',
      authors: [authors.mara.id, authors.owen.id],
      categories: cat(['Brand Identity', 'Growth & Strategy']),
      heroImage: media.postHeroRebrands.id,
      publishedAt: '2026-03-04T09:00:00.000Z',
      relatedPosts: [],
      content: richText([
        lexicalParagraph(
          "A rebrand does not fail in the boardroom where it gets approved. It fails ninety days later, when the new logo has shipped, the press release has gone out, and nothing about how the company actually operates has changed. We have watched this happen enough times to name the pattern, and it is rarely a design problem.",
        ),
        lexicalHeading('h2', 'The launch is not the work'),
        lexicalParagraph(
          'Most organizations treat a rebrand like a product launch: a date on the calendar, a reveal, a wave of internal excitement that crests and then recedes. But a brand is not a deliverable you ship once. It is a set of decisions that has to get made consistently, by dozens of people, for years, long after the agency that designed it has moved on. If the only artifact you hand off is a logo file and a 40-page PDF nobody reads, you have not changed the brand — you have changed the wallpaper.',
        ),
        lexicalHeading('h2', 'Three things that actually predict failure'),
        lexicalList([
          'No one owns the brand internally. If the new system lives with an external agency instead of a named person on staff, every subsequent decision defaults back to old habits within a quarter.',
          'The system was built for the launch assets, not the boring ones. A beautiful new homepage means nothing if the sales deck, the support macros, and the recruiting page still look like the old company.',
          'Leadership treated it as a marketing initiative rather than an operating one. The strongest rebrands we have run changed how the company talks about itself in all-hands meetings, not just how it looks on Instagram.',
        ]),
        lexicalHeading('h2', 'What we do differently'),
        lexicalParagraph(
          'Every brand system we deliver ships with a governance model, not just a style guide: who approves what, how exceptions get handled, and a checklist for the unglamorous surfaces — email signatures, PDF templates, the internal wiki — that quietly do more to reinforce or undermine a brand than any hero image ever will. We also insist on a 90-day check-in with the client, specifically to audit whether the system survived contact with the organization’s actual workflow.',
        ),
        lexicalParagraph(
          "The uncomfortable truth is that a rebrand is an organizational change project wearing a design project's clothes. Treat it as the former, and the visual work — which is the easy part — has a real chance of sticking.",
        ),
      ]),
      meta: {
        title: 'Why most rebrands fail in the first 90 days | Northbeam Studio',
        description:
          'A rebrand rarely fails at launch. It fails three months later, when no one owns it. Here is the pattern we keep seeing, and how to avoid it.',
        image: media.postHeroRebrands.id,
      },
    },
    {
      title: 'Designing for trust: lessons from three fintech launches',
      slug: 'designing-for-trust-lessons-from-three-fintech-launches',
      _status: 'published',
      authors: [authors.priya.id],
      categories: cat(['Product Design', 'Growth & Strategy']),
      heroImage: media.postHeroFintechTrust.id,
      publishedAt: '2026-04-18T09:00:00.000Z',
      relatedPosts: [],
      content: richText([
        lexicalParagraph(
          'We have now shipped three consumer fintech products from zero to launch, and each time the hardest design problem was not the interface — it was convincing a stranger to hand over their financial life to a company they had never heard of. Trust, it turns out, is a design material like any other. It can be specified, tested, and gotten wrong.',
        ),
        lexicalHeading('h2', 'Trust is not a feeling, it is a sequence'),
        lexicalParagraph(
          'The instinct is to treat trust as an emotional outcome — make it feel safe, make it feel premium — and reach for visual cues borrowed from incumbent banks: navy blue, serif logotypes, security badges. That approach caps out fast. What actually moves the needle is sequencing: what information does someone need, in what order, before the next ask feels reasonable instead of presumptuous. Asking for a Social Security number before you have explained why, in plain language, kills more onboarding flows than any color palette ever could.',
        ),
        lexicalHeading('h2', 'What worked across all three launches'),
        lexicalList([
          'Explaining the "why" before the "what" at every data request, even when it added a screen.',
          'Showing real numbers as early as legally possible, instead of gray placeholder skeletons that read as evasive.',
          'Writing error states and empty states with the same care as the happy path — these are the moments people are most primed to assume the worst.',
          'Making the human support option genuinely easy to find, not hidden three menus deep as a cost-saving measure.',
        ]),
        lexicalHeading('h2', 'The counterintuitive finding'),
        lexicalParagraph(
          'Across usability sessions on all three products, the flows that tested best were not the fastest ones. Users consistently rated a slightly longer onboarding — one that explained itself — as more trustworthy than a frictionless one that felt like it was hiding something. Speed is not always the optimization target when the thing you are building requires someone to be vulnerable.',
        ),
        lexicalHeading('h2', 'The takeaway for anyone building in a high-trust category'),
        lexicalParagraph(
          'If you are designing something people have to trust before they can use it — money, health, identity — resist the urge to borrow the visual grammar of established players as a shortcut. Build the sequence of disclosure and reassurance that earns trust on its own terms. It is slower to design and it is the only version that actually works.',
        ),
      ]),
      meta: {
        title: 'Designing for trust: lessons from three fintech launches | Northbeam Studio',
        description:
          'What three consumer fintech launches taught us about trust as a design material — and why the fastest onboarding flow is not always the best one.',
        image: media.postHeroFintechTrust.id,
      },
    },
    {
      title: 'The case against design systems as a silver bullet',
      slug: 'the-case-against-design-systems-as-a-silver-bullet',
      _status: 'published',
      authors: [authors.theo.id],
      categories: cat(['Product Design', 'Web Engineering']),
      heroImage: media.postHeroDesignSystems.id,
      publishedAt: '2026-05-29T09:00:00.000Z',
      relatedPosts: [],
      content: richText([
        lexicalParagraph(
          'Every client conversation about design systems eventually arrives at the same premise: build one, and consistency problems disappear, velocity goes up, and design and engineering stop arguing. Having built and maintained several, I can say this is true for about the first six months. After that, the system itself becomes the thing you are arguing about.',
        ),
        lexicalHeading('h2', 'The maintenance tax nobody budgets for'),
        lexicalParagraph(
          "A design system is not a one-time deliverable, it is a second product with its own roadmap, its own users, and its own backlog of bugs — except the users are your internal teams, and they rarely get a say in prioritization. Teams that treat the system as a project with an end date inevitably watch it calcify: new patterns get built outside it because updating it is slower than the deadline allows, and within eighteen months you have the exact fragmentation problem the system was built to solve, just with extra steps.",
        ),
        lexicalHeading('h2', 'Where the value actually is'),
        lexicalParagraph(
          'The real return on a design system is not visual consistency — that is a byproduct. The return is in the decisions it removes from every individual feature build: this is how spacing works, this is how a form validates, this is the one accessible way to build a modal. A good system is opinionated enough that a team of five moves like a team of five, not a team of one repeated five times with slight variations.',
        ),
        lexicalHeading('h2', 'What we tell clients before building one'),
        lexicalList([
          'Staff it like a product, with a named owner who has time allocated, not a side project for whoever is between sprints.',
          'Start smaller than feels responsible. A system with 12 well-used components beats one with 80 components, half of which are guesses about future need.',
          'Version it and communicate breaking changes the way you would for any API consumed by other teams.',
          'Build in a formal path for teams to request exceptions — the fastest way to kill adoption is to make the system feel like a bureaucracy instead of a tool.',
        ]),
        lexicalParagraph(
          'None of this is an argument against design systems. It is an argument against treating one as a purchase instead of a commitment. The teams that get the most value are the ones who understood, going in, that they were signing up to run a small internal product team indefinitely — not just to ship a Figma library once.',
        ),
      ]),
      meta: {
        title: 'The case against design systems as a silver bullet | Northbeam Studio',
        description:
          'Design systems solve fragmentation for about six months. After that, the system itself becomes the thing your teams argue about — unless you plan for it.',
        image: media.postHeroDesignSystems.id,
      },
    },
    {
      title: 'What we learned shipping AI features nobody asked for',
      slug: 'what-we-learned-shipping-ai-features-nobody-asked-for',
      _status: 'published',
      authors: [authors.theo.id, authors.priya.id],
      categories: cat(['AI & Data']),
      heroImage: media.postHeroAiFeatures.id,
      publishedAt: '2026-07-02T09:00:00.000Z',
      relatedPosts: [],
      content: richText([
        lexicalParagraph(
          'Over the last two years, close to half of our product engagements have included a request to "add AI" somewhere in the experience. In most of those conversations, the client could not tell us which problem the AI was supposed to solve — only that competitors had announced something and the board was asking questions. We have shipped a few of those features. Most of them were mistakes, and the mistakes taught us more than the successes did.',
        ),
        lexicalHeading('h2', 'The feature that shipped and got quietly removed'),
        lexicalParagraph(
          'On one product, we built an AI summarization feature for a data-heavy dashboard, confident it would save users time. Usage data told a different story: fewer than 4% of eligible users ever clicked it twice. In interviews, the answer was consistent — the summary was never wrong, exactly, but users did not trust a compressed version of numbers they were personally accountable for. They wanted the AI to help them look at the data faster, not to look at it for them.',
        ),
        lexicalHeading('h2', 'What actually worked'),
        lexicalParagraph(
          "The AI features that stuck across our engagements shared one trait: they reduced the cost of a specific, previously expensive action, rather than trying to replace a judgment call. An AI-assisted first draft of a support response that a human still sends. A model that flags anomalies in a dataset for a human to investigate, rather than one that summarizes conclusions. The pattern is augmentation of a task the user already trusted themselves to do, not delegation of a decision they felt was theirs to make.",
        ),
        lexicalHeading('h2', 'Questions we now ask before any AI feature gets designed'),
        lexicalList([
          'What is the specific, narrow task this saves time on — not the category of problem, the actual task?',
          'What does the user lose control of, and will they notice or resent that?',
          'What happens when the model is confidently wrong, and how visible is that failure mode to the user in the moment?',
          'Would we build this if the word "AI" carried no marketing value at all?',
        ]),
        lexicalHeading('h2', 'The uncomfortable conclusion'),
        lexicalParagraph(
          "Most AI features fail for the same reason most features of any kind fail: they were scoped around a technology instead of a problem. The difference with AI right now is that the technology is exciting enough to get funded without anyone asking the second question. Our job increasingly is to ask it before the build starts, not after the usage data comes back disappointing.",
        ),
      ]),
      meta: {
        title: 'What we learned shipping AI features nobody asked for | Northbeam Studio',
        description:
          'Most AI features we have shipped on request failed quietly. Here is the pattern behind the ones that actually got used.',
        image: media.postHeroAiFeatures.id,
      },
    },
    {
      title: 'Motion is not decoration: a working theory',
      slug: 'motion-is-not-decoration-a-working-theory',
      _status: 'published',
      authors: [authors.owen.id],
      categories: cat(['Motion & Animation']),
      heroImage: media.postHeroMotion.id,
      publishedAt: '2026-08-01T09:00:00.000Z',
      relatedPosts: [],
      content: richText([
        lexicalParagraph(
          'Most clients hire us for motion work at the end of a project, as polish — a line item added once the "real" design is locked. That ordering is backwards, and it produces worse motion every time. Motion is not the icing on an interface. It is the mechanism by which people understand what just happened.',
        ),
        lexicalHeading('h2', 'What motion is actually for'),
        lexicalParagraph(
          'Strip away the aesthetic argument entirely and motion still has a job: it communicates causality, hierarchy, and state. When an element animates in from where you just tapped, you understand where it came from without reading a word. When a loading state pulses instead of hard-cutting to content, your brain registers "in progress" instead of "broken." None of that requires the motion to be beautiful. It requires the motion to be legible.',
        ),
        lexicalHeading('h2', 'The mistakes we see most often'),
        lexicalList([
          'Motion designed in isolation from the interaction it supports, so it looks great in a showcase reel and confuses users in the actual product.',
          'Duration and easing chosen by feel per-component instead of from a shared system, producing an interface that subtly disagrees with itself.',
          'Treating every transition as an opportunity for delight, when most transitions should be invisible — felt, not noticed.',
          'No consideration for reduced-motion preferences, which is both an accessibility failure and, frankly, a sign the motion was never load-bearing to begin with.',
        ]),
        lexicalHeading('h2', 'How we actually build it'),
        lexicalParagraph(
          'Motion enters our process at the same stage as layout, not after it. We define a small vocabulary early — two or three easing curves, a handful of duration tokens tied to distance and importance — and treat every animated moment as an application of that system rather than a bespoke decision. The result is an interface that feels coherent even when users could never articulate why, which is exactly the point. The best compliment a motion system can receive is that no one mentions it.',
        ),
      ]),
      meta: {
        title: 'Motion is not decoration: a working theory | Northbeam Studio',
        description:
          'Motion is usually treated as polish added at the end of a project. It should be treated as the mechanism that makes an interface legible.',
        image: media.postHeroMotion.id,
      },
    },
    {
      title: 'The 90-day retainer: how we structure long-term partnerships',
      slug: 'the-90-day-retainer-how-we-structure-long-term-partnerships',
      _status: 'published',
      authors: [authors.priya.id, authors.mara.id],
      categories: cat(['Growth & Strategy']),
      heroImage: media.postHeroRetainer.id,
      publishedAt: '2026-08-27T09:00:00.000Z',
      relatedPosts: [],
      content: richText([
        lexicalParagraph(
          'Roughly a third of our active client work is not a fixed-scope project — it is an ongoing retainer, structured in 90-day blocks. We landed on that structure after enough fixed-scope engagements ended with a strong deliverable and a client who then had no clear next step, and enough open-ended retainers drifted into vague, unaccountable work with no forcing function to show impact.',
        ),
        lexicalHeading('h2', 'Why 90 days specifically'),
        lexicalParagraph(
          'A month is too short to ship and learn from anything meaningful. A year is long enough that priorities drift and neither side notices until the relationship has quietly become something different than what was agreed. Ninety days is long enough to design, build, ship, and gather real usage data on a meaningful piece of work, and short enough that both sides are forced to re-commit — or not — based on actual outcomes rather than inertia.',
        ),
        lexicalHeading('h2', 'What a cycle looks like'),
        lexicalList([
          'Week 1: a joint priority-setting session against the client’s current business goals, not a backlog carried over from the prior quarter by default.',
          'Weeks 2–11: focused execution against two to three priorities, not a scattered list of "whatever comes up."',
          'Week 12: a results review, presented the same way we would present findings to our own leadership — including the things that did not work.',
        ]),
        lexicalHeading('h2', 'What this structure prevents'),
        lexicalParagraph(
          'The biggest failure mode in long-term agency relationships is not a bad quarter — it is a slow drift into scope no one agreed to, at a pace no one questions until the invoice feels disconnected from the value. The 90-day boundary forces an honest conversation four times a year: is this still the highest-value use of the partnership? Sometimes the answer is to double down. Sometimes it is to redirect the next cycle entirely. Both are better outcomes than six quiet months of "keeping busy."',
        ),
        lexicalParagraph(
          'It also, frankly, keeps us honest. A retainer with no natural checkpoint is easy for an agency to coast on. Ours does not let us.',
        ),
      ]),
      meta: {
        title: 'The 90-day retainer: how we structure long-term partnerships | Northbeam Studio',
        description:
          'Why we run ongoing client work in 90-day cycles instead of open-ended retainers or one-off fixed-scope projects.',
        image: media.postHeroRetainer.id,
      },
    },
  ]
}
