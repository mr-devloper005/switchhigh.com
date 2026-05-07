import Link from 'next/link'
import { ArrowRight, Building2, FileText, Image as ImageIcon, LayoutGrid, Tag, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'
import { TaskListHeroExtra } from '@/components/marketing/task-list-hero-extra'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantShells = {
  'listing-directory':
    'bg-[radial-gradient(circle_at_top_left,rgba(179,32,37,0.05),transparent_28%),linear-gradient(180deg,#f9f8f6_0%,#ffffff_55%,#f4f3f0_100%)]',
  'listing-showcase':
    'bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.04),transparent_26%),linear-gradient(180deg,#f9f8f6_0%,#ffffff_100%)]',
  'article-editorial':
    'bg-[#f9f8f6] min-h-screen relative overflow-hidden',
  'article-journal':
    'bg-[linear-gradient(180deg,#0f0c29_0%,#302b63_50%,#24243e_100%)] text-white min-h-screen relative overflow-hidden',
  'image-masonry': 'bg-[linear-gradient(180deg,#09101d_0%,#111c2f_100%)] text-white',
  'image-portfolio': 'bg-[linear-gradient(180deg,#07111f_0%,#13203a_100%)] text-white',
  'profile-creator':
    'bg-[radial-gradient(circle_at_top_right,rgba(15,23,42,0.05),transparent_30%),linear-gradient(180deg,#f9f8f6_0%,#ffffff_100%)]',
  'profile-business':
    'bg-[radial-gradient(circle_at_top_left,rgba(179,32,37,0.05),transparent_28%),linear-gradient(180deg,#f9f8f6_0%,#ffffff_100%)]',
  'classified-bulletin': 'bg-[linear-gradient(180deg,#f9f8f6_0%,#ffffff_100%)]',
  'classified-market': 'bg-[linear-gradient(180deg,#f9f8f6_0%,#ffffff_100%)]',
  'sbm-curation': 'bg-[linear-gradient(180deg,#f9f8f6_0%,#ffffff_100%)]',
  'sbm-library': 'bg-[linear-gradient(180deg,#f9f8f6_0%,#ffffff_100%)]',
} as const

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const introNavLinks = task === 'article' || task === 'profile' ? [] : intro.links
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const layoutKey = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`
  const shellClass = variantShells[layoutKey as keyof typeof variantShells] || 'bg-background'
  const Icon = taskIcons[task] || LayoutGrid

  const isDark = layoutKey === 'image-masonry' || layoutKey === 'image-portfolio' || layoutKey === 'article-journal'
  const isGradient = false  // Disabled gradient for article-editorial
  const isLight = layoutKey === 'article-editorial'
  const ui = isDark
    ? {
        muted: 'text-slate-300',
        panel: 'border border-white/10 bg-white/6 backdrop-blur-xl',
        soft: 'border border-white/10 bg-white/5 backdrop-blur-lg',
        input: 'border-white/10 bg-white/6 text-white placeholder:text-white/60',
        button: 'bg-white text-slate-950 hover:bg-slate-200',
      }
    : isGradient
    ? {
        muted: 'text-white/90',
        panel: 'border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl',
        soft: 'border border-white/15 bg-white/5 backdrop-blur-lg',
        input: 'border-white/20 bg-white/10 text-white placeholder:text-white/60 backdrop-blur-md',
        button: 'bg-white text-purple-900 hover:bg-purple-50 shadow-lg',
      }
    : {
        muted: 'text-slate-600',
        panel: 'border border-slate-200/90 bg-white shadow-[0_16px_44px_rgba(11,22,40,0.05)]',
        soft: 'border border-slate-200/80 bg-white',
        input: 'rounded-md border border-slate-200 bg-white text-slate-900',
        button: 'rounded-md bg-[#b32025] text-white hover:bg-[#951a1f]',
      }

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'article' || task === 'profile' ? <TaskListHeroExtra task={task} /> : null}
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {layoutKey === 'listing-directory' || layoutKey === 'listing-showcase' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className={`rounded-md p-7 ${ui.panel}`}>
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b32025]">
                <Icon className="h-4 w-4" /> {taskConfig?.label || task}
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${ui.muted}`}>Built with a cleaner scan rhythm, stronger metadata grouping, and a structure designed for business discovery rather than editorial reading.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={taskConfig?.route || '#'} className={`inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold ${ui.button}`}>
                  Explore results <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/search" className={`inline-flex items-center gap-2 rounded-md border-2 border-[#b32025] bg-transparent px-5 py-3 text-sm font-semibold text-[#b32025] hover:bg-[#b32025]/5`}>
                  Open search
                </Link>
              </div>
            </div>
            <form className={`grid gap-3 rounded-md p-6 ${ui.soft}`} action={taskConfig?.route || '#'}>
              <div>
                <label className={`text-xs font-semibold uppercase tracking-[0.18em] ${ui.muted}`}>Category</label>
                <select name="category" defaultValue={normalizedCategory} className={`mt-2 h-11 w-full rounded-md px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className={`h-11 rounded-md text-sm font-semibold ${ui.button}`}>
                Apply filters
              </button>
            </form>
          </section>
        ) : null}

        {layoutKey === 'article-editorial' || layoutKey === 'article-journal' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="relative">
              {isGradient && (
                <div className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-white/20 blur-3xl animate-pulse" />
              )}
              <div className="relative z-10">
                <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] ${isGradient ? 'bg-white/20 text-white border border-white/30 backdrop-blur-md' : isLight ? 'bg-slate-900 text-white' : 'bg-slate-900 text-white'}`}>
                  <Icon className="h-4 w-4" /> {taskConfig?.label || task}
                </div>
                <h1 className={`mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.04em] ${isGradient ? 'text-white' : isLight ? 'text-slate-900' : 'text-slate-900'} sm:text-6xl lg:text-7xl`}>
                  {taskConfig?.description || 'Latest posts'}
                </h1>
                <p className={`mt-6 max-w-2xl text-lg leading-relaxed ${isLight ? 'text-slate-600' : ui.muted} sm:text-xl`}>
                  {isGradient 
                    ? 'Immerse yourself in a vibrant reading experience where content flows like art through a spectrum of colors and ideas.'
                    : 'Navigate through carefully curated content in a space designed for deep focus and intellectual exploration.'
                  }
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${isGradient ? 'bg-white text-purple-900 shadow-xl' : isLight ? 'bg-[#b32025] text-white' : 'bg-slate-800 text-white border border-slate-700'}`}>
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    Live Updates
                  </div>
                  <div className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${isGradient ? 'bg-white/10 text-white border border-white/20 backdrop-blur-md' : isLight ? 'bg-white text-slate-700 border border-slate-200 shadow-sm' : 'bg-slate-900/50 text-white/80 border border-slate-700'}`}>
                    {posts.length} Articles
                  </div>
                </div>
              </div>
            </div>
            <div className={`relative rounded-2xl p-8 ${ui.panel} overflow-hidden`}>
              {isGradient && (
                <>
                  <div className="absolute top-0 right-0 h-20 w-20 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute bottom-0 left-0 h-16 w-16 rounded-full bg-white/15 blur-xl" />
                </>
              )}
              <div className="relative z-10">
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${isLight ? 'text-slate-500' : 'text-white/80'}`}>Reading Experience</p>
                <p className={`mt-4 text-sm leading-relaxed ${isLight ? 'text-slate-600' : ui.muted}`}>
                  {isGradient 
                    ? 'Navigate through topics with our intelligent filtering system that adapts to your reading preferences.'
                    : 'Use category filters to jump between topics without collapsing the page into repetitive patterns.'
                  }
                </p>
                <form className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center" action={taskConfig?.route || '#'}>
                  <select name="category" defaultValue={normalizedCategory} className={`h-12 flex-1 rounded-xl px-4 text-sm ${ui.input} backdrop-blur-md`}>
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.slug} value={item.slug}>{item.name}</option>
                    ))}
                  </select>
                  <button type="submit" className={`h-12 shrink-0 rounded-xl px-6 text-sm font-semibold ${ui.button} transition-all duration-300 hover:scale-105`}>
                    Apply Filter
                  </button>
                </form>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'image-masonry' || layoutKey === 'image-portfolio' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${ui.soft}`}>
                <Icon className="h-3.5 w-3.5" /> Visual feed
              </div>
              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This surface leans into stronger imagery, larger modules, and more expressive spacing so visual content feels materially different from reading and directory pages.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={`min-h-[220px] rounded-md ${ui.panel}`} />
              <div className={`min-h-[220px] rounded-md ${ui.soft}`} />
              <div className={`col-span-2 min-h-[120px] rounded-md ${ui.panel}`} />
            </div>
          </section>
        ) : null}

        {layoutKey === 'profile-creator' || layoutKey === 'profile-business' ? (
          <section className={`mb-12 rounded-md p-8 ${ui.panel}`}>
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className={`min-h-[200px] rounded-md border border-dashed border-slate-200/90 bg-[#f9f8f6] sm:min-h-[240px]`} />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b32025]">{taskConfig?.label || task}</p>
                <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl">
                  Contributors with stronger identity, trust, and reputation cues.
                </h1>
                <p className={`mt-5 max-w-2xl text-sm leading-relaxed sm:text-base ${ui.muted}`}>
                  This layout prioritizes the person or business surface first, then lets the feed continue below without borrowing the same visual logic used by insights or listings.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-bulletin' || layoutKey === 'classified-market' ? (
          <section className="mb-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className={`rounded-md p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Fast-moving notices, offers, and responses in a compact board format.</h1>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {['Quick to scan', 'Shorter response path', 'Clearer urgency cues'].map((item) => (
                <div key={item} className={`rounded-md p-5 ${ui.soft}`}>
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {layoutKey === 'sbm-curation' || layoutKey === 'sbm-library' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b32025]">{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl">
                Curated resources arranged more like collections than a generic post feed.
              </h1>
              <p className={`mt-5 max-w-2xl text-sm leading-relaxed sm:text-base ${ui.muted}`}>
                Bookmarks, saved resources, and reference-style items need calmer grouping and lighter metadata. This variant gives them that separation.
              </p>
            </div>
            <div className={`rounded-md p-6 ${ui.panel}`}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b32025]">Collection filter</p>
              <form className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-md px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 shrink-0 rounded-md px-5 text-sm font-semibold ${ui.button}`}>
                  Apply
                </button>
              </form>
            </div>
          </section>
        ) : null}

        {intro ? (
          <section className={`mb-12 rounded-md p-6 sm:p-8 ${ui.panel}`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b32025]">About this section</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-relaxed ${ui.muted}`}>
                {paragraph}
              </p>
            ))}
            {introNavLinks.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                {introNavLinks.map((link) => (
                  <a key={link.href} href={link.href} className="font-semibold text-[#b32025] hover:text-[#951a1f] hover:underline">
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  )
}
