"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="safe-area-shell grid place-items-center p-5">
      <section className="w-full max-w-xl rounded-[1.75rem] border border-white/10 bg-oyc-navy/90 p-8 text-center shadow-2xl">
        <p className="text-sm font-bold tracking-[0.16em] text-oyc-cyan uppercase">Journey interrupted</p>
        <h1 className="mt-3 text-3xl font-black">This screen could not load.</h1>
        <p className="mt-3 text-oyc-text-muted">Your reflection remains on this device only.</p>
        <Button onClick={reset} className="mt-6">
          Try again
        </Button>
      </section>
    </main>
  );
}
