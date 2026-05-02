"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Lock, CreditCard, Truck, Shield, CheckCircle2 } from "lucide-react"
import { useCart } from "@/components/boty/cart-context"

type PaymentMethod = "card" | "upi" | "cod"

export default function CheckoutPage() {
  const { items, subtotal } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const [placed, setPlaced] = useState(false)
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
    upiId: "",
    saveInfo: false,
  })

  const shipping = subtotal > 0 ? 0 : 0
  const tax = Math.round(subtotal * 0.03)
  const total = subtotal + shipping + tax

  const update = (field: keyof typeof form, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Checkout placed", { form, paymentMethod, items, total })
    setPlaced(true)
  }

  // Mock cart preview (so the page is meaningful even if cart is empty)
  const previewItems =
    items.length > 0
      ? items
      : [
          {
            id: "demo-1",
            name: "Aurora Solitaire",
            description: "925 Sterling Silver, pink crystal",
            price: 1299,
            quantity: 1,
            image: "/images/products/solitaire-ring.jpg",
          },
          {
            id: "demo-2",
            name: "Petit Heart",
            description: "Heart pendant, fine cable chain",
            price: 999,
            quantity: 1,
            image: "/images/products/heart-pendant.jpg",
          },
        ]

  const previewSubtotal = previewItems.reduce((s, i) => s + i.price * i.quantity, 0)
  const previewTotal = previewSubtotal + Math.round(previewSubtotal * 0.03)

  if (placed) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-5 py-16">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-primary" strokeWidth={1.5} />
          </div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-primary mb-3">Order Confirmed</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-foreground tracking-tight mb-4">
            Thank you, {form.firstName || "friend"}.
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            Your pieces are on their way. A confirmation has been sent to{" "}
            <span className="text-foreground">{form.email || "your inbox"}</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-[11px] tracking-[0.2em] uppercase hover:bg-foreground glossy-transition"
            >
              Continue Shopping
            </Link>
            <Link
              href="/admin/orders"
              className="border border-border text-foreground px-7 py-3.5 rounded-full text-[11px] tracking-[0.2em] uppercase hover:border-primary glossy-transition"
            >
              View Order
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-card/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground glossy-transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            Continue Shopping
          </Link>
          <Link href="/" className="font-serif font-medium text-xl sm:text-2xl tracking-tight text-foreground">
            Glossy &amp; Glow
          </Link>
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
            <Lock className="w-3.5 h-3.5" strokeWidth={1.5} />
            Secure Checkout
          </div>
          <div className="sm:hidden">
            <Lock className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8 sm:mb-10 max-w-2xl">
          <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-primary mb-3">Checkout</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-foreground tracking-tight">Almost yours.</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_440px] gap-8 lg:gap-12">
          {/* Form column */}
          <div className="space-y-8 sm:space-y-10 order-2 lg:order-1">
            {/* Contact */}
            <Section title="Contact" subtitle="01">
              <FieldGroup>
                <Field label="Email" required>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </Field>
                <Field label="Phone" required>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className={inputClass}
                  />
                </Field>
              </FieldGroup>
            </Section>

            {/* Shipping */}
            <Section title="Shipping Address" subtitle="02">
              <FieldGroup>
                <Field label="First Name" required>
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Last Name" required>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </FieldGroup>

              <Field label="Address" required>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="House no., Street"
                  className={inputClass}
                />
              </Field>

              <Field label="Apartment, suite (optional)">
                <input
                  type="text"
                  value={form.apartment}
                  onChange={(e) => update("apartment", e.target.value)}
                  className={inputClass}
                />
              </Field>

              <FieldGroup cols={3}>
                <Field label="City" required>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="State" required>
                  <input
                    type="text"
                    required
                    value={form.state}
                    onChange={(e) => update("state", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Pincode" required>
                  <input
                    type="text"
                    required
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={form.pincode}
                    onChange={(e) => update("pincode", e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </FieldGroup>

              <label className="flex items-center gap-2.5 cursor-pointer w-fit pt-1">
                <input
                  type="checkbox"
                  checked={form.saveInfo}
                  onChange={(e) => update("saveInfo", e.target.checked)}
                  className="w-4 h-4 rounded border-border accent-primary"
                />
                <span className="text-xs sm:text-sm text-muted-foreground">
                  Save this information for next time
                </span>
              </label>
            </Section>

            {/* Payment */}
            <Section title="Payment" subtitle="03">
              <div className="grid sm:grid-cols-3 gap-2.5 sm:gap-3 mb-5">
                {(
                  [
                    { value: "card", label: "Card", icon: CreditCard },
                    { value: "upi", label: "UPI", icon: Shield },
                    { value: "cod", label: "Cash on Delivery", icon: Truck },
                  ] as { value: PaymentMethod; label: string; icon: typeof CreditCard }[]
                ).map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPaymentMethod(value)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-full border text-xs sm:text-[13px] glossy-transition ${
                      paymentMethod === value
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    {label}
                  </button>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 sm:space-y-5">
                  <Field label="Card Number" required>
                    <input
                      type="text"
                      required
                      inputMode="numeric"
                      value={form.cardNumber}
                      onChange={(e) => update("cardNumber", e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Name on Card" required>
                    <input
                      type="text"
                      required
                      value={form.cardName}
                      onChange={(e) => update("cardName", e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                  <FieldGroup>
                    <Field label="Expiry (MM/YY)" required>
                      <input
                        type="text"
                        required
                        value={form.expiry}
                        onChange={(e) => update("expiry", e.target.value)}
                        placeholder="08/27"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="CVC" required>
                      <input
                        type="text"
                        required
                        inputMode="numeric"
                        value={form.cvc}
                        onChange={(e) => update("cvc", e.target.value)}
                        placeholder="123"
                        className={inputClass}
                      />
                    </Field>
                  </FieldGroup>
                </div>
              )}

              {paymentMethod === "upi" && (
                <Field label="UPI ID" required>
                  <input
                    type="text"
                    required
                    value={form.upiId}
                    onChange={(e) => update("upiId", e.target.value)}
                    placeholder="name@bank"
                    className={inputClass}
                  />
                </Field>
              )}

              {paymentMethod === "cod" && (
                <p className="text-xs sm:text-sm text-muted-foreground bg-secondary/60 rounded-2xl px-4 py-3 leading-relaxed">
                  Pay in cash when your order arrives. A small handling fee may apply.
                </p>
              )}
            </Section>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 rounded-full text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-foreground glossy-transition"
            >
              Place Order &mdash; ₹{(items.length > 0 ? total : previewTotal).toLocaleString("en-IN")}
            </button>

            <p className="text-[10px] sm:text-[11px] text-muted-foreground text-center leading-relaxed">
              By placing your order, you agree to our Terms and Privacy Policy.
            </p>
          </div>

          {/* Summary column */}
          <aside className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-6 bg-card border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-6">
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <h2 className="font-serif text-xl sm:text-2xl text-foreground tracking-tight">
                  Order Summary
                </h2>
                <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                  {previewItems.length} {previewItems.length === 1 ? "Item" : "Items"}
                </span>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6 max-h-[280px] overflow-y-auto pr-1">
                {previewItems.map((item) => (
                  <div key={item.id} className="flex gap-3 sm:gap-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden bg-secondary">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-foreground text-background text-[10px] font-medium flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm sm:text-base text-foreground leading-tight truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] sm:text-xs text-muted-foreground truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    <p className="text-sm sm:text-[15px] text-foreground font-medium whitespace-nowrap">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Promo */}
              <div className="flex gap-2 mb-5 sm:mb-6">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 bg-background border border-border rounded-full px-4 py-2.5 text-xs sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary glossy-transition"
                />
                <button
                  type="button"
                  className="px-4 sm:px-5 py-2.5 rounded-full text-[10px] sm:text-[11px] tracking-[0.2em] uppercase border border-border text-foreground hover:border-primary glossy-transition"
                >
                  Apply
                </button>
              </div>

              {/* Totals */}
              <div className="space-y-2 sm:space-y-2.5 text-sm border-t border-border pt-4 sm:pt-5">
                <Row label="Subtotal" value={`₹${previewSubtotal.toLocaleString("en-IN")}`} />
                <Row label="Shipping" value="Free" accent />
                <Row label="Tax (3%)" value={`₹${Math.round(previewSubtotal * 0.03).toLocaleString("en-IN")}`} />
                <div className="flex items-baseline justify-between pt-3 sm:pt-4 border-t border-border">
                  <span className="font-serif text-base sm:text-lg text-foreground">Total</span>
                  <span className="font-serif text-xl sm:text-2xl text-foreground">
                    ₹{previewTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-border">
                {[
                  { Icon: Truck, label: "Free shipping" },
                  { Icon: Shield, label: "30-day returns" },
                  { Icon: Lock, label: "Secure checkout" },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex flex-col items-center text-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    <span className="text-[9px] sm:text-[10px] tracking-wide text-muted-foreground leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  )
}

const inputClass =
  "w-full bg-background border border-border rounded-full px-4 sm:px-5 py-3 sm:py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 glossy-transition"

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="bg-card border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-7">
      <div className="flex items-center gap-3 mb-5 sm:mb-6">
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary">{subtitle}</span>
        <span className="h-px flex-1 bg-border" />
        <h2 className="font-serif text-xl sm:text-2xl text-foreground tracking-tight">{title}</h2>
      </div>
      <div className="space-y-4 sm:space-y-5">{children}</div>
    </section>
  )
}

function FieldGroup({ children, cols = 2 }: { children: React.ReactNode; cols?: 2 | 3 }) {
  const colClass = cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
  return <div className={`grid ${colClass} gap-4 sm:gap-5`}>{children}</div>
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="block text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-foreground mb-2">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </span>
      {children}
    </label>
  )
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? "text-primary" : "text-foreground"}>{value}</span>
    </div>
  )
}
