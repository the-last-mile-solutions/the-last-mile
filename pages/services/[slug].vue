<script setup lang="ts">
import { services, getService, LEAD_SERVICE_SLUG } from '~/content/services'

const route = useRoute()
const service = getService(String(route.params.slug))
if (!service) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })

const lead = useLead()
const isLead = service.slug === LEAD_SERVICE_SLUG
const idx = services.findIndex((s) => s.slug === service.slug)
const next = services[idx + 1]
const { public: pub } = useRuntimeConfig()
const siteUrl = String(pub.siteUrl).replace(/\/$/, '')

usePageSeo({
  title: service.title,
  description: service.metaDescription,
  path: `/services/${service.slug}`,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.metaDescription,
      url: `${siteUrl}/services/${service.slug}`,
      serviceType: service.title,
      provider: { '@type': 'ProfessionalService', name: 'The Last Mile', url: `${siteUrl}/` },
      ...(service.badge === 'Free' ? { offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ],
})

const blocks = [
  { id: 'problem', label: 'The problem', title: 'Where you are now', items: service.problem, list: false },
  { id: 'what', label: 'What we do', title: 'What we do', items: service.whatWeDo, list: true },
  { id: 'get', label: 'What you get', title: 'What you get at the end', items: service.deliverables, list: true },
  { id: 'fit', label: 'Who it is for', title: 'Who it is a fit for', items: service.fit, list: true },
]
</script>

<template>
  <div>
    <PageIntro :eyebrow="`Stop ${String(idx + 1).padStart(2, '0')}${service.badge ? ' · ' + service.badge : ''}`" :title="service.title" :lede="service.tagline">
      <AppButton :to="isLead ? '/contact' : lead.to" size="lg">{{ isLead ? service.ctaLabel : lead.label }}</AppButton>
      <AppButton :to="isLead ? '/how-we-work' : '/contact'" variant="secondary" size="lg">
        {{ isLead ? 'How it works' : 'Talk to us about this' }}
      </AppButton>
    </PageIntro>

    <div class="page-x pb-6">
      <ServiceMap :current="service.slug" />
    </div>

    <div class="page-x">
      <section v-for="b in blocks" :key="b.id" class="py-14 sm:py-20" :aria-labelledby="`${b.id}-h`">
        <DrawRule />
        <div class="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div>
            <p class="eyebrow">{{ b.label }}</p>
            <h2 :id="`${b.id}-h`" class="mt-4 text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-4xl">{{ b.title }}</h2>
          </div>
          <div v-if="!b.list" class="prose-body max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            <p v-for="t in b.items" :key="t" class="first:text-ink">{{ t }}</p>
          </div>
          <ul v-else class="max-w-2xl space-y-4">
            <li v-for="t in b.items" :key="t" class="flex gap-4 text-lg leading-relaxed text-ink/90">
              <span class="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-lit" aria-hidden="true" />
              <span>{{ t }}</span>
            </li>
          </ul>
        </div>
      </section>

      <section class="py-14 sm:py-20" aria-labelledby="faq-h">
        <DrawRule />
        <div class="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div>
            <p class="eyebrow">Questions</p>
            <h2 id="faq-h" class="mt-4 text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-4xl">Short answers</h2>
            <NuxtLink to="/faq" class="mt-6 inline-block text-[15px] text-ink underline decoration-line underline-offset-[6px] hover:decoration-lit">
              All questions <span aria-hidden="true">&rarr;</span>
            </NuxtLink>
          </div>
          <FaqList :items="service.faq" />
        </div>
      </section>

      <nav v-if="next" aria-label="Next stop" class="pb-16">
        <NuxtLink :to="`/services/${next.slug}`" class="group flex items-center justify-between gap-6 rounded-3xl border border-line p-6 hover:border-lit/40 sm:p-8">
          <span>
            <span class="eyebrow block">Next stop</span>
            <span class="mt-2 block text-2xl font-semibold tracking-[-0.02em] text-ink">{{ next.title }}</span>
          </span>
          <span class="text-2xl text-ink transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
        </NuxtLink>
      </nav>
    </div>

    <CtaBand
      v-if="isLead"
      heading="Ready when you are."
      body="Tell us where your app runs and roughly what you spend. We will set up the review from there."
      primary-to="/contact"
      :primary-label="service.ctaLabel"
      :show-contact="false"
    />
    <CtaBand v-else />
  </div>
</template>
