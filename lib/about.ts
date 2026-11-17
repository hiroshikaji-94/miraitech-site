// Content for the About page.

export const PRINCIPLES = [
  {
    title: 'Measure before and after',
    description:
      'Every AI feature gets an evaluation set before it gets a prompt. If we cannot measure whether a change helped, we do not ship it.',
  },
  {
    title: 'Prefer boring technology',
    description:
      'Postgres before a new database, a script before a platform. A new tool has to show it solves a problem the old one could not.',
  },
  {
    title: 'Plan for the model being wrong',
    description:
      'Models time out, return the wrong format and are sometimes confidently wrong. We decide up front how each case is handled and where a person checks the result.',
  },
  {
    title: 'Write things down',
    description:
      'Decisions, trade-offs and runbooks are documented as we go, in Japanese or English, so your team can run the system without us.',
  },
]

export const TIMELINE = [
  {
    year: '2022',
    title: 'Started in Nakano, Tokyo',
    description: 'Three engineers with backgrounds in web and data systems set up MiraiTech.',
  },
  {
    year: '2023',
    title: 'First LLM feature in production',
    description: 'We shipped our first language model feature to real users. From then on, AI and data work were part of most projects.',
  },
  {
    year: '2024',
    title: 'Opened the AI Lab',
    description:
      'We started running experiments between client projects, and signed our first multi-year client: a manufacturer whose visual inspection system is still in production.',
  },
  {
    year: '2025',
    title: 'From single features to agent systems',
    description:
      'Most new work became multi-agent systems for support, sales and internal tools. We wrote down the review and handover practice that every project now follows.',
  },
  {
    year: '2026',
    title: 'Agents in daily use',
    description:
      'Agent systems now run every day inside client teams. We spend about as much time on evaluation and monitoring as on prompts.',
  },
]

// Questions on the home page. Answers only repeat facts stated elsewhere on the site.
export const FAQ = [
  {
    question: 'Who does the work?',
    answer:
      'The three of us: Hiroshi Kaji, Kenta Aizawa and Hiroki Yumisashi. There is no account manager in between and no handover to a junior team. The engineer who discusses your requirements is one of the people building them.',
  },
  {
    question: 'Can we work in Japanese?',
    answer:
      'Yes. Documentation, standups and code review happen in whichever language your team prefers. Mixed teams get both.',
  },
  {
    question: 'What kinds of projects do you take on?',
    answer:
      'New products, AI added to an existing system, and longer partnerships. Most of our work is search, support and document tools on language models, with the data pipelines and web apps around them. If we are not the right team for the job, we will tell you.',
  },
  {
    question: 'How do you know the AI is working?',
    answer:
      'Every AI feature gets an evaluation set before it gets a prompt. Each change to retrieval or prompts gets a score, and a deploy that lowers it is blocked in CI.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'A project is finished when it is deployed, monitored and handed over. We write down decisions, trade-offs and runbooks as we go, so your team can run the system without us.',
  },
  {
    question: 'How do we start?',
    answer:
      'Send an email with a few sentences about the problem, a rough timeline and any constraints, such as where the data has to stay. We reply within one business day.',
  },
]

export const TOOLS = [
  { area: 'Models and agents', tools: ['Claude', 'OpenAI', 'Gemini', 'open-weight models on Ollama', 'LangGraph', 'LangChain', 'PydanticAI', 'PyTorch'] },
  { area: 'Retrieval and data', tools: ['PostgreSQL and pgvector', 'Qdrant', 'BigQuery', 'dbt', 'Airflow', 'ClickHouse', 'Redis'] },
  { area: 'Product',            tools: ['TypeScript', 'Next.js', 'React', 'FastAPI', 'Node.js'] },
  { area: 'Infrastructure',     tools: ['AWS (Bedrock, SageMaker)', 'Google Cloud', 'Azure', 'Docker', 'Terraform', 'GitHub Actions', 'OpenTelemetry'] },
]
