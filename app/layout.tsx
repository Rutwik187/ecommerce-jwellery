import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/components/boty/cart-context'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Glossy and Glow — Elegant Jewelry for Every Moment',
  description: 'Discover delicately crafted jewelry. Rings, pendants, waist chains and bracelets designed to make you shine.',
  generator: 'v0.app',
  keywords: ['jewelry', 'accessories', 'rings', 'pendants', 'waist chains', 'bracelets', 'earrings', 'feminine', 'sterling silver', 'pink'],
}

export const viewport: Viewport = {
  themeColor: '#FDF4F6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
