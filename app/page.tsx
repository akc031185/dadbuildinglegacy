import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Simplified homepage for deployment - components temporarily disabled */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Dad Building Legacy
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Real estate investor & private lender • AI learner • Health journey. 
            Building legacy through creative finance, AI tools, and health transformation.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Real Estate</h3>
              <p className="text-muted-foreground text-sm">
                Creative finance strategies, subject-to deals, and private lending
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">AI Tools</h3>
              <p className="text-muted-foreground text-sm">
                Exploring AI automation and tools for real estate and business
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Health Journey</h3>
              <p className="text-muted-foreground text-sm">
                Weight loss transformation and building sustainable habits
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-lg font-medium">🤖 AI Agents Available</p>
            <p className="text-muted-foreground">Domain Sherpa confirmed working! Site Builder, Logo Brandsmith, and GHL Opportunity coming online soon.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link 
                href="/build-my-site" 
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
              >
                Build My Site
              </Link>
              <Link 
                href="/journal" 
                className="border border-input bg-background px-6 py-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Journal
              </Link>
              <Link 
                href="/legal" 
                className="border border-input bg-background px-6 py-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Legal
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              Contact: abhi@askdbl.com | 
              <a href="https://instagram.com/dadbuildinglegacy" className="hover:text-foreground ml-1" target="_blank" rel="noopener noreferrer">
                Instagram
              </a> | 
              <a href="https://linkedin.com/in/abhishek-choudhary" className="hover:text-foreground ml-1" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}