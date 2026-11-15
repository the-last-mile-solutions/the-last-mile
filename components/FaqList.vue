<script setup lang="ts">
import type { FaqItem } from '~/types/content'
/** Native details elements: keyboard accessible and readable without JavaScript. */
defineProps<{ items: FaqItem[]; headingLevel?: 'h2' | 'h3' }>()
</script>

<template>
  <div class="divide-y divide-line border-y border-line">
    <details v-for="(item, i) in items" :key="i" class="faq group" :open="i === 0">
      <summary class="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left">
        <component :is="headingLevel ?? 'h3'" class="text-lg font-medium text-ink">{{ item.question }}</component>
        <span class="mt-1.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-line text-muted" aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor" stroke-width="1.5" fill="none">
            <path d="M1 5h8" /><path class="faq-v" d="M5 1v8" />
          </svg>
        </span>
      </summary>
      <p class="max-w-3xl pb-6 leading-relaxed text-muted">{{ item.answer }}</p>
    </details>
  </div>
</template>

<style scoped>
summary::-webkit-details-marker { display: none; }
.faq[open] .faq-v { display: none; }
</style>
