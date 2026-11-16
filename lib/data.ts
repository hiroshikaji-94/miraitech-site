/**
 * MiraiTech site content data.
 * TODO: Migrate to MDX content files for full detail pages.
 */

// ─── Project Category Types ──────────────────────────────────────

export type ProjectFilter = 'All' | 'AI' | 'Full Stack' | 'Tools'

export const PROJECT_FILTERS: ProjectFilter[] = ['All', 'AI', 'Full Stack', 'Tools']

// ─── All Projects ────────────────────────────────────────────────

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
  highlights:  string[]     // key metrics / results
  order:       number
}

export const ALL_PROJECTS: ProjectData[] = [
  {
    slug:       'openclaw-ai-agent',
    title:      'OpenClaw-style Personal AI Agent',
    summary:    'Autonomous AI executive assistant that connects to Slack, Calendar, GitHub, and email — handling your daily workflow through natural language.',
    overview:   'This autonomous AI agent acts as your digital executive assistant, connecting directly to your Slack, Google Calendar, GitHub, and email to handle your entire daily workflow through simple natural language commands.',
    category:   'AI',
    stack:      ['LangGraph', 'Claude 4 Sonnet', 'Gemini 2.5 Pro', 'Next.js 15', 'Neon Postgres', 'pgvector', 'Slack API', 'Twilio'],
    featured:   true,
    coverImage: '/images/projects/01_1.webp',
    images:     ['/images/projects/01_1.webp', '/images/projects/01_2.webp', '/images/projects/01_3.webp'],
    github:     'https://github.com',
    liveUrl:    'https://example.com',
    status:     'live',
    year:       2026,
    highlights: ['7 specialized sub-agents', 'Human-in-loop for high-risk actions', '$75k/year EA savings per client'],
    order:      1,
  },
  {
    slug:       'production-rag-enterprise-search',
    title:      'Production RAG Enterprise Search',
    summary:    'Instant-answer engine over company documents with 92% accuracy, hybrid retrieval, source citations, and eval-gated deployments.',
    overview:   'Transform your company\'s scattered documents into an instant-answer engine that delivers 92% accurate responses with source citations in under 2 seconds.',
    category:   'AI',
    stack:      ['Next.js 15', 'FastAPI', 'pgvector', 'ColBERT', 'Claude 3.5 Sonnet', 'PydanticAI', 'LlamaParse', 'DeepEval'],
    featured:   true,
    coverImage: '/images/projects/02_1.webp',
    images:     ['/images/projects/02_1.webp', '/images/projects/02_2.webp', '/images/projects/02_3.webp'],
    github:     'https://github.com',
    liveUrl:    'https://example.com',
    status:     'live',
    year:       2025,
    highlights: ['92% F1 accuracy', '2.1s response time', '10k queries/day at $0.02/query'],
    order:      2,
  },
  {
    slug:       'ai-trading-terminal',
    title:      'AI Trading Terminal',
    summary:    'Professional-grade trading dashboard with live candles, 25+ technical indicators, AI-powered signals, paper trading, and backtesting.',
    overview:   'Professional-grade trading dashboard showing live SPY/TSLA 1-minute candles with 25+ technical indicators, AI-powered buy/sell signals, paper trading simulation, and portfolio analytics that rival Bloomberg Terminal.',
    category:   'Full Stack',
    stack:      ['Next.js 15', 'FastAPI', 'WebSockets', 'Redis', 'Claude 3.5 Sonnet', 'Recharts', 'TA-Lib', 'Clerk'],
    featured:   true,
    coverImage: '/images/projects/03_1.webp',
    images:     ['/images/projects/03_1.webp', '/images/projects/03_2.webp', '/images/projects/03_3.webp'],
    github:     'https://github.com',
    liveUrl:    'https://example.com',
    status:     'live',
    year:       2024,
    highlights: ['Live 15s chart updates', 'Sharpe ratio 1.8+ backtesting', '90% AI signal confidence'],
    order:      3,
  },
  {
    slug:       'bilingual-support-agent',
    title:      'Bilingual Support Agent (JP / EN)',
    summary:    'LINE and web chat support agent for a Japanese retailer — resolves tier-1 tickets in Japanese or English, escalates with full context, and never re-asks a question.',
    overview:   'A customer support agent that answers in the language the customer writes in, pulls from the retailer\'s policy and product knowledge base with citations, and hands unresolved cases to human staff with a structured summary instead of a raw transcript.',
    category:   'AI',
    stack:      ['LangGraph', 'Claude 4 Sonnet', 'Next.js 15', 'FastAPI', 'pgvector', 'LINE Messaging API', 'Redis', 'Zendesk API'],
    featured:   false,
    coverImage: '/images/projects/04_1.webp',
    images:     ['/images/projects/04_1.webp', '/images/projects/04_2.webp', '/images/projects/04_3.webp'],
    github:     'https://github.com',
    status:     'live',
    year:       2025,
    highlights: ['71% tier-1 auto-resolution', '1.9s median first token', 'JP/EN handoff with zero re-typing'],
    order:      4,
  },
  {
    slug:       'local-slm-coding-assistant',
    title:      'Local SLM Coding Assistant',
    summary:    'Offline VS Code copilot comparing Qwen 2.5, Llama 3.3, and Mistral Small — zero API costs, full privacy, 120 tokens/sec.',
    overview:   'Offline VS Code copilot that runs entirely on your laptop using Qwen 2.5, Llama 3.3, and Mistral Small models with zero API costs or internet dependency.',
    category:   'Tools',
    stack:      ['Ollama', 'PyTorch', 'Qwen 2.5', 'Llama 3.3', 'Mistral', 'Tauri', 'WebGPU', 'VS Code LSP'],
    featured:   false,
    coverImage: '/images/projects/05_1.webp',
    images:     ['/images/projects/05_1.webp', '/images/projects/05_2.webp', '/images/projects/05_3.webp'],
    github:     'https://github.com',
    status:     'live',
    year:       2025,
    highlights: ['85% HumanEval pass@1', '120 tokens/sec', '<8GB RAM usage'],
    order:      5,
  },
  {
    slug:       'factory-vision-qa',
    title:      'Factory Vision QA Pipeline',
    summary:    'Real-time defect detection on a Japanese manufacturing line — edge inference at 38ms per frame, 99.1% recall, and an operator dashboard that explains every flag.',
    overview:   'A computer vision pipeline that inspects parts on a moving line, flags surface and assembly defects in real time, and gives operators a dashboard with the frame, the heatmap, and the reason — so a human can confirm or override in seconds.',
    category:   'AI',
    stack:      ['PyTorch', 'YOLOv8', 'FastAPI', 'Next.js 15', 'ClickHouse', 'Redis', 'OpenTelemetry', 'Docker'],
    featured:   false,
    coverImage: '/images/projects/06_1.webp',
    images:     ['/images/projects/06_1.webp', '/images/projects/06_2.webp', '/images/projects/06_3.webp'],
    github:     'https://github.com',
    status:     'live',
    year:       2024,
    highlights: ['99.1% defect recall', '38ms per frame on edge GPU', '60% fewer manual inspections'],
    order:      6,
  },
  {
    slug:       'multi-agent-code-reviewer',
    title:      'Multi-Agent Code Reviewer',
    summary:    'Drop a PR link — three AI agents collaborate to plan, analyze, and fix code with automatic comments and 92% test coverage.',
    overview:   'Drop any GitHub PR link and watch three specialized AI agents collaborate: Planner creates review checklist, Analyzer finds bugs, Fixer writes fixes with unit tests.',
    category:   'Tools',
    stack:      ['LangGraph', 'Claude 3.5 Sonnet', 'Semgrep', 'CodeQL', 'GitHub API', 'Pytest', 'Neon Postgres'],
    featured:   false,
    coverImage: '/images/projects/07_1.webp',
    images:     ['/images/projects/07_1.webp', '/images/projects/07_2.webp', '/images/projects/07_3.webp'],
    github:     'https://github.com',
    status:     'live',
    year:       2025,
    highlights: ['87% bug catch rate', '92% test coverage', '7x faster than manual review'],
    order:      7,
  },
  {
    slug:       'meeting-intelligence-platform',
    title:      'Meeting Intelligence Platform',
    summary:    'Records Japanese and English meetings, produces bilingual summaries, and posts owner-assigned action items to Slack and Notion within two minutes of the call ending.',
    overview:   'A meeting assistant built for mixed-language teams: it transcribes JP/EN calls with speaker labels, writes a summary in both languages, extracts decisions and action items with owners and due dates, and pushes them to the tools the team already uses.',
    category:   'AI',
    stack:      ['Whisper v3', 'Claude 3.5 Sonnet', 'PydanticAI', 'Next.js 15', 'FastAPI', 'pgvector', 'Neon Postgres', 'Slack API'],
    featured:   false,
    coverImage: '/images/projects/08_1.webp',
    images:     ['/images/projects/08_1.webp', '/images/projects/08_2.webp', '/images/projects/08_3.webp'],
    github:     'https://github.com',
    liveUrl:    'https://example.com',
    status:     'live',
    year:       2024,
    highlights: ['Bilingual JP/EN transcripts', 'Action items in Slack within 2 min', '6+ hours saved per PM per week'],
    order:      8,
  },
  {
    slug:       'llm-eval-monitoring-dashboard',
    title:      'LLM Eval / Monitoring Dashboard',
    summary:    'Production AI observability — track accuracy, latency, costs, and toxicity across 10k+ daily inferences with CI/CD-gated deployments.',
    overview:   'Production observability platform for AI applications tracking accuracy, latency, costs, and toxicity across 10k+ inferences daily with live dashboards updating every 100ms.',
    category:   'Full Stack',
    stack:      ['Next.js 15', 'Tremor', 'ClickHouse', 'OpenTelemetry', 'DeepEval', 'RAGAS', 'PagerDuty', 'Vercel Edge'],
    featured:   false,
    coverImage: '/images/projects/09_1.webp',
    images:     ['/images/projects/09_1.webp', '/images/projects/09_2.webp', '/images/projects/09_3.webp'],
    github:     'https://github.com',
    liveUrl:    'https://example.com',
    status:     'live',
    year:       2026,
    highlights: ['10k+ inferences/day', '100ms dashboard updates', 'CI/CD blocks if evals < 90%'],
    order:      9,
  },
  {
    slug:       'ai-business-workflow-automator',
    title:      'AI Business Workflow Automator',
    summary:    'End-to-end sales automation — lead qualification, CRM updates, demo scheduling, and follow-up sequences handling 85% of SDR workflows.',
    overview:   'Complete sales/marketing automation that takes website leads → qualifies intent → updates CRM → schedules demos → notifies sales → runs follow-up sequences autonomously.',
    category:   'AI',
    stack:      ['LangGraph', 'Claude 4 Sonnet', 'HubSpot API', 'Calendly', 'Supabase', 'Next.js 15', 'SendGrid', 'Stripe'],
    featured:   true,
    coverImage: '/images/projects/10_1.webp',
    images:     ['/images/projects/10_1.webp', '/images/projects/10_2.webp', '/images/projects/10_3.webp'],
    github:     'https://github.com',
    liveUrl:    'https://example.com',
    status:     'live',
    year:       2026,
    highlights: ['85% SDR workflow automation', '93% accuracy', '$187k pipeline from 1000 leads/month'],
    order:      10,
  },
]

