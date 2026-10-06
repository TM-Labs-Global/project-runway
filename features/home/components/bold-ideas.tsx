"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function BoldIdeas() {
  return (
    <section className="bg-[var(--color-mono-1000)] w-full text-white overflow-hidden py-[var(--spacing-15)] lg:py-[var(--spacing-30)] px-[var(--spacing-5)] lg:px-[var(--spacing-25)]">
      <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between gap-10 lg:gap-16 w-full">
        {/* Left Column: Editorial Headline, Narrative Copy & Register Action */}
        <div className="w-full lg:flex-1 lg:max-w-[640px] flex flex-col items-start">
          <h2 className="font-display font-normal text-4xl sm:text-6xl md:text-7xl lg:text-[clamp(3rem,5.5vw,7rem)] leading-[var(--leading-feature)] lg:leading-[1.05] text-white tracking-tight m-0 flex flex-col items-start">
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
                className="inline-block text-[var(--color-mono-600)]"
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
                className="inline-block text-white"
              >
                Bold Ideas
              </motion.span>
            </span>
          </h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 1.0,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-sans text-sm sm:text-base leading-relaxed text-white/70 max-w-[420px] mt-6"
          >
            Couture, and the designers daring to dream big. Hosted by an A-list
            fashion powerhouse, this show is a battle of pure creativity and craft.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 1.0,
              delay: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10"
          >
            <a
              href="https://projectrunwayafrica.com/project-runway-africa-season-one-registration/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg btn-calypso bg-white text-black [--calypso-fill:#e5e7eb] [--text-inverse:#000000] hover:text-black font-semibold transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center w-full sm:w-auto"
            >
              <span>Register Now</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Model Image Card */}
        <div className="w-full lg:w-[380px] xl:w-[460px] lg:shrink-0">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 1.2,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full aspect-[4/5] overflow-hidden shadow-sm bg-black"
          >
            <Image
              src="/images/new-pr-images/male-model-old-school.jpg"
              alt="Fashion model in brown satin jacket and avant-garde styling"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
              style={{ objectPosition: "center 35%" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
