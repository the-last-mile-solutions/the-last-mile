# Content gaps

Real facts the site needs but does not have yet. The rendered site never shows a placeholder for any of these. Copy was written to stand on its own until each one is filled.

| Gap | Where it is used | What the site does today |
| --- | --- | --- |
| Domain | `NUXT_PUBLIC_SITE_URL` for canonical links, Open Graph, JSON-LD, sitemap.xml, robots.txt | Falls back to `https://example.com`. Set the env var before the real build. |
| Logo | Header, footer, favicon, OG image | Text wordmark "The Last Mile" with a simple mile marker glyph. |
| Contact email | Contact page, footer, JSON-LD `email` | Not shown anywhere. The contact form is the only route in. |
| Form submission destination | `NUXT_PUBLIC_FORM_ENDPOINT` | Form validates, then shows a friendly "not live yet" message. Nothing is sent. |
| Where the form data goes and who reads it | Privacy note under the form | The form only says "We reply plainly. No newsletter, no sales sequence." Add a privacy page if you collect more. |
| Reply time promise | Form success message says "usually within a couple of working days" | Confirm or change in `components/ContactForm.vue`. |
| Team bios and photos | About page, homepage "Who we are" | About reads complete without them. Homepage says "three senior engineers" with no names. |
| OG image | `public/og.png`, referenced by every page | A first original OG image is generated from SVG. Replace with a designed one. |
| Business location or service area | JSON-LD `areaServed`, footer | Omitted. |
| Legal entity name | Footer, JSON-LD `legalName` | Footer shows "The Last Mile" only. |
| Privacy policy and terms | Footer links | Not linked. Needed before the form goes live in most regions. |
| Analytics choice | Site wide | None installed. |
| Named past work | FAQ "Where have you done this before?" | Answer uses the approved confidentiality wording. Add case studies only with written client permission. |
| Pricing for paid services | Service pages | No prices shown anywhere by design. Fixed scope proposals are described instead. |
| Platforms named in copy | Service pages name Claude, Lovable, Vercel, Azure SQL, Postgres, Auth0, Clerk, AWS, Azure | Confirm you are comfortable naming each. These are tools, not clients. |
