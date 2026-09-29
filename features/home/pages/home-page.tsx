import { FourPhasesHero, HomeHero, GetReady, BoldIdeas, Directors, Icons, News } from "../components";
import { Footer, SiteHeader } from "@/shared/components/layout";
import { SmoothBackgroundSequence } from "@/shared/components/ui";

export function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-[var(--bg-page)] font-sans relative">
      {/* Decoupled Site Header (hidden behind pinned intro, unveiled during outro split) */}
      <SiteHeader />

      {/* Phase 1–4 pinned intro (pinSpacing: false — no spacer div inserted) */}
      <FourPhasesHero />

      {/*
        The margin-top compensates for the missing ScrollTrigger spacer (pinSpacing: false).
        GSAP pin distance = 7 × window.innerHeight (= 7 × svh on iOS).
        FourPhasesHero section height = 100svh.
        Gap needed = 7×svh − 1×svh = 6×svh.
        BUT: the margin uses `vh` which on iOS Safari equals `lvh` (large), NOT `svh`.
        So the exact cross-browser formula is: 700vh − 100svh.
        On desktop (svh = vh): 700vh − 100vh = 600vh ← identical to before.
        On iOS Safari (svh < vh): margin grows to bridge the svh/lvh gap precisely.
      */}
      <div id="home-hero-wrapper" style={{ marginTop: "calc(700vh - 100svh)" }}>
        <HomeHero />
      </div>

      <GetReady />
      <BoldIdeas />

      {/* Unified seamless scroll-driven background transition across Directors -> Icons -> News */}
      <SmoothBackgroundSequence>
        <Directors />
        <Icons />
        <News />
      </SmoothBackgroundSequence>

      <Footer />
    </main>
  );
}

