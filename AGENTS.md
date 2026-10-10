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

**State (2026-10-06):** live at https://meontor-site.vercel.app, `main` at PR #7 (the app's v1 copy: iOS 26 or later, iPhone and iPad, free, Touch ID lock, Export's contents, feedback by email in Privacy §2). The App Store listing uses `/privacy` and `/support` on that address. The app is about to be submitted.

**Open, none started:**

- Home page still says "iPhone" in three places (Mentor "written on your iPhone", How it learns "All on your iPhone", privacy band "Everything stays on your iPhone"); the owner has not asked to change them.
- Retake the Mentor day/week shots once Apple Intelligence answers in the simulator; optional Tonight sheet shot (`-tonight`, see the handoff doc §3).
- Owner calls pending: "No streaks / Nothing resets" beside the Mentor's affirming runs.
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
2. **Copy:** no guilt, no deficit, no comparison, no role weighing, no medical claims. Say which engine writes the Mentor ("Apple Intelligence" or "written on device").
3. **Privacy claims** in `src/routes/privacy` were checked against the app's code on 2026-09-26 (no networking code, HealthKit `toShare: []` with five read types, privacy manifest with no tracking). Re-check the app before changing a claim.
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
                          Screenshot, Feature, Hero, WidgetShowcase, HowItLearns,
                          LearningDial, PatternsShowcase, SiriShowcase, PrivacyBand,
                          AppStoreCta, LegalPage, ErrorMessage
  lib/content/faq.ts      FAQ: feeds the Support page and its FAQPage JSON-LD
  lib/learning/learningDay.ts   port of the app's LearningDay.swift ("How it learns" script, curve, Beat)
  lib/learning/phase.ts   the six day phases (ToneProfile.swift); marks take the visitor's hour colour
  routes/                 / · /support · /privacy · /terms · +error (404)
scripts/
  verify-lib.js (+ .test.js), verify.js   the copy and origin checks
  export-wordmark.swift   SF Pro Rounded Semibold 48pt, tracking -0.6 → SVG outlines
  shots.sh                simulator screenshots via the app's DEBUG launch args
static/images/screens/    {now,mood,capture,mentor,mentor-week,timeline}-{light,dark}.webp (780w)
static/images/widgets/    {large,medium,small,running}-{light,dark}.webp (2x, rounded)
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
- **Screenshots:** build the app for the booted simulator, then `scripts/shots.sh <now|timeline|mentor|search> <light|dark>`. Load data once with `-sampleLife` (it ignores `-screen`). Widgets (build 11 design): `-widgets small|medium|large|live` draws the DEBUG gallery (Resting, Running, Fresh install, Empty); crop medium/small/large from Resting and `running` from the medium Running card, at 3x (medium 1092x510, small 510x510, large 1092x1146 px), corner 24 pt = 72 px, transparent, then down to 2x. Shoot in the afternoon or evening so the arc has a day on it. Mentor shots: `SHOT_NAME=mentor scripts/shots.sh mentor light -mentorDaysBack 1` (the opening follows the clock, so a past day reads whole), `SHOT_NAME=mentor-week ... -mentorPeriod week -mentorDaysBack 1` on a Sunday. The simulator sometimes drops launch arguments on a quick relaunch: run the line again. The DEBUG-only magenta diagnostic line on the Mentor card is painted out, since release builds never show it.

## How it learns and the hour colour

- `HowItLearns.svelte` conducts the app's onboarding centrepiece; `LearningDial.svelte` only draws it. Data and timings are a port of `MeontorCore/Onboarding/LearningDay.swift`, whose `LearningDayRankerTests` hold the tiles to the real ranker: **change the Swift first, then mirror it here** (`learningDay.test.ts` mirrors its maths).
- Reduced motion, no JS and screen readers get the still card (the four moments), as the app does under Reduce Motion or VoiceOver.
- Every mark sits in a `.mark-tint` wrapper; the layout sets `data-phase` on `<html>` from the visitor's hour, and `--phase-*` in `app.css` are Apple's system colours. Without JS the mark stays the midday blue.
- The Mentor screenshots (`mentor`, `mentor-week`) come from the simulator at app build 11 (2026-09-27). Apple Intelligence did not answer in the simulator that evening, so they are written on device, which the copy allows for; it worked there on 2026-09-26 and is unreliable in the simulator (the app's CLAUDE.md). For an Apple Intelligence shot, give it `SHOT_WAIT=50` or use one from the owner's iPhone. Check the byline's Apple Intelligence button shows the plain symbol (the badge with an x means written on device), and that every light/dark pair differs: `for f in static/images/screens/*.webp; do echo "$f $(magick "$f" -colorspace Gray -format '%[fx:mean]' info:)"; done`.
- "What you're learning about yourself" (`PatternsShowcase`) is drawn, not photographed: it sits below the fold of the app's week view. Its sentences are ones the app writes (the app's `DESIGN.md` §6.3 describes them).

## At launch

1. Set `APP_STORE_URL` (the CTA becomes a link; add `app-id=` to the `apple-itunes-app` meta in `SeoHead`).
2. `SUPPORT_EMAIL` is graymodule@proton.me (owner, 2026-09-27), the address the app's feedback sheet uses; change it there if meontor.com gets mail.
3. When meontor.com is bought: add it in Vercel, then change `SITE_URL`, `static/sitemap.xml`, `static/robots.txt` and `SITE` in `scripts/verify.js` together, and tell the app side the new `/privacy` and `/support` URLs (owner approval).
