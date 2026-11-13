"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { audioTracks } from "@/data/audioTracks";

const DEFAULT_VOLUME = 0.5;
const FADE_DURATION_MS = 1500;

export function useBackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeFrameRef = useRef<number | null>(null);
  const volumeRef = useRef(DEFAULT_VOLUME);
  const mutedRef = useRef(false);
  const userPausedRef = useRef(false);
  const startAttemptedRef = useRef(false);
  const hasPlayedRef = useRef(false);
  const resumeAfterTrackChangeRef = useRef<boolean | null>(null);
  const resumeWhenVisibleRef = useRef(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [error, setError] = useState<string | null>(null);

  const cancelFade = useCallback(() => {
    if (fadeFrameRef.current !== null) {
      window.cancelAnimationFrame(fadeFrameRef.current);
      fadeFrameRef.current = null;
    }
  }, []);

  const fadeToPreferredVolume = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    cancelFade();
    const startedAt = window.performance.now();
    audio.volume = 0;

    const step = (now: number) => {
      const progress = Math.min(Math.max((now - startedAt) / FADE_DURATION_MS, 0), 1);
      audio.volume = Math.min(Math.max(volumeRef.current * progress, 0), 1);

      if (progress < 1 && !audio.paused) {
        fadeFrameRef.current = window.requestAnimationFrame(step);
      } else {
        fadeFrameRef.current = null;
      }
    };

    fadeFrameRef.current = window.requestAnimationFrame(step);
  }, [cancelFade]);

  const play = useCallback(async (fadeIn: boolean) => {
    const audio = audioRef.current;
    if (!audio) return false;

    cancelFade();
    audio.muted = mutedRef.current;
    audio.volume = fadeIn ? 0 : volumeRef.current;

    try {
      await audio.play();
      setError(null);
      setPlaying(true);
      userPausedRef.current = false;
      hasPlayedRef.current = true;
      if (fadeIn && !mutedRef.current) fadeToPreferredVolume();
      return true;
    } catch {
      setPlaying(false);
      setError("Playback was blocked or the music file is unavailable. Continue without sound, or use Play to retry.");
      return false;
    }
  }, [cancelFade, fadeToPreferredVolume]);

  const startFromJourney = useCallback(() => {
    if (startAttemptedRef.current || userPausedRef.current || mutedRef.current) return;

    startAttemptedRef.current = true;
    void play(true);
  }, [play]);

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      userPausedRef.current = true;
      cancelFade();
      audio.volume = volumeRef.current;
      audio.pause();
      setPlaying(false);
      return;
    }

    startAttemptedRef.current = true;
    void play(!hasPlayedRef.current);
  }, [cancelFade, play]);

  const toggleMute = useCallback(() => {
    const nextMuted = !mutedRef.current;
    if (nextMuted) startAttemptedRef.current = true;
    mutedRef.current = nextMuted;
    setMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  }, []);

  const setVolume = useCallback((nextVolume: number) => {
    const clampedVolume = Math.min(Math.max(nextVolume, 0), 1);
    cancelFade();
    volumeRef.current = clampedVolume;
    setVolumeState(clampedVolume);

    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  }, [cancelFade]);

  const handleAudioError = useCallback(() => {
    cancelFade();
    setPlaying(false);
    setError("Music is unavailable. The journey remains fully usable without sound.");
  }, [cancelFade]);

  const handleCanPlay = useCallback(() => {
    setError(null);
  }, []);

  const queueNextTrack = useCallback((resumePlayback: boolean) => {
    cancelFade();
    resumeAfterTrackChangeRef.current = resumePlayback;
    setTrackIndex((current) => (current + 1) % audioTracks.length);
  }, [cancelFade]);

  const skipTrack = useCallback(() => {
    const audio = audioRef.current;
    const shouldResume = Boolean(audio && !audio.paused && !userPausedRef.current);
    queueNextTrack(shouldResume);
  }, [queueNextTrack]);

  const handleTrackEnded = useCallback(() => {
    queueNextTrack(!userPausedRef.current);
  }, [queueNextTrack]);

  useEffect(() => {
    const shouldResume = resumeAfterTrackChangeRef.current;
    if (shouldResume === null) return;

    resumeAfterTrackChangeRef.current = null;
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    if (shouldResume) void play(false);
  }, [play, trackIndex]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.visibilityState === "visible") {
        if (!resumeWhenVisibleRef.current) return;

        resumeWhenVisibleRef.current = false;
        void play(false);
        return;
      }

      if (document.visibilityState !== "hidden" || audio.paused) return;

      resumeWhenVisibleRef.current = true;
      resumeAfterTrackChangeRef.current = false;
      cancelFade();
      audio.volume = volumeRef.current;
      audio.pause();
      setPlaying(false);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [cancelFade, play]);

  useEffect(() => cancelFade, [cancelFade]);

  return {
    audioRef,
    currentTrack: audioTracks[trackIndex],
    playing,
    muted,
    volume,
    error,
    startFromJourney,
    togglePlayback,
    toggleMute,
    setVolume,
    skipTrack,
    handleAudioError,
    handleCanPlay,
    handleTrackEnded,
    handlePlay: () => setPlaying(true),
    handlePause: () => setPlaying(false),
  };
}
