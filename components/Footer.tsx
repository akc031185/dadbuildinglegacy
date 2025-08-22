import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Dad Building Legacy</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Building wealth, health, and knowledge through real estate investing, AI exploration, and personal growth.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2 text-sm">
              <Link href="/journal" className="block text-muted-foreground hover:text-foreground transition-colors">
                Journal
              </Link>
              <Link href="/legal" className="block text-muted-foreground hover:text-foreground transition-colors">
                Legal & Disclosures
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">External Sites</h4>
            <nav className="space-y-2 text-sm">
              <Link 
                href="https://equinestventures.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                EquiNest Ventures
              </Link>
              <Link 
                href="https://fundyourfixandflip.com"
                target="_blank"
                rel="noopener noreferrer" 
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Fund Your Fix & Flip
              </Link>
              <Link 
                href="https://investoraiclub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Investor AI Club
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <nav className="space-y-2 text-sm">
              <Link 
                href="https://instagram.com/dadbuildinglegacy"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Instagram
              </Link>
              <Link 
                href="https://linkedin.com/in/abhishek-choudhary"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </Link>
              <Link 
                href="mailto:info@askdbl.com"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                info@askdbl.com
              </Link>
            </nav>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Dad Building Legacy. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">
            Built with Next.js • Hosted on Vercel • Email via Zoho
          </p>
        </div>
      </div>
    </footer>
  );
}