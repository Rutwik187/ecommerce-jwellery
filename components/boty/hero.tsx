"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-jewelry.jpg"
          alt="Glossy and Glow jewelry collection on blush silk"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Soft pink wash for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        <div className="absolute inset-0 lg:hidden bg-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto lg:px-12">
          <div className="w-full lg:max-w-2xl text-center lg:text-left">
            <span
              className="text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-6 sm:mb-8 block text-primary animate-blur-in opacity-0"
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              ANTI-TARNISH JEWELLERY · MADE TO LAST
            </span>

            <h1 className="font-serif font-light text-foreground leading-[0.95] mb-6 sm:mb-8 text-balance">
              <span
                className="block text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-normal text-primary animate-blur-in opacity-0"
                style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
              >
                Stay golden.
              </span>
              <span
                className="block text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl animate-blur-in opacity-0"
                style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}
              >
                No fading, no dullness.
              </span>
            </h1>

            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-12 max-w-md mx-auto lg:mx-0 text-muted-foreground animate-blur-in opacity-0"
              style={{ animationDelay: '0.75s', animationFillMode: 'forwards' }}
            >
              Waterproof, sweat-proof, and tarnish-resistant jewellery—designed to shine every day, effortlessly.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center animate-blur-in opacity-0"
              style={{ animationDelay: '0.95s', animationFillMode: 'forwards' }}
            >
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-[10px] sm:text-xs tracking-[0.2em] uppercase glossy-transition hover:bg-foreground w-full sm:w-auto"
              >
                SHOP GLOSSY GLOW
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 glossy-transition" />
              </Link>
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center gap-2 text-foreground px-6 py-3.5 sm:py-4 text-[10px] sm:text-xs tracking-[0.2em] uppercase glossy-transition hover:text-primary"
              >
                Our Story
              </Link>
            </div>

            {/* Subtle stat row */}
            <div
              className="hidden lg:flex items-center gap-6 xl:gap-8 mt-12 xl:mt-16 pt-6 xl:pt-8 border-t border-border/60 animate-blur-in opacity-0"
              style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
            >
              <div>
                <p className="font-serif text-xl xl:text-2xl text-foreground">925</p>
                <p className="text-[9px] xl:text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">Sterling Silver</p>
              </div>
              <div className="w-px h-8 xl:h-10 bg-border" />
              <div>
                <p className="font-serif text-xl xl:text-2xl text-foreground">100%</p>
                <p className="text-[9px] xl:text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">Hand-finished</p>
              </div>
              <div className="w-px h-8 xl:h-10 bg-border" />
              <div>
                <p className="font-serif text-xl xl:text-2xl text-foreground">Free</p>
                <p className="text-[9px] xl:text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">Pan India Shipping</p>
              </div>
            </div>

            {/* Mobile stats */}
            <div
              className="lg:hidden flex justify-center gap-6 mt-10 pt-6 border-t border-border/60 animate-blur-in opacity-0"
              style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
            >
              <div className="text-center">
                <p className="font-serif text-lg text-foreground">925</p>
                <p className="text-[8px] tracking-[0.2em] uppercase text-muted-foreground mt-0.5">Silver</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="font-serif text-lg text-foreground">100%</p>
                <p className="text-[8px] tracking-[0.2em] uppercase text-muted-foreground mt-0.5">Handmade</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="font-serif text-lg text-foreground">Free</p>
                <p className="text-[8px] tracking-[0.2em] uppercase text-muted-foreground mt-0.5">Shipping</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 text-muted-foreground">
        <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-px h-10 sm:h-12 bg-border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  )
}
