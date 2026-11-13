# OYC: The Journey Continues

Interactive close-off microsite for MRANTI's Own Your Career campaign. The application uses Next.js App Router, TypeScript, Tailwind CSS, and Motion.

## Development

```powershell
npm.cmd install
npm.cmd run dev
```

Quality checks:

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
```

## Project documents

Read these files before changing scope or implementation:

1. `docs/project.md` — objectives, scope, content, acceptance criteria.
2. `docs/experience.md` — screens, user journeys, interaction and reflection.
3. `docs/design.md` — visual system, responsive behaviour, accessibility and motion.
4. `docs/ui-ux.md` — approved Adaptive Hybrid presentation and interaction details.
5. `docs/architecture.md` — Next.js implementation, assets, audio, deployment and testing.
6. `docs/codex-tasks.md` — staged implementation checklist and definition of done.
7. `current-context.md` — current phase, decisions, verification, blockers, and next step.

## Non-negotiable constraints
- Preserve all seven approved original OYC posters unchanged. Never recreate, crop, edit, rewrite, or replace them.
- Use the approved official OYC logo only in the global header and the approved square emblem for browser icons. Never redraw either asset.
- Use no database, authentication, staff tracking, submissions, analytics, or server persistence.
- Keep music optional and user-controlled. Clicking **Begin Your Journey** starts the approved Comet/Echo playlist at 50% with a 1.5-second fade-in.
- Keep the application responsive, keyboard accessible, and reduced-motion friendly.
- Keep GitHub publication and Vercel deployment changes subject to explicit approval.

## Current status

Phases 1–7 are complete. The approved deployment is live at [oyc-close-off.vercel.app](https://oyc-close-off.vercel.app). See `current-context.md` for the full verification record.
