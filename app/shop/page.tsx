import { Suspense } from "react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { ShopClient } from "./shop-client"
import { sanityFetch } from "@/sanity/lib/live"
import { ALL_PRODUCTS_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries"

export default async function ShopPage() {
  const [productsResponse, categoriesResponse] = await Promise.all([
    sanityFetch({ query: ALL_PRODUCTS_QUERY }),
    sanityFetch({ query: CATEGORIES_QUERY })
  ])

  const products = productsResponse.data || []
  const categories = categoriesResponse.data || []

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
