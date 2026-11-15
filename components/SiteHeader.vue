<script setup lang="ts">
import { services } from '~/content/services'

const lead = useLead()
const route = useRoute()
const menu = ref<HTMLDetailsElement | null>(null)
const svc = ref<HTMLDetailsElement | null>(null)

const links = [
  { to: '/how-we-work', label: 'How we work' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

// Close open menus after navigation. Menus are native <details>, so they work without JavaScript.
watch(
  () => route.fullPath,
  () => {
    if (menu.value) menu.value.open = false
    if (svc.value) svc.value.open = false
  },
)

function onKey(e: KeyboardEvent) {
  if (e.key !== 'Escape') return
  for (const d of [menu.value, svc.value]) {
    if (d?.open) {
      d.open = false
      d.querySelector('summary')?.focus()
    }
  }
}
function onClickOutside(e: MouseEvent) {
  if (svc.value?.open && !svc.value.contains(e.target as Node)) svc.value.open = false
}
onMounted(() => {
  document.addEventListener('keydown', onKey)
  document.addEventListener('click', onClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  document.removeEventListener('click', onClickOutside)
})
</script>

<template>
  <header class="site-header sticky top-0 z-50 border-b border-line/60 bg-bg/85 backdrop-blur-md">
    <a href="#main" class="sr-only-focusable absolute left-4 top-3 z-50 rounded bg-ink px-3 py-2 text-bg">Skip to content</a>
    <div class="page-x flex h-[var(--header-h)] items-center gap-2 sm:gap-3">
      <SiteLogo class="mr-auto text-[15px] sm:text-base" />

      <nav aria-label="Main" class="hidden items-center gap-1 text-sm lg:flex">
        <details ref="svc" class="nav-dd relative">
          <summary class="nav-link cursor-pointer list-none">Services</summary>
          <div class="absolute left-0 top-full mt-2 w-80 rounded-2xl border border-line bg-surface p-2 shadow-2xl">
            <NuxtLink to="/services" class="block rounded-xl px-3 py-2.5 text-muted hover:bg-raised hover:text-ink">All services</NuxtLink>
            <NuxtLink
              v-for="s in services"
              :key="s.slug"
              :to="`/services/${s.slug}`"
              class="block rounded-xl px-3 py-2.5 hover:bg-raised"
            >
              <span class="block text-ink">{{ s.title }}</span>
              <span class="mt-0.5 block text-[13px] leading-snug text-muted">{{ s.tagline }}</span>
            </NuxtLink>
          </div>
        </details>
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="nav-link">{{ l.label }}</NuxtLink>
      </nav>

      <AppButton :to="lead.to" size="sm" class="header-cta !px-3 text-[12.5px] sm:!px-4 sm:text-[13px]">
        {{ lead.label }}
      </AppButton>

      <details ref="menu" class="mobile-menu lg:hidden">
        <summary
          class="grid h-9 w-9 cursor-pointer list-none place-items-center rounded-full border border-line"
          aria-label="Menu"
        >
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6">
            <path class="m-open" d="M2 5h12M2 11h12" />
            <path class="m-close" d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
          </svg>
        </summary>
        <nav aria-label="Mobile" class="absolute inset-x-0 top-full max-h-[calc(100svh-var(--header-h))] overflow-y-auto border-b border-line bg-bg">
          <div class="page-x flex flex-col py-4">
            <p class="eyebrow pb-2 pt-1">Services</p>
            <NuxtLink v-for="s in services" :key="s.slug" :to="`/services/${s.slug}`" class="border-b border-line/60 py-3 text-lg">
              {{ s.title }}
            </NuxtLink>
            <NuxtLink to="/services" class="border-b border-line/60 py-3 text-lg text-muted">All services</NuxtLink>
            <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="border-b border-line/60 py-3 text-lg">{{ l.label }}</NuxtLink>
          </div>
        </nav>
      </details>
    </div>
    <HeaderRoad />
  </header>
</template>

<style scoped>
.nav-link {
  @apply rounded-full px-3 py-2 text-muted transition-colors hover:text-ink;
}
.nav-link.router-link-active {
  @apply text-ink;
}
summary::-webkit-details-marker {
  display: none;
}
.mobile-menu .m-close {
  display: none;
}
.mobile-menu[open] .m-close {
  display: inline;
}
.mobile-menu[open] .m-open {
  display: none;
}
@media (max-width: 359px) {
  .header-cta {
    font-size: 11.5px;
  }
}
</style>
