import { Hero } from '@/components/sections/home/Hero'
import { ToolBand } from '@/components/sections/home/ToolBand'
import { Services } from '@/components/sections/home/Services'
import { SelectedWork } from '@/components/sections/home/SelectedWork'
import { HowWeWork } from '@/components/sections/home/HowWeWork'
import { Facts } from '@/components/sections/home/Facts'
import { People } from '@/components/sections/home/People'
import { Notes } from '@/components/sections/home/Notes'
import { Faq } from '@/components/sections/home/Faq'

// Title and description come from the root layout defaults.
export default function HomePage() {
  return (
    <>
      <Hero />
      <ToolBand />
      <Services />
      <SelectedWork />
      <HowWeWork />
      <Facts />
      <People />
      <Notes />
      <Faq />
    </>
  )
}
