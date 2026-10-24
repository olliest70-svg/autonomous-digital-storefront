export interface ProductHighlight {
  headline: string;
  body: string;
}

/**
 * Benefit-voice product highlights shown on each product detail page.
 * These are product copy, not customer reviews: no names, ratings or "verified" claims.
 */
export const productHighlights: Record<string, ProductHighlight> = {
  prod_freelancer_business_os: {
    headline: "Transform how you run your freelance business",
    body: "Swap scattered spreadsheets for one unified Client CRM, Invoice Tracker, Project Board and Tax Estimator, and win back hours every week. The Weekly Review template helps you reset for the week ahead.",
  },
  prod_ai_prompt_arsenal: {
    headline: "The ultimate cheat code for daily workflow efficiency",
    body: "500+ structured prompts covering content creation, email drafting, SEO, social media and coding, in one comprehensive prompt library. Before/after examples show you exactly how to tailor output for professional results.",
  },
  prod_async_remote_blueprint: {
    headline: "Essential for any remote-first team",
    body: "Cut unnecessary weekly meetings from your distributed team's calendar. The Handoff Protocols, Comms Charter and Decision Logs keep everyone aligned without pinging Slack all day, and the Meeting Cost Calculator shows what every meeting really costs.",
  },
  prod_creator_content_os: {
    headline: "The ultimate operating system for content creators",
    body: "Stop feeling overwhelmed by multiple social platforms and streamline everything in one place. The Repurposing Workflow and Idea Pipeline help you produce more content without burnout, and the Brand Voice Swipe File keeps everything consistent.",
  },
  prod_adhd_focus_flow: {
    headline: "A productivity framework built for neurodivergent brains",
    body: "Designed for people standard productivity systems never stuck with. The Dopamine Menu and Brain Dump Inbox help you get moving, and the Daily Focus System grounds your mornings without overwhelming you with endless task lists.",
  },
  prod_solopreneur_finance_vault: {
    headline: "Take the stress out of tax prep and financial tracking",
    body: "Handling taxes and cash flow as a one-person business doesn't have to feel daunting. The multi-country Tax Calculator (US/UK/CA) and Profit Dashboard give you complete visibility over your real income, and the Expense Categoriser makes tax season hassle-free.",
  },
  prod_client_onboarding_accelerator: {
    headline: "Instantly raise the professional bar for your client work",
    body: "Give clients an organised, seamless onboarding experience from day one. The 35-question Intake Questionnaire and Scope Tracker stop scope creep right out of the gate. Built for service providers looking to scale.",
  },
  prod_pkm_knowledge_base: {
    headline: "Clutter-free personal knowledge management",
    body: "If you struggle with organising notes and research, this is the blueprint you need. The PARA setup, coupled with the Progressive Summarisation and Linking guides, turns a chaotic notebook into a second brain.",
  },
};
