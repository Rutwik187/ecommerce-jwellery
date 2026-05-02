"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus } from "lucide-react"
import { useCart } from "./cart-context"

type Category = "rings" | "pendants" | "waist-chains"

const products = [
  // Rings
  {
    id: "solitaire-ring",
    name: "Aurora Solitaire",
    description: "Sterling silver · pink crystal",
    price: 1299,
    originalPrice: null,
    image: "/images/products/solitaire-ring.jpg",
    badge: "Bestseller",
    category: "rings" as Category
  },
  {
    id: "stacking-rings",
    name: "Starlight Stack",
    description: "Set of three · silver & zirconia",
    price: 1899,
    originalPrice: null,
    image: "/images/products/stacking-rings.jpg",
    badge: "New",
    category: "rings" as Category
  },
  {
    id: "signet-ring",
    name: "Rose Signet",
    description: "Engraved sterling silver",
    price: 999,
    originalPrice: 1299,
    image: "/images/products/signet-ring.jpg",
    badge: "Limited",
    category: "rings" as Category
  },
  {
    id: "pearl-charm-ring",
    name: "Pearl Charm",
    description: "Freshwater pearl · silver",
    price: 799,
    originalPrice: null,
    image: "/images/products/charm-bracelet.jpg",
    badge: null,
    category: "rings" as Category
  },
  // Pendants
  {
    id: "heart-pendant",
    name: "Petit Heart",
    description: "Silver heart · pink stone",
    price: 999,
    originalPrice: null,
    image: "/images/products/heart-pendant.jpg",
    badge: "Bestseller",
    category: "pendants" as Category
  },
  {
    id: "teardrop-pendant",
    name: "Rose Drop",
    description: "Rose quartz teardrop",
    price: 1199,
    originalPrice: null,
    image: "/images/products/teardrop-pendant.jpg",
    badge: null,
    category: "pendants" as Category
  },
  {
    id: "butterfly-pendant",
    name: "Butterfly Dream",
    description: "Crystal butterfly · silver",
    price: 899,
    originalPrice: null,
    image: "/images/products/butterfly-pendant.jpg",
    badge: "New",
    category: "pendants" as Category
  },
  {
    id: "layered-necklace",
    name: "Glow Layer",
    description: "Triple chain set · silver",
    price: 1599,
    originalPrice: 1899,
    image: "/images/products/layered-necklace.jpg",
    badge: "Sale",
    category: "pendants" as Category
  },
  // Waist chains
  {
    id: "waist-chain",
    name: "Summer Chain",
    description: "Fine silver body chain",
    price: 1299,
    originalPrice: null,
    image: "/images/products/waist-chain.jpg",
    badge: "New",
    category: "waist-chains" as Category
  },
  {
    id: "crystal-waist-chain",
    name: "Crystal Delicate",
    description: "Quartz & pearl chain",
    price: 1499,
    originalPrice: null,
    image: "/images/products/crystal-waist-chain.jpg",
    badge: null,
    category: "waist-chains" as Category
  },
  {
    id: "pearl-choker",
    name: "Pearl Whisper",
    description: "Choker · single pearl",
    price: 799,
    originalPrice: null,
    image: "/images/products/pearl-choker.jpg",
    badge: "Bestseller",
    category: "waist-chains" as Category
  },
  {
    id: "star-anklet",
    name: "Star Anklet",
    description: "Star charm anklet",
    price: 649,
    originalPrice: 799,
    image: "/images/products/star-anklet.jpg",
    badge: "Sale",
    category: "waist-chains" as Category
  }
]

const categories = [
  { value: "rings" as Category, label: "Rings" },
  { value: "pendants" as Category, label: "Pendants" },
  { value: "waist-chains" as Category, label: "Waist Chains" }
]

