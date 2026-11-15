<script setup lang="ts">
/** Closing call to action used on every page. Defaults to the lead offer plus contact. */
const props = withDefaults(
  defineProps<{ heading?: string; body?: string; primaryTo?: string; primaryLabel?: string; showContact?: boolean }>(),
  { showContact: true },
)
const lead = useLead()
</script>

<template>
  <section class="cta-band relative overflow-hidden border-t border-line/70" aria-labelledby="cta-band-h">
    <div class="page-x relative py-20 sm:py-28">
      <h2 id="cta-band-h" class="h-section max-w-3xl">{{ props.heading ?? lead.service.pitch.heading }}</h2>
      <p class="lede mt-5 max-w-2xl">
        {{ props.body ?? lead.service.pitch.body }}
      </p>
      <div class="mt-9 flex flex-wrap gap-3">
        <AppButton :to="props.primaryTo ?? lead.to" size="lg">{{ props.primaryLabel ?? lead.label }}</AppButton>
        <AppButton v-if="showContact" to="/contact" variant="secondary" size="lg">Talk to us</AppButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-band::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(60% 80% at 85% 100%, rgb(var(--c-lit) / 0.07), transparent 70%);
  pointer-events: none;
}
</style>
