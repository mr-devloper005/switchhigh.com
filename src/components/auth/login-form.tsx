'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function LoginForm({ submitClassName = '' }: { submitClassName?: string }) {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !password) {
      setError('Enter your email and password.')
      return
    }
    try {
      await login(email.trim(), password)
      router.push('/')
      router.refresh()
    } catch {
      setError('Something went wrong. Try again.')
    }
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-2">
        <Label htmlFor="login-email" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Email
        </Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="Email address"
          className="h-12 rounded-lg border-border bg-background"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="login-password" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Password
        </Label>
        <Input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder="Password"
          className="h-12 rounded-lg border-border bg-background"
        />
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button
        type="submit"
        disabled={isLoading}
        className={cn('h-12 w-full rounded-md text-sm font-semibold', submitClassName)}
      >
        {isLoading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}
