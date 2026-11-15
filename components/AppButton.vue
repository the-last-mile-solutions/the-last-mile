<script setup lang="ts">
/** Primary buttons use the warm accent. Secondary buttons never do. */
const props = withDefaults(
  defineProps<{ to: string; variant?: 'primary' | 'secondary' | 'ghost'; size?: 'sm' | 'md' | 'lg' }>(),
  { variant: 'primary', size: 'md' },
)
const sizes = { sm: 'h-9 px-3.5 text-[13px]', md: 'h-11 px-5 text-[15px]', lg: 'h-14 px-7 text-base' }
const variants = {
  primary: 'btn-primary bg-accent text-accent-ink hover:brightness-110',
  secondary: 'border border-line text-ink hover:border-lit/60 hover:bg-raised',
  ghost: 'text-ink underline-offset-4 hover:underline',
}
const cls = computed(() => [
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[filter,background-color,border-color] duration-200',
  sizes[props.size],
  variants[props.variant],
])
</script>

<template>
  <NuxtLink :to="to" :class="cls"><slot /></NuxtLink>
</template>
