"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Resolves a CSS var(--token) string into a real computed hex/rgb string at runtime
 * so GSAP can calculate smooth color interpolations.
 */
function resolveColor(value: string): string {
  if (typeof window === "undefined") return value;
  const varMatch = value.match(/^var\((--[^)]+)\)/);
  if (varMatch) {
    const computed = getComputedStyle(document.documentElement)
      .getPropertyValue(varMatch[1])
      .trim();
    return computed || value;
  }
  return value;
}

interface SmoothBackgroundSequenceProps {
  children: ReactNode;
  /** Starting canvas color (default: warm neutral 50 / #F8F7F7) */
  startColor?: string;
  /** Middle accent color (default: plum 900 / #2F1C50) */
  middleColor?: string;
  /** Ending canvas color (default: warm neutral 50 / #F8F7F7) */
  endColor?: string;
  className?: string;
}

export function SmoothBackgroundSequence({
  children,
  startColor = "var(--color-warm-neutral-50)",
  middleColor = "var(--color-plum-900)",
  endColor = "var(--color-warm-neutral-50)",
  className = "",
}: SmoothBackgroundSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Resolve color tokens to computed hex values
    const resolvedStart = resolveColor(startColor);
    const resolvedMiddle = resolveColor(middleColor);
    const resolvedEnd = resolveColor(endColor);

    // Text color tokens for Directors section
    const resolvedHeadingStart = resolveColor("var(--color-warm-neutral-600)");
    const resolvedNameStart = resolveColor("var(--color-warm-neutral-1000)");
    const resolvedBioStart = resolveColor("var(--color-warm-neutral-600)");

    const headingEnd = "#FFFFFF";
    const nameEnd = "#FFFFFF";
    const bioEnd = "rgba(255, 255, 255, 0.85)";

    // Set initial background and text colors immediately to prevent any flash
    gsap.set(container, { backgroundColor: resolvedStart });
    container.style.setProperty("--color-directors-heading", resolvedHeadingStart);
    container.style.setProperty("--color-directors-title", resolvedNameStart);
    container.style.setProperty("--color-directors-bio", resolvedBioStart);

    // Locate the child sections inside the container
    const sections = container.querySelectorAll("section");
    const triggers: ScrollTrigger[] = [];

    // Transition 1: Entering Middle Section (Icons)
    // Interpolates from resolvedStart (#F8F7F7) -> resolvedMiddle (#2F1C50)
    // Synchronously transitions Directors typography from dark neutral -> luminous white
    if (sections[1]) {
      const trigger1 = ScrollTrigger.create({
        trigger: sections[1],
        start: "top bottom", // starts when Icons top enters bottom of viewport
        end: "top 35%",      // finishes when Icons top reaches 35% from top
        scrub: true,
        onUpdate: (self) => {
          const bg = gsap.utils.interpolate(
            resolvedStart,
            resolvedMiddle,
            self.progress
          );
          const headingColor = gsap.utils.interpolate(
            resolvedHeadingStart,
            headingEnd,
            self.progress
          );
          const nameColor = gsap.utils.interpolate(
            resolvedNameStart,
            nameEnd,
            self.progress
          );
          const bioColor = gsap.utils.interpolate(
            resolvedBioStart,
            bioEnd,
            self.progress
          );

          gsap.set(container, { backgroundColor: bg });
          container.style.setProperty("--color-directors-heading", headingColor);
          container.style.setProperty("--color-directors-title", nameColor);
          container.style.setProperty("--color-directors-bio", bioColor);
        },
      });
      triggers.push(trigger1);
    }

    // Transition 2: Entering End Section (News)
    // Interpolates from resolvedMiddle (#2F1C50) -> resolvedEnd (#F8F7F7)
    if (sections[2]) {
      const trigger2 = ScrollTrigger.create({
        trigger: sections[2],
        start: "top bottom", // starts when News top enters bottom of viewport
        end: "top 35%",      // finishes when News top reaches 35% from top
        scrub: true,
        onUpdate: (self) => {
          const bg = gsap.utils.interpolate(
            resolvedMiddle,
            resolvedEnd,
            self.progress
          );
          gsap.set(container, { backgroundColor: bg });
        },
      });
      triggers.push(trigger2);
    }

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.set(container, { backgroundColor: resolvedStart });
      container.style.removeProperty("--color-directors-heading");
      container.style.removeProperty("--color-directors-title");
      container.style.removeProperty("--color-directors-bio");
    };
  }, [startColor, middleColor, endColor]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
    >
      {/* Transparent inner container allows unified parent background to show through */}
      <div className="w-full h-full bg-transparent">
        {children}
      </div>
    </div>
  );
}
