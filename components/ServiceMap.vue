<script setup lang="ts">
/** "You are here" map of every stop on the road, rendered from content/services.ts. Doubles as navigation. */
import { services } from '~/content/services'
const props = defineProps<{ current: string }>()
const idx = computed(() => services.findIndex((s) => s.slug === props.current))
</script>

<template>
  <nav aria-label="All services" class="service-map">
    <ol class="relative flex gap-0 overflow-x-auto pb-2">
      <li v-for="(s, i) in services" :key="s.slug" class="relative min-w-[8.5rem] flex-1">
        <span class="seg" :class="{ done: i <= idx }" aria-hidden="true" />
        <span class="dot" :class="{ done: i < idx, here: i === idx }" aria-hidden="true">
          <span v-if="i === idx" class="pin" />
        </span>
        <NuxtLink
          :to="`/services/${s.slug}`"
          :aria-current="i === idx ? 'page' : undefined"
          class="mt-5 block pr-4 text-[13px] leading-snug"
          :class="i === idx ? 'text-ink' : 'text-muted hover:text-ink'"
        >
          <span class="font-mono text-[11px] tracking-wider">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="block">{{ s.stopLabel }}</span>
        </NuxtLink>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.seg {
  position: absolute;
  left: 0;
  right: 0;
  top: 6px;
  height: 0;
  border-top: 1.5px dashed rgb(var(--c-line));
}
.seg.done {
  border-top: 1.5px solid rgb(var(--c-lit) / 0.8);
}
li:first-child .seg {
  left: 6px;
}
li:last-child .seg {
  right: auto;
  width: 6px;
}
.dot {
  position: absolute;
  left: 0;
  top: 0;
  width: 13px;
  height: 13px;
  border-radius: 999px;
  border: 1.5px solid rgb(var(--c-muted) / 0.7);
  background: rgb(var(--c-bg));
}
.dot.done,
.dot.here {
  border-color: rgb(var(--c-lit));
  background: rgb(var(--c-lit));
}
.pin {
  position: absolute;
  left: 50%;
  top: -22px;
  width: 10px;
  height: 14px;
  margin-left: -5px;
  border-radius: 3px;
  background: rgb(var(--c-accent));
}
.pin::after {
  content: '';
  position: absolute;
  inset: -14px;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(var(--c-accent) / 0.4), transparent 65%);
}
.service-map ol {
  padding-top: 24px;
}
</style>
