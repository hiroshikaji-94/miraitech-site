/** Detail content for AI Lab experiment pages, keyed by slug and merged with the base experiment data at render time. */

// Types

export interface ExperimentDetailContent {
  overview:      string
  methodology:   string
  keyFindings:   Array<{ title: string; detail: string }>
  techStack:     string
  architecture:  string
  results:       string
  challenges:    Array<{ title: string; description: string }>
}

// Detail content

export const EXPERIMENT_DETAILS: Record<string, ExperimentDetailContent> = {

  // Local LLM code reviewer
  'local-llm-code-reviewer': {
    overview:
      'We wanted to know whether open-weight models running locally could review code about as well as cloud APIs, without the source ever leaving the machine. The reviewer is a VS Code extension backed by Ollama. It parses diffs into Tree-sitter ASTs, gives the model structured context and shows the review as inline comments.',
    methodology:
      'We compared three local models (Qwen 2.5 72B Q4, Llama 3.3 70B Q5 and CodeLlama 34B) with GPT-4o on 200 real pull requests in Python, TypeScript and Go. A senior engineer reviewed each PR independently to set the ground truth. We measured bug detection recall, false positive rate, suggestion quality (rated 1-5 by the engineer) and inference latency. To build the context, Tree-sitter extracted each changed function with its surrounding scope and imports, up to 4,096 tokens.',
    keyFindings: [
      { title: 'Qwen 2.5 72B came close to GPT-4o', detail: 'On the 200-PR benchmark, Qwen 2.5 72B reached 85% bug detection recall and GPT-4o reached 89%. That is a smaller gap than we expected for a model running locally on an RTX 4090.' },
      { title: 'AST context halved false positives', detail: 'Moving from raw diff prompts to function context extracted with Tree-sitter cut the false positive rate from 34% to 16%, because the model could see type signatures and imports.' },
      { title: 'Context mattered more than quantization', detail: 'Going from Q4 to Q8 changed recall by only 2%. Better context construction improved it by 12%. Engineering time is better spent on the prompt context than on model precision.' },
      { title: 'Under 3 seconds, fast enough to use while coding', detail:'Average response time was 2.9s on an RTX 4090. That is fast enough to run a review while writing code, as well as when a PR is opened.' },
    ],
    techStack:
      'Ollama serves the quantized models with GPU offloading. Tree-sitter parses source files into ASTs so the right context can be extracted. A local FastAPI server connects the VS Code extension to the model server. The extension uses LSP for inline diagnostics and code actions.',
    architecture:
      'A review starts when a developer saves a file or stages a diff. The extension finds the changed hunks and sends them to the local FastAPI server, which uses Tree-sitter to extract the full function around each change. That context is formatted into a review prompt and sent to Ollama. The response is parsed into issues (line number, severity, suggestion) and shown as inline diagnostics with a one-click "Apply Fix" code action.',
    results:
      'On the 200 test PRs: 85% bug detection recall, a 16% false positive rate, 2.9s average response time and no API cost. In a survey of 12 developers, the tool scored 4.1/5 for usefulness. Three engineers adopted it as their default pre-commit review step.',
    challenges: [
      { title: 'Large diffs overflowed the context', description: 'PRs touching 10+ files went over the 4,096-token context budget. We rank the changed functions by complexity, review the top k and add a note that more issues may exist.' },
      { title: 'Wrong line numbers', description: 'The local models sometimes attached a suggestion to the wrong line. We added a post-processing step that checks each suggested line against the actual diff and drops annotations that do not match.' },
    ],
  },

  // Voice-to-SQL agent
  'voice-to-sql-agent': {
    overview:
      'This experiment tests whether a voice interface lets non-technical people explore a database on their own. You ask a question such as "What were our top 5 customers by revenue last quarter?" and get the SQL, the results and a plain-language explanation, in under 2 seconds from the end of speech.',
    methodology:
      'The pipeline uses Whisper Large-v3 for speech-to-text, GPT-4o with function calling to generate SQL and a React frontend to show the results. We tested it on 150 benchmark questions covering single-table lookups, multi-join aggregations, date-range filters and ambiguous phrasing. Each question was asked by 3 different speakers to see how it handled accents and speech patterns. The model gets the schema from CREATE TABLE statements and sample rows in the system prompt.',
    keyFindings: [
      { title: '94% query accuracy on structured questions', detail: 'With the schema in the prompt, GPT-4o wrote correct SQL for 94% of the benchmark questions. Most failures involved vague time references ("recently", "a while ago") or implicit joins.' },
      { title: 'Schema in the prompt beat fine-tuning', detail: 'CREATE TABLE statements plus 3 sample rows per table gave higher accuracy than a model fine-tuned on 500 query pairs, and the approach adapts to a new schema immediately.' },
      { title: 'People asked 3x more questions by voice', detail: 'Whisper adds about 300ms of latency. In user testing, non-technical users asked 3x more exploratory questions by voice than through a text SQL interface.' },
      { title: 'Function calling blocks SQL injection', detail: 'The model can only call predefined query functions with validated parameters and never writes raw SQL strings. That removes SQL injection as an attack path.' },
    ],
    techStack:
      'Whisper Large-v3 handles speech recognition with word-level timestamps. GPT-4o generates SQL through function calling, with Pydantic-validated schemas. FastAPI runs the backend with connection pooling to SQLite, which can be extended to Postgres. The React frontend records audio with the Web Audio API and charts results with Recharts.',
    architecture:
      'The browser captures audio with the Web Audio API and streams it to the FastAPI backend. Whisper transcribes it, and the transcript goes to GPT-4o together with the schema and function-calling tools defined for SELECT queries. The generated SQL is checked against a read-only allowlist of operations and run against the database. The results come back with a plain-language summary from a second LLM call.',
    results:
      'Query accuracy was 94% across 150 benchmark questions. Voice to result took 1.2s on average (300ms speech-to-text, 600ms LLM, 200ms execution, 100ms rendering). All 8 test users preferred voice to writing raw SQL for exploratory analysis. No injection attempt succeeded in adversarial testing.',
    challenges: [
      { title: 'Ambiguous time references', description: '"Last quarter" depends on the fiscal calendar. We added a configurable fiscal calendar to the context, and the agent asks a clarifying question when a time reference is ambiguous.' },
      { title: 'Follow-up questions', description: 'A follow-up such as "Now break that down by region" depends on the previous query. The agent keeps the last 3 query contexts so it can resolve references like "that".' },
    ],
  },

  // RAG evaluation harness
  'rag-evaluation-harness': {
    overview:
      'Most RAG tutorials judge quality by reading a few answers. This experiment is an automated evaluation setup that tests each variable in a RAG pipeline (chunking strategy, embedding model, retrieval method and generation model) against ground-truth Q&A datasets, using 12 standard metrics. We wanted RAG decisions to rest on measurements.',
    methodology:
      'We built 3 evaluation datasets (technical documentation, legal contracts and academic papers) with 50 ground-truth Q&A pairs each. On each dataset we tested 6 chunking strategies (fixed 512, fixed 1024, recursive, semantic, sentence-window, parent-document), 4 embedding models (OpenAI text-embedding-3-large, Cohere embed-v3, all-MiniLM-L6, BGE-large) and 3 retrieval methods (dense, sparse BM25, hybrid). Every combination was scored on 12 RAGAS and DeepEval metrics, including faithfulness, answer relevancy, context precision, context recall and hallucination rate.',
    keyFindings: [
      { title: 'Semantic chunking won on technical docs and lost on legal', detail: 'Semantic chunking reached 0.91 context precision on technical docs but only 0.74 on legal contracts, where clause boundaries matter more than semantic similarity. Fixed 512 with overlap did best on legal.' },
      { title: 'Hybrid retrieval is worth the extra complexity', detail: 'Dense plus BM25 improved context recall by 8-15% over dense retrieval alone on every dataset. The gain was largest on queries with specific identifiers such as error codes and section numbers.' },
      { title: 'OpenAI embeddings led, and BGE-large was 93% as good', detail: 'text-embedding-3-large scored highest on every metric. BGE-large reached 93% of its performance with no API cost, which is a good trade when cost matters.' },
      { title: 'Evaluation has to be domain-specific', detail: 'The same chunking strategy scored 0.91 on technical docs and 0.74 on legal text. No configuration was best everywhere, so each team needs to evaluate on its own documents.' },
    ],
    techStack:
      'DeepEval and RAGAS provide the 12 metrics. pgvector stores embeddings for dense retrieval, and a custom BM25 implementation handles sparse retrieval. A Streamlit dashboard is used to compare results. Python runs the evaluation pipeline, with configurations evaluated in parallel.',
    architecture:
      'Evaluation runs in three phases. Ingestion: documents go through every chunking strategy in parallel, are embedded with every model and are stored in separate pgvector collections. Retrieval: each query runs against every combination of retrieval method and embedding model, and the top-k results are collected. Evaluation: retrieved contexts and generated answers are scored against the ground truth with DeepEval and RAGAS, and the results are aggregated into a comparison matrix.',
    results:
      'We tested 72 pipeline configurations (6 chunking x 4 embeddings x 3 retrieval) on 150 questions. The best configuration depends on the domain. Best overall was semantic chunking with OpenAI embeddings and hybrid retrieval (0.92 faithfulness, 0.89 context precision). Best for cost was recursive chunking with BGE-large and hybrid retrieval (0.87 faithfulness, 0.83 context precision, $0 embedding cost).',
    challenges: [
      { title: 'Metrics that disagreed', description: 'RAGAS faithfulness and DeepEval hallucination scores sometimes contradicted each other. When they disagree, a person breaks the tie, and the more reliable metric gets more weight in the composite score.' },
      { title: 'Embedding cost', description: 'Testing 4 embedding models x 150 questions x 6 chunking strategies took 3,600 embedding API calls. We cache embeddings aggressively, so a re-run only embeds new or changed chunks.' },
    ],
  },

  // Multi-agent debate system
  'multi-agent-debate': {
    overview:
      'This experiment tests whether LLMs reason better when they argue. Three agents debate a topic over several structured rounds, and a judge agent scores the arguments and writes a conclusion. We compared the debated conclusions with single-model answers, and compared Claude, GPT-4o and Gemini with each other.',
    methodology:
      'The framework has 3 roles (Proponent, Opponent, Devil\'s Advocate) and a Judge. Each debate runs 3 rounds: opening statements, rebuttals and closing arguments. The judge scores each argument on logic (0-10), evidence quality (0-10) and novelty (0-5), then writes a balanced conclusion. We ran 30 debate topics across ethics, technology policy and business strategy. Each topic was debated 3 times with different model assignments, to control for bias between model and role.',
    keyFindings: [
      { title: 'Debate improved factual accuracy by 23%', detail: 'When models argued opposing positions, the final conclusion had 23% fewer factual errors than a single model\'s answer to the same question. The opposing agents challenged unsupported claims.' },
      { title: 'Claude scored highest on logic', detail: 'Claude Sonnet scored highest on logic (8.2/10 on average) and wrote the best-structured arguments. GPT-4o scored highest on evidence citation (7.8/10). Gemini was strongest on novel perspectives (3.9/5).' },
      { title: 'The Devil\'s Advocate role matters', detail: 'Removing the Devil\'s Advocate and running 2-agent debates lowered conclusion quality by 18%. The contrarian role makes both sides deal with edge cases they would otherwise ignore.' },
      { title: 'Three rounds was enough', detail: 'We tested 2, 3 and 5 rounds, and returns fell off after round 3. Rounds 4-5 repeated earlier arguments and added 60% to latency without improving the conclusion.' },
    ],
    techStack:
      'LangGraph runs the debate flow, with explicit state transitions between rounds. Arguments stream to the frontend over WebSockets. Redis stores debate state so a debate can recover from an interruption. Next.js renders the debate UI as the arguments stream in.',
    architecture:
      'A LangGraph state machine runs the debate. Once the topic is set and roles are assigned, round 1 runs the opening statements in parallel and the judge scores them. In round 2, the agents give rebuttals one after another, each with access to the opposing arguments, and the judge scores again. Round 3 is closing arguments, followed by the final synthesis. Every transition streams tokens to the frontend over WebSockets. The judge uses a separate, higher-temperature prompt so it does not anchor on any one agent\'s framing.',
    results:
      'Across 30 debate topics, debated conclusions scored 23% higher on factual accuracy than single-model answers, as judged by 5 human evaluators. A 3-round debate took 45 seconds on average. Streaming kept token-to-screen latency under 200ms. The best conclusions came from mixed-model debates where Claude argued, GPT-4o cited evidence and Gemini played devil\'s advocate.',
    challenges: [
      { title: 'Agents conceded too easily', description: 'In rebuttals, agents sometimes conceded valid points too quickly and the debate collapsed. We added a "maintain your position" directive to the system prompt and penalized concessions in the judge\'s scoring rubric.' },
      { title: 'Streaming 3 models at once', description: 'Three concurrent LLM streams at different speeds caused rendering problems. We added a token buffer that batches and interleaves the streams at 100ms intervals so the UI updates smoothly.' },
    ],
  },

  // Document vision parser
  'document-vision-parser': {
    overview:
      'Traditional OCR needs a template for every document type. This experiment uses vision LLMs that read the layout and content directly instead. You upload a receipt, invoice or tax form and get structured JSON with field labels, values, confidence scores and bounding box coordinates, without defining a template.',
    methodology:
      'We tested GPT-4o Vision and Claude Vision on 500 real-world documents in 8 categories: receipts (120), invoices (100), tax forms (80), business cards (60), bank statements (50), purchase orders (40), contracts (30) and shipping labels (20). Field names, values and bounding boxes were annotated by hand as ground truth. AWS Textract and Google Document AI served as baselines. We measured field-level F1 and tracked processing time and cost per document.',
    keyFindings: [
      { title: '96% field accuracy with no templates', detail: 'GPT-4o Vision reached 96% field-level F1 across all document types with no template configuration. It matched Textract on receipts and did better on unusual layouts.' },
      { title: 'Rotated and skewed documents still work', detail: 'The vision models stayed above 90% accuracy on documents photographed at angles up to 30 degrees. On the same rotated inputs, Textract dropped to 67%.' },
      { title: 'Output schemas reduce hallucinated fields', detail: 'Pydantic response schemas with field-level validation cut hallucinated fields from 8% to 1.2%. The model invents less when it has to fill a fixed structure.' },
      { title: 'Cost breaks even at about 50 document types', detail: 'At $0.03 per document, the vision approach costs 2x Textract per page, but there are no templates to build. Past about 50 document types, templates cost more to maintain.' },
    ],
    techStack:
      'GPT-4o Vision and Claude Vision read the documents. FastAPI serves the extraction API and processes batch uploads asynchronously. Pydantic enforces the output schemas and validates extracted fields. A React frontend uses the Canvas API to draw bounding boxes over the original document for checking.',
    architecture:
      'The FastAPI backend preprocesses each uploaded image (orientation detection, contrast normalization) and sends it to the vision model with an extraction prompt that specifies the output schema. The response is validated against the Pydantic schema. Confidence scores come from running the extraction twice and comparing which fields agree. Bounding box coordinates come from a second vision prompt focused on locating each field.',
    results:
      'Field-level F1 was 96% across 500 documents in 8 categories. Processing took 1.8s and cost $0.03 per document on average, with no templates to maintain. Confidence scoring flagged 89% of extraction errors for human review.',
    challenges: [
      { title: 'Bounding box precision', description: 'Vision models describe roughly where things are instead of returning pixel coordinates. A second pass crops each predicted region and runs a focused extraction, which brings the boxes to within 5px.' },
      { title: 'Multi-page documents', description: 'Invoices of 3+ pages exceeded single-image context limits. We extract page by page, then a merge step removes duplicate fields and resolves references across pages, such as line items "continued on next page".' },
    ],
  },

  // Agent memory architecture
  'agent-memory-system': {
    overview:
      'Most AI agents forget everything between conversations. This experiment gives an agent three kinds of memory, loosely modeled on human memory: episodic (what happened), semantic (what is true) and procedural (how to do things). Memories decay along an Ebbinghaus forgetting curve, so important information stays and irrelevant details fade.',
    methodology:
      'We built three memory stores and tested retention over 100 simulated conversation sessions spanning 30 days. Episodic memory stores full conversation turns with an importance score (1-10) based on user engagement signals. Semantic memory extracts facts and entity relationships into a Neo4j knowledge graph. Procedural memory records action patterns and user preferences. Decay follows the Ebbinghaus forgetting curve, R = e^(-t/S), where the stability S increases with each successful retrieval.',
    keyFindings: [
      { title: 'Decay keeps the memory store small', detail: 'Without decay, the store grew to 12,000 entries after 100 sessions and retrieval became 4x slower. With Ebbinghaus decay, active memory settled at about 800 high-value entries and retrieval stayed under 100ms.' },
      { title: 'Semantic memory connects conversations', detail: 'With entities and relationships in a knowledge graph, the agent could answer questions that draw on several conversations, such as "What tools does this user prefer for Python projects?", by traversing preference nodes.' },
      { title: 'Procedural memory cut repeated instructions by 60%', detail: 'Once the agent learned that a user prefers TypeScript to JavaScript and pytest to unittest, it stopped asking clarifying questions about them.' },
      { title: 'Importance scoring was the hardest part', detail: 'Deciding automatically which memories matter is hard. The best heuristic we found combined explicit signals (user corrections, repeated mentions) with implicit ones (conversation length, follow-up questions).' },
    ],
    techStack:
      'pgvector stores episodic memories and retrieves them by embedding. Neo4j holds the semantic knowledge graph as entity-relationship triples. LangGraph manages the memory lifecycle (encode, consolidate, retrieve, decay). The forgetting curve is implemented in Python with configurable stability parameters.',
    architecture:
      'Each conversation goes through three phases. Retrieval: relevant episodic, semantic and procedural memories are fetched using the current query embedding and recency. Generation: the retrieved memories are added to the system prompt, weighted by recency and importance. Consolidation: after the conversation, new episodic entries are written, facts are extracted into the knowledge graph and procedural patterns are updated. A nightly job lowers the stability scores of memories that were not retrieved.',
    results:
      'Over 100 simulated sessions, the store settled at about 800 active entries, compared with 12,000 without decay. Retrieval latency stayed under 100ms. Preference accuracy reached 89% by session 20. Cross-conversation reasoning succeeded on 73% of the synthesis questions. A panel of 15 evaluators rated memory-augmented responses 4.2/5 and responses without memory 3.1/5.',
    challenges: [
      { title: 'Contradicting memories', description: 'When a user changes a preference, old memories contradict the new one. Newer memories take precedence over older ones. When a contradiction is detected, the outdated entry is marked for faster decay.' },
      { title: 'Deleting specific memories', description: 'Users need to be able to delete specific memories ("forget our address"). A targeted deletion API removes the entries from all three memory stores and propagates the deletion through the knowledge graph.' },
    ],
  },

  // Real-time sentiment stream
  'realtime-sentiment-stream': {
    overview:
      'A sentiment analysis pipeline for streaming text that handles 10,000+ messages per second and classifies each one in under 100ms. A fine-tuned DistilBERT model served with ONNX Runtime labels messages positive, negative or neutral with 94% accuracy. A live dashboard shows the trends and flags anomalies.',
    methodology:
      'We fine-tuned DistilBERT on 120,000 labeled texts: 50,000 tweets (Sentiment140), 40,000 Amazon product reviews and 30,000 support tickets from an internal dataset. The model was exported to ONNX for faster inference. We compared it with RoBERTa-base, VADER and zero-shot GPT-3.5 on a held-out test set of 5,000 examples. Throughput was tested on a Kafka pipeline with simulated message streams at 1k, 5k and 10k messages/second.',
    keyFindings: [
      { title: 'DistilBERT nearly matched RoBERTa at 6x the throughput', detail: 'Fine-tuned DistilBERT reached 94% accuracy against RoBERTa\'s 95.2%, and processed 10,200 messages/sec against RoBERTa\'s 1,700. For streaming, giving up 1.2% accuracy for 6x the throughput is an easy decision.' },
      { title: 'ONNX Runtime doubled inference speed', detail: 'Converting the PyTorch model to ONNX and running it on ONNX Runtime cut per-message latency from 18ms to 8ms. Batching 32 messages brought amortized latency down to 2ms per message.' },
      { title: 'Domain data mattered more than model size', detail: 'DistilBERT fine-tuned on support tickets scored 91% on support ticket sentiment. Zero-shot GPT-3.5 scored 78% on the same data. A small model fine-tuned on the domain beat a large general model.' },
      { title: 'Sentiment shifts flagged in under 5 seconds', detail: 'A sliding-window z-score detector on the 30-second sentiment moving average raises an alert within 5 seconds of a significant shift.' },
    ],
    techStack:
      'The fine-tuned DistilBERT model is served with ONNX Runtime. Kafka handles message ingestion and scales through consumer groups. ClickHouse stores the sentiment time series for trend analysis. FastAPI serves the classification API, and the live dashboard is built with Next.js and WebSocket updates.',
    architecture:
      'Messages arrive on Kafka topics and are consumed by a pool of classification workers running the ONNX model. Each classified message is written to ClickHouse with its timestamp, source, sentiment label and confidence score. The dashboard queries ClickHouse for live aggregations (sentiment distribution, trend lines, volume) and receives a WebSocket push when an anomaly threshold is crossed.',
    results:
      'Accuracy on the held-out test set was 94%. With 8 Kafka consumers, the pipeline sustained 10,200 messages/second. Per-message latency was 8ms at p50 and 23ms at p99. Anomaly detection took 4.7 seconds on average. The dashboard renders at 60fps with a 100ms data refresh interval.',
    challenges: [
      { title: 'Sarcasm', description: 'Sarcastic messages like "Oh great, another outage" were classified as positive 40% of the time. We added a sarcasm detection head trained on 10,000 additional sarcasm-labeled examples, which brought misclassification down to 15%.' },
      { title: 'Consumer lag during bursts', description: 'Traffic spikes of 50k messages/sec caused consumer lag to build up. We set the consumer groups to scale out when lag exceeds 1,000 messages and scale back down after the burst.' },
    ],
  },

  // PDF to knowledge graph
  'pdf-to-knowledge-graph': {
    overview:
      'A pipeline that extracts entities, relationships and claims from PDFs, builds a queryable knowledge graph in Neo4j and renders it as an interactive D3.js visualization. Instead of reading a 50-page research paper from start to finish, you can explore its concepts, methods and findings as a connected graph.',
    methodology:
      'We tested the pipeline on 40 documents: 15 ML/AI research papers, 10 legal contracts, 10 technical specifications and 5 annual reports. LlamaParse extracts structured text from the PDFs. Claude Sonnet then extracts entities (people, organizations, concepts, methods, metrics) and relationships (uses, cites, compares, contradicts, extends) in two passes. Neo4j stores the graph with indexes on entity and relationship types. We measured entity extraction F1 against human-annotated ground truth.',
    keyFindings: [
      { title: 'Two passes raised F1 from 0.79 to 0.89', detail: 'A single LLM pass for entities and relationships together scored 0.79 F1. Extracting entities first, then relationships between the known entities, raised F1 to 0.89, mainly because fewer relationships were missed.' },
      { title: 'The graph shows links across documents', detail: 'With several papers loaded, the graph shows connections the authors never made explicit: shared methods, contradictory findings and citation chains that trace a line of research.' },
      { title: 'Browsing the graph beat keyword search', detail: 'In user testing (n=10), participants answered open-ended questions 2.3x faster with the graph than with keyword search in the original PDFs.' },
      { title: 'Every node links to its source', detail: 'Each node and edge links back to the page and paragraph it came from in the source PDF. Clicking a relationship opens the passage, so users can check what was extracted.' },
    ],
    techStack:
      'LlamaParse handles layout-aware PDF parsing. Claude Sonnet extracts entities and relationships using structured prompts. Neo4j stores the knowledge graph and provides full-text search and Cypher queries. D3.js renders the interactive force-directed graph, and Next.js serves the frontend and runs graph queries on the server.',
    architecture:
      'LlamaParse turns each uploaded PDF into structured text blocks with page and position metadata. Claude Sonnet extracts entities from each block, then receives the entities back with the text to extract relationships. The resulting triples (entity, relationship, entity) are written to Neo4j with source citations. The D3.js frontend queries Neo4j through a Cypher API and draws entities as nodes and relationships as edges, colored by type, with interactive filtering.',
    results:
      'Entity extraction F1 was 0.89 across 40 documents, and relationship extraction F1 was 0.82. Processing a 20-page document took 45 seconds on average. The graph view renders up to 500 nodes at 60fps. In user testing, exploratory analysis was 2.3x faster than with keyword search.',
    challenges: [
      { title: 'Entity coreference resolution', description: 'The same entity appears under different names ("GPT-4", "GPT4", "OpenAI\'s latest model"). A step that combines fuzzy matching with embedding similarity merges the variants into one canonical node with a list of aliases.' },
      { title: 'Large graphs were hard to read', description: 'Graphs with 300+ nodes became too dense to read. Hierarchical clustering now groups related entities into collapsible super-nodes, and semantic zoom reveals more detail as users focus on a region.' },
    ],
  },

  // Browser automation agent
  'browser-automation-agent': {
    overview:
      'A browser agent that takes a goal in plain English, such as "Find the cheapest flight from SFO to JFK next Friday", then moves through websites, fills in forms, clicks buttons and extracts the results on its own. It uses Playwright for browser control, GPT-4o Vision to understand pages and LangGraph for multi-step planning. There is no site-specific code.',
    methodology:
      'We built a 50-task benchmark in 5 categories: e-commerce (search, filter, add to cart), travel (flight search, hotel booking), information retrieval (Wikipedia lookups, documentation search), form filling (contact forms, applications) and multi-site workflows (price comparison across 3 sites). Each task was run 3 times to measure consistency. The agent reads page layouts with GPT-4o Vision, finds interactive elements by parsing the accessibility tree and plans multi-step actions with LangGraph.',
    keyFindings: [
      { title: '78% of 50 tasks completed', detail: 'The agent completed 78% of the benchmark tasks end to end. It did best on e-commerce (88%) and worst on multi-site workflows (62%), where keeping context across site transitions was hard.' },
      { title: 'Screenshots plus the accessibility tree beat screenshots alone', detail: 'Combining screenshots with accessibility tree parsing improved task completion by 22% over vision alone. The accessibility tree gives reliable element selectors, which screenshots cannot.' },
      { title: 'Retrying a different way recovered failed actions', detail: 'When an action failed, the agent retried with a different strategy, for example keyboard navigation instead of a click. That recovered 15% of failed actions and raised overall completion from 65% to 78%.' },
      { title: 'CAPTCHAs and bot detection set the limit', detail: 'Of the failures, 60% came from CAPTCHAs, bot detection or dynamic loading that changed the page after it first rendered. Every browser automation agent runs into these limits.' },
    ],
    techStack:
      'Playwright drives the browser with full Chrome DevTools Protocol (CDP) access. GPT-4o Vision reads page layouts and identifies interactive elements in screenshots. LangGraph manages the multi-step planning and execution graph. Redis caches page states for error recovery and rollback.',
    architecture:
      'The user gives a goal in natural language. LangGraph breaks it into a sequence of web actions (navigate, click, type, scroll, extract). For each action, Playwright captures a screenshot and the accessibility tree, GPT-4o Vision picks the target element and action type, and Playwright performs the interaction. After each step, the agent checks the resulting page for the expected outcome. If the check fails, an error recovery loop tries other ways to interact.',
    results:
      'The agent completed 78% of the 50 benchmark tasks. Single-site tasks took 34 seconds on average and multi-site tasks 92 seconds. Error recovery saved 15% of failing tasks. The agent handled dynamic content, pop-ups and cookie banners without site-specific code.',
    challenges: [
      { title: 'Dynamic content and lazy loading', description: 'Elements that loaded after the first render were missing from the first screenshot. The agent now scrolls the page, waits for network idle and takes several screenshots before it decides an element is missing.' },
      { title: 'Many similar buttons', description: 'Pages with several similar buttons, such as a list of "Add to Cart" buttons, confused the vision model. We split selection into two steps: find all candidate elements, then use the surrounding context (product name, price) to pick the right one.' },
    ],
  },

  // Prompt optimization lab
  'prompt-optimization-lab': {
    overview:
      'Most prompts are still tuned by hand. This experiment tunes them with a genetic algorithm. Starting from a base prompt and a scoring function, it mutates, recombines and selects prompts over many generations to maximize the score on a specific evaluation suite.',
    methodology:
      'The genetic algorithm keeps a population of 20 prompt variants and runs 15 generations per optimization cycle. Mutations include paraphrasing, reordering instructions, swapping examples, adding or removing constraints and changing the format. Crossover combines high-scoring sections from two parent prompts. Selection is tournament selection with elitism, so the top 2 always survive. We tested on 5 tasks: classification accuracy, JSON schema compliance, code generation pass rate, summarization quality and extraction precision. Each task had a held-out test set to measure generalization.',
    keyFindings: [
      { title: '15% better than hand-written prompts on average', detail: 'Across 5 tasks, the optimizer improved accuracy by 15% on average over carefully hand-written prompts. The largest gain was in JSON schema compliance (+23%), where the optimizer found that adding negative examples cut formatting errors.' },
      { title: 'Structure mattered more than wording', detail: 'The optimizer kept converging on structural patterns: instruction order, example placement and how specific the constraints are. Changes in wording mattered much less. In these tasks, prompt engineering was mostly about arranging information.' },
      { title: 'Prompts overfit too', detail: 'Without a held-out test set, optimized prompts improved 28% on the training eval but only 8% on unseen examples. Prompts overfit the same way models do, so the held-out set is necessary.' },
      { title: 'DSPy is a strong baseline', detail: 'Against DSPy\'s automatic prompt optimization, the genetic approach did about as well on simple tasks and better on complex multi-step prompts, where DSPy\'s optimizers struggled with larger structural changes.' },
    ],
    techStack:
      'The genetic algorithm is written in Python with configurable mutation operators. DSPy provides the baseline comparison and some mutation primitives. DeepEval scores prompt variants on task-specific metrics. Streamlit plots fitness by generation, and Redis queues the parallel evaluation jobs.',
    architecture:
      'The loop creates an initial population of 20 variants from the base prompt using a range of mutations, then scores each variant with DeepEval. Parents are chosen by tournament selection, offspring come from crossover and mutation, and the offspring replace the lowest scorers. This repeats for 15 generations, and the best prompt is then validated on the held-out test set. The Streamlit dashboard shows live fitness curves, how well each mutation type works and diffs between prompts.',
    results:
      'Accuracy improved by 15% on average across 5 tasks, with the largest single gain (+23%) on JSON schema compliance. With regularization, the generalization gap averaged 7% (28% improvement on training, 21% on test). Each optimization run takes about 45 minutes and costs about $12 in API calls. The optimizer beat DSPy on 3 of the 5 tasks.',
    challenges: [
      { title: 'Evaluation cost and run time', description: 'Each run makes 15,000 LLM calls (20 variants x 50 eval examples x 15 generations). Caching, where unchanged prompt sections reuse their cached scores, and 8 parallel workers cut wall time from 6 hours to 45 minutes.' },
      { title: 'Nonsense mutations', description: 'Random mutations often produce prompts that make no sense and waste evaluation budget. We added a pre-filter: a fast model (GPT-3.5) scores each mutation for coherence before the expensive evaluation and rejects about 30% of them early.' },
    ],
  },
}
