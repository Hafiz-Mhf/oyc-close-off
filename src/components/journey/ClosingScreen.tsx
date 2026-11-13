"use client";

import { useEffect, useRef, useState } from "react";
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
  const [linkCopied, setLinkCopied] = useState(false);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) window.clearTimeout(copyTimerRef.current);
    };
  }, []);

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
    if (copied) {
      setLinkCopied(true);
      if (copyTimerRef.current !== null) window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setLinkCopied(false), 2500);
    }
    setShareStatus(copied ? "Microsite link copied." : "Could not copy the link. Copy it from your address bar.");
  };

  return (
    <div className="flex flex-1 items-center justify-center px-5 py-8 text-center tablet:px-12 tablet:py-16">
      <div className="mx-auto w-full min-w-0 max-w-3xl">
        <p className="text-sm font-bold tracking-[0.18em] text-oyc-cyan uppercase">Keep growing</p>
        <h1 className="mt-4 text-balance text-3xl leading-[1.08] font-black tracking-[-0.04em] phone:text-4xl tablet:text-6xl">
          The Campaign Ends. Your Journey Continues.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-oyc-text-muted tablet:mt-6 tablet:text-xl">
          Keep exploring your strengths, growing your skills and taking ownership of your career.
        </p>

        <div className="mx-auto mt-6 min-h-28 max-w-2xl tablet:mt-7" aria-live="polite">
          <div className="rounded-2xl border border-oyc-border bg-white/5 p-5 tablet:p-6">
            <p className="text-xs font-bold tracking-[0.14em] text-oyc-cyan uppercase">
              {selectedOption ? "Your private takeaway" : "Keep moving forward"}
            </p>
            <p className="mt-2 text-sm leading-6 text-oyc-text tablet:text-base">
              {selectedOption?.takeaway ?? "Your next move starts with you. Take one small step when you're ready."}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-6 flex max-w-md flex-col gap-3 tablet:mt-7 tablet:max-w-xl tablet:flex-row tablet:justify-center">
          <Button fullWidth onClick={onRevisit} className="tablet:w-auto tablet:min-w-48">
            Revisit the Journey
          </Button>
          <Button
            fullWidth
            variant={linkCopied ? "surface" : "secondary"}
            onClick={shareJourney}
            className="tablet:w-auto tablet:min-w-48"
          >
            {linkCopied ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>Link Copied</span>
              </>
            ) : (
              <span>Share with a Colleague</span>
            )}
          </Button>
        </div>
        <p className="mt-4 min-h-6 text-sm text-oyc-text-muted" role="status" aria-live="polite">
          {shareStatus}
        </p>
      </div>
    </div>
  );
}
