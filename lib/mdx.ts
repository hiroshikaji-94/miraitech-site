import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import { mdxComponents } from '@/components/mdx/MDXComponents'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

/** Read & compile a single MDX file from content/blog/<slug>.mdx */
export async function getPostContent(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)

  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    const { content: mdxSource, data: frontmatter } = matter(raw)

    const { content } = await compileMDX({
      source: mdxSource,
      components: mdxComponents,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            [rehypePrettyCode, {
              theme: {
                dark: 'github-dark-default',
                light: 'github-light-default',
              },
              defaultLang: 'typescript',
              keepBackground: false,
            }],
          ],
        },
      },
    })

    return { content, frontmatter }
  } catch {
    return null
  }
}

/** Extract headings from raw MDX for table of contents. */
export async function getPostHeadings(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)

  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    const { content } = matter(raw)

    const headings: { id: string; text: string; level: number }[] = []
    const regex = /^(#{2,3})\s+(.+)$/gm
    let match

    while ((match = regex.exec(content)) !== null) {
      const text = match[2].replace(/[`*_~]/g, '').trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
      headings.push({ id, text, level: match[1].length })
    }

    return headings
  } catch {
    return []
  }
}
