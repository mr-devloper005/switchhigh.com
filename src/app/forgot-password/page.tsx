"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavbarShell } from "@/components/shared/navbar-shell"
import { Footer } from "@/components/shared/footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="site-canvas flex min-h-screen flex-col">
      <NavbarShell />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-14 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md rounded-md border border-slate-200/90 bg-white p-8 shadow-[0_18px_48px_rgba(11,22,40,0.06)]"
        >
          <Link
            href="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#b32025] hover:text-[#951a1f]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          {!isSubmitted ? (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b32025]">Account security</p>
              <h1 className="mb-2 mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl">Reset your password</h1>
              <p className="mb-8 text-sm leading-relaxed text-slate-600">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-md border-slate-200 pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full rounded-md bg-[#b32025] font-semibold text-white hover:bg-[#951a1f]" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h1 className="mb-2 text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl">Check your email</h1>
              <p className="mb-8 text-sm leading-relaxed text-slate-600">
                We&apos;ve sent a password reset link to <strong className="text-slate-900">{email}</strong>
              </p>
              <Button asChild variant="outline" className="w-full rounded-md border-slate-200">
                <Link href="/login">Back to login</Link>
              </Button>
              <p className="mt-6 text-sm text-slate-600">
                Didn&apos;t receive the email?{" "}
                <button type="button" onClick={() => setIsSubmitted(false)} className="font-semibold text-[#b32025] hover:underline">
                  Try again
                </button>
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
