"use client"

import React, { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-secondary relative overflow-hidden">
      {/* Soft decorative element */}
      <div className="absolute -top-24 sm:-top-32 -right-24 sm:-right-32 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 sm:-bottom-32 -left-24 sm:-left-32 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-primary mb-4 sm:mb-5 block">
            The Glossy Letter
          </span>
          <h2 className="font-serif font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1] text-foreground mb-4 sm:mb-6 text-balance">
            Whispered straight to your <span className="text-primary">inbox.</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-md mx-auto leading-relaxed px-4">
            New collections, the occasional poem, and quiet first access—nothing more.
          </p>

          {isSubscribed ? (
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-card rounded-full px-5 sm:px-7 py-3 sm:py-4 border border-border/60">
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" strokeWidth={2} />
              <span className="text-xs sm:text-sm text-foreground">Welcome. Letter on its way.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto px-4 sm:px-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-card border border-border rounded-full px-5 sm:px-6 py-3 sm:py-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary glossy-transition text-xs sm:text-sm"
                required
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 sm:px-7 py-3 sm:py-4 rounded-full text-[10px] sm:text-[11px] tracking-[0.2em] uppercase glossy-transition hover:bg-foreground"
              >
                Subscribe
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 glossy-transition" />
              </button>
            </form>
          )}

          <p className="text-[10px] sm:text-xs tracking-wide text-muted-foreground/80 mt-6 sm:mt-8 px-4">
            Unsubscribe anytime. We treat your inbox like a love letter.
          </p>
        </div>
      </div>
    </section>
  )
}
