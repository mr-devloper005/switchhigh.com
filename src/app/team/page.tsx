import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, Mail, MapPin } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { ContentImage } from '@/components/shared/content-image'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/team',
    title: `Team & editorial roster | ${SITE_CONFIG.name}`,
    description: 'Editors, correspondents, and operators behind the publication—how we collaborate and how to reach us.',
  })
}

const waysOfWorking = [
  {
    title: 'Distributed beats',
    body: 'Reporters embed with finance, climate, logistics, and software teams worldwide. We sync on a single editorial calendar with clear escalation paths.',
  },
  {
    title: 'Pair editing',
    body: 'Every long piece passes through a second pair of eyes for structure, clarity, and fairness—never as gatekeeping, always as craft.',
  },
  {
    title: 'Open feedback',
    body: 'Readers can challenge a framing directly through the contact desk. When we update a story, we say so at the top of the piece.',
  },
]

export default function TeamPage() {
  return (
    <PageShell
      eyebrow="Company"
      title="Team"
      description="The people who commission, edit, ship, and support the stories you read on this site."
      actions={
        <Button className="rounded-md bg-[#b32025] hover:bg-[#951a1f]" asChild>
          <Link href="/contact">Reach the desk</Link>
        </Button>
      }
    >
      <section className="overflow-hidden rounded-md border border-slate-200/90 bg-white shadow-[0_16px_44px_rgba(11,22,40,0.06)]">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b32025]">Roster</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl">
              Editors, producers, and correspondents in one transparent directory.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              We publish under real names with beats you can verify. If you are pitching, include two clips and the angle you want to defend—not just a headline idea.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="outline" className="rounded-md border-2 border-[#b32025] text-[#b32025] hover:bg-[#b32025]/5" asChild>
                <Link href="/careers">Open roles</Link>
              </Button>
              <Button variant="outline" className="rounded-md border-slate-200" asChild>
                <Link href="/press" className="inline-flex items-center gap-2">
                  Press kit
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative min-h-[220px] border-t border-slate-200/80 bg-[linear-gradient(180deg,#f9f8f6_0%,#ffffff_100%)] lg:border-l lg:border-t-0">
            <div className="absolute inset-0 opacity-[0.35]" aria-hidden>
              <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(179,32,37,0.12),transparent_45%)]" />
            </div>
            <div className="relative flex h-full flex-col justify-center p-8 text-sm text-slate-600 sm:p-10">
              <p className="font-semibold text-slate-900">Office rhythm</p>
              <p className="mt-3 leading-relaxed">
                Core desk hours follow US Eastern with follow-the-sun handoffs for breaking coverage. Stand-ups are short; writing blocks are protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-3">
        {waysOfWorking.map((w) => (
          <div key={w.title} className="rounded-md border border-slate-200/90 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{w.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{w.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b32025]">Everyone on deck</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">Meet the roster</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {mockTeamMembers.map((member) => (
            <article
              key={member.id}
              className="flex flex-col rounded-md border border-slate-200/90 bg-white p-6 shadow-sm sm:flex-row sm:gap-6"
            >
              <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-full border border-slate-200 sm:mx-0">
                <ContentImage src={member.avatar} alt={member.name} fill className="object-cover" />
              </div>
              <div className="mt-6 flex-1 text-center sm:mt-0 sm:text-left">
                <h3 className="text-xl font-semibold text-slate-900">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-[#b32025]">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.bio}</p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 sm:justify-start">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {member.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    Desk relay
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
