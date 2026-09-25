"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* --------------------------------------------------------------------------
   5 distinct Unsplash fashion model images — alternating heights for stagger
   -------------------------------------------------------------------------- */
const galleryImages = [
  {
    id: 1,
    src: "/images/new-fashion-images/black-lady-walking.png",
    alt: "Fashion model walking in modern designer outfit",
    height: "h-[300px] sm:h-[380px] lg:h-[460px]",
  },
  {
    id: 2,
    src: "/images/new-fashion-images/ben-iwara.jpg",
    alt: "Fashion model Ben Iwara in high-fashion couture",
    height: "h-[220px] sm:h-[280px] lg:h-[330px]",
  },
  {
    id: 3,
    src: "/images/new-fashion-images/cheerful-young-darkskinned-woman-white-trendy-blouse-draws-clothes-samples-attractive-fashion-designer-sits-table.jpg",
    alt: "Young African fashion designer sketching apparel designs",
    height: "h-[300px] sm:h-[380px] lg:h-[460px]",
  },
  {
    id: 4,
    src: "/images/new-fashion-images/lady-wearing-black-posing.png",
    alt: "Fashion model posing in black editorial ensemble",
    height: "h-[220px] sm:h-[280px] lg:h-[330px]",
  },
  {
    id: 5,
    src: "/images/new-fashion-images/pexels-cottonbro-4716575.jpg",
    alt: "Fashion tailoring and editorial styling process",
    height: "h-[300px] sm:h-[380px] lg:h-[460px]",
  },
  {
    id: 6,
    src: "/images/new-fashion-images/stylish-casual-african-american-man-jeans-jacket-black-beret-clothes-store-looking-new-jacket-mannequin.jpg",
    alt: "African designer in beret inspecting mannequin garment in studio",
    height: "h-[220px] sm:h-[280px] lg:h-[330px]",
  },
];

export function Icons() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="africa-icon-heading"
      className="bg-transparent w-full text-white overflow-hidden py-[var(--spacing-15)] lg:py-[var(--spacing-30)]"
    >
      {/* Top Content Area — padded within standard section margins */}
      <div className="flex flex-col gap-8 lg:gap-[var(--spacing-10)] w-full px-[var(--spacing-5)] lg:px-[var(--spacing-25)]">

        {/* Main Headline — Line 1 indented right on desktop, Line 2 flush left */}
        <h2
          id="africa-icon-heading"
          className="font-display font-normal tracking-tight flex flex-col m-0 text-white"
        >
          {/* Line 1 — flush left on mobile, indented on desktop (sweeps in from the right edge of the screen) */}
          <span
            className={`block lg:pl-[220px] transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-[100vw] opacity-0 motion-reduce:translate-x-0 motion-reduce:opacity-100"
            }`}
          >
            Are You{" "}
            <span className="text-[var(--color-brand-yellow)]">Africa&apos;s</span>
          </span>

          {/* Line 2 — always flush left (sweeps in from the left edge of the screen, synchronized) */}
          <span
            className={`block transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-[100vw] opacity-0 motion-reduce:translate-x-0 motion-reduce:opacity-100"
            }`}
          >
            Next{" "}
            <span className="text-[var(--color-brand-yellow)]">Fashion Icon</span>
          </span>
        </h2>

        {/* Body Text + CTA — positioned on the right on desktop, left on mobile */}
        <div className="flex justify-start lg:justify-end w-full">
          <div className="flex flex-col gap-[var(--spacing-6)] items-start w-full max-w-[480px]">
            <p
              className={`font-sans text-base leading-relaxed text-white/80 m-0 transition-all duration-[900ms] delay-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 motion-reduce:translate-y-0"
              }`}
            >
              Project Runway Africa is calling Africa&apos;s boldest designers to
              redefine the fashion landscape. Bring your A-game to the ultimate
              runway. Apply now and own your moment.
            </p>
            <div
              className={`transition-all duration-[900ms] delay-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 motion-reduce:translate-y-0"
              }`}
            >
              <a
                href="https://projectrunwayafrica.com/project-runway-africa-season-one-registration/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-calypso bg-[var(--color-brand-yellow)] hover:bg-[#e0b400] text-[var(--color-plum-900)] [--calypso-fill:var(--color-action-primary)] font-semibold transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Register Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Infinite Marquee Gallery — breaks out of section padding */}
      <div
        className={`w-full overflow-hidden mt-[var(--spacing-20)] lg:mt-[180px] transition-opacity duration-[600ms] delay-[400ms] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Track: 3× the images so the loop is seamless at all viewport widths.
           Uses mr (margin-right) instead of gap so each card carries its own
           trailing space — this makes translateX(-33.333%) land exactly on
           the start of the next identical set, with no visible jump. */}
        <div className="animate-marquee-track flex items-start">
          {[...galleryImages, ...galleryImages, ...galleryImages].map(
            (img, idx) => (
              <div
                key={idx}
                className={`relative ${img.height} w-[220px] sm:w-[260px] lg:w-[295px] shrink-0 rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-warm-neutral-200)] shadow-sm mr-[var(--spacing-5)] lg:mr-[var(--spacing-6)]`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="295px"
                  className="object-cover transition-transform duration-700 [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.04]"
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
