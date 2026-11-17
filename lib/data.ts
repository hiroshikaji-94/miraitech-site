// Projects, articles and AI Lab experiments shown across the site.
// Case-study detail lives in project-details.ts and experiment-details.ts.

// Projects

export type ProjectFilter = 'All' | 'AI' | 'Full Stack' | 'Tools'

export const PROJECT_FILTERS: ProjectFilter[] = ['All', 'AI', 'Full Stack', 'Tools']

export interface ProjectData {
  slug:        string
  title:       string
  summary:     string
  overview:    string
  category:    ProjectFilter
  stack:       string[]
  featured:    boolean
  coverImage:  string
  images:      string[]
  github?:     string
  liveUrl?:    string
  status:      'live' | 'wip' | 'archived'
  year:        number
  highlights:  string[]     // results, most important first
  order:       number
}

export const ALL_PROJECTS: ProjectData[] = [
  {
    slug:       'production-rag-enterprise-search',
    title:      'Search over company documents',
    summary:    'Answers questions from handbooks, wikis and PDF archives, with a citation for every claim. Hybrid retrieval and an evaluation gate in CI keep the quality from slipping.',
    overview:   'Employees ask a question and get an answer in about two seconds, with links to the exact pages it came from. Behind it is hybrid retrieval with reranking, and a test suite that blocks any deploy that lowers accuracy.',
    category:   'AI',
    stack:      ['Next.js 15', 'FastAPI', 'pgvector', 'ColBERT', 'Claude 3.5 Sonnet', 'PydanticAI', 'LlamaParse', 'DeepEval'],
    featured:   true,
    coverImage: '/images/projects/02_1.webp',
    images:     ['/images/projects/02_1.webp', '/images/projects/02_2.webp', '/images/projects/02_3.webp'],
    status:     'live',
    year:       2025,
    highlights: ['92% F1 score', '2.1 s response time', '10k queries a day at $0.02 each'],
    order:      1,
  },
  {
    slug:       'bilingual-support-agent',
    title:      'Bilingual support agent',
    summary:    'A LINE and web chat agent for a Japanese retailer. It answers routine tickets in Japanese or English and passes the rest to staff with a short summary, so customers never repeat themselves.',
    overview:   "The agent replies in whichever language the customer writes in. It answers from the retailer's policy and product documents and cites them. When it cannot resolve a case, it hands over to a person with a structured summary instead of a raw transcript.",
    category:   'AI',
    stack:      ['LangGraph', 'Claude Sonnet 4', 'Next.js 15', 'FastAPI', 'pgvector', 'LINE Messaging API', 'Redis', 'Zendesk API'],
    featured:   true,
    coverImage: '/images/projects/bilingual-support-agent-1.webp',
    images:     ['/images/projects/bilingual-support-agent-1.webp', '/images/projects/bilingual-support-agent-2.webp', '/images/projects/bilingual-support-agent-3.webp'],
    status:     'live',
    year:       2025,
    highlights: ['71% of tier-1 tickets resolved without staff', '1.9 s median time to first token', 'Handoffs in either language with nothing retyped'],
    order:      2,
  },
  {
    slug:       'factory-vision-qa',
    title:      'Visual inspection on a factory line',
    summary:    'Defect detection for a Japanese manufacturer. Inference runs at the edge in 38 ms per frame, and operators can see why each part was flagged.',
    overview:   'Cameras watch parts on a moving line. A detection model flags surface and assembly defects as they pass, and the operator dashboard shows the frame, a heatmap and the reason, so a person can confirm or override the call in a few seconds.',
    category:   'AI',
    stack:      ['PyTorch', 'YOLOv8', 'FastAPI', 'Next.js 15', 'ClickHouse', 'Redis', 'OpenTelemetry', 'Docker'],
    featured:   true,
    coverImage: '/images/projects/factory-vision-qa-1.webp',
    images:     ['/images/projects/factory-vision-qa-1.webp', '/images/projects/factory-vision-qa-2.webp', '/images/projects/factory-vision-qa-3.webp'],
    status:     'live',
    year:       2024,
    highlights: ['99.1% defect recall', '38 ms per frame on an edge GPU', '60% fewer manual inspections'],
    order:      3,
  },
  {
    slug:       'openclaw-ai-agent',
    title:      'Executive assistant agent',
    summary:    'An assistant that works across Slack, Google Calendar, GitHub and email. People ask for things in plain language. It plans the steps and asks before doing anything risky.',
    overview:   'A personal agent for busy executives, in the style of OpenClaw. It takes requests from Slack or SMS, breaks them into steps, and hands each step to a sub-agent for calendars, travel, messages, code or the CRM. Anything that spends money or changes code waits for a person to approve it.',
    category:   'AI',
    stack:      ['LangGraph', 'Claude Sonnet 4', 'Gemini 2.5 Pro', 'Next.js 15', 'Neon Postgres', 'pgvector', 'Slack API', 'Twilio'],
    featured:   true,
    coverImage: '/images/projects/01_1.webp',
    images:     ['/images/projects/01_1.webp', '/images/projects/01_2.webp', '/images/projects/01_3.webp'],
    status:     'live',
    year:       2026,
    highlights: ['7 specialized sub-agents', 'Approval step for risky actions', 'About $75k a year of assistant time saved per client'],
    order:      4,
  },
  {
    slug:       'meeting-intelligence-platform',
    title:      'Bilingual meeting notes',
    summary:    'Records meetings in Japanese and English, writes a summary in both languages, and posts action items with owners to Slack and Notion within two minutes of the call ending.',
    overview:   'Built for teams that switch between Japanese and English in the same call. It transcribes with speaker labels, summarizes in both languages, pulls out decisions and action items with owners and due dates, and sends them to the tools the team already uses.',
    category:   'AI',
    stack:      ['Whisper v3', 'Claude 3.5 Sonnet', 'PydanticAI', 'Next.js 15', 'FastAPI', 'pgvector', 'Neon Postgres', 'Slack API'],
    featured:   false,
    coverImage: '/images/projects/meeting-intelligence-platform-1.webp',
    images:     ['/images/projects/meeting-intelligence-platform-1.webp', '/images/projects/meeting-intelligence-platform-2.webp', '/images/projects/meeting-intelligence-platform-3.webp'],
    status:     'live',
    year:       2024,
    highlights: ['Transcripts in Japanese and English', 'Action items in Slack within 2 minutes', 'About 6 hours a week saved per project manager'],
    order:      5,
  },
  {
    slug:       'ai-business-workflow-automator',
    title:      'Sales pipeline automation',
    summary:    'Qualifies inbound leads, updates the CRM, books demos and runs follow-up emails. It now handles about 85% of the work an SDR used to do by hand.',
    overview:   'Website leads come in, the system scores their intent, updates HubSpot, books a demo through Calendly, tells the sales rep and runs the follow-up sequence. People step in for the conversations that need them.',
    category:   'AI',
    stack:      ['LangGraph', 'Claude Sonnet 4', 'HubSpot API', 'Calendly', 'Supabase', 'Next.js 15', 'SendGrid', 'Stripe'],
    featured:   false,
    coverImage: '/images/projects/10_1.webp',
    images:     ['/images/projects/10_1.webp', '/images/projects/10_2.webp', '/images/projects/10_3.webp'],
    status:     'live',
    year:       2026,
    highlights: ['85% of SDR tasks automated', '93% qualification accuracy', '$187k of pipeline from 1,000 leads a month'],
    order:      6,
  },
  {
    slug:       'llm-eval-monitoring-dashboard',
    title:      'LLM monitoring dashboard',
    summary:    'Tracks accuracy, latency, cost and toxicity for more than 10k model calls a day, and stops a deploy when evaluation scores drop.',
    overview:   'An observability dashboard for AI features in production. It records accuracy, latency, cost and toxicity for every model call, updates live, and is wired into CI so a release that scores below 90% on evaluations does not ship.',
    category:   'Full Stack',
    stack:      ['Next.js 15', 'Tremor', 'ClickHouse', 'OpenTelemetry', 'DeepEval', 'RAGAS', 'PagerDuty', 'Vercel Edge'],
    featured:   false,
    coverImage: '/images/projects/09_1.webp',
    images:     ['/images/projects/09_1.webp', '/images/projects/09_2.webp', '/images/projects/09_3.webp'],
    status:     'live',
    year:       2026,
    highlights: ['10k+ model calls a day', 'Dashboard refreshes every 100 ms', 'Deploys blocked below a 90% eval score'],
    order:      7,
  },
  {
    slug:       'multi-agent-code-reviewer',
    title:      'Pull request review agents',
    summary:    'Paste a pull request link and three agents review it. One plans the review, one looks for bugs, and one writes fixes with tests and leaves comments.',
    overview:   'Three agents work through a GitHub pull request in turn. The planner writes a checklist, the analyzer looks for bugs with help from Semgrep and CodeQL, and the fixer proposes changes with unit tests.',
    category:   'Tools',
    stack:      ['LangGraph', 'Claude 3.5 Sonnet', 'Semgrep', 'CodeQL', 'GitHub API', 'Pytest', 'Neon Postgres'],
    featured:   false,
    coverImage: '/images/projects/07_1.webp',
    images:     ['/images/projects/07_1.webp', '/images/projects/07_2.webp', '/images/projects/07_3.webp'],
    status:     'live',
    year:       2025,
    highlights: ['87% bug catch rate', '92% test coverage', '7x faster than manual review'],
    order:      8,
  },
  {
    slug:       'local-slm-coding-assistant',
    title:      'Offline coding assistant',
    summary:    "A VS Code assistant that runs on the developer's laptop with Qwen 2.5, Llama 3.3 or Mistral Small. No API bills, and the code never leaves the machine.",
    overview:   'An offline coding assistant for VS Code. It runs small open-weight models on the laptop itself, so it costs nothing per request and works without a network connection.',
    category:   'Tools',
    stack:      ['Ollama', 'PyTorch', 'Qwen 2.5', 'Llama 3.3', 'Mistral', 'Tauri', 'WebGPU', 'VS Code LSP'],
    featured:   false,
    coverImage: '/images/projects/05_1.webp',
    images:     ['/images/projects/05_1.webp', '/images/projects/05_2.webp', '/images/projects/05_3.webp'],
    status:     'live',
    year:       2025,
    highlights: ['85% pass@1 on HumanEval', '120 tokens per second', 'Under 8 GB of RAM'],
    order:      9,
  },
  {
    slug:       'ai-trading-terminal',
    title:      'Trading terminal with AI signals',
    summary:    'A trading dashboard with live candles, more than 25 technical indicators, model-generated signals, paper trading and backtesting.',
    overview:   'A dashboard for SPY and TSLA with one-minute candles, more than 25 technical indicators, buy and sell signals from a language model, paper trading and portfolio analytics.',
    category:   'Full Stack',
    stack:      ['Next.js 15', 'FastAPI', 'WebSockets', 'Redis', 'Claude 3.5 Sonnet', 'Recharts', 'TA-Lib', 'Clerk'],
    featured:   false,
    coverImage: '/images/projects/03_1.webp',
    images:     ['/images/projects/03_1.webp', '/images/projects/03_2.webp', '/images/projects/03_3.webp'],
    status:     'live',
    year:       2024,
    highlights: ['Charts update every 15 seconds', 'Sharpe ratio above 1.8 in backtests', 'Paper trading built in'],
    order:      10,
  },
]

