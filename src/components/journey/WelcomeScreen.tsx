"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";

interface WelcomeScreenProps {
  onBegin: () => void;
}

export function WelcomeScreen({ onBegin }: WelcomeScreenProps) {
  const reduceMotion = useReducedMotion();
  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-1 items-center justify-center px-5 py-10 text-center tablet:px-12 tablet:py-16">
      <motion.div
        className="mx-auto max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } } }}
      >
        <motion.p variants={item} className="mb-4 text-sm font-bold tracking-[0.18em] text-oyc-cyan uppercase">
          Own Your Career Close-Off
        </motion.p>
        <motion.h1 variants={item} className="text-balance text-4xl leading-[1.04] font-black tracking-[-0.04em] text-white phone:text-5xl tablet:text-7xl">
          4 Weeks. One Journey. Endless Possibilities.
        </motion.h1>
        <motion.p variants={item} className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-oyc-text-muted tablet:text-xl tablet:leading-8">
          Your journey doesn&apos;t end here. <span className="text-white">The Journey Continues.</span>
        </motion.p>
        <motion.div variants={item} className="mx-auto mt-9 max-w-sm">
          <Button fullWidth onClick={onBegin} className="rounded-full tablet:min-h-14 tablet:text-base">
            Begin Your Journey
          </Button>
        </motion.div>
        <motion.p variants={item} className="mt-5 text-xs leading-5 text-oyc-text-muted/80">
          Music starts at 50% when you begin. Pause, mute or adjust it at any time.
        </motion.p>
      </motion.div>
    </div>
  );
}