export const FEATURED_PROJECTS = ALL_PROJECTS.filter((p) => p.featured)

// ─── Blog Posts ──────────────────────────────────────────────────

export type BlogCategory = 'All' | 'AI Engineering' | 'Full Stack' | 'System Design' | 'DevTools' | 'Career'
export const BLOG_CATEGORIES: BlogCategory[] = ['All', 'AI Engineering', 'Full Stack', 'System Design', 'DevTools', 'Career']

export type ContentBadge = 'code' | 'architecture' | 'diagram' | 'tutorial' | 'comparison' | 'deep-dive'

export interface BlogPostData {
  slug:         string
  title:        string
  summary:      string
  category:     BlogCategory
  tags:         string[]
  publishedAt:  string       // ISO date
  readingTime:  number       // minutes
  featured:     boolean
  coverImage?:  string
  contentBadges: ContentBadge[]
}

export const ALL_POSTS: BlogPostData[] = [
  {
    slug:          'building-production-rag',
    title:         'Building Production RAG Systems That Actually Work',
    summary:       'Most RAG tutorials show toy examples. Here\'s what it really takes — hybrid retrieval, eval-gated CI/CD, chunking strategies that survive messy documents, and the metrics that matter in production.',
    category:      'AI Engineering',
    tags:          ['RAG', 'LLM', 'Production', 'pgvector', 'Evaluation'],
    publishedAt:   '2026-02-20',
    readingTime:   12,
    featured:      true,
    contentBadges: ['architecture', 'code', 'diagram', 'comparison'],
  },
  {
    slug:          'multi-agent-systems-langgraph',
    title:         'Designing Multi-Agent Systems with LangGraph',
    summary:       'How to architect agent supervision graphs, handle inter-agent communication, implement human-in-the-loop approval, and avoid the deadlock traps that plague multi-agent workflows.',
    category:      'AI Engineering',
    tags:          ['LangGraph', 'Agents', 'LLM', 'Architecture'],
    publishedAt:   '2026-01-15',
    readingTime:   10,
    featured:      false,
    contentBadges: ['architecture', 'diagram', 'code'],
  },
  {
    slug:          'nextjs-architecture-at-scale',
    title:         'Next.js Architecture Patterns for Large Applications',
    summary:       'How to structure a Next.js 15 project that scales — App Router patterns, data layer separation, server/client component boundaries, and state management without the chaos.',
    category:      'Full Stack',
    tags:          ['Next.js', 'React', 'TypeScript', 'Architecture'],
    publishedAt:   '2025-11-10',
    readingTime:   9,
    featured:      false,
    contentBadges: ['architecture', 'code', 'diagram'],
  },
  {
    slug:          'prompt-engineering-beyond-basics',
    title:         'Prompt Engineering Beyond the Basics',
    summary:       'Chain-of-thought, few-shot calibration, structured outputs with PydanticAI, and the systematic evaluation framework we use to optimize prompts for production systems.',
    category:      'AI Engineering',
    tags:          ['LLM', 'Prompt Engineering', 'PydanticAI', 'Evaluation'],
    publishedAt:   '2025-09-18',
    readingTime:   8,
    featured:      false,
    contentBadges: ['code', 'comparison', 'tutorial'],
  },
  {
    slug:          'vector-databases-compared',
    title:         'Vector Databases Compared: pgvector vs Pinecone vs Qdrant',
    summary:       'A practical benchmark of three vector databases across latency, recall, cost, and operational complexity — tested with real production workloads, not synthetic benchmarks.',
    category:      'AI Engineering',
    tags:          ['Vector DB', 'pgvector', 'Pinecone', 'Benchmarks'],
    publishedAt:   '2025-07-22',
    readingTime:   11,
    featured:      false,
    contentBadges: ['comparison', 'diagram', 'code'],
  },
  {
    slug:          'scaling-websocket-connections',
    title:         'Scaling WebSocket Connections to 100k Concurrent Users',
    summary:       'The architecture behind our real-time trading dashboard — Redis Streams, connection pooling, backpressure handling, and the subtle bugs that only appear at scale.',
    category:      'System Design',
    tags:          ['WebSockets', 'Redis', 'Scaling', 'Real-time'],
    publishedAt:   '2025-05-14',
    readingTime:   10,
    featured:      false,
    contentBadges: ['architecture', 'diagram', 'deep-dive'],
  },
  {
    slug:          'type-safe-apis-trpc-nextjs',
    title:         'Building Type-Safe APIs with tRPC and Next.js',
    summary:       'End-to-end type safety from database to frontend — tRPC v11 setup, Zod validation, optimistic updates, and the patterns that eliminated an entire class of runtime errors.',
    category:      'Full Stack',
    tags:          ['tRPC', 'TypeScript', 'Next.js', 'API Design'],
    publishedAt:   '2025-03-10',
    readingTime:   7,
    featured:      false,
    contentBadges: ['code', 'tutorial'],
  },
  {
    slug:          'cicd-for-ai-applications',
    title:         'CI/CD for AI Applications: Beyond Traditional Testing',
    summary:       'How to build deployment pipelines that test AI quality, not just code quality. Eval suites as pytest fixtures, accuracy gates, cost monitoring, and rollback strategies for model regressions.',
    category:      'DevTools',
    tags:          ['CI/CD', 'AI', 'Testing', 'DeepEval', 'MLOps'],
    publishedAt:   '2025-01-20',
    readingTime:   9,
    featured:      false,
    contentBadges: ['architecture', 'code', 'diagram'],
  },
  {
    slug:          'fine-tuning-llms-practical-guide',
    title:         'Fine-Tuning LLMs: When, Why, and How',
    summary:       'A decision framework for when to fine-tune vs prompt engineer vs RAG. Includes dataset preparation, LoRA configuration, evaluation methodology, and cost analysis across model sizes.',
    category:      'AI Engineering',
    tags:          ['Fine-tuning', 'LLM', 'LoRA', 'Training'],
    publishedAt:   '2024-12-01',
    readingTime:   14,
    featured:      false,
    contentBadges: ['deep-dive', 'comparison', 'code', 'diagram'],
  },
  {
    slug:          'developer-tools-that-changed-workflow',
    title:         'Developer Tools That Actually Changed Our Workflow in 2024',
    summary:       'A curated list of tools we adopted this year that made a measurable difference — from local LLM coding assistants to terminal workflows, database tools, and observability platforms.',
    category:      'DevTools',
    tags:          ['Tools', 'Productivity', 'DX', 'Review'],
    publishedAt:   '2024-11-15',
    readingTime:   6,
    featured:      false,
    contentBadges: ['comparison', 'tutorial'],
  },
  {
    slug:          'from-prototype-to-production',
    title:         'From Prototype to Production: What Nobody Tells You',
    summary:       'The unglamorous work between "it works on my machine" and "it handles 10k users" — error budgets, observability, load testing, feature flags, and the mindset shift from builder to operator.',
    category:      'Career',
    tags:          ['Production', 'Engineering', 'Career', 'Best Practices'],
    publishedAt:   '2024-10-08',
    readingTime:   8,
    featured:      false,
    contentBadges: ['deep-dive'],
  },
  {
    slug:          'local-llm-development-setup',
    title:         'Setting Up a Local LLM Development Environment',
    summary:       'Our complete local AI development setup — Ollama model management, GPU memory optimization, VS Code integration, and benchmarking scripts to compare model performance on your own hardware.',
    category:      'AI Engineering',
    tags:          ['Local LLM', 'Ollama', 'Development', 'Setup'],
    publishedAt:   '2024-08-25',
    readingTime:   7,
    featured:      false,
    contentBadges: ['tutorial', 'code'],
  },
]

