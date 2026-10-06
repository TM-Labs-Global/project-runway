"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImageCard {
  id: number;
  src: string;
  alt: string;
  top: string;
  left: string;
}

const cardData: ImageCard[] = [
  {
    id: 1,
    src: "/images/new-pr-images/group-of-female-models.jpg",
    alt: "Project Runway Africa female models in runway formation",
    top: "24%",
    left: "58%",
  },
  {
    id: 2,
    src: "/images/new-pr-images/female-model-with-milk-top-red-skirt.jpg",
    alt: "Fashion model in cream eyelet top and chevron red skirt",
    top: "18%",
    left: "20%",
  },
  {
    id: 3,
    src: "/images/new-pr-images/male-models-strutting.jpg",
    alt: "Male models strutting the runway in Project Runway Africa apparel",
    top: "54%",
    left: "12%",
  },
  {
    id: 4,
    src: "/images/new-pr-images/female-model-in-blue-dress.jpg",
    alt: "Fashion model posing in vibrant blue couture gown",
    top: "60%",
    left: "44%",
  },
  {
    id: 5,
    src: "/images/new-pr-images/male-model-old-school.jpg",
    alt: "Male model in satin bomber jacket and editorial styling",
    top: "28%",
    left: "32%",
  },
  {
    id: 6,
    src: "/images/new-pr-images/a-female-model-with-pointy-fan.jpg",
    alt: "High-fashion model posing with sculptural fan accessory",
    top: "62%",
    left: "64%",
  },
  {
    id: 7,
    src: "/images/new-pr-images/male-models-in-a-diagonal-pose.jpg",
    alt: "Project Runway Africa male models in diagonal stage composition",
    top: "16%",
    left: "48%",
  },
  {
    id: 8,
    src: "/images/new-pr-images/female-model-with-black-coat.jpg",
    alt: "Runway model wearing sculptural black couture coat",
    top: "66%",
    left: "16%",
  },
  {
    id: 9,
    src: "/images/new-pr-images/male-model-in-black-shirt-and-trouser-with-ankara-cap.jpg",
    alt: "Fashion model in tailored black ensemble and ankara print cap",
    top: "20%",
    left: "38%",
  },
  {
    id: 10,
    src: "/images/new-pr-images/female-model-posing-on-stage.jpg",
    alt: "Project Runway Africa hero model posing on the illuminated stage",
    top: "42%",
    left: "52%",
  },
];

interface SlideContent {
  id: number;
  line1: string;
  line2?: string;
}

const slides: SlideContent[] = [
  {
    id: 1,
    line1: "Get Ready For",
    line2: "Unparalleled Creativity",
  },
  {
    id: 2,
    line1: "53 Countries",
  },
  {
    id: 3,
    line1: "10 Designers",
  },
  {
    id: 4,
    line1: "10 Episodes",
  },
];

