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
  const iconClass = "h-4 w-4";

  return (
    <div className="flex max-w-[14.5rem] flex-col items-end gap-1.5 tablet:max-w-none" aria-label="Background music controls">
      <div className="media-island flex min-h-14 max-w-full items-center gap-1 rounded-[1.25rem] border border-white/10 bg-oyc-navy-deep/90 p-1.5 shadow-2xl shadow-black/35 backdrop-blur-xl tablet:gap-2 tablet:rounded-full tablet:pr-4">
        <div className="hidden min-w-0 items-center gap-2.5 border-r border-white/10 px-2 tablet:flex">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-oyc-cyan/15 text-oyc-cyan" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></svg>
          </span>
          <span className="min-w-0 max-w-40">
            <span className="block text-[0.6rem] font-bold tracking-[0.15em] text-oyc-cyan uppercase">Now playing</span>
            <span className="block truncate text-xs font-medium text-white">{trackTitle}</span>
          </span>
        </div>
        <button
          type="button"
          onClick={onTogglePlayback}
          className="island-button"
          aria-label={playing ? "Pause background music" : "Play background music"}
          aria-pressed={playing}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden="true"><path d="m8 5 11 7-11 7z"/></svg>
          )}
        </button>
        <button
          type="button"
          onClick={onToggleMute}
          className="island-button"
          aria-label={muted ? "Unmute background music" : "Mute background music"}
          aria-pressed={muted}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4zM16 9l5 6M21 9l-5 6"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4zM15 9.5a4 4 0 0 1 0 5M18 7a7 7 0 0 1 0 10"/></svg>
          )}
        </button>
        <button
          type="button"
          onClick={onSkipTrack}
          className="island-button"
          aria-label={`Skip ${trackTitle} and play the next track`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden="true"><path d="m5 5 9 7-9 7zm10 0h3v14h-3z"/></svg>
        </button>
        <label className="flex min-h-11 items-center gap-2 px-1 text-[0.6875rem] font-semibold text-oyc-text-muted">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="hidden h-4 w-4 tablet:block" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4zM15 9.5a4 4 0 0 1 0 5M18 7a7 7 0 0 1 0 10"/></svg>
          <span className="sr-only">Volume</span>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={volumePercent}
            onChange={(event) => onVolumeChange(Number(event.target.value) / 100)}
            className="island-range h-11 w-14 cursor-pointer accent-oyc-cyan phone:w-16 tablet:w-20"
            aria-valuetext={`${volumePercent}%`}
          />
          <span className="hidden min-w-7 text-right text-[0.625rem] tablet:inline">{volumePercent}%</span>
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
