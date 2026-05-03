import { defineQuery } from 'next-sanity'

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }
`)

export const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    price,
    originalPrice,
    mainImage,
    badge,
    "category": categories[0]->slug.current
  }
`)

export const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "product" && references(*[_type == "category" && slug.current == $category]._id)] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    price,
    originalPrice,
    mainImage,
    badge,
    "category": categories[0]->slug.current
  }
`)

export const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    price,
    originalPrice,
    mainImage,
    images,
    badge,
    details,
    howToWear,
    materials,
    "categories": categories[]->{
      name,
      "slug": slug.current
    }
  }
`)
