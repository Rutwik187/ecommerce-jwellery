"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Plus, SlidersHorizontal, X } from "lucide-react"
import { useCart } from "@/components/boty/cart-context"
import { urlFor } from "@/sanity/lib/image"

export function ShopClient({ initialProducts, categories }: { initialProducts: any[], categories: any[] }) {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "all"
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [showFilters, setShowFilters] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredProducts = selectedCategory === "all"
    ? initialProducts
    : initialProducts.filter(p => p.category === selectedCategory)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    )

    if (gridRef.current) observer.observe(gridRef.current)

    return () => {
      if (gridRef.current) observer.unobserve(gridRef.current)
    }
  }, [])

  // Reset animation when category changes
  useEffect(() => {
    setIsVisible(false)
    const timer = setTimeout(() => setIsVisible(true), 60)
    return () => clearTimeout(timer)
  }, [selectedCategory])

  // Sync selected category with search params if it changes from outside (e.g. back button)
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || "all"
    if (categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [searchParams])

  const allCategories = [{ slug: "all", name: "All" }, ...categories]

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <span className="text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-primary mb-4 sm:mb-5 block">
            The Collection
          </span>
          <h1 className="font-serif font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-4 sm:mb-5 text-balance leading-[1]">
            Shop <span className="text-primary">all</span> jewelry
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed px-4">
            Sterling silver, hand-set stones, and pieces designed to be lived in.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-8 sm:mb-10 md:mb-12 pb-4 sm:pb-6 border-b border-border">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.2em] uppercase text-foreground"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.5} />
            Filter
          </button>

          {/* Desktop Categories */}
          <div className="hidden lg:flex items-center gap-1 flex-wrap">
            {allCategories.map((category) => (
              <button
                key={category.slug}
                type="button"
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 xl:px-5 py-2 rounded-full text-[10px] xl:text-[11px] tracking-[0.2em] uppercase glossy-transition ${
                  selectedCategory === category.slug
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-foreground/60 hover:text-foreground hover:bg-secondary"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <span className="text-[10px] sm:text-xs tracking-wide text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? "piece" : "pieces"}
          </span>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="lg:hidden fixed inset-0 z-50 bg-background">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="font-serif font-light text-2xl sm:text-3xl text-foreground tracking-tight">Filter</h2>
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="p-2 text-foreground/70 hover:text-foreground"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
              <div className="space-y-2">
                {allCategories.map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category.slug)
                      setShowFilters(false)
                    }}
                    className={`w-full px-5 sm:px-6 py-3.5 sm:py-4 rounded-full text-left text-xs sm:text-sm glossy-transition ${
                      selectedCategory === category.slug
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground border border-border"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5"
        >
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductCard({
  product,
  index,
  isVisible
}: {
  product: any
  index: number
  isVisible: boolean
}) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const { addItem } = useCart()

  const imageUrl = product.mainImage ? urlFor(product.mainImage).width(800).url() : "/placeholder.svg"

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`group transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="bg-secondary rounded-xl sm:rounded-2xl overflow-hidden glossy-shadow-soft glossy-transition group-hover:-translate-y-1 group-hover:shadow-[0_24px_48px_rgba(231,84,128,0.15)] border border-border/40">
        {/* Image */}
        <div className="relative aspect-[4/5] bg-muted overflow-hidden">
          {/* Skeleton */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-secondary via-card to-secondary animate-pulse transition-opacity duration-500 ${
              imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />

          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className={`object-cover glossy-transition group-hover:scale-[1.04] transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
            onLoad={() => setImageLoaded(true)}
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
          {/* Quick add */}
          <button
            type="button"
            className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 glossy-transition"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              addItem({
                id: product._id,
                name: product.name,
                description: product.tagline || product.description,
                price: product.price,
                image: imageUrl
              })
            }}
            aria-label="Add to cart"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Info */}
        <div className="p-3 sm:p-4 md:p-6">
          <h3 className="font-serif text-sm sm:text-base md:text-xl text-foreground mb-0.5 sm:mb-1 leading-tight truncate">{product.name}</h3>
          <p className="text-[9px] sm:text-xs tracking-wide text-muted-foreground mb-2 sm:mb-3 truncate">{product.tagline || product.description}</p>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm md:text-base font-medium text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="text-[9px] sm:text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
