<script setup lang="ts">
import { about } from '~/content/site'
usePageSeo({ title: about.title, description: about.metaDescription, path: '/about' })
</script>

<template>
  <div>
    <PageIntro eyebrow="About" title="Three senior engineers. One small team." :lede="about.intro" />
    <div class="page-x pb-20">
      <section v-for="(s, i) in about.sections" :key="s.heading" class="py-12 sm:py-16" :aria-labelledby="`about-${i}`">
        <DrawRule />
        <div class="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <h2 :id="`about-${i}`" class="text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-4xl">{{ s.heading }}</h2>
          <div class="prose-body max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            <p v-for="p in s.body" :key="p">{{ p }}</p>
          </div>
        </div>
      </section>
    </div>
    <CtaBand />
  </div>
</template>
