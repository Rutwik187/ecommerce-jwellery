"use client"

import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useCart } from "./cart-context"

export function CartDrawer() {
  const { items, removeItem, updateQuantity, isOpen, setIsOpen, itemCount, subtotal } = useCart()

  const shipping = 0
  const total = subtotal + shipping

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
      <DrawerContent className="h-full w-full sm:max-w-[420px] bg-background">
        <DrawerHeader className="border-b border-border p-4 sm:p-6 py-4 sm:py-5">
          <DrawerTitle className="font-serif font-light text-2xl sm:text-3xl text-foreground tracking-tight">Your Bag</DrawerTitle>
          <DrawerDescription className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground">
            {itemCount} {itemCount === 1 ? 'piece' : 'pieces'}
          </DrawerDescription>
        </DrawerHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 sm:px-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary flex items-center justify-center mb-4 sm:mb-5">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-primary" strokeWidth={1.25} />
              </div>
              <p className="font-serif font-light text-xl sm:text-2xl text-foreground mb-2">Your bag is empty</p>
              <p className="text-xs sm:text-sm text-muted-foreground mb-5 sm:mb-6 leading-relaxed">
                Discover something beautiful to keep close.
              </p>
              <DrawerClose asChild>
                <button
                  type="button"
                  className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase bg-primary text-primary-foreground px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-foreground glossy-transition"
                >
                  Browse Collection
                </button>
              </DrawerClose>
            </div>
          ) : (
            <div className="space-y-5 sm:space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 sm:gap-4">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden bg-secondary">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base sm:text-lg text-foreground mb-0.5 leading-tight truncate">{item.name}</h3>
                    <p className="text-muted-foreground mb-2 sm:mb-3 text-[10px] sm:text-xs tracking-wide truncate">{item.description}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex items-center border border-border rounded-full bg-card">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 sm:p-2 hover:text-primary glossy-transition rounded-l-full"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" strokeWidth={1.5} />
                        </button>
                        <span className="px-2.5 sm:px-3 text-[10px] sm:text-xs font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 sm:p-2 hover:text-primary glossy-transition rounded-r-full"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" strokeWidth={1.5} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive glossy-transition"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-medium text-foreground text-sm sm:text-base">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <DrawerFooter className="border-t border-border p-4 sm:p-6 gap-3 sm:gap-4 bg-card/50">
            {/* Summary */}
            <div className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-foreground">{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-medium text-foreground pt-2.5 sm:pt-3 border-t border-border font-serif text-base sm:text-lg">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="w-full bg-primary text-primary-foreground py-3.5 sm:py-4 rounded-full text-[10px] sm:text-[11px] tracking-[0.2em] uppercase hover:bg-foreground glossy-transition text-center"
            >
              Checkout
            </Link>

            <DrawerClose asChild>
              <button
                type="button"
                className="w-full text-foreground/70 py-2 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase hover:text-foreground glossy-transition"
              >
                Continue Shopping
              </button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}
