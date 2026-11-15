<script setup lang="ts">
import { services } from '~/content/services'
const words = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']
const count = words[services.length] ?? String(services.length)
const names = services.map((s) => s.title.toLowerCase())
usePageSeo({
  title: 'Services',
  description: `${count} ways we carry apps the last mile: ${names.slice(0, -1).join(', ')} and ${names.at(-1)}.`,
  path: '/services',
})
</script>

<template>
  <div>
    <PageIntro
      eyebrow="Services"
      :title="`${count} stops on the road to production.`"
      lede="Start with whichever one matches where you are today. Most teams start with the free review."
    />
    <section class="page-x pb-24" aria-label="Services">
      <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="(s, i) in services" :key="s.slug" class="flex">
          <ServiceCard :service="s" :index="i" heading-level="h2" class="w-full" />
        </li>
      </ul>
    </section>
    <CtaBand />
  </div>
</template>
