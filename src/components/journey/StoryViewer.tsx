"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PosterImage } from "@/components/poster/PosterImage";
import { PosterZoomDialog } from "@/components/poster/PosterZoomDialog";
import { Button } from "@/components/ui/Button";
import { posters } from "@/data/posters";
import { useStoryNavigation } from "@/hooks/useStoryNavigation";
import { StoryProgress } from "@/components/journey/StoryProgress";

interface StoryViewerProps {
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
  activeIndex,
  direction,
  onBack,
  onPrevious,
  onNext,
  onSelectPoster,
}: StoryViewerProps) {
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
  }, [activeIndex]);

  const closeZoom = () => {
    setZoomOpen(false);
    window.requestAnimationFrame(() => zoomTriggerRef.current?.focus());
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col px-3 pb-3 tablet:px-6 tablet:pt-1 tablet:pb-3">
      <div className="tablet:mx-auto tablet:w-full tablet:max-w-xl">
        <div className="flex items-center justify-between gap-3">
          <Button variant="quiet" size="sm" onClick={onBack}>Back</Button>
          <p className="font-mono text-sm font-semibold tracking-[0.08em] text-white" aria-hidden="true">
            {String(activeIndex + 1).padStart(2, "0")} / {String(posters.length).padStart(2, "0")}
          </p>
        </div>

        <StoryProgress activeIndex={activeIndex} onSelect={onSelectPoster} />
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Showing poster {activeIndex + 1} of {posters.length}: {poster.title}
      </p>

      <div className="flex min-h-0 flex-1 flex-col tablet:mt-1 tablet:grid tablet:grid-cols-[1fr_minmax(0,30rem)_1fr] tablet:grid-rows-[minmax(0,1fr)_auto] tablet:items-center tablet:gap-x-4 tablet:gap-y-2">
        <div
          className="relative flex min-h-0 flex-1 touch-pan-y select-none items-center justify-center overflow-hidden bg-black/20 p-2 tablet:col-start-2 tablet:row-start-1 tablet:h-full tablet:w-full tablet:bg-transparent tablet:p-1"
          aria-label="Poster viewer. Swipe horizontally or use the navigation controls."
          {...swipeHandlers}
        >
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={poster.id}
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
                <PosterImage poster={poster} priority={activeIndex === 0} />
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
              aria-label="Previous poster"
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
              <span className="hidden tablet:inline">Previous</span>
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
                <span className="truncate">Zoom or read poster text</span>
              </Button>
            </div>

            {!isLast ? (
              <Button
                variant="secondary"
                size="icon"
                shape="pill"
                onClick={onNext}
                aria-label="Next poster"
                className="shrink-0 border-oyc-cyan/50 text-oyc-cyan tablet:col-start-3 tablet:row-start-1 tablet:justify-self-start tablet:w-auto tablet:px-4"
              >
                <span className="hidden tablet:inline">Next</span>
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
              <span>Swipe poster left or right</span>
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
                <span>Continue to Reflection</span>
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
      {zoomOpen && <PosterZoomDialog poster={poster} onClose={closeZoom} />}
    </div>
  );
}
