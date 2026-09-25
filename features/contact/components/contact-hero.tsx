"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function ContactHero() {
  return (
    <section className="w-full bg-[var(--color-bg-page)] text-[var(--color-warm-neutral-1000)] px-[var(--spacing-5)] lg:px-[var(--spacing-25)] pt-[140px] lg:pt-[180px] pb-[var(--spacing-15)] lg:pb-[var(--spacing-30)] overflow-hidden">
      <div className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-16">
        {/* Left Column: Headline at top, Narrative copy at bottom */}
        <div className="flex flex-col justify-between w-full lg:max-w-[560px] xl:max-w-[640px] gap-8 lg:gap-0 lg:py-1">
          {/* Main Display Headline */}
          <div className="flex flex-col">
            <h1 className="uppercase font-display font-normal text-6xl sm:text-7xl md:text-8xl xl:text-9xl leading-[0.88] tracking-tight m-0 select-none">
              <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[var(--color-warm-neutral-1000)]"
                >
                  LET&apos;S MAKE
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block text-[var(--color-brand-yellow)]"
                >
                  THE MOMENT
                </motion.span>
              </span>
            </h1>
          </div>

          {/* Subtitle Copy */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[var(--color-warm-neutral-600)] max-w-[400px] m-0">
              For stories, partnerships, press and every bold idea in between — our
              team would love to hear from you.
            </p>
          </motion.div>
        </div>

        {/* Right Column: Model Portrait Image */}
        <div className="w-full lg:w-[460px] xl:w-[520px] shrink-0 self-center lg:self-auto flex items-center justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.0,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-full max-w-[520px] aspect-[3/4] overflow-hidden"
          >
            <Image
              src="/images/man-in-orange-jacket new main-compressed.png"
              alt="Fashion model wearing orange jacket with sculpted dreadlocks"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover object-center"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
