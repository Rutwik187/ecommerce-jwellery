import { Header } from "@/components/boty/header"
import { Hero } from "@/components/boty/hero"
import { TrustBadges } from "@/components/boty/trust-badges"
import { FeatureSection } from "@/components/boty/feature-section"
import { ProductGrid } from "@/components/boty/product-grid"
import { Testimonials } from "@/components/boty/testimonials"
import { CTABanner } from "@/components/boty/cta-banner"
import { Newsletter } from "@/components/boty/newsletter"
import { Footer } from "@/components/boty/footer"
import { client } from "@/sanity/lib/client"
import { ALL_PRODUCTS_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries"

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    client.fetch(ALL_PRODUCTS_QUERY),
    client.fetch(CATEGORIES_QUERY)
  ])

  return (
    <main>
      <Header categories={categories} />
      <Hero />
      <TrustBadges />
      <ProductGrid initialProducts={products} categories={categories} />
      <FeatureSection />
      <Testimonials />
      <CTABanner />
      <Newsletter />
      <Footer categories={categories} />
    </main>
  )
}
