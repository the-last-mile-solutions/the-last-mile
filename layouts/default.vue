<template>
  <div class="flex min-h-svh flex-col">
    <SiteHeader />
    <main id="main" class="flex-1" tabindex="-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
