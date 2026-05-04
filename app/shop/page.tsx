import { Suspense } from "react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { ShopClient } from "./shop-client"
import { sanityFetch } from "@/sanity/lib/client"
import { ALL_PRODUCTS_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries"

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    sanityFetch({ query: ALL_PRODUCTS_QUERY }),
    sanityFetch({ query: CATEGORIES_QUERY })
  ])

  return (
    <main className="min-h-screen bg-background">
      <Header categories={categories} />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <ShopClient initialProducts={products} categories={categories} />
      </Suspense>
      <Footer categories={categories} />
    </main>
  )
}
