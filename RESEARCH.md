# Recon

Recon done in Chrome at 1440 by 900 on 2026-11-15. Each site was scrolled slowly with screenshots at intervals, and the DOM and computed styles were inspected from the console. We borrow how things are built and how they feel. No visuals, layouts, copy or assets are taken.

## Role changes after recon

| Site | Starting role | Role after recon | Why |
| --- | --- | --- | --- |
| apple.com/iphone | Technique (primary) | Technique (primary), but the real reference is a product page such as apple.com/iphone-18-pro | The /iphone landing page only uses scroll triggered reveals and carousels. The pinned, scrubbed sequences live on the product pages. |
| thealien.design | Technique | Technique | Confirmed. GSAP and ScrollTrigger on Webflow, with Lenis. |
| loungelizard.com | Technique | Mood and conversion patterns only | WordPress, no GSAP, no ScrollTrigger, no pinning, no SVG motion. Its motion is background video and CSS transitions. Its useful lessons are about CTA placement, not motion. |
| interodigital.com | Aesthetic | Aesthetic, low weight | Light theme, heavy on logos and statistics, which our rules forbid. Useful for section rhythm and CTA repetition only. |
| instinctools.com | Aesthetic | Aesthetic, high weight | Closest in tone to a senior engineering firm: calm, airy, one sharp accent. Most of our mood comes from here. |

## Technique sites

### apple.com (iPhone 18 Pro product page, primary)

1. **Pinning with CSS sticky, not JavaScript.** The camera story is a `.sticky-container` (`position: sticky; top: 0`, 930px tall) inside a parent about 2044px tall. The browser does the pinning. JavaScript only reads how far the parent has scrolled and turns that into progress. There are no pin spacers and no layout jumps when scripts load. **We use this** for the desktop hero pin and the road section.
2. **One subject, many states, copy stays put.** In "Pro camera system" the headline sits centered while a single lens image scales and pulls back to reveal the whole camera. The words never move while the subject changes. **We use this** for the hero: the headline stays fixed and readable while the road beneath it untangles from scribble to line.
3. **Keyframes declared in markup, driven by one scroll engine.** Elements carry `data-anim-keyframe` attributes such as `{"start":"t - 70vh","cssClass":"animate"}` grouped by `data-anim-scroll-group` (26 groups on the page). One engine evaluates them all. **We use this idea** with GSAP: one master timeline for the road, with stop positions computed from data attributes rendered from content/services.ts.
4. **Scroll linked brightness on copy.** "Most wanted." starts nearly black on black and brightens as it scrolls into place, using opacity and color only. **We do not copy this.** It hides copy until JavaScript runs. We apply the same idea to the road and the stops (dark to lit), never to the copy.
5. **A sticky local nav with the buy button.** A slim bar with "Buy" stays pinned after the hero. **We use this** as the reason our sticky header always carries the primary CTA.

Canvas (one 1440 by 760) and 14 videos are used for image sequences. We do not need either: our subject is vector.

### thealien.design

1. **GSAP plus ScrollTrigger plus Lenis on Webflow.** `window.gsap` and `window.ScrollTrigger` are present, and Lenis smooths the scroll. **We skip Lenis.** Apple shows native scroll scrubs smoothly when only transforms and dashoffsets change, and Lenis would break native anchor jumps, find in page and some assistive tech.
2. **Line mask reveals.** Headings are split into lines (410 split elements). Each line rises out of an `overflow: hidden` mask; screenshots show "Branding" cut in half mid reveal. **Adapted:** we only run reveals on elements that are below the fold at hydration time, so server rendered copy is never hidden, and never with reduced motion.
3. **Rules that draw on scroll.** Thin divider lines grow from 0 to full width as their section enters (a `scaleX` tween with ScrollTrigger). **We use this** for section dividers on inner pages, as a quiet echo of the road.
4. **Fixed UI layer.** A loader, nav and a custom cursor all live in fixed layers. **We skip** the loader and custom cursor; they delay content and add nothing for a founder in a hurry.
5. **Marquee in the headline.** Pills of text scroll sideways inside the hero headline. **We skip this.** It makes the headline harder to read, and the headline is our LCP element.

### loungelizard.com

1. **Persistent floating CTA.** "Request proposal" floats bottom right on every scroll position. **Adapted:** our CTA lives in the sticky header instead, so it never covers content on a phone.
2. **Header that compacts on scroll.** The top bar collapses into a white card with nav and "Let's talk". **We use** a simpler version: one fixed height header from the start, so there is no layout shift.
3. **Numbered process accordion.** Steps 01 to 06 open one at a time beside a sticky image. **Adapted** for /how-we-work as an always open numbered list on the road, because closed accordions hide copy.
4. **Background video hero.** **We skip it.** It is heavy and would compete with the headline for LCP.

No GSAP, ScrollTrigger, pinning or SVG animation was found here.

## Aesthetic summary

### instinctools.com (main mood source)

- **Type:** Aeonik Pro at regular weight (400), very large (H1 80px, H2 60px) with tight tracking (minus 0.02em) and line height 1.0. IBM Plex Mono for small index numbers (01, 02).
- **Whitespace:** generous. Sections breathe, often half the viewport is empty.
- **Pacing:** slow. One idea per screen. Service list as a calm numbered index with an arrow per row.
- **Contrast and color:** cool navy text on white, one red asterisk used sparingly as the only accent.
- **Tone:** quiet confidence. No shouting, no exclamation marks.

### interodigital.com (low weight)

- **Type:** Montserrat ExtraBold (800) headings, small uppercase eyebrows with a short rule before them.
- **Rhythm:** eyebrow, then headline, then a short lede, then content. Predictable and easy to scan.
- **CTA:** repeated in a top bar on every scroll position.
- **What we avoid:** logo walls, statistics, "proven impact" claims. Our rules forbid them and they read as noise to a skeptical founder.

### What we carry over, inside our palette

| Take | How it works for us |
| --- | --- |
| Large, tight, calm headings | Geist variable, semibold at display sizes with minus 0.035em tracking, line height near 1.0. Semibold instead of regular because white text on near black looks thinner than navy on white. |
| Mono for indexes | Geist Mono for stop numbers, eyebrows and small labels. Feels like an engineer wrote it. |
| One accent, used sparingly | Our warm amber is the red asterisk equivalent, but stricter: only the mile marker and CTA buttons. |
| Air and slow pacing | One idea per screen on desktop, generous section padding, max line length near 65 characters. |
| Eyebrow, headline, lede rhythm | Used on every section so a skimmer can read only the headlines. |
| Cool color temperature | Near black with a slight blue cast, cool grey text, and a pale cool "lit" color for the finished road. The warm accent stands out because everything else is cool. |
| Dark theme | None of the aesthetic sites are dark. Apple's dark product pages are the reference for how big type and a single lit subject read on black. |
