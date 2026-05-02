"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft, Minus, Plus, ChevronDown, Gem, HeartHandshake, Award, Truck, Star, Check } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { useCart } from "@/components/boty/cart-context"

const products: Record<string, {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  originalPrice: number | null
  image: string
  details: string
  howToWear: string
  materials: string
  delivery: string
}> = {
  "solitaire-ring": {
    id: "solitaire-ring",
    name: "Aurora Solitaire",
    tagline: "A first ring, worn always",
    description: "A whisper-thin band of solid 925 sterling silver, set with a single pink crystal chosen for its soft, dawn-coloured glow. Designed to live on your hand—through every chapter.",
    price: 1299,
    originalPrice: null,
    image: "/images/products/solitaire-ring.jpg",
    details: "Hand-set 4mm pink crystal (1.2mm prong setting) on a 1.5mm rounded band of 925 sterling silver. Polished to a mirror finish. Lifetime polishing included.",
    howToWear: "Wear it solo on the index finger, or stack with the Starlight rings for a layered look. Remove before swimming, sleeping, or applying lotions to preserve the stone's clarity.",
    materials: "925 Sterling Silver, ethically-sourced pink crystal. Nickel-free and hypoallergenic. Comes in our signature blush velvet ring box.",
    delivery: "Free shipping pan India. Ships within 2-3 business days in a velvet jewelry box. 30-day returns and free re-sizing within the first 90 days."
  },
  "heart-pendant": {
    id: "heart-pendant",
    name: "Petit Heart",
    tagline: "Carry the small things, close",
    description: "A delicate heart pendant in solid 925 sterling silver, centered with a single pink stone. Suspended on a fine cable chain that catches the light just so.",
    price: 999,
    originalPrice: null,
    image: "/images/products/heart-pendant.jpg",
    details: "8mm silver heart pendant with a 2mm pink quartz center. Adjustable fine cable chain in 925 sterling silver with spring-ring closure.",
    howToWear: "Layer with the Glow Layer set or wear alone for a clean, dainty silhouette. The chain length is adjustable—wear higher for a choker effect.",
    materials: "925 Sterling Silver, natural rose quartz. Nickel-free. Arrives in a blush velvet box.",
    delivery: "Free shipping pan India. Ships within 2-3 business days in a velvet jewelry box. 30-day returns and lifetime polishing included."
  },
  "waist-chain": {
    id: "waist-chain",
    name: "Summer Chain",
    tagline: "Made for the months you only wear sun",
    description: "A whisper-thin silver body chain to wear high or low on the waist. Adjustable, weightless, and designed to disappear against the skin until the light catches it.",
    price: 1299,
    originalPrice: null,
    image: "/images/products/waist-chain.jpg",
    details: "Fine 1mm cable chain in 925 sterling silver with adjustable extender. Lobster clasp closure. Total length is adjustable through 4 settings.",
    howToWear: "Wear over a slip dress, under linen, or against bare skin. The chain is fine enough to be worn daily and during summer months. Avoid prolonged contact with chlorinated water.",
    materials: "925 Sterling Silver. Nickel-free. Arrives in a soft pouch with a velvet jewelry box.",
    delivery: "Free shipping pan India. Ships within 2-3 business days. 30-day returns and lifetime adjustment."
  },
  "stacking-rings": {
    id: "stacking-rings",
    name: "Starlight Stack",
    tagline: "Three quiet stars, worn as one",
    description: "A trio of paper-thin silver rings—one with a single zirconia, one with a pink crystal, one a polished band. Wear them stacked, scattered across fingers, or apart.",
    price: 1899,
    originalPrice: null,
    image: "/images/products/stacking-rings.jpg",
    details: "Set of three 1mm bands in 925 sterling silver. Sized to be worn together comfortably. Includes a 1.8mm zirconia band, a 2mm pink crystal band, and a polished plain band.",
    howToWear: "Stack on a single finger or distribute across two adjacent fingers. The thin profile means they layer beautifully without pinching.",
    materials: "925 Sterling Silver, ethically-sourced zirconia and pink crystal. Hypoallergenic.",
    delivery: "Free shipping pan India. Ships in velvet box. 30-day returns and free re-sizing."
  }
}

const benefits = [
  { icon: Gem, label: "925 Silver" },
  { icon: HeartHandshake, label: "Lifetime Care" },
  { icon: Award, label: "Hand-Finished" },
  { icon: Truck, label: "Free Shipping" }
]

type AccordionSection = "details" | "howToWear" | "materials" | "delivery"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = products[productId] || products["solitaire-ring"]

  const [quantity, setQuantity] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<AccordionSection | null>("details")
  const [isAdded, setIsAdded] = useState(false)
  const { addItem, setIsOpen } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [productId])

  const toggleAccordion = (section: AccordionSection) => {
    setOpenAccordion(openAccordion === section ? null : section)
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      description: product.tagline,
      price: product.price,
      image: product.image
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      description: product.tagline,
      price: product.price,
      image: product.image
    })
    setIsOpen(true)
  }

  const accordionItems: { key: AccordionSection; title: string; content: string }[] = [
    { key: "details", title: "Details", content: product.details },
    { key: "howToWear", title: "How to Wear", content: product.howToWear },
    { key: "materials", title: "Materials", content: product.materials },
    { key: "delivery", title: "Delivery & Care", content: product.delivery }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

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
            {/* Product Image */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-card glossy-shadow-soft border border-border/40">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
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
                <p className="font-serif font-normal text-base sm:text-lg text-primary mb-4 sm:mb-5">
                  {product.tagline}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-primary text-primary" strokeWidth={0} />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-xs tracking-wide text-muted-foreground">128 reviews</span>
                </div>

                <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
                  {product.description}
                </p>
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
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-6 sm:px-9 py-3.5 sm:py-4 rounded-full text-[10px] sm:text-[11px] tracking-[0.2em] uppercase glossy-transition ${
                    isAdded
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
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground glossy-transition ${
                          openAccordion === item.key ? "rotate-180" : ""
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                    <div
                      className={`overflow-hidden glossy-transition ${
                        openAccordion === item.key ? "max-h-96 pb-4 sm:pb-6" : "max-h-0"
                      }`}
                    >
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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

      <Footer />
    </main>
  )
}
