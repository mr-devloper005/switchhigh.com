import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/cookies',
    title: `Cookie Policy | ${SITE_CONFIG.name}`,
    description: 'How and why we use cookies and similar technologies on the publication.',
  })
}

const toc = [
  { id: 'basics', label: 'Basics' },
  { id: 'essential', label: 'Essential' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'control', label: 'Your controls' },
]

export default function CookiesPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Cookie Policy"
      description="We use a small set of cookies to keep sessions secure, understand readership in aggregate, and remember choices you explicitly make."
    >
      <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:items-start">
        <nav
          aria-label="Cookie policy sections"
          className="rounded-md border border-slate-200/90 bg-white p-4 text-sm shadow-sm lg:sticky lg:top-28"
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b32025]">On this page</p>
          <ul className="space-y-2">
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-slate-600 hover:text-[#b32025]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 space-y-12">
          <p className="text-sm text-slate-500">Last updated: April 18, 2026</p>

          <section id="basics" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-900">Basics</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              Cookies are small text files stored on your device. Similar technologies include local storage entries used for lightweight UI state. This policy explains categories we use today; we will update it if new technologies materially change your experience.
            </p>
          </section>

          <section id="essential" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-900">Essential cookies</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              Required for authentication, session integrity, load balancing, and abuse prevention. These cookies cannot be disabled without breaking sign-in and core security features.
            </p>
          </section>

          <section id="analytics" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-900">Analytics</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              We may use privacy-preserving analytics to understand which sections are read, how performance varies by region, and whether new layouts help or hurt completion rates. Where possible we aggregate or sample data instead of storing long-lived identifiers.
            </p>
          </section>

          <section id="preferences" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-900">Preferences</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              When you choose typography size, reduced motion, or saved filters, we persist those choices locally or with a scoped cookie so the experience stays consistent between visits.
            </p>
          </section>

          <section id="control" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-900">Your controls</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              Browser settings let you block or delete cookies. Note that blocking essential cookies may prevent login. For product-specific questions, contact us via the{' '}
              <Link href="/contact" className="font-semibold text-[#b32025] hover:underline">
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </PageShell>
  )
}
