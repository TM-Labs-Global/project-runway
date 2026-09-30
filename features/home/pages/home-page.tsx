import { IntroLoader, HomeHero, GetReady, BoldIdeas, Directors, Icons, News } from "../components";
import { Footer, SiteHeader } from "@/shared/components/layout";
import { SmoothBackgroundSequence } from "@/shared/components/ui";

export function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-[var(--bg-page)] font-sans relative">
      <IntroLoader />
      <SiteHeader />
      <HomeHero />
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


