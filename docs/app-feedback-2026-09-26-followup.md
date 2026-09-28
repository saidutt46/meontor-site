# From the app side: bring the site up to build 11

Updated 2026-09-27 (night) by the agent working on the Meontor app. Build 8
carried the Mentor round, build 9 the fixes from the owner's own phone,
build 10 notifications (§5), and **build 11 redesigned widgets and Live
Activity** (§1a, new in this update: the widget images and the widget copy
are now out of date). `main` of the app repo is build 11, the v1 candidate.
The app's docs are the source of truth:
`~/Code/ios/Meontor/{HANDOFF,DESIGN,TASKS}.md`, DESIGN §6.3 for the Mentor,
DESIGN §8 for the widgets.

The site's structure is fine. What it needs: **new screenshots, including
all six widget images, and a handful of copy changes** where the app has
moved on. Nothing here asks for new sections except, optionally, §4 and §5.

---

## 1. What changed in the app, screen by screen

### The Mentor, Today (`mentor-light/dark.webp`: retake)

- **The opening is new.** Meontor writes it itself from the shape of the
  day, never a language model, so it cannot invent anything. It follows the
  clock: parts of the day that are over in the past tense, the part you are
  in in the present, nothing about hours still to come. For example, at
  3:30 pm: "The morning let you rest, with some TV. Now the afternoon is
  taking care of you, with a snack."
- **The byline is the control.** The date in large type, then round glass
  buttons: a calendar, the Apple Intelligence symbol (tap: who wrote this
  and whether Apple Intelligence is working), and info. "Today" appears when
  you have stepped back.
- **Looking back.** Tap the calendar, or swipe the reflection, for any past
  day or week. A past day stays as it was written.
- **Tap the arc** for a sheet: the day drawn larger with every stretch
  named, a legend, and the day in order with lengths.
- **In the longer view**, at the bottom of Today: how today sits in your
  recent weeks, for example "Tea has kept its place in your weekday
  afternoons for four weeks, and today it held again."
- **An info sheet** (the ⓘ button) explains the screen.
- **Nothing flickers**: while words are written they shimmer; the arc and
  the figures stay put.

### The Mentor, This week (`mentor-week-light/dark.webp`: retake)

- **Weeks are calendar weeks**, starting on the first day of the week in
  the phone's region (Sunday in the US). "This week" is the week so far.
- **The week reads as a life.** Its opening says how the weekdays ran
  against the weekend, what held, and a day that stood out, for example:
  "The weekdays began with the work in hand and ended with the people you
  love, then a weekend for rest. Kids' bedtime kept its place every
  evening, and reading most nights."
- "What you're learning about yourself" is unchanged: your drawn cards
  still match the app.

### Now, Timeline, Quick Capture, the value sheet (retake for consistency)

Layouts are unchanged. Two details that may show: the activity "Watched"
is now **"TV"**, and Now's "Right now" and thought shimmer for a moment
while they load (never in a screenshot taken after the wait).

### Widgets (build 11: **retake all six**, and see §1a)

The widget images show the old design and must be replaced.

## 1a. The widgets and the Live Activity, redesigned (build 11)

Seen on the owner's phone, 2026-09-27. Every claim below is true of build 11.

- **Medium**: the day's name and what it holds so far ("6 logged ·
  1h 30m"), **the arc of your day** (a line from morning to midnight, a dot
  for each moment and a bar for each stretch, with "now" on it), and **three
  tiles** you tap to log without opening the app. A tile shows a check and
  today's count once you have logged it ("✓ 2"). The thought is no longer on
  the medium widget.
- **Large**: the same, with the hours under the arc; the last thing you
  logged ("Coffee · 25 min ago"); **six tiles**; and the thought at the
  bottom, in the app's own sans-serif rather than italic serif.
- **Small**: unchanged in layout: one suggestion, one tap.
- **While something runs**, the timer is the hero: large, with the activity
  and when it started, and a round **Stop**. Stop now clears the widget, the
  Lock Screen and the Dynamic Island within moments.
- **Tinted and clear Home Screens** are supported: the widget's background
  gives way to the system's.
- **Live Activity**: on the Lock Screen, the activity, a large timer and a
  round Stop. In the **Dynamic Island** (the phone unlocked, Meontor not on
  screen): the activity's symbol and the timer beside the camera; press and
  hold for the expanded view with a large timer and a Stop button. A locked
  phone shows the Lock Screen card, as every app's Live Activity does.
