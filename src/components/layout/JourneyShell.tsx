import Image from "next/image";
import type { ReactNode } from "react";

interface JourneyShellProps {
  children: ReactNode;
  screenLabel: string;
  audioControls?: ReactNode;
  constrained?: boolean;
  onHome: () => void;
}

export function JourneyShell({ children, screenLabel, audioControls, constrained = false, onHome }: JourneyShellProps) {
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
        <header className="flex min-h-14 items-start justify-between gap-3 px-1 pb-3 tablet:items-center tablet:px-3 tablet:pb-5">
          <button
            type="button"
            onClick={onHome}
            className="group inline-flex min-h-11 shrink-0 cursor-pointer items-center rounded-xl px-1 transition-colors hover:bg-white/5"
            aria-label="OYC Close-Off home"
          >
            <Image
              src="/oyc-logo.png"
              alt="Own Your Career"
              width={156}
              height={56}
              priority
              className="h-auto w-[6.75rem] transition-transform duration-200 group-hover:scale-[1.03] tablet:w-[8.25rem]"
            />
          </button>
          <div className="flex min-w-0 items-center gap-3">
            {audioControls}
            <p className="sr-only">{screenLabel}</p>
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}
