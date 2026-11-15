import { leadService } from '~/content/services'

/** The primary call to action everywhere on the site. Follows LEAD_SERVICE_SLUG in content/services.ts. */
export function useLead() {
  return {
    label: leadService.ctaLabel,
    to: `/services/${leadService.slug}`,
    service: leadService,
  }
}
