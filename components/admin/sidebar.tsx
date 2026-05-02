"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/")

  return (
    <>
      {/* Mobile bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="font-serif font-medium text-lg tracking-tight text-foreground">
          Glossy &amp; Glow
          <span className="ml-2 text-[10px] tracking-[0.2em] uppercase text-primary">Admin</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="p-2 -mr-2 text-foreground"
          aria-label="Toggle navigation"
        >
          {open ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/30 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky lg:top-0 left-0 top-0 z-50 h-dvh lg:h-screen w-72 bg-card border-r border-border flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="px-6 py-6 border-b border-border">
          <Link href="/admin" className="block group" onClick={() => setOpen(false)}>
            <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-1">Admin Console</p>
            <h2 className="font-serif font-medium text-2xl tracking-tight text-foreground group-hover:text-primary glossy-transition">
              Glossy &amp; Glow
            </h2>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm glossy-transition ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                <span className="font-medium tracking-wide">{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-border space-y-1">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-foreground/70 hover:bg-secondary hover:text-foreground glossy-transition"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            <span className="font-medium tracking-wide">Back to Store</span>
          </Link>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-foreground/70 hover:bg-secondary hover:text-foreground glossy-transition"
          >
            <LogOut className="w-4 h-4" strokeWidth={1.5} />
            <span className="font-medium tracking-wide">Sign Out</span>
          </Link>

          <div className="px-4 py-3 mt-2 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center font-serif text-sm">
              SR
            </div>
            <div className="min-w-0">
              <p className="text-sm text-foreground truncate">Sara Rao</p>
              <p className="text-[11px] text-muted-foreground truncate">admin@glossy.in</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
