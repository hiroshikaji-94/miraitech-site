import { Plus } from 'lucide-react'
import { FAQ } from '@/lib/about'
import { Section, SectionIntro } from '@/components/ui/Section'

// Native <details> elements: keyboard and screen-reader support without any script.
export function Faq() {
  const columns = [FAQ.filter((_, i) => i % 2 === 0), FAQ.filter((_, i) => i % 2 === 1)]

  return (
    <Section labelledBy="faq-title">
      <SectionIntro id="faq-title" eyebrow="Questions" title="What people ask before they write." />
      <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
        {columns.map((items, c) => (
          <div key={c} className="flex flex-col gap-4 md:gap-5">
            {items.map((item, i) => (
              <details
                key={item.question}
                open={c === 0 && i === 0}
                className="card group transition-colors duration-200 open:border-accent/25"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 p-6 md:px-7">
                  <span className="text-[17px] font-semibold leading-snug tracking-[-0.015em] text-foreground">
                    {item.question}
                  </span>
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border/10 bg-foreground/[0.04] text-foreground-2 transition-colors duration-200 group-open:border-accent/30 group-open:bg-accent/10 group-open:text-accent-fg">
                    <Plus size={13} strokeWidth={2} aria-hidden className="transition-transform duration-200 group-open:rotate-45" />
                  </span>
                </summary>
                <p className="-mt-1 px-6 pb-6 text-[15px] leading-[1.7] text-foreground-2 md:px-7">{item.answer}</p>
              </details>
            ))}
          </div>
        ))}
      </div>
    </Section>
  )
}
