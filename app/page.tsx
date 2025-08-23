import { Nav } from "@/components/Nav";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { BranchesSection } from "@/components/BranchesSection";
import { JournalPreview } from "@/components/JournalPreview";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SkipLink } from "@/components/SkipLink";
import { FocusManager } from "@/components/FocusManager";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SkipLink />
      <FocusManager />
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <BranchesSection />
        <JournalPreview />
        <ContactForm />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}