export function GetReady() {
  const sectionRef = useRef<HTMLElement>(null);
  const titlesTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = titlesTrackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".get-ready-card");
      const titleContainers = gsap.utils.toArray<HTMLElement>(".get-ready-title-group");

      // 1. Initial 3D placement: cards start 50,000px in the distance and scaled to 0
      gsap.set(cards, {
        z: -50000,
        scale: 0,
        transformOrigin: "center center",
      });

      // 2. Main Pinned ScrollTrigger
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * 5}px`, // 5x viewport height budget
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          // A. Horizontal Track Translation
          const moveDistance = window.innerWidth * (slides.length - 1);
          gsap.set(track, {
            x: -moveDistance * self.progress,
          });

          // B. Velocity-based chromatic text split
          const velocity = self.getVelocity();
          const normalizedVelocity = velocity === 0 ? 0 : velocity > 0 ? 1 : -1;
          const currentSpeed = Math.min(Math.abs(velocity / 450), 32);
          const isIdle = Math.abs(velocity) < 8 || self.progress <= 0 || self.progress >= 1;

          titleContainers.forEach((container) => {
            const title1 = container.querySelector<HTMLElement>(".get-ready-title-1");
            const title2 = container.querySelector<HTMLElement>(".get-ready-title-2");
            const title3 = container.querySelector<HTMLElement>(".get-ready-title-3");

            if (isIdle) {
              // Smoothly collapse back to unified solid black title
              if (title1 && title2) {
                gsap.to([title1, title2], {
                  x: 0,
                  duration: 0.35,
                  ease: "power2.out",
                  overwrite: true,
                });
              }
            } else {
              const baseOffset = normalizedVelocity * currentSpeed;

              // Title 1 (Brand Yellow): shifts 4x base offset
              if (title1) {
                gsap.to(title1, {
                  x: baseOffset * 4,
                  duration: 0.2,
                  ease: "power1.out",
                  overwrite: "auto",
                });
              }

              // Title 2 (Magenta): shifts 2x base offset
              if (title2) {
                gsap.to(title2, {
                  x: baseOffset * 2,
                  duration: 0.2,
                  ease: "power1.out",
                  overwrite: "auto",
                });
              }
            }

            // Title 3 (Solid Black): strictly anchored baseline
            if (title3) {
              gsap.set(title3, { x: 0 });
            }
          });

          // C. Staggered 3D Card Fly-In
          cards.forEach((card, index) => {
            const staggerOffset = index * 0.075;
            const scaledProgress = (self.progress - staggerOffset) * 3;
            const individualProgress = Math.max(0, Math.min(1, scaledProgress));

            // Last card lands slightly closer for hero prominence
            const targetZ = index === cards.length - 1 ? 1600 : 2100;
            const newZ = -50000 + (targetZ + 50000) * individualProgress;

            // Scale ramps up quickly within the first 10% of individual card flight
            const scale = Math.max(0, Math.min(1, individualProgress * 10));

            gsap.set(card, {
              z: newZ,
              scale: scale,
            });
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Project Runway Africa scale and showcase"
      data-header-theme="light"
      className="relative w-full h-screen bg-[var(--color-intro-canvas)] text-[var(--color-mono-1000)] select-none overflow-hidden"
    >
      {/* 1. Deep 3D Image Canvas (200vw x 200vh centered, 3D perspective) */}
      <div
        className="images absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh] pointer-events-none z-0"
        style={{
          perspective: "2000px",
          transformStyle: "preserve-3d",
        }}
      >
        {cardData.map((card, idx) => (
          <div
            key={card.id}
            className="get-ready-card absolute w-[200px] sm:w-[250px] lg:w-[300px] aspect-[4/5] overflow-hidden shadow-2xl bg-[var(--color-mono-200)] will-change-transform"
            style={{
              top: card.top,
              left: card.left,
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src={card.src}
              alt={card.alt}
              fill
              sizes="(max-width: 768px) 250px, 320px"
              priority={idx < 3}
              className="object-cover"
            />
            {/* Subtle gloss overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* 2. Horizontal Titles Track (400vw total width — 100vw per slide) */}
      <div
        ref={titlesTrackRef}
        className="titles absolute top-0 left-0 w-[400vw] h-full flex z-10 will-change-transform pointer-events-none"
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="get-ready-title-group relative flex-1 w-[100vw] h-full flex items-center overflow-hidden"
          >
            {/* Layer 1: Brand Yellow (Fastest Fan-Out, 4x) */}
            <h2
              className="get-ready-title-1 absolute top-1/2 -translate-y-1/2 left-[6%] font-display italic font-normal uppercase tracking-tight text-left leading-[0.92] text-6xl sm:text-7xl md:text-8xl lg:text-[clamp(5rem,7vw,7.5rem)] sm:whitespace-nowrap will-change-transform m-0"
              style={{ color: "var(--color-brand-yellow, #F5C70F)" }}
              aria-hidden="true"
            >
              {slide.line1}
              {slide.line2 && (
                <>
                  <br />
                  {slide.line2}
                </>
              )}
            </h2>

            {/* Layer 2: Kinetic Magenta (Middle Fan-Out, 2x) */}
            <h2
              className="get-ready-title-2 absolute top-1/2 -translate-y-1/2 left-[6%] font-display italic font-normal uppercase tracking-tight text-left leading-[0.92] text-6xl sm:text-7xl md:text-8xl lg:text-[clamp(5rem,7vw,7.5rem)] sm:whitespace-nowrap will-change-transform m-0"
              style={{ color: "var(--color-magenta-500, #ED0F8F)" }}
              aria-hidden="true"
            >
              {slide.line1}
              {slide.line2 && (
                <>
                  <br />
                  {slide.line2}
                </>
              )}
            </h2>

            {/* Layer 3: Solid Editorial Black (Base Anchor, 0x) */}
            <h2
              className="get-ready-title-3 absolute top-1/2 -translate-y-1/2 left-[6%] font-display italic font-normal uppercase tracking-tight text-left leading-[0.92] text-6xl sm:text-7xl md:text-8xl lg:text-[clamp(5rem,7vw,7.5rem)] sm:whitespace-nowrap will-change-transform text-[var(--color-mono-1000)] m-0"
            >
              {slide.line1}
              {slide.line2 && (
                <>
                  <br />
                  {slide.line2}
                </>
              )}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}
