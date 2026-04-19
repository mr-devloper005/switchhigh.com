import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/privacy',
    title: `Privacy Policy | ${SITE_CONFIG.name}`,
    description: 'How we collect, use, retain, and protect personal information across the publication and related products.',
  })
}

const toc = [
  { id: 'overview', label: 'Overview' },
  { id: 'collection', label: 'What we collect' },
  { id: 'use', label: 'How we use data' },
  { id: 'sharing', label: 'Sharing & processors' },
  { id: 'retention', label: 'Retention' },
  { id: 'rights', label: 'Your rights' },
  { id: 'contact', label: 'Contact' },
]

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description="Plain-language summary of our data practices. For contractual or regulatory questions, contact the desk—we will route you to the right owner."
    >
      <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:items-start">
        <nav
          aria-label="Privacy policy sections"
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

          <section id="overview" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              {SITE_CONFIG.name} operates a reading-first publication. We collect only what we need to deliver accounts, protect the platform, understand aggregate readership, and comply with law. We do not sell personal information as a business model.
            </p>
          </section>

          <section id="collection" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-900">What we collect</h2>
            <ul className="mt-4 list-inside list-disc space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              <li>Account details you provide (name, email, password hash, optional profile fields).</li>
              <li>Content you submit for publication or comment threads.</li>
              <li>Technical diagnostics such as device type, browser version, and coarse location derived from IP for fraud prevention.</li>
              <li>Support messages you send through contact forms or email.</li>
            </ul>
          </section>

          <section id="use" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-900">How we use data</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              We use information to authenticate sessions, personalize reading preferences you explicitly set, send transactional notices, improve search relevance, and measure aggregate engagement. Editorial teams may review abuse reports tied to account metadata to enforce community standards.
            </p>
          </section>

          <section id="sharing" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-900">Sharing & subprocessors</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              We share data with infrastructure and communications vendors who help us host, email, and secure the service. Each vendor is bound by confidentiality and data-processing terms consistent with this policy. We may disclose information if required by law or to protect the safety of readers and staff.
            </p>
          </section>

          <section id="retention" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-900">Retention</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              Account data is kept while your account is active and for a limited grace period after deletion to recover from accidental requests. Logs needed for security investigations may be retained longer in a restricted, access-controlled archive.
            </p>
          </section>

          <section id="rights" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-900">Your rights</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              Depending on where you live, you may request access, correction, export, restriction, or deletion of personal data. We will verify requests to prevent impersonation. Some rights may be limited where we must retain data for legal or security reasons.
            </p>
          </section>

          <section id="contact" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              Questions about this policy or a specific data request? Reach the privacy inbox through our{' '}
              <Link href="/contact" className="font-semibold text-[#b32025] hover:underline">
                contact page
              </Link>
              . We respond within a reasonable timeframe and may ask for clarifying detail to process your request safely.
            </p>
          </section>
        </div>
      </div>
    </PageShell>
  )
}
