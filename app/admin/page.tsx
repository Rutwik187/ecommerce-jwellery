"use client"

import Link from "next/link"
import {
  ShoppingBag,
  MessageSquare,
  IndianRupee,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
} from "lucide-react"
import { orders, messages, relativeDay } from "@/components/admin/mock-data"
import type { OrderStatus } from "@/components/admin/mock-data"

export default function AdminDashboardPage() {
  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((s, o) => s + o.total, 0)
  const pendingOrders = orders.filter((o) => o.status === "Pending" || o.status === "Processing").length
  const unreadMessages = messages.filter((m) => !m.read).length

  const recentOrders = orders.slice(0, 5)
  const recentMessages = messages.slice(0, 4)

  const stats = [
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      change: "+12.5%",
      positive: true,
    },
    {
      label: "Total Orders",
      value: orders.length.toString(),
      icon: ShoppingBag,
      change: "+8 today",
      positive: true,
    },
    {
      label: "Pending",
      value: pendingOrders.toString(),
      icon: Clock,
      change: "Needs review",
      positive: false,
    },
    {
      label: "New Messages",
      value: unreadMessages.toString(),
      icon: MessageSquare,
      change: "Unread",
      positive: false,
    },
  ]

  return (
    <div className="px-5 sm:px-8 lg:px-10 py-8 sm:py-10 max-w-7xl">
      {/* Header */}
      <div className="mb-8 sm:mb-10">
        <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-primary mb-2">
          Dashboard
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight">
          Good morning, Sara.
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Here&apos;s what&apos;s happening at Glossy &amp; Glow today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
        {stats.map(({ label, value, icon: Icon, change, positive }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6"
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                {label}
              </span>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.5} />
              </div>
            </div>
            <p className="font-serif text-2xl sm:text-3xl text-foreground tracking-tight mb-1.5">
              {value}
            </p>
            <p
              className={`text-[10px] sm:text-[11px] tracking-wide flex items-center gap-1 ${
                positive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {positive && <TrendingUp className="w-3 h-3" strokeWidth={1.5} />}
              {change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5 sm:gap-6">
        {/* Recent Orders */}
        <section className="bg-card border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-foreground tracking-tight">
                Recent Orders
              </h2>
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                Latest activity
              </p>
            </div>
            <Link
              href="/admin/orders"
              className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-primary hover:text-foreground glossy-transition flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href="/admin/orders"
                className="flex items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl hover:bg-secondary/60 glossy-transition group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm text-foreground font-medium truncate">
                      {order.customer.name}
                    </p>
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="text-[11px] sm:text-xs text-muted-foreground truncate">
                    {order.id} &middot; {order.items.length} {order.items.length === 1 ? "item" : "items"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground whitespace-nowrap">
                    ₹{order.total.toLocaleString("en-IN")}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground whitespace-nowrap">
                    {relativeDay(order.date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Messages */}
        <section className="bg-card border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-foreground tracking-tight">
                Recent Messages
              </h2>
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                Customer inquiries
              </p>
            </div>
            <Link
              href="/admin/messages"
              className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-primary hover:text-foreground glossy-transition flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {recentMessages.map((msg) => (
              <Link
                key={msg.id}
                href="/admin/messages"
                className="flex items-start gap-3 p-3 sm:p-4 rounded-2xl hover:bg-secondary/60 glossy-transition"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-serif text-sm flex-shrink-0">
                  {msg.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p
                      className={`text-sm truncate ${
                        msg.read ? "text-foreground" : "text-foreground font-semibold"
                      }`}
                    >
                      {msg.name}
                    </p>
                    {!msg.read && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                  </div>
                  <p className="text-[11px] sm:text-xs text-foreground/80 truncate mb-0.5">
                    {msg.subject}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground">
                    {relativeDay(msg.date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const config: Record<OrderStatus, { label: string; className: string; icon: typeof Clock }> = {
    Pending: { label: "Pending", className: "bg-secondary text-foreground", icon: Clock },
    Processing: { label: "Processing", className: "bg-primary/15 text-primary", icon: Clock },
    Shipped: { label: "Shipped", className: "bg-foreground/10 text-foreground", icon: Truck },
    Delivered: { label: "Delivered", className: "bg-primary text-primary-foreground", icon: CheckCircle2 },
    Cancelled: { label: "Cancelled", className: "bg-destructive/10 text-destructive", icon: AlertCircle },
  }
  const { label, className } = config[status]
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] tracking-[0.1em] uppercase font-medium ${className}`}
    >
      {label}
    </span>
  )
}
