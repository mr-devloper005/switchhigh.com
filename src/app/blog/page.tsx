import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { ContentImage } from '@/components/shared/content-image'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import type { SitePost } from '@/lib/site-connector'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/blog',
    title: `Desk notes & commentary | ${SITE_CONFIG.name}`,
    description: 'Shorter updates, clarifications, and commentary from the editorial desk—between the long reads.',
  })
}

function postImage(post: SitePost) {
  const media = Array.isArray(post.media) ? post.media : []
  const url = media.find((m) => m?.url)?.url
  if (url) return url
  const c = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const images = Array.isArray(c.images) ? c.images.filter((x): x is string => typeof x === 'string') : []
  if (images[0]) return images[0]
  return '/placeholder.svg?height=640&width=960'
}

export default async function BlogPage() {
  const posts = await fetchTaskPosts('comment', 18, { allowMockFallback: true })

  return (
    <PageShell
      eyebrow="Company"
      title="Blog"
      description="Desk-side notes: how we report, what we changed our minds on, and quick reactions to the news cycle."
      actions={
        <Button variant="outline" className="rounded-md border-2 border-[#b32025] text-[#b32025] hover:bg-[#b32025]/5" asChild>
          <Link href="/articles">Browse full insights</Link>
        </Button>
      }
    >
      <section className="overflow-hidden rounded-md border border-slate-200/90 bg-white shadow-[0_16px_44px_rgba(11,22,40,0.06)]">
        <div className="grid lg:grid-cols-[1fr_0.85fr]">
          <div className="relative min-h-[220px] bg-[linear-gradient(125deg,#0b1628_0%,#115e59_50%,#0b1628_100%)] p-8 text-white sm:p-10">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,22,40,0.2)_0%,rgba(11,22,40,0.85)_100%)]" aria-hidden />
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">From the desk</p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
                The blog is where we show our work—corrections, methodology, and reader mail.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85">
                Long investigations live under Insights. Here you will find shorter posts, contributor guidelines, and product updates that affect how you read us.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center border-t border-slate-200/80 bg-[#f9f8f6] p-8 sm:p-10 lg:border-l lg:border-t-0">
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="font-semibold text-[#b32025]">•</span>
                Corrections and clarifications always appear here first, then roll into the canonical insight.
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-[#b32025]">•</span>
                We publish contributor playbooks so freelancers know how we line-edit and cite.
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-[#b32025]">•</span>
                Product notes explain search, paywalls (if any), and accessibility improvements as they ship.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {posts.length ? (
        <section className="mt-14">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200/90 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b32025]">Latest desk notes</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">Recent posts</h2>
            </div>
            <Link href="/contact" className="text-sm font-semibold text-[#b32025] hover:text-[#951a1f]">
              Suggest a topic →
            </Link>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-md border border-slate-200/90 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#b32025]/35 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <ContentImage
                    src={postImage(post)}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b32025]">Desk note</p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-900">{post.title}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">{post.summary || 'Update from the editorial team.'}</p>
                  <span className="mt-4 text-sm font-semibold text-[#b32025]">
                    Read post <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="mt-14 rounded-md border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-sm text-slate-600">Desk notes will appear here as soon as the first commentary posts are published.</p>
          <Button className="mt-6 rounded-md bg-[#b32025] hover:bg-[#951a1f]" asChild>
            <Link href="/articles">Read insights instead</Link>
          </Button>
        </section>
      )}
    </PageShell>
  )
}
