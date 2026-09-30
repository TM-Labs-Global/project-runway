import { ContactHero, ContactForm } from "../components";
import { SiteHeader, Footer } from "@/shared/components/layout";

export function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white font-sans relative">
      <SiteHeader />
      <ContactHero />
      <ContactForm />
      <Footer />
    </main>
  );
}

