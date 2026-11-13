# Technical Architecture and Deployment

## 1. Stack
- Next.js (App Router), TypeScript, React.
- Tailwind CSS for styling.
- Motion (Framer Motion successor) for restrained screen and poster transitions; CSS transitions remain suitable for simple control states.
- Browser-native `<audio>`/HTMLAudioElement for soundtrack.
- GitHub repository with Vercel Git integration for deployment.
- Static assets in `/public`.
- **No Supabase, database, server API, auth provider, analytics SDK or CMS** for MVP.

## 2. Suggested structure
```text
oyc-closeoff/
├── public/
│   ├── posters/
│   │   ├── 01.png
│   │   ├── 02.png
│   │   ├── 03.png
│   │   ├── 04.png
│   │   ├── 05.png
│   │   ├── 06.png
│   │   └── 07.png
│   └── audio/
│       ├── comet.mp3
│       └── echo.mp3
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── WelcomeScreen.tsx
│   │   ├── StoryViewer.tsx
│   │   ├── PosterLightbox.tsx
│   │   ├── AudioControls.tsx
│   │   ├── ReflectionScreen.tsx
│   │   └── ClosingScreen.tsx
│   ├── data/
│   │   └── posters.ts
│   ├── hooks/
│   │   └── useBackgroundAudio.ts
│   └── types/
│       └── journey.ts
├── README.md
└── package.json
```
Asset extensions and paths are illustrative: adapt to the actual supplied files, without re-encoding or altering originals without approval.

## 3. State management
- Top-level client-side journey state: `welcome | story | reflection | closing`.
- Story index: integer `0..6`.
- Reflection selection: optional enum `strength | conversation | learning | action | null`.
- Audio state: current track index, `playing`, `muted`, `volume`, user-pause intent, start-attempt state, fade state and error state.
- Mount one persistent audio element above individual screens so transitions do not restart playback.
- Keep reflection only in memory; do not persist or transmit.

## 4. Audio implementation details
- Host the approved files at `public/audio/comet.mp3` and `public/audio/echo.mp3`.
- Use `preload="none"` to avoid transferring audio before interaction.
- Call `audio.play()` from the **Begin Your Journey** click handler; handle rejected promises without blocking the journey.
- Start Comet at 50% effective volume through a cancellable 1.5-second fade-in. Advance to Echo when Comet ends, then return to Comet after Echo.
- Provide an explicit next-track control. Skipping while paused changes the selected track without restarting playback.
- Preserve one audio element across all screens so poster and journey navigation never restarts the track.
- Preserve the volume setting while muted. A user pause or mute must never trigger automatic playback later.
- Volume controls affect amplitude, not playback speed. Do not change `playbackRate` in MVP.
- Preserve playback across story, reflection, closing and revisit transitions.
- Respect browser audio focus and page lifecycle behaviour; do not assume playback succeeds on every browser.

## 5. Image implementation
- Load exact original poster files; use a typed metadata array for ordered src, alt text and accessible transcript link.
- `object-fit: contain`, no `cover` for the posters.
- Avoid image compression or automatic transformations that visibly change the artwork; choose rendering settings that maintain fidelity.
- Add zoom/lightbox for reading small type. If source images are too low-resolution, request originals rather than inventing sharper versions.
- Optimize page performance with lazy loading of distant slides and preloading adjacent images.

## 6. Security and privacy
- Static content only; no credentials or API keys needed.
- Public link is accessible to anyone who has it; don't describe it as secured internal-only access.
- No collection or storage of reflection answers, employee identities or usage analytics.
- No unnecessary third-party scripts, trackers or embeds.
- Set sensible security headers where feasible; keep dependencies updated.
- Music and images must be cleared for publication and redistribution on a publicly reachable URL.

## 7. Deployment
1. Create Next.js TypeScript project and install Tailwind; add Motion if needed.
2. Add supplied poster assets to `/public/posters`; do not expose standalone logos because branding remains inside the posters.
3. Add `public/audio/comet.mp3` and `public/audio/echo.mp3` with their attribution/licence records.
4. Implement, test locally, and push to GitHub.
5. Import GitHub repository into Vercel; use default Next.js framework settings.
6. Review Vercel account plan and **organisation/commercial-use eligibility** before launch; do not assume a free personal plan is appropriate for MRANTI corporate use.
7. Test production preview on mobile and desktop, then share approved production URL through HR channels.
8. Optional: custom domain later; not required for MVP.

## 8. Test matrix
- Phone: iOS Safari, Android Chrome; swipe, Begin-triggered audio, volume/mute, image zoom, safe-area and small text.
- Desktop: Chrome, Edge, Firefox, Safari where available; mouse and keyboard navigation.
- Accessibility: keyboard-only, focus restoration after lightbox, screen reader labels, reduced-motion, zoom up to 200%.
- Functional: first/last poster bounds; reflection skip; restart; share fallback; missing audio/image; offline/slow connection.
- Performance: avoid layout shifts, large animation bundles and downloading all full-resolution posters immediately.

## 9. No backend needed
Audio is a static file served from Vercel. Controls run in the browser. Reflection is client-only. A database becomes relevant only if a later, explicitly approved version adds saved staff responses, analytics, CMS content or authenticated access.
