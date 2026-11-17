/** Case-study content for project pages, keyed by slug and merged with the base project data at render time. */

// Types

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

// Detail content

export const PROJECT_DETAILS: Record<string, ProjectDetailContent> = {

  // OpenClaw-style personal AI agent
  'openclaw-ai-agent': {
    role: 'Hiroshi designed the agent graph and built the Next.js dashboard. Kenta built the 7 sub-agents and their API integrations. Hiroki built the pgvector memory layer and the production infrastructure.',
    duration: '3 months',
    problem:
      'Executives spend 3+ hours a day on coordination: scheduling meetings, triaging email, updating the CRM. Tools like Zapier run simple if-then rules. They break down when a request needs judgment or touches several apps.',
    solution:
      'We built a multi-agent system on LangGraph\'s supervisor pattern. A central orchestrator reads the request, splits it into sub-tasks and hands them to 7 specialized agents that run in parallel. User preferences are kept in pgvector, so the agent remembers them between sessions. Risky actions, such as a payment over $500 or a code change, wait until the user approves them.',
    features: [
      { title: 'Supervisor with 7 sub-agents', description: 'A LangGraph supervisor splits each request into tasks and runs 7 sub-agents in parallel: Calendar, Transport, Communication, Code, CRM, Research and Admin.' },
      { title: 'Approval before risky actions', description: 'Payments over $500, code pushes and outgoing messages wait for the user to confirm. The thresholds are configurable.' },
      { title: 'Preference memory', description: 'Choices such as Zoom or Meet, United or Delta, and usual meeting times are stored in pgvector and applied to later requests.' },
      { title: 'Live workflow view', description: 'A live DAG shows each agent\'s state, its logs and any pending approvals while a request runs.' },
      { title: 'Service integrations', description: 'The agents call Slack, Google Calendar, GitHub, Twilio SMS and Uber directly. The user talks to all of them through one natural-language interface.' },
    ],
    techChoices: [
      { tech: 'LangGraph 0.2.5', reason: 'We needed tight control over agent transitions and approval gates, and LangGraph models the workflow as an explicit state machine. CrewAI\'s implicit delegation made complex workflows very hard to debug.', category: 'AI / ML' },
      { tech: 'Claude Sonnet 4', reason: 'We use it as the planning model because it follows instructions closely and its structured output is reliable. In our multi-step planning tests, GPT-4o hallucinated tool calls 15% more often.', category: 'AI / ML' },
      { tech: 'Neon Postgres + pgvector', reason: 'At under 100k vectors, serverless Postgres cost less than Pinecone. Keeping the vectors in SQL made preference queries simple and left one less service to run.', category: 'Data' },
      { tech: 'Next.js 15 App Router', reason: 'Server Components cut the dashboard\'s client-side JS by 40%. Server Actions stream the execution logs, so we did not need a separate WebSocket server.', category: 'Frontend' },
    ],
    architecture: {
      description: 'A supervisor agent with specialized sub-agents, approval gates for risky actions and a persistent memory store.',
      steps: [
        { label: 'Input', description: 'Voice or text → intent classification with Claude Sonnet 4' },
        { label: 'Task planning', description: 'LangGraph supervisor splits the request into sub-tasks with a dependency graph' },
        { label: 'Agent dispatch', description: 'CalendarAgent, TransportAgent, CommunicationAgent, CodeAgent and CRMAgent run in parallel' },
        { label: 'Approval gate', description: 'User approval required for risky actions ($500+, code changes, external messages)' },
        { label: 'Execution', description: 'Approved tasks call Google Calendar, Uber, Twilio and GitHub' },
        { label: 'Confirmation', description: 'Results collected → Slack message, dashboard update and SMS confirmation' },
      ],
    },
    challenges: [
      {
        title: 'Deadlocks between agents',
        problem: 'When two sub-agents needed the same state, for example CalendarAgent and TransportAgent both waiting on the appointment time, they could deadlock, and 23% of multi-step requests timed out.',
        solution: 'We switched to message passing with immutable state snapshots. Each agent reads a frozen snapshot and writes to a merge queue. The supervisor resolves conflicts by priority: calendar first, then transport, then notifications.',
        outcome: 'No deadlocks in production. Average coordination latency fell from 8s to 2.3s.',
      },
      {
        title: 'Malformed tool calls',
        problem: 'Claude sometimes produced bad tool call arguments, such as a wrong date format or a missing required field. In early testing, 12% of requests failed at the API.',
        solution: 'We added PydanticAI validation between the model output and the API call. An invalid call goes back to the model with the error and the schema, and the model corrects it. After 2 retries, a person takes over.',
        outcome: 'Tool call success went from 88% to 99.2%. Retries add 400ms on average.',
      },
    ],
  },

  // Production RAG enterprise search
  'production-rag-enterprise-search': {
    role: 'Hiroshi designed the retrieval pipeline and built the streaming frontend. Kenta built reranking and the DeepEval gate in CI, and got the cost down to $0.02 a query. Hiroki built document ingestion and the pgvector indexes.',
    duration: '4 months',
    problem:
      'Companies with 500+ page handbooks, scattered Notion wikis and old PDF archives have no quick way to get a correct answer. Employees spend 30+ minutes looking for a policy, and new hires take weeks to get up to speed. Generic ChatGPT setups hallucinate on 30%+ of questions and show no sources.',
    solution:
      'We built a RAG pipeline that combines BM25 keyword search, dense vector retrieval and ColBERT reranking. It reaches 92% F1. Documents are parsed with Unstructured.io, with LlamaParse for tables, then embedded with Sentence Transformers and stored in pgvector. A DeepEval check blocks any deploy that would take accuracy below 92%.',
    features: [
      { title: 'Hybrid retrieval', description: 'BM25 keyword search plus dense vector search, with MMR for diversity, then ColBERT reranking. On domain-specific queries it beats pure semantic search by 18%.' },
      { title: 'Deploys gated on evals', description: 'CI runs the DeepEval suites on every push. If F1 drops below 0.92, the deploy is blocked and the regression stays out of production.' },
      { title: 'Streaming answers with citations', description: 'PydanticAI structures each answer with inline citations to specific page numbers. Users can check an answer against the source document in one click.' },
      { title: 'Drag-and-drop ingestion', description: 'Users upload PDFs, Notion exports and Google Drive files. Chunking, table extraction and embedding run in the background, with progress shown in the UI.' },
      { title: 'Cost dashboard', description: 'Live per-query cost ($0.02 on average), token usage and retrieval latency.' },
    ],
    techChoices: [
      { tech: 'pgvector + BM25 hybrid', reason: 'Using pgvector rather than Pinecone kept retrieval and structured data in one database. We added pg_trgm for keyword matching, and on technical documentation the hybrid search was 18% more accurate than vector search alone.', category: 'Data' },
      { tech: 'ColBERT reranker', reason: 'ColBERT was 3x faster than a cross-encoder at similar accuracy. Late interaction keeps token-level matching without the latency of full cross-attention.', category: 'AI / ML' },
      { tech: 'FastAPI + streaming', reason: 'We chose FastAPI over Django because async streaming is built in. Server-Sent Events push tokens to the browser as they are generated, which feels like ChatGPT without the extra work of running WebSockets.', category: 'Backend' },
      { tech: 'DeepEval', reason: 'DeepEval over RAGAS because its test runner fits into CI. Eval suites are pytest fixtures, so blocking a deploy on an accuracy regression needed no custom infrastructure.', category: 'Infrastructure' },
    ],
    architecture: {
      description: 'Hybrid search and reranking, with every deploy gated on eval scores.',
      steps: [
        { label: 'Ingestion', description: 'Upload → Unstructured.io (PDF parsing) + LlamaParse (tables) → sentence chunking' },
        { label: 'Embedding', description: 'Sentence Transformers (all-MiniLM-L6-v2) → pgvector, plus a BM25 index' },
        { label: 'Retrieval', description: 'Query → hybrid search (dense + BM25 + MMR) → top 20 candidates' },
        { label: 'Reranking', description: 'ColBERT scores the top 20 → 5 most relevant passages' },
        { label: 'Synthesis', description: 'Claude 3.5 Sonnet writes the answer, with citations structured by PydanticAI' },
        { label: 'Delivery', description: 'FastAPI streams over SSE → Next.js frontend with inline source links' },
      ],
    },
    challenges: [
      {
        title: 'Tables mangled by PDF parsing',
        problem: 'Standard PDF parsers flattened tables, so financial and policy tables turned into meaningless text chunks. Table data was involved in 35% of handbook queries.',
        solution: 'We send table-heavy pages through LlamaParse, which rebuilds the table structure with a vision model. A table-aware chunker keeps row and column relationships intact in the embeddings.',
        outcome: 'Accuracy on table questions went from 61% to 89%. The finance team said the system finally "understood" the compensation tables.',
      },
      {
        title: 'Slow retrieval at 50k chunks',
        problem: 'With 50k+ document chunks, a hybrid search query took 4.2 seconds. Users of an interactive search tool expect an answer in under 2 seconds.',
        solution: 'We added an HNSW index in pgvector (ef_construction=200, m=16) and a Redis cache for repeated questions. The cache ended up serving 40% of production traffic.',
        outcome: 'P95 retrieval latency fell from 4.2s to 380ms. Cached queries return in under 50ms.',
      },
    ],
  },

  // AI trading terminal
  'ai-trading-terminal': {
    role: 'Hiroshi built the charting frontend and the paper trading engine. Kenta built the FastAPI WebSocket service and the Claude signal engine. Hiroki built the market data pipeline on Redis Streams and the indicator calculations.',
    duration: '4 months',
    problem:
      'Professional trading terminals cost $24k+ a year, which rules out most retail traders, small desks and fintech startups. Open-source charting tools show price data but offer no AI analysis, backtesting or portfolio optimization.',
    solution:
      'We built a trading dashboard with live 1-minute candles (updated every 15 seconds), 25+ technical indicators and buy/sell signals from Claude that weigh price action against macro data. A paper trading engine models fills with slippage and commissions, and the backtester reports Sharpe ratios under realistic market conditions.',
    features: [
      { title: 'Live market data', description: 'WebSockets stream SPY and TSLA 1-minute candles every 15 seconds, along with order book depth and trade history. Recharts v3 draws each update in under a frame.' },
      { title: 'AI trade signals', description: 'Claude 3.5 Sonnet reads price, RSI, MACD, VIX and yield curves together and returns signals such as "Strong buy: RSI 28 + MACD crossover + VIX spike", each with a confidence score.' },
      { title: 'Paper trading', description: 'A $100k virtual portfolio with realistic fills, slippage and commissions. Position sizes are suggested from the Kelly criterion and portfolio correlation.' },
      { title: 'Backtesting', description: 'Backtrader runs strategies on historical data with realistic fill assumptions and reports Sharpe ratio, max drawdown, win rate and the equity curve.' },
      { title: '25+ technical indicators', description: 'RSI, MACD, Bollinger Bands, EMA, SMA, ATR, OBV, Stochastic, Ichimoku Cloud and more. Each one is configurable and drawn on the interactive chart.' },
    ],
    techChoices: [
      { tech: 'FastAPI + WebSockets', reason: 'Native async WebSockets and generated OpenAPI docs made FastAPI a better fit than Express. Redis Streams buffer bursts of market data, so no updates are dropped when volatility spikes.', category: 'Backend' },
      { tech: 'Recharts v3', reason: 'We picked it over Lightweight Charts because it renders as React components and is easy to customize. Canvas rendering keeps 10k+ data points at 60fps, which smooth 1-minute candles need.', category: 'Frontend' },
      { tech: 'Claude 3.5 Sonnet', reason: 'Its analysis was more conservative and better reasoned than GPT-4o\'s. GPT-4o tended toward overconfident signals, while Claude hedged in a way that fits how uncertain markets are.', category: 'AI / ML' },
      { tech: 'Redis Streams', reason: 'At our throughput, under 10k messages/sec, Kafka was not worth its operational overhead. Redis Streams gave us reliable at-least-once delivery with 80% less infrastructure.', category: 'Infrastructure' },
    ],
    architecture: {
      description: 'Streaming market data with an AI analysis layer and a paper trading simulator on top.',
      steps: [
        { label: 'Data ingestion', description: 'yfinance + AlphaVantage + FRED APIs → Redis Streams (market data buffer)' },
        { label: 'Processing', description: 'TA-Lib computes 25+ indicators → FastAPI combines them across timeframes' },
        { label: 'AI analysis', description: 'Claude 3.5 Sonnet reads price, indicators and macro context → signals with confidence scores' },
        { label: 'Delivery', description: 'WebSocket push to the Next.js frontend → Recharts draws live candles and signal overlays' },
        { label: 'Simulation', description: 'Paper trades fill against live data → portfolio tracker updates P&L, Sharpe and drawdown' },
      ],
    },
    challenges: [
      {
        title: 'Chart jank during live updates',
        problem: 'With 10k+ candles and indicator overlays on screen, React re-renders took 200ms+. The chart visibly stuttered on every 15-second update.',
        solution: 'We moved rendering to a virtualized canvas layer and moved indicator calculations into Web Workers, off the main thread. Each tick appends data instead of replacing the whole array.',
        outcome: 'Frame time fell from 200ms to 8ms. Charts hold 60fps with all 25 indicators visible.',
      },
      {
        title: 'Signals arriving too late',
        problem: 'Claude takes 2-3 seconds to respond, which is too slow for a fast market. By the time a "buy" signal appeared, the price had often moved 0.3%+.',
        solution: 'We had the model analyze incoming data continuously in the background and prepare signals in advance. When conditions match a precomputed scenario, the signal appears in under 200ms.',
        outcome: 'For 70% of signals, latency fell from 2.8s to 180ms. The other 30% come from new market conditions and still take 1.8s, with a "Computing..." indicator.',
      },
    ],
  },

  // Bilingual support agent (JP/EN)
  'bilingual-support-agent': {
    role: 'Hiroshi led the architecture, designed the LangGraph conversation graph and built the web chat UI and agent console. Kenta built the retrieval and escalation services and the LINE adapter. Hiroki built knowledge-base ingestion and versioning.',
    duration: '4 months',
    problem:
      'A Japanese retailer with a growing overseas customer base had one small team answering LINE and web chat in two languages. Tier-1 questions (order status, returns, size guides, store hours) made up about 70% of volume, and every one still needed a person. English tickets waited hours longer than Japanese ones. Earlier chatbots had failed because they answered confidently from stale FAQ pages and lost the context when a ticket was handed to staff.',
    solution:
      'We built an agent that detects the language of each message, answers from a versioned knowledge base of policies and product data with citations, and takes real actions such as order lookups and returns through typed tools. When confidence is low or the customer asks for a person, it hands off to Zendesk with the language, the intent, what has already been checked and a suggested reply. Staff never have to ask the customer to repeat themselves.',
    features: [
      { title: 'Language detection per message', description: 'Each message is classified as JP or EN on its own, so customers who switch languages get a reply in the one they just used. Tone presets cover Japanese keigo and casual English.' },
      { title: 'Answers with citations', description: 'Hybrid pgvector and BM25 retrieval over policy documents and the product catalog. Every answer links to its source paragraph, and a nightly freshness check flags stale documents.' },
      { title: 'Typed action tools', description: 'Order status, returns and store hours run as Pydantic-validated tools against the retailer\'s APIs. Idempotency keys make sure a retried message never creates a second return.' },
      { title: 'Handoff to staff', description: 'Escalations arrive in Zendesk with the language, intent, verified facts and a draft reply. Staff accept, edit or reject the draft, and rejections go into the eval set.' },
      { title: 'Agent console', description: 'A Next.js console shows live conversations, retrieval traces and confidence scores. The support lead can pause the agent on any topic with one click.' },
    ],
    techChoices: [
      { tech: 'LangGraph', reason: 'The support flow has explicit states (classify, retrieve, act, confirm, escalate), and the agent must never start a return without a confirmation step. With an explicit graph we could prove that. With a free-form ReAct loop we could not.', category: 'AI / ML' },
      { tech: 'Claude Sonnet 4', reason: 'Of the models we tested on 400 real tickets, it wrote the best Japanese and kept keigo the most consistent. It was also the most reliable at declining to answer when retrieval found nothing relevant.', category: 'AI / ML' },
      { tech: 'pgvector', reason: 'The knowledge base is under 50k chunks and already sat next to the order data in Postgres. Keeping retrieval in the same database made citations, versioning and the nightly freshness checks simpler.', category: 'Data' },
      { tech: 'LINE Messaging API', reason: 'LINE is the main support channel for Japanese customers. The channel adapter lets one agent graph serve LINE, web chat and email with no channel-specific prompts.', category: 'Backend' },
    ],
    architecture: {
      description: 'One support agent for every channel. It picks the language per message, cites its sources, acts through typed tools and escalates with a structured handoff.',
      steps: [
        { label: 'Channel adapter', description: 'LINE, web chat and email messages normalized into one conversation model' },
        { label: 'Language and intent', description: 'Claude classifies language and intent per message; conversation state stored in Redis' },
        { label: 'Retrieve or act', description: 'Hybrid pgvector + BM25 retrieval with citations, or typed tool calls to the order and return APIs' },
        { label: 'Confidence gate', description: 'Low confidence or a request for a person → Zendesk handoff with a draft reply' },
        { label: 'Reply and learn', description: 'Reply streamed to the channel; staff edits and rejections flow back into the eval set' },
      ],
    },
    challenges: [
      {
        title: 'Customers who switch languages',
        problem: 'Overseas customers living in Japan often mixed languages in one conversation: a Japanese product name inside an English sentence, or a switch to Japanese for an address. Detecting the language once per conversation produced a reply in the wrong language about 18% of the time.',
        solution: 'We moved detection to each message, with a short rolling context, and made the reply follow the language of the customer\'s latest message. We also built an eval set of 120 mixed-language exchanges from real tickets.',
        outcome: 'Wrong-language replies fell from 18% to under 2%. Satisfaction on English tickets matched Japanese tickets for the first time.',
      },
      {
        title: 'Citing outdated policies',
        problem: 'The retailer updated its return policy every season, but old PDF versions stayed in the document store. The agent quoted them accurately and still gave wrong answers, because the cited document had been superseded.',
        solution: 'We added versioning with effective dates to the ingestion pipeline. A nightly job flags chunks whose source has a newer version, and retrieval only returns policy that is currently in effect. Superseded chunks are kept for audit but never cited.',
        outcome: 'Policy-related escalations fell 64% the following quarter. The support lead can see which policy version answered any ticket.',
      },
    ],
  },

  // Local SLM coding assistant
  'local-slm-coding-assistant': {
    role: 'Hiroshi built the VS Code extension and the Tauri desktop app. Kenta built model comparison and routing on top of Ollama. Hiroki built the performance benchmarking suite.',
    duration: '2.5 months',
    problem:
      'Cloud coding assistants send proprietary code to outside servers, which breaks compliance rules for clients in healthcare, finance and defense. Large teams also pay $500+ a month in API costs.',
    solution:
      'We built an offline coding assistant that runs three small language models (Qwen 2.5, Llama 3.3 and Mistral Small) on the developer\'s laptop through Ollama. It benchmarks the models as it runs and sends each task to the best fit: Qwen for fast completions, Llama for harder reasoning, Mistral when memory is tight. There are no API costs, and no data leaves the machine.',
    features: [
      { title: 'Model comparison and routing', description: 'Live benchmarks of Qwen 2.5 (72B), Llama 3.3 (70B) and Mistral Small (24B) on speed, accuracy and memory use. Each task goes to the model that suits it best.' },
      { title: 'VS Code extension', description: 'An LSP-based extension for inline completions, code explanations, refactoring suggestions and unit test generation, all inside the editor.' },
      { title: 'Pull requests from the editor', description: 'Highlight buggy code and describe the fix. The assistant rewrites the code, writes tests and opens a PR without leaving VS Code.' },
      { title: 'Fully local inference', description: 'All inference runs locally through Ollama with CUDA or AVX2 acceleration. There are no network requests, telemetry or API keys, and code never leaves the developer\'s machine.' },
    ],
    techChoices: [
      { tech: 'Ollama 0.3.8', reason: 'We used Ollama instead of llama.cpp directly for its model management and hot-swapping. Switching between Qwen, Llama and Mistral takes under 2 seconds, compared with 30+ seconds when loading models by hand.', category: 'AI / ML' },
      { tech: 'Tauri', reason: 'For the desktop wrapper, Tauri gave us an 8MB binary where Electron needed 80MB (10x smaller), plus native WebView2 rendering. Next to a running LLM, every MB of RAM counts.', category: 'Frontend' },
      { tech: 'WebGPU', reason: 'A fallback for machines without CUDA. It is 40% slower than CUDA, but it gives GPU acceleration on AMD and Intel GPUs that Ollama\'s default CUDA path does not support.', category: 'Infrastructure' },
      { tech: 'VS Code LSP', reason: 'We built on the Language Server Protocol instead of VS Code\'s own extension API, so the same extension works unmodified in Cursor, Neovim and any other LSP-compatible editor.', category: 'Frontend' },
    ],
    architecture: {
      description: 'Everything runs on the developer\'s machine. A router picks the model, and the editor talks to it over LSP.',
      steps: [
        { label: 'Input', description: 'VS Code extension sends the code context and the user\'s instruction over LSP' },
        { label: 'Model selection', description: 'Task classifier picks a model based on complexity, speed and available RAM' },
        { label: 'Inference', description: 'Ollama runs the chosen model (Qwen, Llama or Mistral) with CUDA or WebGPU acceleration' },
        { label: 'Post-processing', description: 'AST check confirms the generated code is syntactically valid before it is shown' },
        { label: 'Delivery', description: 'Results stream back to VS Code as inline completions, diff views or a new PR' },
      ],
    },
    challenges: [
      {
        title: 'Running out of RAM',
        problem: 'A 70B parameter model running next to VS Code and a browser used 24GB+ of RAM. On 16GB developer machines that meant swap thrashing, and the tool was unusable on standard hardware.',
        solution: 'The assistant checks free memory and picks a quantization level to match: Q4_K_M (4-bit) on 16GB machines, Q5_K_M on 32GB and Q8 on 64GB+. On long contexts, the KV cache is pruned aggressively.',
        outcome: 'It runs well on 16GB MacBooks, with the model using under 8GB. Quantization costs 3% on HumanEval.',
      },
      {
        title: 'Slow completions',
        problem: 'Completions first took 800ms+ because of model cold starts and tokenization overhead. Cloud copilots respond in 200-300ms, so ours felt sluggish.',
        solution: 'We added speculative decoding. A small draft model (Mistral 7B) runs continuously and proposes likely completions, and the larger model checks them in a single forward pass, accepting 60-70% of the draft tokens.',
        outcome: 'Median completion latency fell from 800ms to 280ms. In blind testing, users said it felt "as fast as GitHub Copilot".',
      },
    ],
  },

  // Factory vision QA pipeline
  'factory-vision-qa': {
    role: 'Hiroshi owned the inference pipeline, the edge deployment and the operator dashboard. Kenta built the inference service and the shadow-mode rollout. Hiroki built ingestion, labeling and the ClickHouse analytics layer.',
    duration: '5 months, then ongoing partnership',
    problem:
      'A parts manufacturer in Kanagawa inspected every unit by eye at the end of the line. Inspectors caught most defects, but fatigue pushed miss rates up late in each shift, and once a part was scrapped there was no record of what the defect looked like. An off-the-shelf vision system had been trialed and abandoned because it flagged 30% of good parts and nobody could tell why.',
    solution:
      'We built a pipeline that takes frames from the existing line cameras and runs a YOLOv8 model, fine-tuned on the plant\'s own labeled defects, on an edge GPU. Operators see every flag with the frame, a heatmap and a plain-language reason, and confirm or override it with one tap. Each decision is stored in ClickHouse and feeds the next training cycle. The model never stops the line on its own. Operators decide what happens to each part.',
    features: [
      { title: 'Inference on site', description: 'YOLOv8, exported to TensorRT, runs at 38ms per frame on a single GPU in the plant, so no images leave the factory network.' },
      { title: 'Flags with a reason', description: 'Each detection comes with a Grad-CAM heatmap and a short template reason ("scratch, 4mm, top-left face"), so operators can see why a part was flagged.' },
      { title: 'One-tap feedback', description: 'Confirm and override buttons on a touch dashboard. Overrides become labeled examples and are reviewed before they enter the training set.' },
      { title: 'Defect analytics', description: 'ClickHouse stores every frame decision. The plant can now see defect trends by shift, station and supplier, which it never could before.' },
      { title: 'Shadow-mode rollout', description: 'A new model version runs next to the current one for a week. It is promoted only if it matches or beats recall on the held-out set, and operators never see it before then.' },
    ],
    techChoices: [
      { tech: 'YOLOv8 (PyTorch)', reason: 'Fast enough for real-time detection on modest edge hardware, and easy to fine-tune on the small, imbalanced defect dataset we started with. Segmentation models were more accurate on paper but too slow for the line.', category: 'AI / ML' },
      { tech: 'FastAPI', reason: 'A thin inference service on the edge box serves detections over a local API, so the dashboard, logging and future stations all share one contract.', category: 'Backend' },
      { tech: 'ClickHouse', reason: 'The per-frame decision log grows by millions of rows a week. ClickHouse keeps the per-shift and per-supplier analytics interactive without a separate warehouse.', category: 'Data' },
      { tech: 'OpenTelemetry', reason: 'Inference latency, camera dropouts and GPU memory are traced end to end. When the line slows down, we can tell within minutes whether the model, a camera or the network is responsible.', category: 'Infrastructure' },
    ],
    architecture: {
      description: 'Detection runs on an edge GPU, operators confirm each flag, and their decisions feed retraining.',
      steps: [
        { label: 'Capture', description: 'Line cameras → frame sampler synced to the conveyor encoder' },
        { label: 'Inference', description: 'YOLOv8 / TensorRT on the edge GPU → detections + Grad-CAM heatmaps (38ms)' },
        { label: 'Operator review', description: 'Next.js touch dashboard shows the flag, heatmap and reason → one-tap confirm or override' },
        { label: 'Decision store', description: 'Every frame decision and operator action written to ClickHouse' },
        { label: 'Retrain and promote', description: 'Overrides labeled → nightly fine-tune → shadow-mode comparison → gated promotion' },
      ],
    },
    challenges: [
      {
        title: 'Night-shift lighting',
        problem: 'Accuracy dropped sharply on the night shift. The cause was the building: skylights changed the ambient light, and a model trained on day-shift frames produced 3x more false positives at night.',
        solution: 'We added a lighting normalization step, augmented training with synthetic exposure shifts and installed a $120 diffused light panel at the inspection station. We also track false positives per hour, so drift shows up before operators start complaining.',
        outcome: 'Night-shift false positives came down to within 10% of day-shift levels. The per-hour metric has since caught two degrading cameras early.',
      },
      {
        title: 'Rare defects with few examples',
        problem: 'Hairline cracks, the most expensive defect class, appeared in fewer than 40 labeled frames. The model either ignored them or flagged every scratch as a crack.',
        solution: 'We ran a focused data collection sprint with the plant\'s QA lead and used copy-paste augmentation to transplant crack regions onto good parts. Then we trained a small secondary classifier that only runs on frames the detector marks as ambiguous.',
        outcome: 'Crack recall rose from 61% to 97% with no measurable increase in overall false positives.',
      },
    ],
  },

  // Multi-agent code reviewer
  'multi-agent-code-reviewer': {
    role: 'Hiroshi designed the review pipeline and built the GitHub integration. Kenta built the 3 LangGraph agents and wired in Semgrep and CodeQL. Hiroki built the review history in Neon Postgres and the feedback data behind the confidence scores.',
    duration: '2.5 months',
    problem:
      'Senior engineers spend 8-12 hours a week reviewing PRs, and the average review takes 2-3 days to come back. Tired reviewers let serious bugs through, and junior developers wait days for feedback, which slows down how fast they learn.',
    solution:
      'We built a review system with 3 agents. A Planner decides what to check based on the PR\'s scope. An Analyzer looks for security vulnerabilities, performance problems and logic bugs using Claude plus static analysis tools. A Fixer writes corrected code with unit tests. Results are posted as GitHub PR comments, and some issues get a fix PR.',
    features: [
      { title: 'Three review agents', description: 'PlannerAgent writes a review checklist for the PR. AnalyzerAgent reports issues with severity and confidence scores. FixerAgent writes corrected code with unit tests. A LangGraph supervisor coordinates them.' },
      { title: 'Security and static analysis', description: 'Claude\'s review runs alongside Semgrep (OWASP patterns) and CodeQL (data flow analysis), which together catch both pattern-based and logic-based vulnerabilities.' },
      { title: 'Fix PRs', description: 'For high-confidence issues, the system opens a fix PR with the corrected code, unit tests (92% minimum coverage) and a commit message that explains the change. It can be merged in one click.' },
      { title: 'Review history', description: 'Every review is stored in Neon Postgres with its outcome: whether the suggestion was accepted and whether the fix was correct. We use that history to improve the reviews over time.' },
    ],
    techChoices: [
      { tech: 'LangGraph supervisor', reason: 'Different PRs need different reviews, so we used a supervisor graph rather than a fixed sequence. A CSS-only PR skips security analysis, while a database migration gets extra scrutiny. The supervisor picks the route for each PR.', category: 'AI / ML' },
      { tech: 'Semgrep + CodeQL', reason: 'The two tools catch different classes of vulnerability. Semgrep is good at pattern matching (SQL injection, XSS). CodeQL\'s data flow analysis finds injection chains that cross function boundaries.', category: 'Backend' },
      { tech: 'Claude 3.5 Sonnet', reason: 'Claude was better at understanding what the code was meant to do. GPT-4o produced more false positives (32% against Claude\'s 11%), and that much noise trains developers to ignore real issues.', category: 'AI / ML' },
      { tech: 'GitHub Checks API', reason: 'We report through GitHub Checks so results sit with the rest of CI. Each review appears as a check run with line-level annotations, where developers already look.', category: 'Infrastructure' },
    ],
    architecture: {
      description: 'Three agents review each PR with help from static analysis, and fixes are generated for high-confidence issues.',
      steps: [
        { label: 'PR webhook', description: 'GitHub webhook fires on PR open or update → fetch diff, file tree and commit history' },
        { label: 'Planning', description: 'PlannerAgent reads the PR scope → review checklist with focus areas and skip rules' },
        { label: 'Analysis', description: 'AnalyzerAgent runs Claude, Semgrep and CodeQL in parallel → ranked issue list with severity and confidence' },
        { label: 'Fix generation', description: 'FixerAgent fixes high-confidence issues → writes unit tests → validates with pytest (92% minimum coverage)' },
        { label: 'GitHub output', description: 'PR comments with inline annotations, fix PRs and an updated GitHub Checks status' },
      ],
    },
    challenges: [
      {
        title: 'Too many false positives',
        problem: 'Early versions flagged 40+ issues per PR, and 35% of them were false positives. Developers started ignoring every suggestion, which defeated the point of automated review.',
        solution: 'We calibrated confidence from historical feedback. Each suggestion gets a confidence score trained on what developers accepted and rejected. Only suggestions above 75% confidence are shown by default, and the rest sit in an expandable "lower confidence" section.',
        outcome: 'The false positive rate fell from 35% to 8%. Developers engaged with 71% of suggestions, up from 23%.',
      },
      {
        title: 'Large PRs and the context window',
        problem: 'PRs with 50+ changed files did not fit in Claude\'s context window. Truncating them made the analyzer miss cross-file issues, which are also the bugs people find hardest to catch.',
        solution: 'Analysis now runs in two passes. The first reviews each file on its own. The second finds cross-file dependencies and reviews only the connected groups of files together, using AST-based dependency resolution to decide which files interact.',
        outcome: 'Cross-file bug detection improved by 45%. Large PRs (100+ files) used to time out and now finish review in 90 seconds.',
      },
    ],
  },

  // Meeting intelligence platform
  'meeting-intelligence-platform': {
    role: 'Hiroshi designed the extraction pipeline and the PydanticAI schemas, and built the meeting review UI. Kenta built the Claude extraction service and the Slack and Notion integrations. Hiroki built transcript storage and the pgvector search layer.',
    duration: '3 months',
    problem:
      'A Tokyo product team ran every meeting in a mix of Japanese and English. Whoever was least busy took notes, action items lived in three places, and English-speaking members regularly missed decisions made in a Japanese side conversation. Existing meeting assistants transcribed one language well and the other badly, and their summaries read as if written for a different company.',
    solution:
      'We built a bot that joins the call and transcribes it with Whisper v3, with speaker labels and language detection per segment. Claude then extracts decisions, action items with an owner and due date, open questions and a summary in both languages, constrained by PydanticAI schemas. Results are posted to the right Slack channel and Notion page within two minutes, and every item links back to the transcript segment it came from.',
    features: [
      { title: 'Bilingual transcription', description: 'Whisper v3 detects the language of each segment, so switching between JP and EN mid-meeting works. Speaker diarization makes sure action items are attributed to the right person.' },
      { title: 'Typed extraction', description: 'Decisions, action items and questions are extracted into typed PydanticAI models. The owner must be an attendee and due dates must be real dates, so nothing vague reaches Slack.' },
      { title: 'Summaries in both languages', description: 'Each meeting gets a Japanese and an English summary. Both are generated from the same structured items instead of being translated from each other, so they say the same thing.' },
      { title: 'Links to the source', description: 'Each item links to the transcript segment and audio timestamp behind it. Arguments about who said what are settled in seconds.' },
      { title: 'Slack and Notion sync', description: 'Action items are posted to the channel the meeting was scheduled from and synced to a Notion database. Marking an item done in one place updates the other.' },
    ],
    techChoices: [
      { tech: 'Whisper v3', reason: 'It had the best accuracy we measured on Japanese business speech, and we could host it ourselves. The team required that audio never leave their own infrastructure.', category: 'AI / ML' },
      { tech: 'PydanticAI', reason: 'Extraction output has to be usable by code. Typed models with validation (the owner is an attendee, the due date parses) let us reject a malformed item and retry instead of posting junk to Slack.', category: 'AI / ML' },
      { tech: 'Claude 3.5 Sonnet', reason: 'Good at finding decisions in polite Japanese phrasing where the conclusion is never stated outright, which was the hardest part of the problem.', category: 'AI / ML' },
      { tech: 'pgvector', reason: 'Transcript segments are embedded, so users can ask "what did we decide about pricing?" across months of meetings and get answers that cite the exact segment.', category: 'Data' },
    ],
    architecture: {
      description: 'Transcription, then structured extraction, then delivery in two languages. Every item can be traced to its source audio.',
      steps: [
        { label: 'Capture', description: 'Bot joins Google Meet or Zoom → audio streamed to self-hosted Whisper v3' },
        { label: 'Transcribe', description: 'Speaker-labeled, language-tagged segments stored in Neon Postgres + pgvector' },
        { label: 'Extract', description: 'Claude + PydanticAI produce typed decisions, actions, questions and a summary in both languages' },
        { label: 'Validate', description: 'Schema checks (owner, dates, duplicates) decide what is allowed to leave the system' },
        { label: 'Deliver', description: 'Slack post + Notion sync within 2 minutes; completion status syncs both ways' },
      ],
    },
    challenges: [
      {
        title: 'Decisions nobody says out loud',
        problem: 'In Japanese meetings, agreement is often signaled by silence or a soft "let\'s go in that direction" instead of an explicit decision. Early extraction missed about half of the real decisions because no sentence stated them.',
        solution: 'We reframed the extraction prompt around "what would a participant believe was agreed?", added few-shot examples from the team\'s own meetings and added a confidence field. Soft decisions are posted as "implied: confirm?" instead of being dropped.',
        outcome: 'Measured against human notes, decision recall rose from 52% to 91%, and implied decisions are marked for confirmation.',
      },
      {
        title: 'Action items without owners',
        problem: 'About a third of extracted action items had no clear owner, and posting them to Slack created noise that nobody acted on.',
        solution: 'We made owner a required field and validate it against the attendee list. When the model cannot determine an owner, the item goes to the meeting organizer as a single "needs owner" thread instead of to the channel.',
        outcome: 'Action items completed within a week rose from 44% to 78%, and the complaints about channel noise stopped.',
      },
    ],
  },

  // LLM eval and monitoring dashboard
  'llm-eval-monitoring-dashboard': {
    role: 'Hiroshi designed the architecture and built the Next.js dashboard. Kenta built the OpenTelemetry instrumentation, the DeepEval pipeline and the CI gates. Hiroki built the ClickHouse storage, the rollups and the anomaly alerts.',
    duration: '3.5 months',
    problem:
      'Many AI teams ship models without knowing how they behave in production. There is no standard way to track accuracy, latency and cost across thousands of inferences a day, catch quality regressions before users do, or show stakeholders that the system meets its SLAs. Teams usually find out about degradation from user complaints.',
    solution:
      'We built an observability platform for AI applications. OpenTelemetry instruments every call, DeepEval scores each inference on 15 quality metrics, and the results go into ClickHouse so dashboard queries return in under 100ms. The same evals run in CI and block a deploy when a score falls below its threshold.',
    features: [
      { title: 'Live inference monitoring', description: 'OpenTelemetry tracks every LLM call: latency (p50/p95/p99), token usage, cost per inference and error rate. The dashboard refreshes every 100ms.' },
      { title: '15 evaluation metrics', description: 'DeepEval scores every inference on faithfulness, relevancy, hallucination, toxicity, bias, coherence and 9 more metrics. RAGAS adds RAG-specific quality scores.' },
      { title: 'Deploy gates in CI', description: 'Eval suites run as pytest fixtures in the CI pipeline. A PR that pushes any metric below its threshold is blocked, with a report of what regressed.' },
      { title: 'Anomaly alerts', description: 'Anomaly detection on rolling metric windows sends PagerDuty and Slack alerts when quality moves more than 2σ from its 7-day moving average.' },
    ],
    techChoices: [
      { tech: 'ClickHouse', reason: 'We store metrics in ClickHouse rather than TimescaleDB. At 1B+ rows, its columnar compression made aggregation queries 10-50x faster, and dashboard queries that took 3s in Postgres return in 80ms.', category: 'Data' },
      { tech: 'Tremor v3.0', reason: 'Its prebuilt dashboard components already follow the observability UI patterns engineers expect, so we did not need custom D3 charts. It cut frontend development time by 60%.', category: 'Frontend' },
      { tech: 'OpenTelemetry', reason: 'We used OTel rather than custom instrumentation so nobody is tied to one vendor. Teams can send traces to Datadog, Grafana or Jaeger without changing application code, and the semantic conventions keep metric names consistent across services.', category: 'Infrastructure' },
      { tech: 'DeepEval 0.4.2', reason: 'Its pytest integration and ready-made metrics meant we did not have to write our own eval scripts. Eval suites are ordinary test files, so they run on the existing CI without a separate eval platform.', category: 'AI / ML' },
    ],
    architecture: {
      description: 'Every LLM call is traced and scored. The results feed live dashboards and alerts, and the same evals gate deploys in CI.',
      steps: [
        { label: 'Instrumentation', description: 'OpenTelemetry SDK wraps LLM calls → captures latency, tokens, cost and response' },
        { label: 'Evaluation', description: 'DeepEval runs 15 metrics on each inference → scores stored with the trace data' },
        { label: 'Storage', description: 'ClickHouse ingests metric events → columnar compression keeps queries on 1B+ rows under 100ms' },
        { label: 'Dashboard', description: 'Next.js + Tremor render live charts → accuracy, latency, cost and toxicity panels' },
        { label: 'Alerting', description: 'Anomaly detection on rolling windows → PagerDuty + Slack alerts on quality regressions' },
        { label: 'CI/CD gate', description: 'pytest eval suites in CI → deploy blocked if any metric drops below its threshold' },
      ],
    },
    challenges: [
      {
        title: 'Slow dashboard queries',
        problem: 'At 10k+ inferences a day with 15 metrics each, every chart update scanned 150k+ rows. The first version on Postgres took 3-5 seconds to load the dashboard, which is too slow for live monitoring.',
        solution: 'We moved metric storage to ClickHouse, with materialized views for the common hourly and daily rollups. The most-viewed panels cache their query results in Redis with a 10-second TTL.',
        outcome: 'Dashboard load time fell from 4.2s to 180ms. Engineers now keep the dashboard open in a tab as their monitoring view.',
      },
      {
        title: 'Eval cost in the request path',
        problem: 'Running 15 DeepEval metrics on every inference added 800ms+ of latency and doubled LLM costs, since each metric needs extra LLM calls to make its judgment. That was not acceptable on latency-sensitive production paths.',
        solution: 'Evaluation now runs asynchronously. Inference results return immediately, and metrics are computed in a background queue (Celery + Redis). For the CI gates, synchronous evals run on a representative 5% sample instead of every inference.',
        outcome: 'No added latency on production inference. The eval queue runs with a median lag of 12 seconds, which is fast enough for the live dashboard.',
      },
    ],
  },

  // AI business workflow automator
  'ai-business-workflow-automator': {
    role: 'Hiroshi designed the automation graph and built the live dashboard. Kenta built the LangGraph agents and the HubSpot, Calendly and SendGrid integrations. Hiroki built lead enrichment, the Supabase analytics and the weekly retraining of the scoring model.',
    duration: '3.5 months',
    problem:
      'Sales development teams qualify 100+ inbound leads a day by hand: reading form submissions, scoring intent, updating the CRM, scheduling demos and writing follow-up emails. SDRs spend 70% of their time on this instead of on sales conversations, and 40% of qualified leads go cold because follow-up takes too long.',
    solution:
      'We built a set of LangGraph agents that capture website leads, score intent with Claude, update HubSpot, schedule demos through Calendly and run personalized follow-up sequences without manual steps. The system handles 85% of the SDR workflow with 93% accuracy, processes 1000+ leads a month and has generated $187k in qualified pipeline.',
    features: [
      { title: 'Lead scoring', description: 'Claude Sonnet 4 scores intent from the form data, company context scraped from the lead\'s website and historical conversion patterns. Leads that mention "Enterprise RAG" score 3x higher than generic "AI chatbot" inquiries.' },
      { title: 'CRM updates', description: 'Every action on a lead (scoring, emails sent, demos scheduled, follow-ups completed) is logged in HubSpot with an audit trail. Sales managers see the pipeline move in real time without manual data entry.' },
      { title: 'Personalized follow-ups', description: 'Claude drafts follow-up emails that refer to the lead\'s use case, company size and the problems they described. Open rates average 42%, against an industry norm of 21%.' },
      { title: 'Live workflow dashboard', description: 'A Next.js dashboard shows where each lead is in the pipeline in real time: scores, CRM updates, scheduled demos, and conversion funnel analytics with ROI figures.' },
      { title: 'Routing by intent', description: 'High-intent leads get a Calendly link right away and sales is notified. Low-intent leads go into a nurture sequence. When intent is unclear, the system sends an email asking for more detail.' },
    ],
    techChoices: [
      { tech: 'LangGraph 0.2.5', reason: 'Qualifying a lead takes judgment that n8n or Zapier rules cannot express. A decision like "this lead mentions compliance requirements, so route it to enterprise sales" does not fit in a static workflow node.', category: 'AI / ML' },
      { tech: 'Supabase', reason: 'Lead analytics (conversion funnels, cohort analysis) need queries that are painful in NoSQL, so we picked Supabase, which runs on Postgres, over Firebase. Row-level security handles multi-tenant data isolation.', category: 'Data' },
      { tech: 'HubSpot API', reason: 'Most target clients (startups and mid-market companies) already use HubSpot, so we integrated it instead of Salesforce. Its API supports custom properties, deal pipelines and email tracking directly, which made the integration 60% simpler than with Salesforce\'s SOAP API.', category: 'Backend' },
      { tech: 'SendGrid', reason: 'SendGrid over SES for its deliverability analytics and domain warming tools. Cold outreach needs 95%+ inbox placement, and SendGrid\'s IP reputation management made that achievable.', category: 'Infrastructure' },
    ],
    architecture: {
      description: 'An event-driven pipeline that scores each lead, updates the CRM and routes the lead by intent.',
      steps: [
        { label: 'Lead capture', description: 'Website form submission → webhook → lead data extraction + company enrichment' },
        { label: 'Intent scoring', description: 'Claude Sonnet 4 reads the lead context → intent class (High / Medium / Low) + score 0-100' },
        { label: 'CRM update', description: 'HubSpot contact created or updated → deal pipeline stage set → owner assigned by territory' },
        { label: 'Routing', description: 'High intent → Calendly link + Slack alert to sales; low intent → nurture sequence; unknown → clarification email' },
        { label: 'Follow-up', description: 'Personalized email sequence starts → open and click tracking → escalation when the lead engages' },
        { label: 'Analytics', description: 'Live dashboard: conversion funnel, ROI metrics, pipeline value and lead source attribution' },
      ],
    },
    challenges: [
      {
        title: 'Lead scores sales did not trust',
        problem: 'The first version scored intent as qualified or unqualified, with 60% accuracy. Sales received too many weak leads and stopped trusting the system. After 2 weeks, reps were ignoring automation-qualified leads altogether.',
        solution: 'We replaced it with a model that combines several signals: form text (30%), company data from Clearbit (25%), historical conversion patterns (25%) and engagement (20%). Sales reps rate lead quality, and their ratings retrain the model every week.',
        outcome: 'Scoring accuracy went from 60% to 93%. The sales team\'s acceptance rate rose from 35% to 89%, and pipeline value from automated leads grew 3.2x.',
      },
      {
        title: 'Follow-ups landing in spam',
        problem: 'Sending 500+ personalized follow-ups a day from a new domain put 35% of them in spam. Gmail and Outlook flagged the sending pattern as bulk automation, which made the follow-up sequences useless.',
        solution: 'We warmed the domain over 6 weeks with SendGrid, raising daily volume from 20 to 500 emails. We set up DKIM, SPF and DMARC, randomized send times and capped sending at 50 an hour so the pattern looks more like a person sending mail.',
        outcome: 'Inbox placement rose from 65% to 96%. Open rates settled at 42%, 2x the industry average for automated outreach.',
      },
    ],
  },
}
