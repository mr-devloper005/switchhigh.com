import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, Compass, Layers, Shield, Sparkles } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { ContentImage } from '@/components/shared/content-image'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/about',
    title: `About ${SITE_CONFIG.name}`,
    description: `Mission, editorial standards, and team snapshot for ${SITE_CONFIG.name}.`,
  })
}

const pillars = [
  {
    title: 'Editorial first',
    body: 'We prioritize verified reporting, clear structure, and responsible framing—so busy readers can trust what they scan in the first thirty seconds.',
    icon: Layers,
  },
  {
    title: 'Profiles with weight',
    body: 'Contributors are more than avatars. Bios, beats, and history sit beside every byline so expertise is visible, not implied.',
    icon: Shield,
  },
  {
    title: 'Utility without noise',
    body: 'Search, categories, and navigation behave like tools, not distractions. The interface stays quiet so the writing stays loud.',
    icon: Compass,
  },
]

const stats = [
  { label: 'Desk reviews per quarter', value: '120+' },
  { label: 'Contributor beats covered', value: '28' },
  { label: 'Average read depth', value: '4.2×' },
]

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="Company"
      title={`About ${SITE_CONFIG.name}`}
      description="An editorial network built for professionals who need depth, speed, and accountability in the same session."
      actions={
        <>
          <Button variant="outline" className="rounded-md border-2 border-[#b32025] text-[#b32025] hover:bg-[#b32025]/5" asChild>
            <Link href="/team">Meet the team</Link>
          </Button>
          <Button className="rounded-md bg-[#b32025] hover:bg-[#951a1f]" asChild>
            <Link href="/contact">Talk to the desk</Link>
          </Button>
        </>
      }
    >
      <section className="overflow-hidden rounded-md border border-slate-200/90 bg-white shadow-[0_16px_44px_rgba(11,22,40,0.06)]">
        <div className="grid lg:grid-cols-[1fr_0.9fr]">
          <div className="relative min-h-[260px] bg-[linear-gradient(125deg,#0b1628_0%,#115e59_50%,#0b1628_100%)] p-8 text-white sm:p-10 lg:min-h-[300px]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,22,40,0.15)_0%,rgba(11,22,40,0.82)_100%)]" aria-hidden />
            <div className="relative flex h-full flex-col justify-end">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">Mission</p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
                Make serious coverage feel as effortless as the best consumer apps.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85">
                {SITE_CONFIG.name} pairs long-form insight with contributor transparency—so operators, analysts, and builders can move from headline to evidence without friction.
              </p>
            </div>
          </div>
          <div className="grid gap-px bg-slate-200/80 sm:grid-cols-3 lg:grid-cols-1 lg:grid-rows-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#f9f8f6] p-6">
                <p className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{s.value}</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-3">
        {pillars.map(({ title, body, icon: Icon }) => (
          <div
            key={title}
            className="rounded-md border border-slate-200/90 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-md border border-[#b32025]/25 bg-[#b32025]/5 text-[#b32025]">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 rounded-md border border-slate-200/90 bg-white p-8 shadow-sm sm:p-10 lg:p-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b32025]">How we work</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl">
              A small editorial engine with a wide lens on industry change.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              We combine synchronous desk reviews with async contributor workflows. That means faster corrections, tighter language, and room for specialists who cannot sit in a newsroom five days a week.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li className="flex gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#b32025]" />
                Weekly planning notes shared with contributors so beats stay aligned.
              </li>
              <li className="flex gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#b32025]" />
                Fact-check passes on figures, quotes, and attributions before anything ships.
              </li>
              <li className="flex gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#b32025]" />
                Product feedback loop: reader questions shape the next cycle of explainers.
              </li>
            </ul>
          </div>
          <Button variant="outline" className="w-fit rounded-md border-slate-200" asChild>
            <Link href="/careers" className="inline-flex items-center gap-2">
              See open roles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200/90 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b32025]">Leadership & desk</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">Faces you will see on bylines</h2>
          </div>
          <Link href="/team" className="text-sm font-semibold text-[#b32025] hover:text-[#951a1f]">
            Full roster →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockTeamMembers.slice(0, 6).map((member) => (
            <div
              key={member.id}
              className="flex flex-col rounded-md border border-slate-200/90 bg-white p-5 shadow-sm transition hover:border-[#b32025]/30 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-slate-200">
                  <ContentImage src={member.avatar} alt={member.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{member.name}</p>
                  <p className="text-xs text-slate-500">{member.role}</p>
                </div>
              </div>
              <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-slate-600">{member.bio}</p>
              <p className="mt-3 text-xs text-slate-400">{member.location}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
