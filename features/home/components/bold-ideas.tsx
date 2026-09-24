"use client";

import { motion } from "motion/react";

export function BoldIdeas() {
  return (
    <section className="bg-[var(--color-brand-lavender)] w-full text-[var(--color-warm-neutral-1000)] overflow-hidden py-[var(--spacing-15)] lg:py-[var(--spacing-30)] px-[var(--spacing-5)] lg:px-[var(--spacing-25)]">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16 w-full">
        {/* Left Column: Editorial Headline & Narrative Copy */}
        <div className="w-full lg:w-[480px] lg:shrink-0 flex flex-col gap-6">
          <h3 className="font-display font-normal text-4xl lg:text-7xl-5 leading-[var(--leading-feature)] lg:leading-[var(--leading-h3-desktop)] text-[var(--color-warm-neutral-1000)] tracking-tight m-0 flex flex-col items-start">
            <span className="overflow-hidden inline-block pb-[0.12em] -mb-[0.12em]">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 1.35,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                A Stage For
              </motion.span>
            </span>
            <span className="overflow-hidden inline-block pb-[0.12em] -mb-[0.12em]">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 1.35,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                Bold Ideas
              </motion.span>
            </span>
          </h3>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 1.0,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-sans text-sm sm:text-base leading-relaxed text-[var(--color-warm-neutral-700)] max-w-[420px] m-0"
          >
            Couture, and the designers daring to dream big. Hosted by an A-list
            fashion powerhouse, this show is a battle of creativity.
          </motion.p>
        </div>

        {/* Right Column: Model Image Card */}
        <div className="w-full lg:w-[600px] lg:shrink-0">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 1.2,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-[var(--radius-2xl)] overflow-hidden shadow-sm bg-[var(--color-warm-neutral-200)]"
          >
            <img
              src="/images/man-in-orange-jacket new main-compressed.png"
              alt="Fashion model in orange couture jacket with sculpted dreadlocks"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