export const FEATURED_PROJECTS = ALL_PROJECTS.filter((p) => p.featured)

// Writing

export type BlogCategory = 'All' | 'AI Engineering' | 'Full Stack' | 'System Design' | 'DevTools' | 'Career'
export const BLOG_CATEGORIES: BlogCategory[] = ['All', 'AI Engineering', 'Full Stack', 'System Design', 'DevTools', 'Career']

export type ContentBadge = 'code' | 'architecture' | 'diagram' | 'tutorial' | 'comparison' | 'deep-dive'

export interface BlogPostData {
  slug:          string
  title:         string
  summary:       string
  category:      BlogCategory
  tags:          string[]
  publishedAt:   string       // ISO date
  readingTime:   number       // minutes
  featured:      boolean
  coverImage?:   string
  contentBadges: ContentBadge[]
}

export const ALL_POSTS: BlogPostData[] = [
  {
    slug:          'building-production-rag',
    title:         'Notes on running RAG in production',
    summary:       'What we learned running RAG for thousands of queries a day: hybrid retrieval, chunking messy documents, evaluation in CI, and the metrics we watch.',
    category:      'AI Engineering',
    tags:          ['RAG', 'LLM', 'Production', 'pgvector', 'Evaluation'],
    publishedAt:   '2026-02-20',
    readingTime:   12,
    featured:      true,
    contentBadges: ['architecture', 'code', 'diagram', 'comparison'],
  },
  {
    slug:          'multi-agent-systems-langgraph',
    title:         'How we structure multi-agent systems in LangGraph',
    summary:       'Why we moved from single agents to multi-agent graphs, and how we handle state, error recovery and tool routing after 18 months in production.',
    category:      'AI Engineering',
    tags:          ['LangGraph', 'Agents', 'LLM', 'Architecture'],
    publishedAt:   '2026-01-15',
    readingTime:   10,
    featured:      false,
    contentBadges: ['architecture', 'diagram', 'code'],
  },
  {
    slug:          'nextjs-architecture-at-scale',
    title:         'How we organize large Next.js codebases',
    summary:       'How we organize routes and features in large Next.js apps, where the server and client boundary goes, data fetching, middleware, and what we got wrong at first.',
    category:      'Full Stack',
    tags:          ['Next.js', 'React', 'TypeScript', 'Architecture'],
    publishedAt:   '2025-11-10',
    readingTime:   9,
    featured:      false,
    contentBadges: ['architecture', 'code', 'diagram'],
  },
  {
    slug:          'prompt-engineering-beyond-basics',
    title:         'How we test and tune prompts',
    summary:       'Structured chain-of-thought and outputs, few-shot calibration, prompt versioning, and the evaluation a prompt change goes through before production.',
    category:      'AI Engineering',
    tags:          ['LLM', 'Prompt Engineering', 'Pydantic', 'Evaluation'],
    publishedAt:   '2025-09-18',
    readingTime:   8,
    featured:      false,
    contentBadges: ['code', 'comparison', 'tutorial'],
  },
  {
    slug:          'vector-databases-compared',
    title:         'pgvector, Pinecone and Qdrant on the same workload',
    summary:       'We ran one production workload on three vector databases and compared latency, recall, cost and how much work each one was to operate.',
    category:      'AI Engineering',
    tags:          ['Vector DB', 'pgvector', 'Pinecone', 'Benchmarks'],
    publishedAt:   '2025-07-22',
    readingTime:   11,
    featured:      false,
    contentBadges: ['comparison', 'diagram', 'code'],
  },
  {
    slug:          'scaling-websocket-connections',
    title:         'Getting WebSockets to 100k concurrent connections',
    summary:       "What we changed when a client's real-time collaboration platform grew from 2,000 to 40,000 daily users: Redis pub/sub, sticky sessions, backpressure and monitoring.",
    category:      'System Design',
    tags:          ['WebSockets', 'Redis', 'Scaling', 'Real-time'],
    publishedAt:   '2025-05-14',
    readingTime:   10,
    featured:      false,
    contentBadges: ['architecture', 'diagram', 'deep-dive'],
  },
  {
    slug:          'type-safe-apis-trpc-nextjs',
    title:         'End-to-end types with tRPC and Next.js',
    summary:       'Why we replaced REST controllers with tRPC, how we structure routers, handle errors and write tests, and when we would not use it.',
    category:      'Full Stack',
    tags:          ['tRPC', 'TypeScript', 'Next.js', 'API Design'],
    publishedAt:   '2025-03-10',
    readingTime:   7,
    featured:      false,
    contentBadges: ['code', 'tutorial'],
  },
  {
    slug:          'cicd-for-ai-applications',
    title:         'Putting evals in CI',
    summary:       'How we test model output in CI: pipeline stages, dataset versioning, feature flags for models, cost checks, and rolling back a regression.',
    category:      'DevTools',
    tags:          ['CI/CD', 'AI', 'Testing', 'DeepEval', 'MLOps'],
    publishedAt:   '2025-01-20',
    readingTime:   9,
    featured:      false,
    contentBadges: ['architecture', 'code', 'diagram'],
  },
  {
    slug:          'fine-tuning-llms-practical-guide',
    title:         "When we fine-tune, and when we don't",
    summary:       'How we choose between prompting, RAG and fine-tuning, and what a LoRA project involves: preparing data, training settings, evaluation and cost.',
    category:      'AI Engineering',
    tags:          ['Fine-tuning', 'LLM', 'LoRA', 'Training'],
    publishedAt:   '2024-12-01',
    readingTime:   14,
    featured:      false,
    contentBadges: ['deep-dive', 'comparison', 'code', 'diagram'],
  },
  {
    slug:          'developer-tools-that-changed-workflow',
    title:         'Tools we kept using in 2024',
    summary:       'The tools we picked up in 2024 and still use: Cursor, Turborepo, Biome, Linear and tRPC, plus the ones we tried and dropped.',
    category:      'DevTools',
    tags:          ['Tools', 'Productivity', 'DX', 'Review'],
    publishedAt:   '2024-11-15',
    readingTime:   6,
    featured:      false,
    contentBadges: ['comparison', 'tutorial'],
  },
  {
    slug:          'from-prototype-to-production',
    title:         'The work between a prototype and production',
    summary:       'What a working demo still needs before real users arrive: error handling, database migrations, monitoring, security, performance work and a readiness checklist.',
    category:      'Career',
    tags:          ['Production', 'Engineering', 'Career', 'Best Practices'],
    publishedAt:   '2024-10-08',
    readingTime:   8,
    featured:      false,
    contentBadges: ['deep-dive'],
  },
  {
    slug:          'local-llm-development-setup',
    title:         'Our local LLM setup',
    summary:       'Why and how we run models locally: Ollama, GPU memory, wiring local models into the dev stack and tests, and what it cost over six months.',
    category:      'AI Engineering',
    tags:          ['Local LLM', 'Ollama', 'Development', 'Setup'],
    publishedAt:   '2024-08-25',
    readingTime:   7,
    featured:      false,
    contentBadges: ['tutorial', 'code'],
  },
]

