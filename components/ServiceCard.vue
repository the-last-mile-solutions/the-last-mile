<script setup lang="ts">
import type { Service } from '~/types/content'
defineProps<{ service: Service; index: number; headingLevel?: 'h2' | 'h3' }>()
</script>

<template>
  <article class="group relative flex flex-col rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-lit/40 sm:p-8">
    <div class="flex items-center justify-between">
      <span class="font-mono text-xs text-muted">Stop {{ String(index + 1).padStart(2, '0') }}</span>
      <span v-if="service.badge" class="rounded-full border border-lit/40 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-lit">
        {{ service.badge }}
      </span>
    </div>
    <component :is="headingLevel ?? 'h3'" class="h-card mt-8">
      <NuxtLink :to="`/services/${service.slug}`" class="after:absolute after:inset-0 after:rounded-3xl">{{ service.title }}</NuxtLink>
    </component>
    <p class="mt-3 leading-relaxed text-muted">{{ service.tagline }}</p>
    <span class="mt-auto pt-8 text-sm text-ink" aria-hidden="true">
      Learn more <span class="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
    </span>
  </article>
</template>
