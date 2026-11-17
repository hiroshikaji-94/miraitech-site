/**
 * Team members shown on /team and referenced across the site.
 */

export interface TeamLink {
  label: string
  href:  string
}

export interface TeamMember {
  slug:      string
  name:      string
  role:      string
  initials:  string
  avatar?:   string   // /images/team/<name>-avatar.webp (square)
  tagline?:  string
  bio:       string
  skills:    string[]
  links:     TeamLink[]
}

// ─── Leadership ──────────────────────────────────────────────────

export const LEAD: TeamMember = {
  slug:     'hiroshi-kaji',
  name:     'Hiroshi Kaji',
  role:     'Lead Engineer',
  initials: 'HK',
  avatar:   '/images/team/hiroshi-kaji-avatar.webp',
  bio:
    'Leads MiraiTech to prove that a small, senior team can ship AI systems that hold up in production. Works hands-on across the stack — designing agent and retrieval architectures, building the interfaces people actually use, reviewing every deployment, and staying the direct contact for every client. Based in Tokyo, working with teams in Japan and abroad.',
  skills:   ['AI Architecture', 'LLM Agents', 'RAG', 'TypeScript', 'React', 'Next.js', 'Python', 'System Design'],
  links: [
    { label: 'Portfolio', href: 'https://tokyotech.me/' },
    { label: 'Email',     href: 'mailto:contact@mirai-tech.net' },
  ],
}

// ─── Engineers ───────────────────────────────────────────────────

export const TEAM: TeamMember[] = [
  {
    slug:     'kenta-aizawa',
    name:     'Kenta Aizawa',
    role:     'GenAI & Backend Engineer',
    initials: 'KA',
    avatar:   '/images/team/kenta-aizawa-avatar.webp',
    tagline:  'Treats the model as one dependency among many.',
    bio:
      'Years of backend work, now focused on generative AI. Designs the agent and orchestration layer for AI products — LangChain and LangGraph flows, tool calling, and the MLOps around them. Models get versioned, monitored, and rolled back like any other dependency. Also owns cloud architecture across AWS Bedrock, SageMaker, and Azure AI.',
    skills:   ['LangChain', 'LangGraph', 'Python', 'AWS Bedrock', 'SageMaker', 'MLOps', 'Cloud Architecture'],
    links: [
      { label: 'Portfolio', href: 'https://chai-dev.vercel.app/' },
    ],
  },
  {
    slug:     'hiroki-yumisashi',
    name:     'Hiroki Yumisashi',
    role:     'Data Engineer',
    initials: 'HY',
    avatar:   '/images/team/hiroki-yumisashi-avatar.webp',
    tagline:  'Builds the data foundation the models rely on.',
    bio:
      'Owns ingestion, transformation, and the data-quality checks that keep bad data away from models. Builds the pipelines and warehouses that retrieval systems read from, plus infrastructure-as-code for reproducible environments. Has a habit of turning messy legacy records into queryable data.',
    skills:   ['Python', 'dbt', 'Airflow', 'BigQuery', 'PostgreSQL', 'Terraform', 'Data Modelling'],
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hiroki-yumisashi-982606422/' },
    ],
  },
]

export const ALL_MEMBERS = [LEAD, ...TEAM]

// ─── Working principles ──────────────────────────────────────────

export const HOW_WE_WORK = [
  {
    title: 'The people who scope it, build it',
    description:
      'The engineer who discusses your requirements is the one who ships them. No handover to a junior bench, so context is never lost between calls and code.',
  },
  {
    title: 'Bilingual by default',
    description:
      'Documentation, standups, and code review happen in Japanese or English — whichever your team prefers. Mixed teams get both.',
  },
  {
    title: 'Production is the finish line',
    description:
      'Success means deployed, monitored, and cleanly handed over. An impressive demo that never reaches real users does not count.',
  },
]