export const LATEST_POSTS = ALL_POSTS.slice(0, 3)

// AI Lab

export type ExperimentFilter = 'All' | 'LLM' | 'Agent' | 'RAG' | 'Vision' | 'Automation'
export const EXPERIMENT_FILTERS: ExperimentFilter[] = ['All', 'LLM', 'Agent', 'RAG', 'Vision', 'Automation']

export type ExperimentStatus = 'live' | 'research'

export interface ExperimentData {
  slug:        string
  title:       string
  summary:     string
  description: string       // longer text for the detail page
  category:    ExperimentFilter
  status:      ExperimentStatus
  stack:       string[]
  models:      string[]
  metrics?:    string[]     // results, most important first
  github?:     string
  liveUrl?:    string
  order:       number
}

export const ALL_EXPERIMENTS: ExperimentData[] = [
  {
    slug:        'local-llm-code-reviewer',
    title:       'Local LLM code reviewer',
    summary:     'Code review from models running on your own machine. No code is sent to an external API.',
    description: 'A VS Code extension that reviews diffs with models served by Ollama on the laptop. It points out likely bugs, suggests changes and leaves inline comments without sending code anywhere.',
    category:    'LLM',
    status:      'live',
    stack:       ['Ollama', 'Python', 'AST', 'FastAPI', 'Tree-sitter'],
    models:      ['Qwen 2.5 72B', 'Llama 3.3 70B', 'CodeLlama'],
    metrics:     ['85% bug detection rate', '2.9 s average response', 'No API cost'],
    order:       1,
  },
  {
    slug:        'voice-to-sql-agent',
    title:       'Voice-to-SQL agent',
    summary:     'Ask a database a question out loud and get back the query, the result and a short explanation.',
    description: 'Whisper turns speech into text, GPT-4o writes the SQL through function calling, the query runs against the database, and the answer comes back in plain language. Queries are checked against the schema before they run.',
    category:    'Agent',
    status:      'live',
    stack:       ['Whisper', 'FastAPI', 'SQLite', 'React', 'LangChain'],
    models:      ['GPT-4o', 'Whisper Large-v3'],
    metrics:     ['94% query accuracy', '1.2 s from speech to result', 'Queries checked against the schema'],
    order:       2,
  },
  {
    slug:        'rag-evaluation-harness',
    title:       'RAG evaluation harness',
    summary:     'A benchmark suite that compares chunking strategies, embedding models and retrieval methods on 12 metrics.',
    description: 'A framework for testing RAG pipelines against question sets with known answers. It compares fixed, semantic and recursive chunking; OpenAI, Cohere and open-source embeddings; and dense, sparse and hybrid retrieval.',
    category:    'RAG',
    status:      'live',
    stack:       ['Python', 'DeepEval', 'RAGAS', 'pgvector', 'Streamlit'],
    models:      ['Claude Sonnet', 'GPT-4o', 'all-MiniLM-L6'],
    metrics:     ['12 metrics', '6 chunking strategies', '4 embedding models'],
    order:       3,
  },
  {
    slug:        'multi-agent-debate',
    title:       'Multi-agent debate',
    summary:     'Three agents argue different sides of a question. A judge agent then weighs the arguments and writes a conclusion.',
    description: "Three agents take the roles of proponent, opponent and devil's advocate and argue over several rounds. A judge scores each argument on logic, evidence and novelty, then writes a balanced conclusion. We use it to compare how different models reason.",
    category:    'Agent',
    status:      'live',
    stack:       ['LangGraph', 'Next.js', 'Redis', 'WebSockets'],
    models:      ['Claude Sonnet', 'GPT-4o', 'Gemini 2.5 Pro'],
    metrics:     ['3 rounds per debate', 'Streams while it runs', 'Models compared side by side'],
    order:       4,
  },
  {
    slug:        'document-vision-parser',
    title:       'Document vision parser',
    summary:     'Pulls structured fields out of receipts, invoices and forms with vision models, without OCR templates.',
    description: 'Vision models read the layout of a document and return the fields as JSON, with a confidence score and bounding box for each one. It handles receipts, invoices, tax forms and business cards without a template per format.',
    category:    'Vision',
    status:      'live',
    stack:       ['GPT-4o Vision', 'FastAPI', 'Pydantic', 'React', 'Canvas API'],
    models:      ['GPT-4o Vision', 'Claude Vision'],
    metrics:     ['96% field accuracy', '1.8 s per document', 'No templates to maintain'],
    order:       5,
  },
  {
    slug:        'agent-memory-system',
    title:       'Agent memory',
    summary:     'A long-term memory layer for agents, with episodic, semantic and procedural memory and a forgetting curve.',
    description: 'Research into how agents can keep useful memory over months. Episodic memory stores conversations with an importance score, semantic memory stores extracted facts and relationships, and procedural memory stores learned preferences. A forgetting curve stops the store from growing without limit.',
    category:    'Agent',
    status:      'research',
    stack:       ['Python', 'pgvector', 'NetworkX', 'LangGraph', 'Neo4j'],
    models:      ['Claude Sonnet', 'all-MiniLM-L6'],
    metrics:     ['3 memory types', 'Ebbinghaus forgetting curve', 'Graph-based retrieval'],
    order:       6,
  },
  {
    slug:        'realtime-sentiment-stream',
    title:       'Real-time sentiment stream',
    summary:     'Sentiment scoring on streaming text such as social feeds, chat and support tickets, in under 100 ms per message.',
    description: 'A fine-tuned DistilBERT model classifies each message in under 100 ms. Kafka handles ingestion at more than 10,000 messages a second, and a live dashboard shows the sentiment mix, trends and anomaly alerts.',
    category:    'LLM',
    status:      'live',
    stack:       ['DistilBERT', 'Kafka', 'FastAPI', 'Next.js', 'ClickHouse'],
    models:      ['DistilBERT (fine-tuned)', 'RoBERTa'],
    metrics:     ['94% accuracy', 'Under 100 ms per message', '10k messages a second'],
    order:       7,
  },
  {
    slug:        'pdf-to-knowledge-graph',
    title:       'PDF to knowledge graph',
    summary:     'Turns a PDF into a browsable graph of entities, relationships and the passages they came from.',
    description: 'A pipeline that extracts entities, relationships and claims from PDFs with a language model, stores them in Neo4j and draws them with D3. Every node links back to its source passage. We have used it on papers, contracts and technical specs.',
    category:    'RAG',
    status:      'live',
    stack:       ['Neo4j', 'LlamaParse', 'D3.js', 'Next.js', 'FastAPI'],
    models:      ['Claude Sonnet', 'GPT-4o'],
    metrics:     ['Entity extraction F1 of 0.89', 'Interactive graph view', 'Every node linked to its source'],
    order:       8,
  },
  {
    slug:        'browser-automation-agent',
    title:       'Browser automation agent',
    summary:     'Give it a goal in plain English and it drives a real browser to navigate sites, fill in forms and collect data.',
    description: 'A Playwright agent that reads each page with a vision model and decides what to click or type next. It can follow multi-step instructions such as "find the cheapest USB-C hub with at least four stars and add it to the cart".',
    category:    'Automation',
    status:      'live',
    stack:       ['Playwright', 'GPT-4o Vision', 'Python', 'LangGraph', 'Redis'],
    models:      ['GPT-4o Vision', 'Claude Sonnet'],
    metrics:     ['78% task completion', 'Multi-step navigation', 'Reads pages visually'],
    order:       9,
  },
  {
    slug:        'prompt-optimization-lab',
    title:       'Prompt optimization lab',
    summary:     'Improves prompts automatically with a genetic algorithm, then checks each gain with an A/B test against an eval suite.',
    description: 'Starting from a base prompt and a scoring function, it mutates and recombines prompts over several generations and keeps the best ones. A change is only accepted when an A/B test shows the improvement is statistically significant.',
    category:    'LLM',
    status:      'research',
    stack:       ['Python', 'DSPy', 'DeepEval', 'Streamlit', 'Redis'],
    models:      ['Claude Sonnet', 'GPT-4o', 'Gemini 2.5 Pro'],
    metrics:     ['15% average accuracy gain', 'Genetic search over prompts', 'Significance testing'],
    order:       10,
  },
]