- **Privacy, still true**: habits and symptoms never appear on the widget or
  the Lock Screen, not even as a dot on the arc.
- **Not built, do not claim**: Lock Screen widgets (the small circular and
  rectangular ones), StandBy, Smart Stack suggestions. They come after v1.

---

## 2. Screenshots: how to take them

Run build 11 (`main` of the app repo, Debug)
on the booted simulator. Write the sample life first, then shoot:

```bash
# once: four weeks of one person's days (erases the simulator's store)
xcrun simctl launch --terminate-running-process booted com.daivatcreations.Meontor -skipOnboarding -sampleLife
sleep 20

scripts/shots.sh now light && scripts/shots.sh now dark
scripts/shots.sh timeline light && scripts/shots.sh timeline dark
scripts/shots.sh search light && scripts/shots.sh search dark
SHOT_NAME=mentor scripts/shots.sh mentor light -mentorDaysBack 1
SHOT_NAME=mentor scripts/shots.sh mentor dark -mentorDaysBack 1
SHOT_NAME=mentor-week scripts/shots.sh mentor light -mentorPeriod week -mentorDaysBack 1
SHOT_NAME=mentor-week scripts/shots.sh mentor dark -mentorPeriod week -mentorDaysBack 1
```

Notes, learned the hard way:

- **Time matters now.** The opening follows the clock, so a Today shot
  taken in the morning says one sentence. `-mentorDaysBack 1` shows
  yesterday, a whole day in the past tense (the byline then carries a
  "Today" button, which is fine). A week shot: `-mentorDaysBack 1` on a
  Sunday shows the full week that just ended; otherwise pick `n` so the week
  is complete.
- **The simulator sometimes drops launch arguments** right after an install
  or on a quick relaunch. If a shot shows the wrong screen, run the same
  line again.
- The Mentor needs 10 to 15 seconds to write with `-mentor ai`: raise
  `SHOT_WAIT=15`.
- Re-run the brightness check on the light shots, as last time.

**The widgets** cannot be placed on the simulator's Home Screen, so they are
shot from the app's DEBUG gallery, which draws every state at true size on
a stand-in wallpaper, and cropped to the widget:

```bash
xcrun simctl ui booted appearance light   # then dark
xcrun simctl launch --terminate-running-process booted com.daivatcreations.Meontor \
  -skipOnboarding -widgets medium          # small | medium | large | live
```

The gallery shows, top to bottom: Resting, Running, Fresh install, Empty.
Crop `medium` and `small` from **Resting**, `running` from the medium
**Running**. Canvases are 364 x 170 pt (medium), 170 x 170 pt (small),
364 x 382 pt (large) at 3x; the corner radius is 24 pt, so crop to the
rounded card and keep the corners transparent, as the current images are.
`-widgets live` shows the Lock Screen card and the Island's forms, if a
section wants them. The samples show a morning's shape relative to the
time you run it: shoot in the afternoon so the arc has a day on it.

