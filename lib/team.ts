// The people at MiraiTech, shown on /team and in a few other places.

export interface TeamLink {
  label: string
  href:  string
}

export interface TeamMember {
  slug:     string
  name:     string
  role:     string
  initials: string
  avatar?:  string   // square image in /images/team
  summary:  string   // one line, used on the home page
  bio:      string
  skills:   string[]
  links:    TeamLink[]
}

export const LEAD: TeamMember = {
  slug:     'hiroshi-kaji',
  name:     'Hiroshi Kaji',
  role:     'Lead Engineer',
  initials: 'HK',
  avatar:   '/images/team/hiroshi-kaji-avatar.webp',
  summary:  'Runs each project from scoping to launch and is the first person clients talk to.',
  bio:
    'Hiroshi leads MiraiTech. On each project Hiroshi designs the architecture, writes much of the web and API code, and reviews every deployment. Because the person who agrees the scope is also the one responsible for shipping it, nothing gets lost in a handover. Based in Tokyo, working with teams in Japan and abroad.',
  skills:   ['AI architecture', 'LLM agents', 'RAG', 'TypeScript', 'React', 'Next.js', 'Python', 'System design'],
  links: [
    { label: 'Portfolio', href: 'https://tokyotech.me/' },
    { label: 'Email',     href: 'mailto:contact@mirai-tech.net' },
  ],
}

export const TEAM: TeamMember[] = [
  {
    slug:     'kenta-aizawa',
    name:     'Kenta Aizawa',
    role:     'GenAI & Backend Engineer',
    initials: 'KA',
    avatar:   '/images/team/kenta-aizawa-avatar.webp',
    summary:  'Builds the agent and backend layer, and looks after models once they are in production.',
    bio:
      'Kenta worked on backend systems for several years before moving into generative AI. At MiraiTech that means the agent and orchestration layer: LangChain and LangGraph flows, tool calling, and the operational work around them. Models are versioned, monitored and rolled back like any other dependency. Kenta also looks after the cloud setup on AWS Bedrock, SageMaker and Azure AI.',
    skills:   ['LangChain', 'LangGraph', 'Python', 'AWS Bedrock', 'SageMaker', 'MLOps', 'Cloud architecture'],
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
    summary:  'Builds the pipelines and warehouses the models read from, and keeps the data clean.',
    bio:
      'Hiroki owns ingestion, transformation and the data-quality checks that keep bad records away from the models. That covers the pipelines and warehouses our retrieval systems read from, and the infrastructure code that makes every environment reproducible. Turning messy legacy data into something you can query is a specialty.',
    skills:   ['Python', 'dbt', 'Airflow', 'BigQuery', 'PostgreSQL', 'Terraform', 'Data modeling'],
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hiroki-yumisashi-982606422/' },
    ],
  },
]

export const ALL_MEMBERS = [LEAD, ...TEAM]

const NUMBER_WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

/** "three", for sentences like "MiraiTech is three engineers in Tokyo" */
export const TEAM_SIZE_WORD = NUMBER_WORDS[ALL_MEMBERS.length] ?? String(ALL_MEMBERS.length)

export const HOW_WE_WORK = [
  {
    title: 'You talk to the engineers',
    description:
      'The engineer who discusses your requirements is the one who builds them. There is no account manager in between and no handover to a junior team.',
  },
  {
    title: 'Japanese or English',
    description:
      'Documentation, standups and code review happen in whichever language your team prefers. Mixed teams get both.',
  },
  {
    title: 'Done means running in production',
    description:
      'A project is finished when it is deployed, monitored and cleanly handed over. A good demo that never reaches real users does not count.',
  },
]
