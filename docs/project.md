# Project Plan: OYC Close-Off – The Journey Continues

## 1. Context
MRANTI's Own Your Career (OYC) four-week campaign is closing. HR wants colleagues to engage with a seven-image close-off carousel through a dedicated, shareable web link, **not through a social media platform**. The experience should invite reflection and encourage continued career development.

## 2. Concept
**OYC: The Journey Continues** is a mobile-first microsite combining a guided journey (welcome → seven-slide story → optional reflection → closing) with immersive, manually controlled swipe navigation. Staff access it from an HR email or Google Chat link. No sign-in is required.

## 3. Objectives
1. Present the **seven approved images without modification** in their original order.
2. Make the carousel comfortable to read and navigate on phones and desktops.
3. Encourage one voluntary, private, practical career-development intention.
4. Provide subtle, optional background music with accessible controls.
5. Keep implementation low-maintenance and deploy on Vercel from GitHub.

## 4. Audience and access
- MRANTI colleagues/staff, including non-executive and executive staff.
- Public, unlisted URL may be distributed internally. **Unlisted does not mean private**; never publish confidential material or personal data.
- No account, login, staff profile, survey submission, or server-side persistence.
- English copy based on current approved carousel; do not introduce unapproved translations.

## 5. Approved content and image handling
- Exactly **seven original close-off poster images**, provided separately by the project owner.
- Keep every poster's text, colour, artwork, logo, proportions and composition exactly as supplied.
- Do not use screenshots of thumbnail strips or AI-generated substitutes as final assets.
- Proposed semantic slide labels for navigation only (confirm against final supplied files):
  1. `4 Weeks. One Journey. Endless Possibilities.`
  2. `Have You Given It a Try?`
  3. `Every Small Step Counts.`
  4. `Your Journey Continues. Make Your Next Move.`
  5. `4 Weeks. 4 Themes. One Journey.`
  6. `Quick Check-In.`
  7. `5 Small Ways to Keep Growing.`
- These labels are **planning references, not instructions to rewrite the image text**. Verify actual wording and sequence from the seven final files before coding.

## 6. MVP scope
**Include:** Welcome screen; manually navigable 7-poster viewer; swipe/tap/arrow navigation; segmented progress; readable full-image fit; optional zoom; keyboard controls; gentle motion; optional looping instrumental soundtrack with play/pause/mute/volume; optional private reflection selection; personalised closing text; revisit journey; share/copy link; responsive design; basic accessibility.

**Exclude:** Supabase, database, sign-in, employee identification, analytics, completion tracking, staff response storage, surveys, comments, admin CMS, auto-advancing slides, page-load audio autoplay, social platform integration, background video. Playback started by the user clicking **Begin Your Journey** is approved.

## 7. Content and tone
- Corporate-professional but warm, simple and approachable.
- Do not overstate campaign outcomes or claim a staff member has completed a career chat.
- Approved welcome heading: **4 Weeks. One Journey. Endless Possibilities.**
- Approved welcome support line: **Your journey doesn't end here.**
- Primary CTA: **Begin Your Journey**.
- Approved closing heading: **The Campaign Ends. Your Journey Continues.**
- Approved closing support line: **Keep exploring your strengths, growing your skills and taking ownership of your career.**
- Existing poster copy is not to be changed.

## 8. Success and acceptance criteria
- All seven supplied posters load, are in the approved order and remain unmodified.
- Images are fully visible by default (no clipping/cropping), including on narrow screens.
- Users can complete the journey without music, zoom, a mouse, or any submitted response.
- No poster changes automatically while someone is reading.
- Clicking **Begin Your Journey** starts the approved Comet/Echo playlist at 50% with a 1.5-second fade-in; play/pause, mute, volume and next-track controls work on mobile and desktop.
- Reflection stays on the client, is optional, and never leaves the device.
- No database or authentication service is required.
- Deployment works on the chosen Vercel account; organisational/commercial-use plan terms must be checked before publication.

## 9. Outstanding inputs / approvals
- Seven high-resolution final posters are supplied and their order is approved.
- Standalone logo files are supplied but will not appear outside the posters.
- Approved audio files are supplied as `public/audio/comet.mp3` and `public/audio/echo.mp3`. Keep the supplied filenames and verify their corporate web usage, attribution and redistribution terms before publication.
- Welcome, closing and reflection wording is approved; the final distribution link remains pending.
- Confirm Vercel account and plan are appropriate for organisational use.
