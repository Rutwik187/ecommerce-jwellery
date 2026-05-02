"use client"

import { useEffect, useRef, useState } from "react"

const testimonials = [
  {
    id: 1,
    name: "Priya S.",
    location: "Mumbai",
    text: "The Aurora Solitaire is the most delicate ring I've ever owned. I haven't taken it off since it arrived.",
    product: "Aurora Solitaire"
  },
  {
    id: 2,
    name: "Ananya K.",
    location: "Delhi",
    text: "Finally, jewelry that feels like mine. The waist chain is impossibly delicate—exactly what I wanted.",
    product: "Summer Chain"
  },
  {
    id: 3,
    name: "Meera R.",
    location: "Bangalore",
    text: "I've worn the Petit Heart every single day for six months. Still looks brand new.",
    product: "Petit Heart"
  },
  {
    id: 4,
    name: "Divya M.",
    location: "Chennai",
    text: "The Starlight Stack changed how I think about rings. They feel so personal—like a small signature.",
    product: "Starlight Stack"
  },
  {
    id: 5,
    name: "Sneha T.",
    location: "Pune",
    text: "The packaging alone is a love letter. Velvet box, handwritten note—everything was beautifully considered.",
    product: "Rose Drop"
  },
  {
    id: 6,
    name: "Ritu P.",
    location: "Kolkata",
    text: "Bought the Pearl Whisper as a gift to myself. Wore it to my sister's wedding and felt so myself.",
    product: "Pearl Whisper"
  },
  {
    id: 7,
    name: "Kavya B.",
    location: "Hyderabad",
    text: "The teardrop is honestly stunning in person. The rose quartz catches the light beautifully.",
    product: "Rose Drop"
  },
  {
    id: 8,
    name: "Nisha W.",
    location: "Jaipur",
    text: "Sterling silver at this price point feels almost too good. Quality is genuinely heirloom.",
    product: "Rose Signet"
  },
  {
    id: 9,
    name: "Anjali D.",
    location: "Ahmedabad",
    text: "I keep getting asked where it's from. Glossy & Glow is now my favourite quiet brand.",
    product: "Butterfly Dream"
  }
]

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="rounded-xl sm:rounded-2xl p-5 sm:p-7 bg-background mb-3 sm:mb-4 flex-shrink-0 border border-border/50">
    {/* Quote mark */}
    <span className="font-serif text-4xl sm:text-5xl text-primary/40 leading-none block mb-1 sm:mb-2">&ldquo;</span>

    {/* Quote */}
    <p className="text-foreground/85 leading-relaxed mb-4 sm:mb-6 text-pretty font-serif text-base sm:text-lg md:text-xl font-normal">
      {testimonial.text}
    </p>

    {/* Author */}
    <div className="flex items-start justify-between gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-border/50">
      <div>
        <p className="text-foreground text-xs sm:text-sm font-medium">{testimonial.name}</p>
        <p className="text-[10px] sm:text-[11px] tracking-wider text-muted-foreground mt-0.5">{testimonial.location}</p>
      </div>
      <span className="text-[8px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.15em] uppercase text-primary bg-secondary px-2 sm:px-3 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
        {testimonial.product}
      </span>
    </div>
  </div>
)

export function Testimonials() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  const column1 = [testimonials[0], testimonials[3], testimonials[6]]
  const column2 = [testimonials[1], testimonials[4], testimonials[7]]
  const column3 = [testimonials[2], testimonials[5], testimonials[8]]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setHeaderVisible(true),
      { threshold: 0.1 }
    )

    if (headerRef.current) observer.observe(headerRef.current)

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current)
    }
  }, [])

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-14 md:mb-16">
          <span
            className={`text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-primary mb-4 sm:mb-5 block ${
              headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'
            }`}
            style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}
          >
            Letters from Our Wearers
          </span>
          <h2
            className={`font-serif font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1] text-foreground text-balance ${
              headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'
            }`}
            style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}
          >
            Worn with <span className="text-primary">love</span>
          </h2>
        </div>

        {/* Scrolling Testimonials */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none" />

          {/* Mobile - Single Column */}
          <div className="md:hidden h-[500px] sm:h-[600px]">
            <div className="relative overflow-hidden h-full">
              <div className="animate-scroll-down hover:animate-scroll-down-slow">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <TestimonialCard key={`mobile-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop - Three Columns */}
          <div className="hidden md:grid md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 h-[600px] md:h-[640px]">
            <div className="relative overflow-hidden">
              <div className="animate-scroll-down hover:animate-scroll-down-slow">
                {[...column1, ...column1].map((testimonial, index) => (
                  <TestimonialCard key={`col1-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div className="animate-scroll-up hover:animate-scroll-up-slow">
                {[...column2, ...column2].map((testimonial, index) => (
                  <TestimonialCard key={`col2-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div className="animate-scroll-down hover:animate-scroll-down-slow">
                {[...column3, ...column3].map((testimonial, index) => (
                  <TestimonialCard key={`col3-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-down {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-up {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-scroll-down { animation: scroll-down 35s linear infinite; }
        .animate-scroll-up { animation: scroll-up 35s linear infinite; }
        .animate-scroll-down-slow { animation: scroll-down 70s linear infinite; }
        .animate-scroll-up-slow { animation: scroll-up 70s linear infinite; }
      `}</style>
    </section>
  )
}
