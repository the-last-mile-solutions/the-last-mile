<script setup lang="ts">
import type { NuxtError } from '#app'
const props = defineProps<{ error: NuxtError }>()
const lead = useLead()
useHead({ title: props.error.statusCode === 404 ? 'Page not found | The Last Mile' : 'Something went wrong | The Last Mile' })
</script>

<template>
  <NuxtLayout>
    <section class="page-x py-28">
      <p class="eyebrow">{{ error.statusCode === 404 ? 'Wrong turn' : 'Road closed' }}</p>
      <h1 class="h-display mt-6 text-[clamp(2.5rem,6vw,5rem)]">
        {{ error.statusCode === 404 ? 'This road does not go anywhere.' : 'Something went wrong.' }}
      </h1>
      <p class="lede mt-6 max-w-xl">Head back to the start, or go straight to the free review.</p>
      <div class="mt-9 flex flex-wrap gap-3">
        <AppButton :to="lead.to" size="lg">{{ lead.label }}</AppButton>
        <AppButton to="/" variant="secondary" size="lg">Back to the start</AppButton>
      </div>
    </section>
  </NuxtLayout>
</template>
