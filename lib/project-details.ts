/**
 * Extended project detail content for case-study pages.
 * Keyed by slug — merged with base project data at render time.
 */

// ─── Types ───────────────────────────────────────────────────────

export interface ProjectDetailContent {
  role:         string
  duration:     string
  problem:      string
  solution:     string
  features:     Array<{ title: string; description: string }>
  techChoices:  Array<{ tech: string; reason: string; category: TechCategory }>
  architecture: { description: string; steps: ArchStep[] }
  challenges:   Array<{ title: string; problem: string; solution: string; outcome: string }>
}

type TechCategory = 'Frontend' | 'Backend' | 'AI / ML' | 'Infrastructure' | 'Data'

interface ArchStep {
  label:       string
  description: string
}

// ─── Detail Content ──────────────────────────────────────────────

export const PROJECT_DETAILS: Record<string, ProjectDetailContent> = {

  /* ──────────────────────────────────────────────────────────────
     1. OpenClaw-style Personal AI Agent
  ────────────────────────────────────────────────────────────── */
  'openclaw-ai-agent': {
    role: 'Sole architect & developer — designed the agent graph topology, implemented all 7 sub-agents, built the real-time frontend, and deployed production infrastructure.',
    duration: '3 months',
    problem:
      'Executives spend 3+ hours daily on repetitive coordination — scheduling meetings, triaging emails, updating CRMs, and coordinating across platforms. Existing automation tools like Zapier handle simple if-then rules, but can\'t understand context, prioritize intelligently, or handle multi-step workflows that require judgment and cross-platform coordination.',
    solution:
      'We engineered a hierarchical multi-agent system using LangGraph\'s supervision graph pattern. A central orchestrator understands natural language, decomposes requests into sub-tasks, and delegates to 7 specialized agents executing in parallel. The system learns user preferences through a persistent memory layer backed by pgvector, and includes human-in-the-loop approval for high-risk actions exceeding $500 or involving code changes.',
    features: [
      { title: 'Hierarchical Agent Orchestration', description: 'LangGraph supervision graph coordinates 7 specialized sub-agents (Calendar, Transport, Communication, Code, CRM, Research, Admin) with automatic task decomposition and parallel execution.' },
      { title: 'Human-in-the-Loop Approval', description: 'Configurable approval gates for high-risk actions — transactions over $500, code pushes, and external communications pass through explicit user confirmation before execution.' },
      { title: 'Persistent User Memory', description: 'pgvector-backed preference learning remembers choices like Zoom vs Meet, United vs Delta, and preferred meeting times — improving over every interaction.' },
      { title: 'Real-time Execution Visualization', description: 'Live workflow DAG showing each agent\'s state transitions, execution logs, and approval gates as tasks progress from request to completion.' },
      { title: 'Multi-Platform Integration', description: 'Native connections to Slack, Google Calendar, GitHub, Twilio SMS, and Uber APIs — all orchestrated through a single natural language interface.' },
    ],
    techChoices: [
      { tech: 'LangGraph 0.2.5', reason: 'Chose over CrewAI for its explicit state machine model — needed fine-grained control over agent transitions and human approval gates. CrewAI\'s implicit delegation made debugging complex workflows nearly impossible.', category: 'AI / ML' },
      { tech: 'Claude Sonnet 4.6', reason: 'Selected as the planning LLM for superior instruction-following and structured output reliability. Tested GPT-4o but found it hallucinated tool calls 15% more frequently in multi-step planning scenarios.', category: 'AI / ML' },
      { tech: 'Neon Postgres + pgvector', reason: 'Chose serverless Postgres over Pinecone for cost efficiency at our scale (<100k vectors). pgvector\'s tight SQL integration simplified preference queries and reduced infrastructure overhead.', category: 'Data' },
      { tech: 'Next.js 15 App Router', reason: 'Server Components reduced client-side JS by 40% for the dashboard. Server Actions simplified real-time execution log streaming without needing separate WebSocket infrastructure.', category: 'Frontend' },
    ],
    architecture: {
      description: 'Hierarchical multi-agent orchestration with human-in-loop approval gates and persistent memory.',
      steps: [
        { label: 'Input Layer', description: 'Voice/Text → Intent Classification via Claude 4 Sonnet' },
        { label: 'Task Planning', description: 'LangGraph Supervisor decomposes request into sub-tasks with dependency graph' },
        { label: 'Agent Dispatch', description: 'Parallel execution across CalendarAgent, TransportAgent, CommunicationAgent, CodeAgent, CRMAgent' },
        { label: 'Approval Gate', description: 'Human-in-loop checkpoint for high-risk actions ($500+, code changes, external comms)' },
        { label: 'Execution', description: 'Approved tasks hit live APIs — Google Calendar, Uber, Twilio, GitHub' },
        { label: 'Confirmation', description: 'Results aggregated → Slack notification + Dashboard update + SMS confirmation' },
      ],
    },
    challenges: [
      {
        title: 'Agent Coordination Deadlocks',
        problem: 'When multiple sub-agents needed the same resource (e.g., CalendarAgent and TransportAgent both needing the appointment time), the system would deadlock waiting for shared state, causing 23% of multi-step requests to time out.',
        solution: 'Implemented a message-passing architecture with immutable state snapshots. Each agent reads from a frozen snapshot and writes to a merge queue. The supervisor resolves conflicts using priority rules (calendar > transport > notification).',
        outcome: 'Zero deadlocks in production. Agent coordination latency dropped from 8s to 2.3s average.',
      },
      {
        title: 'LLM Tool Call Reliability',
        problem: 'Claude occasionally generated malformed tool call arguments — wrong date formats, missing required fields — causing API failures in 12% of requests during early testing.',
        solution: 'Added a PydanticAI validation layer between LLM output and API execution. Invalid tool calls are caught, the error is fed back to the LLM with the schema, and it self-corrects. Maximum 2 retries before human fallback.',
        outcome: 'Tool call success rate improved from 88% to 99.2%. The retry mechanism adds only 400ms on average.',
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     2. Production RAG Enterprise Search
  ────────────────────────────────────────────────────────────── */
  'production-rag-enterprise-search': {
    role: 'Lead engineer — designed the hybrid retrieval pipeline, implemented eval-gated CI/CD, built the streaming frontend, and optimized query costs to $0.02/query.',
    duration: '4 months',
    problem:
      'Companies with 500+ page handbooks, scattered Notion wikis, and legacy PDF archives have no way to get instant, accurate answers. Employees waste 30+ minutes searching for policies, and new hires take weeks to ramp up. Generic ChatGPT solutions hallucinate 30%+ of the time with no source verification.',
    solution:
      'We built a production-grade RAG pipeline combining BM25 keyword search with dense vector retrieval and ColBERT reranking for 92% F1 accuracy. Documents are parsed with Unstructured.io and LlamaParse for table extraction, embedded via Sentence Transformers, and stored in pgvector. A DeepEval integration blocks deployments if accuracy drops below the 92% threshold — making this the first truly production-safe RAG system I\'ve shipped.',
    features: [
      { title: 'Hybrid Retrieval Engine', description: 'Combines BM25 keyword search with dense vector similarity and MMR diversity scoring, followed by ColBERT reranking — outperforming pure semantic search by 18% on domain-specific queries.' },
      { title: 'Eval-Gated Deployments', description: 'CI/CD pipeline runs DeepEval test suites on every push. Deployments are automatically blocked if F1 score drops below 0.92, preventing accuracy regressions from reaching production.' },
      { title: 'Streaming Responses with Citations', description: 'PydanticAI structures every response with inline source citations linking to specific page numbers, so users can verify answers against original documents in one click.' },
      { title: 'Drag-and-Drop Document Ingestion', description: 'Upload PDFs, Notion exports, and Google Drive files through a simple UI. Automatic chunking, table extraction, and embedding happen asynchronously with progress tracking.' },
      { title: 'Cost Tracking Dashboard', description: 'Real-time monitoring of per-query costs ($0.02 average), token usage, and retrieval latency — giving full visibility into operational expenses.' },
    ],
    techChoices: [
      { tech: 'pgvector + BM25 Hybrid', reason: 'Chose pgvector over Pinecone to keep retrieval and structured data in a single database. Added pg_trgm for BM25 keyword matching — hybrid search boosted accuracy 18% over pure vector retrieval on technical documentation.', category: 'Data' },
      { tech: 'ColBERT Reranker', reason: 'Selected ColBERT over cross-encoder reranking for its 3x speed advantage at similar accuracy. Late interaction scoring maintains token-level granularity without the latency penalty of full cross-attention.', category: 'AI / ML' },
      { tech: 'FastAPI + Streaming', reason: 'Chose FastAPI over Django for native async streaming support. Server-Sent Events deliver tokens to the frontend in real-time, matching ChatGPT\'s UX without WebSocket complexity.', category: 'Backend' },
      { tech: 'DeepEval', reason: 'Integrated DeepEval over RAGAS for its CI/CD-native test runner. Defining eval suites as pytest fixtures let us block deployments on accuracy regressions with zero custom infrastructure.', category: 'Infrastructure' },
    ],
    architecture: {
      description: 'Multi-stage retrieval pipeline with hybrid search, reranking, and eval-gated deployment.',
      steps: [
        { label: 'Ingestion', description: 'Upload → Unstructured.io (PDF parsing) + LlamaParse (table extraction) → Sentence chunking' },
        { label: 'Embedding', description: 'Sentence Transformers (all-MiniLM-L6-v2) → pgvector storage with BM25 index' },
        { label: 'Retrieval', description: 'Query → Hybrid search (dense + BM25 + MMR) → Top-20 candidates' },
        { label: 'Reranking', description: 'ColBERT reranker scores top-20 → Top-5 most relevant passages' },
        { label: 'Synthesis', description: 'Claude 3.5 Sonnet generates response with PydanticAI structured citations' },
        { label: 'Delivery', description: 'FastAPI SSE streaming → Next.js frontend with inline source links' },
      ],
    },
    challenges: [
      {
        title: 'Table Extraction Accuracy',
        problem: 'Standard PDF parsers destroyed table formatting, causing financial and policy tables to produce nonsensical text chunks. 35% of handbook queries involved tabular data that was being mangled.',
        solution: 'Integrated LlamaParse specifically for table-heavy pages, using its vision model to reconstruct table structures. Added a table-aware chunking strategy that preserves row-column relationships in the embedding space.',
        outcome: 'Table-related query accuracy jumped from 61% to 89%. Finance teams reported the system finally "understood" compensation tables.',
      },
      {
        title: 'Retrieval Latency at Scale',
        problem: 'With 50k+ document chunks, hybrid search queries were taking 4.2 seconds — far too slow for an interactive search experience where users expect sub-2-second responses.',
        solution: 'Implemented HNSW indexing on pgvector with tuned ef_construction=200 and m=16 parameters. Added a query cache layer in Redis for repeated questions, which handled 40% of production traffic.',
        outcome: 'P95 retrieval latency dropped from 4.2s to 380ms. Cached queries return in under 50ms.',
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     3. AI Trading Terminal
  ────────────────────────────────────────────────────────────── */
  'ai-trading-terminal': {
    role: 'Full-stack developer — built the real-time charting engine, WebSocket data pipeline, AI signal generation, and paper trading simulation from scratch.',
    duration: '4 months',
    problem:
      'Retail traders and small trading desks lack access to Bloomberg-grade analytics. Existing open-source charting tools show price data but offer no AI-powered analysis, backtesting, or portfolio optimization. Professional terminals cost $24k+/year, putting them out of reach for most traders and fintech startups.',
    solution:
      'We built a professional trading dashboard combining live 1-minute candles (15-second updates), 25+ technical indicators, and Claude-powered buy/sell signals that analyze price action alongside macro data. The integrated paper trading engine simulates realistic fills with slippage and commission modeling, while backtesting validates strategies with Sharpe ratios accounting for real market conditions.',
    features: [
      { title: 'Live Market Data Pipeline', description: 'WebSocket-based streaming architecture delivers SPY/TSLA 1-minute candles with 15-second refresh cycles, order book depth, and trade history — all rendered with sub-frame latency using Recharts v3.' },
      { title: 'AI Signal Engine', description: 'Claude 3.5 Sonnet analyzes multi-asset context (price, RSI, MACD, VIX, yield curves) and delivers actionable signals like "Strong buy: RSI 28 + MACD crossover + VIX spike" with confidence scores.' },
      { title: 'Paper Trading Simulator', description: '$100k virtual portfolio with realistic order fills, slippage modeling, and commission tracking. Position sizing recommendations based on Kelly Criterion and portfolio correlation.' },
      { title: 'Backtesting Engine', description: 'Historical strategy testing with Backtrader integration showing Sharpe ratios, max drawdown, win rates, and equity curves — accounting for realistic fill assumptions.' },
      { title: '25+ Technical Indicators', description: 'RSI, MACD, Bollinger Bands, EMA, SMA, ATR, OBV, Stochastic, Ichimoku Cloud, and more — all configurable and overlaid on interactive charts.' },
    ],
    techChoices: [
      { tech: 'FastAPI + WebSockets', reason: 'Chose FastAPI over Express for native async WebSocket support and automatic OpenAPI documentation. Redis Streams buffer market data bursts, preventing dropped updates during high-volatility periods.', category: 'Backend' },
      { tech: 'Recharts v3', reason: 'Selected over Lightweight Charts for its React-native rendering model and customization flexibility. Canvas rendering handles 10k+ data points at 60fps, critical for smooth 1-minute candle charts.', category: 'Frontend' },
      { tech: 'Claude 3.5 Sonnet', reason: 'Chose Claude over GPT-4o for trading analysis because of its more conservative, well-reasoned outputs. GPT-4o tended toward overconfident signals — Claude\'s nuanced responses better match the uncertainty inherent in markets.', category: 'AI / ML' },
      { tech: 'Redis Streams', reason: 'Used Redis Streams over Kafka for the market data pipeline. At our throughput (<10k messages/sec), Kafka\'s operational overhead wasn\'t justified. Redis Streams provided exactly-once delivery with 80% less infrastructure.', category: 'Infrastructure' },
    ],
    architecture: {
      description: 'Real-time streaming architecture with AI analysis overlay and paper trading simulation.',
      steps: [
        { label: 'Data Ingestion', description: 'yfinance + AlphaVantage + FRED APIs → Redis Streams (market data buffer)' },
        { label: 'Processing', description: 'TA-Lib computes 25+ indicators → FastAPI aggregates multi-timeframe analysis' },
        { label: 'AI Analysis', description: 'Claude 3.5 Sonnet evaluates price + indicators + macro context → Signal generation with confidence scores' },
        { label: 'Delivery', description: 'WebSocket push to Next.js frontend → Recharts renders live candles + signal overlays' },
        { label: 'Simulation', description: 'Paper trades execute against live data → Portfolio tracker updates P&L, Sharpe, drawdown' },
      ],
    },
    challenges: [
      {
        title: 'Real-time Chart Performance',
        problem: 'Rendering 10k+ candle data points with overlay indicators caused React re-renders to spike to 200ms+, creating visible jank during live updates every 15 seconds.',
        solution: 'Moved chart rendering to a virtualized canvas layer with Web Workers handling indicator calculations off the main thread. Implemented incremental data appending instead of full array replacement on each tick.',
        outcome: 'Frame time dropped from 200ms to 8ms. Charts now render smoothly at 60fps even with all 25 indicators visible.',
      },
      {
        title: 'AI Signal Latency vs Market Speed',
        problem: 'Claude\'s 2-3 second response time meant signals arrived too late for fast-moving markets. By the time a "buy" signal displayed, the price had often already moved 0.3%+.',
        solution: 'Implemented a predictive pre-computation system — the AI analyzes incoming data continuously in the background and pre-stages signals. When market conditions match a pre-computed scenario, signals display in <200ms.',
        outcome: 'Effective signal latency reduced from 2.8s to 180ms for 70% of signals. Remaining 30% (novel market conditions) still take 1.8s with a "Computing..." indicator.',
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     4. Bilingual Support Agent (JP / EN)
  ────────────────────────────────────────────────────────────── */
  'bilingual-support-agent': {
    role: 'Hiroshi led architecture, the LangGraph conversation graph, and the web chat UI and agent console; Kenta built the retrieval and escalation services and the LINE channel adapter; Hiroki built the knowledge-base ingestion and versioning pipeline.',
    duration: '4 months',
    problem:
      'A Japanese retailer with a growing overseas customer base was answering LINE and web chat in two languages with one small support team. Tier-1 questions — order status, returns, size guides, store hours — made up roughly 70% of volume, yet every one still needed a human, and English tickets waited hours longer than Japanese ones. Earlier chatbot attempts failed because they answered confidently from stale FAQ pages and dropped context when a ticket moved to a person.',
    solution:
      'We built an agent that detects the customer\'s language per message, retrieves from a versioned knowledge base of policies and product data with citations, and executes real actions (order lookup, return initiation) through typed tools. When confidence is low or the customer asks for a person, the agent escalates to Zendesk with a structured handoff: language, intent, what has already been checked, and a suggested reply — so staff never re-ask what the customer already said.',
    features: [
      { title: 'Per-Message Language Routing', description: 'Each message is classified JP or EN independently, so code-switching customers get replies in the language they just used, with tone presets matched to Japanese keigo or casual English.' },
      { title: 'Cited Knowledge Retrieval', description: 'Hybrid pgvector + BM25 retrieval over policy documents and the product catalog, with every answer linking the source paragraph. Stale documents are flagged nightly by a freshness check.' },
      { title: 'Typed Action Tools', description: 'Order status, return initiation, and store-hours lookups run as Pydantic-validated tools against the retailer\'s APIs, with idempotency keys so a retried message never creates two returns.' },
      { title: 'Structured Human Handoff', description: 'Escalations land in Zendesk with language, intent, verified facts, and a drafted reply. Staff accept, edit, or reject the draft; rejections feed the eval set.' },
      { title: 'Agent Console', description: 'A Next.js console shows live conversations, retrieval traces, and confidence scores, letting the support lead pause the agent on any topic with one click.' },
    ],
    techChoices: [
      { tech: 'LangGraph', reason: 'The support flow has explicit states — classify, retrieve, act, confirm, escalate — and we needed to guarantee the agent cannot initiate a return without a confirmation step. An explicit graph made that provable; a free-form ReAct loop did not.', category: 'AI / ML' },
      { tech: 'Claude 4 Sonnet', reason: 'Best Japanese fluency and keigo consistency among the models we tested on 400 real tickets, and the most reliable at refusing to answer when retrieval returned nothing relevant.', category: 'AI / ML' },
      { tech: 'pgvector', reason: 'The knowledge base is under 50k chunks and already lived next to order data in Postgres. Keeping retrieval in the same database simplified citations, versioning, and nightly freshness checks.', category: 'Data' },
      { tech: 'LINE Messaging API', reason: 'LINE is the primary support channel for Japanese customers. We built the channel adapter so the same agent graph serves LINE, web chat, and email without channel-specific prompts.', category: 'Backend' },
    ],
    architecture: {
      description: 'Channel-agnostic support agent with language routing, cited retrieval, typed actions, and structured escalation.',
      steps: [
        { label: 'Channel Adapter', description: 'LINE / web chat / email messages normalized into one conversation model' },
        { label: 'Language & Intent', description: 'Claude classifies language and intent per message; conversation state stored in Redis' },
        { label: 'Retrieve or Act', description: 'Hybrid pgvector + BM25 retrieval with citations, or typed tool calls to order/return APIs' },
        { label: 'Confidence Gate', description: 'Low confidence or explicit request → structured Zendesk handoff with drafted reply' },
        { label: 'Reply & Learn', description: 'Response streamed to channel; staff edits and rejections flow back into the eval set' },
      ],
    },
    challenges: [
      {
        title: 'Code-Switching Customers',
        problem: 'Overseas customers living in Japan frequently mixed languages within one conversation — a Japanese product name inside an English sentence, or switching to Japanese for an address. Conversation-level language detection replied in the wrong language about 18% of the time.',
        solution: 'Moved detection to per-message classification with a short rolling context, and let the reply language follow the customer\'s most recent message rather than the thread. Added a small eval set of 120 mixed-language exchanges collected from real tickets.',
        outcome: 'Wrong-language replies dropped from 18% to under 2%. Customer satisfaction on English tickets rose to match Japanese tickets for the first time.',
      },
      {
        title: 'Confident Answers from Stale Policy',
        problem: 'The retailer updated return policies seasonally, but old PDF versions remained in the document store. The agent cited them correctly — and wrongly — because the citation pointed at a superseded document.',
        solution: 'Introduced document versioning with effective dates in the ingestion pipeline, a nightly job that flags chunks whose source has a newer version, and a retrieval filter that only returns currently effective policy. Superseded chunks remain for audit but are never cited.',
        outcome: 'Policy-related escalations fell by 64% in the following quarter, and the support lead can now see exactly which policy version answered any ticket.',
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     5. Local SLM Coding Assistant
  ────────────────────────────────────────────────────────────── */
  'local-slm-coding-assistant': {
    role: 'Solo developer — built the model comparison framework, VS Code extension, Tauri desktop wrapper, and performance benchmarking suite.',
    duration: '2.5 months',
    problem:
      'Development teams face a privacy vs capability trade-off with AI coding tools. Cloud-based copilots send proprietary code to external servers, violating compliance requirements for healthcare, finance, and defense clients. Meanwhile, $500+/month API costs for large teams make AI-assisted development prohibitively expensive.',
    solution:
      'We built an offline coding assistant that runs three leading small language models (Qwen 2.5, Llama 3.3, Mistral Small) entirely on the developer\'s laptop via Ollama. The system benchmarks each model in real-time and routes tasks to the optimal one — Qwen for speed-critical completions, Llama for complex reasoning, Mistral for memory-constrained environments. Zero API costs, zero data leaves the machine.',
    features: [
      { title: 'Multi-Model Comparison Engine', description: 'Real-time benchmarking of Qwen 2.5 (72B), Llama 3.3 (70B), and Mistral Small (24B) across speed, accuracy, and memory usage — automatically routing each task to the optimal model.' },
      { title: 'VS Code Deep Integration', description: 'LSP-based extension provides inline completions, code explanations, refactoring suggestions, and unit test generation directly in the editor with zero context switching.' },
      { title: 'Automated PR Creation', description: 'Highlight buggy code, describe the fix, and the assistant rewrites the code, generates tests, and creates a PR — all without leaving VS Code.' },
      { title: 'Privacy-First Architecture', description: 'All inference runs locally via Ollama with CUDA/AVX2 optimization. No network requests, no telemetry, no API keys. Code never leaves the developer\'s machine.' },
    ],
    techChoices: [
      { tech: 'Ollama 0.3.8', reason: 'Chose Ollama over llama.cpp directly for its model management and hot-swapping capabilities. Switching between Qwen, Llama, and Mistral takes <2 seconds vs 30+ seconds with manual model loading.', category: 'AI / ML' },
      { tech: 'Tauri', reason: 'Selected Tauri over Electron for the desktop wrapper — 10x smaller binary (8MB vs 80MB) and native WebView2 rendering. Critical for a developer tool where every MB of RAM matters alongside the LLM.', category: 'Frontend' },
      { tech: 'WebGPU', reason: 'Implemented WebGPU inference as a fallback for systems without CUDA. While 40% slower than CUDA, it enables GPU acceleration on AMD and Intel GPUs that Ollama\'s default CUDA path doesn\'t support.', category: 'Infrastructure' },
      { tech: 'VS Code LSP', reason: 'Built on the Language Server Protocol rather than VS Code\'s proprietary extension API. LSP compatibility means the extension works in Cursor, Neovim, and any LSP-compatible editor without modification.', category: 'Frontend' },
    ],
    architecture: {
      description: 'Local-first architecture with multi-model routing and VS Code integration via LSP.',
      steps: [
        { label: 'Input', description: 'VS Code extension captures code context + user instruction via LSP' },
        { label: 'Model Selection', description: 'Task classifier routes to optimal model based on complexity, speed, and available RAM' },
        { label: 'Inference', description: 'Ollama runs selected model (Qwen/Llama/Mistral) with CUDA or WebGPU acceleration' },
        { label: 'Post-processing', description: 'AST validation ensures generated code is syntactically correct before presentation' },
        { label: 'Delivery', description: 'Results streamed back to VS Code — inline completions, diff views, or PR creation' },
      ],
    },
    challenges: [
      {
        title: 'Memory Management Across Models',
        problem: 'Running a 70B parameter model alongside VS Code and a browser consumed 24GB+ RAM, causing swap thrashing on 16GB developer machines — making the tool unusable on standard hardware.',
        solution: 'Implemented dynamic quantization selection based on available RAM. The system auto-detects free memory and loads Q4_K_M (4-bit) on 16GB machines, Q5_K_M on 32GB, and Q8 on 64GB+ systems. Added aggressive KV cache pruning for long context windows.',
        outcome: 'Runs smoothly on 16GB MacBooks with <8GB model memory footprint. Performance degradation from quantization is only 3% on HumanEval.',
      },
      {
        title: 'Code Completion Latency',
        problem: 'Initial completion latency was 800ms+ due to model cold-start and tokenization overhead, making the experience feel sluggish compared to cloud-based copilots that respond in 200-300ms.',
        solution: 'Implemented speculative decoding with a small draft model (Mistral 7B) that runs continuously, pre-generating likely completions. The larger model then validates in a single forward pass, accepting 60-70% of draft tokens.',
        outcome: 'Median completion latency dropped from 800ms to 280ms. Users report the experience feels "as fast as GitHub Copilot" in blind testing.',
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     6. Factory Vision QA Pipeline
  ────────────────────────────────────────────────────────────── */
  'factory-vision-qa': {
    role: 'Hiroshi owned the inference pipeline, edge deployment, and the operator dashboard; Kenta built the inference service and shadow-mode rollout; Hiroki built the ingestion, labeling, and ClickHouse analytics layer.',
    duration: '5 months, then ongoing partnership',
    problem:
      'A parts manufacturer in Kanagawa inspected every unit by eye at the end of the line. Inspectors caught most defects but fatigue pushed miss rates up late in each shift, and there was no record of what a defect looked like once the part was scrapped. An off-the-shelf vision system had been trialed and abandoned because it flagged 30% of good parts and nobody could tell why.',
    solution:
      'We built a pipeline that captures frames from existing line cameras, runs a YOLOv8 model fine-tuned on the plant\'s own labeled defects on an edge GPU, and shows operators every flag with the frame, a heatmap, and a plain-language reason. Operators confirm or override in one tap; every decision is stored in ClickHouse and feeds the next training cycle. The model never stops the line on its own — it changes what humans look at.',
    features: [
      { title: 'Edge Inference', description: 'YOLOv8 exported to TensorRT runs at 38ms per frame on a single on-site GPU, keeping all imagery inside the factory network.' },
      { title: 'Explainable Flags', description: 'Each detection ships with a Grad-CAM heatmap and a short template reason ("scratch, 4mm, top-left face") so operators trust what they are seeing.' },
      { title: 'One-Tap Operator Feedback', description: 'Confirm / override buttons on a touch dashboard. Overrides become labeled examples automatically and are reviewed before entering the training set.' },
      { title: 'Defect Analytics', description: 'ClickHouse stores every frame decision, enabling per-shift, per-station, and per-supplier defect trends that the plant had never been able to see.' },
      { title: 'Shadow-Mode Rollout', description: 'New model versions run alongside the current one for a week, and promotion requires matching or beating recall on the held-out set before any operator sees it.' },
    ],
    techChoices: [
      { tech: 'YOLOv8 (PyTorch)', reason: 'Fast enough for real-time detection on modest edge hardware, and straightforward to fine-tune on the small, imbalanced defect dataset we started with. Segmentation models were more accurate on paper but too slow for line speed.', category: 'AI / ML' },
      { tech: 'FastAPI', reason: 'A thin inference service on the edge box exposes detections over a local API, so the dashboard, logging, and future stations all share one contract.', category: 'Backend' },
      { tech: 'ClickHouse', reason: 'Per-frame decision logs grow by millions of rows per week. ClickHouse made the per-shift and per-supplier analytics interactive without a separate warehouse.', category: 'Data' },
      { tech: 'OpenTelemetry', reason: 'Inference latency, camera dropout, and GPU memory are traced end to end, so a slowdown on the line can be attributed to the model, the camera, or the network in minutes.', category: 'Infrastructure' },
    ],
    architecture: {
      description: 'Edge vision inference with human-in-the-loop confirmation and a feedback loop into retraining.',
      steps: [
        { label: 'Capture', description: 'Line cameras → frame sampler synced to the conveyor encoder' },
        { label: 'Inference', description: 'YOLOv8 / TensorRT on edge GPU → detections + Grad-CAM heatmaps (38ms)' },
        { label: 'Operator Review', description: 'Next.js touch dashboard shows flag, heatmap, reason; one-tap confirm / override' },
        { label: 'Decision Store', description: 'Every frame decision + operator action written to ClickHouse' },
        { label: 'Retrain & Promote', description: 'Overrides labeled → nightly fine-tune → shadow-mode comparison → gated promotion' },
      ],
    },
    challenges: [
      {
        title: 'Lighting Drift Across Shifts',
        problem: 'Accuracy dropped sharply on the night shift. The cause was not the model but the factory: skylights changed ambient light, and a model trained on day-shift frames produced 3x more false positives at night.',
        solution: 'Added a lighting-normalization step and augmented training with synthetic exposure shifts, then installed a $120 diffused light panel at the inspection station. Tracked a per-hour false-positive metric so drift is visible before operators complain.',
        outcome: 'Night-shift false positives fell to within 10% of day-shift levels, and the per-hour metric has since caught two camera degradations early.',
      },
      {
        title: 'Rare Defects, Few Examples',
        problem: 'The most expensive defect class — hairline cracks — appeared in fewer than 40 labeled frames. The model either ignored it or over-flagged every scratch as a crack.',
        solution: 'Built a focused data collection sprint with the plant QA lead, used copy-paste augmentation to transplant crack regions onto good parts, and trained a small secondary classifier that only runs on frames the detector marks as ambiguous.',
        outcome: 'Crack recall rose from 61% to 97% with no measurable increase in overall false positives.',
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     7. Multi-Agent Code Reviewer
  ────────────────────────────────────────────────────────────── */
  'multi-agent-code-reviewer': {
    role: 'Sole developer — designed the 3-agent review pipeline, integrated static analysis tools, and built the GitHub automation layer.',
    duration: '2.5 months',
    problem:
      'Code reviews are the biggest bottleneck in software development — senior engineers spend 8-12 hours per week reviewing PRs, creating a 2-3 day average review turnaround. Critical bugs slip through due to reviewer fatigue, and junior developers wait days for feedback, slowing their learning cycle.',
    solution:
      'We built a 3-agent system where specialized AI reviewers collaborate: a Planner creates a review strategy based on the PR\'s scope, an Analyzer catches security vulnerabilities, performance issues, and logic bugs using Claude + static analysis tools, and a Fixer generates corrected code with unit tests. The system creates GitHub PR comments and even fix PRs automatically.',
    features: [
      { title: 'Three-Agent Review Pipeline', description: 'PlannerAgent creates a targeted review checklist, AnalyzerAgent identifies issues with severity and confidence scores, FixerAgent generates corrected code with unit tests — all coordinated by a LangGraph supervisor.' },
      { title: 'Security + Static Analysis', description: 'Combines Claude\'s reasoning with Semgrep (OWASP patterns) and CodeQL (data flow analysis) for comprehensive security scanning that catches both pattern-based and logic-based vulnerabilities.' },
      { title: 'Automated Fix PRs', description: 'For high-confidence issues, the system creates fix PRs with corrected code, unit tests (92% minimum coverage), and explanatory commit messages — ready for one-click merge.' },
      { title: 'Learning Audit Trail', description: 'Every review is stored in Neon Postgres with outcome tracking (was the suggestion accepted? was the fix correct?), enabling continuous improvement of the review quality over time.' },
    ],
    techChoices: [
      { tech: 'LangGraph Supervisor', reason: 'Chose a supervisor graph over sequential pipeline because different PRs need different review strategies. A CSS-only PR skips security analysis; a database migration PR gets extra scrutiny. The supervisor routes dynamically.', category: 'AI / ML' },
      { tech: 'Semgrep + CodeQL', reason: 'Layered two static analysis tools because they catch different vulnerability classes. Semgrep excels at pattern matching (SQL injection, XSS), while CodeQL\'s data flow analysis catches complex injection chains across function boundaries.', category: 'Backend' },
      { tech: 'Claude 3.5 Sonnet', reason: 'Selected Claude for code review because of its ability to understand intent, not just syntax. GPT-4o flagged more false positives (32% vs Claude\'s 11%), creating alert fatigue that would cause developers to ignore real issues.', category: 'AI / ML' },
      { tech: 'GitHub Checks API', reason: 'Integrated with GitHub Checks rather than simple PR comments for proper CI/CD integration. Review results appear as check runs with line-level annotations, integrating naturally with existing developer workflows.', category: 'Infrastructure' },
    ],
    architecture: {
      description: 'Multi-agent review pipeline with static analysis integration and automated fix generation.',
      steps: [
        { label: 'PR Webhook', description: 'GitHub webhook triggers on PR open/update → Fetch diff, file tree, and commit history' },
        { label: 'Planning', description: 'PlannerAgent analyzes PR scope → Generates review checklist with focus areas and skip rules' },
        { label: 'Analysis', description: 'AnalyzerAgent runs Claude reasoning + Semgrep + CodeQL in parallel → Ranked issue list with severity and confidence' },
        { label: 'Fix Generation', description: 'FixerAgent creates corrected code for high-confidence issues → Generates unit tests → Validates with pytest (92% minimum coverage)' },
        { label: 'GitHub Output', description: 'PR comments with inline annotations + fix PRs created + GitHub Checks status updated' },
      ],
    },
    challenges: [
      {
        title: 'False Positive Fatigue',
        problem: 'Initial versions flagged 40+ issues per PR, with 35% being false positives. Developers started ignoring all suggestions, defeating the purpose of automated review.',
        solution: 'Implemented a confidence calibration system using historical feedback. Each suggestion includes a confidence score trained on accept/reject patterns. Added a threshold filter (only show >75% confidence) with an expandable "lower confidence" section for thoroughness.',
        outcome: 'False positive rate dropped from 35% to 8%. Developer engagement with suggestions increased from 23% to 71%.',
      },
      {
        title: 'Context Window Limits on Large PRs',
        problem: 'PRs with 50+ changed files exceeded Claude\'s context window, forcing truncation that caused the analyzer to miss cross-file issues — the exact bugs that are hardest for humans to catch.',
        solution: 'Built a hierarchical analysis pipeline: first pass analyzes each file independently, second pass identifies cross-file dependencies and analyzes only the connected subgraphs together. Uses AST-based dependency resolution to determine which files actually interact.',
        outcome: 'Cross-file bug detection improved by 45%. Large PRs (100+ files) now complete review in 90 seconds vs previous timeout failures.',
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     8. Meeting Intelligence Platform
  ────────────────────────────────────────────────────────────── */
  'meeting-intelligence-platform': {
    role: 'Hiroshi designed the extraction pipeline, PydanticAI schemas, and the meeting review UI; Kenta built the Claude extraction service and Slack/Notion integrations; Hiroki built transcription storage and the pgvector search layer.',
    duration: '3 months',
    problem:
      'A Tokyo product team ran every meeting in a mix of Japanese and English. Notes were taken by whoever was least busy, action items lived in three places, and English-speaking members regularly missed decisions made in a Japanese side-conversation. Existing meeting assistants transcribed one language well and the other badly, and their summaries read as if written for a different company.',
    solution:
      'We built a platform that joins calls, transcribes with speaker labels using Whisper v3 with per-segment language detection, and runs a Claude extraction pass constrained by PydanticAI schemas: decisions, action items with owner and due date, open questions, and a bilingual summary. Results are posted to the relevant Slack channel and Notion page within two minutes, and every extracted item links back to the transcript segment it came from.',
    features: [
      { title: 'Bilingual Transcription', description: 'Whisper v3 with segment-level language detection handles JP/EN switching mid-meeting, with speaker diarization so action items are attributed correctly.' },
      { title: 'Schema-Constrained Extraction', description: 'Decisions, action items, and questions are extracted into typed PydanticAI models — owner must be an attendee, due dates must be real dates — so nothing vague reaches Slack.' },
      { title: 'Two-Language Summaries', description: 'Every meeting gets a summary in Japanese and English generated from the same structured items, not translated from each other, so both versions stay faithful.' },
      { title: 'Click-to-Evidence', description: 'Each item links to the transcript segment and audio timestamp behind it. Disputes about who said what are settled in seconds.' },
      { title: 'Slack & Notion Delivery', description: 'Action items post to the channel the meeting was scheduled from and sync to a Notion database; marking an item done in either place updates the other.' },
    ],
    techChoices: [
      { tech: 'Whisper v3', reason: 'The best accuracy we measured on Japanese business speech, and self-hostable — the team required that audio never leave their own infrastructure.', category: 'AI / ML' },
      { tech: 'PydanticAI', reason: 'Extraction output has to be machine-usable. Typed models with validation (owner must be an attendee, due date must parse) let us reject malformed items and retry instead of posting garbage to Slack.', category: 'AI / ML' },
      { tech: 'Claude 3.5 Sonnet', reason: 'Strong at pulling implicit decisions out of polite Japanese phrasing where the conclusion is never stated outright — the single hardest part of the problem.', category: 'AI / ML' },
      { tech: 'pgvector', reason: 'Transcript segments are embedded so users can ask "what did we decide about pricing?" across months of meetings, with answers citing the exact segment.', category: 'Data' },
    ],
    architecture: {
      description: 'Transcription → structured extraction → bilingual delivery, with every item traceable to its source audio.',
      steps: [
        { label: 'Capture', description: 'Bot joins Google Meet / Zoom; audio streamed to self-hosted Whisper v3' },
        { label: 'Transcribe', description: 'Speaker-labeled, language-tagged segments stored in Neon Postgres + pgvector' },
        { label: 'Extract', description: 'Claude + PydanticAI produce typed decisions, actions, questions, and a bilingual summary' },
        { label: 'Validate', description: 'Schema checks (owner, dates, duplicates) gate what is allowed to leave the system' },
        { label: 'Deliver', description: 'Slack post + Notion sync within 2 minutes; two-way completion status' },
      ],
    },
    challenges: [
      {
        title: 'Decisions Nobody Says Out Loud',
        problem: 'In Japanese meetings, agreement is often signalled by silence or a soft "let\'s go in that direction" rather than an explicit decision. Early extraction missed roughly half of real decisions because no sentence stated them.',
        solution: 'Reframed the extraction prompt around "what would a participant believe was agreed," added few-shot examples drawn from the team\'s own meetings, and introduced a confidence field so soft decisions are posted as "implied — confirm?" rather than dropped.',
        outcome: 'Decision recall measured against human notes rose from 52% to 91%, with implied decisions clearly marked for confirmation.',
      },
      {
        title: 'Action Items Without Owners',
        problem: 'Roughly a third of extracted action items had no clear owner, and posting them to Slack created noise nobody acted on.',
        solution: 'Made owner a required field validated against the attendee list, and when the model cannot determine one, the item is posted to the meeting organizer as a single "needs owner" thread instead of to the channel.',
        outcome: 'Action-item completion within one week rose from 44% to 78%, and the channel noise complaints stopped.',
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     9. LLM Eval / Monitoring Dashboard
  ────────────────────────────────────────────────────────────── */
  'llm-eval-monitoring-dashboard': {
    role: 'Full-stack engineer — designed the observability architecture, built the evaluation pipeline, real-time dashboard, and CI/CD integration.',
    duration: '3.5 months',
    problem:
      'Most AI teams ship models without knowing if they work in production. There\'s no standard way to track accuracy, latency, and costs across thousands of daily inferences, detect quality regressions before users notice, or prove to stakeholders that the AI system actually meets its SLAs. Teams discover degradation from user complaints, not metrics.',
    solution:
      'We built a production observability platform that instruments AI applications with OpenTelemetry, evaluates every inference across 15 quality metrics using DeepEval, stores results in ClickHouse for sub-100ms dashboard queries, and integrates with CI/CD to block deployments when evaluation scores drop below thresholds.',
    features: [
      { title: 'Real-time Inference Monitoring', description: 'OpenTelemetry-instrumented pipeline tracks every LLM call — latency (p50/p95/p99), token usage, cost per inference, and error rates — with 100ms dashboard refresh cycles.' },
      { title: '15-Metric Evaluation Suite', description: 'DeepEval runs faithfulness, relevancy, hallucination detection, toxicity, bias, coherence, and 9 more metrics on every inference. RAGAS scores for RAG-specific quality assessment.' },
      { title: 'CI/CD Deploy Gates', description: 'Evaluation suites run as pytest fixtures in the CI pipeline. PRs that reduce any metric below the configured threshold are automatically blocked with detailed regression reports.' },
      { title: 'Anomaly Detection + Alerting', description: 'Statistical anomaly detection on rolling metric windows triggers PagerDuty and Slack alerts when quality deviates >2σ from the 7-day moving average.' },
    ],
    techChoices: [
      { tech: 'ClickHouse', reason: 'Chose ClickHouse over TimescaleDB for metric storage because of its columnar compression and 10-50x faster aggregation queries at our scale (1B+ rows). Dashboard queries that took 3s in Postgres return in 80ms in ClickHouse.', category: 'Data' },
      { tech: 'Tremor v3.0', reason: 'Selected Tremor over custom D3 charts because its pre-built dashboard components match the observability UX patterns that engineering teams already expect. Reduced frontend development time by 60%.', category: 'Frontend' },
      { tech: 'OpenTelemetry', reason: 'Chose OTel over custom instrumentation for vendor neutrality. Teams can export traces to Datadog, Grafana, or Jaeger without changing application code. The semantic conventions also standardize metric naming across services.', category: 'Infrastructure' },
      { tech: 'DeepEval 0.4.2', reason: 'Selected DeepEval over custom eval scripts because of its pytest integration and pre-built metric library. Defining evaluation suites as test files lets us reuse existing CI infrastructure without building a separate eval platform.', category: 'AI / ML' },
    ],
    architecture: {
      description: 'Full-stack observability from instrumentation to real-time dashboards with CI/CD integration.',
      steps: [
        { label: 'Instrumentation', description: 'OpenTelemetry SDK wraps LLM calls → Captures latency, tokens, cost, response' },
        { label: 'Evaluation', description: 'DeepEval runs 15 metrics on each inference → Scores stored alongside trace data' },
        { label: 'Storage', description: 'ClickHouse ingests metric events → Columnar compression for sub-100ms queries on 1B+ rows' },
        { label: 'Dashboard', description: 'Next.js + Tremor renders real-time charts → Accuracy, latency, cost, toxicity panels' },
        { label: 'Alerting', description: 'Anomaly detection on rolling windows → PagerDuty + Slack for quality regressions' },
        { label: 'CI/CD Gate', description: 'pytest eval suites in CI → Block deploy if any metric drops below configured threshold' },
      ],
    },
    challenges: [
      {
        title: 'Dashboard Performance at Scale',
        problem: 'With 10k+ inferences per day generating 15 metrics each, the dashboard queries were scanning 150k+ rows per chart update. Initial Postgres implementation took 3-5 seconds per dashboard load — unusable for real-time monitoring.',
        solution: 'Migrated metric storage to ClickHouse with materialized views for common aggregations (hourly/daily rollups). Implemented query result caching in Redis with 10-second TTL for the most-viewed dashboard panels.',
        outcome: 'Dashboard load time dropped from 4.2s to 180ms. Engineers now keep the dashboard open as a persistent monitoring tab.',
      },
      {
        title: 'Evaluation Overhead in Production',
        problem: 'Running 15 DeepEval metrics on every inference added 800ms+ of latency and doubled LLM costs (each metric requires additional LLM calls for judgment). This was unacceptable for latency-sensitive production paths.',
        solution: 'Implemented async evaluation — inference results are returned immediately while metrics are computed in a background queue (Celery + Redis). For CI/CD gates, synchronous evaluation runs on a representative sample (5%) rather than all inferences.',
        outcome: 'Zero added latency to production inference. Async evaluation queue processes with a median lag of 12 seconds — fast enough for real-time dashboard updates.',
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     10. AI Business Workflow Automator
  ────────────────────────────────────────────────────────────── */
  'ai-business-workflow-automator': {
    role: 'Sole architect & developer — designed the automation graph, built all agent workflows, CRM integrations, and the live workflow dashboard.',
    duration: '3.5 months',
    problem:
      'Sales development teams manually qualify 100+ inbound leads daily — reading form submissions, scoring intent, updating CRM records, scheduling demos, and writing follow-up emails. SDRs spend 70% of their time on this repetitive qualification work instead of high-value conversations, while 40% of qualified leads go cold because follow-up takes too long.',
    solution:
      'We built an end-to-end sales automation system using LangGraph agents that captures website leads, scores intent using Claude, updates HubSpot, schedules demos via Calendly, and runs personalized follow-up sequences — all autonomously. The system handles 85% of SDR workflows with 93% accuracy, processing 1000+ leads per month while generating $187k in qualified pipeline.',
    features: [
      { title: 'Intelligent Lead Scoring', description: 'Claude 4 Sonnet analyzes lead form data, company context (scraped from website), and historical conversion patterns to assign intent scores. "Enterprise RAG" mentions score 3x higher than generic "AI chatbot" inquiries.' },
      { title: 'Automated CRM Updates', description: 'Every lead action — scoring, email sent, demo scheduled, follow-up completed — is automatically logged in HubSpot with full audit trail. Sales managers see pipeline movement in real-time without manual data entry.' },
      { title: 'Personalized Email Sequences', description: 'Claude drafts contextual follow-up emails that reference the lead\'s specific use case, company size, and expressed pain points. Open rates average 42% vs industry standard of 21%.' },
      { title: 'Live Workflow Dashboard', description: 'Next.js dashboard shows every lead\'s journey through the automation pipeline in real-time — lead scoring, CRM updates, scheduled demos, and conversion funnel analytics with ROI metrics.' },
      { title: 'Multi-Path Routing', description: 'High-intent leads get immediate Calendly links + sales notification. Low-intent leads enter nurture sequences with progressive content. Unknown intent triggers clarification emails.' },
    ],
    techChoices: [
      { tech: 'LangGraph 0.2.5', reason: 'Chose LangGraph over n8n/Zapier because lead qualification requires genuine reasoning, not just if-then rules. An agent deciding "this lead mentions compliance requirements — route to enterprise sales" can\'t be replicated with static workflow nodes.', category: 'AI / ML' },
      { tech: 'Supabase', reason: 'Selected Supabase over Firebase for its Postgres foundation — needed complex queries for lead analytics (conversion funnels, cohort analysis) that NoSQL makes painful. Row-level security handles multi-tenant data isolation automatically.', category: 'Data' },
      { tech: 'HubSpot API', reason: 'Integrated HubSpot over Salesforce because most target clients (startups, mid-market) already use HubSpot. Native API support for custom properties, deal pipelines, and email tracking simplified the integration by 60% vs Salesforce\'s SOAP API.', category: 'Backend' },
      { tech: 'SendGrid', reason: 'Chose SendGrid over SES for email delivery because of its superior deliverability analytics and domain warming tools. Cold outreach emails need 95%+ inbox placement — SendGrid\'s IP reputation management makes this achievable.', category: 'Infrastructure' },
    ],
    architecture: {
      description: 'Event-driven lead automation pipeline with multi-path routing and CRM integration.',
      steps: [
        { label: 'Lead Capture', description: 'Website form submission → Webhook trigger → Lead data extraction + company enrichment' },
        { label: 'Intent Scoring', description: 'Claude 4 Sonnet analyzes lead context → Intent classification (High / Medium / Low) + score 0-100' },
        { label: 'CRM Update', description: 'HubSpot contact created/updated → Deal pipeline stage set → Owner assigned based on territory' },
        { label: 'Routing', description: 'High intent → Calendly link + sales Slack alert | Low intent → Nurture sequence | Unknown → Clarification email' },
        { label: 'Follow-up', description: 'Personalized email sequence triggered → Open/click tracking → Escalation on engagement' },
        { label: 'Analytics', description: 'Live dashboard: conversion funnel, ROI metrics, pipeline value, lead source attribution' },
      ],
    },
    challenges: [
      {
        title: 'Lead Scoring Calibration',
        problem: 'Initial intent scoring was binary (qualified/unqualified) with 60% accuracy. Sales team was getting too many low-quality leads, eroding trust in the system. After 2 weeks, reps started ignoring automation-qualified leads entirely.',
        solution: 'Implemented a multi-signal scoring model: form text analysis (30%), company data enrichment via Clearbit (25%), historical conversion pattern matching (25%), and engagement signals (20%). Added a feedback loop where sales reps rate lead quality, which retrains the scoring model weekly.',
        outcome: 'Lead scoring accuracy improved from 60% to 93%. Sales team acceptance rate went from 35% to 89%. Pipeline value from automated leads increased 3.2x.',
      },
      {
        title: 'Email Deliverability at Scale',
        problem: 'Sending 500+ personalized follow-up emails daily from a new domain resulted in 35% going to spam. Gmail and Outlook flagged the sending patterns as bulk automation, effectively killing the follow-up sequences.',
        solution: 'Implemented a 6-week domain warming protocol with SendGrid, gradually increasing daily volume from 20 to 500 emails. Added DKIM, SPF, and DMARC authentication. Introduced send-time randomization and rate limiting (max 50/hour) to mimic human sending patterns.',
        outcome: 'Inbox placement rate improved from 65% to 96%. Email open rates stabilized at 42%, 2x the industry average for automated outreach.',
      },
    ],
  },
}
