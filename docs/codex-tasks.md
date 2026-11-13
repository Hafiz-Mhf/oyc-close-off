# Codex Implementation Plan

## Working instructions for Codex
Read `README.md`, `project.md`, `experience.md`, `design.md`, `ui-ux.md` and `architecture.md` before coding. Follow the approved MVP, do not add a backend or analytics, and do not modify original poster artwork. Ask for missing original assets instead of generating replacements. Do not invent official logos.

## Phase 0 – Validate assets and approvals
- [x] Confirm seven separate final images, order and resolution.
- [x] Confirm standalone logos will not be shown outside poster images.
- [x] Confirm final `public/audio/comet.mp3` and `public/audio/echo.mp3` assets and attribution details.
- [ ] Confirm corporate suitability of chosen Vercel plan.
- [x] Confirm welcome/reflection/closing copy.

## Phase 1 – Project setup
- [x] Initialize Next.js App Router with TypeScript and Tailwind.
- [x] Create data-driven poster manifest and screen-state model.
- [x] Implement responsive base layout and visual tokens.
- [x] Add basic metadata, omit unapproved favicon artwork, and add error states.

## Phase 2 – Story experience
- [x] Build welcome screen and Begin CTA.
- [x] Build seven-slide story viewer with original images.
- [x] Add touch swipe, visible navigation, keyboard arrows and progress.
- [x] Ensure contain-fit, no crop, no automatic progression.
- [x] Add story motion, adjacent-image preloading and missing-image handling.

## Phase 3 – Music
- [x] Create persistent audio player component/hook.
- [x] Start playback from **Begin Your Journey** at 50% with a 1.5-second fade-in.
- [x] Add compact play/pause, mute/unmute, next-track and 0% to 100% volume controls.
- [x] Preserve playback, pause, mute and volume intent across screen transitions and revisit.
- [x] Handle blocked or missing playback without blocking the visual journey.
- [x] Verify Comet → Echo → Comet sequencing and paused-skip behavior in Chrome.

## Phase 4 – Reflection and closing
- [x] Build four-choice optional reflection and Skip action.
- [x] Show corresponding takeaway; no server storage.
- [x] Build closing screen, Revisit CTA and share/copy-link fallback.
- [x] Verify selected reflection is not added to URL or sent externally.

## Phase 5 – Zoom and accessibility
- [x] Add accessible zoom/lightbox with pinch, pan, zoom in, zoom out and reset.
- [x] Add dialog focus management, Escape handling and focus restoration.
- [x] Add approved verbatim poster transcripts and accessible progress announcements.
- [x] Verify keyboard access, visible focus and reduced-motion behavior.

## Phase 6 – QA
- [x] Test all seven posters at mobile/tablet/desktop breakpoints.
- [x] Test keyboard, screen reader labels and reduced motion.
- [x] Test audio with Android Chrome and iOS Safari mobile emulation; physical-device validation remains pending.
- [x] Test image zoom, missing asset states, slow connection.
- [x] Verify there are no database calls, tracking SDKs or personal-data submissions.

## Phase 7 – Publication
- [x] Push the Phase 6-complete source to GitHub.
- [ ] Deploy on an approved Vercel plan.
- [ ] Review live URL with HR before sharing to staff.

## Definition of done
A staff member can open one Vercel link, begin the journey, read all seven unchanged posters at their own pace, optionally enable/adjust music, zoom images, privately choose or skip a reflection, and reach a closing message with revisit/share options. The experience works on common mobile and desktop browsers and requires no login or database.

## Suggested first Codex prompt
> Read all Markdown files in this planning directory and implement the OYC Close-Off microsite as a Next.js TypeScript project. First inspect available assets and report anything missing. Preserve the seven original posters and approved logos without alteration. Build the Adaptive Hybrid journey, accessible manual story navigation, optional client-side music and private reflection exactly as specified. Do not add Supabase, authentication, analytics or server-side data collection. Implement in phases and validate responsiveness, accessibility and audio behaviour before deployment to Vercel.
