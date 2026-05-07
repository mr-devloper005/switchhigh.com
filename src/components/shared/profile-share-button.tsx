'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { Share2 } from 'lucide-react'

export function ProfileShareButton() {
  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    if (!url) return

    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: 'URL copied',
        description: 'Profile link copied to clipboard.',
      })
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Unable to copy URL to clipboard.',
      })
    }
  }

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-6 text-base"
    >
      <Share2 className="h-4 w-4" />
      Share
    </Button>
  )
}
