"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Gem, Sparkles, HeartHandshake, Leaf } from "lucide-react"

const features = [
  {
    icon: Gem,
    title: "Anti-Tarnish Coating",
    description: "Extra layer of protection"
  },
  {
    icon: Sparkles,
    title: "Water & Sweat Proof",
    description: "Designed for daily wear"
  },
  {
    icon: HeartHandshake,
    title: "Long-Lasting Shine",
    description: "Jewellery that stays glossy"
  }
]

export function FeatureSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isImageVisible, setIsImageVisible] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const bentoRef = useRef<HTMLDivElement>(null)
  const imageSectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    )
    const imageObserver = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsImageVisible(true),
      { threshold: 0.1 }
    )
    const headerObserver = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setHeaderVisible(true),
      { threshold: 0.1 }
    )

    if (bentoRef.current) observer.observe(bentoRef.current)
    if (imageSectionRef.current) imageObserver.observe(imageSectionRef.current)
    if (headerRef.current) headerObserver.observe(headerRef.current)

    return () => {
      if (bentoRef.current) observer.unobserve(bentoRef.current)
      if (imageSectionRef.current) imageObserver.unobserve(imageSectionRef.current)
      if (headerRef.current) headerObserver.unobserve(headerRef.current)
    }
  }, [])

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Grid */}
        <div
          ref={bentoRef}
          className="grid md:grid-cols-4 mb-16 sm:mb-20 md:mb-28 md:grid-rows-[280px_280px] sm:md:grid-rows-[300px_300px] gap-3 sm:gap-4 md:gap-5"
        >
          {/* Left Large — Model with jewelry */}
          <div
            className={`relative rounded-xl sm:rounded-2xl overflow-hidden h-[400px] sm:h-[500px] md:h-auto md:col-span-2 md:row-span-2 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <Image
              src="/images/model-jewelry.jpg"
              alt="Layered silver necklaces on neckline"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Subtle gradient for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Floating tag */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-card/90 backdrop-blur-md text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-foreground">
              The Glossy Edit
            </div>

            {/* Overlay Card */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-card/95 backdrop-blur-md p-4 sm:p-6 rounded-lg sm:rounded-xl border border-border/50">
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-foreground mb-1 sm:mb-2 leading-tight">
                Layered, <span className="text-primary">never overwhelming.</span>
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Pieces designed to live together—each one earning its place against your skin.
              </p>
            </div>
          </div>

          {/* Top Right — Hand with rings */}
          <div
            className={`rounded-xl sm:rounded-2xl flex flex-col justify-end md:col-span-2 relative overflow-hidden h-[250px] sm:h-[280px] md:h-auto transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '120ms' }}
          >
            <Image
              src="/images/hand-rings.jpg"
              alt="Hand wearing stacked silver rings"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/30 to-transparent" />

            <div className="relative z-10 p-5 sm:p-7">
              <h3 className="font-serif font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground mb-1 sm:mb-2 leading-tight">
                Stack with intention.
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xs">
                Mix sizes, stones and stories—our rings were made to be worn together.
              </p>
            </div>
          </div>

          {/* Bottom Right — Jewelry box */}
          <div
            className={`rounded-xl sm:rounded-2xl flex flex-col justify-end relative overflow-hidden md:col-span-2 h-[250px] sm:h-[280px] md:h-auto transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '240ms' }}
          >
            <Image
              src="/images/jewelry-box.jpg"
              alt="Velvet jewelry box with silver pieces"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/30 to-transparent" />

            <div className="relative z-10 p-5 sm:p-7">
              <h3 className="font-serif font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground mb-1 sm:mb-2 leading-tight">
                Boxed in velvet.
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xs">
                Every order arrives ready to gift—or to keep, just for you.
              </p>
            </div>
          </div>
        </div>

        {/* Editorial split section */}
        <div
          ref={imageSectionRef}
          className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 xl:gap-24 items-center py-8 sm:py-12"
        >
          {/* Image */}
          <div
            className={`relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden glossy-shadow-soft transition-all duration-700 ease-out ${
              isImageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Image
              src="/images/products/teardrop-pendant.jpg"
              alt="Teardrop pendant detail"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div
            ref={headerRef}
            className={`transition-all duration-700 ease-out ${
              isImageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '120ms' }}
          >
            <span
              className={`text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-primary mb-4 sm:mb-5 block ${
                headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'
              }`}
              style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}
            >
              Crafted for everyday wear. Built to last.
            </span>
            <h2
              className={`font-serif font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] text-foreground mb-5 sm:mb-7 text-balance ${
                headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'
              }`}
              style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}
            >
              Glow differently.<br />
              Jewellery that stays <span className="text-primary">glossy,</span> no matter what.
            </h2>
            <p
              className={`text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 sm:mb-12 max-w-md ${
                headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'
              }`}
              style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}
            >
              Anti-tarnish • Waterproof • Skin-friendly<br />
              Made to shine with you, every day.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group p-3 sm:p-5 glossy-transition hover:-translate-y-0.5 rounded-lg sm:rounded-xl bg-card border border-border/50"
                >
                  <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full mb-2 sm:mb-3 bg-secondary group-hover:bg-primary/15 glossy-transition">
                    <feature.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-sm sm:text-base md:text-lg text-foreground mb-0.5 sm:mb-1 leading-tight">{feature.title}</h3>
                  <p className="text-[10px] sm:text-xs tracking-wide text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
