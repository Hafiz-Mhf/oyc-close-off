import type { ReactNode } from "react";

interface ScreenPanelProps {
  children: ReactNode;
  className?: string;
  immersive?: boolean;
}

export function ScreenPanel({ children, className = "", immersive = false }: ScreenPanelProps) {
  return (
    <section
      className={`relative flex min-h-0 flex-1 flex-col overflow-hidden border border-white/10 bg-oyc-navy/82 shadow-2xl backdrop-blur-xl ${
        immersive
          ? "-mx-3 rounded-none border-x-0 tablet:mx-0 tablet:rounded-[2rem] tablet:border-x"
          : "rounded-[1.75rem] tablet:rounded-[2rem]"
      } ${className}`}
    >
      {children}
    </section>
  );
}
