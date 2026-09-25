"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const imgPanelLeft = "/images/new-fashion-images/countries.png";
const imgPanelRight = "/images/new-fashion-images/ben-iwara2.jpg";
const imgPanelBottom =
  "/images/new-fashion-images/two-african-dressmaker-woman-designed-new-red-dress-mannequin-tailor-office-black-seamstress-girls.jpg";

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
    <section ref={sectionRef} className="bg-[var(--color-warm-neutral-50)] w-full text-[var(--text-display)] overflow-hidden py-[var(--spacing-15)] lg:py-[var(--spacing-30)] px-[var(--spacing-5)] lg:px-[var(--spacing-25)]">
      <div className="flex flex-col gap-10 lg:gap-[72px] items-center w-full">

        {/* Content Grid Row 1 (Two Columns flush to margins on desktop, stacked on mobile) */}
        <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-10 lg:gap-12">
          {/* Left Column */}
          <div className="flex flex-col gap-6 lg:gap-10 items-start w-full lg:w-[600px] lg:shrink-0">
            {/* Stat 1 */}
            <div className="flex flex-col gap-3 items-start w-full">
              <h4 className="font-display font-normal text-4xl lg:text-h4-desktop leading-[var(--leading-feature)] lg:leading-[var(--leading-h4-desktop)] text-[var(--color-warm-neutral-1000)] m-0">
                <span ref={stat1Ref} className="text-[var(--color-plum-900)] tabular-nums">53 </span>
                <span className="text-[var(--color-warm-neutral-500)]">
                  Countries
                </span>
              </h4>
              <p className="text-[var(--text-secondary)] font-sans text-xs leading-[18px] tracking-[1px] uppercase m-0">
                Exclusive South Africa
              </p>
            </div>

            {/* Panel Image Left/Bottom */}
            <div className="relative h-[280px] sm:h-[320px] lg:h-[380px] w-full rounded-[var(--radius-2xl)] overflow-hidden shadow-sm">
              <Image
                src={imgPanelLeft}
                alt="Map with destination pins representing participating countries"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
          </div>

          {/* Right Column (flex-col-reverse on mobile so Stat 2 appears before Image Right) */}
          <div className="flex flex-col-reverse lg:flex-col gap-6 lg:gap-10 items-start w-full lg:w-[480px] lg:shrink-0">
            {/* Panel Image Right */}
            <div className="relative h-[280px] sm:h-[360px] lg:h-[440px] w-full rounded-[var(--radius-2xl)] overflow-hidden shadow-sm">
              <Image
                src={imgPanelRight}
                alt="Fashion runway model Ben Iwara walking in a designer gown"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>

            {/* Stat 2 */}
            <div className="w-full">
              <h4 className="font-display font-normal text-4xl lg:text-h4-desktop leading-[var(--leading-feature)] lg:leading-[var(--leading-h4-desktop)] text-[var(--color-warm-neutral-1000)] m-0">
                <span ref={stat2Ref} className="text-[var(--color-plum-900)] tabular-nums">10 </span>
                <span className="text-[var(--color-warm-neutral-500)]">
                  Contestants
                </span>
              </h4>
            </div>
          </div>
        </div>

        {/* Content Row 2 (Centered Stat 3 & Bottom Image) */}
        <div className="flex flex-col gap-6 items-start lg:items-center pt-0 lg:pt-5 w-full">
          <h4 className="font-display font-normal text-4xl lg:text-h4-desktop leading-[var(--leading-feature)] lg:leading-[var(--leading-h4-desktop)] text-left lg:text-center text-[var(--color-warm-neutral-1000)] w-full max-w-[520px] m-0">
            <span ref={stat3Ref} className="text-[var(--color-plum-900)] tabular-nums">10 </span>
            <span className="text-[var(--color-warm-neutral-500)]">
              Episodes
            </span>
          </h4>

          <div className="relative h-[280px] sm:h-[340px] lg:h-[540px] w-full max-w-[1000px] rounded-[var(--radius-2xl)] overflow-hidden shadow-sm">
            <Image
              src={imgPanelBottom}
              alt="Two African dressmakers designing and draping a red dress on a mannequin"
              fill
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
