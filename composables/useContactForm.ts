/**
 * All contact form submit logic lives here.
 * The endpoint comes from NUXT_PUBLIC_FORM_ENDPOINT at build time.
 * If it is unset, the form says so plainly instead of failing silently.
 */

export interface ContactFields {
  name: string
  email: string
  company: string
  platform: string
  bill: string
  message: string
  /** Honeypot. Real people never see or fill this. */
  website: string
}

export type ContactErrors = Partial<Record<keyof ContactFields, string>>
export type ContactStatus = 'idle' | 'submitting' | 'success' | 'error' | 'not-live'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Field order matters: focus moves to the first field with an error. */
export const CONTACT_FIELD_ORDER: (keyof ContactFields)[] = ['name', 'email', 'company', 'platform', 'bill', 'message']

export function validateContact(f: ContactFields): ContactErrors {
  const e: ContactErrors = {}
  if (!f.name.trim()) e.name = 'Please tell us your name.'
  if (!f.email.trim()) e.email = 'Please add an email so we can reply.'
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'That email does not look right. Please check it.'
  if (!f.platform.trim()) e.platform = 'Please tell us what the app is built on or hosted on. A best guess is fine.'
  if (!f.bill) e.bill = 'Please pick a range. "Not sure" is fine.'
  if (f.message.trim().length < 10) e.message = 'Please add a sentence or two about what you need.'
  return e
}

export function useContactForm() {
  const { public: pub } = useRuntimeConfig()
  const endpoint = String(pub.formEndpoint || '').trim()

  const fields = reactive<ContactFields>({
    name: '',
    email: '',
    company: '',
    platform: '',
    bill: '',
    message: '',
    website: '',
  })
  const errors = ref<ContactErrors>({})
  const status = ref<ContactStatus>('idle')
  const serverMessage = ref('')

  const isLive = computed(() => endpoint.length > 0)

  /** Returns the first invalid field name, or null when the submission went through. */
  async function submit(): Promise<keyof ContactFields | null> {
    errors.value = validateContact(fields)
    const first = CONTACT_FIELD_ORDER.find((k) => errors.value[k])
    if (first) {
      status.value = 'idle'
      return first
    }

    // Bots fill the hidden field. Pretend it worked and send nothing.
    if (fields.website) {
      status.value = 'success'
      return null
    }

    if (!isLive.value) {
      status.value = 'not-live'
      return null
    }

    status.value = 'submitting'
    serverMessage.value = ''
    try {
      const { website: _hp, ...payload } = fields
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, source: 'thelastmile-contact' }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      status.value = 'success'
    } catch {
      status.value = 'error'
      serverMessage.value = 'Something went wrong sending your message. Please try again in a minute.'
    }
    return null
  }

  function reset() {
    Object.assign(fields, { name: '', email: '', company: '', platform: '', bill: '', message: '', website: '' })
    errors.value = {}
    status.value = 'idle'
  }

  return { fields, errors, status, serverMessage, isLive, submit, reset }
}
