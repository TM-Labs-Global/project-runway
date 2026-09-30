"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const userExplicitlyMutedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Helper to start playback and audio from 0:00
    const startPlaybackAndAudio = () => {
      if (!video) return;
      video.currentTime = 0;
      video.volume = 1.0;
      video.muted = false;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsMuted(false);
          })
          .catch(() => {
            // Browser autoplay policy prevented unmuted playback before user interaction.
            // Temporarily mute so video continues rolling frames smoothly.
            video.muted = true;

            // As soon as the user makes any gesture (click, tap, key, scroll), immediately unlock sound!
            const unlockAudio = () => {
              if (userExplicitlyMutedRef.current) return;
              if (videoRef.current) {
                videoRef.current.muted = false;
                videoRef.current.volume = 1.0;
                videoRef.current.play().catch(() => {});
                setIsMuted(false);
              }
              cleanup();
            };

            const cleanup = () => {
              window.removeEventListener("pointerdown", unlockAudio, true);
              window.removeEventListener("touchstart", unlockAudio, true);
              window.removeEventListener("mousedown", unlockAudio, true);
              window.removeEventListener("keydown", unlockAudio, true);
              window.removeEventListener("click", unlockAudio, true);
              window.removeEventListener("wheel", unlockAudio, true);
            };

            window.addEventListener("pointerdown", unlockAudio, { capture: true, once: true });
            window.addEventListener("touchstart", unlockAudio, { capture: true, once: true });
            window.addEventListener("mousedown", unlockAudio, { capture: true, once: true });
            window.addEventListener("keydown", unlockAudio, { capture: true, once: true });
            window.addEventListener("click", unlockAudio, { capture: true, once: true });
            window.addEventListener("wheel", unlockAudio, { capture: true, once: true });
          });
      }
    };

    // Determine if the intro animation is active or already played
    const isIntroActive = document.documentElement.classList.contains("intro-active");
    const hasIntroPlayed = sessionStorage.getItem("pra_intro_played");

    if (isIntroActive || !hasIntroPlayed) {
      // Intro is active: hold video paused at 0:00 so it doesn't play silently behind the loader
      video.pause();
      video.currentTime = 0;

      const onReveal = () => {
        startPlaybackAndAudio();
        window.removeEventListener("pra:intro-reveal", onReveal);
      };

      window.addEventListener("pra:intro-reveal", onReveal);

      return () => {
        window.removeEventListener("pra:intro-reveal", onReveal);
      };
    } else {
      // Intro already finished in this session: start immediately
      startPlaybackAndAudio();
    }
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted || video.muted) {
      // User clicked Unmute -> turn sound ON
      userExplicitlyMutedRef.current = false;
      video.muted = false;
      video.volume = 1.0;
      video.play().catch(() => {});
      setIsMuted(false);
    } else {
      // User clicked Mute -> turn sound OFF
      userExplicitlyMutedRef.current = true;
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section className="relative w-full min-h-screen h-[100svh] overflow-hidden bg-black flex flex-col justify-end items-center pt-[140px] lg:pt-[180px] pb-16 lg:pb-24 px-[var(--spacing-5)] lg:px-[var(--spacing-25)]">
      {/* 1. Full-bleed Background Runway Video with Zoom Container */}
      <div className="hero-video-container absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          loop
          playsInline
          className="w-full h-full object-cover pointer-events-none"
        >
          <source src="/project-runway-africa-teaser-1.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. Atmospheric Editorial Gradient for Contrast & Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/60 pointer-events-none z-10" />

      {/* 3. Audio Toggle Button (Floating Glassmorphism Pill) */}
      <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 pointer-events-auto">
        <button
          type="button"
          onClick={toggleSound}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 hover:border-white/50 text-white text-xs tracking-wider uppercase font-medium transition-all duration-300 hover:scale-105 shadow-xl shadow-black/50 cursor-pointer"
          aria-label={isMuted ? "Unmute teaser video" : "Mute teaser video"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
              <span className="text-white/80 group-hover:text-white">Unmute</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-[#ffd700] animate-pulse" />
              <span className="text-white font-semibold">Mute</span>
            </>
          )}
        </button>
      </div>

      {/* 4. Foreground Content Frame — Centered horizontally, anchored towards the bottom */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-center text-center mt-auto">
        {/* Main Display Headline (H1) with Masked Line Reveals */}
        <h1 className="hero-headline font-display font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-white m-0 leading-[0.95] flex flex-col items-center text-center">
          {/* Line 1 */}
          <span className="hero-line overflow-hidden inline-block pb-[0.12em] -mb-[0.12em]">
            <span className="hero-headline-line-inner inline-block">
              The Emmy-Winning
            </span>
          </span>

          {/* Line 2: Project Runway (White) + Is In Africa. (White) */}
          <span className="hero-line overflow-hidden inline-block pb-[0.12em] -mb-[0.12em]">
            <span className="hero-headline-line-inner inline-block">
              <span className="text-white">
                Project Runway
              </span>{" "}
              <span className="text-white">
                Is In Africa.
              </span>
            </span>
          </span>
        </h1>

        {/* CTA Buttons: Primary & Secondary */}
        <div className="hero-cta-group mt-8 lg:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          {/* Primary Action */}
          <a
            href="https://projectrunwayafrica.com/project-runway-africa-season-one-registration/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-calypso bg-white text-black [--calypso-fill:#e5e7eb] [--text-inverse:#000000] hover:text-black font-semibold transition-all duration-300 hover:scale-[1.02] inline-flex items-center w-full sm:w-auto"
          >
            <span>Register Now</span>
          </a>

          {/* Secondary Action: Sponsorship & Partnership */}
          <a
            href="mailto:info@projectrunwayafrica.com"
            className="btn btn-lg btn-outline-white font-medium transition-all duration-300 hover:scale-[1.02] inline-flex items-center w-full sm:w-auto"
          >
            <span>Partner With Us</span>
          </a>
        </div>
      </div>
    </section>
  );
}

