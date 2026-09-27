# Meontor website: design

Date: 2026-09-26 · Status: awaiting owner review
Sources: `~/Code/ios/Meontor/{PLAN,DESIGN,HANDOFF}.md`, `docs/prompts/website.md` in the app repo, and `~/Code/web/oareo-client` (the model).

## 1. Purpose

The marketing and support site for Meontor, an iOS app on TestFlight today. It has two jobs:

1. Explain the app calmly and truthfully, so someone arriving from the App Store listing (or a link) understands it in one scroll.
2. Host the pages the App Store requires: Privacy Policy, Support, and Terms.

Success means every claim on the site is true of the shipping app, every string follows DESIGN §11, and the site keeps the app's own privacy promise: it tracks no one.

## 2. Settled decisions

| Decision       | Choice                                                                                                                                    | Why                                                                                          |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Stack          | SvelteKit 2, Svelte 5 runes, Tailwind CSS 4, TypeScript, pnpm                                                                             | Same as Oareo                                                                                |
| Rendering      | `prerender = true` everywhere, no server routes                                                                                           | Same as Oareo                                                                                |
| Deploy         | Vercel with `adapter-auto` and Oareo's security headers in `vercel.json`                                                                  | Same as Oareo. **Deploying, the GitHub repo and DNS all wait for the owner's approval**      |
| Analytics      | **None.** No Vercel Analytics or any other script. The CSP allows only `'self'`                                                           | A privacy-first app shouldn't have a site that tracks (owner, 2026-09-26)                    |
| Three.js       | **Not used**                                                                                                                              | Oareo's particle globe is loud. Meontor is a "quiet instrument" (DESIGN §1)                  |
| Fonts          | System stack: `-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif`. No web fonts, no Google Fonts                    | SF Pro on Apple devices, the device's own system font elsewhere, and no third-party requests |
| Wordmark       | "Meontor" set in SF Pro Rounded Semibold, shipped as an image (SVG/PNG) exported from `MeontorWordmark`                                   | DESIGN §9: "on the web the wordmark ships as an SVG image"                                   |
| Mark           | Inline SVG redrawn from `MeontorMarkArtwork` geometry (petal 0.26 × 0.62, offset 0.19, core 0.30, dot 0.14, gradient 0.85 → 0.25 opacity) | One geometry, same shape as the app icon                                                     |
| Icons          | Inline SVG, like Oareo's `Icon.svelte`. No icon CDN                                                                                       | Oareo removed Font Awesome for performance                                                   |
| Support email  | One constant, `SUPPORT_EMAIL`, set to the owner's personal address until meontor.com has mail                                             | Owner, 2026-09-26                                                                            |
| Domain         | `SITE_URL = 'https://meontor.com'` constant, used for canonical links and the sitemap. The domain isn't registered yet                    | Owner, 2026-09-26                                                                            |
| App Store link | `APP_STORE_URL = null`. The CTA reads "Coming soon to the App Store", with TestFlight mentioned in copy only, no public invite link       | App not shipped                                                                              |
| Press kit      | Not built                                                                                                                                 | Oareo has none. Add it when the app ships                                                    |
| Copyright      | Daivat Creations, proprietary licence, as in Oareo                                                                                        | Same publisher                                                                               |

## 3. Pages

| Route      | Contents                                                                                                                                |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `/`        | Showcase (§4)                                                                                                                           |
| `/support` | Contact card (mailto `SUPPORT_EMAIL`), then FAQ grouped by topic, with `FAQPage` JSON-LD                                                |
| `/privacy` | Privacy Policy (§6)                                                                                                                     |
| `/terms`   | Terms of Use, adapted from Oareo's 15 sections, with the accuracy section rewritten for a logging app and a "not medical advice" clause |
| `+error`   | Calm 404: the mark, "This page isn't here.", a link home                                                                                |

Nav: wordmark left; Features (anchor), Support, Privacy on the right; mobile menu as in Oareo.
Footer: mark and wordmark, then links (Support, Privacy, Terms, email), then "© 2026 Daivat Creations."
Oareo's `about`, `help` and `viewer` pages have no Meontor equivalent and aren't ported.

## 4. Home page, top to bottom

Each section makes one idea, with one screenshot or drawing, and alternates sides on desktop as Oareo's `AppShowcase` does. Copy below is draft direction, final wording goes through §7.

1. **Hero.** The mark (about 120px) breathing slowly, then the wordmark, then "Moment + Mentor." in secondary grey, then one line: "Log your day in a tap. Understand it in a sentence." Then the App Store CTA (disabled, "Coming soon") and a phone showing Now.
2. **Tap to log.** One tap, under a second. Moments, stretches you start and stop, and ratings with faces. Screenshot: Now.
3. **The widget.** Three suggestions learned from your own days, a thought that changes every hour, and taps that log without opening the app. Show the medium and small widgets at true Home Screen scale on a wallpaper-like ground, rather than inside a phone.
4. **Quick Capture.** Everything else is one search away, from every tab. Screenshot: Quick Capture with categories.
5. **The Mentor.** What your day gave you, written on your iPhone by Apple Intelligence, and written on device when Apple Intelligence isn't available. Roles are reflected on, never measured. Screenshot: Mentor.
6. **Siri, Controls, Lock Screen.** "Log coffee in Meontor." Control Center, the Action Button, and a Live Activity for anything running. A row of three small illustrations or screenshots.
7. **No guilt.** Nothing counts down. No streaks to break. Nothing to catch up on. Text-led, no screenshot.
8. **Everything stays on your iPhone.** No account, no server, no tracking. Health is optional and read-only. Links to `/privacy`.
9. **Closing CTA.** The mark, one line, and the App Store badge placeholder.

