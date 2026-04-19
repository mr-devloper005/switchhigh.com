import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/licenses',
    title: `Open source licenses | ${SITE_CONFIG.name}`,
    description: 'Acknowledgements and license references for open source software used in this product.',
  })
}

const stack = [
  { name: 'Next.js', license: 'MIT', note: 'React framework, routing, and server components runtime.' },
  { name: 'React', license: 'MIT', note: 'UI library powering client and server rendering.' },
  { name: 'Tailwind CSS', license: 'MIT', note: 'Utility-first styling system for layout and design tokens.' },
  { name: 'Radix UI', license: 'MIT', note: 'Accessible primitives for dialogs, menus, and form controls.' },
  { name: 'Lucide', license: 'ISC', note: 'Icon set used in navigation and marketing surfaces.' },
  { name: 'TypeScript', license: 'Apache-2.0', note: 'Typed JavaScript for safer refactors across the codebase.' },
]

export default function LicensesPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Licenses"
      description="We stand on excellent open source work. This page lists major dependencies and their licenses; full texts ship with upstream repositories."
    >
      <section className="overflow-hidden rounded-md border border-slate-200/90 bg-white shadow-[0_16px_44px_rgba(11,22,40,0.06)]">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b border-slate-200/80 p-8 sm:p-10 lg:border-b-0 lg:border-r">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b32025]">Attribution</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-900">Thank you to maintainers</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {SITE_CONFIG.name} is composed of many small libraries maintained by independent authors. We honor their licenses, contribute fixes upstream when we can, and keep this list current as dependencies change.
            </p>
          </div>
          <div className="flex flex-col justify-center bg-[#f9f8f6] p-8 sm:p-10">
            <p className="text-sm leading-relaxed text-slate-600">
              Full license texts are available from each project&apos;s repository. If you believe a notice is missing or incorrect, email the desk—we correct attribution quickly.
            </p>
            <Link href="/contact" className="mt-6 inline-flex text-sm font-semibold text-[#b32025] hover:underline">
              Report a license issue →
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-12 space-y-4">
        {stack.map((row) => (
          <div
            key={row.name}
            className="flex flex-col gap-2 rounded-md border border-slate-200/90 bg-white p-5 shadow-sm sm:flex-row sm:items-start sm:justify-between"
          >
            <div>
              <h3 className="font-semibold text-slate-900">{row.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{row.note}</p>
            </div>
            <span className="shrink-0 rounded-sm border border-slate-200 bg-[#f9f8f6] px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700">
              {row.license}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm leading-relaxed text-slate-600">
        This is not an exhaustive bill of materials. Container images, fonts, and optional integrations may include additional notices shipped alongside deployments.
      </p>
    </PageShell>
  )
}
