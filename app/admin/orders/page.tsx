"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Package,
  CreditCard,
  X,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
} from "lucide-react"
import {
  orders as allOrders,
  formatDateTime,
  type Order,
  type OrderStatus,
} from "@/components/admin/mock-data"

const statusFilters: ("All" | OrderStatus)[] = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
]

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"All" | OrderStatus>("All")
  const [selected, setSelected] = useState<Order | null>(null)

  const filtered = useMemo(() => {
    return allOrders.filter((o) => {
      const matchSearch =
        !search ||
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.email.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === "All" || o.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [search, statusFilter])

  return (
    <div className="px-5 sm:px-8 lg:px-10 py-8 sm:py-10 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7 sm:mb-9">
        <div>
          <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-primary mb-2">
            Orders
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight">
            All Orders
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {filtered.length} of {allOrders.length} orders
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border bg-card text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-foreground hover:border-primary glossy-transition w-fit"
        >
          <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-5 mb-5 sm:mb-6">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              strokeWidth={1.5}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID, customer name, or email..."
              className="w-full bg-background border border-border rounded-full pl-11 pr-4 py-2.5 sm:py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary glossy-transition"
            />
          </div>

          {/* Status filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto -mx-1 px-1 pb-1 lg:pb-0">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
            {statusFilters.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-[11px] tracking-[0.15em] uppercase whitespace-nowrap glossy-transition ${
                  statusFilter === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-card border border-border rounded-2xl sm:rounded-3xl overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <Th>Order</Th>
                <Th>Customer</Th>
                <Th>Date</Th>
                <Th>Items</Th>
                <Th>Payment</Th>
                <Th>Status</Th>
                <Th align="right">Total</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => setSelected(order)}
                  className="border-b border-border last:border-0 hover:bg-secondary/30 cursor-pointer glossy-transition"
                >
                  <td className="px-5 py-4 text-sm font-medium text-foreground whitespace-nowrap">
                    {order.id}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-foreground">{order.customer.name}</p>
                    <p className="text-[11px] text-muted-foreground">{order.customer.email}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">
                    {formatDateTime(order.date)}
                  </td>
                  <td className="px-5 py-4 text-sm text-foreground">
                    {order.items.reduce((s, i) => s + i.quantity, 0)}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-foreground text-right whitespace-nowrap">
                    ₹{order.total.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-border">
          {filtered.map((order) => (
            <button
              key={order.id}
              type="button"
              onClick={() => setSelected(order)}
              className="w-full p-4 sm:p-5 text-left hover:bg-secondary/30 glossy-transition"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{order.id}</p>
                  <p className="text-xs text-muted-foreground truncate">{order.customer.name}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{formatDateTime(order.date)}</span>
                <span className="text-foreground font-medium">
                  ₹{order.total.toLocaleString("en-IN")}
                </span>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-sm text-muted-foreground">No orders match your filters.</p>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selected && <OrderDetail order={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function Th({ children, align }: { children: React.ReactNode; align?: "right" }) {
  return (
    <th
      className={`px-5 py-3 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  )
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const config: Record<OrderStatus, { className: string; Icon: typeof Clock }> = {
    Pending: { className: "bg-secondary text-foreground", Icon: Clock },
    Processing: { className: "bg-primary/15 text-primary", Icon: Clock },
    Shipped: { className: "bg-foreground/10 text-foreground", Icon: Truck },
    Delivered: { className: "bg-primary text-primary-foreground", Icon: CheckCircle2 },
    Cancelled: { className: "bg-destructive/10 text-destructive", Icon: AlertCircle },
  }
  const { className, Icon } = config[status]
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] tracking-[0.1em] uppercase font-medium whitespace-nowrap ${className}`}
    >
      <Icon className="w-2.5 h-2.5" strokeWidth={2} />
      {status}
    </span>
  )
}

function OrderDetail({ order, onClose }: { order: Order; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full sm:max-w-lg bg-background border-l border-border shadow-xl overflow-y-auto h-dvh">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-5 sm:px-7 py-5 flex items-center justify-between z-10">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-1">
              Order Detail
            </p>
            <h2 className="font-serif text-2xl text-foreground tracking-tight">{order.id}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 text-muted-foreground hover:text-foreground glossy-transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                Status
              </p>
              <StatusBadge status={order.status} />
            </div>
            <div className="text-right">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                Total
              </p>
              <p className="font-serif text-2xl text-foreground">
                ₹{order.total.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Customer */}
          <DetailSection title="Customer" icon={Mail}>
            <DetailRow icon={Mail} label="Email" value={order.customer.email} />
            <DetailRow icon={Phone} label="Phone" value={order.customer.phone} />
            <DetailRow icon={Calendar} label="Placed" value={formatDateTime(order.date)} />
          </DetailSection>

          {/* Shipping */}
          <DetailSection title="Shipping Address" icon={MapPin}>
            <p className="text-sm text-foreground leading-relaxed">
              <span className="block font-medium">{order.customer.name}</span>
              {order.shipping.address}
              <br />
              {order.shipping.city}, {order.shipping.state} {order.shipping.pincode}
            </p>
          </DetailSection>

          {/* Items */}
          <DetailSection title={`Items (${order.items.length})`} icon={Package}>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-base text-foreground leading-tight truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Qty {item.quantity} &times; ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <p className="text-sm text-foreground font-medium whitespace-nowrap">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          </DetailSection>

          {/* Payment */}
          <DetailSection title="Payment" icon={CreditCard}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Method</span>
              <span className="text-foreground">{order.payment}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">₹{order.total.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-primary">Free</span>
            </div>
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-border">
              <span className="font-serif text-base text-foreground">Total Paid</span>
              <span className="font-serif text-xl text-foreground">
                ₹{order.total.toLocaleString("en-IN")}
              </span>
            </div>
          </DetailSection>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              className="flex-1 bg-primary text-primary-foreground py-3 rounded-full text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-foreground glossy-transition"
            >
              Mark as Shipped
            </button>
            <button
              type="button"
              className="flex-1 border border-border text-foreground py-3 rounded-full text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium hover:border-primary glossy-transition"
            >
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailSection({
  title,
  icon: Icon,
  children,
}: {
  title: string
  icon: typeof Mail
  children: React.ReactNode
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Icon className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
        <h3 className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-foreground font-medium">
          {title}
        </h3>
      </div>
      <div className="space-y-2 sm:space-y-2.5">{children}</div>
    </div>
  )
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
        {label}
      </span>
      <span className="text-foreground text-right truncate ml-3">{value}</span>
    </div>
  )
}