Optional new shots, if a section wants them: `-arcSheet` (the arc's detail
sheet for the day showing), `-mentorInfo` (the info sheet; `-mentorInfo
bottom` for its end), `-mentorBottom` (the Mentor at its bottom: "In the
longer view" and Ask).

---

## 3. Copy that is no longer true, or no longer complete

Suggested wording; keep the site's voice. Every sentence below is true of
build 11.

**Mentor section** (`src/routes/+page.svelte`, `#mentor`). The first
paragraph still holds. Add, or fold in:

> It opens with the shape of your day, written by Meontor itself and only
> as far as the day has gone. Tap the calendar to look back at any day or
> week, or tap the line for the day in order.

**The week** (`PatternsShowcase.svelte`). "Draws your seven days on one
shared line" becomes:

> The week view draws your week on one shared line, day by day, so mornings
> line up and weekends look like weekends. It opens with how your weekdays
> ran against your weekend, and what kept its place.

**FAQ, "Why does a reflection say 'Written on device'?"** The current answer
is now slightly wrong: Meontor always writes the opening itself. Suggested:

> It means no line on the page came from Apple Intelligence: it wasn't
> available, or what it wrote didn't pass Meontor's checks against your log.
> The Apple Intelligence button beside the date always tells you which.

**FAQ, "What does the Mentor write?"** Add looking back and the longer
view:

> The shape of your day, drawn on a single line and put into words; what
> each of your roles held; something worth noticing; and a thought. At the
> bottom, how today sits in your recent weeks. Each week it adds what has
> held across the last four. You can look back at any day or week. It
> reflects; it doesn't grade.

**Privacy** (a new claim that is now true, worth a line on the privacy page
or band): habits and symptoms (smoking, nicotine, alcohol, cannabis,
betting, headaches and the like) are **never shown to a language model**,
not even Apple's on-device one. The Mentor states them plainly itself.

---

**Widget section** (`WidgetShowcase.svelte`). The heading can stay; the
paragraph and the alt text describe the old widget. Suggested:

> Meontor learns your rhythm from your own days and suggests what you're
> likely to log right now. Tap a tile and it's logged, without opening the
> app. Above the tiles, the shape of your day so far, drawn on a single
> line. When something is running, the timer takes the top, with Stop a tap
> away.

Alt text: medium, _"The medium widget: Sunday, 6 logged, the day drawn as a
line, and tiles for Coffee, Water and Walk"_; small, _"The small widget with
one suggestion, Coffee"_ (unchanged). If the large widget is added: _"The
large widget: the day's line with its hours, the last thing logged, six
tiles and a thought"_.

**FAQ, "How do I add the widget?"** The second sentence is no longer true.
Suggested:

> Touch and hold your Home Screen, tap Edit, then Add Widget, and choose
> Meontor. The medium size shows your day so far and three suggestions; the
> large adds the last thing you logged, six suggestions and a thought.

**Live Activities** (`SiriShowcase.svelte`): "Anything running stays in
view, with Stop a tap away" is still true; keep it.

## 4. Still worth adding: how easy logging is (unchanged, still true)

The site says "one tap"; the app does more, and none of it is on the site.
All of this is true of build 11:

- **Without opening the app**: the widget (small, medium, large), Control
  Center, Lock Screen and Action button controls, a Live Activity and the
  Dynamic Island for anything timed, and Siri ("I finished my run in
  Meontor", "Start deep focus in Meontor"; "Mentor" also works as the
  name). Siri matches fixed phrases, so a number cannot be spoken inside
  one; when an activity has details, Siri asks after logging it _(confirm
  the follow-up questions with the owner before claiming them)_.
- **Details when you want them**: amounts (glasses, cups, drinks), calories
  on meals, the kind of coffee or drink, ratings with faces (Mood, Energy,
  Stress, Pain, Slept well), measures on a dial (Weight, Temperature),
  notes, "ask every time" for any activity, swipe to edit or delete with
  Undo, your own activities and categories.
- A value sheet shot: `-capture mood` or `-capture weight`.

---

## 5. New in v1: notifications and the question for tonight

Built after this doc was first written (build 10, merged into the app's
`main`, shipping in v1). Worth a short section or a line in the Mentor section,
and an FAQ entry. All true of the app:

- **Your day, read back**, each evening around your usual wind-down
  (learned from when you log going to bed), with **a question for tonight**
  you can answer right in the notification. The answer is saved to your
  Journal and shown when you look back at that day. The same question sits
  at the foot of Today.
- **Your week, read back**, on the week's last evening.
- **Gentle check-ins**: at most one a day, only in a part of the day you
  usually log and only while it is empty, with buttons that log without
  opening the app.
- **When something holds**: now and then, when a pattern appears.
- **Never more than two a day**, nothing while you sleep, and anything
  ignored three times in a row rests for a week. Every kind can be
  switched off.
- **Privacy**: planned and sent on the phone itself; there is no server.
  Habits and symptoms never appear on the Lock Screen, and your answers are
  never shown to a language model.

Suggested FAQ: _"Will Meontor send me notifications?"_ "Only if you want
them: an evening note with a question for tonight, your week on its last
evening, and at most one gentle check-in a day. Never more than two a day,
and each kind can be switched off in Settings."

## 6. Contact

`SUPPORT_EMAIL` in `src/lib/constants/app.ts` is now **graymodule@proton.me**
(the owner's call, 2026-09-27), the same address the app's feedback sheet
uses. It feeds the support page, the footer, Terms and Privacy.

## 7. What not to claim

Not built, so not on the site: fun equivalents, calendar integration, a new
model. Say nothing about TestFlight build numbers on the site.

## 8. Rules, as before

Every claim must be true of the app; no em dash, no guilt, no "only/just";
privacy claims re-checked against the app before any change. When in doubt,
ask the owner or read the app's DESIGN.md.