export const LATEST_EXPERIMENTS = ALL_EXPERIMENTS.slice(0, 3)

// The four kinds of work we take on, shown on the home and about pages.

export const SERVICES = [
  {
    title:       'Search and answers over your documents',
    description: 'Retrieval over manuals, contracts, tickets and wikis, with citations people can check. We build the evaluation set first, so every change to retrieval or prompts gets a score.',
    tools:       ['pgvector', 'Hybrid search', 'Reranking', 'DeepEval'],
  },
  {
    title:       'Agents and workflow automation',
    description: 'Assistants that read, decide and act inside the tools you already use: support inboxes, CRMs, calendars, code review. Anything risky waits for a person to approve it.',
    tools:       ['LangGraph', 'Tool calling', 'Claude', 'OpenAI'],
  },
  {
    title:       'Data pipelines',
    description: 'Ingestion, cleaning and modeling, so the model reads current and correct data. This is usually the slowest part of a project and the one that decides how good the answers are.',
    tools:       ['Python', 'dbt', 'Airflow', 'BigQuery', 'PostgreSQL'],
  },
  {
    title:       'Web applications',
    description: 'The product around the model: interfaces, APIs, sign-in, billing and the admin screens your staff will use every day.',
    tools:       ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL'],
  },
]

// Display labels for the filter values above
export const CATEGORY_LABELS: Record<string, string> = {
  'AI':             'AI',
  'Full Stack':     'Full stack',
  'Tools':          'Tools',
  'AI Engineering': 'AI engineering',
  'System Design':  'System design',
  'DevTools':       'Dev tools',
  'Career':         'Career',
  'LLM':            'LLM',
  'Agent':          'Agents',
  'RAG':            'RAG',
  'Vision':         'Vision',
  'Automation':     'Automation',
  'All':            'All',
}

export const label = (value: string) => CATEGORY_LABELS[value] ?? value
