import Link from 'next/link'
import { ArrowRight, FileText, User } from 'lucide-react'
import type { TaskKey } from '@/lib/site-config'

export function TaskListHeroExtra({ task }: { task: TaskKey }) {
  if (task === 'article') {
    return (
      <section className="mb-10 overflow-hidden rounded-md border border-slate-200/90 bg-white shadow-[0_16px_44px_rgba(11,22,40,0.06)]">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[200px] bg-[linear-gradient(120deg,#0b1628_0%,#115e59_48%,#0b1628_100%)] p-8 text-white lg:min-h-[240px] lg:p-10">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,22,40,0.2)_0%,rgba(11,22,40,0.75)_100%)]" aria-hidden />
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">Insights</p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
                Long-form reporting with a calmer scan rhythm.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85">
                Browse briefings, field notes, and analysis—structured for professionals who read on deadline and still want depth.
              </p>
              <Link
                href="/search"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#b32025] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#951a1f]"
              >
                Search the library
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center border-t border-slate-200/80 p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#b32025]/30 bg-[#b32025]/5 text-[#b32025]">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">How we publish</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Every piece is edited for clarity, sourcing, and structure. Use categories below the masthead to jump between beats without losing context.
                </p>
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="font-semibold text-[#b32025]">01</span>
                Desk review for accuracy and tone.
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#b32025]">02</span>
                Contributor bylines linked to live profiles.
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#b32025]">03</span>
                Updates surfaced when a story materially changes.
              </li>
            </ul>
          </div>
        </div>
      </section>
    )
  }

  if (task === 'profile') {
    return (
      <section className="mb-10 overflow-hidden rounded-md border border-slate-200/90 bg-white shadow-[0_16px_44px_rgba(11,22,40,0.06)]">
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b32025]">Contributors</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl">People behind the reporting</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Profiles anchor expertise—beats, bios, and credibility cues so readers know who is speaking and why it matters.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 rounded-md border-2 border-[#b32025] px-4 py-2.5 text-sm font-semibold text-[#b32025] hover:bg-[#b32025]/5"
              >
                Read insights
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-[#b32025] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#951a1f]"
              >
                Pitch the desk
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="border-t border-slate-200/80 bg-[#f9f8f6] p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-[#b32025]">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Directory principles</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  We highlight independent voices, beat reporters, and operators with verifiable experience—no anonymous noise, no recycled press releases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return null
}
