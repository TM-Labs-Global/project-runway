"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function GsapTickerSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Expose lenis globally so other components (e.g. FourPhasesHero's onLeave
    // gate) can directly control scroll without fighting Lenis's internal state.
    // window.scrollTo() does not reset Lenis — this is the correct API.
    if (typeof window !== "undefined") {
      (window as any).__lenis = lenis;
    }

    // 1. Keep ScrollTrigger updated on every Lenis scroll tick
    lenis.on("scroll", ScrollTrigger.update);

    // 2. Drive Lenis strictly through GSAP's ticker (single clock source)
    const raf = (time: number) => {
      lenis.raf(time * 1000); // gsap.ticker time is in seconds; Lenis expects ms
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
      if (typeof window !== "undefined") {
        delete (window as any).__lenis;
      }
    };
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      autoRaf={false} // Disable Lenis's internal rAF loop; driven by gsap.ticker
      options={{
        syncTouch: true, // Prevents mobile touch-scroll jitter on scrubbed elements
      }}
    >
      <GsapTickerSync />
      {children}
    </ReactLenis>
  );
}
