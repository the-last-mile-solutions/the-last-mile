/**
 * THE source of truth for services.
 *
 * Order of this array = order on the road, the /services page, the nav and the sitemap.
 * The road animation reads its stop count, spacing and labels from this array.
 * To change the lead offer, change LEAD_SERVICE_SLUG below. Nothing else needs editing.
 */
import type { Service } from '~/types/content'

export const services: Service[] = [
  {
    slug: 'cloud-cost-review',
    pitch: {
      heading: 'Start with a free cloud cost review.',
      body: 'A fixed scope review, a short written report and a 20 minute readout. Then you decide.',
    },
    ctaLabel: 'Get a free cloud cost review',
    title: 'Free cloud cost review',
    stopLabel: 'Cost review',
    tagline: 'Find out where your cloud money goes and what you can cut.',
    badge: 'Free',
    metaDescription:
      'A free, fixed scope review of your cloud and hosting spend. You get a short written report and a 20 minute readout. No obligation.',
    problem: [
      'Your cloud bill keeps growing and nobody can say exactly why.',
      'It is spread across services you set up once and forgot about. Some of it is doing real work. Some of it is not.',
      'Finding out usually means pulling an engineer off the roadmap for a week. So it never happens.',
    ],
    whatWeDo: [
      'We look at your cloud and hosting accounts with read only access.',
      'We map what you pay for to what your app actually uses.',
      'We flag what can be cut, resized or moved, and what it would take to do it safely.',
      'The scope is fixed and agreed up front. We do not change anything in your accounts.',
    ],
    deliverables: [
      'A short written report of where the money goes.',
      'A clear list of what can be cut, ranked by effort and risk.',
      'A 20 minute readout call to walk through it and answer questions.',
      'No obligation. The report is yours whether or not you hire us.',
    ],
    fit: [
      'Teams with a monthly cloud or hosting bill above a few thousand dollars.',
      'Someone on your side who can approve follow up work if it makes sense.',
      'You want an outside opinion before you make changes.',
    ],
    faq: [
      {
        question: 'Is it really free?',
        answer:
          'Yes. The review, the report and the readout cost nothing. We do it because it is the best way to show you how we work.',
      },
      {
        question: 'What access do you need?',
        answer:
          'Read only access to billing and resource data in your cloud or hosting accounts. We will tell you exactly which permissions before we start, and you can remove them the moment we finish.',
      },
      {
        question: 'Will you change anything?',
        answer: 'No. The review is look only. Any changes happen later, if and when you decide to go ahead.',
      },
    ],
  },
  {
    slug: 'production-readiness',
    pitch: {
      heading: 'Make your app ready for real customers.',
      body: 'Tell us what you built. We will tell you plainly what it needs to be safe.',
    },
    ctaLabel: 'Make my app production ready',
    title: 'Production readiness',
    stopLabel: 'Production ready',
    tagline: 'Turn the app you built fast into one you can trust with real users.',
    metaDescription:
      'We take apps built quickly with tools like Claude and Lovable and make them production ready: security, auth, data handling, monitoring, backups and real hosting.',
    problem: [
      'You built something real, fast, with tools like Claude or Lovable. People want to use it.',
      'But you are not sure it is safe. Auth was bolted on. Secrets might be in the code. Nobody knows what happens if the database goes down.',
      'You need it to hold up before you put more customers on it.',
    ],
    whatWeDo: [
      'We review the code and the setup and tell you plainly what is risky.',
      'We harden security and fix auth so the right people see the right data.',
      'We set up data handling, backups and a way to restore them.',
      'We add monitoring so you hear about problems before your customers do.',
      'We move it onto real hosting you control.',
    ],
    deliverables: [
      'An app that is safe to put in front of paying customers.',
      'Backups that have been tested, not just turned on.',
      'Monitoring and alerts that go to the right people.',
      'Plain written notes on what we changed and why.',
    ],
    fit: [
      'Founders with a working prototype and real users waiting.',
      'Teams who built fast and now need it to be solid.',
      'Anyone who would rather fix it now than after an incident.',
    ],
    faq: [
      {
        question: 'Do you rewrite the whole app?',
        answer:
          'Almost never. We keep what works and fix what is risky. A rewrite is only on the table if you ask for it or if there is no safe way around it.',
      },
      {
        question: 'Can we keep building while you work?',
        answer: 'Yes. We plan the work so your team can keep shipping features alongside us.',
      },
    ],
  },
  {
    slug: 'migrations',
    pitch: {
      heading: 'Plan the move before you make it.',
      body: 'Tell us what you are moving from and to. We will tell you what it takes.',
    },
    ctaLabel: 'Plan my migration',
    title: 'Migrations',
    stopLabel: 'Migrations',
    tagline: 'Move databases and auth without drama, and always with a rollback plan.',
    metaDescription:
      'Database and auth migrations we have done before, like Azure SQL to Postgres and Auth0 to Clerk. Planned, tested, and always with a rollback plan.',
    problem: [
      'You need to move off a database or auth provider. Maybe it costs too much. Maybe it is holding you back.',
      'Migrations are where apps break. Data goes missing. Users get locked out. Weekends disappear.',
      'So it keeps getting pushed to next quarter.',
    ],
    whatWeDo: [
      'We do migrations we have done before, like Azure SQL to Postgres and Auth0 to Clerk.',
      'We plan the move step by step and agree it with you before we start.',
      'We test it on a copy of your real data first.',
      'Every step has a rollback plan, written down, before we take it.',
    ],
    deliverables: [
      'Your app running on the new system.',
      'Data checked on both sides so nothing is quietly lost.',
      'A written rollback plan for every step.',
      'Notes your team can follow to run the new setup.',
    ],
    fit: [
      'Teams stuck on a database or auth provider they want to leave.',
      'Apps with real users who cannot afford a long outage.',
      'Anyone who has put off a migration because it felt too risky.',
    ],
    faq: [
      {
        question: 'Will there be downtime?',
        answer:
          'We plan for as little as possible, and we tell you up front what to expect. Many moves can happen with no visible downtime at all.',
      },
      {
        question: 'What if something goes wrong?',
        answer: 'We roll back. That is why every step has a rollback plan before we start it.',
      },
    ],
  },
  {
    slug: 'own-your-code',
    pitch: {
      heading: 'Own the thing your business runs on.',
      body: 'Tell us where your app lives today. We will tell you what it takes to own it.',
    },
    ctaLabel: 'Help me own my code',
    title: 'Own your code',
    stopLabel: 'Own your code',
    tagline: 'Keep what you built on Vercel or Lovable, and own the code and hosting.',
    metaDescription:
      'An off ramp for apps built on Vercel, Lovable and similar platforms. Keep what you like, own your code and your hosting.',
    problem: [
      'You built something you like on a platform like Vercel or Lovable.',
      'Now the bill is climbing, or you have hit a limit, or you just want it in your own hands.',
      'Leaving feels like starting over.',
    ],
    whatWeDo: [
      'We take a copy of what you have and get it running on hosting you own.',
      'We keep the parts you like and replace the parts that tie you to the platform.',
      'We put the code in your own repository with a simple way to deploy it.',
      'We switch over when you are ready, not before.',
    ],
    deliverables: [
      'Your code in your own repository.',
      'Hosting in your own account, in your name.',
      'A simple, written way to deploy changes.',
      'The same app your users know, without the lock in.',
    ],
    fit: [
      'Founders who like what they built but not where it lives.',
      'Teams hitting platform limits or rising platform bills.',
      'Anyone who wants to own the thing their business runs on.',
    ],
    faq: [
      {
        question: 'Do we have to stop using the platform?',
        answer:
          'No. Some teams keep part of it. We help you decide what to keep and what to own, and we explain the tradeoffs plainly.',
      },
      {
        question: 'Will our users notice?',
        answer: 'They should not. The goal is the same app, running somewhere you control.',
      },
    ],
  },
  {
    slug: 'ongoing-ownership',
    pitch: {
      heading: 'Get one team who owns it.',
      body: 'Tell us about your app. We will tell you plainly whether we are the right fit.',
    },
    ctaLabel: 'Talk about ongoing ownership',
    title: 'Ongoing ownership',
    stopLabel: 'We keep it running',
    tagline: 'One team owns your app after launch: costs, hosting and technical leadership.',
    metaDescription:
      'One team owns your app after launch. Ongoing cost monitoring, hosting and fractional technical leadership, monthly.',
    problem: [
      'Launch is not the end. Someone has to watch costs, keep hosting healthy and make the technical calls.',
      'You do not need a full time engineering lead yet. But you do need someone who owns it.',
      'Without that, small problems pile up until they are big ones.',
    ],
    whatWeDo: [
      'We watch your cloud costs every month and tell you when something changes.',
      'We keep your hosting patched, backed up and monitored.',
      'We act as your technical lead part time: decisions, reviews, hiring help when you need it.',
      'You get one team to call, who already knows your app.',
    ],
    deliverables: [
      'A short monthly note on costs, health and anything that needs a decision.',
      'Hosting that stays patched, backed up and watched.',
      'A senior technical voice in your planning.',
      'A clean hand off to your own team whenever you are ready.',
    ],
    fit: [
      'Teams with a live app and no full time engineering lead.',
      'Founders who want one accountable owner for the technical side.',
      'Anyone who finished a project with us and wants us to keep it running.',
    ],
    faq: [
      {
        question: 'Is there a long contract?',
        answer: 'It is monthly. If it stops being useful, you stop.',
      },
      {
        question: 'Can we bring it in house later?',
        answer:
          'Yes. That is part of the plan from day one. We keep everything documented so the hand off is easy.',
      },
    ],
  },
]

/** The lead offer. Change this slug to change the primary offer across the site. */
export const LEAD_SERVICE_SLUG = 'cloud-cost-review'

export const leadService: Service = (() => {
  const found = services.find((s) => s.slug === LEAD_SERVICE_SLUG)
  if (!found) throw new Error(`LEAD_SERVICE_SLUG "${LEAD_SERVICE_SLUG}" does not match any service`)
  return found
})()

export const getService = (slug: string) => services.find((s) => s.slug === slug)
