import Link from 'next/link'
import { Bookmark, Building2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'

function getRegisterConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'text-slate-900',
      panel: 'border border-slate-200/90 bg-white shadow-[0_18px_48px_rgba(11,22,40,0.06)]',
      side: 'border border-slate-200/80 bg-white',
      muted: 'text-slate-600',
      action: 'bg-[#b32025] text-white hover:bg-[#951a1f]',
      icon: Building2,
      title: 'Create a business-ready account',
      body: 'List services, manage locations, and activate trust signals with a proper directory workflow.',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'text-slate-900',
      panel: 'border border-slate-200/90 bg-white shadow-[0_18px_48px_rgba(11,22,40,0.06)]',
      side: 'border border-slate-200/80 bg-white',
      muted: 'text-slate-600',
      action: 'bg-[#b32025] text-white hover:bg-[#951a1f]',
      icon: FileText,
      title: 'Start your contributor workspace',
      body: 'Create a profile for essays, issue drafts, editorial review, and publication scheduling.',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      side: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
      icon: ImageIcon,
      title: 'Set up your creator profile',
      body: 'Launch a visual-first account with gallery publishing, identity surfaces, and profile-led discovery.',
    }
  }
  return {
    shell: 'text-slate-900',
    panel: 'border border-slate-200/90 bg-white shadow-[0_18px_48px_rgba(11,22,40,0.06)]',
    side: 'border border-slate-200/80 bg-white',
    muted: 'text-slate-600',
    action: 'bg-[#b32025] text-white hover:bg-[#951a1f]',
    icon: Bookmark,
    title: 'Create a curator account',
    body: 'Build shelves, save references, and connect collections to your profile without a generic feed setup.',
  }
}

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getRegisterConfig(productKind)
  const Icon = config.icon
  const rootClass = productKind === 'visual' ? `min-h-screen ${config.shell}` : `site-canvas ${config.shell}`.trim()

  return (
    <div className={rootClass}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className={`rounded-md p-8 ${config.side}`}>
            <Icon className="h-8 w-8" />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {['Different onboarding per product family', 'No repeated one-size-fits-all shell', 'Profile, publishing, and discovery aligned'].map((item) => (
                <div key={item} className="rounded-md border border-slate-200/80 bg-[#f9f8f6] px-4 py-4 text-sm text-slate-700">{item}</div>
              ))}
            </div>
          </div>

          <div className={`rounded-md p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b32025]">Create account</p>
            <form className="mt-6 grid gap-4">
              <input className="h-12 rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900" placeholder="Full name" />
              <input className="h-12 rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900" placeholder="Email address" />
              <input className="h-12 rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900" placeholder="Password" type="password" />
              <input className="h-12 rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900" placeholder="What are you creating or publishing?" />
              <button type="submit" className={`inline-flex h-12 items-center justify-center rounded-md px-6 text-sm font-semibold ${config.action}`}>Create account</button>
            </form>
            <div className={`mt-6 flex items-center justify-between text-sm ${config.muted}`}>
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-[#b32025] hover:text-[#951a1f] hover:underline">
                <Sparkles className="h-4 w-4" />
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
