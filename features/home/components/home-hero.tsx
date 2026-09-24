"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [viewport, setViewport] = useState({ width: 1440, height: 900 });
  const [headerHeight, setHeaderHeight] = useState(440);

  useEffect(() => {
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const isDesktop = viewport.width >= 1024;
  const gutter = isDesktop ? 100 : 20;
  const gap = isDesktop ? 140 : 56; // 80px (var(--spacing-20)) desktop, 56px (var(--spacing-14)) mobile
  const initialWidth = Math.max(280, viewport.width - gutter * 2);
  const initialHeight = isDesktop ? 486 : 280;
  const initialTop = headerHeight + gap;

  // Animations driven by scroll progress
  // Decisive exit: text fades out and lifts cleanly by 20% scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);

  // Video expands to full page (100vw x 100vh) over 0 -> 0.8 scroll progress
  const videoWidth = useTransform(
    scrollYProgress,
    [0, 0.8],
    [initialWidth, viewport.width]
  );
  const videoHeight = useTransform(
    scrollYProgress,
    [0, 0.8],
    [initialHeight, viewport.height]
  );
  const videoTop = useTransform(scrollYProgress, [0, 0.8], [initialTop, 0]);
  const videoRadius = useTransform(scrollYProgress, [0, 0.8], [24, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[260vh]"
    >
      {/* Sticky Full-Viewport Stage with 0 padding to allow full-bleed expansion */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Top Header Row (Headline + Description & CTA) - Layered at z-0 */}
        <motion.div
          ref={headerRef}
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-0 w-full pt-[140px] lg:pt-[180px] px-[var(--spacing-5)] lg:px-[var(--spacing-25)]"
        >
          <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-8 lg:gap-12">
            {/* Main Headline with Masked Editorial Line Reveals */}
            <div className="w-full lg:w-[760px] lg:shrink-0">
              <h2 className="uppercase font-display font-normal tracking-tight text-[var(--color-plum-900)] m-0">
                Get Ready for style drama
              </h2>
            </div>

            {/* Description & CTA with Staggered Fade Up */}
            <div className="w-full lg:w-[360px] lg:shrink-0 flex flex-col gap-6 pt-2">
              <p className="text-[var(--color-plum-900)]/70 font-sans text-sm sm:text-base leading-[22px] m-0">
                The biggest fashion face-off. 10 designers compete for the ultimate
                fashion spotlight. Who will claim the crown as Africa&apos;s next
                biggest fashion icon?
              </p>
              <div>
                <a
                  href="https://projectrunwayafrica.com/project-runway-africa-season-one-registration/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg btn-calypso transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>Register Now</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Expanding Video Banner - Layered at z-10 to expand OVER the text */}
        <motion.div
          style={{
            width: videoWidth,
            height: videoHeight,
            top: videoTop,
            left: "50%",
            x: "-50%",
            borderRadius: videoRadius,
          }}
          className="absolute z-10 overflow-hidden shadow-2xl bg-neutral-900"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover pointer-events-none"
          >
            <source
              src="/models-on-runway-walking-2.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>
      </div>
    </div>
  );
}
