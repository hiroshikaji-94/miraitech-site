import { SITE } from '@/lib/site'
import { LogoMark } from '@/components/ui/Logo'

export function ArticleFooter() {
  return (
    <div className="card mt-16 flex max-w-[68ch] gap-4 p-6">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent-fg">
        <LogoMark className="h-5 w-5" />
      </span>
      <div className="text-[15px] leading-relaxed text-foreground-2">
        <p className="font-bold text-foreground">Written by the {SITE.name} team in Tokyo</p>
        <p className="mt-1.5">
          If something here is wrong, or you are working on a similar problem, write to us at{' '}
          <a href={`mailto:${SITE.email}`} className="link text-foreground">
            {SITE.email}
          </a>
          .
        </p>
      </div>
    </div>
  )
}
