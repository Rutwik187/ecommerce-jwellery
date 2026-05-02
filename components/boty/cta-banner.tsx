"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTABanner() {
  const [isVisible, setIsVisible] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    )

    if (bannerRef.current) observer.observe(bannerRef.current)

    return () => {
      if (bannerRef.current) observer.unobserve(bannerRef.current)
    }
  }, [])

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={bannerRef}
          className={`rounded-2xl sm:rounded-3xl overflow-hidden relative min-h-[360px] sm:min-h-[420px] md:min-h-[480px] flex items-end transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'
          }`}
        >
          {/* Background Image */}
          <Image
            src="/images/cta-jewelry.jpg"
            alt="Glossy and Glow jewelry editorial flatlay"
            fill
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/40" />

          {/* Floating badge */}
          <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 hidden sm:block">
            <div className="bg-card/95 backdrop-blur-md rounded-full px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 border border-border/60">
              <p className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-foreground">New · Summer Edit</p>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-16 max-w-2xl">
            <span className="text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-primary mb-3 sm:mb-4 md:mb-5 block">
              Made for the in-between moments
            </span>
            <h3 className="font-serif font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground mb-4 sm:mb-5 md:mb-6 leading-[1.05] text-balance">
              For the woman who <span className="text-primary">remembers</span> what she wears.
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-6 sm:mb-8 md:mb-10 max-w-lg leading-relaxed">
              From your first solitaire to the waist chain only she sees—pieces designed
              to mark every chapter, gently.
            </p>

            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-primary text-primary-foreground px-6 sm:px-7 md:px-9 py-3 sm:py-3.5 md:py-4 rounded-full text-[10px] sm:text-[11px] tracking-[0.2em] uppercase glossy-transition hover:bg-foreground"
            >
              Explore the Edit
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 glossy-transition" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
