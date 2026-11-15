<script setup lang="ts">
/**
 * Inner page opening. The arrival marker slides in along a short line beside the eyebrow, once.
 * CSS only, transform only, and skipped with reduced motion. The copy is static server HTML.
 */
withDefaults(defineProps<{ eyebrow: string; title: string; lede?: string; showCta?: boolean }>(), { showCta: true })
const lead = useLead()
</script>

<template>
  <section class="page-x pb-14 pt-14 sm:pb-20 sm:pt-24" aria-labelledby="page-h">
    <div class="flex items-center gap-4">
      <span class="arrival" aria-hidden="true"><span class="arrival-marker" /></span>
      <p class="eyebrow">{{ eyebrow }}</p>
    </div>
    <h1 id="page-h" class="h-display mt-6 max-w-5xl text-[clamp(2.5rem,6vw,5rem)]">{{ title }}</h1>
    <p v-if="lede" class="lede mt-6 max-w-2xl">{{ lede }}</p>
    <div v-if="showCta || $slots.default" class="mt-9 flex flex-wrap gap-3">
      <slot>
        <AppButton :to="lead.to" size="lg">{{ lead.label }}</AppButton>
        <AppButton to="/contact" variant="secondary" size="lg">Talk to us</AppButton>
      </slot>
    </div>
  </section>
</template>

<style scoped>
.arrival {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 14px;
  background-image: linear-gradient(90deg, rgb(var(--c-lit) / 0.7) 50%, transparent 50%);
  background-size: 6px 1px;
  background-repeat: repeat-x;
  background-position: 0 50%;
}
.arrival-marker {
  position: absolute;
  right: -2px;
  top: 50%;
  width: 10px;
  height: 14px;
  margin-top: -7px;
  border-radius: 3px;
  background: rgb(var(--c-accent));
}
.arrival-marker::after {
  content: '';
  position: absolute;
  inset: -14px;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(var(--c-accent) / 0.4), transparent 65%);
}
@media (prefers-reduced-motion: no-preference) {
  .arrival-marker {
    animation: arrive 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
  }
}
@keyframes arrive {
  from {
    transform: translateX(-36px);
  }
  to {
    transform: translateX(0);
  }
}
</style>
