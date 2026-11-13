# Experience and Interaction Specification

## 1. Journey states
`welcome` → `story (index 0..6)` → `reflection` → `closing`.
- Welcome has a primary **Begin Your Journey** button.
- Story viewer opens on slide 1.
- After slide 7, **Continue to Reflection** opens reflection; do not silently skip to closing.
- Reflection may be completed or skipped. **Continue** / **Skip for now** both open closing.
- Closing offers **Revisit the Journey** (go to slide 1) and **Share with a Colleague** (native share when available, else copy URL).
- **Revisit the Journey** retains the reflection choice and audio settings.
- Provide a clearly labelled back/exit action. Back from Poster 1 returns to Welcome without resetting audio unexpectedly.

## 2. Story navigation
- On touch: swipe left for next, right for previous; provide visible buttons as alternatives.
- On desktop: next/previous buttons and Left/Right arrow keys when story is active and focus is not in another interactive control.
- On mobile, optional left/right edge taps may be supported, but must not conflict with zoom, gestures, or controls.
- Show seven accessible progress segments; active/completed state updates only on user navigation, not on a timer.
- First slide: Previous is disabled; a separate Back control returns to Welcome.
- Seventh slide: Next CTA changes to **Continue to Reflection**.
- Do not auto-advance, autoplay or hide images after a timeout.
- Preload the next adjacent image when reasonable; avoid downloading all full-size files unnecessarily on slow connections.

## 3. Poster viewing and zoom
- Default rendering: `object-fit: contain`, preserving each poster's original ratio and showing all content.
- Portrait poster should fit within viewport height on mobile; allow scrolling/zoom to read small text.
- Zoom control opens a dedicated dialog/lightbox with image pan and zoom controls; support pinch-to-zoom plus explicit zoom in, zoom out and reset controls.
- Provide close button and Escape to close; restore focus to trigger on close.
- Never overlay navigation on important poster text. Place controls in a safe region outside the image or in a dedicated header/footer.

## 4. Reflection (optional and private)
Prompt: **What's one small step you'd like to take next?**

Options and corresponding closing takeaway:
1. **Discover my strengths** – “Start by recognising the strengths you already bring to your work.”
2. **Have a career chat** – “A meaningful career conversation with your immediate supervisor can help you see your next step more clearly.”
3. **Learn something new** – “Small learning steps today can open up new possibilities tomorrow.”
4. **Take my next step** – “You don't need to have everything figured out. Start with one achievable action.”

- Selection is single-choice, voluntary, changeable and held only in React memory for the current session.
- No API request, local storage, cookies, telemetry or submission of the choice.
- No choice required; if skipped, show a generic closing message.
- Optionally offer **Copy My Takeaway**, using Clipboard API with a fallback or clear error feedback.
- No claims of assessment, scoring, completion, or personal profiling.

## 5. Closing
- Proposed title: **The Campaign Ends. Your Journey Continues.**
- Show selected takeaway or generic encouragement.
- Offer **Revisit the Journey** and **Share with a Colleague**.
- Use Web Share API when supported; otherwise copy URL and show success/error feedback.
- Do not send a staff member's reflection in the shared URL.

## 6. Audio interaction
- Audio is silent before interaction. Clicking **Begin Your Journey** starts `/audio/comet.mp3` from that user gesture.
- Start at 50% volume through a smooth 1.5-second fade-in.
- Keep one persistent audio element across story, reflection, closing and revisit transitions. Navigation must not restart the track.
- Play Comet, then Echo, then repeat the two-track playlist.
- Provide compact play/pause, mute/unmute, next-track and 0% to 100% volume controls on mobile and desktop.
- Muting preserves the selected volume and playback position. Pausing preserves the position.
- Never restart playback automatically after the user pauses or mutes it. Only another explicit Play action may resume it.
- If playback is blocked or the file is missing, display a helpful message and keep the visual journey fully usable.
- No playback-speed control, separate enable step or visible track-title control is required.
- Avoid sound effects, lyrics and audio that distracts from reading.

## 7. Failure/edge cases
- Missing image: show a non-blocking error with retry and safe navigation.
- Missing audio: all visual features continue; disable audio controls or show music unavailable.
- Reduced-motion preference: disable large transitions and nonessential wave animation.
- Small screen/landscape: keep image readable, controls reachable, no forced cropping.
- Network interruption: don't lose current slide; show fallback for unloaded assets.
- Shared link opened in a browser that disallows clipboard: use native share or provide selectable URL.
