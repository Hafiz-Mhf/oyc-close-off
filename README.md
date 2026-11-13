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
- Keep standalone logos out of the interface. The approved logos remain inside the supplied posters.
- Use no database, authentication, staff tracking, submissions, analytics, or server persistence.
- Keep music optional and user-controlled. Clicking **Begin Your Journey** starts the approved Comet/Echo playlist at 50% with a 1.5-second fade-in.
- Keep the application responsive, keyboard accessible, and reduced-motion friendly.
- Publish to GitHub and deploy to Vercel only after explicit approval.

## Current status

Phases 1–4 are complete: scaffold, welcome, seven-poster story, two-track audio, private reflection and closing/share flow. See `current-context.md` for verified status.