Structured data: `WebSite` and `SoftwareApplication` (price 0, iOS, `HealthApplication`/`LifestyleApplication`), author Daivat Creations. No `downloadUrl` until it ships.

## 5. Look

- **Colour:** background `#FFFFFF` light / `#000000` dark, following `prefers-color-scheme` with no toggle. Text uses Apple's label greys (primary, secondary `#3C3C4399`-equivalent, tertiary). One accent: brand blue (the icon accent, about `#7D94F0`, tuned to about `#5B6EE1` where it must pass 4.5:1 as text on white). Section surfaces use `systemGroupedBackground` (`#F2F2F7` / `#1C1C1E`). Category colours appear only inside screenshots.
- **Type:** display headlines 48–64px semibold with tight tracking, body 17–19px, max text width about 60ch. No serif.
- **Space:** generous. Sections are about 120–160px apart on desktop and one column on phones.
- **Motion:** only the mark's 8-second breath and a gentle fade-in on scroll. Both are off under `prefers-reduced-motion`.
- **Not used:** glassmorphism panels, gradients behind text, emoji, confetti, particle effects.
- **Device frame:** reuse Oareo's CSS `PhoneFrame` pattern, updated to an iPhone 15 Pro outline.

## 6. Privacy Policy content (must stay true to the app)

- No account, no sign-in, no server. Meontor has no network code, and entries, reflections and settings live only on the device (App Group storage).
- Apple Intelligence runs on the device. Nothing is sent to any AI service, including Private Cloud Compute (not used today).
- HealthKit is opt-in per metric and read-only: sleep, steps, active energy, resting heart rate, workouts. Nothing is written to Health. Health data is never used for advertising and never leaves the device.
- Siri, Shortcuts, widgets, Controls and Live Activities are handled by iOS on the device.
- Face ID app lock is optional, and biometric data is handled by iOS and never seen by the app.
- No analytics, advertising, tracking, or third-party SDKs. Crash reports reach the developer only if the person has opted into Apple's sharing with developers.
- Deleting the app deletes the data. Settings has Export and Erase.
- The website sets no cookies and runs no analytics. Vercel, as host, may keep standard server logs.
- Children, changes to the policy, contact (`SUPPORT_EMAIL`), and effective date.

Before publishing, each claim is checked against the app's code: the entitlements, the privacy manifest, and HealthKit read types.

## 7. Copy rules (DESIGN §11, applied to the web)

- No em dashes anywhere a person reads, including meta descriptions and alt text.
- Never "only", "just", "failed", "missed", "behind", "streak broken". No deficit framing, no comparison, no moralising about food or drink, no medical claims.
- Never say or imply roles are weighed. Never show personal accounting.
- Say which engine writes: "Apple Intelligence" or "written on device". Never imply AI where there is none.
- Short, warm, true. A scripted check (`pnpm check:copy`) greps built HTML for the banned words and `—`.

## 8. Screenshots

- Captured from the iOS simulator on this Mac using the app's DEBUG launch arguments: `-sampleLife` for realistic data, `-screen now|timeline|mentor`, `-widgets small|medium|large` for widget faces, and Quick Capture.
- Mentor text is generated by Apple Intelligence in the simulator on this Mac (HANDOFF §8). If a line reads poorly, regenerate it rather than edit the image.
- Status bar cleaned with `xcrun simctl status_bar override` (9:41, full battery).
- Exported as WebP at 2x, light and dark variants where the section shows both, with `width`/`height` set to avoid layout shift, and lazy-loaded below the hero.
- The wordmark image and icon are rendered from the app's SwiftUI views (the `IconExport` test pattern), not redrawn.

## 9. Project files

Following Oareo: `src/app.css` (tokens), `src/app.html`, `src/lib/constants/app.ts`, and in `src/lib/components/`: `SeoHead`, `Navbar`, `Footer`, `Mark`, `PhoneFrame`, `Feature` (one showcase row), `WidgetShowcase`, `Icon`, `LegalPage` (shared legal layout). Also `static/` (favicons from the app icon, `manifest.json`, `robots.txt`, `sitemap.xml`, OG image), `vercel.json`, eslint/prettier as Oareo, and `CLAUDE.md`/`AGENTS.md`/`README.md`.

## 10. Verification

- `pnpm check`, `pnpm lint`, `pnpm build` clean, plus `pnpm check:copy`.
- Every page viewed in Chrome at 390px and 1440px, light and dark, and with reduced motion. Lighthouse run for accessibility (target 100) and performance.
- Nothing in the built output loads from another origin (checked in the network panel).

## 11. Workspace checklist

`git init` (done), `~/Code/.gen-aliases.sh` (alias `meontor_site`), a row in `~/Code/web/README.md` and in `~/Code/README.md` Active Projects, and a project `CLAUDE.md`/`AGENTS.md`. No commit, GitHub repo, Vercel project or DNS without the owner's approval.

## 12. Out of scope

Press kit, blog, localisation, a TestFlight sign-up form, an email list, and any server code.
