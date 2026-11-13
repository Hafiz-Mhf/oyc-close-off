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
  const swipeHandlers = useStoryNavigation({
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
    <div className="flex min-h-0 flex-1 flex-col px-3 pb-3 tablet:px-6 tablet:pb-6">
      <div className="flex items-center justify-between gap-3">
        <Button variant="quiet" onClick={onBack} className="px-3">Back</Button>
        <p className="font-mono text-sm font-semibold tracking-[0.08em] text-white" aria-hidden="true">
          {String(activeIndex + 1).padStart(2, "0")} / {String(posters.length).padStart(2, "0")}
        </p>
      </div>

      <StoryProgress activeIndex={activeIndex} onSelect={onSelectPoster} />

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Showing poster {activeIndex + 1} of {posters.length}: {poster.title}
      </p>

      <div
        className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center overflow-hidden bg-black/20 p-2 tablet:mx-auto tablet:w-full tablet:max-w-5xl tablet:rounded-2xl tablet:border tablet:border-white/10 tablet:p-4"
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
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
            className="flex h-full min-h-0 w-full items-center justify-center"
          >
            <PosterImage poster={poster} priority={activeIndex === 0} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-2 flex justify-center">
        <Button ref={zoomTriggerRef} variant="quiet" onClick={() => setZoomOpen(true)} className="px-4" aria-haspopup="dialog">
          Zoom or read poster text
        </Button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 tablet:mx-auto tablet:w-full tablet:max-w-5xl">
        <Button variant="secondary" onClick={onPrevious} disabled={isFirst}>Previous</Button>
        <Button onClick={onNext}>{isLast ? "Continue to Reflection" : "Next"}</Button>
      </div>
      {zoomOpen && <PosterZoomDialog poster={poster} onClose={closeZoom} />}
    </div>
  );
}
