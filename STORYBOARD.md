# Storyboard

## The idea in one line

A rough, half sketched road runs down the homepage. As you scroll, a clean lit road draws over it and the mile marker rides the leading edge, lighting each service stop as it passes. Behind the marker the road is finished. Ahead of it, it is still a sketch.

## Building blocks

| Piece | What it is | How it is built |
| --- | --- | --- |
| Sketch road | The unfinished road ahead. Faint, broken, wobbly at the start, calmer further down. | One SVG path through the same anchor points as the lit road, with seeded jitter whose size shrinks to zero by the road section. Dashed with uneven gaps so it reads as broken. Static: it never animates. |
| Lit road | The finished road behind the marker. Clean, smooth, pale cool light. | One SVG path through the anchor points (Catmull Rom curve converted to cubic Beziers). Drawn by scrubbing `stroke-dashoffset` from full length to 0. |
| Mile marker | The single hero object. A small rounded post, like the wordmark glyph, in the warm accent. | An SVG group moved along the lit path with MotionPathPlugin (transform only). Its glow is a separate radial gradient circle under it whose opacity steps up at each stop. No filters. |
| Stops | One per service, rendered from `content/services.ts`. | Real HTML list items. Each has a small node on the road. When the marker passes a stop, the node fills, the ring brightens and the label moves from muted to full ink. Both states pass WCAG AA. |
| Anchors | Points the road must pass through. | Elements with `data-road-anchor` in each section. On load and on resize the road is rebuilt from their positions, so section heights and stop count never need hard coding. |

One master ScrollTrigger timeline owns the lit road, the marker and the stop states. There is one hero object and one journey.

## Truthful depiction

The road may only show what the copy says: messy to clean, dark to lit, unfinished to finished. It never shows gauges, charts, graphs, percentages, dollar amounts, arrows going up, or anything that implies savings. The only numbers anywhere in the motion are numbers already in the copy: three engineers (three lines merging), three steps (three road markings), and 20 minutes (written as text on the readout step only, never animated as a counter). Stop numbers 01 to 05 are wayfinding labels and change automatically with the service count.

## Homepage, desktop (1024px and up)

Scroll ranges are in viewport heights (vh) from the top of the page. Exact values come from section heights at runtime; these are design targets.

| # | Section | Scroll range | Marker | Road | Text | Technique | Reduced motion | Mobile |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Hero | 0 to 80vh (hero pinned for 80vh with CSS sticky) | Sits at the road's start, lower left of the headline, dim glow. Eases a short way along as the pin plays. | Starts as a tangled scribble (sketch road only, with loops). During the pin the lit road draws its first segment out of the tangle and the scribble loops fade behind it. | Eyebrow, H1 "Finish what you started.", subhead, both buttons. All visible in server HTML. They never move or fade during the pin. | Apple style sticky pin with scrubbed timeline. Copy fixed, subject changes state. | No pin. Road drawn fully lit, scribble shown faint behind it, marker shown at the end of the road. | No pin. Hero is a normal screen with the road starting as a short scribble down the left gutter. |
| 2 | The problem | 80vh to 200vh | Travels down the left third of the page. Glow unchanged: still prototype territory. | Sketch road is at its roughest here. Three hard kinks, one beside each problem card, where the sketch breaks into gaps. The lit road passes them as smooth curves. | H2 and three problem cards (half finished, a bill nobody understands, stuck on a platform). Cards below the fold get a short line mask rise when they enter, only if they were below the fold at load. | ScrollTrigger scrub on the master timeline. Thealien style mask rise on below the fold cards. | No rise. Cards static. | Same, on the gutter line. Kinks become small wobbles. |
| 3 | The road (services) | 200vh to about 200 + 70 times N vh, where N is the number of services | Moves from stop to stop. At each stop it eases in (the timeline holds briefly) and the glow steps up one level. The stop it reaches lights up. | Wide S curves weaving between stops that sit left and right alternately. Sketch jitter is now gone. Each passed stop leaves its segment fully lit. | H2, intro, then one list item per service: number, title, tagline, link. All visible all the time. The current stop is brightest, but none are ever hidden. | Master timeline scrub. Stop positions are fractions of path length computed from stop anchor positions, so stop count and spacing come from content/services.ts. | Road fully lit, every stop lit, marker parked at the last stop. | Stops stack as a vertical list on the gutter line. Marker slides down the gutter and lights each node as it passes. |
| 4 | How it works | Next 100vh | Passes three road markings, one per step. | Road runs straight and calm. Three short crossing marks appear on it as the marker passes. | H2, three steps: free review, 20 minute readout, you decide. | Scrub. | Marks shown, all lit. | Same marks on the gutter. |
| 5 | Who we are | Next 80vh | Continues. | Two faint side lines join the road from left and right just above this section, so three lines merge into one. This is the only depiction of the team, and it matches the copy: three engineers, one team. | H2 "Three senior engineers who have shipped together for years.", two short paragraphs, link to /about. | Scrub of the two side lines' dashoffset. | Three lines shown already merged. | Merge happens over a short distance on the gutter. |
| 6 | Final CTA | Last 100vh | Arrives at the end of the road, beside the primary button, and settles. Glow at full. | Road ends in a short clean straight, fully lit. | H2, body, button to /contact. | Scrub to the end, then the marker holds. | Marker already here. | Same. |

