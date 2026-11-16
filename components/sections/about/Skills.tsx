'use client'

import {
  Monitor, Server, Brain, Database,
  Cloud, Palette, GitBranch, TestTube2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { FlowLines } from '@/components/ui/FlowLines'

interface SkillGroup {
  category: string
  icon: React.ElementType
  color: string
  skills: string[]
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    icon: Monitor,
    color: 'text-cyan-700 dark:text-cyan-400 border-cyan-400/20',
    skills: [
      'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
      'Three.js', 'Vue.js', 'Svelte', 'HTML5', 'CSS3', 'SASS',
      'Webpack', 'Vite', 'Storybook',
    ],
  },
  {
    category: 'Backend',
    icon: Server,
    color: 'text-emerald-700 dark:text-emerald-400 border-emerald-400/20',
    skills: [
      'Node.js', 'Python', 'FastAPI', 'Django', 'Express', 'NestJS',
      'GraphQL', 'REST', 'tRPC', 'Prisma', 'Drizzle',
    ],
  },
  {
    category: 'AI / ML',
    icon: Brain,
    color: 'text-accent-blue border-accent-blue/20',
    skills: [
      'PyTorch', 'TensorFlow', 'LangChain', 'LlamaIndex', 'OpenAI API',
      'Hugging Face', 'RAG', 'Fine-tuning', 'Vector DBs',
      'Prompt Engineering', 'Multi-Agent Systems', 'Computer Vision',
    ],
  },
  {
    category: 'Databases',
    icon: Database,
    color: 'text-amber-700 dark:text-amber-400 border-amber-400/20',
    skills: [
      'PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Firebase',
      'Pinecone', 'Weaviate', 'ChromaDB', 'MySQL', 'DynamoDB',
    ],
  },
  {
    category: 'Cloud / DevOps',
    icon: Cloud,
    color: 'text-rose-600 dark:text-rose-400 border-rose-400/20',
    skills: [
      'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Vercel',
      'CI/CD', 'Terraform', 'GitHub Actions', 'Cloudflare',
    ],
  },
  {
    category: 'Design / Product',
    icon: Palette,
    color: 'text-fuchsia-700 dark:text-fuchsia-400 border-fuchsia-400/20',
    skills: [
      'Figma', 'Adobe Creative Suite', 'UI/UX Design', 'Design Systems',
      'Prototyping', 'User Research', 'A/B Testing',
    ],
  },
  {
    category: 'Collaboration',
    icon: GitBranch,
    color: 'text-orange-700 dark:text-orange-400 border-orange-400/20',
    skills: [
      'Git', 'GitHub', 'Linear', 'Notion', 'Slack',
      'Jira', 'Confluence', 'Agile/Scrum',
    ],
  },
  {
    category: 'Testing / Quality',
    icon: TestTube2,
    color: 'text-teal-700 dark:text-teal-400 border-teal-400/20',
    skills: [
      'Jest', 'Playwright', 'Cypress', 'Vitest',
      'Testing Library', 'Lighthouse', 'Sentry', 'DataDog',
    ],
  },
]

export function Skills() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <FlowLines accent="mixed" />
      <Container className="relative z-10">
        <FadeIn className="text-center mb-12">
          <span className="section-index block mb-3">STACK</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Our Collective Toolkit
          </h2>
          <p className="mt-4 text-foreground-2 max-w-lg mx-auto">
            Technologies our team uses daily to build production systems.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.06}>
          {skillGroups.map(({ category, icon: Icon, color, skills }) => (
            <StaggerItem key={category}>
              <div className={cn(
                'p-5 rounded-xl h-full',
                'bg-surface border border-border/8',
              )}>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/8">
                  <Icon size={14} className={color.split(' ')[0]} />
                  <h3 className={cn(
                    'text-xs font-semibold uppercase tracking-wider',
                    color,
                  )}>
                    {category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className={cn(
                        'text-[11px] font-medium px-2.5 py-1 rounded-lg',
                        'bg-surface-high text-foreground-2 border border-border/5',
                        'transition-colors duration-200 hover:text-foreground hover:border-border/15',
                      )}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
