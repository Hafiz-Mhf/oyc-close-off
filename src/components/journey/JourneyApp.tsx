"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { AudioControls } from "@/components/audio/AudioControls";
import { JourneyShell } from "@/components/layout/JourneyShell";
import { ScreenPanel } from "@/components/layout/ScreenPanel";
import { ClosingScreen } from "@/components/journey/ClosingScreen";
import { ReflectionScreen } from "@/components/journey/ReflectionScreen";
import { StoryViewer } from "@/components/journey/StoryViewer";
import { WelcomeScreen } from "@/components/journey/WelcomeScreen";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { copy } from "@/data/copy";
import { getPosters } from "@/data/posters";
import { useBackgroundAudio } from "@/hooks/useBackgroundAudio";
import type { JourneyScreen, Language, ReflectionChoice } from "@/types/journey";

export function JourneyApp() {
  const [language, setLanguage] = useState<Language>("eng");
  const [screen, setScreen] = useState<JourneyScreen>("welcome");
  const [activeIndex, setActiveIndex] = useState(0);
  const [navigationDirection, setNavigationDirection] = useState<-1 | 1>(1);
  const [reflection, setReflection] = useState<ReflectionChoice | null>(null);
  const reduceMotion = useReducedMotion();
  const posters = useMemo(() => getPosters(language), [language]);
  const text = copy[language];
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

  useEffect(() => {
    document.documentElement.lang = language === "bm" ? "ms" : "en";
  }, [language]);

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
      screenLabel={{
        welcome: text.screenWelcome,
        story: text.screenStory,
        reflection: text.screenReflection,
        closing: text.screenClosing,
      }[screen]}
      homeLabel={language === "bm" ? "Laman utama Penutup OYC" : "OYC Close-Off home"}
      constrained={screen === "story"}
      onHome={() => {
        setActiveIndex(0);
        setNavigationDirection(1);
        setScreen("welcome");
      }}
      languageControls={screen === "welcome" ? undefined : (
        <LanguageSelector language={language} onChange={setLanguage} ariaLabel={text.languageSwitcherLabel} compact />
      )}
      audioControls={(
        <AudioControls
          language={language}
          trackTitle={`${currentTrack.artist}: ${currentTrack.title}`}
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
        <motion.div
          key={screen}
          className="flex min-h-0 flex-1 flex-col"
          initial={reduceMotion ? false : { opacity: 0.96, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : screen === "closing" ? 0.4 : 0.18, ease: "easeOut" }}
        >
            {screen === "welcome" && (
              <WelcomeScreen
                language={language}
                onLanguageChange={setLanguage}
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
                language={language}
                posters={posters}
                activeIndex={activeIndex}
                direction={navigationDirection}
                onBack={() => setScreen("welcome")}
                onPrevious={showPreviousPoster}
                onNext={showNextPoster}
                onSelectPoster={showPoster}
                onLanguageChange={setLanguage}
              />
            )}

            {screen === "reflection" && (
              <ReflectionScreen
                language={language}
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
                onLanguageChange={setLanguage}
              />
            )}

            {screen === "closing" && (
              <ClosingScreen
                language={language}
                selected={reflection}
                onRevisit={revisitJourney}
                onLanguageChange={setLanguage}
              />
            )}
        </motion.div>
      </ScreenPanel>
    </JourneyShell>
  );
}
