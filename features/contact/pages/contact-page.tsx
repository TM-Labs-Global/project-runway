import { ContactHero, ContactForm } from "../components";
import { SiteHeader } from "@/shared/components/layout";

export function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[var(--color-bg-page)] font-sans relative">
      <SiteHeader />
      <ContactHero />
      <ContactForm />
    </main>
  );
}
