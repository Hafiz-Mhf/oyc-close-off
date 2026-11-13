"use client";

import { useEffect, useRef, useState, type PointerEventHandler } from "react";

interface UseStoryNavigationOptions {
  enabled?: boolean;
  canGoPrevious: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

interface PointerPosition {
  pointerId: number;
  x: number;
  y: number;
  axis: "x" | "y" | null;
}

const SWIPE_THRESHOLD = 44;
const AXIS_LOCK_DISTANCE = 8;
const HORIZONTAL_BIAS = 1.2;
const MAX_DRAG_OFFSET = 140;

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(
    target.closest("button, a, input, select, textarea, [contenteditable='true']"),
  );
}

function shouldIgnoreKeyNavigation(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(
    target.closest("input, select, textarea, dialog, [contenteditable='true'], [aria-label='Background music controls']"),
  );
}

export function useStoryNavigation({
  enabled = true,
  canGoPrevious,
  onPrevious,
  onNext,
}: UseStoryNavigationOptions) {
  const pointerStart = useRef<PointerPosition | null>(null);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (shouldIgnoreKeyNavigation(event.target)) return;

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
  }, [canGoPrevious, enabled, onNext, onPrevious]);

  const resetDrag = () => {
    pointerStart.current = null;
    setDragOffsetX(0);
    setIsDragging(false);
  };

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!enabled || !event.isPrimary || event.pointerType === "mouse" || isInteractiveTarget(event.target)) return;

    pointerStart.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      axis: null,
    };
  };

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    const start = pointerStart.current;
    if (!enabled || !start || start.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;

    if (start.axis === null) {
      if (Math.hypot(deltaX, deltaY) < AXIS_LOCK_DISTANCE) return;

      if (Math.abs(deltaX) > Math.abs(deltaY) * HORIZONTAL_BIAS) {
        start.axis = "x";
        setIsDragging(true);
      } else {
        start.axis = "y";
        pointerStart.current = null;
        return;
      }
    }

    if (start.axis !== "x") return;

    const resistedDelta = !canGoPrevious && deltaX > 0 ? deltaX * 0.25 : deltaX;
    const clampedOffset = Math.max(-MAX_DRAG_OFFSET, Math.min(MAX_DRAG_OFFSET, resistedDelta));
    setDragOffsetX(clampedOffset);
  };

  const onPointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
    const start = pointerStart.current;
    resetDrag();

    if (!start || start.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY) * HORIZONTAL_BIAS) return;

    if (deltaX < 0) onNext();
    else if (canGoPrevious) onPrevious();
  };

  const onPointerCancel: PointerEventHandler<HTMLDivElement> = () => {
    resetDrag();
  };

  return {
    dragOffsetX,
    isDragging,
    swipeHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
  };
}
