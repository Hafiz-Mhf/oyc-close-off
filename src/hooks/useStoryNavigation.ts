"use client";

import { useEffect, useRef, type PointerEventHandler } from "react";

interface UseStoryNavigationOptions {
  canGoPrevious: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

interface PointerPosition {
  pointerId: number;
  x: number;
  y: number;
}

const SWIPE_THRESHOLD = 48;
const HORIZONTAL_BIAS = 1.25;

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(
    target.closest("button, a, input, select, textarea, [contenteditable='true']"),
  );
}

export function useStoryNavigation({
  canGoPrevious,
  onPrevious,
  onNext,
}: UseStoryNavigationOptions) {
  const pointerStart = useRef<PointerPosition | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (isInteractiveTarget(event.target)) return;

      if (event.key === "ArrowLeft" && canGoPrevious) {
        event.preventDefault();
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canGoPrevious, onNext, onPrevious]);

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!event.isPrimary || isInteractiveTarget(event.target)) return;

    pointerStart.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  };

  const onPointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
    const start = pointerStart.current;
    pointerStart.current = null;

    if (!start || start.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY) * HORIZONTAL_BIAS) return;

    if (deltaX < 0) onNext();
    else if (canGoPrevious) onPrevious();
  };

  const onPointerCancel: PointerEventHandler<HTMLDivElement> = () => {
    pointerStart.current = null;
  };

  return { onPointerDown, onPointerUp, onPointerCancel };
}
