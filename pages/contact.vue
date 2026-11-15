<script setup lang="ts">
import { contactPage } from '~/content/site'
usePageSeo({ title: contactPage.title, description: contactPage.metaDescription, path: '/contact' })
const lead = useLead()
</script>

<template>
  <div>
    <PageIntro eyebrow="Contact" title="Tell us where you are on the road." :lede="contactPage.intro" :show-cta="false" />
    <div class="page-x grid gap-14 pb-24 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-20">
      <section aria-label="Contact form">
        <ContactForm />
      </section>
      <aside class="space-y-6 lg:pt-2" aria-labelledby="next-h">
        <h2 id="next-h" class="h-card">What happens next</h2>
        <ol class="space-y-5 text-muted">
          <li class="flex gap-4"><span class="font-mono text-sm text-ink">01</span><span>One of us reads your message. Not a bot, not a sales team.</span></li>
          <li class="flex gap-4"><span class="font-mono text-sm text-ink">02</span><span>We reply with a few questions, or a time to talk.</span></li>
          <li class="flex gap-4"><span class="font-mono text-sm text-ink">03</span><span>If it is a fit, we start with the free review. If not, we say so.</span></li>
        </ol>
        <p class="border-t border-line pt-6 text-sm text-muted">
          Want to know what the review covers first?
          <NuxtLink :to="lead.to" class="text-ink underline underline-offset-4">Read about it here</NuxtLink>.
        </p>
      </aside>
    </div>
  </div>
</template>
