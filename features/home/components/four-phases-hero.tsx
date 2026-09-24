"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Curated Unsplash images — high-fashion editorial
// ---------------------------------------------------------------------------
const BG_SRC = "/images/different-fashions/lady-in-afro.jpg";

const CASCADE_SRCS = [
  "/images/different-fashions/street-fashion.jpg",
  "/images/different-fashions/ladies-in-traditional-gear.jpg",
  "/images/different-fashions/afro-dressing.jpg",
];

// ---------------------------------------------------------------------------
// Shared outro content — rendered in both left and right half divs so they
// look like a single full-screen banner when clipped side-by-side.
// ---------------------------------------------------------------------------
function OutroContent() {
  return (
    <div className="w-full px-[var(--spacing-5)] lg:px-[var(--spacing-25)] text-center">
      <p
        className="
          font-display font-normal tracking-tight text-[var(--color-plum-900)]
          text-6xl lg:text-9xl
          leading-[var(--leading-section)] lg:leading-[var(--leading-hero-desktop)]
        "
      >
        Africa&apos;s Next
        <br />
        <span className="text-[var(--color-brand-yellow)]">Fashion Icon</span>
        <br />
        Is Being Made.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FourPhasesHero
// ---------------------------------------------------------------------------
export function FourPhasesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const revealerRef = useRef<HTMLDivElement>(null);
  const imagesWrapperRef = useRef<HTMLDivElement>(null);
  // imageRefs stores refs to each cascade image wrapper div
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outroLeftRef = useRef<HTMLDivElement>(null);
  const outroRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    const revealer = revealerRef.current;
    const imagesWrapper = imagesWrapperRef.current;
    const images = imageRefs.current.filter(Boolean) as HTMLDivElement[];
    const outroLeft = outroLeftRef.current;
    const outroRight = outroRightRef.current;

    if (
      !section ||
      !bg ||
      !content ||
      !revealer ||
      !imagesWrapper ||
      !outroLeft ||
      !outroRight
    )
      return;

    // gsap.context() scopes all tweens to this section and handles full
    // cleanup on unmount via ctx.revert() — kills all ScrollTriggers too.
    const ctx = gsap.context(() => {
      // ------------------------------------------------------------------
      // Initial states — set BEFORE the timeline is created so scrubbing
      // back to 0 is always correct.
      // ------------------------------------------------------------------

      // Outro halves: start collapsed to a point (scale 0), each clipped
      // to its respective screen half.
      gsap.set(outroLeft, {
        clipPath: "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)",
        scale: 0,
        xPercent: 0,
      });
      gsap.set(outroRight, {
        clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)",
        scale: 0,
        xPercent: 0,
      });

      // Image wrappers: CSS already sets transform: scale(0) and
      // clip-path collapsed. Set scale via GSAP so it owns the transform.
      images.forEach((img) => {
        gsap.set(img, {
          scale: 0,
          clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        });
      });

      // Images container wrapper stays at scale 1 — individual children animate.
      gsap.set(imagesWrapper, { scale: 1 });

      // ------------------------------------------------------------------
      // Master scrubbed timeline
      //
      // pinSpacing: false — we do NOT want ScrollTrigger to insert a spacer
      // div. Instead, home-page.tsx wraps HomeHero with a 600vh margin-top,
      // which creates the correct scroll space AND positions HomeHero so it
      // is revealed perfectly when the pin releases at 7×vh.
      // ------------------------------------------------------------------
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 7}`,
          pin: true,
          pinSpacing: false,
          scrub: true,
          invalidateOnRefresh: true,
          onLeave: (self) => {
            // ----------------------------------------------------------------
            // ONE-WAY GATE: freeze the four-phases animation and prevent the
            // user from ever scrolling back into it.
            //
            // Previous approach (layout surgery) caused a jump because:
            //   - Collapsing the section + resetting Lenis scroll position
            //     created a race condition between Lenis, GSAP, and
            //     framer-motion that snapped the page to Icons/News.
            //
            // This approach avoids ALL of that:
            //   1. Kill the GSAP scrub → section freezes at 100% progress
            //      (transparent bg, curtains slid apart, pointer-events none).
            //      No visible change — the section is already invisible.
            //   2. Record the current Lenis scroll position as the "floor"
            //      (= the exact point where HomeHero begins, ~7×vh).
            //   3. Attach a Lenis 'scroll' listener that snaps back to the
            //      floor the instant Lenis's position goes below it.
            //
            // No layout changes. No scroll resets. No jumps.
            // ----------------------------------------------------------------

            // Step 1: freeze the animation
            self.kill();

            // Step 2: record the floor (current scroll = HomeHero entry point)
            const lenis = (window as any).__lenis;
            const floor = lenis ? Math.round(lenis.scroll) : window.innerHeight * 7;

            // Step 3: enforce the floor on every Lenis tick
            if (lenis) {
              let prevScroll = floor;
              const enforceFloor = ({ scroll }: { scroll: number }) => {
                const goingUp = scroll < prevScroll;
                prevScroll = scroll;
                if (scroll < floor && goingUp) {
                  // Snap back to the floor — HomeHero entry point is the minimum
                  lenis.scrollTo(floor, { immediate: true });
                }
              };
              lenis.on("scroll", enforceFloor);
              // enforceFloor is intentionally permanent — it persists until the
              // next page reload, which resets the full four-phases experience.
            }
          },
        },
      });

      // Initial state: section has warm linen background and is interactive
      tl.set(section, { backgroundColor: "var(--color-bg-page)", pointerEvents: "auto" }, 0);

      // ------------------------------------------------------------------
      // Phase 1 (0 → 0.5): Background settles from 1.5× zoom to 1×
      // ------------------------------------------------------------------
      tl.to(bg, { scale: 1, ease: "none", duration: 0.5 }, 0);

      // ------------------------------------------------------------------
      // Phase 2 (0 → 0.5): Revealer slit expands to full screen
      //   Step A (0 → 0.2): 1px slit widens to 1% stripe, full height
      //   Step B (0.2 → 0.5): Stripe expands to cover full viewport
      // ------------------------------------------------------------------
      tl.to(
        revealer,
        {
          clipPath: "polygon(49.5% 0%, 50.5% 0%, 50.5% 100%, 49.5% 100%)",
          ease: "none",
          duration: 0.2,
        },
        0
      );
      tl.to(
        revealer,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "none",
          duration: 0.3,
        },
        0.2
      );

      // ------------------------------------------------------------------
      // Phase 3 (0.4 → ~0.56): Image cascade, then outro banner scales in
      // ------------------------------------------------------------------
      const cascadeStart = 0.4;
      const cascadeStagger = 0.04;
      const cascadeDuration = 0.16;

      images.forEach((img, i) => {
        tl.to(
          img,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scale: 1,
            ease: "none",
            duration: cascadeDuration,
          },
          cascadeStart + i * cascadeStagger
        );
      });

      // Outro banner scales in just after the last image finishes
      const outroRevealStart =
        cascadeStart + images.length * cascadeStagger + cascadeStagger * 0.5;

      tl.to(
        [outroLeft, outroRight],
        { scale: 1, ease: "none", duration: cascadeDuration },
        outroRevealStart
      );

      // ------------------------------------------------------------------
      // Phase 4 (0.7 → 1.0): Hide all layers, split outro apart
      //   - All hero layers snap to autoAlpha: 0 (opacity 0 + visibility hidden)
      //   - Section bg resolves to --color-bg-page (warm linen) so the
      //     canvas colour shows through as the outro halves slide apart
      //   - Left half slides off screen left, right half slides off screen right
      // ------------------------------------------------------------------
      tl.set(
        [bg, content, revealer, imagesWrapper],
        { autoAlpha: 0 },
        0.7
      );

      // Set section background to transparent and disable pointerEvents so the underlying
      // #F5F3EE page canvas and stationary SiteHeader (logo + nav links) show through
      // and remain interactive as the outro curtains slide apart.
      tl.set(
        section,
        { backgroundColor: "transparent", pointerEvents: "none" },
        0.7
      );

      // xPercent is a percentage of the element's OWN width (100vw).
      // Our elements use inset:0 (xPercent baseline = 0), so -100 and +100
      // each travel exactly 100vw — matching the original's effective movement.
      // (The original's -150/+50 assumed a -50 baseline from translate(-50%).)
      tl.to(outroLeft, { xPercent: -100, ease: "none", duration: 0.3 }, 0.7);
      tl.to(outroRight, { xPercent: 100, ease: "none", duration: 0.3 }, 0.7);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      // height: 100svh — uses small-viewport-height to avoid mobile chrome jank
      className="relative z-50 w-full overflow-hidden bg-[var(--color-bg-page)]"
      style={{ height: "100svh" }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Layer 1: Background image — starts zoomed in at scale(1.5)          */}
      {/* ------------------------------------------------------------------ */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{ transform: "scale(1.5)", transformOrigin: "center" }}
      >
        <img
          src={BG_SRC}
          alt=""
          className="w-full h-full object-cover object-center"
          draggable={false}
        />
        {/* Dark overlay so the headline text remains legible */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Layer 2: Headline text — masked line reveals (moved from HomeHero)  */}
      {/* ------------------------------------------------------------------ */}
      <div
        ref={contentRef}
        className="
          absolute inset-0 flex flex-col items-center justify-center w-full
          px-[var(--spacing-5)] lg:px-[var(--spacing-25)]
        "
      >
        <h1
          className="
            font-display font-normal tracking-tight
            text-6xl lg:text-9xl
            leading-[var(--leading-section)] lg:leading-[var(--leading-hero-desktop)]
            flex flex-col items-center text-center text-white
          "
        >
          {/* Line 1 */}
          <span className="overflow-hidden inline-block pb-[0.12em] -mb-[0.12em]">
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.4,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              The Emmy-Winning
            </motion.span>
          </span>

          {/* Line 2 — brand yellow */}
          <span className="overflow-hidden inline-block pb-[0.12em] -mb-[0.12em]">
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.4,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block text-[var(--color-brand-yellow)]"
            >
              Project Runway
            </motion.span>
          </span>

          {/* Line 3 */}
          <span className="overflow-hidden inline-block pb-[0.12em] -mb-[0.12em]">
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.4,
                delay: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              Is In Africa.
            </motion.span>
          </span>
        </h1>

        {/* Scroll-hint arrow — fades in after headlines settle, loops forever.  */}
        {/* Lives inside contentRef so GSAP's autoAlpha:0 hides it automatically */}
        {/* when the scroll sequence kicks in — no extra wiring needed.           */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
          className="mt-10 lg:mt-12 flex flex-col items-center gap-1.5 select-none"
          aria-hidden="true"
        >
          <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase font-sans">
            Scroll
          </span>
          {/* Inner div handles the infinite bob — separated from the fade-in */}
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.9, 0.35, 0.9] }}
            transition={{
              duration: 1.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--color-brand-yellow)]"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Layer 3: Revealer overlay — starts as invisible 1px centre slit     */}
      {/* ------------------------------------------------------------------ */}
      <div
        ref={revealerRef}
        className="absolute inset-0 w-full h-full bg-[var(--color-bg-page)] will-change-transform"
        style={{
          // 4-point polygon collapsed to a single invisible dot at centre
          clipPath: "polygon(49.5% 50%, 50.5% 50%, 50.5% 50%, 49.5% 50%)",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Layer 4: Cascading images wrapper                                   */}
      {/* ------------------------------------------------------------------ */}
      <div
        ref={imagesWrapperRef}
        className="absolute inset-0 w-full h-full"
      >
        {CASCADE_SRCS.map((src, i) => (
          <div
            key={i}
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            // Each image starts collapsed to a single point at the centre.
            // GSAP will animate clipPath + scale to full-screen reveal.
            className="absolute top-1/2 left-1/2 w-full h-full will-change-transform"
            style={{
              transform: "translate(-50%, -50%) scale(0)",
              transformOrigin: "center",
            }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Layer 5a: Outro — Left half (clipped to 0%–50% of screen width)    */}
      {/* Layer 5b: Outro — Right half (clipped to 50%–100% of screen width) */}
      {/*                                                                      */}
      {/* Together they look like one full-screen plum banner. GSAP slides    */}
      {/* them apart in Phase 4 to reveal HomeHero underneath.                */}
      {/* ------------------------------------------------------------------ */}
      {/* outroLeft + outroRight start at scale(0) via inline style to prevent  */}
      {/* a FOUC flash before useEffect runs and gsap.set() can hide them.       */}
      <div
        ref={outroLeftRef}
        className="
          absolute inset-0 w-full h-full
          flex items-center justify-center
          bg-[var(--color-bg-page)] will-change-transform
        "
        style={{ transform: "scale(0)" }}
      >
        <OutroContent />
      </div>
      <div
        ref={outroRightRef}
        className="
          absolute inset-0 w-full h-full
          flex items-center justify-center
          bg-[var(--color-bg-page)] will-change-transform
        "
        style={{ transform: "scale(0)" }}
      >
        <OutroContent />
      </div>
    </section>
  );
}
