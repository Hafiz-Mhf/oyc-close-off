import type { ReactNode } from "react";

interface JourneyShellProps {
  children: ReactNode;
  screenLabel: string;
  audioControls?: ReactNode;
  constrained?: boolean;
}

export function JourneyShell({ children, screenLabel, audioControls, constrained = false }: JourneyShellProps) {
  return (
    <main className="safe-area-shell relative isolate overflow-hidden">
      <div
        className="pointer-events-none absolute -top-32 -right-44 -z-10 h-96 w-96 rounded-full border-[3rem] border-oyc-cyan/10 blur-sm tablet:h-[32rem] tablet:w-[32rem]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-48 -left-36 -z-10 h-96 w-96 rounded-full border-[3rem] border-oyc-purple/10 blur-sm tablet:h-[34rem] tablet:w-[34rem]"
        aria-hidden="true"
      />
      <div className={`mx-auto flex w-full max-w-[90rem] flex-col ${
        constrained
          ? "h-[calc(100dvh-1.5rem)] tablet:h-[calc(100dvh-3rem)]"
          : "min-h-[calc(100dvh-1.5rem)] tablet:min-h-[calc(100dvh-3rem)]"
      }`}>
        <header className="flex min-h-11 items-start justify-between gap-2 px-1 pb-3 tablet:gap-4 tablet:px-3 tablet:pb-5">
          <p className="text-xs font-bold tracking-[0.16em] text-oyc-cyan uppercase">
            OYC Close-Off
          </p>
          <div className="flex min-w-0 items-center gap-3">
            {audioControls}
            <p className="hidden text-xs text-oyc-text-muted tablet:block">{screenLabel}</p>
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}
