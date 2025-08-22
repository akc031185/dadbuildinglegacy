import { Nav } from "@/components/Nav";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { BranchesSection } from "@/components/BranchesSection";
import { JournalPreview } from "@/components/JournalPreview";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
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