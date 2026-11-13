# OYC: The Journey Continues — UI/UX Specification

**Version:** 1.0
**Status:** Approved design direction; additive to existing Phase 1 implementation
**Audience:** MRANTI staff
**Hosting:** Vercel
**Stack:** Next.js App Router, TypeScript, Tailwind CSS, Motion

## 1. Purpose and non-negotiables

Create a mobile-first, interactive close-off experience for MRANTI's Own Your Career (OYC) campaign. The experience combines a guided four-stage journey with immersive, manually controlled viewing of **seven original posters**.

- Preserve all seven supplied poster images **exactly**: no regenerated images, cropping, overlays that obscure content, rewritten text, recolouring, or altered logos.
- Use the approved poster order from the assets/project documents. Do not infer filenames or recreate missing assets.
- Retain the original aspect ratio using `object-fit: contain`; allow zoom for small text.
- No registration, authentication, database, Supabase, or server-side storage is required.
- Reflections stay in client-side state only and are not transmitted or persisted.
- No page-load sound autoplay. Clicking **Begin Your Journey** is the approved user gesture that starts controllable music.
- Respect keyboard navigation, touch accessibility, contrast and reduced-motion preferences.

## 2. Experience map

**Welcome → Seven-Poster Story Viewer → Optional Reflection → Closing**

Estimated self-paced completion: approximately 2–3 minutes, not a timer or forced duration. Every stage must be reachable and navigable without sound.

### Stage 1 — Welcome

**Goal:** Establish the campaign context and invite participation.

**Content:** Campaign heading **“4 Weeks. One Journey. Endless Possibilities.”**; support line **“Your journey doesn't end here.”**; primary CTA **“Begin Your Journey”**; discreet sound control and indication that sound is optional. Do not display standalone logo files; approved OYC/MRANTI branding remains inside the unchanged posters.

**Mobile:** Full-height navy background with restrained cyan/purple glow; centered heading and CTA; controls remain visible within safe areas.

**Desktop:** Wide branded composition with centered message and CTA, comfortable whitespace and consistent typography.

**Behaviour:** CTA moves to Poster 1 and starts optional music at 50% through a 1.5-second fade-in. Intro elements fade/translate subtly once; no blocking animation.

### Stage 2 — Seven-Poster Story Viewer

**Goal:** Let staff explore the original campaign posters at their own pace.

**Shared layout:** Seven segmented progress indicators, OYC title/branding, sound toggle, close/back affordance, current poster, clear navigation controls, poster index (`01 / 07`), zoom affordance.

**Mobile (<768px):** Immersive viewport-based layout. The poster uses the maximum *available* area while fitting fully on screen. Reserve room for header, progress, controls and mobile safe areas. Do not stretch or crop the image. Swipe horizontally to change posters. Provide visible buttons so swiping is not required.

**Desktop (>=768px):** Centered, height-constrained poster on a spacious navy/cyan/purple background. Place previous/next arrows outside the poster where possible. Preserve readable poster proportions and provide zoom. Do not expand portrait images to fill a landscape viewport.

**Navigation rules:**
- Swipe left / next button / Right Arrow: next poster.
- Swipe right / previous button / Left Arrow: previous poster.
- Progress segments are individually operable and labeled for assistive technology.
- Poster 1 cannot navigate backward into an undefined state; provide an explicit route back to Welcome.
- On Poster 7, present a clearly labeled **“Continue to Reflection”** action rather than advancing automatically.
- No timed auto-advance. Users must be able to read dense slides at their own pace.
- When a zoom viewer is open, gestures pan/zoom the image rather than changing posters.
- Escape closes the zoom dialog first. Provide explicit close controls for every overlay.

**Zoom:** Full-resolution view; support pinch/pan on touch and keyboard-accessible zoom in/out/reset controls on desktop. Preserve the image's original aspect ratio. Restore focus to the trigger on close.

### Stage 3 — Optional Personal Reflection

**Goal:** Convert the campaign into one practical, private takeaway without making it a survey.

**Prompt:** **“What's one small step you'd like to take next?”**

