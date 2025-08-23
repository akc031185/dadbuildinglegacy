"use client";

import { homeContent } from "@/content/home";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      element.focus();
    }
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30"
      aria-label="Hero section"
    >
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            {homeContent.hero.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            {homeContent.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" role="group" aria-label="Main call-to-action buttons">
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg focus:ring-4 focus:ring-primary/20"
              onClick={() => scrollToSection("branches")}
              aria-describedby="explore-description"
            >
              Explore My Work
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-lg focus:ring-4 focus:ring-primary/20"
              onClick={() => scrollToSection("contact")}
              aria-describedby="contact-description"
            >
              Get In Touch
            </Button>
          </div>

          {/* Screen reader descriptions for buttons */}
          <div className="sr-only">
            <p id="explore-description">Navigate to the branches section to see my real estate, AI, and health projects</p>
            <p id="contact-description">Navigate to the contact form to send me a message</p>
          </div>

          <div className="mt-16" role="complementary" aria-label="Scroll indicator">
            <p className="text-sm text-muted-foreground mb-4">Scroll to discover more</p>
            <div className="animate-bounce" aria-hidden="true">
              <svg
                className="w-6 h-6 mx-auto text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Down arrow indicating more content below"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}