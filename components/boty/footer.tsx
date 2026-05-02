"use client"

import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

const footerLinks = {
  shop: [
    { name: "All Jewelry", href: "/shop" },
    { name: "Rings", href: "/shop?category=rings" },
    { name: "Pendants", href: "/shop?category=pendants" },
    { name: "Waist Chains", href: "/shop?category=waist-chains" },
    { name: "Bracelets", href: "/shop?category=bracelets" },
    { name: "Earrings", href: "/shop?category=earrings" }
  ],
  about: [
    { name: "Our Story", href: "/" },
    { name: "Materials", href: "/" },
    { name: "Sustainability", href: "/" },
    { name: "Press", href: "/" }
  ],
  care: [
    { name: "Contact", href: "/" },
    { name: "Jewelry Care", href: "/" },
    { name: "Shipping", href: "/" },
    { name: "Returns & Repairs", href: "/" },
    { name: "Ring Sizing", href: "/" }
  ]
}

export function Footer() {
  return (
    <footer className="bg-card pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 relative overflow-hidden border-t border-border/60">
      {/* Giant Background Wordmark */}
      <div className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0">
        <span className="font-serif text-[100px] sm:text-[160px] md:text-[240px] lg:text-[320px] xl:text-[400px] font-light text-secondary whitespace-nowrap leading-none tracking-tight">
          Glossy
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-12 sm:mb-16 md:mb-20">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="font-serif font-medium text-2xl sm:text-3xl text-foreground mb-3 sm:mb-4 tracking-tight">Glossy & Glow</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-6 max-w-xs">
              Elegant jewelry, designed to make you shine. For every story you wear.
            </p>
            <div className="flex gap-2 sm:gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" }
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-primary-foreground glossy-transition"
                  aria-label={label}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-foreground mb-4 sm:mb-5">Shop</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-primary glossy-transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-foreground mb-4 sm:mb-5">About</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-primary glossy-transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Care Links */}
          <div>
            <h3 className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-foreground mb-4 sm:mb-5">Care</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.care.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-primary glossy-transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 md:pt-10 border-t border-border/60">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-[10px] sm:text-xs tracking-wide text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Glossy and Glow. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <Link href="/" className="text-[10px] sm:text-xs tracking-wide text-muted-foreground hover:text-foreground glossy-transition">
                Privacy
              </Link>
              <Link href="/" className="text-[10px] sm:text-xs tracking-wide text-muted-foreground hover:text-foreground glossy-transition">
                Terms
              </Link>
              <Link href="/login" className="text-[10px] sm:text-xs tracking-wide text-muted-foreground hover:text-foreground glossy-transition">
                Sign In
              </Link>
              <Link href="/admin" className="text-[10px] sm:text-xs tracking-wide text-muted-foreground hover:text-foreground glossy-transition">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
