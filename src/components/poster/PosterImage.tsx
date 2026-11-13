"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Poster } from "@/types/journey";

interface PosterImageProps {
  poster: Poster;
  priority?: boolean;
}

export function PosterImage({ poster, priority = false }: PosterImageProps) {
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  const retry = () => {
    setStatus("loading");
    setAttempt((current) => current + 1);
  };

  return (
    <div className="relative flex h-full min-h-0 w-full items-center justify-center" aria-busy={status === "loading"}>
      {status === "loading" && (
        <p className="absolute text-sm text-oyc-text-muted" role="status">Loading poster...</p>
      )}

      {status !== "error" && (
        <Image
          key={`${poster.src}-${attempt}`}
          src={poster.src}
          alt={poster.alt}
          width={poster.width}
          height={poster.height}
          priority={priority}
          unoptimized
          onLoad={() => setStatus("ready")}
          onError={() => setStatus("error")}
          className={`poster-shadow h-auto max-h-full w-auto max-w-full rounded-md object-contain transition-opacity duration-300 ${
            status === "ready" ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 767px) calc(100vw - 1.5rem), min(54vw, 38rem)"
        />
      )}

      {status === "error" && (
        <div className="max-w-xs text-center" role="alert">
          <p className="font-semibold text-white">This poster could not be loaded.</p>
          <p className="mt-2 text-sm text-oyc-text-muted">Check the connection, then try again.</p>
          <Button variant="secondary" onClick={retry} className="mt-4">Retry poster</Button>
        </div>
      )}
    </div>
  );
}
