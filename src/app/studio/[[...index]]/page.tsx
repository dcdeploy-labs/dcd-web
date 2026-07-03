import { Studio } from './Studio'
import type { Metadata } from 'next'
import { metadata as studioMetadata } from 'next-sanity/studio'

// Ensure the studio route is dynamic and doesn't try to static render
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  ...studioMetadata,
  title: 'Loading Studio...',
}

export default function StudioPage() {
  return <Studio />
}
