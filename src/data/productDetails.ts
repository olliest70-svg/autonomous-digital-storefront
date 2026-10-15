export interface Persona {
  title: string;
  description: string;
}

export interface ProductDetails {
  included: string[];
  audience: Persona[];
}

/** Rich detail-page content keyed by product id (see products.json). */
export const productDetails: Record<string, ProductDetails> = {
  prod_freelancer_business_os: {
    included: [
      "Client CRM tracker with contact history, status pipeline and lifetime value rollups",
      "Project scoping board with deliverables, milestones and deadline views",
      "Invoice templates and payment tracker with overdue alerts",
      "Quarterly tax estimator that sets aside the right amount from every payment",
      "Sales pipeline dashboard to forecast next month's revenue at a glance",
      "Weekly review system with guided prompts to plan the week in 20 minutes",
      "Video walkthrough and setup checklist to go live in under an hour",
    ],
    audience: [
      { title: "Independent freelancers", description: "Designers, writers and developers juggling multiple clients at once." },
      { title: "New freelancers", description: "Anyone leaving a 9-to-5 who wants solid business systems from day one." },
      { title: "Tool-fatigued solopreneurs", description: "People paying for five apps that don't talk to each other." },
      { title: "Notion fans", description: "Users who love Notion but don't want to build a business HQ from scratch." },
    ],
  },
  prod_ai_prompt_arsenal: {
    included: [
      "500+ tested prompts for ChatGPT and Claude, organised by use case",
      "Content creation pack: blog outlines, scripts, newsletters and repurposing prompts",
      "Client email library for proposals, follow-ups, scope changes and difficult conversations",
      "SEO copy prompts for meta descriptions, landing pages and keyword-clustered articles",
      "Social hook generator prompts for X, LinkedIn, Instagram and TikTok",
      "Coding assistant prompts for debugging, refactoring and writing documentation",
      "Fill-in-the-blank variable templates with a real before/after example for every prompt",
    ],
    audience: [
      { title: "Content creators", description: "YouTubers, bloggers and newsletter writers who want to publish faster." },
      { title: "Marketers & copywriters", description: "Professionals who need high-converting copy on tight deadlines." },
      { title: "Freelancers & agencies", description: "Service providers who want to deliver more client work in less time." },
      { title: "AI beginners", description: "Anyone tired of generic AI output who wants proven, ready-made prompts." },
    ],
  },
  prod_async_remote_blueprint: {
    included: [
      "Async standup templates that replace daily status calls with 3-minute written updates",
      "Decision-log framework so every choice is recorded, searchable and easy to explain",
      "Project handoff protocols for smooth work across time zones",
      "Meeting-cost calculator that shows the real cost of every recurring call",
      "Team communication charter that sets response-time and channel norms",
      "Notion workspace and portable Markdown versions for any tool stack",
    ],
    audience: [
      { title: "Remote team leads", description: "Managers running distributed teams across multiple time zones." },
      { title: "Startup founders", description: "Founders who want to scale without filling everyone's calendar with meetings." },
      { title: "Engineering & product managers", description: "Leaders who need focus time protected for their makers." },
      { title: "Ops & people teams", description: "People rolling out async-first ways of working across a company." },
    ],
  },
  prod_creator_content_os: {
    included: [
      "Multi-channel editorial calendar for YouTube, newsletters and social media",
      "Idea capture pipeline that takes rough ideas all the way to published content",
      "Repurposing workflow that turns one long-form piece into 10+ short posts",
      "Performance tracker to log views, CTR, open rates and growth across channels",
      "Brand-voice swipe file with tone guidelines and examples of top-performing hooks",
      "Production checklists for scripting, recording, editing and publishing",
      "Sponsor and collaboration tracker to manage brand deals",
    ],
    audience: [
      { title: "YouTubers", description: "Creators who want a consistent upload schedule without the chaos." },
      { title: "Newsletter writers", description: "Writers who want to repurpose every issue across social channels." },
      { title: "Multi-platform creators", description: "Creators building an audience on three or more channels at once." },
      { title: "Creator teams", description: "Small teams of editors and writers who need one shared source of truth." },
    ],
  },
  prod_adhd_focus_flow: {
    included: [
      "Visual 'Today Board' that shows only what matters right now",
      "3-priority daily focus system that stops overwhelm before it starts",
      "Dopamine-menu break selector with healthy, quick reset activities",
      "Time-blindness helpers: visual timers, time-boxing and transition reminders",
      "Brain-dump inbox that catches every thought without derailing your focus",
      "Gentle weekly reset ritual that doesn't make you feel guilty",
      "Quick-start guide written by an ADHD coach",
    ],
    audience: [
      { title: "Adults with ADHD", description: "People diagnosed (or self-identified) who struggle with standard planners." },
      { title: "Neurodivergent professionals", description: "Knowledge workers who need structure that works with their brain." },
      { title: "Students", description: "Learners juggling deadlines who find it hard to start and finish tasks." },
      { title: "Coaches & therapists", description: "Practitioners looking for a practical tool to recommend to clients." },
    ],
  },
  prod_solopreneur_finance_vault: {
    included: [
      "Invoice tracker that logs every invoice and its payment status",
      "Automatic quarterly estimated-tax calculator with set-aside recommendations",
      "Real-time profit dashboard showing your true take-home pay",
      "Expense categoriser with deductible-expense tagging",
      "Income-by-client and income-by-month breakdown charts",
      "Notion workspace plus a linked Google Sheets workbook",
      "Setup notes for US, UK and Canadian tax rules",
    ],
    audience: [
      { title: "Freelancers", description: "Self-employed creatives and developers who dread tax season." },
      { title: "Consultants", description: "Independent advisors who need a clear view of profitability." },
      { title: "Indie hackers", description: "Builders with side-project revenue who want simple finance tracking." },
      { title: "DIY bookkeepers", description: "Solopreneurs who want to manage their own numbers without an accountant." },
    ],
  },
  prod_client_onboarding_accelerator: {
    included: [
      "Branded client welcome page template you can customise in minutes",
      "Auto-populated project scope tracker with deliverables and timelines",
      "Client intake questionnaire to gather everything up front",
      "Revision-request form that keeps feedback organised and in scope",
      "Communication guidelines covering channels, response times and working hours",
      "Single Notion share-link delivery, so there's no client login to set up",
    ],
    audience: [
      { title: "Freelance designers & developers", description: "Service providers who want to look professional from the first touchpoint." },
      { title: "Small agencies", description: "Teams onboarding several new clients every month." },
      { title: "Coaches & consultants", description: "Experts who want a polished, repeatable client welcome experience." },
      { title: "Virtual assistants", description: "VAs who need clear scope and communication rules with every client." },
    ],
  },
  prod_pkm_knowledge_base: {
    included: [
      "Zettelkasten-inspired linked-notes database that builds your knowledge graph",
      "PARA folder setup (Projects, Areas, Resources, Archive)",
      "Progressive-summarisation templates for books, articles and podcasts",
      "Reading-notes and bookmark capture inbox",
      "Weekly review rituals that turn notes into insights and action",
      "30-page quick-start guide with example workflows",
    ],
    audience: [
      { title: "Knowledge workers", description: "Professionals drowning in information who want to retain what matters." },
      { title: "Researchers & students", description: "People who need to connect ideas across sources for papers and projects." },
      { title: "Writers & creators", description: "Anyone who wants a steady supply of ideas from everything they read." },
      { title: "Lifelong learners", description: "Curious readers who want their notes to build on each other over time." },
    ],
  },
};
