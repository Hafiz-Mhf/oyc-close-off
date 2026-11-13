"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { reflectionOptions } from "@/data/reflections";
import type { ReflectionChoice } from "@/types/journey";

interface ClosingScreenProps {
  selected: ReflectionChoice | null;
  onRevisit: () => void;
}

export function ClosingScreen({ selected, onRevisit }: ClosingScreenProps) {
  const selectedOption = reflectionOptions.find((option) => option.id === selected);
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  const copyShareUrl = async (shareUrl: string) => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      return true;
    } catch {
      const input = document.createElement("textarea");
      input.value = shareUrl;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(input);
      return copied;
    }
  };

  const shareJourney = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}`;
    setShareStatus(null);

    if (navigator.share) {
      try {
        await navigator.share({ url: shareUrl });
        setShareStatus("Share options opened.");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    const copied = await copyShareUrl(shareUrl);
    setShareStatus(copied ? "Microsite link copied." : "Could not copy the link. Copy it from your address bar.");
  };

  return (
    <div className="flex flex-1 items-center justify-center px-5 py-10 text-center tablet:px-12 tablet:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold tracking-[0.18em] text-oyc-cyan uppercase">Keep growing</p>
        <h1 className="mt-4 text-balance text-4xl leading-[1.05] font-black tracking-[-0.04em] tablet:text-6xl">
          The Campaign Ends. Your Journey Continues.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-oyc-text-muted tablet:text-xl">
          Keep exploring your strengths, growing your skills and taking ownership of your career.
        </p>

        <div className="mx-auto mt-7 min-h-28 max-w-2xl" aria-live="polite">
          <div className="rounded-2xl border border-oyc-border bg-white/5 p-5 tablet:p-6">
            <p className="text-xs font-bold tracking-[0.14em] text-oyc-cyan uppercase">
              {selectedOption ? "Your private takeaway" : "Keep moving forward"}
            </p>
            <p className="mt-2 text-sm leading-6 text-oyc-text tablet:text-base">
              {selectedOption?.takeaway ?? "Your next move starts with you. Take one small step when you're ready."}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-7 flex max-w-xl flex-col gap-3 phone:flex-row phone:justify-center">
          <Button onClick={onRevisit} className="phone:min-w-48">
            Revisit the Journey
          </Button>
          <Button variant="secondary" onClick={shareJourney} className="phone:min-w-48">
            Share with a Colleague
          </Button>
        </div>
        <p className="mt-4 min-h-6 text-sm text-oyc-text-muted" role="status" aria-live="polite">
          {shareStatus}
        </p>
      </div>
    </div>
  );
}
