"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PosterImage } from "@/components/poster/PosterImage";
import { PosterZoomDialog } from "@/components/poster/PosterZoomDialog";
import { Button } from "@/components/ui/Button";
import { copy } from "@/data/copy";
import { useStoryNavigation } from "@/hooks/useStoryNavigation";
import { StoryProgress } from "@/components/journey/StoryProgress";
import type { Language, Poster } from "@/types/journey";

interface StoryViewerProps {
  language: Language;
  posters: readonly Poster[];
  activeIndex: number;
  direction: -1 | 1;
  onBack: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSelectPoster: (index: number) => void;
}

const posterVariants = {
  enter: (direction: -1 | 1) => ({ opacity: 0, x: direction * 28 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: -1 | 1) => ({ opacity: 0, x: direction * -28 }),
};

export function StoryViewer({
  language,
  posters,
  activeIndex,
  direction,
  onBack,
  onPrevious,
  onNext,
  onSelectPoster,
}: StoryViewerProps) {
  const text = copy[language];
  const poster = posters[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === posters.length - 1;
  const reduceMotion = useReducedMotion();
  const [zoomOpen, setZoomOpen] = useState(false);
  const zoomTriggerRef = useRef<HTMLButtonElement>(null);
  const { dragOffsetX, isDragging, swipeHandlers } = useStoryNavigation({
    enabled: !zoomOpen,
    canGoPrevious: !isFirst,
    onPrevious,
    onNext,
  });

  useEffect(() => {
    [posters[activeIndex - 1], posters[activeIndex + 1]].forEach((nearbyPoster) => {
      if (nearbyPoster) {
        const image = new window.Image();
        image.src = nearbyPoster.src;
      }
    });
  }, [activeIndex, posters]);

  const closeZoom = () => {
    setZoomOpen(false);
    window.requestAnimationFrame(() => zoomTriggerRef.current?.focus());
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col px-3 pb-3 tablet:px-6 tablet:pt-1.5 tablet:pb-3">
      <div className="tablet:mx-auto tablet:grid tablet:w-full tablet:max-w-3xl tablet:grid-cols-[auto_1fr_auto] tablet:items-center tablet:gap-4">
        <div className="flex items-center justify-between gap-3 tablet:contents">
          <Button variant="quiet" size="sm" onClick={onBack} className="tablet:col-start-1 tablet:row-start-1">
            {text.back}
          </Button>
          <p
            className="font-mono text-sm font-semibold tracking-[0.08em] text-white tablet:col-start-3 tablet:row-start-1"
            aria-hidden="true"
          >
            {String(activeIndex + 1).padStart(2, "0")} / {String(posters.length).padStart(2, "0")}
          </p>
        </div>

        <div className="tablet:col-start-2 tablet:row-start-1">
          <StoryProgress language={language} posters={posters} activeIndex={activeIndex} onSelect={onSelectPoster} />
        </div>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {text.showingPoster} {activeIndex + 1} {text.of} {posters.length}: {poster.title}
      </p>

      <div className="flex min-h-0 flex-1 flex-col tablet:mt-1 tablet:grid tablet:grid-cols-[1fr_minmax(0,38rem)_1fr] tablet:grid-rows-[minmax(0,1fr)_auto] tablet:items-center tablet:gap-x-4 tablet:gap-y-2">
        <div
          className="relative flex min-h-0 flex-1 touch-pan-y select-none items-center justify-center overflow-hidden bg-black/20 p-2 tablet:col-start-2 tablet:row-start-1 tablet:h-full tablet:w-full tablet:overflow-visible tablet:bg-transparent tablet:p-1"
          aria-label={text.viewerLabel}
          {...swipeHandlers}
        >
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={poster.src}
              custom={direction}
              variants={posterVariants}
              initial={reduceMotion ? false : "enter"}
              animate="center"
              exit={reduceMotion ? { opacity: 1 } : "exit"}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
              className="flex h-full min-h-0 w-full items-center justify-center"
            >
              <div
                className="flex h-full min-h-0 w-full items-center justify-center"
                style={
                  reduceMotion || dragOffsetX === 0
                    ? undefined
                    : {
                        transform: `translate3d(${dragOffsetX}px, 0, 0)`,
                        transition: isDragging ? "none" : "transform 180ms ease-out",
                      }
                }
              >
                <PosterImage language={language} poster={poster} priority={activeIndex === 0} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-2.5 flex flex-col gap-2 tablet:contents">
          <div className="flex items-center justify-between gap-2 tablet:contents">
            <Button
              variant="secondary"
              size="icon"
              shape="pill"
              onClick={onPrevious}
              disabled={isFirst}
              aria-label={`${text.previous} ${text.poster.toLowerCase()}`}
              title={text.previous}
              className="shrink-0 tablet:col-start-1 tablet:row-start-1 tablet:justify-self-end tablet:w-auto tablet:px-4"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="hidden tablet:inline">{text.previous}</span>
            </Button>

            <div className="flex min-w-0 flex-1 flex-col items-center tablet:col-start-2 tablet:row-start-2 tablet:justify-self-center">
              <Button
                ref={zoomTriggerRef}
                variant="surface"
                size="sm"
                shape="pill"
                onClick={() => setZoomOpen(true)}
                aria-haspopup="dialog"
                className="max-w-full"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
                </svg>
                <span className="truncate">{text.zoom}</span>
              </Button>
            </div>

            {!isLast ? (
              <Button
                variant="secondary"
                size="icon"
                shape="pill"
                onClick={onNext}
                aria-label={`${text.next} ${text.poster.toLowerCase()}`}
                title={text.next}
                className="shrink-0 border-oyc-cyan/50 text-oyc-cyan tablet:col-start-3 tablet:row-start-1 tablet:justify-self-start tablet:w-auto tablet:px-4"
              >
                <span className="hidden tablet:inline">{text.next}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            ) : (
              <span className="w-11 shrink-0 tablet:hidden" aria-hidden="true" />
            )}
          </div>

          {!isLast ? (
            <p
              className="flex items-center justify-center gap-1.5 text-[0.7rem] font-medium tracking-[0.06em] text-oyc-text-muted/75 tablet:hidden"
              aria-hidden="true"
            >
              <motion.span
                animate={reduceMotion ? undefined : { x: [0, -3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex text-oyc-cyan/80"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </motion.span>
              <span>{text.swipe}</span>
              <motion.span
                animate={reduceMotion ? undefined : { x: [0, 3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex text-oyc-cyan/80"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </motion.span>
            </p>
          ) : (
            <div className="flex justify-center tablet:col-start-3 tablet:row-start-1 tablet:justify-self-start">
              <Button
                fullWidth
                shape="pill"
                onClick={onNext}
                className="group tablet:w-auto tablet:px-4 laptop:px-5"
              >
                <span>{text.continueReflection}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Button>
            </div>
          )}
        </div>
      </div>
      {zoomOpen && <PosterZoomDialog language={language} poster={poster} onClose={closeZoom} />}
    </div>
  );
}
