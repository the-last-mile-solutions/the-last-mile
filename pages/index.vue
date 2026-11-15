<script setup lang="ts">
import { services } from '~/content/services'
import { home, site } from '~/content/site'

const lead = useLead()
const { base } = usePageSeo({
  title: 'Finish what you started',
  description: site.description,
  path: '/',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    description: site.description,
    url: (useRuntimeConfig().public.siteUrl as string).replace(/\/$/, '') + '/',
    knowsAbout: ['Cloud cost reduction', 'Production readiness', 'Database migration', 'Auth migration', 'Cloud hosting'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.tagline },
      })),
    },
  },
})
void base

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <RoadJourney>
    <!-- 1. Hero. Pinned with CSS sticky on desktop when motion is allowed. Copy never moves or fades. -->
    <section class="hero relative lg:motion-safe:h-[calc(100svh+80vh)]" aria-labelledby="hero-h">
      <div class="rail-layer" aria-hidden="true">
        <span class="rail-anchor" data-road-anchor="start" style="top: 36svh" />
        <span class="rail-label left-[var(--rail-x)] top-[calc(36svh+2.5rem)]">{{ home.road.startLabel }}</span>
        <span class="rail-anchor bottom-[6vh]" data-road-anchor="hero" />
      </div>
      <div
        class="flex min-h-[calc(100svh-var(--header-h))] items-center lg:motion-safe:sticky lg:motion-safe:top-[var(--header-h)] lg:motion-safe:h-[calc(100svh-var(--header-h))]"
      >
        <div class="page-x py-16">
          <div class="rail-indent max-w-5xl">
            <p class="eyebrow">{{ home.hero.eyebrow }}</p>
            <h1 id="hero-h" class="h-display mt-6">{{ home.hero.headline }}</h1>
            <p class="lede mt-6 max-w-2xl">{{ home.hero.subhead }}</p>
            <div class="mt-10 flex flex-wrap gap-3">
              <AppButton :to="lead.to" size="lg">{{ lead.label }}</AppButton>
              <AppButton to="#road" variant="secondary" size="lg">{{ home.hero.secondaryLabel }}</AppButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. The problem -->
    <section class="page-x relative py-24 sm:py-32" aria-labelledby="problem-h">
      <div class="rail-indent">
        <p class="eyebrow">The problem</p>
        <h2 id="problem-h" class="h-section mt-5 max-w-3xl">{{ home.problem.heading }}</h2>
        <p class="lede mt-6 max-w-2xl">{{ home.problem.intro }}</p>
      </div>
      <ol class="mt-16 sm:mt-20">
        <li
          v-for="(p, i) in home.problem.points"
          :key="p.title"
          class="relative border-t border-line/70 py-10 sm:py-14"
          data-reveal
        >
          <span class="rail-anchor top-14" data-road-anchor="kink" aria-hidden="true" />
          <div class="rail-indent grid gap-3 lg:grid-cols-[4rem_minmax(0,22rem)_minmax(0,1fr)] lg:gap-10">
            <span class="font-mono text-sm text-muted">{{ pad(i + 1) }}</span>
            <h3 class="h-card text-2xl">{{ p.title }}</h3>
            <p class="max-w-xl text-lg leading-relaxed text-muted">{{ p.body }}</p>
          </div>
        </li>
      </ol>
    </section>

    <!-- 3. The road: one stop per service, rendered from content/services.ts -->
    <section id="road" class="page-x relative py-24 sm:py-32" aria-labelledby="road-h">
      <div class="rail-indent">
        <p class="eyebrow">What we do</p>
        <h2 id="road-h" class="h-section mt-5 max-w-3xl">{{ home.road.heading }}</h2>
        <p class="lede mt-6 max-w-2xl">{{ home.road.intro }}</p>
      </div>
      <ol class="stops mt-16 sm:mt-24">
        <li
          v-for="(s, i) in services"
          :key="s.slug"
          class="relative pb-16 last:pb-0 sm:pb-20 lg:pb-32"
          :data-road-lit="`stop-${s.slug}`"
        >
          <span class="rail-node" data-road-anchor="stop" :data-road-id="`stop-${s.slug}`" aria-hidden="true" />
          <div class="rail-indent pr-4">
            <p class="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">
              Stop {{ pad(i + 1) }}
              <span v-if="s.badge" class="rounded-full border border-lit/50 px-2 py-0.5 text-[11px] text-lit">{{ s.badge }}</span>
            </p>
            <h3 class="lit-text mt-3 text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">{{ s.title }}</h3>
            <p class="mt-3 max-w-md text-lg leading-relaxed text-muted">{{ s.tagline }}</p>
            <NuxtLink
              :to="`/services/${s.slug}`"
              class="mt-5 inline-flex items-center gap-2 text-[15px] text-ink underline decoration-line underline-offset-[6px] transition-colors hover:decoration-lit"
            >
              More about {{ s.title.toLowerCase() }}<span aria-hidden="true">&rarr;</span>
            </NuxtLink>
          </div>
        </li>
      </ol>
    </section>

    <!-- 4. How it works: three road markings -->
    <section class="page-x relative py-24 sm:py-32" aria-labelledby="how-h">
      <div class="rail-indent">
        <p class="eyebrow">How it starts</p>
        <h2 id="how-h" class="h-section mt-5 max-w-3xl">{{ home.how.heading }}</h2>
        <p class="lede mt-6 max-w-2xl">{{ home.how.intro }}</p>
      </div>
      <ol class="mt-14 space-y-12 sm:mt-20 sm:space-y-16">
        <li v-for="(step, i) in home.how.steps" :key="step.title" class="relative" :data-road-lit="`mark-${i}`" data-reveal>
          <span class="rail-mark" data-road-anchor="mark" :data-road-id="`mark-${i}`" aria-hidden="true" />
          <div class="rail-indent grid gap-3 lg:grid-cols-[4rem_minmax(0,22rem)_minmax(0,1fr)] lg:gap-10">
            <span class="font-mono text-sm text-muted">Step {{ i + 1 }}</span>
            <h3 class="lit-text h-card text-2xl">{{ step.title }}</h3>
            <p class="max-w-xl text-lg leading-relaxed text-muted">{{ step.body }}</p>
          </div>
        </li>
      </ol>
      <div class="rail-indent mt-14">
        <NuxtLink to="/how-we-work" class="text-[15px] text-ink underline decoration-line underline-offset-[6px] hover:decoration-lit">
          The whole process, start to finish <span aria-hidden="true">&rarr;</span>
        </NuxtLink>
      </div>
    </section>

    <!-- 5. Who we are: three lines merge into one road -->
    <section class="page-x relative py-24 sm:py-32" aria-labelledby="who-h">
      <div class="rail-indent relative pt-16" data-reveal>
        <span class="rail-anchor top-4" data-road-anchor="merge" aria-hidden="true" />
        <p class="eyebrow">Who we are</p>
        <h2 id="who-h" class="h-section mt-5 max-w-4xl">{{ home.who.heading }}</h2>
        <div class="prose-body mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          <p v-for="para in home.who.body" :key="para">{{ para }}</p>
        </div>
        <NuxtLink to="/about" class="mt-8 inline-block text-[15px] text-ink underline decoration-line underline-offset-[6px] hover:decoration-lit">
          {{ home.who.linkLabel }} <span aria-hidden="true">&rarr;</span>
        </NuxtLink>
      </div>
    </section>

    <!-- 6. Final call to action: the end of the road -->
    <section class="final page-x relative pb-28 pt-16 sm:pb-40" aria-labelledby="final-h">
      <div class="rail-indent">
        <p class="eyebrow">{{ home.road.endLabel }}</p>
        <h2 id="final-h" class="h-section mt-5 max-w-4xl">{{ home.final.heading }}</h2>
        <p class="lede mt-6 max-w-2xl">{{ home.final.body }}</p>
        <div class="relative mt-10" data-road-lit="end">
          <span class="rail-end-marker" style="left: calc(var(--rail-x) - var(--rail-indent))" aria-hidden="true" />
          <span
            class="rail-anchor top-1/2"
            style="left: calc(var(--rail-x) - var(--rail-indent))"
            data-road-anchor="end"
            data-road-id="end"
            aria-hidden="true"
          />
          <div class="flex flex-wrap gap-3">
            <AppButton to="/contact" size="lg">{{ home.final.buttonLabel }}</AppButton>
            <AppButton :to="lead.to" variant="secondary" size="lg">{{ lead.label }}</AppButton>
          </div>
        </div>
      </div>
    </section>
  </RoadJourney>
</template>

<style scoped>
.rail-label {
  position: absolute;
  transform: translateX(-50%);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgb(var(--c-muted));
  writing-mode: vertical-rl;
}
@media (max-width: 639px) {
  .rail-label {
    display: none;
  }
}
</style>
