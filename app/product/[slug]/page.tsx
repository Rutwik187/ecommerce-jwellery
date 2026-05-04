import { notFound } from "next/navigation"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { ProductClient } from "./product-client"
import { sanityFetch } from "@/sanity/lib/client"
import { PRODUCT_BY_SLUG_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const [product, categories] = await Promise.all([
    sanityFetch({ query: PRODUCT_BY_SLUG_QUERY, params: { slug } }),
    sanityFetch({ query: CATEGORIES_QUERY })
  ])

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header categories={categories} />
      <ProductClient product={product} />
      <Footer categories={categories} />
    </main>
  )
}
