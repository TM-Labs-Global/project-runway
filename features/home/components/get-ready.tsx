"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const imgPanelLeft = "/images/new-pr-images/group-of-female-models.jpg";
const imgPanelRight = "/images/new-pr-images/female-model-in-blue-dress.jpg";
const imgPanelBottom = "/images/new-pr-images/female-model-posing-on-stage.jpg";

// Individual image focal points & vertical crop controls:
// • Increase percentage (e.g. 20% -> 25%) to push the image UP (revealing more torso/bottom, reducing top headroom).
// • Decrease percentage (e.g. 20% -> 10%) to push the image DOWN.
export const imageFocalPoints = {
  left: "center 25%",   // 53 Countries: pushed up to frame models and reduce empty ceiling
  right: "center 15%",   // 10 Contestants: blue couture gown (preserves tall sculpted bun)
  bottom: "center 40%", // 10 Episodes: stage model
};

export function GetReady() {
  const sectionRef = useRef<HTMLElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stats = [
        { ref: stat1Ref, target: 53 },
        { ref: stat2Ref, target: 10 },
        { ref: stat3Ref, target: 10 },
      ];

      stats.forEach(({ ref }) => {
        if (!ref.current) return;
        gsap.from(ref.current, {
          textContent: 0,
          duration: 1.8,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="get-ready-heading"
      data-header-theme="light"
      className="bg-[var(--color-warm-neutral-50,#FAF9F5)] w-full text-[var(--text-display,#111111)] overflow-hidden py-[var(--spacing-15,3.75rem)] lg:py-[var(--spacing-30,7.5rem)] px-[var(--spacing-5,1.25rem)] lg:px-[var(--spacing-25,6.25rem)] select-none"
    >
      <div className="flex flex-col items-center w-full">
        {/* Section Heading */}
        <div className="flex flex-col items-start sm:items-center text-left sm:text-center w-full mb-14 sm:mb-18 lg:mb-28">
          <h2
            id="get-ready-heading"
            className="font-display font-normal tracking-tight text-left sm:text-center leading-[1.05] text-4xl sm:text-6xl md:text-7xl lg:text-[clamp(3.75rem,6vw,5.5rem)] text-[var(--color-mono-1000)] m-0"
          >
            Get Ready For
            <br />
            Unparalleled Creativity
          </h2>
        </div>

        {/* Editorial Numbers & Showcase Block */}
        <div className="flex flex-col gap-10 sm:gap-12 lg:gap-[72px] items-center w-full">
          {/* Content Grid Row 1 (Two Columns flush to margins on desktop, stacked on mobile) */}
          <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-10 sm:gap-12 lg:gap-14">
            {/* Left Column: Image then Stat on mobile, Stat then Image on desktop */}
            <div className="flex flex-col-reverse lg:flex-col gap-6 sm:gap-8 lg:gap-10 items-start w-full lg:w-[620px] xl:w-[680px] 2xl:w-[720px] lg:shrink-0">
              {/* Stat 1 */}
              <div className="w-full">
                <h4 className="font-display font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(3.5rem,5.5vw,4.5rem)] leading-[var(--leading-feature)] lg:leading-[var(--leading-h4-desktop)] text-[var(--color-warm-neutral-1000)] tracking-tight m-0">
                  <span ref={stat1Ref} className="text-[var(--color-plum-900)] tabular-nums">
                    53{" "}
                  </span>
                  <span className="text-[var(--color-warm-neutral-500)]">
                    Countries
                  </span>
                </h4>
              </div>

              {/* Panel Image Left: Pan-African Model Collective */}
              <div className="relative h-[440px] sm:h-[400px] lg:h-[460px] xl:h-[480px] w-full overflow-hidden shadow-sm bg-[var(--color-mono-200,#e5e7eb)]">
                <Image
                  src={imgPanelLeft}
                  alt="Project Runway Africa models in runway formation representing participating countries"
                  fill
                  sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 680px, 720px"
                  style={{ objectPosition: imageFocalPoints.left }}
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />
              </div>
            </div>

            {/* Right Column: Image then Stat on mobile and desktop */}
            <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 items-start w-full lg:w-[500px] xl:w-[560px] 2xl:w-[600px] lg:shrink-0">
              {/* Panel Image Right: Designer Couture Gown */}
              <div className="relative h-[440px] sm:h-[420px] lg:h-[500px] xl:h-[540px] w-full overflow-hidden shadow-sm bg-[var(--color-mono-200,#e5e7eb)]">
                <Image
                  src={imgPanelRight}
                  alt="Fashion model walking the runway in vibrant blue couture gown"
                  fill
                  sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 560px, 600px"
                  style={{ objectPosition: imageFocalPoints.right }}
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />
              </div>

              {/* Stat 2 */}
              <div className="w-full">
                <h4 className="font-display font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(3.5rem,5.5vw,4.5rem)] leading-[var(--leading-feature)] lg:leading-[var(--leading-h4-desktop)] text-[var(--color-warm-neutral-1000)] tracking-tight m-0">
                  <span ref={stat2Ref} className="text-[var(--color-plum-900)] tabular-nums">
                    10{" "}
                  </span>
                  <span className="text-[var(--color-warm-neutral-500)]">
                    Contestants
                  </span>
                </h4>
              </div>
            </div>
          </div>

          {/* Content Row 2: Image then Stat on mobile, Centered Stat then Bottom Image on desktop */}
          <div className="flex flex-col-reverse lg:flex-col gap-6 sm:gap-8 items-start lg:items-center pt-0 lg:pt-5 w-full">
            <h4 className="font-display font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(3.5rem,5.5vw,4.5rem)] leading-[var(--leading-feature)] lg:leading-[var(--leading-h4-desktop)] text-left lg:text-center text-[var(--color-warm-neutral-1000)] w-full max-w-[560px] tracking-tight m-0">
              <span ref={stat3Ref} className="text-[var(--color-plum-900)] tabular-nums">
                10{" "}
              </span>
              <span className="text-[var(--color-warm-neutral-500)]">
                Episodes
              </span>
            </h4>

            <div className="relative h-[440px] sm:h-[420px] lg:h-[560px] xl:h-[600px] w-full max-w-[1040px] xl:max-w-[1140px] overflow-hidden shadow-sm bg-[var(--color-mono-200,#e5e7eb)]">
              <Image
                src={imgPanelBottom}
                alt="Project Runway Africa hero model posing on the illuminated stage"
                fill
                sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 1040px, 1140px"
                style={{ objectPosition: imageFocalPoints.bottom }}
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