### Desktop path shape

```
 hero      (scribble loops, lower left of the headline)
   \
    )      problem: down the left third, three kinks in the sketch
   /
  •-------------.         road: wide S curves, stops alternating
                 •        left and right of the page centre
  .-------------'
  •
   '------------.
                 •
  ____________/
       |  |  |            how it works: straight, three marks
    \  |  /               who we are: two side lines merge in
       |
       ◆  [button]        final CTA: the end of the road
```

## Homepage, mobile (under 1024px)

A separate path, not a scaled desktop path.

- The road is a near vertical line in the left gutter (16px in from the edge, content indented to clear it).
- It starts as a short scribble beside the hero headline, wobbles gently through the problem section, and is dead straight from the first service stop onward.
- Stops are nodes on that line, one per service, beside each list item.
- No pinning anywhere. The hero is a normal 100svh screen.
- Same master timeline, rebuilt by `gsap.matchMedia` with this path. Fewer points and a shorter path keep it light on a mid tier phone.

## Reduced motion and no JavaScript

- The server HTML already contains every word, every stop and every link, in reading order.
- Without JavaScript, a CSS line (a pseudo element) shows the road as a single lit vertical line through the services list, with lit stop nodes. No SVG road is needed to read the page.
- With `prefers-reduced-motion: reduce`, JavaScript draws the SVG road fully lit, shows every stop lit and parks the marker at the end. Nothing scrubs, nothing pins, nothing rises.
- No copy ever has an opacity 0 state in the server HTML.

## Inner pages (lighter version of the same language)

| Element | What it does | Reduced motion |
| --- | --- | --- |
| Header road | A thin dotted line under the sticky header lights up from left to right as you read, with a tiny mile marker riding its front edge. CSS scroll driven animation where supported, a passive scroll listener elsewhere. | Shown fully lit, no marker. |
| Arrival marker | On each page load or route change, a small marker slides along a short line into place beside the eyebrow above the H1, once. Transform only. | Shown in place. |
| Service map | On every service page, a small horizontal map of all stops (from content/services.ts) with the current stop lit and the marker on it. Doubles as navigation between services. | Same, static. |
| Drawn rules | Section dividers draw from left to right as they enter. | Shown fully drawn. |

## Performance plan

- GSAP, ScrollTrigger and MotionPathPlugin are loaded with a dynamic import after first paint (`requestIdleCallback` with a timeout), only on pages that use them.
- Animated properties: transform, opacity, stroke-dashoffset. Nothing else.
- The glow is a radial gradient circle; no blur or drop shadow filters.
- The road is rebuilt only on resize (debounced) and after fonts load, never on scroll.
- The SVG sits in its own absolutely positioned layer behind content, so it cannot shift layout (CLS stays near 0).
- LCP is the H1, plain text, rendered by the server, with a preloaded font.

## Smooth scroll decision

No Lenis. Native scroll with scrubbed transforms and dashoffsets is smooth on its own (Apple does it without a smoothing library), and Lenis would interfere with anchor links, find in page, keyboard scrolling and some assistive tech.
