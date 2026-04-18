import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/terms',
    title: `Terms of Service | ${SITE_CONFIG.name}`,
    description: 'Rules for using the publication, submitting content, and participating in the community.',
  })
}

const toc = [
  { id: 'agreement', label: 'Agreement' },
  { id: 'accounts', label: 'Accounts' },
  { id: 'content', label: 'Content & license' },
  { id: 'conduct', label: 'Acceptable use' },
  { id: 'disclaimers', label: 'Disclaimers' },
  { id: 'changes', label: 'Changes' },
]

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Service"
      description={`The agreement between you and ${SITE_CONFIG.name} when you access the site, create an account, or submit material for publication.`}
    >
      <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:items-start">
        <nav
          aria-label="Terms sections"
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

          <section id="agreement" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-900">Agreement</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              By using {SITE_CONFIG.name}, you agree to these terms and to any additional guidelines we post for specific programs (for example, contributor rules). If you do not agree, discontinue use of the site and close your account.
            </p>
          </section>

          <section id="accounts" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-900">Accounts</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              You are responsible for safeguarding credentials and for activity under your account. Notify us promptly if you suspect unauthorized access. We may suspend accounts involved in abuse, fraud, or legal risk while we investigate.
            </p>
          </section>

          <section id="content" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-900">Content & license</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              You retain ownership of material you submit. By publishing with us, you grant {SITE_CONFIG.name} a non-exclusive license to host, display, distribute, promote, and technically adapt that content in connection with the service. You represent that you have the rights to grant this license.
            </p>
          </section>

          <section id="conduct" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-900">Acceptable use</h2>
            <ul className="mt-4 list-inside list-disc space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              <li>No harassment, hate speech, or targeted intimidation of individuals or groups.</li>
              <li>No malware, scraping that degrades service quality, or attempts to bypass security controls.</li>
              <li>No misrepresentation of affiliation with {SITE_CONFIG.name} or with third parties.</li>
              <li>No spam, deceptive linking schemes, or coordinated inauthentic behavior.</li>
            </ul>
          </section>

          <section id="disclaimers" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-900">Disclaimers</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              The site is provided &quot;as is&quot; to the maximum extent permitted by law. Editorial content is for informational purposes and is not tailored financial, legal, or medical advice. We do not guarantee uninterrupted availability and may change features as the product evolves.
            </p>
          </section>

          <section id="changes" className="scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-900">Changes</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              We may update these terms to reflect new laws, features, or risk patterns. Material changes will be highlighted on this page and, where appropriate, by email or in-product notice. Continued use after the effective date constitutes acceptance.
            </p>
            <p className="mt-6 text-sm text-slate-600">
              Questions? Visit the{' '}
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
