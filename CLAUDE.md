# Meontor Site - Agent Guide

**Stack:** SvelteKit 2 + Svelte 5 + Tailwind CSS v4 (no Three.js, no web fonts)
**Target:** Marketing & support site for the Meontor iOS app (`~/Code/ios/Meontor`)
**Deploy:** Vercel, fully prerendered static site, git-connected (`main` deploys production). Live at https://meontor-site.vercel.app, which is `SITE_URL` until meontor.com is bought (owner, 2026-10-05); the App Store listing links its `/privacy` and `/support`.

The app's source of truth: `~/Code/ios/Meontor/{PLAN,DESIGN,HANDOFF}.md`; the latest brief from the app side is `docs/app-handoff-2026-10-05-v1.md` (v1: iOS 26, iPhone and iPad, free). App-side briefs in `docs/app-*.md` are kept local and never committed (owner, 2026-10-05); if one is missing, ask for it. Every claim on this site must be true of the app. Design and plan for this site: `docs/superpowers/specs/2026-09-26-meontor-site-design.md`, `docs/superpowers/plans/2026-09-26-meontor-site.md`.

---

## Starting a session

Read this file, `README.md` and the prompt you were given (from the owner or a parent agent), then:

1. `git status -sb`: work starts from an up-to-date `main` on a new feature branch. The untracked or modified `docs/app-*.md` files are the owner's local briefs; leave them out of commits.
2. Re-check any app fact you touch against `~/Code/ios/Meontor` (its `HANDOFF.md` first), not against this site.
3. After every change: `pnpm check && pnpm lint && pnpm test && pnpm build && pnpm verify`. Show the owner the changed text before committing.
4. With his approval: commit, `git push -u`, `gh pr create`, `gh pr merge --merge --delete-branch` (merge commits, no squash). Vercel deploys `main` in about a minute; check the live pages with `curl`. Stop any `pnpm preview` you started (`kill $(lsof -ti :4173)`).

**State (2026-11-11):** live at https://meontor-site.vercel.app, which the App Store listing uses for `/privacy` and `/support`. The privacy page and FAQ describe app v1 at `1ba6ef6` (Ask the Mentor anything, on-device distress check, private names taken out of the question). The home page describes the app at `f67dd35` (round 1) and, from round 2, the Mentor at v1 (`8ed2f49` screenshots, copy checked at `0eff2a7`). The rings may be described, modestly, as v1 has them (owner, 2026-11-04); private activities show in grey, never named. No rings picture yet. Do not describe "Your weeks" (removed) or a model line in a finding's sheet (removed).

**Open:**

- App T-152 (before TestFlight 21) fixes the grey dot on the rings and Walk's "11 of those 11" line; then a rings picture and the Walk finding become options.
- `HowItLearns`, `LearningDial` and `learningDay.ts` are off the page on purpose (owner, 2026-11-09), kept for when the onboarding chart settles; re-port from `LearningDay.swift` before using them again.
- Owner calls pending: "No streaks / Nothing resets" beside the Mentor's records.
- At launch: see "At launch" below. Deferred: HSTS `preload` once the domain settles, `og:image` width and height.

---

## CLI

pnpm lives under nvm Node 24 and is **not on the default PATH**:

```bash
export PATH=$HOME/.nvm/versions/node/v24.13.0/bin:$PATH
pnpm dev                 # dev server
pnpm check && pnpm lint  # svelte-check, prettier, eslint
pnpm test                # vitest: the verify library
pnpm build && pnpm verify  # verify MUST pass after every build
pnpm format
```

`pnpm verify` scans every prerendered page for:

