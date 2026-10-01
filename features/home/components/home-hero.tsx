"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Play, X } from "lucide-react";

export function HomeHero() {
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Background Ambient Runway Video - always muted for 100% reliable autoplay across all browsers
  useEffect(() => {
    const video = backgroundVideoRef.current;
    if (!video) return;

    video.muted = true;

    const isIntroActive = document.documentElement.classList.contains("intro-active");
    const hasIntroPlayed = sessionStorage.getItem("pra_intro_played");

    if (isIntroActive || !hasIntroPlayed) {
      // Intro is active: hold video paused at 0:00 so it doesn't play ahead behind the loader
      video.pause();
      video.currentTime = 0;

      let triggered = false;
      const onReveal = () => {
        if (triggered) return;
        triggered = true;
        video.currentTime = 0;
        video.play().catch(() => {});
        window.removeEventListener("pra:intro-reveal", onReveal);
      };

      window.addEventListener("pra:intro-reveal", onReveal);

      // Safety fallback: if reveal event doesn't fire within 8.5s, force video start
      const fallbackTimer = setTimeout(() => {
        onReveal();
      }, 8500);

      return () => {
        window.removeEventListener("pra:intro-reveal", onReveal);
        clearTimeout(fallbackTimer);
      };
    } else {
      video.play().catch(() => {});
    }
  }, []);

  // Wire up mobile video: when it exits fullscreen, resume background video
  useEffect(() => {
    const mobileVideo = mobileVideoRef.current;
    if (!mobileVideo) return;

    const handleFullscreenExit = () => {
      const isFullscreen =
        !!(document as any).fullscreenElement ||
        !!(document as any).webkitFullscreenElement;
      if (!isFullscreen) {
        mobileVideo.pause();
        mobileVideo.currentTime = 0;
        backgroundVideoRef.current?.play().catch(() => {});
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenExit);
    document.addEventListener("webkitfullscreenchange", handleFullscreenExit);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenExit);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenExit);
    };
  }, []);

  const openLightbox = () => {
    backgroundVideoRef.current?.pause();

    // On touch/mobile devices: use native fullscreen video — bypasses all CSS stacking & Lenis issues
    const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
    if (isTouchDevice && mobileVideoRef.current) {
      const mobileVideo = mobileVideoRef.current;
      mobileVideo.currentTime = 0;
      const playPromise = mobileVideo.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if ((mobileVideo as any).webkitEnterFullscreen) {
              (mobileVideo as any).webkitEnterFullscreen();
            } else if (mobileVideo.requestFullscreen) {
              mobileVideo.requestFullscreen().catch(() => {});
            }
          })
          .catch(() => {});
      } else {
        // Synchronous fallback
        if ((mobileVideo as any).webkitEnterFullscreen) {
          (mobileVideo as any).webkitEnterFullscreen();
        }
      }
      return;
    }

    // Desktop: custom lightbox portal
    if (typeof window !== "undefined" && (window as any).__lenis) {
      (window as any).__lenis.stop();
    }
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    backgroundVideoRef.current?.play().catch(() => {});
    if (typeof window !== "undefined" && (window as any).__lenis) {
      (window as any).__lenis.start();
    }
  };

  // Keyboard Escape for desktop lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLightboxOpen) {
        closeLightbox();
      }
    };

    if (isLightboxOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen]);

  return (
    <section className="relative w-full min-h-screen h-[100svh] overflow-hidden bg-black flex flex-col justify-end items-start pt-[140px] lg:pt-[180px] pb-16 lg:pb-24 px-[var(--spacing-5)] lg:px-[var(--spacing-25)]">
      {/* Hidden video for mobile native fullscreen playback */}
      <video
        ref={mobileVideoRef}
        src="/project-runway-africa-teaser-1.mp4"
        controls
        preload="none"
        playsInline={false as any}
        style={{ position: "absolute", width: 0, height: 0, opacity: 0 }}
        aria-hidden="true"
      />

      {/* 1. Full-bleed Background Runway Video with Zoom Container */}
      <div className="hero-video-container absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={backgroundVideoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover pointer-events-none"
        >
          <source src="/project-runway-africa-teaser-1.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. Atmospheric Editorial Gradient for Contrast & Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/60 pointer-events-none z-10" />

      {/* 3. Option A: Ambient Floating Play Button */}
      <div className="hero-play-button-wrapper absolute top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 sm:translate-x-0 sm:left-auto sm:right-[10%] lg:right-[15%] sm:top-1/2 sm:-translate-y-1/2 z-20 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={openLightbox}
          className="group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 hover:border-white/60 transition-all duration-500 hover:scale-110 shadow-2xl cursor-pointer"
          aria-label="Play teaser video with sound in lightbox"
        >
          {/* Subtle Radar Pulse Ring */}
          <span className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-30 pointer-events-none" />
          {/* Play Icon */}
          <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white translate-x-0.5 transition-transform duration-300 group-hover:scale-110" />
        </button>
        <span className="text-xs uppercase tracking-[0.2em] text-white/80 font-medium select-none pointer-events-none">
          Watch Teaser
        </span>
      </div>

      {/* 4. Foreground Content Frame — Left-aligned and anchored to bottom-left */}
      <div className="relative z-20 w-full max-w-7xl flex flex-col items-start text-left mt-auto">
        {/* Main Display Headline (H1) with Masked Line Reveals */}
        <h1 className="hero-headline font-display font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-white m-0 leading-[0.95] flex flex-col items-start text-left">
          {/* Line 1 */}
          <span className="hero-line overflow-hidden inline-block pb-[0.12em] -mb-[0.12em]">
            <span className="hero-headline-line-inner inline-block">
              The Emmy-Winning
            </span>
          </span>

          {/* Line 2: Project Runway (White) + Is In Africa. (White) */}
          <span className="hero-line overflow-hidden inline-block pb-[0.12em] -mb-[0.12em]">
            <span className="hero-headline-line-inner inline-block">
              <span className="text-white">Project Runway</span>{" "}
              <span className="text-white">Is In Africa.</span>
            </span>
          </span>
        </h1>

        {/* CTA Buttons: Primary & Secondary */}
        <div className="hero-cta-group mt-8 lg:mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 sm:gap-5 w-full sm:w-auto">
          {/* Primary Action */}
          <a
            href="https://projectrunwayafrica.com/project-runway-africa-season-one-registration/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-calypso bg-white text-black [--calypso-fill:#e5e7eb] [--text-inverse:#000000] hover:text-black font-semibold transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center w-full sm:w-auto"
          >
            <span>Register Now</span>
          </a>

          {/* Secondary Action: Sponsorship & Partnership */}
          <a
            href="mailto:info@projectrunwayafrica.com"
            className="btn btn-lg btn-outline-white font-medium transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center w-full sm:w-auto"
          >
            <span>Partner With Us</span>
          </a>
        </div>
      </div>

      {/* 5. Desktop Lightbox — portal to document.body, only shown on non-touch devices */}
      {isMounted && isLightboxOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 bg-black/95"
              onClick={closeLightbox}
              role="dialog"
              aria-modal="true"
              aria-label="Project Runway Africa Teaser Video Player"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                className="group absolute top-4 right-4 sm:top-6 sm:right-8 z-[10000] flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/25 hover:border-white/50 transition-all duration-300 hover:scale-105 cursor-pointer shadow-2xl"
                aria-label="Close video player"
              >
                <X className="w-5 h-5 text-white" />
                <span className="text-xs uppercase tracking-wider font-medium text-white">
                  Close
                </span>
              </button>

              {/* Video Container */}
              <div
                className="relative w-full max-w-7xl aspect-video overflow-hidden shadow-2xl border border-white/20 bg-black flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  autoPlay
                  controls
                  playsInline
                  preload="auto"
                  className="w-full h-full object-contain"
                >
                  <source src="/project-runway-africa-teaser-1.mp4" type="video/mp4" />
                </video>
              </div>
            </div>,
            document.body
          )
        : null}
    </section>
  );
}
