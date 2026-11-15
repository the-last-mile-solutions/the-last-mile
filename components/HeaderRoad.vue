<script setup lang="ts">
/**
 * Inner page motion: a thin road line under the header that lights up as you read,
 * with the mile marker riding its leading edge.
 * Uses CSS scroll driven animation where supported, a passive scroll listener elsewhere.
 * Purely decorative and hidden from assistive tech.
 */
const route = useRoute()
const el = ref<HTMLElement | null>(null)
let raf = 0
let cleanup: (() => void) | null = null

onMounted(() => {
  if (CSS.supports('animation-timeline: scroll()')) return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const update = () => {
    raf = 0
    const max = document.documentElement.scrollHeight - innerHeight
    const p = max > 0 ? Math.min(1, scrollY / max) : 0
    el.value?.style.setProperty('--p', String(p))
  }
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }
  addEventListener('scroll', onScroll, { passive: true })
  addEventListener('resize', onScroll, { passive: true })
  update()
  cleanup = () => {
    removeEventListener('scroll', onScroll)
    removeEventListener('resize', onScroll)
  }
})
onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div v-if="route.path !== '/'" ref="el" class="header-road" aria-hidden="true">
    <span class="lit" />
    <span class="marker-wrap"><span class="marker" /></span>
  </div>
</template>

<style scoped>
.header-road {
  --p: 0;
  position: absolute;
  inset: auto 0 -1px 0;
  height: 1px;
  pointer-events: none;
  background-image: linear-gradient(90deg, rgb(var(--c-line)) 50%, transparent 50%);
  background-size: 10px 1px;
}
.lit,
.marker-wrap {
  position: absolute;
  inset: 0;
  transform-origin: 0 50%;
}
.lit {
  background: rgb(var(--c-lit) / 0.7);
  transform: scaleX(var(--p));
}
.marker-wrap {
  transform: translateX(calc(var(--p) * 100%));
}
.marker {
  position: absolute;
  left: -4px;
  top: -3.5px;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: rgb(var(--c-accent));
}
.marker::after {
  content: '';
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(var(--c-accent) / 0.45), transparent 65%);
}
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .lit {
      animation: road-lit linear both;
      animation-timeline: scroll(root);
    }
    .marker-wrap {
      animation: road-marker linear both;
      animation-timeline: scroll(root);
    }
  }
}
@keyframes road-lit {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@keyframes road-marker {
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
}
@media (prefers-reduced-motion: reduce) {
  .lit { transform: scaleX(1); }
  .marker-wrap { display: none; }
}
</style>