- **Copy rules (the app's DESIGN §11):** no em dash, and none of `only`, `just`, `failed`, `missed`, `behind`, `streak broken`, in text, `alt`, `aria-label`, `title` or meta `content`. Rephrase; never weaken the check.
- **Third-party origins:** any script, image, stylesheet, font or CSS `url()` from another host fails.

---

## Rules

1. **No cookies, no third-party requests.** The CSP in `vercel.json` is `'self'` only. The one analytics is Vercel Web Analytics (owner, 2026-09-29): cookieless page views, `injectAnalytics` in `src/routes/+layout.ts`, served from this site's own address (on Vercel a project-specific path such as `/3da9b651fa253f23/script.js`, `/_vercel/insights/` in `pnpm preview`); it ignores automated browsers, so check it with a real browser. The privacy policy (§9) and the privacy band say exactly this; change them together.
2. **Copy:** no guilt, no deficit, no comparison, no role weighing, no medical claims. The Mentor's findings are written by the app's own rules; never say Apple Intelligence writes about the person.
3. **Privacy claims** in `src/routes/privacy` and the FAQ were checked sentence by sentence against the app; the page's header comment names the app commits and main files. Re-check the app before changing a claim.
4. **Colours** are tokens in `src/app.css` (`--canvas`, `--grouped`, `--label*`, `--separator`, `--accent`); light and dark follow `prefers-color-scheme`, with no toggle. Accent is `#4F63D9` light / `#7D94F0` dark, chosen for 4.5:1 contrast.
5. Svelte 5 runes only. Every animation must stop under `prefers-reduced-motion`, and content must show with JS off (`.fade-in` handles both).
6. **Git:** no commits or pushes without the owner's explicit approval. Use `gh` for GitHub.

---

## Structure

```
src/
  app.css                 tokens, .fade-in, reduced-motion and no-JS rules
  lib/constants/app.ts    SITE_URL, SUPPORT_EMAIL, APP_STORE_URL (null until launch)
  lib/assets/wordmark-path.ts   generated by scripts/export-wordmark.swift
  lib/components/         Mark, Wordmark, Navbar, Footer, SeoHead, Icon, PhoneFrame,
                          Screenshot, Feature, Hero, WidgetShowcase, MentorShowcase,
                          SiriShowcase, PrivacyBand, HowItLearns and LearningDial (unused),
                          AppStoreCta, LegalPage, ErrorMessage
  lib/content/faq.ts      FAQ: feeds the Support page and its FAQPage JSON-LD
  lib/learning/learningDay.ts   port of the app's LearningDay.swift ("How it learns" script, curve, Beat; unused, see Open)
  lib/learning/phase.ts   the six day phases (ToneProfile.swift); marks take the visitor's hour colour
  routes/                 / · /support · /privacy · /terms · +error (404)
scripts/
  verify-lib.js (+ .test.js), verify.js   the copy and origin checks
  export-wordmark.swift   SF Pro Rounded Semibold 48pt, tracking -0.6 → SVG outlines
  shots.sh                simulator screenshots via the app's DEBUG launch args
static/images/screens/    {now,today,mood,capture,timeline}-{light,dark}.webp (780w, app f67dd35); {mentor,mentor-finding,mentor-recap,mentor-ask}-{light,dark}.webp (app 8ed2f49)
static/images/widgets/    {large,medium,small,running,live-lock}-{light,dark}.webp (2x, rounded; large from 8ed2f49)
```

## Assets

- **Mark:** `Mark.svelte` redraws `MeontorMarkArtwork` (app `main` `0f3e839`, 2026-10-10) on a 100 grid: petal 26 x 62, offset 19, core 15, dot 7. Drawn as the app icon is, flat: back fan (60/180/300°) `color-mix(currentColor 76%, black)` at 0.78 under the front fan (0/120/240°) at 0.82; the star (each point a petal clipped by its neighbour) solid on a small drop shadow, lifted 18% toward white in dark mode; the core cut out of all of it; the dot solid. Colour via `currentColor`. If anything ever turns it, use 120° steps.
- **Wordmark:** `swift scripts/export-wordmark.swift > src/lib/assets/wordmark-path.ts`.
- **Icons** (the Liquid Glass icon, app `main` `892be39`, 2026-10-07): every raster comes from Icon Composer's export `~/Code/ios/Meontor/docs/design/icon/final/app-icon-1024.png` (RGBA, transparent rounded corners). The app's old flat icon (`docs/design/app-icon/`) is history.
  - `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`: flattened on the ground's dark end, since iOS and Android mask them: `magick "$ICON" -background '#0A0D14' -flatten -resize 180x180 static/apple-touch-icon.png`. `manifest.json` colours are `#0A0D14` to match.
  - `favicon-96x96.png`, `favicon.ico` (48, 32, 16): corners kept transparent: `magick "$ICON" -resize 96x96 …`, `magick "$ICON" -define icon:auto-resize=48,32,16 static/favicon.ico`.
  - `favicon.svg`: a flat likeness drawn from the layer SVGs beside the export (`petals-b`, `petals-a`, `star`, `dot`): `python3 scripts/build-favicon-svg.py` (ground gradient `#1C1F29 → #0A0D14`, back fan `#6378E0` at 0.65, front `#7D94F0` at 0.85, star and dot solid). Judge it in Chrome; ImageMagick draws SVG wrong.
  - `images/og-image.png` (1200 x 630): the export at 280 px, at +140+175, on `#0A0D14`, beside the wordmark and "Moment + Mentor".
  - `images/app-icon.webp` (192 px): the export, for the closing call to action.
- **Screenshots** (round 1, app `f67dd35`, 2026-11-05): build DEBUG from a `git archive` of the app commit into scratch, with its own DerivedData, in a simulator you create; pass its UDID to every `simctl` call (other projects' simulators are booted, so never `booted`; `scripts/shots.sh` still uses it). Load data with `-skipOnboarding -sampleLife -sampleLifeNoHabits` (no Habits or private activities), then `-screen now -mentorLine none -retireTips all` (`now`), `-mentorLine finding -mentorLineScroll YES` (`now-mentor`), `-todayDay sample -todayScroll YES` (`today`, draws 9:57 pm), `-capture mood`, `-screen search`, `-screen timeline`; `-screen` works with `-sampleLife`. Widgets (Graphite): `-widgets small|medium|large|live`, cropped at 3x (medium 1092x510, small 510x510, large 1092x1146), then down to 2x. Keep the Habits card out of Quick Capture frames. Set the status bar to the time the frame shows. Recipes and checks: the run reports in `.orchestration/runs/` (2026-11-05).
- **Mentor screenshots** (round 2, app `8ed2f49`, 2026-11-11): same method, with `-skipOnboarding -sampleLifeDays 90 -sampleLifeNoHabits`. Mentor top `-screen mentor`; a finding sheet `-mentorFindingSheet <key prefix>` (`rhythm:` gave Sleep); recap `-mentorOpen recap`; Ask typed `-mentorBottom -askQuestion "<text>"` (the iOS 27 simulator's Apple Intelligence read it, no `-askStub`); Ask chips `-mentorAsk <kind>`; rings `-mentorClock`. Run report: `.orchestration/runs/20261112T025747Z-report.md`.

## How it learns and the hour colour

- `HowItLearns.svelte` conducts the app's onboarding centrepiece; `LearningDial.svelte` only draws it. Data and timings are a port of `MeontorCore/Onboarding/LearningDay.swift`, whose `LearningDayRankerTests` hold the tiles to the real ranker: **change the Swift first, then mirror it here** (`learningDay.test.ts` mirrors its maths).
- Reduced motion, no JS and screen readers get the still card (the four moments), as the app does under Reduce Motion or VoiceOver.
- Every mark sits in a `.mark-tint` wrapper; the layout sets `data-phase` on `<html>` from the visitor's hour, and `--phase-*` in `app.css` are Apple's system colours. Without JS the mark stays the midday blue.
- Every light/dark pair must differ: `for f in static/images/screens/*.webp; do echo "$f $(magick "$f" -colorspace Gray -format '%[fx:mean]' info:)"; done`.
- `MentorShowcase` is the Mentor section: an intro (with the rings in words) and four rows, Findings, A finding, Recaps and Ask, each with a v1 screenshot. Every line is the app's own wording or proved in the run reports (2026-11-12).

## At launch

1. Set `APP_STORE_URL` (the CTA becomes a link; add `app-id=` to the `apple-itunes-app` meta in `SeoHead`).
2. `SUPPORT_EMAIL` is graymodule@proton.me (owner, 2026-09-27), the address the app's feedback sheet uses; change it there if meontor.com gets mail.
3. When meontor.com is bought: add it in Vercel, then change `SITE_URL`, `static/sitemap.xml`, `static/robots.txt` and `SITE` in `scripts/verify.js` together, and tell the app side the new `/privacy` and `/support` URLs (owner approval).
