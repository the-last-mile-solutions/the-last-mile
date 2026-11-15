/**
 * Content schema for The Last Mile.
 * Every service page, card, nav entry, sitemap entry and road stop renders from these types.
 */

export interface FaqItem {
  question: string
  answer: string
}

export interface Service {
  /** URL segment: /services/{slug} */
  slug: string
  /** Full name, used in headings and nav */
  title: string
  /** Two or three word label shown on the road stop */
  stopLabel: string
  /** Button label used when this service is the lead offer, and on its own page */
  ctaLabel: string
  /** Closing call to action copy used when this service is the lead offer */
  pitch: { heading: string; body: string }
  /** One short line shown on the road stop and service card */
  tagline: string
  /** Meta description for the service page */
  metaDescription: string
  /** The problem in plain words */
  problem: string[]
  /** What we do */
  whatWeDo: string[]
  /** What you get at the end */
  deliverables: string[]
  /** Who it is a fit for */
  fit: string[]
  /** Short FAQ */
  faq: FaqItem[]
  /** Optional short note shown next to the title, such as "Free" */
  badge?: string
}
