"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { AudioControls } from "@/components/audio/AudioControls";
import { JourneyShell } from "@/components/layout/JourneyShell";
import { ScreenPanel } from "@/components/layout/ScreenPanel";
import { ClosingScreen } from "@/components/journey/ClosingScreen";
import { ReflectionScreen } from "@/components/journey/ReflectionScreen";
import { StoryViewer } from "@/components/journey/StoryViewer";
import { WelcomeScreen } from "@/components/journey/WelcomeScreen";
import { posters } from "@/data/posters";
import { useBackgroundAudio } from "@/hooks/useBackgroundAudio";
import type { JourneyScreen, ReflectionChoice } from "@/types/journey";

const screenLabels: Record<JourneyScreen, string> = {
  welcome: "Welcome",
  story: "The Journey",
  reflection: "Private Reflection",
  closing: "Closing",
};

export function JourneyApp() {
  const [screen, setScreen] = useState<JourneyScreen>("welcome");
  const [activeIndex, setActiveIndex] = useState(0);
  const [navigationDirection, setNavigationDirection] = useState<-1 | 1>(1);
  const [reflection, setReflection] = useState<ReflectionChoice | null>(null);
  const reduceMotion = useReducedMotion();
  const {
    audioRef,
    currentTrack,
    playing,
    muted,
    volume,
    error: audioError,
    startFromJourney,
    togglePlayback,
    toggleMute,
    setVolume,
    skipTrack,
    handleAudioError,
    handleCanPlay,
    handleTrackEnded,
    handlePlay,
    handlePause,
  } = useBackgroundAudio();

  const showPreviousPoster = () => {
    if (activeIndex === 0) return;

    setNavigationDirection(-1);
    setActiveIndex((current) => current - 1);
  };

  const showNextPoster = () => {
    if (activeIndex === posters.length - 1) {
      setScreen("reflection");
      return;
    }

    setNavigationDirection(1);
    setActiveIndex((current) => current + 1);
  };

  const showPoster = (index: number) => {
    if (index === activeIndex) return;

    setNavigationDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const revisitJourney = () => {
    setActiveIndex(0);
    setNavigationDirection(1);
    setScreen("story");
  };

  return (
    <JourneyShell
      screenLabel={screenLabels[screen]}
      constrained={screen === "story"}
      audioControls={(
        <AudioControls
          trackTitle={`${currentTrack.artist} — ${currentTrack.title}`}
          playing={playing}
          muted={muted}
          volume={volume}
          error={audioError}
          onTogglePlayback={togglePlayback}
          onToggleMute={toggleMute}
          onSkipTrack={skipTrack}
          onVolumeChange={setVolume}
        />
      )}
    >
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="none"
        onPlay={handlePlay}
        onPause={handlePause}
        onCanPlay={handleCanPlay}
        onEnded={handleTrackEnded}
        onError={handleAudioError}
      />
      <ScreenPanel immersive={screen === "story"}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={screen}
            className="flex min-h-0 flex-1 flex-col"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : screen === "closing" ? 0.6 : 0.32, ease: "easeOut" }}
          >
            {screen === "welcome" && (
              <WelcomeScreen
                onBegin={() => {
                  startFromJourney();
                  setActiveIndex(0);
                  setNavigationDirection(1);
                  setScreen("story");
                }}
              />
            )}

            {screen === "story" && (
              <StoryViewer
                activeIndex={activeIndex}
                direction={navigationDirection}
                onBack={() => setScreen("welcome")}
                onPrevious={showPreviousPoster}
                onNext={showNextPoster}
                onSelectPoster={showPoster}
              />
            )}

            {screen === "reflection" && (
              <ReflectionScreen
                selected={reflection}
                onSelect={setReflection}
                onContinue={() => setScreen("closing")}
                onSkip={() => {
                  setReflection(null);
                  setScreen("closing");
                }}
                onBack={() => {
                  setActiveIndex(posters.length - 1);
                  setNavigationDirection(-1);
                  setScreen("story");
                }}
              />
            )}

            {screen === "closing" && (
              <ClosingScreen selected={reflection} onRevisit={revisitJourney} />
            )}
          </motion.div>
        </AnimatePresence>
      </ScreenPanel>
    </JourneyShell>
  );
}
