<script setup lang="ts">
import { faqPage } from '~/content/site'
usePageSeo({
  title: 'FAQ',
  description: faqPage.metaDescription,
  path: '/faq',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqPage.items.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  },
})
</script>

<template>
  <div>
    <PageIntro eyebrow="FAQ" :title="faqPage.title" lede="Plain answers to the questions founders ask us most." />
    <section class="page-x pb-24" aria-label="Questions and answers">
      <div class="max-w-4xl">
        <FaqList :items="faqPage.items" heading-level="h2" />
      </div>
    </section>
    <CtaBand />
  </div>
</template>