**Four single-select options:**
1. **Discover my strengths** — Understand what I enjoy and do well.
2. **Have a career chat** — Talk with my immediate supervisor.
3. **Learn something new** — Explore a skill or development opportunity.
4. **Take my next step** — Turn an idea into a practical action.

**Behaviour:** Selecting a card highlights it and shows a concise, supportive takeaway. Provide **“Continue”** and **“Skip for Now”**. No form submission, network request, analytics event containing the answer, or server persistence. Optionally allow copying the takeaway to the clipboard after user action.

**Layout:** One column on narrow phones; two columns when room permits; two columns on desktop. Keep labels readable and touch targets large.

### Stage 4 — Closing

**Goal:** Reinforce the campaign message and offer useful next actions.

**Heading:** **“The Campaign Ends. Your Journey Continues.”**

**Supporting copy:** **“Keep exploring your strengths, growing your skills and taking ownership of your career.”**

**Actions:**
- **Revisit the Journey** — returns to Poster 1.
- **Share with a Colleague** — use Web Share API when supported; otherwise copy the microsite URL and confirm success.
- If a reflection was selected, display its private takeaway; do not include it in the shared URL or share payload.

Use a gentle closing reveal, not a disruptive celebration animation.

## 3. Visual design system

The visual language must complement the supplied posters. Suggested working palette (verify against approved assets):

| Primitive token | Canonical value | Use |
|---|---|---|
| `navy-950` | `#030D28` | Deep page background |
| `navy-900` | `#061943` | Main background |
| `navy-800` | `#0A2353` | Raised surfaces |
| `cyan-400` | `#00E5ED` | Primary emphasis, progress, CTA and focus |
| `cyan-300` | `#76F7FB` | Hover and focus support |
| `mranti-blue` | `#0000FF` | Secondary MRANTI brand accent and restrained ambient detail |
| `blue-600` | `#31518A` | Muted borders |
| `purple-500` | `#8D49FF` | Ambient gradients only |
| `text-primary` | `#F7FBFF` | Main text on navy |
| `text-secondary` | `#D5E4F7` | Supporting text |

Map primitives to semantic roles such as `background`, `surface`, `primary`, `brand-secondary`, `border`, `text-primary` and `text-secondary`. Keep `#00E5ED` as the interactive primary. Use `#0000FF` only as a secondary MRANTI accent where contrast remains sufficient. Component styles must consume semantic tokens rather than introducing new raw values. Do not display standalone logos; never redraw or approximate official branding. Use a modern readable sans-serif consistent with the approved campaign. Maintain accessible contrast, clear focus rings, consistent rounded corners, and generous spacing. Background glow must never reduce poster readability.

## 4. Motion specification

| Event | Proposed effect | Duration |
|---|---|---|
| Welcome entrance | Subtle fade and upward movement | 500–700 ms |
| Poster change | Horizontal slide + slight fade | 250–350 ms |
| Progress update | Cyan fill/highlight | 150–250 ms |
| Reflection selection | Border/soft glow transition | ~200 ms |
| Closing reveal | Gentle fade | 500–700 ms |

Motion must not delay navigation. When `prefers-reduced-motion: reduce` is set, remove nonessential transitions and parallax. Never animate the poster artwork itself in a way that changes its content.

## 5. Background audio UX

- Use the approved locally served files at `/audio/comet.mp3` and `/audio/echo.mp3`.
- **Default state:** Silent before interaction. Clicking **Begin Your Journey** starts playback from that user gesture.
- Initial volume: **50%** of maximum through a smooth 1.5-second fade-in.
- Controls: compact play/pause, mute/unmute, next-track and a 0% to 100% volume slider on mobile and desktop.
- The audio element/provider persists across story, reflection, closing and revisit transitions so navigation never restarts the track.
- Play Comet, then Echo, then loop back to Comet.
- Mute is immediate and preserves the selected volume. Pause preserves playback position.
- Never restart automatically after the user pauses or mutes. Resuming requires an explicit Play action.
- Do **not** implement playback-speed or a prominent visible track-title control.
- Respect browser media restrictions and handle blocked or missing playback gracefully.
- Do not make audio essential for understanding content.
- Verify the track's commercial/organisational web-use licence and attribution conditions before publication.

