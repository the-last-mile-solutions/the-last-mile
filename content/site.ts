/**
 * Site wide copy that is not a service.
 * Services live in content/services.ts and nowhere else.
 */
import type { FaqItem } from '~/types/content'

export const site = {
  name: 'The Last Mile',
  description:
    'Three senior engineers who take apps that are almost there and carry them the last mile: production ready, cheaper to run, and owned by the people who built them.',
}

export const home = {
  hero: {
    eyebrow: 'Three senior engineers. One small team.',
    headline: 'Finish what you started.',
    subhead:
      'We take apps that are almost there and carry them the last mile: production ready, cheaper to run, and yours.',
    secondaryLabel: 'See what we do',
  },
  problem: {
    heading: 'Most apps stall in the last mile.',
    intro: 'Getting something working is the fast part now. Getting it ready for real customers is where things get stuck.',
    points: [
      {
        title: 'Half finished',
        body: 'You built it fast with AI tools. It works on a good day. You are not sure it is safe, or what happens on a bad one.',
      },
      {
        title: 'A bill nobody understands',
        body: 'The cloud bill grows every month. Nobody on the team can say where the money goes or what is safe to turn off.',
      },
      {
        title: 'Stuck on a platform',
        body: 'You started on a platform that made it easy. Now it is expensive or limiting, and leaving feels like starting over.',
      },
    ],
  },
  road: {
    heading: 'The road from prototype to production.',
    intro: 'Each stop is one thing we do. Start anywhere. Most teams start with the free review.',
    startLabel: 'Prototype',
    endLabel: 'Production',
  },
  how: {
    heading: 'How it starts.',
    intro: 'Three steps. No pitch deck, no long sales process.',
    steps: [
      {
        title: 'Free review',
        body: 'A fixed scope look at your cloud and hosting spend, with read only access. We do not change anything.',
      },
      {
        title: '20 minute readout',
        body: 'We walk you through a short written report: where the money goes and what can be cut.',
      },
      {
        title: 'You decide',
        body: 'If you want us to do the work, we send a fixed scope proposal. If not, the report is still yours.',
      },
    ],
  },
  who: {
    heading: 'Three senior engineers who have shipped together for years.',
    body: [
      'We are a small team on purpose. The people you talk to are the people who do the work.',
      'We have built, scaled, migrated and kept running the kind of apps you are building now. We started The Last Mile to do that work directly, for teams who need it done right.',
    ],
    linkLabel: 'Why we started',
  },
  final: {
    heading: 'Almost there? Let us carry it the rest of the way.',
    body: 'Tell us what you built and where it runs. We will tell you plainly whether we can help.',
    buttonLabel: 'Start a conversation',
  },
}

export const howWeWork = {
  title: 'How we work',
  metaDescription:
    'Our process from first call to hand off: qualify, review, readout, fixed scope proposal, build, then hand off or keep running it for you.',
  intro: 'Every project follows the same road. You always know where you are on it and what comes next.',
  steps: [
    {
      title: 'Qualify',
      body: 'A short conversation about what you built, where it runs and what is bothering you. If we are not the right fit, we say so.',
    },
    {
      title: 'Review',
      body: 'A free, fixed scope review of your cloud and hosting spend, using read only access. Nothing in your accounts changes.',
    },
    {
      title: 'Readout',
      body: 'A 20 minute call where we walk through a short written report: where the money goes, what can be cut and what is risky.',
    },
    {
      title: 'Fixed scope proposal',
      body: 'If you want us to do the work, we write down exactly what we will do and what you get at the end. No open ended billing.',
    },
    {
      title: 'Build',
      body: 'We do the work in small, reviewable steps. You see progress as it happens, and every risky change has a rollback plan.',
    },
    {
      title: 'Hand off or keep running',
      body: 'We hand everything to your team with clear notes. Or, if you prefer, we keep running it for you every month.',
    },
  ],
}

export const about = {
  title: 'About',
  metaDescription:
    'Why three senior engineers started The Last Mile, and how we work with small teams and founders.',
  intro: 'We started The Last Mile because the last mile is where good apps get stuck.',
  sections: [
    {
      heading: 'Why we started',
      body: [
        'Building an app has never been faster. Tools like Claude and Lovable let a founder go from idea to working product in days.',
        'But working is not the same as ready. Security, backups, monitoring, sensible hosting and a bill that makes sense still take experience. That is the part that gets skipped, and it is the part that hurts later.',
        'We are three senior engineers who have done that work together for years. We started The Last Mile to do it directly, for the teams who need it.',
      ],
    },
    {
      heading: 'How we work',
      body: [
        'We keep the team small. The people on the first call are the people who do the work.',
        'We agree a fixed scope before we start, so you know what you are getting.',
        'We keep what works. We only replace what is risky, expensive or in your way.',
        'We write things down. When we finish, your team can run what we built without us.',
      ],
    },
    {
      heading: 'What we believe',
      body: [
        'You should own your code and your hosting.',
        'Your cloud bill should make sense to the person paying it.',
        'Plain answers beat clever ones.',
      ],
    },
  ],
}

export const faqPage = {
  title: 'Frequently asked questions',
  metaDescription:
    'Answers to common questions about The Last Mile: the free cloud cost review, access, small teams and what happens after the readout.',
  items: [
    {
      question: 'Is the review really free?',
      answer:
        'Yes. The review, the written report and the 20 minute readout cost nothing, and there is no obligation. We do it because it is the best way to show you how we work.',
    },
    {
      question: 'What access do you need?',
      answer:
        'For the review, read only access to billing and resource data in your cloud or hosting accounts. We tell you exactly which permissions before we start, and you can remove them as soon as we finish. For project work, we agree access together and keep it as narrow as the job allows.',
    },
    {
      question: 'Do you work with small teams?',
      answer:
        'Yes. Most of the teams we work with are small. Some are a single founder. What matters is that you have something real and someone who can decide on next steps.',
    },
    {
      question: 'What happens after the readout?',
      answer:
        'You decide. If you want us to do the work, we send a fixed scope proposal. If you would rather do it yourselves, the report is yours to keep and use.',
    },
    {
      question: 'Where have you done this before?',
      answer:
        "On projects we can't name for confidentiality, and we're happy to walk through how we'd approach yours.",
    },
    {
      question: 'Do you only work on apps built with AI tools?',
      answer:
        'No. We work on any app that is almost there. Apps built quickly with AI tools are just a common case right now.',
    },
  ] as FaqItem[],
}

export const contactPage = {
  title: 'Contact',
  metaDescription:
    'Tell us what you built and where it runs. Ask for a free cloud cost review or start a conversation with The Last Mile.',
  intro: 'Tell us what you built and where it runs. We will reply plainly, and if we are not the right fit we will say so.',
  billRanges: [
    'Not sure',
    'Under $1,000 a month',
    '$1,000 to $5,000 a month',
    '$5,000 to $20,000 a month',
    'Over $20,000 a month',
  ],
}
