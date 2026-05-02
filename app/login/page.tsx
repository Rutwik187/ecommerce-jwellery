"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, ArrowLeft, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Login submitted:", formData)
  }

  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Visual side */}
      <aside className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-secondary">
        <Image
          src="/images/hero-jewelry.jpg"
          alt="Glossy and Glow jewelry collection"
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-background/40" />

        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 w-full text-foreground">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground glossy-transition w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            Back to Store
          </Link>

          <div className="max-w-md">
            <h2 className="font-serif text-4xl xl:text-5xl text-foreground leading-tight tracking-tight mb-4">
              Welcome back to <span className="text-primary">Glossy &amp; Glow</span>
            </h2>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Sign in to view your orders, manage your wishlist, and discover pieces curated for you.
            </p>
          </div>

          <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/60">
            Glossy &amp; Glow &mdash; Made for the in-between moments
          </p>
        </div>
      </aside>

      {/* Form side */}
      <section className="flex-1 flex items-center justify-center px-5 sm:px-8 py-12 sm:py-16">
        <div className="w-full max-w-md">
          {/* Mobile back link */}
          <Link
            href="/"
            className="lg:hidden inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground glossy-transition mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            Back to Store
          </Link>

          {/* Brand on mobile */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="font-serif font-medium text-3xl tracking-tight text-foreground">
              Glossy &amp; Glow
            </Link>
          </div>

          <div className="mb-8 sm:mb-10">
            <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-primary mb-3">Sign In</p>
            <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight tracking-tight mb-2">
              Step into your account
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enter your details below to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-foreground mb-2"
              >
                Username or Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <input
                  id="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full bg-card border border-border rounded-full pl-11 pr-4 py-3 sm:py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 glossy-transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-foreground"
                >
                  Password
                </label>
                <Link
                  href="/login"
                  className="text-[10px] sm:text-[11px] tracking-wide text-primary hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  className="w-full bg-card border border-border rounded-full pl-11 pr-12 py-3 sm:py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 glossy-transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground glossy-transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                  ) : (
                    <Eye className="w-4 h-4" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2.5 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={formData.remember}
                onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 accent-primary"
              />
              <span className="text-xs sm:text-sm text-muted-foreground">Keep me signed in</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3.5 sm:py-4 rounded-full text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-foreground glossy-transition"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-3 text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  or
                </span>
              </div>
            </div>

            {/* Sign up link */}
            <p className="text-center text-xs sm:text-sm text-muted-foreground">
              New to Glossy &amp; Glow?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}
