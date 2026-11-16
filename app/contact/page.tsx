import type { Metadata } from 'next'
import { ContactHero } from '@/components/sections/contact/ContactHero'
import { ContactContent } from '@/components/sections/contact/ContactContent'
import { ContactCTA } from '@/components/sections/contact/ContactCTA'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the MiraiTech engineers in Tokyo for project inquiries, AI initiatives, or partnerships. Replies in Japanese or English within one business day.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactContent />
      <ContactCTA />
    </>
  )
}
