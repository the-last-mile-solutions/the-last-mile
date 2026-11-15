# QA

Tested on 2026-11-15 against the static build (`npm run generate`, served from `.output/public`) in Chrome. Viewports: 1440 by 900, 1024 by 768, 390 by 844 (mobile emulation with touch).

## Summary

| Area | Result |
| --- | --- |
| Lighthouse, all 6 runs | 100 / 100 / 100 / 100 (performance, accessibility, best practices, SEO) |
| Dropped frames while scrolling the homepage | None measured, including 390px at 4x CPU throttle |
| One h1 per page | Pass on all 8 page types at all 3 widths |
| Horizontal overflow | None on any page at any width |
| Primary CTA in the first viewport | Pass on every page at every width, with and without JavaScript |
| Reduced motion | Road fully drawn and lit, all stops lit, marker parked at the end, no pin, no scrub |
| JavaScript disabled | All copy, stops and links present; CSS rail with lit nodes stands in for the road |
| Contact form by keyboard | Pass with endpoint unset, set, and unreachable |
| Static output | Plain files in `.output/public`; sitemap lists all 11 pages |
| Copy check | Clean. Negative test confirmed it fails on dashes, "lorem", "TODO" and brackets |
| Typecheck | `nuxi typecheck` clean |

## Lighthouse

Simulated throttling, Lighthouse defaults.

| Page | Form factor | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| / | Mobile | 100 | 100 | 100 | 100 | 0.6 s | 0 | 0 ms |
| / | Desktop | 100 | 100 | 100 | 100 | 0.2 s | 0.001 | 0 ms |
| /services/migrations | Mobile | 100 | 100 | 100 | 100 | 0.9 s | 0 | 0 ms |
| /services/migrations | Desktop | 100 | 100 | 100 | 100 | 0.2 s | 0 | 0 ms |
| /contact | Mobile | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |
| /contact | Desktop | 100 | 100 | 100 | 100 | 0.2 s | 0.001 | 0 ms |

LCP element: the homepage h1 (plain text). On the service and contact pages it is the lede paragraph under the h1, also plain server rendered text.

Fixed during QA: /contact scored 96 on best practices because of a hydration mismatch from a `noscript` inside the form. It is now rendered so hydration does not diff it.

## Frame timing

Scripted scroll from top to bottom of the homepage at about 840px per second, timing every animation frame.

| Viewport | CPU | Frames | Average | p95 | p99 | Frames over 33 ms |
| --- | --- | --- | --- | --- | --- | --- |
| 390px mobile | 4x slowdown | 441 | 16.7 ms | 16.8 ms | 16.8 ms | 0 |
| 1440px | none | 456 | 16.7 ms | 16.7 ms | 16.8 ms | 0 |

Only transform, opacity and stroke-dashoffset animate. The glow is a radial gradient, with no filters.

## Homepage against the storyboard

Screenshots taken at each stage: hero, mid pin, problem, each of the five stops, how it works, who we are, final CTA.

| Stage | 1440 | 1024 | 390 |
| --- | --- | --- | --- |
| 1. Hero | Pass. Scribble beside the headline, marker at the start, copy fixed during the 80vh pin. | Pass | Pass. No pin. Short scribble in the gutter. |
| 2. Problem | Pass. Jittery, broken sketch road in the left gutter, lit road drawing behind the marker. | Pass | Pass. Smaller wobble. |
| 3. Road | Pass. S curves between stops alternating left and right. Each stop lights as the marker arrives; upcoming stops stay readable in muted text. | Pass | Pass. Straight gutter line, stops light in turn. |
| 4. How it works | Pass. Three road marks light as the marker passes. | Pass | Pass |
| 5. Who we are | Pass. Two side lines draw in and merge into the road. | Pass | Pass. Shorter merge. |
| 6. Final CTA | Pass. Marker settles beside "Start a conversation" with full glow. | Pass | Pass |

Fixed during QA:

- The SVG road layer briefly took part in layout and grew the page without limit. It is now taken out of flow.
- Hero and merge anchors ignored the page padding, which made a small kink at the top of the road and pulled the no JavaScript rail off its nodes. Both now share one `--page-pad` token.

## Service page

/services/cloud-cost-review and /services/migrations at all three widths: the arrival marker slides in beside the eyebrow, the "you are here" service map shows the current stop lit with the marker on it, dividers draw in on scroll, and the header road lights left to right as you read.

## Reduced motion and no JavaScript

- `prefers-reduced-motion: reduce` at 1440, 1024 and 390: the road is fully drawn and lit, every stop and mark is lit, the merge lines are drawn, and the marker sits at the end of the road. The hero does not pin. Inner pages show the header road fully lit with no marker, and no arrival animation.
- JavaScript disabled at 1440 and 390: full copy, all stops and links. A lit CSS rail runs through lit nodes; on desktop, dashed branches connect the rail to the right hand stops. The no JavaScript marker sits at the end of the road beside the final CTA. The mobile menu and FAQ work (native `details`).

## Contact form, keyboard only

| Step | Endpoint unset | Endpoint set (local mock) | Endpoint unreachable |
| --- | --- | --- | --- |
| Tab to "Send message" and press Enter with the form empty | Alert: "5 things need fixing". Focus moves to Name. `aria-invalid` and `aria-describedby="name-error"` set. | Same | Same |
| Invalid email | Focus moves to Email with "That email does not look right." | Same | Same |
| Honeypot | Skipped by Tab | Skipped by Tab | Skipped by Tab |
| Valid submit | "The form is not live yet" status, focused. Nothing sent. | "Thanks. We have your message." status, focused. Mock received the JSON payload. | "Something went wrong sending your message" alert, focused (fixed during QA: focus did not move before). |

Without JavaScript, the form posts as plain HTML to the endpoint when one is set; when it is not set, a notice says the form is not live yet.

## Static output

- `npm run generate` writes plain HTML, JS and CSS to `.output/public`, with one `index.html` per route.
- `sitemap.xml` lists all 11 pages: home, /services, five service pages, /how-we-work, /about, /faq, /contact.
- `robots.txt` points at the sitemap. Both use `NUXT_PUBLIC_SITE_URL`.
- Changing `LEAD_SERVICE_SLUG` and rebuilding switches the CTA labels, links and closing band copy across every page (tested with `migrations`, then restored).

## Recordings

In `recordings/`:

- `homepage-journey.mp4` and `.gif` (52 seconds): the full homepage scroll at 1440, then at 390.
- `service-page.mp4` and `.gif` (11 seconds): /services/production-readiness at 1440.

These were captured from scripted scrolling frame by frame, so the pacing is smoother than a real hand scroll.

## Remaining issues and notes

- The 390px Chrome window could not be produced by resizing the desktop browser, so mobile checks used Chrome device emulation (Playwright with installed Chrome). Test on a real mid tier Android phone before launch.
- I did not open the DevTools Performance panel. Frame timing was measured with a scripted rAF timer in headless Chrome instead. GPU raster cost on a real phone can differ. Lighthouse TBT is 0 on every page.
- During fast scrolls the marker can trail the lit tip by a few pixels while the scrub catches up. At rest they line up within 2px.
- Firefox does not support CSS scroll driven animations yet. There the header road uses a small scroll listener and the drawn dividers show fully drawn. Not tested in Safari or Firefox in this pass.
- `homepage-journey.gif` is 14 MB. Use the MP4 where possible.
- Open content gaps are listed in `CONTENT_TODO.md` (domain, logo, contact email, form destination, privacy policy and more).
