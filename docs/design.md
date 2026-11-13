# Design System and Responsive UI

## 1. Direction
**Adaptive Hybrid**: immersive full-height story viewer on phones; framed presentation on desktops. A short guided intro and ending surround the seven unchanged posters.

## 2. Visual identity
- Use existing approved OYC Close-Off palette and visual motifs, visually matched to the final supplied posters.
- Use these canonical website-chrome primitives:

| Primitive token | Value | Purpose |
|---|---|---|
| `navy-950` | `#030D28` | Deep page background |
| `navy-900` | `#061943` | Main background |
| `navy-800` | `#0A2353` | Raised surfaces |
| `cyan-400` | `#00E5ED` | Primary CTA, progress and focus emphasis |
| `cyan-300` | `#76F7FB` | Hover and focus support |
| `mranti-blue` | `#0000FF` | Secondary MRANTI brand accent and restrained ambient detail |
| `blue-600` | `#31518A` | Muted borders |
| `purple-500` | `#8D49FF` | Ambient gradients only |
| `text-primary` | `#F7FBFF` | Primary text |
| `text-secondary` | `#D5E4F7` | Supporting text |

- Semantic tokens must reference these primitives: `background`, `surface`, `primary`, `border`, `text-primary` and `text-secondary`.
- Component tokens for buttons, progress, focus rings and panels must reference semantic tokens instead of introducing new raw hex values.
- Keep `#00E5ED` as the primary interactive colour. Do not use `#0000FF` for primary controls on navy because contrast is insufficient; reserve it for secondary brand accents or use it against a sufficiently contrasting background.
- Glowing cyan/purple ribbon/wave decoration may appear in the page background, **not over or inside the original poster images**.
- Use a clean accessible sans-serif (e.g. Inter or an approved corporate font); do not attempt to re-typeset poster text.
- Display the supplied official OYC logo in the global header as a home link. Never redraw or approximate it.

## 3. Screens
### Welcome
- Full-viewport dark navy background, restrained wave/ribbon treatment.
- The global header uses the supplied official OYC logo and returns to the welcome screen without interrupting audio.
- Title: **“4 Weeks. One Journey. Endless Possibilities.”**
- Support line: **“Your journey doesn't end here.”**
- Primary CTA: **Begin Your Journey**.
- **Begin Your Journey** starts optional music at 50% with a 1.5-second fade-in. Do not add a separate enable step.

### Story viewer
- Seven-part progress bar, poster count and compact play/pause, mute and volume controls.
- Centered poster shown entirely at native aspect ratio.
- Next/Previous controls visible and keyboard accessible.
- **Zoom** control for small text.
- Mobile: near-full-height poster with header/footer controls; desktop: centered framed poster with balanced side margins.
- Preserve poster visual fidelity; no text or decorative overlays across image content.

### Reflection
- One prompt, four large tappable choice cards, clear Skip option.
- Choice state indicated by more than colour (icon/border/text).
- Private-use explanation: “Your choice is not submitted or stored.”

### Closing
- Campaign-end title, optional selected takeaway, concise supportive copy.
- **Revisit the Journey** and **Share with a Colleague** actions.
- Soft final wave/fade animation, with reduced-motion alternative.

## 4. Motion specification
- Welcome: gentle fade/translate, about 500–700 ms.
- Slide transition: horizontal movement + opacity, about 250–350 ms.
- Progress indicator: 150–250 ms colour transition.
- Reflection card: 200 ms border/glow transition.
- Closing: gentle fade-in, about 500–700 ms.
- Never animate a poster automatically away; no forced timer.
- Honour `prefers-reduced-motion: reduce`.

## 5. Accessibility
- Target WCAG 2.2 AA for controls and surrounding UI where feasible.
- Visible focus states; keyboard-operable navigation, audio, zoom and reflection.
- Minimum comfortable tap targets around 44×44 CSS px.
- Descriptive alt text per poster; where poster content is essential, provide accessible text equivalents or a transcript separate from the unmodified images.
- Strong text/background contrast, no information conveyed by colour alone.
- Announce slide number and heading appropriately without overly verbose live announcements.
- Respect zoom, screen readers and system font scaling.
- Avoid blocking page scrolling with aggressive swipe handlers; support touch and pointer devices.

## 6. Responsive behaviour
- Phone portrait: immersive, viewport-aware layout (`100dvh` with fallback), poster contained, safe-area insets respected.
- Phone landscape: allow scroll and preserve navigation rather than squeezing text.
- Tablet: centered poster with moderate margins.
- Desktop: framed viewer with keyboard arrows and optional zoom.
- Test at ~320, 375, 390, 768, 1024 and 1440 CSS px widths.

## 7. Copy review
- Welcome, closing and reflection copy recorded in the approved planning documents is approved for implementation.
- Keep tone concise, warm and corporate-professional.
- Do not alter existing poster copy, especially the closing instruction about speaking with one's immediate supervisor.
