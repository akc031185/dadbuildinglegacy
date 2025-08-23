import { homeContent } from "@/content/home";
import { BranchCard } from "@/components/BranchCard";

export function BranchesSection() {
  const realEstateIcon = (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4" />
    </svg>
  );

  const aiIcon = (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const healthIcon = (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );

  return (
    <section id="branches" tabIndex={-1} className="py-20 focus:outline-none" aria-labelledby="branches-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="branches-heading" className="text-3xl md:text-4xl font-bold mb-6">
            Three Pillars of Legacy Building
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My journey focuses on three interconnected areas that compound to build lasting wealth, health, and knowledge.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <BranchCard
            title={homeContent.branches.realEstate.title}
            description={homeContent.branches.realEstate.description}
            links={homeContent.branches.realEstate.links}
            note={homeContent.branches.realEstate.note}
            icon={realEstateIcon}
          />

          <BranchCard
            title={homeContent.branches.ai.title}
            description={homeContent.branches.ai.description}
            action={homeContent.branches.ai.action}
            actionLink="/journal?tag=ai"
            icon={aiIcon}
          />

          <BranchCard
            title={homeContent.branches.health.title}
            description={homeContent.branches.health.description}
            action={homeContent.branches.health.action}
            actionLink="/journal?tag=health"
            icon={healthIcon}
          />
        </div>
      </div>
    </section>
  );
}