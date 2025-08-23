import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Legal Disclosures & Privacy Policy - Dad Building Legacy",
  description: "Legal information, affiliations, lending disclaimers, and privacy policy for Dad Building Legacy.",
};

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Legal Disclosures & Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: December 2024
            </p>
          </header>

          <div className="space-y-12">
            {/* Affiliations */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Business Affiliations</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Real Estate Platforms</h3>
                  <p className="text-muted-foreground mb-4">
                    I own and operate the following real estate investment platforms:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li><strong>EquiNest Ventures</strong> (equinestventures.com) - Real estate investment platform</li>
                    <li><strong>Fund Your Fix & Flip</strong> (fundyourfixandflip.com) - Fix and flip financing</li>
                    <li><strong>Investor AI Club</strong> (investoraiclub.com) - AI tools for real estate investors</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">CreativeListing.com Disclosure</h3>
                  <p className="text-muted-foreground">
                    I hold a partial ownership interest in CreativeListing.com, a platform for creative real estate marketing. 
                    Any references to creative real estate strategies or marketing may indirectly benefit this business interest.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Community Memberships</h3>
                  <p className="text-muted-foreground">
                    I am an active member of:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li><strong>SubTo Community</strong> - Subject-to real estate investing education and networking</li>
                    <li><strong>Gator Community</strong> - Real estate investment and creative finance strategies</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            {/* Lending Disclaimer */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Private Lending Disclaimer</h2>
              
              <div className="bg-muted/30 p-6 rounded-lg mb-6">
                <p className="font-medium mb-2">⚠️ Important Legal Notice</p>
                <p className="text-sm text-muted-foreground">
                  The following disclaimers are required by law and are important for your protection.
                </p>
              </div>

              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Not Investment Advice:</strong> Content on this website regarding real estate investing, 
                  private lending, or financial strategies is for educational and informational purposes only. 
                  It does not constitute investment, legal, or financial advice.
                </p>

                <p>
                  <strong>Private Lending Activities:</strong> Any private lending activities referenced are 
                  conducted between private parties and are not regulated banking activities. All lending 
                  involves risk of loss, and past performance does not guarantee future results.
                </p>

                <p>
                  <strong>Licensing Disclaimer:</strong> I am not a licensed financial advisor, securities dealer, 
                  or registered investment advisor. Always consult with qualified professionals before making 
                  investment decisions.
                </p>

                <p>
                  <strong>Risk Warning:</strong> Real estate investing and private lending involve substantial 
                  risk, including the potential loss of principal. Market conditions, economic factors, and 
                  individual property performance can significantly impact returns.
                </p>

                <p>
                  <strong>No Guarantees:</strong> No representations or warranties are made regarding the 
                  accuracy of information, potential returns, or success of any investment strategy discussed.
                </p>
              </div>
            </section>

            <Separator />

            {/* Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Privacy Policy</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Information We Collect</h3>
                  <p className="text-muted-foreground mb-4">
                    When you use our contact form or interact with our website, we may collect:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Name and email address (when provided voluntarily)</li>
                    <li>Message content and topic selection</li>
                    <li>Basic website usage analytics (via Vercel Analytics)</li>
                    <li>IP address for security and rate limiting purposes</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">How We Use Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>To respond to your inquiries and messages</li>
                    <li>To improve our website and content</li>
                    <li>To prevent spam and abuse</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Information Sharing</h3>
                  <p className="text-muted-foreground">
                    We do not sell, trade, or rent your personal information to third parties. 
                    We may share information only when required by law or to protect our rights and safety.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Data Security</h3>
                  <p className="text-muted-foreground">
                    We implement appropriate security measures to protect your information, including 
                    encrypted data transmission and secure email handling via Zoho Mail.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Cookies and Tracking</h3>
                  <p className="text-muted-foreground">
                    This website uses minimal tracking for analytics purposes. We do not use advertising 
                    cookies or share data with advertising networks.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Your Rights</h3>
                  <p className="text-muted-foreground">
                    You may request access to, correction of, or deletion of your personal information 
                    by contacting us at abhi@askdbl.com.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  For questions about these disclosures, privacy practices, or any legal matters:
                </p>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p><strong>Email:</strong> abhi@askdbl.com</p>
                  <p><strong>Website:</strong> dadbuildinglegacy.com</p>
                  <p><strong>Response Time:</strong> Typically within 24-48 hours</p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Updates */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Policy Updates</h2>
              
              <p className="text-muted-foreground">
                This page may be updated periodically to reflect changes in our practices or legal requirements. 
                The "Last updated" date at the top of this page indicates when changes were last made. 
                Continued use of this website after updates constitutes acceptance of any changes.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t text-center">
            <p className="text-sm text-muted-foreground">
              This legal page was last reviewed and updated in December 2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}