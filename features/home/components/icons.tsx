"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* --------------------------------------------------------------------------
   Project Runway Africa photoshoot gallery — alternating heights for stagger
   -------------------------------------------------------------------------- */
const galleryImages = [
  {
    id: 1,
    src: "/images/new-pr-images/female-model-posing-on-stage.jpg",
    alt: "Project Runway Africa female model posing on stage",
    height: "h-[300px] sm:h-[380px] lg:h-[460px]",
  },
  {
    id: 2,
    src: "/images/new-pr-images/male-model-old-school.jpg",
    alt: "Fashion model in editorial brown satin jacket and tailored styling",
    height: "h-[220px] sm:h-[280px] lg:h-[330px]",
  },
  {
    id: 3,
    src: "/images/new-pr-images/female-model-in-blue-dress.jpg",
    alt: "Fashion model in vibrant blue couture gown",
    height: "h-[300px] sm:h-[380px] lg:h-[460px]",
  },
  {
    id: 4,
    src: "/images/new-pr-images/male-model-in-black-shirt-and-trouser-with-ankara-cap.jpg",
    alt: "Fashion model in monochrome attire with ankara print cap",
    height: "h-[220px] sm:h-[280px] lg:h-[330px]",
  },
  {
    id: 5,
    src: "/images/new-pr-images/a-female-model-with-pointy-fan.jpg",
    alt: "High-fashion model with sculptural fan accessory",
    height: "h-[300px] sm:h-[380px] lg:h-[460px]",
  },
  {
    id: 6,
    src: "/images/new-pr-images/female-model-with-black-coat.jpg",
    alt: "Runway model wearing statement black couture coat",
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
            <span className="text-[var(--color-mono-600)]">Are You The Next</span>{" "}
            <span className="text-white">Undiscovered</span>
          </span>

          {/* Line 2 — always flush left (sweeps in from the left edge of the screen, synchronized) */}
          <span
            className={`block transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-[100vw] opacity-0 motion-reduce:translate-x-0 motion-reduce:opacity-100"
            }`}
          >
            <span className="text-[var(--color-mono-600)]">African</span>{" "}
            <span className="text-white">Fashion Designer?</span>
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
              Project Runway Africa is calling the continent&apos;s most talented designers to
              showcase their skills on the ultimate runway. Apply now and bring your vision to life.
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
                className="btn btn-lg btn-calypso bg-white text-black [--calypso-fill:#e5e7eb] [--text-inverse:#000000] hover:text-black font-semibold transition-all duration-300 hover:scale-[1.02]"
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
                className={`relative ${img.height} w-[220px] sm:w-[260px] lg:w-[295px] shrink-0 overflow-hidden bg-[var(--color-mono-900)] shadow-sm mr-[var(--spacing-5)] lg:mr-[var(--spacing-6)]`}
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
