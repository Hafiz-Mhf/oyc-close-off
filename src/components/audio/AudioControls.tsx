"use client";

interface AudioControlsProps {
  trackTitle: string;
  playing: boolean;
  muted: boolean;
  volume: number;
  error: string | null;
  onTogglePlayback: () => void;
  onToggleMute: () => void;
  onSkipTrack: () => void;
  onVolumeChange: (volume: number) => void;
}

export function AudioControls({
  trackTitle,
  playing,
  muted,
  volume,
  error,
  onTogglePlayback,
  onToggleMute,
  onSkipTrack,
  onVolumeChange,
}: AudioControlsProps) {
  const volumePercent = Math.round(volume * 100);

  return (
    <div className="flex max-w-[12rem] flex-col items-end gap-1.5 tablet:max-w-none" aria-label="Background music controls">
      <div className="flex min-h-11 flex-wrap items-center justify-end gap-1.5 tablet:flex-nowrap">
        <button
          type="button"
          onClick={onTogglePlayback}
          className="min-h-11 min-w-11 cursor-pointer rounded-lg border border-oyc-border bg-oyc-navy-panel px-2 text-xs font-semibold text-white transition-colors hover:border-oyc-cyan hover:bg-white/10 active:bg-white/15"
          aria-label={playing ? "Pause background music" : "Play background music"}
          aria-pressed={playing}
        >
          {playing ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={onToggleMute}
          className="min-h-11 min-w-11 cursor-pointer rounded-lg border border-oyc-border bg-oyc-navy-panel px-2 text-xs font-semibold text-white transition-colors hover:border-oyc-cyan hover:bg-white/10 active:bg-white/15"
          aria-label={muted ? "Unmute background music" : "Mute background music"}
          aria-pressed={muted}
        >
          {muted ? "Unmute" : "Mute"}
        </button>
        <button
          type="button"
          onClick={onSkipTrack}
          className="min-h-11 min-w-11 cursor-pointer rounded-lg border border-oyc-border bg-oyc-navy-panel px-2 text-xs font-semibold text-white transition-colors hover:border-oyc-cyan hover:bg-white/10 active:bg-white/15"
          aria-label={`Skip ${trackTitle} and play the next track`}
        >
          Next
        </button>
        <label className="flex min-h-11 items-center gap-1.5 text-[0.6875rem] font-semibold text-oyc-text-muted">
          <span>Vol</span>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={volumePercent}
            onChange={(event) => onVolumeChange(Number(event.target.value) / 100)}
            className="h-11 w-12 cursor-pointer accent-oyc-cyan phone:w-16 tablet:w-24"
            aria-valuetext={`${volumePercent}%`}
          />
          <span className="hidden min-w-8 text-right tablet:inline">{volumePercent}%</span>
        </label>
      </div>

      <span className="sr-only" aria-live="polite">
        {trackTitle}. {playing ? "Background music playing." : "Background music paused."} Volume {volumePercent}%.
        {muted ? " Muted." : ""}
      </span>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-oyc-border bg-oyc-navy-deep px-3 py-2 text-right text-xs leading-5 text-oyc-text"
        >
          {error}
        </p>
      )}
    </div>
  );
}
