<script setup lang="ts">
import { howWeWork } from '~/content/site'
usePageSeo({ title: howWeWork.title, description: howWeWork.metaDescription, path: '/how-we-work' })
</script>

<template>
  <div>
    <PageIntro eyebrow="How we work" title="One road, six stops, no surprises." :lede="howWeWork.intro" />
    <section class="page-x pb-24" aria-label="Our process">
      <ol class="process">
        <li v-for="(step, i) in howWeWork.steps" :key="step.title" class="relative pb-12 pl-14 last:pb-0 sm:pl-20">
          <span class="node" aria-hidden="true" />
          <div class="grid gap-3 lg:grid-cols-[8rem_minmax(0,22rem)_minmax(0,1fr)] lg:gap-10">
            <span class="font-mono text-sm text-muted">Step {{ String(i + 1).padStart(2, '0') }}</span>
            <h2 class="h-card text-2xl">{{ step.title }}</h2>
            <p class="max-w-xl text-lg leading-relaxed text-muted">{{ step.body }}</p>
          </div>
        </li>
      </ol>
    </section>
    <CtaBand />
  </div>
</template>

<style scoped>
.process {
  position: relative;
}
.process::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 12px;
  bottom: 12px;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(rgb(var(--c-muted) / 0.35), rgb(var(--c-lit)));
}
@media (min-width: 640px) {
  .process::before {
    left: 28px;
  }
  .node {
    left: 28px !important;
  }
}
.node {
  position: absolute;
  left: 20px;
  top: 12px;
  width: 13px;
  height: 13px;
  border-radius: 999px;
  transform: translate(-50%, -50%);
  background: rgb(var(--c-lit));
  box-shadow: 0 0 0 5px rgb(var(--c-bg));
}
</style>
