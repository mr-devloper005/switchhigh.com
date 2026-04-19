import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

function getTone(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'text-slate-900',
      panel: 'border border-slate-200/90 bg-white shadow-[0_18px_48px_rgba(11,22,40,0.06)]',
      soft: 'border border-slate-200/80 bg-white',
      muted: 'text-slate-600',
      action: 'bg-[#b32025] text-white hover:bg-[#951a1f]',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'text-slate-900',
      panel: 'border border-slate-200/90 bg-white shadow-[0_18px_48px_rgba(11,22,40,0.06)]',
      soft: 'border border-slate-200/80 bg-white',
      muted: 'text-slate-600',
      action: 'bg-[#b32025] text-white hover:bg-[#951a1f]',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      soft: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    }
  }
  return {
    shell: 'text-slate-900',
    panel: 'border border-slate-200/90 bg-white shadow-[0_18px_48px_rgba(11,22,40,0.06)]',
    soft: 'border border-slate-200/80 bg-white',
    muted: 'text-slate-600',
    action: 'bg-[#b32025] text-white hover:bg-[#951a1f]',
  }
}

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)
  const rootClass = productKind === 'visual' ? `min-h-screen ${tone.shell}` : `site-canvas ${tone.shell}`.trim()
  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
          { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
          { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <div className={rootClass}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b32025]">Contact {SITE_CONFIG.name}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-5xl">
              A support page that matches the product, not a generic contact form.
            </h1>
            <p className={`mt-5 max-w-2xl text-sm leading-relaxed sm:text-base ${tone.muted}`}>
              Tell us what you are trying to publish, fix, or launch. We will route it through the right lane instead of forcing every request into the same support bucket.
            </p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-md p-5 shadow-sm ${tone.soft}`}>
                  <lane.icon className={`h-5 w-5 ${productKind === 'visual' ? 'text-white' : 'text-[#b32025]'}`} />
                  <h2 className={`mt-3 text-xl font-semibold ${productKind === 'visual' ? 'text-white' : 'text-slate-900'}`}>{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-relaxed ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-md p-7 ${tone.panel}`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b32025]">Message desk</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Send a message</h2>
            <form className="mt-6 grid gap-4">
              <input
                className={`h-12 rounded-md border px-4 text-sm ${productKind === 'visual' ? 'border-white/10 bg-white/6 text-white placeholder:text-slate-400' : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400'}`}
                placeholder="Your name"
              />
              <input
                className={`h-12 rounded-md border px-4 text-sm ${productKind === 'visual' ? 'border-white/10 bg-white/6 text-white placeholder:text-slate-400' : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400'}`}
                placeholder="Email address"
              />
              <input
                className={`h-12 rounded-md border px-4 text-sm ${productKind === 'visual' ? 'border-white/10 bg-white/6 text-white placeholder:text-slate-400' : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400'}`}
                placeholder="What do you need help with?"
              />
              <textarea
                className={`min-h-[180px] rounded-md border px-4 py-3 text-sm ${productKind === 'visual' ? 'border-white/10 bg-white/6 text-white placeholder:text-slate-400' : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400'}`}
                placeholder="Share the full context so we can respond with the right next step."
              />
              <button type="submit" className={`inline-flex h-12 items-center justify-center rounded-md px-6 text-sm font-semibold ${tone.action}`}>
                Send message
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
