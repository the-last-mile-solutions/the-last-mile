<script setup lang="ts">
import { contactPage } from '~/content/site'
import { CONTACT_FIELD_ORDER, type ContactFields } from '~/composables/useContactForm'

const { fields, errors, status, serverMessage, isLive, submit } = useContactForm()
const { public: pub } = useRuntimeConfig()
const formEl = ref<HTMLFormElement | null>(null)
const statusEl = ref<HTMLElement | null>(null)
const errorEl = ref<HTMLElement | null>(null)
const hydrated = ref(false)
const noscriptNote =
  '<noscript><p class="rounded-2xl border border-line p-4 text-sm text-muted">This form is not live yet, so it cannot send messages. Please check back soon.</p></noscript>'
onMounted(() => (hydrated.value = true))

const errorCount = computed(() => CONTACT_FIELD_ORDER.filter((k) => errors.value[k]).length)

async function onSubmit() {
  const first = await submit()
  await nextTick()
  if (first) {
    formEl.value?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
  } else if (status.value === 'error') {
    errorEl.value?.focus()
  } else {
    statusEl.value?.focus()
  }
}

function describedBy(k: keyof ContactFields, hint?: boolean) {
  return [hint ? `${k}-hint` : '', errors.value[k] ? `${k}-error` : ''].filter(Boolean).join(' ') || undefined
}

// Clear a field's error as soon as the person fixes it.
for (const k of CONTACT_FIELD_ORDER) {
  watch(
    () => fields[k],
    () => {
      if (errors.value[k]) errors.value = { ...errors.value, [k]: undefined }
    },
  )
}
</script>

<template>
  <div>
    <div
      v-if="status === 'success' || status === 'not-live'"
      ref="statusEl"
      tabindex="-1"
      role="status"
      class="rounded-3xl border border-line bg-surface p-8"
    >
      <template v-if="status === 'success'">
        <h2 class="h-card">Thanks. We have your message.</h2>
        <p class="mt-3 leading-relaxed text-muted">One of us will reply, usually within a couple of working days.</p>
      </template>
      <template v-else>
        <h2 class="h-card">The form is not live yet.</h2>
        <p class="mt-3 leading-relaxed text-muted">
          Thanks for filling it in. We are still connecting this form, so your message was not sent. Nothing you typed has been
          stored. Please check back soon.
        </p>
        <button type="button" class="mt-6 text-sm text-ink underline underline-offset-4" @click="status = 'idle'">
          Back to the form
        </button>
      </template>
    </div>

    <form
      v-else
      ref="formEl"
      :action="isLive ? String(pub.formEndpoint) : undefined"
      method="post"
      :novalidate="hydrated || undefined"
      class="space-y-6"
      @submit.prevent="onSubmit"
    >
      <div v-if="errorCount > 0" role="alert" class="rounded-2xl border border-danger/50 bg-danger/5 p-4 text-sm text-ink">
        {{ errorCount === 1 ? 'One thing needs fixing before we can send this.' : `${errorCount} things need fixing before we can send this.` }}
      </div>
      <div v-if="status === 'error'" ref="errorEl" tabindex="-1" role="alert" class="rounded-2xl border border-danger/50 bg-danger/5 p-4 text-sm text-ink">
        {{ serverMessage }}
      </div>

      <div class="grid gap-6 sm:grid-cols-2">
        <div class="field">
          <label for="name">Your name</label>
          <input id="name" v-model="fields.name" name="name" type="text" autocomplete="name" required
            :aria-invalid="!!errors.name || undefined" :aria-describedby="describedBy('name')" />
          <p v-if="errors.name" id="name-error" class="err">{{ errors.name }}</p>
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="fields.email" name="email" type="email" autocomplete="email" required
            :aria-invalid="!!errors.email || undefined" :aria-describedby="describedBy('email')" />
          <p v-if="errors.email" id="email-error" class="err">{{ errors.email }}</p>
        </div>
      </div>

      <div class="field">
        <label for="company">Company <span class="opt">(optional)</span></label>
        <input id="company" v-model="fields.company" name="company" type="text" autocomplete="organization" />
      </div>

      <div class="field">
        <label for="platform">What is the app built on or hosted on?</label>
        <p id="platform-hint" class="hint">For example AWS, Azure, Vercel, Lovable, or a mix. A best guess is fine.</p>
        <input id="platform" v-model="fields.platform" name="platform" type="text" required
          :aria-invalid="!!errors.platform || undefined" :aria-describedby="describedBy('platform', true)" />
        <p v-if="errors.platform" id="platform-error" class="err">{{ errors.platform }}</p>
      </div>

      <div class="field">
        <label for="bill">Rough monthly cloud or hosting bill</label>
        <div class="relative">
          <select id="bill" v-model="fields.bill" name="bill" required
            :aria-invalid="!!errors.bill || undefined" :aria-describedby="describedBy('bill')">
            <option value="" disabled>Pick a range</option>
            <option v-for="r in contactPage.billRanges" :key="r" :value="r">{{ r }}</option>
          </select>
          <svg aria-hidden="true" class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4.5l4 4 4-4" /></svg>
        </div>
        <p v-if="errors.bill" id="bill-error" class="err">{{ errors.bill }}</p>
      </div>

      <div class="field">
        <label for="message">What do you need?</label>
        <textarea id="message" v-model="fields.message" name="message" rows="5" required minlength="10"
          :aria-invalid="!!errors.message || undefined" :aria-describedby="describedBy('message')" />
        <p v-if="errors.message" id="message-error" class="err">{{ errors.message }}</p>
      </div>

      <div class="hp" aria-hidden="true">
        <label for="website">Leave this empty</label>
        <input id="website" v-model="fields.website" name="website" type="text" tabindex="-1" autocomplete="off" />
      </div>

      <!-- Without JavaScript, say plainly that the form is not live. Rendered via v-html so hydration does not diff it. -->
      <div v-if="!isLive" v-html="noscriptNote" />

      <div class="flex flex-wrap items-center gap-4 pt-2">
        <button type="submit" class="btn-primary inline-flex h-14 items-center rounded-full bg-accent px-8 font-medium text-accent-ink transition-[filter] hover:brightness-110 disabled:opacity-70"
          :disabled="status === 'submitting'">
          {{ status === 'submitting' ? 'Sending' : 'Send message' }}
        </button>
        <p class="text-sm text-muted">We reply plainly. No newsletter, no sales sequence.</p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.field { @apply flex flex-col gap-2; }
.field label { @apply text-sm font-medium text-ink; }
.opt, .hint { @apply text-sm font-normal text-muted; }
.hint { @apply -mt-1; }
.field input, .field select, .field textarea {
  @apply w-full appearance-none rounded-xl border border-line bg-surface px-4 py-3 text-base text-ink transition-colors;
}
.field input:hover, .field select:hover, .field textarea:hover { @apply border-muted/60; }
.field input:focus-visible, .field select:focus-visible, .field textarea:focus-visible {
  outline: 2px solid rgb(var(--c-lit));
  outline-offset: 1px;
}
.field [aria-invalid='true'] { @apply border-danger; }
.err { @apply text-sm text-danger; }
.hp { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }
</style>
