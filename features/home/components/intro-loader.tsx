"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

export function IntroLoader() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If user reloaded the page (Cmd+Shift+R, Cmd+R, F5), allow animation to play fresh!
    if (typeof window !== "undefined") {
      try {
        const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
        const isReload =
          (navEntries.length > 0 && navEntries[0].type === "reload") ||
          ((performance as any).navigation && (performance as any).navigation.type === 1);

        if (isReload) {
          sessionStorage.removeItem("pra_intro_played");
        }
      } catch {
        // Fallback for restricted environments
      }
    }

    const searchParams = new URLSearchParams(window.location.search);
    const forceReplay = searchParams.has("replay");
    const hasPlayed = sessionStorage.getItem("pra_intro_played");

    if (hasPlayed && !forceReplay) {
      if (containerRef.current) {
        containerRef.current.style.display = "none";
      }
      return;
    }

    // Register CustomEase plugin
    gsap.registerPlugin(CustomEase);
    try {
      CustomEase.create("hop", "0.9, 0, 0.1, 1");
    } catch {
      // Ease might already be created
    }

    // Mark document as active for scoped CSS transforms
    document.documentElement.classList.add("intro-active");

    const ctx = gsap.context(() => {
      // Explicit initial GSAP positions for hero elements
      const siteHeader = document.querySelector("#site-header");
      const heroVideo = document.querySelector(".hero-video-container");
      const headlineLines = document.querySelectorAll(".hero-headline-line-inner");
      const heroCtas = document.querySelector(".hero-cta-group");
      const heroAudio = document.querySelector(".hero-play-button-wrapper");
      const heroSoundToggle = document.querySelector(".hero-audio-toggle");
      const introLogo = document.querySelector(".intro-logo");

      if (siteHeader) gsap.set(siteHeader, { y: "-120%" });
      if (heroVideo) gsap.set(heroVideo, { scale: 1.5, transformOrigin: "center center" });
      if (headlineLines.length > 0) gsap.set(headlineLines, { y: "120%" });
      if (heroCtas) gsap.set(heroCtas, { scale: 0, opacity: 0 });
      if (heroAudio) gsap.set(heroAudio, { scale: 0, opacity: 0 });
      if (heroSoundToggle) gsap.set(heroSoundToggle, { y: 20, opacity: 0 });
      if (introLogo) gsap.set(introLogo, { opacity: 0, scale: 0.9 });

      const tl = gsap.timeline({
        delay: 0.15,
        defaults: {
          ease: "hop",
        },
        onComplete: () => {
          sessionStorage.setItem("pra_intro_played", "true");
          document.documentElement.classList.remove("intro-active");
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("pra:intro-reveal"));
          }
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
        },
      });

      // ─── PHASE 1: Counter Sequence & Spinner (Commented Out) ───
      /*
      // Initial Spinner Hold
      tl.to({}, { duration: 0.5 });

      // Counter Sequence (00 -> 20 -> 60 -> 80 -> 99)
      const counts = containerRef.current?.querySelectorAll(".intro-count");

      if (counts) {
        counts.forEach((count, index) => {
          const digits = count.querySelectorAll(".intro-digit h2");

          // Slide digits UP into view
          tl.to(
            digits,
            {
              y: "0%",
              duration: 1,
              stagger: 0.075,
            },
            index * 1
          );

          // Slide digits UP and out of view
          if (index < counts.length) {
            tl.to(
              digits,
              {
                y: "-100%",
                duration: 1,
                stagger: 0.075,
              },
              index * 1 + 1
            );
          }
        });
      }

      // Fade out spinner
      tl.to(".intro-spinner", {
        opacity: 0,
        duration: 0.3,
      });
      */

      // ─── Brand Reveal ("Creativity" / "Unlocked") (Commented Out) ───
      /*
      // "Creativity" (italic) slides DOWN from top (-120% -> 0%)
      tl.to(
        "#intro-word-1 h2",
        {
          y: "0%",
          duration: 1,
        }
      );

      // "Unlocked" slides UP from bottom (120% -> 0%)
      tl.to(
        "#intro-word-2 h2",
        {
          y: "0%",
          duration: 1,
        },
        "<"
      );

      // ─── PHASE 3: Divider Line ───
      tl.to(".intro-divider", {
        scaleY: 1,
        duration: 1,
        onComplete: () => {
          gsap.to(".intro-divider", {
            opacity: 0,
            duration: 0.3,
            delay: 0.3,
          });
        },
      });

      // ─── PHASE 4: Brand Exit + Page Reveal ───
      // "Creativity" slides down and out
      tl.to("#intro-word-1 h2", {
        y: "135%",
        duration: 1,
        delay: 0.3,
      });

      // "Unlocked" slides up and out simultaneously
      tl.to(
        "#intro-word-2 h2",
        {
          y: "-135%",
          duration: 1,
        },
        "<"
      );
      */

      // ─── Brand Logo: Fade In & Pulsing ───
      /*
      // Previous short timing (Commented Out)
      tl.to(".intro-logo", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      tl.to(".intro-logo", {
        scale: 1.08,
        duration: 0.75,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      });

      tl.to(".intro-logo", {
        opacity: 0,
        scale: 1.04,
        duration: 0.45,
        ease: "power2.inOut",
      });
      */

      // 1. Logo fades in smoothly into place
      tl.to(".intro-logo", {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      });

      // 2. Logo pulses with deliberate, breathing cycles
      tl.to(".intro-logo", {
        scale: 1.08,
        duration: 0.85,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 3, // 2 complete breathing cycles (~3.4s)
      });

      // 3. Brief hold at rest before the reveal
      tl.to({}, { duration: 0.25 });

      // 4. Logo exits smoothly as the page wipe initiates
      tl.to(".intro-logo", {
        opacity: 0,
        scale: 1.04,
        duration: 0.55,
        ease: "power2.inOut",
      });

      // Anchor all reveal animations to the "wipe" label (starts slightly before logo fully finishes exit)
      tl.addLabel("wipe", "-=0.2");

      // Signal the reveal moment so the hero video and audio start exactly as the screen opens
      tl.call(
        () => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("pra:intro-reveal"));
          }
        },
        [],
        "wipe"
      );

      // 1. Single overlay rectangle wipes upward via clip-path
      /*
      // Dual split blocks with stagger (Commented Out)
      tl.to(
        ".intro-block",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.2,
          stagger: 0.12,
          ease: "hop",
        },
        "wipe"
      );
      */
      tl.to(
        ".intro-block",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.2,
          ease: "hop",
        },
        "wipe"
      );

      // 2. Hero runway video zooms out from scale(1.5) -> scale(1)
      if (heroVideo) {
        tl.to(
          heroVideo,
          {
            scale: 1,
            duration: 2,
            ease: "hop",
          },
          "wipe"
        );
      }

      // 3. SiteHeader slides down from translateY(-120%) -> translateY(0)
      if (siteHeader) {
        tl.to(
          siteHeader,
          {
            y: "0%",
            duration: 1.4,
            ease: "hop",
          },
          "wipe+=0.1"
        );
      }

      // 4. Headline text lines slide up from translateY(120%) -> translateY(0)
      if (headlineLines.length > 0) {
        tl.to(
          headlineLines,
          {
            y: "0%",
            duration: 1.4,
            stagger: 0.18,
            ease: "hop",
          },
          "wipe+=0.1"
        );
      }

      // ─── PHASE 5: CTA & Audio Toggle Reveal ───
      if (heroCtas) {
        tl.to(
          heroCtas,
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "hop",
          },
          "wipe+=0.5"
        );
      }

      if (heroAudio) {
        tl.to(
          heroAudio,
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "hop",
          },
          "wipe+=0.5"
        );
      }

      if (heroSoundToggle) {
        tl.to(
          heroSoundToggle,
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "hop",
          },
          "wipe+=0.5"
        );
      }
    });

    return () => {
      document.documentElement.classList.remove("intro-active");
      ctx.revert();
    };
  }, []);

  return (
    <aside
      ref={containerRef}
      aria-label="Project Runway Africa Intro Reveal"
      className="intro-loader fixed inset-0 z-50 pointer-events-auto overflow-hidden"
    >
      {/* 1. Single rectangle wipe overlay */}
      <div className="intro-overlay">
        <div className="intro-block" />
        {/* <div className="intro-block" /> */}
      </div>

      {/* 2. Brand Text Split: Creativity (italic) / Unlocked (Commented Out) */}
      {/*
      <div className="intro-brand">
        <div className="intro-word" id="intro-word-1">
          <h2 className="font-display italic font-normal text-[var(--color-mono-600,#4b5563)] text-[clamp(2.5rem,7vw,6.5rem)] tracking-tight leading-[1.1] pb-[0.05em] select-none">
            Creativity
          </h2>
        </div>
        <div className="intro-word" id="intro-word-2">
          <h2 className="font-display font-normal text-black text-[clamp(2.5rem,7vw,6.5rem)] tracking-tight leading-[1.1] pb-[0.05em] select-none">
            Unlocked
          </h2>
        </div>
      </div>
      */}

      {/* Centered Brand Logo with Pulsing Animation */}
      {/* <div className="intro-logo-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none flex items-center justify-center"> */}
      <div className="intro-logo-container">
        <img
          src="/logo/pra-loho-black.png"
          alt="Project Runway Africa"
          className="intro-logo w-44 sm:w-60 md:w-72 max-w-[80vw] h-auto object-contain select-none"
        />
      </div>

      {/* 3. Center Vertical Divider Line (Commented Out) */}
      {/* <div className="intro-divider" /> */}

      {/* 4. Minimalist Spinner (Commented out) */}
      {/*
      <div className="intro-spinner-container">
        <div className="intro-spinner" />
      </div>
      */}

      {/* 5. Cinematic Counter Sequence: 00 -> 20 -> 60 -> 80 -> 99 (Commented out) */}
      {/*
      <div className="intro-counter">
        <div className="intro-count">
          <div className="intro-digit">
            <h2>0</h2>
          </div>
          <div className="intro-digit">
            <h2>0</h2>
          </div>
        </div>

        <div className="intro-count">
          <div className="intro-digit">
            <h2>2</h2>
          </div>
          <div className="intro-digit">
            <h2>0</h2>
          </div>
        </div>

        <div className="intro-count">
          <div className="intro-digit">
            <h2>6</h2>
          </div>
          <div className="intro-digit">
            <h2>0</h2>
          </div>
        </div>

        <div className="intro-count">
          <div className="intro-digit">
            <h2>8</h2>
          </div>
          <div className="intro-digit">
            <h2>0</h2>
          </div>
        </div>

        <div className="intro-count">
          <div className="intro-digit">
            <h2>9</h2>
          </div>
          <div className="intro-digit">
            <h2>9</h2>
          </div>
        </div>
      </div>
      */}
    </aside>
  );
}
