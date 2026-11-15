<!--
  A divider that draws from left to right as it enters the viewport, an echo of the road.
  CSS scroll driven animation where supported. Fully drawn everywhere else and with reduced motion.
-->
<template>
  <div class="draw-rule" aria-hidden="true" />
</template>

<style scoped>
.draw-rule {
  height: 1px;
  background: rgb(var(--c-line));
  transform-origin: 0 50%;
}
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .draw-rule {
      animation: draw linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 35%;
    }
  }
}
@keyframes draw {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
</style>