export const LATEST_POSTS = ALL_POSTS.slice(0, 2)

// ─── AI Lab Experiments ──────────────────────────────────────────

export type ExperimentFilter = 'All' | 'LLM' | 'Agent' | 'RAG' | 'Vision' | 'Automation'
export const EXPERIMENT_FILTERS: ExperimentFilter[] = ['All', 'LLM', 'Agent', 'RAG', 'Vision', 'Automation']

export type ExperimentStatus = 'live' | 'research'

export interface ExperimentData {
  slug:        string
  title:       string
  summary:     string
  description: string       // longer description for detail
  category:    ExperimentFilter
  status:      ExperimentStatus
  stack:       string[]
  models:      string[]      // AI models used
  metrics?:    string[]      // key results
  github?:     string
  liveUrl?:    string
  order:       number
}

export const ALL_EXPERIMENTS: ExperimentData[] = [
  {
    slug:        'local-llm-code-reviewer',
    title:       'Local LLM Code Reviewer',
    summary:     'Automated code review powered by locally-hosted LLMs. Privacy-first — zero data leaves your machine.',
    description: 'A VS Code extension that runs code review entirely on your laptop using Ollama. Analyzes diffs, identifies bugs, suggests improvements, and generates inline comments — all without sending code to any external API.',
    category:    'LLM',
    status:      'live',
    stack:       ['Ollama', 'Python', 'AST', 'FastAPI', 'Tree-sitter'],
    models:      ['Qwen 2.5 72B', 'Llama 3.3 70B', 'CodeLlama'],
    metrics:     ['85% bug detection rate', '2.9s avg response', '0 API cost'],
    github:      'https://github.com',
    order:       1,
  },
  {
    slug:        'voice-to-sql-agent',
    title:       'Voice-to-SQL Agent',
    summary:     'Speak natural language queries and get SQL results instantly. Function-calling agents translate intent to queries.',
    description: 'A conversational interface that converts spoken questions into SQL queries, executes them against your database, and explains the results in natural language. Uses Whisper for speech recognition and GPT-4o function-calling for SQL generation with schema-aware validation.',
    category:    'Agent',
    status:      'live',
    stack:       ['Whisper', 'FastAPI', 'SQLite', 'React', 'LangChain'],
    models:      ['GPT-4o', 'Whisper Large-v3'],
    metrics:     ['94% query accuracy', '1.2s voice-to-result', 'Schema-aware validation'],
    github:      'https://github.com',
    order:       2,
  },
  {
    slug:        'rag-evaluation-harness',
    title:       'RAG Evaluation Harness',
    summary:     'Automated benchmark suite comparing chunking strategies, embedding models, and retrieval methods across 12 metrics.',
    description: 'An opinionated evaluation framework for testing RAG pipelines. Compare chunking strategies (fixed, semantic, recursive), embedding models (OpenAI, Cohere, open-source), and retrieval methods (dense, sparse, hybrid) against ground-truth Q&A datasets with 12 automated metrics.',
    category:    'RAG',
    status:      'live',
    stack:       ['Python', 'DeepEval', 'RAGAS', 'pgvector', 'Streamlit'],
    models:      ['Claude Sonnet', 'GPT-4o', 'all-MiniLM-L6'],
    metrics:     ['12 eval metrics', '6 chunking strategies', '4 embedding models compared'],
    github:      'https://github.com',
    liveUrl:     'https://example.com',
    order:       3,
  },
  {
    slug:        'multi-agent-debate',
    title:       'Multi-Agent Debate System',
    summary:     'Three AI agents argue opposing perspectives on any topic, then a judge agent synthesizes the strongest arguments.',
    description: 'A structured debate framework where three LLM agents are assigned roles (proponent, opponent, devil\'s advocate) and engage in multi-round argumentation. A judge agent scores arguments on logic, evidence, and novelty, then synthesizes a balanced conclusion. Built to stress-test reasoning capabilities across models.',
    category:    'Agent',
    status:      'live',
    stack:       ['LangGraph', 'Next.js', 'Redis', 'WebSockets'],
    models:      ['Claude Sonnet', 'GPT-4o', 'Gemini 2.5 Pro'],
    metrics:     ['3 debate rounds', 'Real-time streaming', 'Cross-model comparison'],
    github:      'https://github.com',
    order:       4,
  },
  {
    slug:        'document-vision-parser',
    title:       'Document Vision Parser',
    summary:     'Extract structured data from receipts, invoices, and forms using vision models — no OCR templates required.',
    description: 'A template-free document extraction system that uses vision LLMs to understand document layouts and extract structured fields. Handles receipts, invoices, tax forms, and business cards without pre-defined templates. Outputs clean JSON with confidence scores and bounding box annotations.',
    category:    'Vision',
    status:      'live',
    stack:       ['GPT-4o Vision', 'FastAPI', 'Pydantic', 'React', 'Canvas API'],
    models:      ['GPT-4o Vision', 'Claude Vision'],
    metrics:     ['96% field accuracy', '1.8s processing', 'Zero template setup'],
    github:      'https://github.com',
    liveUrl:     'https://example.com',
    order:       5,
  },
  {
    slug:        'agent-memory-system',
    title:       'Agent Memory Architecture',
    summary:     'Persistent memory layer for AI agents — episodic, semantic, and procedural memory with forgetting curves.',
    description: 'A research implementation exploring how AI agents can maintain useful long-term memory. Implements three memory types: episodic (conversation history with importance scoring), semantic (extracted facts and relationships), and procedural (learned patterns and preferences). Includes forgetting curves to prevent memory bloat.',
    category:    'Agent',
    status:      'research',
    stack:       ['Python', 'pgvector', 'NetworkX', 'LangGraph', 'Neo4j'],
    models:      ['Claude Sonnet', 'all-MiniLM-L6'],
    metrics:     ['3 memory types', 'Ebbinghaus forgetting curves', 'Graph-based retrieval'],
    github:      'https://github.com',
    order:       6,
  },
  {
    slug:        'realtime-sentiment-stream',
    title:       'Real-time Sentiment Stream',
    summary:     'Live sentiment analysis on streaming text — Twitter feeds, chat messages, or support tickets with sub-100ms latency.',
    description: 'A high-throughput sentiment analysis pipeline that processes streaming text data in real-time. Uses a fine-tuned DistilBERT model for sub-100ms classification, with a Kafka-based ingestion pipeline handling 10k+ messages/second. Live dashboard shows sentiment distribution, trend lines, and anomaly alerts.',
    category:    'LLM',
    status:      'live',
    stack:       ['DistilBERT', 'Kafka', 'FastAPI', 'Next.js', 'ClickHouse'],
    models:      ['DistilBERT (fine-tuned)', 'RoBERTa'],
    metrics:     ['94% accuracy', '<100ms latency', '10k msgs/sec throughput'],
    github:      'https://github.com',
    liveUrl:     'https://example.com',
    order:       7,
  },
  {
    slug:        'pdf-to-knowledge-graph',
    title:       'PDF → Knowledge Graph',
    summary:     'Upload any PDF and watch it transform into an interactive knowledge graph with entity relationships and citations.',
    description: 'An automated pipeline that extracts entities, relationships, and claims from PDF documents, constructs a navigable knowledge graph, and provides a visual explorer. Uses LLM-powered entity extraction with Neo4j graph storage and D3.js visualization. Great for research papers, legal documents, and technical specs.',
    category:    'RAG',
    status:      'live',
    stack:       ['Neo4j', 'LlamaParse', 'D3.js', 'Next.js', 'FastAPI'],
    models:      ['Claude Sonnet', 'GPT-4o'],
    metrics:     ['Entity extraction F1: 0.89', 'Interactive graph viz', 'Citation linking'],
    github:      'https://github.com',
    order:       8,
  },
  {
    slug:        'browser-automation-agent',
    title:       'Browser Automation Agent',
    summary:     'Give it a goal in plain English — it navigates websites, fills forms, extracts data, and completes tasks autonomously.',
    description: 'A Playwright-powered browser agent that takes natural language instructions and autonomously navigates websites to complete tasks. Uses vision models to understand page layouts and action models to interact with elements. Handles multi-step workflows like "Go to Amazon, find the cheapest USB-C hub with 4+ stars, and add it to cart."',
    category:    'Automation',
    status:      'live',
    stack:       ['Playwright', 'GPT-4o Vision', 'Python', 'LangGraph', 'Redis'],
    models:      ['GPT-4o Vision', 'Claude Sonnet'],
    metrics:     ['78% task completion', 'Multi-step navigation', 'Visual DOM understanding'],
    github:      'https://github.com',
    order:       9,
  },
  {
    slug:        'prompt-optimization-lab',
    title:       'Prompt Optimization Lab',
    summary:     'Automated prompt engineering — evolves prompts using genetic algorithms and A/B testing against eval suites.',
    description: 'An experiment in automated prompt optimization. Takes a base prompt and a scoring function, then uses evolutionary strategies (mutation, crossover, selection) to improve prompt performance over generations. Includes A/B testing infrastructure to validate improvements with statistical significance.',
    category:    'LLM',
    status:      'research',
    stack:       ['Python', 'DSPy', 'DeepEval', 'Streamlit', 'Redis'],
    models:      ['Claude Sonnet', 'GPT-4o', 'Gemini 2.5 Pro'],
    metrics:     ['15% avg accuracy lift', 'Genetic algorithm evolution', 'Statistical significance testing'],
    github:      'https://github.com',
    order:       10,
  },
]

export const LATEST_EXPERIMENTS = ALL_EXPERIMENTS.slice(0, 2)

// ─── Tech / Skills ───────────────────────────────────────────────

export const TECH_AI = [
  'Python', 'PyTorch', 'LangGraph', 'LangChain', 'PydanticAI',
  'OpenAI', 'Anthropic', 'Hugging Face', 'RAG', 'LLMs',
  'Computer Vision', 'Vector DBs', 'Fine-tuning', 'Agents',
]

export const TECH_FULLSTACK = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL',
  'Docker', 'AWS', 'Drizzle', 'Redis', 'tRPC',
  'Tailwind CSS', 'Vercel',
]
