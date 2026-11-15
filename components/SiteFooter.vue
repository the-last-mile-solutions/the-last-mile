<script setup lang="ts">
import { services } from '~/content/services'
import { site } from '~/content/site'
const lead = useLead()
const company = [
  { to: '/how-we-work', label: 'How we work' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]
</script>

<template>
  <footer class="border-t border-line/70 bg-bg">
    <div class="page-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
      <div class="max-w-sm">
        <SiteLogo />
        <p class="mt-4 text-sm leading-relaxed text-muted">{{ site.description }}</p>
        <AppButton :to="lead.to" size="sm" class="mt-6">{{ lead.label }}</AppButton>
      </div>
      <nav aria-label="Services">
        <h2 class="eyebrow">Services</h2>
        <ul class="mt-4 space-y-2.5 text-sm">
          <li v-for="s in services" :key="s.slug">
            <NuxtLink :to="`/services/${s.slug}`" class="text-ink/90 hover:text-ink hover:underline">{{ s.title }}</NuxtLink>
          </li>
        </ul>
      </nav>
      <nav aria-label="Company">
        <h2 class="eyebrow">Company</h2>
        <ul class="mt-4 space-y-2.5 text-sm">
          <li v-for="l in company" :key="l.to">
            <NuxtLink :to="l.to" class="text-ink/90 hover:text-ink hover:underline">{{ l.label }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
    <div class="page-x flex flex-col gap-2 border-t border-line/50 py-6 text-xs text-muted sm:flex-row sm:justify-between">
      <p>The Last Mile. Small team, senior engineers.</p>
      <p>Made by the people who will do the work.</p>
    </div>
  </footer>
</template>