export function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("rings")
  const [isVisible, setIsVisible] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()

  const filteredProducts = products.filter(product => product.category === selectedCategory)

  const handleCategoryChange = (category: Category) => {
    if (category !== selectedCategory) {
      setIsTransitioning(true)
      setTimeout(() => {
        setSelectedCategory(category)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 50)
      }, 300)
    }
  }

  // Preload all product images
  useEffect(() => {
    products.forEach((product) => {
      const img = new window.Image()
      img.src = product.image
    })
  }, [])

  useEffect(() => {
    const gridObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (gridRef.current) gridObserver.observe(gridRef.current)
    if (headerRef.current) headerObserver.observe(headerRef.current)

    return () => {
      if (gridRef.current) gridObserver.unobserve(gridRef.current)
      if (headerRef.current) headerObserver.unobserve(headerRef.current)
    }
  }, [])

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-14 md:mb-16">
          <span
            className={`text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-primary mb-4 sm:mb-5 block ${
              headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'
            }`}
            style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}
          >
            The Collection
          </span>
          <h2
            className={`font-serif font-light leading-[1] text-foreground mb-4 sm:mb-5 text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl ${
              headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'
            }`}
            style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}
          >
            <span className="text-primary">Pieces</span> made to be <span className="text-primary">treasured</span>
          </h2>
          <p
            className={`text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed px-4 ${
              headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'
            }`}
            style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}
          >
            Each design begins with a sketch and ends in your jewelry box. Quietly luminous, always.
          </p>
        </div>

        {/* Segmented Control */}
        <div className="flex justify-center mb-10 sm:mb-14">
          <div className="bg-secondary rounded-full p-1.5 relative border border-border flex gap-0 w-full max-w-sm md:max-w-md lg:max-w-lg">
            {/* Animated background slide */}
            <div
              className="absolute top-1.5 bottom-1.5 bg-primary rounded-full transition-all duration-500 ease-out"
              style={{
                left: selectedCategory === 'rings' ? '6px' : selectedCategory === 'pendants' ? 'calc(33.333% + 2px)' : 'calc(66.666%)',
                width: 'calc(33.333% - 6px)'
              }}
            />
            {categories.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => handleCategoryChange(category.value)}
                className={`relative z-10 flex-1 py-2.5 sm:py-3 rounded-full text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase font-semibold transition-colors duration-500 flex items-center justify-center ${
                  selectedCategory === category.value
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
        >
          {filteredProducts.map((product, index) => (
            <Link
              key={`${selectedCategory}-${product.id}`}
              href={`/product/${product.id}`}
              className={`group transition-all duration-700 ease-out ${
                isVisible && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: isTransitioning ? '0ms' : `${index * 80}ms` }}
            >
              <div className="bg-secondary rounded-xl sm:rounded-2xl overflow-hidden glossy-shadow-soft glossy-transition group-hover:-translate-y-1 group-hover:shadow-[0_24px_48px_rgba(231,84,128,0.15)] border border-border/40">
                {/* Image */}
                <div className="relative aspect-[4/5] bg-muted overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover glossy-transition group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Badge */}
                  {product.badge && (
                    <span
                      className={`absolute top-2 sm:top-4 left-2 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.15em] uppercase backdrop-blur-md ${
                        product.badge === "Sale"
                          ? "bg-destructive/90 text-destructive-foreground"
                          : product.badge === "New"
                          ? "bg-primary/90 text-primary-foreground"
                          : "bg-card/90 text-foreground border border-border/60"
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                  {/* Quick add button */}
                  <button
                    type="button"
                    className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 glossy-transition"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      addItem({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        image: product.image
                      })
                    }}
                    aria-label="Add to cart"
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Info */}
                <div className="p-3 sm:p-4 md:p-5">
                  <h3 className="font-serif text-sm sm:text-base md:text-lg text-foreground mb-0.5 sm:mb-1 leading-tight truncate">{product.name}</h3>
                  <p className="text-[10px] sm:text-xs tracking-wide text-muted-foreground mb-2 sm:mb-3 truncate">{product.description}</p>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-xs sm:text-sm font-medium text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                      <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 sm:mt-14">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-primary/30 text-foreground px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-[10px] sm:text-[11px] tracking-[0.2em] uppercase glossy-transition hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            View Full Collection
          </Link>
        </div>
      </div>
    </section>
  )
}
