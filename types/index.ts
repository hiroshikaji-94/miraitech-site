/* ─────────────────────────────────────────────────────────────────
   Shared Types
───────────────────────────────────────────────────────────────── */

// ─── Project ──────────────────────────────────────────────────────

export type ProjectCategory = 'fullstack' | 'ai' | 'mobile' | 'devtools' | 'other'
export type ProjectStatus    = 'live' | 'wip' | 'archived'

export interface Project {
  slug:        string
  title:       string
  summary:     string          // one-liner shown on cards
  category:    ProjectCategory
  tags:        string[]        // filterable labels
  stack:       string[]        // tech badges
  featured:    boolean
  coverImage:  string          // /images/projects/<slug>/cover.jpg
  images?:     string[]        // gallery screenshots
  github?:     string
  liveUrl?:    string
  status:      ProjectStatus
  year:        number
  role:        string          // e.g. "Solo Developer"
  duration?:   string          // e.g. "3 months"
  order:       number          // sort order
}

// MDX frontmatter = Omit<Project, 'slug'> + content sections as MDX headings:
//   ## Overview  ## Problem  ## Solution
//   ## Key Features  ## Architecture  ## Challenges & Learnings

// ─── Experiment (AI Lab) ─────────────────────────────────────────

export type ExperimentCategory = 'llm' | 'rag' | 'agent' | 'automation' | 'vision' | 'multimodal'
export type ExperimentStatus   = 'active' | 'live' | 'archived'

export interface Experiment {
  slug:        string
  title:       string
  summary:     string
  category:    ExperimentCategory
  tags:        string[]
  stack:       string[]
  models?:     string[]        // e.g. ['GPT-4o', 'Claude 3.5']
  status:      ExperimentStatus
  coverImage?: string
  github?:     string
  liveUrl?:    string
  year:        number
  order?:      number
}

// ─── Blog Post ────────────────────────────────────────────────────

export interface Post {
  slug:         string
  title:        string
  summary:      string
  category:     string
  tags:         string[]
  publishedAt:  string         // ISO date string
  updatedAt?:   string
  readingTime:  number         // minutes
  featured:     boolean
  coverImage?:  string
  author:       string
}

// ─── Navigation ───────────────────────────────────────────────────

export interface NavLink {
  href:   string
  label:  string
  badge?: string  // optional "New" badge
}
