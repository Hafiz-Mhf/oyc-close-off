"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { copy } from "@/data/copy";
import type { Language } from "@/types/journey";

interface WelcomeScreenProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onBegin: () => void;
}

export function WelcomeScreen({ language, onLanguageChange, onBegin }: WelcomeScreenProps) {
  const reduceMotion = useReducedMotion();
  const text = copy[language];
  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-1 items-center justify-center px-5 py-10 text-center tablet:px-12 tablet:py-16">
      <motion.div
        className="mx-auto w-full min-w-0 max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } } }}
      >
        <motion.p variants={item} className="mb-4 text-sm font-bold tracking-[0.18em] text-oyc-cyan uppercase">
          {text.eyebrow}
        </motion.p>
        <motion.h1 variants={item} className="text-balance text-4xl leading-[1.04] font-black tracking-[-0.04em] text-white phone:text-5xl tablet:text-7xl">
          {text.welcomeTitle}
        </motion.h1>
        <motion.p variants={item} className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-oyc-text-muted tablet:text-xl tablet:leading-8">
          {text.welcomeSupport} <span className="text-white">{text.welcomeTheme}</span>
        </motion.p>
        <motion.div variants={item} className="mx-auto mt-7 max-w-md text-left">
          <p className="mb-2 text-center text-sm font-bold text-white">{text.languagePrompt}</p>
          <LanguageSelector language={language} onChange={onLanguageChange} ariaLabel={text.languagePrompt} />
          <p className="mt-2 text-center text-xs leading-5 text-oyc-text-muted">{text.languageHelp}</p>
        </motion.div>
        <motion.div variants={item} className="mx-auto mt-9 max-w-sm">
          <Button fullWidth size="lg" shape="pill" onClick={onBegin} className="group">
            <span>{text.begin}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Button>
        </motion.div>
        <motion.p variants={item} className="mt-5 text-xs leading-5 text-oyc-text-muted/80">
          {text.musicNote}
        </motion.p>
      </motion.div>
    </div>
  );
}
