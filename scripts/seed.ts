// Load environment variables first
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import connectToDatabase from "@/lib/db";
import Post from "@/models/Post";

const samplePosts = [
  {
    title: "Building My First AI Agent with Claude",
    slug: "building-first-ai-agent-claude",
    excerpt: "Documenting my journey learning to build AI agents using Claude Code and exploring how this can enhance my real estate business workflows.",
    content: `# Building My First AI Agent with Claude

As someone deeply involved in real estate investing, I've been fascinated by the potential of AI agents to streamline and enhance business operations. Today, I'm documenting my first serious attempt at building an AI agent using Claude Code.

## The Problem I'm Solving

Managing real estate deals involves a lot of repetitive analysis:
- Property valuation comparisons
- Market rent analysis
- Deal structuring scenarios
- Due diligence checklists

I spend hours each week doing similar calculations and research for different properties. This seems like the perfect use case for an AI agent.

## My Approach with Claude Code

Claude Code has been a game-changer for this project. Here's what I've learned:

### 1. Starting Simple
Instead of trying to build a comprehensive tool immediately, I started with a single function: automated property analysis based on address and basic metrics.

### 2. Iterative Development
Claude Code's interactive approach allowed me to:
- Test ideas quickly
- Refine the logic iteratively
- Debug issues in real-time

### 3. Integration with Existing Tools
The agent now connects with:
- Public property data APIs
- My existing spreadsheet templates
- Market analysis tools I already use

## Results So Far

The initial version can:
- Pull basic property data from an address
- Calculate preliminary ROI scenarios
- Generate a structured analysis report
- Flag potential red flags for manual review

## Next Steps

1. **Enhanced Data Sources**: Integrate with MLS data and more comprehensive property databases
2. **Deal Comparison**: Build functionality to compare multiple properties side-by-side
3. **Market Analysis**: Add neighborhood and market trend analysis
4. **Automation**: Connect with my CRM to automatically analyze new leads

## Key Takeaways

- AI agents don't need to be perfect to be useful
- Starting with your actual pain points leads to better solutions
- Claude Code makes the development process surprisingly accessible
- Real estate + AI has massive potential for efficiency gains

This is just the beginning. The combination of domain expertise and AI tools feels like a superpower for real estate investors.

*What business processes are you excited to enhance with AI? Let me know your thoughts!*`,
    tags: ["ai"],
    published: true
  },
  {
    title: "Weight Loss Progress: Month 3 Update",
    slug: "weight-loss-month-3-update", 
    excerpt: "Three months into my weight loss journey. Sharing what's working, what isn't, and the lessons learned about consistency and mindset.",
    content: `# Weight Loss Progress: Month 3 Update

Three months ago, I committed to transforming my health as part of building my overall legacy. Here's an honest update on my progress, challenges, and what I've learned.

## The Numbers

**Starting Stats (3 months ago):**
- Weight: 195 lbs
- Body Fat: ~25%
- Waist: 38 inches

**Current Stats:**
- Weight: 170 lbs (-25 lbs!)
- Body Fat: ~18%
- Waist: 34 inches

## What's Working

### 1. Intermittent Fasting (16:8)
This has been the biggest game-changer. Eating between 12pm-8pm has:
- Simplified meal planning
- Reduced mindless snacking
- Improved energy levels
- Made calorie management easier

### 2. Daily Walks
Starting every day with a 30-minute walk has become non-negotiable. It's:
- Great for mental clarity (I listen to real estate podcasts)
- Low-impact and sustainable
- A consistent habit that anchors my day

### 3. Meal Prep Sundays
Spending 2 hours every Sunday preparing meals for the week:
- Eliminates decision fatigue during busy days
- Ensures healthy options are always available
- Saves money compared to eating out

## The Challenges

### 1. Business Travel
Real estate networking events and property visits often involve irregular schedules and restaurant meals. I'm still figuring out how to maintain consistency during travel weeks.

### 2. Stress Eating
High-stress days (deal negotiations, problem properties) still trigger old eating habits. Working on alternative stress management techniques.

### 3. Social Situations
Family gatherings and business dinners remain challenging. Learning to navigate these without completely derailing progress.

## Key Lessons Learned

### Consistency > Perfection
Having 80% good days beats trying for 100% perfect days and failing. Progress compounds even when it's not perfect.

### Systems > Motivation
Relying on motivation is a losing strategy. Building systems and habits that work even when motivation is low is crucial.

### Health = Wealth
The energy and mental clarity from better health directly impacts my business performance. This isn't just about appearance—it's about capability.

## Looking Ahead: Next 3 Months

### Goals:
- Reach 165 lbs (additional 5 lbs)
- Add strength training 3x/week
- Complete a 10K run
- Maintain current habits during business travel

### New Strategies:
- Gym membership for strength training
- Travel meal planning system
- Stress management techniques (meditation, breathing exercises)
- Regular body composition measurements

## The Bigger Picture

This health journey is interconnected with everything else I'm building. Better health means:
- More energy for real estate deals
- Clearer thinking for AI projects
- Setting a good example for my family
- Building confidence and discipline that carries over to all areas

The last three months have proven that sustainable change is possible with the right systems and mindset.

*What health goals are you working on? Share your challenges and wins—we're all in this together!*`,
    tags: ["health"],
    published: true
  },
  {
    title: "Creative Finance Deal Analysis: Subject-To Strategy",
    slug: "creative-finance-subject-to-analysis",
    excerpt: "Breaking down a recent subject-to deal opportunity and the key factors I analyze when evaluating these creative finance strategies.",
    content: `# Creative Finance Deal Analysis: Subject-To Strategy

As a member of the SubTo community, I've been diving deep into subject-to deals as a way to acquire properties with minimal upfront cash. Today I'm breaking down a recent deal analysis to share my evaluation process.

## The Property

**Location**: Suburban neighborhood, Texas  
**Property**: 3 bed/2 bath, 1,450 sqft  
**Asking Price**: $180,000  
**Current Loan Balance**: $165,000  
**Monthly Payment**: $1,247 (PITI)  
**Market Rent**: $1,650/month

## Initial Analysis

### The Numbers
- **Monthly Cash Flow**: $1,650 - $1,247 = $403
- **Equity Position**: $180,000 - $165,000 = $15,000
- **Cash-on-Cash ROI**: Difficult to calculate with minimal down payment
- **1% Rule**: $1,650 / $180,000 = 0.92% (slightly below ideal)

### Red Flags to Investigate
1. **Loan Terms**: Need to verify if assumable or if bank has due-on-sale clause enforcement history
2. **Seller Motivation**: Why are they willing to do subject-to?
3. **Property Condition**: Deferred maintenance that could impact cash flow?
4. **Neighborhood Trends**: Is this area appreciating or declining?

## Due Diligence Process

### 1. Legal Structure
- Consult with attorney familiar with subject-to deals
- Understand state-specific laws and risks
- Structure proper contracts and disclosures
- Plan for potential due-on-sale clause acceleration

### 2. Property Inspection
- Professional inspection for major systems
- Estimate any immediate repair costs
- Evaluate long-term maintenance needs
- Check for code violations or liens

### 3. Financial Verification
- Verify loan balance and payment history
- Check for any missed payments or defaults
- Understand PMI requirements and when it drops off
- Review property taxes and insurance costs

### 4. Market Analysis
- Comparable sales in last 6 months
- Rental comps for similar properties  
- Neighborhood growth patterns
- School district ratings and changes

## Risk Assessment

### Primary Risks:
1. **Due-on-Sale Clause**: Bank could call the loan due
2. **Seller Issues**: If seller has financial problems post-sale
3. **Property Management**: Vacancy, repairs, bad tenants
4. **Market Downturn**: Property value or rent decreases

### Risk Mitigation:
- Title insurance and proper legal documentation
- Seller financial counseling and ongoing communication
- Professional property management company
- Adequate reserves for vacancies and repairs

## Decision Framework

### Go Criteria:
- Monthly cash flow of at least $300 after all expenses
- Seller has clear motivation and stable situation
- Property inspection shows good condition
- Strong rental market in the area
- Legal structure provides adequate protection

### No-Go Criteria:
- Negative or minimal cash flow
- Seller in active foreclosure or bankruptcy
- Major property issues requiring significant investment
- Declining neighborhood or rental market
- Legal risks outweigh potential benefits

## This Deal's Outcome

After full analysis:
- **Property condition**: Good, minor cosmetic updates needed (~$3,000)
- **Seller motivation**: Job relocation, legitimate need to transfer payment responsibility
- **Legal review**: Acceptable risk profile with proper documentation
- **Financial**: $350/month positive cash flow after reserves

**Decision**: Moving forward with the deal

## Lessons for Other Investors

### 1. Systems Over Emotion
Having a consistent evaluation framework prevents getting caught up in the excitement of a "good deal."

### 2. Legal Protection is Worth the Cost
Attorney and title insurance costs are small compared to the risks they mitigate.

### 3. Conservative Cash Flow Projections
Always assume higher vacancy rates and maintenance costs than you initially estimate.

### 4. Seller Relationship Matters
Subject-to deals require ongoing relationships. Choose sellers you can trust and communicate with effectively.

## The Bigger Picture

Subject-to deals are just one tool in the creative finance toolkit. They work best when:
- You have adequate experience and legal support
- The seller has genuine motivation beyond just wanting out
- The numbers work conservatively
- You have systems for ongoing management

This deal will likely close next month, and I'll share updates on the actual experience versus projections.

*Are you exploring creative finance strategies? What's been your biggest challenge or success? Let's discuss in the comments.*`,
    tags: ["ai"],
    published: true
  }
];

async function seedDatabase() {
  try {
    console.log("🌱 Connecting to database...");
    await connectToDatabase();
    console.log("✅ Connected to database");

    console.log("🧹 Clearing existing posts...");
    await Post.deleteMany({});
    console.log("✅ Cleared existing posts");

    console.log("📝 Creating sample posts...");
    const createdPosts = await Post.insertMany(samplePosts);
    console.log(`✅ Created ${createdPosts.length} posts`);

    console.log("\n📊 Seed Summary:");
    console.log("==================");
    
    for (const post of createdPosts) {
      console.log(`📄 ${post.title}`);
      console.log(`   Slug: ${post.slug}`);
      console.log(`   Tags: ${post.tags.join(", ")}`);
      console.log(`   Published: ${post.published}`);
      console.log("");
    }

    console.log("🎉 Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();