## 6. Responsive and accessibility requirements

| Concern | Mobile | Desktop |
|---|---|---|
| Layout | Immersive viewport story | Centered framed viewer |
| Navigation | Swipe + buttons | Buttons + keyboard |
| Image | Fully contained | Fully contained |
| Zoom | Touch pinch/pan + controls | Zoom controls + pan |
| Reflection | 1–2 columns | 2 columns |
| Audio | Compact speaker/popover | Compact speaker/popover |

- Suggested breakpoint: 768px; adapt based on actual content and available height.
- Support mobile safe areas and dynamic viewport units (`dvh`) with sensible fallbacks.
- Ensure controls remain reachable on short screens and at increased browser zoom.
- Provide descriptive alt text, meaningful button labels, visible focus, logical tab order and accessible progress announcements.
- Do not rely on swipe, colour, hover, or sound alone.
- Test at common phone widths, tablet sizes and desktop resolutions; verify both orientations.

## 7. Suggested component responsibilities

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    journey/
      WelcomeScreen.tsx
      StoryViewer.tsx
      ReflectionScreen.tsx
      ClosingScreen.tsx
    layout/
    poster/
      PosterImage.tsx
      ImageZoom.tsx
    audio/
      AudioPlayer.tsx
      AudioControls.tsx
    ui/
  data/
    posters.ts
  hooks/
    useStoryNavigation.ts
    useAudioPlayer.ts
public/
  posters/
    01.png ... 07.png
  audio/
    comet.mp3
    echo.mp3
```

This is a **suggested architecture**, not an instruction to reorganise existing working Phase 1 code. In Next.js, `public/` belongs at the **project root**, not under `src/`. Prefer a single journey state (welcome/story/reflection/closing) and one persistent audio controller. Use static assets and client-side interactions; no backend is needed.

## 8. Acceptance criteria

- [x] All seven approved posters appear in the correct order, fully visible and unchanged.
- [x] Welcome CTA opens Poster 1.
- [x] Story viewer works with touch, buttons, keyboard and accessible progress segments.
- [x] No automatic slide changes.
- [x] Zoom supports reading detailed poster text and closes cleanly.
- [x] Reflection is optional, private and never sent to a server.
- [x] Closing offers revisit and share/copy-link actions.
- [x] Music starts from the Begin click, persists across stages and has functional pause/mute/next/volume controls.
- [x] Layout is usable on mobile, tablet and desktop without cropping or overlapping controls.
- [x] Reduced-motion and keyboard accessibility are supported.
- [x] TypeScript, lint (if configured), and production build checks pass.
- [ ] The final site is deployable to Vercel; confirm the chosen Vercel plan permits organisational use.

## 9. Integration with an already-started Phase 1

**Do not restart the project. Do not blindly overwrite completed Phase 1 work.**

1. Read this file **alongside** `README.md`, `project.md`, `architecture.md`, `design.md`, `experience.md`, and `codex-tasks.md`.
2. Inspect the current repository and identify which Phase 1 components and design tokens already exist.
3. Compare current implementation against this specification. Provide a short gap analysis: implemented, partially implemented, missing, conflicting.
4. Keep working components, existing dependencies, naming conventions and project structure unless a change is justified.
5. For any conflict, use the latest explicitly approved UX decisions in this file for presentation/interaction, while retaining established technical constraints from the architecture documents. Ask before destructive or major structural changes.
6. Propose the **smallest set of incremental edits** needed. Do not implement them until the user approves the gap analysis.
7. Continue with the next incomplete phase, test changes, and report outcomes.

### Codex prompt for integration

> I have already started Phase 1 of the OYC Close-Off microsite. I am adding `ui-ux.md` as the approved Adaptive Hybrid UI/UX specification. Read it alongside the six existing planning documents, then inspect the current repository. Do not recreate the Next.js project or overwrite working Phase 1 code. First provide a gap analysis and the smallest incremental change plan, identifying any conflicts or missing assets. Wait for my approval before editing. After approval, implement the next incomplete phase while preserving all seven original posters unchanged.
