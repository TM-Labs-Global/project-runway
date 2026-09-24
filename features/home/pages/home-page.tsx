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
        The 600vh margin-top compensates for the missing ScrollTrigger spacer.
        Pin scroll distance = 7×vh, FourPhasesHero height = 1×vh → gap = 6×vh.
        This ensures HomeHero's top edge aligns with the viewport exactly when
        the FourPhasesHero pin releases at the end of 7×vh of scrolling.
      */}
      <div id="home-hero-wrapper" style={{ marginTop: "600vh" }}>
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

