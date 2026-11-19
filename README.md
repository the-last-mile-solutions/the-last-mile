# The Last Mile

Marketing site for The Last Mile. Nuxt 3, static generation, Tailwind CSS, GSAP (ScrollTrigger and MotionPathPlugin) for the homepage road.

## Run it -

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # static site in .output/public, then the copy check runs
npm run preview    # serve .output/public locally
```

`npm run generate` outputs plain static files in `.output/public`. Upload that folder to any static host.

## Environment variables

Copy `.env.example` to `.env` and set:

| Variable | What it does |
| --- | --- |
| `NUXT_PUBLIC_SITE_URL` | The real domain, no trailing slash. Used for canonical links, Open Graph tags, JSON-LD, `sitemap.xml` and `robots.txt`. Defaults to `https://example.com`. |
| `NUXT_PUBLIC_FORM_ENDPOINT` | Where the contact form posts. Leave empty and the form says plainly that it is not live yet. |

| `NUXT_APP_BASE_URL` | Only when the site is served from a subpath, for example `/the-last-mile/` on GitHub Pages. Leave unset for a root domain. |

All are read at build time, so rebuild after changing them.

## GitHub Pages

`.github/workflows/pages.yml` builds and publishes the site on every push to `main`. It sets the base URL and site URL from the repository name. To make the form live there, add a repository variable named `FORM_ENDPOINT`.

## Editing services

Every service lives in one file: `content/services.ts`.

That file drives the service pages, the /services cards, the homepage road stops, the header and footer nav, the "you are here" map on service pages, the sitemap and the road animation itself (how many stops, where they sit, what they say). Nothing else needs editing.

- **Change copy:** edit the fields on the service. Each one has a title, a short stop label, a tagline, the problem, what we do, what you get, who it fits, a short FAQ, and the CTA copy used when it is the lead offer.
- **Reorder services:** reorder the `services` array. The road, nav, cards and sitemap follow the new order.
- **Add a service:** add an object to the array with a new `slug`. A page is generated at `/services/<slug>` and a new stop appears on the road.
- **Remove a service:** delete its object.

## Changing the lead offer

The lead offer is the primary call to action across the whole site: the header button, the hero button, and the closing CTA band.

In `content/services.ts`, change:

```ts
export const LEAD_SERVICE_SLUG = 'cloud-cost-review'
```

to the slug of another service. The button label comes from that service's `ctaLabel` and the closing band from its `pitch`. The build fails if the slug does not match a service.

The homepage "How it starts" section and the FAQ describe the free review specifically. If you change the lead, review that copy in `content/site.ts`.

## Setting up the contact form

The form lives in `components/ContactForm.vue`. All submit logic is in `composables/useContactForm.ts`.

1. Pick any endpoint that accepts a JSON POST: Formspree, Basin, a serverless function, or your own API.
2. Set `NUXT_PUBLIC_FORM_ENDPOINT` to its URL and rebuild.
3. The form sends JSON with `name`, `email`, `company`, `platform`, `bill`, `message` and `source`. Any non 2xx response shows a friendly retry message.

The hidden `website` field is a honeypot. If a bot fills it, the form pretends to succeed and sends nothing.

Without JavaScript, the form posts as a normal HTML form to the same endpoint, if one is set.

## Other copy

Everything that is not a service lives in `content/site.ts`: homepage sections, how we work, about, FAQ and contact page copy.

## The copy check

`scripts/check-copy.mjs` runs after every `npm run generate` and fails the build if the rendered site contains an en dash, an em dash, "lorem", "TODO" or square brackets, or if any source or doc file contains an en or em dash. Run it on its own with `npm run check:copy`.

## Motion

- Homepage: `components/RoadJourney.vue` draws the road through every element marked `data-road-anchor`. Geometry is in `utils/road.ts`. See `STORYBOARD.md` for the design.
- Inner pages: `components/HeaderRoad.vue` (reading progress road under the header), `components/PageIntro.vue` (arrival marker) and `components/DrawRule.vue` (dividers). All CSS, no GSAP.
- Reduced motion and no JavaScript both get the finished, fully lit road and every word of copy.

## Project docs

- `RESEARCH.md`: recon of the reference sites.
- `STORYBOARD.md`: the homepage journey, section by section.
- `CONTENT_TODO.md`: real facts still missing.
- `QA.md`: test results.
