"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, Search, User } from "lucide-react"
import { CartDrawer } from "./cart-drawer"
import { useCart } from "./cart-context"

export function Header({ categories = [] }: { categories?: any[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { setIsOpen, itemCount } = useCart()

  const navCategories = categories.length > 0
    ? categories.slice(0, 4)
    : [
      { name: 'Rings', slug: 'rings' },
      { name: 'Pendants', slug: 'pendants' },
      { name: 'Chains', slug: 'waist-chains' }
    ]

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-5">
      <nav
        className={`max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 rounded-2xl sm:rounded-full glossy-transition animate-scale-fade-in ${isScrolled
            ? "bg-card/90 backdrop-blur-xl border border-border shadow-[0_8px_32px_rgba(231,84,128,0.08)]"
            : "bg-card/60 backdrop-blur-md border border-border/50"
          }`}
      >
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 -ml-2 text-foreground/70 hover:text-foreground glossy-transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
          </button>

          {/* Desktop Navigation - Left */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            <Link href="/shop" className="text-[10px] xl:text-[11px] tracking-[0.2em] uppercase text-foreground/70 hover:text-primary glossy-transition">
              Shop
            </Link>
            {navCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="text-[10px] xl:text-[11px] tracking-[0.2em] uppercase text-foreground/70 hover:text-primary glossy-transition"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 group">
            <h1 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl tracking-tight text-foreground group-hover:text-primary glossy-transition whitespace-nowrap">
              Glossy & Glow
            </h1>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
            <button
              type="button"
              className="p-2 text-foreground/70 hover:text-primary glossy-transition"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
            </button>
            <Link
              href="/login"
              className="hidden sm:block p-2 text-foreground/70 hover:text-primary glossy-transition"
              aria-label="Account"
            >
              <User className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-foreground/70 hover:text-primary glossy-transition"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-medium flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <CartDrawer />

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden glossy-transition ${isMenuOpen ? "max-h-80 pb-6" : "max-h-0"
            }`}
        >
          <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
            <Link
              href="/shop"
              className="text-sm tracking-wide text-foreground/70 hover:text-primary glossy-transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="text-sm tracking-wide text-foreground/70 hover:text-primary glossy-transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
