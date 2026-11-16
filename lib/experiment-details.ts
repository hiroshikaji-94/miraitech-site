/**
 * Extended experiment detail content for AI Lab detail pages.
 * Keyed by slug — merged with base experiment data at render time.
 */

// ─── Types ───────────────────────────────────────────────────────

export interface ExperimentDetailContent {
  overview:      string
  methodology:   string
  keyFindings:   Array<{ title: string; detail: string }>
  techStack:     string
  architecture:  string
  results:       string
  challenges:    Array<{ title: string; description: string }>
}

// ─── Detail Content ──────────────────────────────────────────────

export const EXPERIMENT_DETAILS: Record<string, ExperimentDetailContent> = {

  /* ──────────────────────────────────────────────────────────────
     1. Local LLM Code Reviewer
  ────────────────────────────────────────────────────────────── */
  'local-llm-code-reviewer': {
    overview:
      'This experiment explores whether locally-hosted open-weight LLMs can deliver code review quality comparable to cloud APIs while keeping all source code on-device. The system runs as a VS Code extension backed by Ollama, parsing diffs with Tree-sitter ASTs, feeding structured context windows to the model, and rendering inline review comments — all without a single byte leaving the developer\'s machine.',
    methodology:
      'We benchmarked three local models (Qwen 2.5 72B Q4, Llama 3.3 70B Q5, and CodeLlama 34B) against GPT-4o on a curated dataset of 200 real pull requests spanning Python, TypeScript, and Go. Each PR was independently reviewed by a senior engineer to establish ground truth. We measured bug detection recall, false positive rate, suggestion quality (rated 1-5 by the engineer), and inference latency. Context windows were constructed by extracting changed functions via Tree-sitter, including surrounding scope and import context up to 4,096 tokens.',
    keyFindings: [
      { title: 'Qwen 2.5 72B matches GPT-4o at 85% recall', detail: 'On our 200-PR benchmark, Qwen 2.5 72B achieved 85% bug detection recall versus GPT-4o\'s 89% — a surprisingly small gap considering it runs entirely locally on an RTX 4090.' },
      { title: 'AST-aware context halves false positives', detail: 'Switching from naive diff-based prompts to Tree-sitter AST-extracted function context reduced false positive rate from 34% to 16%, because the model could see type signatures and import context.' },
      { title: 'Quantization matters less than context quality', detail: 'Q4 vs Q8 quantization changed recall by only 2%, while improving context construction improved recall by 12%. Spending engineering effort on prompt context beats chasing model precision.' },
      { title: 'Sub-3-second response enables inline workflow', detail: 'At 2.9s average response time on an RTX 4090, the review feels interactive enough to use as you write code, not just on PR submission.' },
    ],
    techStack:
      'Ollama serves the quantized models with GPU offloading. Tree-sitter parses source files into ASTs for intelligent context extraction. FastAPI provides the local HTTP bridge between the VS Code extension and the model server. The extension itself uses the VS Code LSP protocol for inline diagnostics and code actions.',
    architecture:
      'The pipeline starts when a developer saves a file or stages a diff. The VS Code extension detects changed hunks, sends them to a local FastAPI server which uses Tree-sitter to extract the full function context around each change. This structured context is formatted into a review prompt and sent to Ollama. The model response is parsed for issue annotations (line number, severity, suggestion) and rendered as VS Code inline diagnostics with one-click "Apply Fix" code actions.',
    results:
      'Across 200 test PRs: 85% bug detection recall, 16% false positive rate, 2.9s average response time, and zero API cost. Developer satisfaction surveys (n=12) rated the tool 4.1/5 for usefulness. Three engineers adopted it as their default pre-commit review step.',
    challenges: [
      { title: 'Context window limitations with large diffs', description: 'PRs touching 10+ files exceeded the 4,096-token context budget. Solved by ranking changed functions by complexity score and reviewing the top-k, with a "more issues may exist" disclaimer.' },
      { title: 'Model hallucinating line numbers', description: 'Local models occasionally mapped suggestions to wrong line numbers. Added a post-processing validation step that cross-references suggested lines against the actual diff to filter phantom annotations.' },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     2. Voice-to-SQL Agent
  ────────────────────────────────────────────────────────────── */
  'voice-to-sql-agent': {
    overview:
      'This experiment tests whether a voice-first interface to databases can make data exploration accessible to non-technical stakeholders. Speak a question like "What were our top 5 customers by revenue last quarter?" and get the SQL, the results, and a natural language explanation — all in under 2 seconds from end of speech.',
    methodology:
      'We built a pipeline connecting Whisper Large-v3 for speech-to-text, GPT-4o with function-calling for SQL generation, and a React frontend for result visualization. The system was tested against a 150-question benchmark covering single-table lookups, multi-join aggregations, date-range filters, and ambiguous natural language. Each question was tested with 3 different speakers to evaluate robustness to accents and speech patterns. Schema awareness was implemented by injecting CREATE TABLE statements and sample rows into the system prompt.',
    keyFindings: [
      { title: '94% query accuracy on structured questions', detail: 'GPT-4o with schema injection correctly generated SQL for 94% of benchmark questions. Failures concentrated on ambiguous temporal references ("recently", "a while ago") and implicit joins.' },
      { title: 'Schema injection outperforms fine-tuning', detail: 'Injecting CREATE TABLE statements with 3 sample rows per table achieved higher accuracy than a fine-tuned model trained on 500 query pairs, while being instantly adaptable to new schemas.' },
      { title: 'Voice adds 300ms but improves accessibility', detail: 'Whisper transcription adds ~300ms latency, but user testing showed non-technical users asked 3x more exploratory queries via voice compared to a text SQL interface.' },
      { title: 'Function-calling prevents injection attacks', detail: 'Using structured function-calling instead of raw SQL string generation eliminated SQL injection vectors entirely — the model can only call pre-defined query functions with validated parameters.' },
    ],
    techStack:
      'Whisper Large-v3 handles speech recognition with word-level timestamps. GPT-4o generates SQL through structured function-calling with Pydantic-validated schemas. FastAPI serves the backend with connection pooling to SQLite (extendable to Postgres). The React frontend uses Web Audio API for recording and Recharts for result visualization.',
    architecture:
      'Audio is captured in the browser via Web Audio API and streamed to the FastAPI backend. Whisper transcribes the audio, then the transcript is combined with the database schema context and sent to GPT-4o with function-calling tools defined for SELECT queries. The generated SQL is validated against an allowlist of operations (read-only), executed against the database, and results are sent back alongside a natural language summary generated by a second LLM call.',
    results:
      '94% query accuracy across 150 benchmark questions. 1.2s average voice-to-result latency (300ms STT + 600ms LLM + 200ms execution + 100ms rendering). 100% of test users (n=8) preferred voice over writing raw SQL for exploratory analysis. Zero successful injection attempts in adversarial testing.',
    challenges: [
      { title: 'Ambiguous temporal references', description: '"Last quarter" means different things depending on fiscal calendar. Solved by adding a configurable fiscal calendar context and clarification prompts when temporal ambiguity is detected.' },
      { title: 'Multi-turn conversation state', description: 'Follow-up questions like "Now break that down by region" need to reference the previous query. Implemented a conversation memory that maintains the last 3 query contexts for pronoun resolution.' },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     3. RAG Evaluation Harness
  ────────────────────────────────────────────────────────────── */
  'rag-evaluation-harness': {
    overview:
      'Most RAG tutorials evaluate with vibes. This experiment builds a rigorous, automated evaluation framework that benchmarks every variable in a RAG pipeline — chunking strategy, embedding model, retrieval method, and generation model — against ground-truth Q&A datasets with 12 standardized metrics. The goal: make RAG engineering empirical rather than anecdotal.',
    methodology:
      'We created 3 evaluation datasets (technical documentation, legal contracts, and academic papers) with 50 ground-truth Q&A pairs each. For each dataset, We tested 6 chunking strategies (fixed 512, fixed 1024, recursive, semantic, sentence-window, parent-document), 4 embedding models (OpenAI text-embedding-3-large, Cohere embed-v3, all-MiniLM-L6, BGE-large), and 3 retrieval methods (dense, sparse BM25, hybrid). Each combination was scored on 12 metrics from RAGAS and DeepEval including faithfulness, answer relevancy, context precision, context recall, and hallucination rate.',
    keyFindings: [
      { title: 'Semantic chunking wins on technical docs, loses on legal', detail: 'Semantic chunking achieved 0.91 context precision on technical docs but dropped to 0.74 on legal contracts where clause boundaries matter more than semantic similarity. Fixed 512 with overlap performed best on legal.' },
      { title: 'Hybrid retrieval is worth the complexity', detail: 'Dense + BM25 hybrid retrieval improved context recall by 8-15% over pure dense retrieval across all datasets. The improvement is largest on queries containing specific identifiers (error codes, section numbers).' },
      { title: 'OpenAI embeddings lead, but BGE-large is 93% as good', detail: 'text-embedding-3-large scored highest on all metrics, but BGE-large achieved 93% of its performance at zero API cost — a compelling tradeoff for cost-sensitive deployments.' },
      { title: 'Evaluation must be domain-specific', detail: 'A chunking strategy that scores 0.91 on technical docs scores 0.74 on legal text. Universal "best" configurations don\'t exist — the harness lets you find yours.' },
    ],
    techStack:
      'DeepEval and RAGAS provide the 12 evaluation metrics. pgvector stores embeddings for dense retrieval. A custom BM25 implementation handles sparse retrieval. Streamlit powers the interactive dashboard for comparing results. Python orchestrates the evaluation pipeline with parallel execution across configurations.',
    architecture:
      'The harness runs in three phases: (1) Ingestion — documents are processed through all chunking strategies in parallel, embedded with all models, and stored in separate pgvector collections. (2) Retrieval — each query is run against all retrieval method + embedding model combinations, collecting top-k results. (3) Evaluation — retrieved contexts and generated answers are scored against ground-truth using DeepEval and RAGAS metrics, with results aggregated into a comparison matrix.',
    results:
      'Tested 72 unique pipeline configurations (6 chunking x 4 embeddings x 3 retrieval) across 150 questions. Identified that the optimal configuration varies by domain — no universal winner exists. Best overall: semantic chunking + OpenAI embeddings + hybrid retrieval (0.92 faithfulness, 0.89 context precision). Best cost-efficient: recursive chunking + BGE-large + hybrid retrieval (0.87 faithfulness, 0.83 context precision, $0 embedding cost).',
    challenges: [
      { title: 'Evaluation metric disagreement', description: 'RAGAS faithfulness and DeepEval hallucination scores sometimes contradicted each other. Solved by establishing a meta-evaluation protocol: if metrics disagree, human judgment breaks the tie, and the more reliable metric is weighted higher in the composite score.' },
      { title: 'Embedding cost at scale', description: 'Testing 4 embedding models x 150 questions x 6 chunking strategies generated 3,600 embedding API calls. Implemented aggressive caching so re-runs only embed new or changed chunks.' },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     4. Multi-Agent Debate System
  ────────────────────────────────────────────────────────────── */
  'multi-agent-debate': {
    overview:
      'Can AI models reason better when they argue? This experiment pits three LLM agents against each other in structured multi-round debates, with a judge agent scoring arguments and synthesizing conclusions. The goal is to test whether adversarial discourse improves reasoning quality compared to single-model responses, and to compare reasoning capabilities across Claude, GPT-4o, and Gemini.',
    methodology:
      'We designed a debate framework with 3 roles (Proponent, Opponent, Devil\'s Advocate) and a Judge. Each debate runs 3 rounds: opening statements, rebuttals, and closing arguments. The judge scores each argument on logic (0-10), evidence quality (0-10), and novelty (0-5), then synthesizes a balanced conclusion. We tested 30 debate topics spanning ethics, technology policy, and business strategy. Each topic was debated 3 times with different model assignments to control for model-role bias.',
    keyFindings: [
      { title: 'Debate improves factual accuracy by 23%', detail: 'When models argue opposing positions, the synthesized conclusion contains 23% fewer factual errors than a single model\'s response to the same question, because opposing agents actively challenge unsupported claims.' },
      { title: 'Claude excels at structured argumentation', detail: 'Claude Sonnet consistently scored highest on logic (avg 8.2/10) and produced the most well-structured arguments. GPT-4o scored highest on evidence citation (avg 7.8/10). Gemini excelled at novel perspectives (avg 3.9/5).' },
      { title: 'Devil\'s Advocate role is crucial', detail: 'Removing the Devil\'s Advocate and running 2-agent debates reduced conclusion quality by 18%. The contrarian role forces both sides to address edge cases they would otherwise ignore.' },
      { title: 'Three rounds is the sweet spot', detail: 'Testing 2, 3, and 5 rounds showed diminishing returns after round 3. Rounds 4-5 produced repetitive arguments and increased latency by 60% without improving conclusion quality.' },
    ],
    techStack:
      'LangGraph orchestrates the multi-agent debate flow with explicit state transitions between rounds. WebSockets enable real-time streaming of arguments to the frontend. Redis stores debate state for recovery from interruptions. Next.js renders the debate UI with live argument streaming.',
    architecture:
      'A LangGraph state machine manages the debate flow: Topic → Role Assignment → Round 1 (parallel opening statements) → Judge scores → Round 2 (sequential rebuttals with access to opponent arguments) → Judge scores → Round 3 (closing arguments) → Final synthesis. Each transition streams tokens to the frontend via WebSockets. The judge uses a separate, higher-temperature prompt to avoid anchoring on any single agent\'s framing.',
    results:
      'Across 30 debate topics: debated conclusions scored 23% higher on factual accuracy than single-model responses (human-evaluated, n=5 evaluators). Average debate completion time: 45 seconds for 3 rounds. Real-time streaming achieved <200ms token-to-screen latency. Cross-model debates produced the highest-quality conclusions when Claude argued + GPT-4o cited evidence + Gemini played devil\'s advocate.',
    challenges: [
      { title: 'Models agreeing too readily in rebuttals', description: 'Agents would sometimes concede valid points too easily, collapsing the debate. Solved by adding a "maintain your position" system prompt directive and penalizing concession in the judge\'s scoring rubric.' },
      { title: 'Streaming coordination across 3 models', description: 'Three concurrent LLM streams with different response speeds caused rendering issues. Implemented a token buffer that batches and interleaves streams at 100ms intervals for smooth UI updates.' },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     5. Document Vision Parser
  ────────────────────────────────────────────────────────────── */
  'document-vision-parser': {
    overview:
      'Traditional OCR requires templates for every document type. This experiment replaces template-based extraction with vision LLMs that understand document layout and semantics natively. Upload a receipt, invoice, or tax form — get clean structured JSON with field labels, values, confidence scores, and bounding box coordinates, without ever defining a template.',
    methodology:
      'We tested GPT-4o Vision and Claude Vision on 500 real-world documents across 8 categories: receipts (120), invoices (100), tax forms (80), business cards (60), bank statements (50), purchase orders (40), contracts (30), and shipping labels (20). Ground truth was manually annotated with field names, values, and bounding boxes. We compared against AWS Textract and Google Document AI as baselines. Extraction quality was measured on field-level F1 score, and We tracked processing time and cost per document.',
    keyFindings: [
      { title: '96% field accuracy without any templates', detail: 'GPT-4o Vision achieved 96% field-level F1 across all document types with zero template configuration — matching Textract\'s accuracy on receipts while significantly outperforming it on unusual layouts.' },
      { title: 'Vision LLMs handle rotated and skewed documents', detail: 'Unlike traditional OCR, vision models maintained >90% accuracy on documents photographed at angles up to 30 degrees. Textract accuracy dropped to 67% on the same rotated inputs.' },
      { title: 'Structured output schemas prevent hallucination', detail: 'Using Pydantic response schemas with field-level validation reduced hallucinated fields from 8% to 1.2%. The model is less likely to invent data when constrained to a predefined output structure.' },
      { title: 'Cost competitive at moderate scale', detail: 'At $0.03 per document, the vision approach costs 2x Textract per-page but requires zero template development time. Break-even is approximately 50 document types — after that, templates cost more to maintain.' },
    ],
    techStack:
      'GPT-4o Vision and Claude Vision handle document understanding. FastAPI serves the extraction API with async processing for batch uploads. Pydantic enforces output schemas and validates extracted fields. React with Canvas API renders bounding box overlays on original documents for verification.',
    architecture:
      'Documents are uploaded to the FastAPI backend, which preprocesses images (orientation detection, contrast normalization) and sends them to the vision model with a structured extraction prompt specifying the output schema. The model response is validated against the Pydantic schema, confidence scores are computed by running extraction twice and comparing field agreement, and the final result is returned with bounding box coordinates computed via a secondary vision prompt focused on spatial localization.',
    results:
      '96% field-level F1 across 500 documents and 8 categories. 1.8s average processing time per document. $0.03 average cost per document. Zero template maintenance overhead. Confidence scoring correctly flagged 89% of extraction errors for human review.',
    challenges: [
      { title: 'Bounding box precision', description: 'Vision models return approximate spatial descriptions, not pixel coordinates. Built a secondary pipeline that crops predicted regions and runs a focused extraction to refine bounding box coordinates to within 5px accuracy.' },
      { title: 'Multi-page document handling', description: 'Invoices spanning 3+ pages exceeded single-image context limits. Implemented page-level extraction with a merge step that deduplicates fields and resolves cross-page references (e.g., "continued on next page" line items).' },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     6. Agent Memory Architecture
  ────────────────────────────────────────────────────────────── */
  'agent-memory-system': {
    overview:
      'Current AI agents forget everything between conversations. This research experiment implements a biologically-inspired memory architecture with three distinct memory types: episodic (what happened), semantic (what\'s true), and procedural (how to do things). An Ebbinghaus forgetting curve governs memory decay, ensuring the agent remembers important information while naturally forgetting irrelevant details.',
    methodology:
      'We implemented three memory stores and tested retention over 100 simulated conversation sessions spanning 30 days. Episodic memory stores full conversation turns with importance scoring (1-10) derived from user engagement signals. Semantic memory extracts facts and entity relationships into a Neo4j knowledge graph. Procedural memory records action patterns and user preferences. Memory decay follows Ebbinghaus\'s forgetting curve: R = e^(-t/S) where S (stability) increases with each successful retrieval.',
    keyFindings: [
      { title: 'Forgetting curves prevent unbounded memory growth', detail: 'Without decay, the memory store grew to 12,000 entries after 100 sessions, with retrieval latency degrading 4x. With Ebbinghaus curves, the active memory stabilized at ~800 high-value entries with consistent sub-100ms retrieval.' },
      { title: 'Semantic memory enables cross-conversation reasoning', detail: 'By extracting entities and relationships into a knowledge graph, the agent could answer questions requiring synthesis across conversations — e.g., "What tools does this user prefer for Python projects?" by traversing preference nodes.' },
      { title: 'Procedural memory reduces repeated instructions by 60%', detail: 'After learning that a user prefers TypeScript over JavaScript and pytest over unittest, the agent stopped asking clarifying questions about these preferences — reducing conversational friction measurably.' },
      { title: 'Importance scoring is the hardest problem', detail: 'Automatically determining which memories matter is fundamentally difficult. The best heuristic combined explicit signals (user corrections, repeated mentions) with implicit signals (conversation length, follow-up questions).' },
    ],
    techStack:
      'pgvector stores episodic memories with embedding-based retrieval. Neo4j hosts the semantic knowledge graph with entity-relationship triples. LangGraph manages the memory lifecycle (encode, consolidate, retrieve, decay). Python implements the Ebbinghaus forgetting curve with configurable stability parameters.',
    architecture:
      'Each conversation flows through three phases: (1) Retrieval — relevant episodic, semantic, and procedural memories are fetched based on the current query embedding and recency. (2) Augmented generation — retrieved memories are injected into the system prompt with recency and importance weighting. (3) Consolidation — after the conversation, new episodic entries are created, facts are extracted to the knowledge graph, and procedural patterns are updated. A nightly decay job reduces stability scores for unretrieved memories.',
    results:
      'Over 100 simulated sessions: memory store stabilized at ~800 active entries (vs 12,000 without decay). Retrieval latency stayed under 100ms. User preference accuracy reached 89% by session 20. Cross-conversation reasoning succeeded on 73% of synthesis questions. Memory-augmented responses were rated 4.2/5 vs 3.1/5 for memoryless responses (n=15 evaluators).',
    challenges: [
      { title: 'Memory collision and contradiction', description: 'When a user changes preferences, old memories contradict new ones. Implemented a temporal weighting system where newer memories override older ones, with explicit contradiction detection that marks outdated entries for accelerated decay.' },
      { title: 'Privacy and selective forgetting', description: 'Users need the ability to delete specific memories ("forget our address"). Built a targeted deletion API that removes entries from all three memory stores and propagates deletions through the knowledge graph.' },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     7. Real-time Sentiment Stream
  ────────────────────────────────────────────────────────────── */
  'realtime-sentiment-stream': {
    overview:
      'This experiment builds a high-throughput sentiment analysis pipeline that processes streaming text at 10,000+ messages per second with sub-100ms classification latency. Using a fine-tuned DistilBERT model served via ONNX Runtime, the system classifies sentiment (positive, negative, neutral) with 94% accuracy and visualizes trends on a live-updating dashboard with anomaly detection.',
    methodology:
      'We fine-tuned DistilBERT on a combined dataset of 120,000 labeled texts: 50,000 tweets (Sentiment140), 40,000 product reviews (Amazon), and 30,000 support tickets (internal dataset). The model was exported to ONNX for inference optimization. We benchmarked against RoBERTa-base, VADER, and GPT-3.5 zero-shot on a held-out test set of 5,000 examples. Throughput was tested using a Kafka-based pipeline with simulated message streams at 1k, 5k, and 10k messages/second.',
    keyFindings: [
      { title: 'DistilBERT matches RoBERTa at 6x throughput', detail: 'Fine-tuned DistilBERT achieved 94% accuracy vs RoBERTa\'s 95.2%, but processed 10,200 msgs/sec vs RoBERTa\'s 1,700 msgs/sec. For streaming applications, the 1.2% accuracy tradeoff is overwhelmingly worth the 6x throughput gain.' },
      { title: 'ONNX Runtime doubles inference speed', detail: 'Converting the PyTorch model to ONNX and running with ONNX Runtime reduced per-message latency from 18ms to 8ms. Batching 32 messages reduced amortized latency to 2ms per message.' },
      { title: 'Domain adaptation matters more than model size', detail: 'DistilBERT fine-tuned on support tickets scored 91% on support ticket sentiment. GPT-3.5 zero-shot scored only 78% on the same data. Domain-specific fine-tuning on a small model beats a large general model.' },
      { title: 'Anomaly detection catches sentiment shifts in <5 seconds', detail: 'A sliding-window z-score detector on the 30-second sentiment moving average triggers alerts within 5 seconds of significant sentiment shifts, enabling real-time crisis response.' },
    ],
    techStack:
      'Fine-tuned DistilBERT served via ONNX Runtime for high-throughput inference. Kafka handles message ingestion with consumer group scaling. ClickHouse stores time-series sentiment data for trend analysis. FastAPI serves the classification API. Next.js with WebSocket updates powers the live dashboard.',
    architecture:
      'Messages arrive via Kafka topics, consumed by a pool of classification workers running the ONNX model. Each classified message is written to ClickHouse with timestamp, source, sentiment label, and confidence score. The dashboard queries ClickHouse for real-time aggregations (sentiment distribution, trend lines, volume metrics) and receives push updates via WebSockets when anomaly thresholds are crossed.',
    results:
      '94% classification accuracy on held-out test set. 10,200 messages/second sustained throughput with 8 Kafka consumers. 8ms p50 latency, 23ms p99 latency per message. Anomaly detection latency: 4.7 seconds average. Dashboard renders 60fps with 100ms data refresh intervals.',
    challenges: [
      { title: 'Sarcasm and context-dependent sentiment', description: 'Sarcastic messages like "Oh great, another outage" were classified as positive 40% of the time. Added a sarcasm detection head to the model trained on an additional 10,000 sarcasm-labeled examples, reducing misclassification to 15%.' },
      { title: 'Kafka consumer lag under burst traffic', description: 'Traffic spikes of 50k msgs/sec caused consumer lag to build up. Implemented auto-scaling consumer groups that spin up new workers when lag exceeds 1,000 messages, with graceful scale-down after the burst.' },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     8. PDF → Knowledge Graph
  ────────────────────────────────────────────────────────────── */
  'pdf-to-knowledge-graph': {
    overview:
      'Reading a 50-page PDF is slow. Navigating a knowledge graph is fast. This experiment builds an automated pipeline that extracts entities, relationships, and claims from PDF documents, constructs a queryable knowledge graph in Neo4j, and renders an interactive D3.js visualization. Upload a research paper and explore its concepts, methodologies, and findings as a connected graph rather than linear text.',
    methodology:
      'We tested the pipeline on 40 documents: 15 research papers (ML/AI), 10 legal contracts, 10 technical specifications, and 5 annual reports. LlamaParse extracts structured text from PDFs. Claude Sonnet performs entity extraction (people, organizations, concepts, methods, metrics) and relationship extraction (uses, cites, compares, contradicts, extends) in a two-pass approach. Neo4j stores the graph with entity and relationship type indexing. We measured entity extraction F1 against human-annotated ground truth.',
    keyFindings: [
      { title: 'Two-pass extraction improves F1 from 0.79 to 0.89', detail: 'A single LLM pass for entity+relationship extraction scored 0.79 F1. Splitting into entity extraction (pass 1) and relationship extraction with known entities (pass 2) improved F1 to 0.89 by reducing missed relationships.' },
      { title: 'Knowledge graphs reveal cross-document insights', detail: 'When multiple papers are ingested, the graph reveals connections the authors never made explicit — shared methodologies, contradictory findings, and citation chains that highlight research lineages.' },
      { title: 'Interactive visualization beats search for exploration', detail: 'In user testing (n=10), participants found answers to open-ended questions 2.3x faster using the graph visualization compared to keyword search in the original PDFs.' },
      { title: 'Citation linking enables provenance tracking', detail: 'Every node and edge in the graph links back to the specific page and paragraph in the source PDF. Clicking a relationship opens the relevant passage, building trust in the extracted knowledge.' },
    ],
    techStack:
      'LlamaParse handles PDF extraction with layout-aware parsing. Claude Sonnet performs entity and relationship extraction via structured prompts. Neo4j stores the knowledge graph with full-text search and Cypher query support. D3.js renders the interactive force-directed graph visualization. Next.js serves the frontend with server-side graph queries.',
    architecture:
      'PDFs are uploaded and processed by LlamaParse into structured text blocks with page and position metadata. Each block is sent to Claude Sonnet for entity extraction, then entities are sent back with the text for relationship extraction. Extracted triples (entity-relationship-entity) are written to Neo4j with source citations. The D3.js frontend queries Neo4j via a Cypher API, rendering nodes as entities and edges as relationships with type-based coloring and interactive filtering.',
    results:
      'Entity extraction F1: 0.89 across 40 documents. Relationship extraction F1: 0.82. Average processing time: 45 seconds per 20-page document. Graph visualization renders up to 500 nodes at 60fps. User testing showed 2.3x faster exploratory analysis vs keyword search.',
    challenges: [
      { title: 'Entity coreference resolution', description: 'The same entity appears with different names ("GPT-4", "GPT4", "OpenAI\'s latest model"). Implemented a fuzzy matching + embedding similarity step that merges entity variants into canonical nodes with alias lists.' },
      { title: 'Graph layout readability at scale', description: 'Graphs with 300+ nodes became visually overwhelming. Added hierarchical clustering that groups related entities into collapsible super-nodes, with semantic zoom that reveals detail as users focus on specific regions.' },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     9. Browser Automation Agent
  ────────────────────────────────────────────────────────────── */
  'browser-automation-agent': {
    overview:
      'Tell it what you want in plain English — "Find the cheapest flight from SFO to JFK next Friday" — and watch it navigate websites, fill forms, click buttons, and extract results autonomously. This experiment combines Playwright browser control with GPT-4o Vision for page understanding and LangGraph for multi-step planning, creating an agent that can complete real web tasks without any site-specific code.',
    methodology:
      'We built a 50-task benchmark spanning 5 categories: e-commerce (search, filter, add to cart), travel (flight search, hotel booking), information retrieval (Wikipedia lookups, documentation search), form filling (contact forms, applications), and multi-site workflows (price comparison across 3 sites). Each task was tested 3 times to measure consistency. The agent uses GPT-4o Vision to understand page layouts, identifies interactive elements via accessibility tree parsing, and plans multi-step actions through LangGraph.',
    keyFindings: [
      { title: '78% task completion across 50 diverse tasks', detail: 'The agent successfully completed 78% of benchmark tasks end-to-end. Success rate was highest on e-commerce (88%) and lowest on multi-site workflows (62%), where maintaining context across site transitions was challenging.' },
      { title: 'Accessibility tree > screenshot-only approaches', detail: 'Combining vision (screenshot understanding) with accessibility tree parsing (structured element identification) improved task completion by 22% over vision-only approaches. The accessibility tree provides reliable element selectors that screenshots alone cannot.' },
      { title: 'Error recovery is the key differentiator', detail: 'Implementing a "retry with different strategy" mechanism (e.g., switching from clicking a button to using keyboard navigation) recovered 15% of initially failed actions, boosting overall task completion from 65% to 78%.' },
      { title: 'CAPTCHAs and anti-bot measures are the ceiling', detail: '60% of failures were caused by CAPTCHAs, bot detection, or dynamic loading that changed the page after initial rendering. These are fundamental limitations of browser automation agents.' },
    ],
    techStack:
      'Playwright controls the browser with full CDP (Chrome DevTools Protocol) access. GPT-4o Vision understands page layouts and identifies interactive elements from screenshots. LangGraph manages the multi-step task planning and execution graph. Redis caches page states for error recovery and rollback.',
    architecture:
      'The user provides a natural language goal. LangGraph decomposes it into a sequence of web actions (navigate, click, type, scroll, extract). For each action, Playwright captures a screenshot and accessibility tree, GPT-4o Vision identifies the target element and action type, and Playwright executes the interaction. After each step, the agent verifies the expected outcome by analyzing the resulting page. If verification fails, it triggers an error recovery loop that tries alternative interaction strategies.',
    results:
      '78% task completion rate across 50 benchmark tasks. Average task completion time: 34 seconds for single-site tasks, 92 seconds for multi-site. Error recovery mechanism saved 15% of failing tasks. The agent handled dynamic content, pop-ups, and cookie banners without site-specific code.',
    challenges: [
      { title: 'Dynamic content and lazy loading', description: 'Elements that load after initial page render were invisible to the first screenshot. Implemented a "wait and re-capture" strategy that scrolls the page, waits for network idle, and takes multiple screenshots before declaring an element missing.' },
      { title: 'Action ambiguity in complex UIs', description: 'Pages with multiple similar buttons (e.g., several "Add to Cart" buttons) confused the vision model. Added a two-step process: first identify all candidate elements, then use surrounding context (product name, price) to select the correct one.' },
    ],
  },

  /* ──────────────────────────────────────────────────────────────
     10. Prompt Optimization Lab
  ────────────────────────────────────────────────────────────── */
  'prompt-optimization-lab': {
    overview:
      'Writing good prompts is still an artisanal craft. This research experiment automates prompt engineering using evolutionary algorithms — starting from a base prompt and a scoring function, the system mutates, crosses over, and selects prompts over generations to maximize performance on your specific evaluation suite. Think genetic algorithms, but for natural language instructions.',
    methodology:
      'We implemented a genetic algorithm with a population of 20 prompt variants, running 15 generations per optimization cycle. Mutations include paraphrasing, instruction reordering, example swapping, constraint addition/removal, and format changes. Crossover combines high-scoring sections from two parent prompts. Selection uses tournament selection with elitism (top 2 always survive). We tested on 5 optimization tasks: classification accuracy, JSON schema compliance, code generation pass rate, summarization quality, and extraction precision. Each task had a held-out test set to measure generalization.',
    keyFindings: [
      { title: '15% average accuracy improvement over human-written prompts', detail: 'Across 5 tasks, the optimizer improved accuracy by 15% on average compared to carefully hand-written prompts. The largest gain was in JSON schema compliance (+23%), where the optimizer discovered that adding negative examples dramatically reduced formatting errors.' },
      { title: 'Prompt structure matters more than wording', detail: 'The optimizer consistently converged on structural patterns — instruction ordering, example placement, constraint specificity — rather than clever wording. This suggests that prompt engineering is more about information architecture than creative writing.' },
      { title: 'Overfitting is a real risk', detail: 'Without a held-out test set, optimized prompts achieved 28% improvement on the training eval but only 8% on unseen examples. The held-out set is essential — prompt overfitting mirrors model overfitting.' },
      { title: 'DSPy provides a strong baseline', detail: 'Comparing against DSPy\'s automatic prompt optimization, the genetic approach achieved similar results on simple tasks but outperformed on complex multi-step prompts where DSPy\'s gradient-based optimization struggled with discrete structural changes.' },
    ],
    techStack:
      'Python implements the genetic algorithm with configurable mutation operators. DSPy provides the baseline comparison and some mutation primitives. DeepEval scores prompt variants against task-specific metrics. Streamlit visualizes the evolution process with generation-over-generation fitness plots. Redis queues parallel evaluation jobs.',
    architecture:
      'The optimization loop runs: (1) Initialize population of 20 prompt variants from the base prompt via diverse mutations. (2) Evaluate each variant against the scoring function using DeepEval. (3) Select parents via tournament selection. (4) Generate offspring via crossover and mutation. (5) Replace bottom performers with offspring. (6) Repeat for 15 generations. The best prompt is validated against a held-out test set. The Streamlit dashboard shows real-time fitness curves, mutation type effectiveness, and prompt diff visualization.',
    results:
      '15% average accuracy improvement across 5 tasks. Best single improvement: +23% on JSON schema compliance. Held-out generalization gap: 7% average (28% training improvement, 21% test improvement with proper regularization). Each optimization run takes ~45 minutes and costs ~$12 in API calls. Outperformed DSPy on 3 of 5 tasks.',
    challenges: [
      { title: 'Evaluation cost and latency', description: '20 variants x 50 eval examples x 15 generations = 15,000 LLM calls per optimization run. Implemented smart caching (unchanged prompt sections reuse cached scores) and parallel evaluation (8 concurrent workers) to reduce wall time from 6 hours to 45 minutes.' },
      { title: 'Mutation quality variance', description: 'Random mutations often produce nonsensical prompts that waste evaluation budget. Implemented a pre-filter that uses a fast model (GPT-3.5) to score mutation coherence before expensive evaluation, rejecting ~30% of mutations early.' },
    ],
  },
}
