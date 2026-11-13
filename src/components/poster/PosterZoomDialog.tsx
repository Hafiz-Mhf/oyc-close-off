"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent,
} from "react";
import { Button } from "@/components/ui/Button";
import type { Poster } from "@/types/journey";

interface PosterZoomDialogProps {
  poster: Poster;
  onClose: () => void;
}

interface Point { x: number; y: number }
const MIN_SCALE = 1;
const MAX_SCALE = 3;
const SCALE_STEP = 0.25;

export function PosterZoomDialog({ poster, onClose }: PosterZoomDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointers = useRef(new Map<number, Point>());
  const previousPinchDistance = useRef<number | null>(null);
  const previousPanPoint = useRef<Point | null>(null);
  const [scale, setScale] = useState(MIN_SCALE);
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });

  const reset = useCallback(() => {
    setScale(MIN_SCALE);
    setPosition({ x: 0, y: 0 });
  }, []);

  const updateScale = useCallback((nextScale: number) => {
    const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, nextScale));
    setScale(clamped);
    if (clamped === MIN_SCALE) setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 1) previousPanPoint.current = { x: event.clientX, y: event.clientY };
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      previousPinchDistance.current = Math.hypot(a.x - b.x, a.y - b.y);
      previousPanPoint.current = null;
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (previousPinchDistance.current) {
        updateScale(scale * (distance / previousPinchDistance.current));
      }
      previousPinchDistance.current = distance;
      return;
    }

    if (scale > MIN_SCALE && previousPanPoint.current) {
      const deltaX = event.clientX - previousPanPoint.current.x;
      const deltaY = event.clientY - previousPanPoint.current.y;
      setPosition((current) => ({ x: current.x + deltaX, y: current.y + deltaY }));
      previousPanPoint.current = { x: event.clientX, y: event.clientY };
    }
  };

  const releasePointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointers.current.delete(event.pointerId);
    previousPinchDistance.current = null;
    const remaining = [...pointers.current.values()][0] ?? null;
    previousPanPoint.current = remaining;
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    updateScale(scale + (event.deltaY < 0 ? SCALE_STEP : -SCALE_STEP));
  };

  return (
    <dialog
      ref={dialogRef}
      className="poster-dialog m-auto h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-6xl overflow-hidden rounded-2xl border border-oyc-border bg-oyc-navy-deep p-0 text-oyc-text shadow-2xl tablet:h-[calc(100dvh-3rem)] tablet:w-[calc(100vw-3rem)]"
      aria-labelledby="poster-dialog-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClose={onClose}
    >
      <div className="flex h-full min-h-0 flex-col">
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 p-3 tablet:px-5">
          <div>
            <h2 id="poster-dialog-title" className="font-bold">Poster {poster.id} of 7</h2>
            <p className="text-xs text-oyc-text-muted">Pinch, scroll or use the controls to zoom. Drag to pan.</p>
          </div>
          <Button variant="quiet" onClick={onClose} className="px-3">Close zoom</Button>
        </header>

        <div
          className={`relative min-h-0 flex-1 overflow-hidden bg-black/35 ${scale > 1 ? "cursor-grab active:cursor-grabbing" : ""}`}
          style={{ touchAction: "none" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={releasePointer}
          onPointerCancel={releasePointer}
          onWheel={handleWheel}
          aria-label={`Zoomed view of poster ${poster.id}`}
        >
          <Image
            src={poster.src}
            alt={poster.alt}
            width={poster.width}
            height={poster.height}
            unoptimized
            draggable={false}
            className="pointer-events-none absolute inset-0 m-auto h-auto max-h-full w-auto max-w-full select-none object-contain"
            style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})` }}
            sizes="100vw"
          />
        </div>

        <footer className="border-t border-white/10 bg-oyc-navy p-3 tablet:px-5">
          <div className="flex flex-wrap items-center justify-center gap-2" aria-label="Poster zoom controls">
            <Button variant="secondary" onClick={() => updateScale(scale - SCALE_STEP)} disabled={scale <= MIN_SCALE} aria-label="Zoom out">−</Button>
            <output className="min-w-16 text-center text-sm font-semibold" aria-live="polite">{Math.round(scale * 100)}%</output>
            <Button variant="secondary" onClick={() => updateScale(scale + SCALE_STEP)} disabled={scale >= MAX_SCALE} aria-label="Zoom in">+</Button>
            <Button variant="quiet" onClick={reset} disabled={scale === MIN_SCALE && position.x === 0 && position.y === 0}>Reset</Button>
          </div>
          <details className="mx-auto mt-2 max-w-3xl rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm">
            <summary className="min-h-11 cursor-pointer py-2 font-semibold text-oyc-cyan">Read poster text</summary>
            <div className="max-h-36 overflow-y-auto pb-2 leading-6 text-oyc-text-muted">
              {poster.transcript.map((line) => <p key={line} className="mt-2 first:mt-0">{line}</p>)}
            </div>
          </details>
        </footer>
      </div>
    </dialog>
  );
}
