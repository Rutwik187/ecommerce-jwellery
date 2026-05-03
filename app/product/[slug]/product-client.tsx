"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Minus, Plus, ChevronDown, Gem, HeartHandshake, Award, Truck, Star, Check } from "lucide-react"
import { useCart } from "@/components/boty/cart-context"
import { urlFor } from "@/sanity/lib/image"

const benefits = [
  { icon: Gem, label: "925 Silver" },
  { icon: HeartHandshake, label: "Lifetime Care" },
  { icon: Award, label: "Hand-Finished" },
  { icon: Truck, label: "Free Shipping" }
]

type AccordionSection = "details" | "howToWear" | "materials" | "delivery"

export function ProductClient({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<AccordionSection | null>("details")
  const [isAdded, setIsAdded] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const { addItem, setIsOpen } = useCart()

  const toggleAccordion = (section: AccordionSection) => {
    setOpenAccordion(openAccordion === section ? null : section)
  }

  const allImages = [product.mainImage, ...(product.images || [])]
  const currentImage = allImages[activeImageIndex]
  const imageUrl = currentImage ? urlFor(currentImage).width(1200).url() : "/placeholder.svg"

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      description: product.tagline || product.description,
      price: product.price,
      image: imageUrl
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleBuyNow = () => {
    addItem({
      id: product._id,
      name: product.name,
      description: product.tagline || product.description,
      price: product.price,
      image: imageUrl
    })
    setIsOpen(true)
  }

  const accordionItems: { key: AccordionSection; title: string; content: string }[] = [
    { key: "details", title: "Details", content: product.details || "Hand-finished pieces designed to be treasured." },
    { key: "howToWear", title: "How to Wear", content: product.howToWear || "Perfect for layering or wearing solo." },
    { key: "materials", title: "Materials", content: product.materials || "925 Sterling Silver, ethically-sourced stones." },
    { key: "delivery", title: "Delivery & Care", content: "Free shipping pan India. Ships within 2-3 business days in a velvet jewelry box. 30-day returns and free re-sizing within the first 90 days." }
  ]

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground glossy-transition mb-6 sm:mb-8 md:mb-10"
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.5} />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 xl:gap-20">
          {/* Product Gallery */}
          <div className="lg:sticky lg:top-32 lg:self-start space-y-4">
            <div className="relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-card glossy-shadow-soft border border-border/40 group/gallery">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Image Controls */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.preventDefault(); prevImage(); }}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-card/60 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-card glossy-transition opacity-0 group-hover/gallery:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); nextImage(); }}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-card/60 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-card glossy-transition opacity-0 group-hover/gallery:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-24 sm:w-24 sm:h-30 rounded-lg overflow-hidden border-2 glossy-transition ${activeImageIndex === index ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                  >
                    <Image
                      src={urlFor(image).width(200).url()}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <span className="text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-primary mb-2 sm:mb-3 block">
                Glossy & Glow · The Collection
              </span>
              <h1 className="font-serif font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground mb-2 sm:mb-3 leading-[1.05]">
                {product.name}
              </h1>
              {product.tagline && (
                <p className="font-serif font-normal text-base sm:text-lg text-primary mb-4 sm:mb-5">
                  {product.tagline}
                </p>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-primary text-primary" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-[10px] sm:text-xs tracking-wide text-muted-foreground">128 reviews</span>
              </div>

              {product.description && (
                <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 sm:gap-3 mb-8 sm:mb-10">
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-base sm:text-lg text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6 sm:mb-8">
              <label className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-foreground mb-2 sm:mb-3 block">Quantity</label>
              <div className="inline-flex items-center gap-0.5 sm:gap-1 bg-card rounded-full p-0.5 sm:p-1 border border-border">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-secondary glossy-transition"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={1.5} />
                </button>
                <span className="w-8 sm:w-10 text-center text-xs sm:text-sm font-medium text-foreground">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-secondary glossy-transition"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Add to Cart Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-8 sm:mb-12">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 sm:px-9 py-3.5 sm:py-4 rounded-full text-[10px] sm:text-[11px] tracking-[0.2em] uppercase glossy-transition ${isAdded
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary text-primary-foreground hover:bg-foreground"
                  }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={1.5} />
                    Added
                  </>
                ) : (
                  "Add to Bag"
                )}
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-transparent border border-border text-foreground px-6 sm:px-9 py-3.5 sm:py-4 rounded-full text-[10px] sm:text-[11px] tracking-[0.2em] uppercase glossy-transition hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                Buy Now
              </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-12">
              {benefits.map((benefit) => (
                <div
                  key={benefit.label}
                  className="flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-5 rounded-lg sm:rounded-xl bg-card border border-border/40"
                >
                  <benefit.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" strokeWidth={1.25} />
                  <span className="text-[8px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.15em] uppercase text-muted-foreground text-center">{benefit.label}</span>
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div className="border-t border-border">
              {accordionItems.map((item) => (
                <div key={item.key} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.key)}
                    className="w-full flex items-center justify-between py-4 sm:py-5 text-left"
                  >
                    <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-foreground">{item.title}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground glossy-transition ${openAccordion === item.key ? "rotate-180" : ""
                        }`}
                      strokeWidth={1.5}
                    />
                  </button>
                  <div
                    className={`overflow-hidden glossy-transition ${openAccordion === item.key ? "max-h-96 pb-4 sm:pb-6" : "max-h-0"
                      }`}
                  >
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
