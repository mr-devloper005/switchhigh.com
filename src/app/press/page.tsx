'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download, ImageIcon, Newspaper } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <PageShell
      eyebrow="Company"
      title="Press"
      description="Logos, product imagery, coverage highlights, and how to reach the communications desk."
      actions={
        <Button variant="outline" className="rounded-md border-2 border-[#b32025] text-[#b32025] hover:bg-[#b32025]/5" asChild>
          <Link href="/contact">Media inquiries</Link>
        </Button>
      }
    >
      <section className="overflow-hidden rounded-md border border-slate-200/90 bg-white shadow-[0_16px_44px_rgba(11,22,40,0.06)]">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[200px] bg-[linear-gradient(125deg,#0b1628_0%,#115e59_48%,#0b1628_100%)] p-8 text-white sm:p-10">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,22,40,0.15)_0%,rgba(11,22,40,0.82)_100%)]" aria-hidden />
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">Brand & communications</p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
                Download-ready assets with clear usage rights.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85">
                Use the kit for articles, conference decks, and broadcast segments. When in doubt, email the desk—we answer quickly during business hours.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center border-t border-slate-200/80 bg-[#f9f8f6] p-8 sm:p-10 lg:border-l lg:border-t-0">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#b32025]/30 bg-white text-[#b32025]">
                <ImageIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Usage guidelines</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Do not crop logos, alter colors, or imply endorsement without written approval. Pair screenshots with a live link to the site when possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
        <div className="rounded-md border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2 text-[#b32025]">
            <Download className="h-4 w-4" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]">Press kit</p>
          </div>
          <h2 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">Downloads</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Logos, UI captures, and typography samples sized for print and digital. Preview before you download.
          </p>
          <div className="mt-8 space-y-4">
            {mockPressAssets.map((asset) => (
              <div
                key={asset.id}
                className="rounded-md border border-slate-200/80 bg-[#f9f8f6] p-4 transition hover:border-[#b32025]/30"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{asset.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{asset.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-sm border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                      {asset.fileType}
                    </span>
                    <Button size="sm" variant="outline" className="rounded-md border-slate-200" onClick={() => setActiveAssetId(asset.id)}>
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-md bg-[#b32025] hover:bg-[#951a1f]"
                      onClick={() =>
                        toast({
                          title: 'Download started',
                          description: `${asset.title} is downloading.`,
                        })
                      }
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2 text-[#b32025]">
            <Newspaper className="h-4 w-4" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]">Coverage</p>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">Selected mentions</h2>
          <p className="mt-2 text-sm text-slate-600">Third-party write-ups referencing our reporting or product direction.</p>
          <div className="mt-6 space-y-4">
            {mockPressCoverage.map((item) => (
              <div
                key={item.id}
                className="rounded-md border border-slate-200/90 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#b32025]/25 hover:shadow-md"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{item.outlet}</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-900">{item.headline}</p>
                <p className="mt-2 text-xs text-slate-500">{item.date}</p>
              </div>
            ))}
          </div>
          <Link href="/articles" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#b32025] hover:text-[#951a1f]">
            Read our latest insights
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl rounded-md border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-slate-900">{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-video overflow-hidden rounded-md border border-slate-200/90 bg-slate-100">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          )}
          <p className="text-sm leading-relaxed text-slate-600">{activeAsset?.description}</p>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" className="rounded-md border-slate-200" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className="rounded-md bg-[#b32025] hover:bg-[#951a1f]"
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
