"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, Gem, HeartHandshake, Truck } from "lucide-react"

const badges = [
  {
    icon: Gem,
    title: "925 Sterling Silver",
    description: "Hypoallergenic & lasting"
  },
  {
    icon: Sparkles,
    title: "Hand-Finished",
    description: "Crafted by artisans"
  },
  {
    icon: HeartHandshake,
    title: "Lifetime Care",
    description: "Polishing & repairs"
  },
  {
    icon: Truck,
    title: "Free Pan India",
    description: "Shipped in a velvet box"
  }
]

export function TrustBadges() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={sectionRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl sm:rounded-2xl overflow-hidden border border-border"
        >
          {badges.map((badge, index) => (
            <div
              key={badge.title}
              className={`bg-card p-5 sm:p-7 md:p-8 lg:p-10 text-center glossy-transition ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary mb-3 sm:mb-4 md:mb-5 mx-auto">
                <badge.icon className="text-primary w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.25} />
              </div>
              <h3 className="font-serif text-sm sm:text-base md:text-lg lg:text-xl text-foreground mb-0.5 sm:mb-1 md:mb-1.5">{badge.title}</h3>
              <p className="text-[10px] sm:text-xs tracking-wide text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
