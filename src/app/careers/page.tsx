import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, Clock, HeartHandshake, Laptop } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/careers',
    title: `Careers | ${SITE_CONFIG.name}`,
    description: 'Join the editorial, product, and operations crew building a calmer professional publication.',
  })
}

const roles = [
  {
    title: 'Senior investigative editor',
    location: 'Remote (US)',
    type: 'Full-time',
    level: 'Senior',
    blurb: 'Own a portfolio of accountability stories across finance and infrastructure. You like spreadsheets as much as sentences.',
  },
  {
    title: 'Frontend engineer — reading systems',
    location: 'Hybrid · New York',
    type: 'Full-time',
    level: 'Mid / Senior',
    blurb: 'Ship accessible layouts, typography, and performance budgets that make long reads feel effortless on every device.',
  },
  {
    title: 'Audience & partnerships lead',
    location: 'Remote',
    type: 'Full-time',
    level: 'Lead',
    blurb: 'Shape newsletters, events, and sponsor programs that respect editorial independence and reader trust.',
  },
]

const steps = [
  { step: '01', title: 'Intro call', body: '30 minutes with hiring manager + a desk editor to align on craft expectations.' },
  { step: '02', title: 'Work sample', body: 'Take-home scoped to something you might ship in week one—no toy exercises.' },
  { step: '03', title: 'Panel conversation', body: 'Meet cross-functional partners you would actually ship with.' },
]

const benefits = [
  { icon: Laptop, label: 'Remote-first', text: 'Core collaboration hours with async writing blocks protected.' },
  { icon: HeartHandshake, label: 'Benefits', text: 'Medical, dental, vision, and mental health stipend in major markets.' },
  { icon: Clock, label: 'Learning', text: 'Annual research budget for books, courses, and field reporting travel.' },
]

export default function CareersPage() {
  return (
    <PageShell
      eyebrow="Company"
      title="Careers"
      description={`Help ${SITE_CONFIG.name} grow into the default place professionals open when they need context—not another noisy feed.`}
      actions={
        <Button className="rounded-md bg-[#b32025] hover:bg-[#951a1f]" asChild>
          <Link href="/contact">Start a conversation</Link>
        </Button>
      }
    >
      <section className="overflow-hidden rounded-md border border-slate-200/90 bg-white shadow-[0_16px_44px_rgba(11,22,40,0.06)]">
        <div className="grid lg:grid-cols-2">
          <div className="border-b border-slate-200/80 p-8 sm:p-10 lg:border-b-0 lg:border-r">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b32025]">Culture</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-900">We hire for judgment, not jargon.</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Small teams, explicit ownership, and editorial standards that travel with you into every meeting. We are allergic to performative hustle and vague roadmaps.
            </p>
          </div>
          <div className="grid gap-px bg-slate-200/80 sm:grid-cols-3 lg:grid-cols-1 lg:grid-rows-3">
            {benefits.map(({ icon: Icon, label, text }) => (
              <div key={label} className="bg-[#f9f8f6] p-6">
                <Icon className="h-5 w-5 text-[#b32025]" />
                <p className="mt-3 text-sm font-semibold text-slate-900">{label}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b32025]">Open roles</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">What we are hiring for now</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            {roles.map((role) => (
              <div
                key={role.title}
                className="rounded-md border border-slate-200/90 bg-white p-6 shadow-sm transition hover:border-[#b32025]/35 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-sm bg-[#b32025]/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b32025]">
                    {role.level}
                  </span>
                  <span className="rounded-sm border border-slate-200 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                    {role.type}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{role.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{role.location}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{role.blurb}</p>
                <Button variant="outline" className="mt-5 rounded-md border-[#b32025] text-[#b32025] hover:bg-[#b32025]/5" asChild>
                  <Link href="/contact">Discuss this role</Link>
                </Button>
              </div>
            ))}
          </div>
          <div className="rounded-md border border-slate-200/90 bg-[#f9f8f6] p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b32025]">Interview path</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">What to expect</h3>
            <ol className="mt-6 space-y-6">
              {steps.map((s) => (
                <li key={s.step} className="flex gap-4">
                  <span className="font-mono text-sm font-semibold text-[#b32025]">{s.step}</span>
                  <div>
                    <p className="font-semibold text-slate-900">{s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#b32025] hover:text-[#951a1f]">
              Read about our mission
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
