// ShopData.ts
// The data layer. Swap the arrays below for a real API/database call
// later without touching ShopLogic.ts or ShopDesign.tsx — every consumer
// goes through getCategories() / getProductsByCategory(), so the shape
// of these two functions is the only contract that matters.

import { Category, Product } from "./ShopTypes";

export const categories: Category[] = [
  {
    id: "cat-nail-kits",
    slug: "nail-kits",
    name: "Nail tech starter kits",
    description:
      "Every tool a beginner actually needs — nothing you'll never use.",
  },
];

export const products: Product[] = [
  {
    id: "prod-mini",
    slug: "mini-starter-kit",
    categoryId: "cat-nail-kits",
    name: "Mini starter kit",
    price: 3900,
    availability: "in_stock",
    shortDescription: "The essentials, in one compact kit.",
    mediaType: "photo",
  },
  {
    id: "prod-master",
    slug: "master-starter-kit",
    categoryId: "cat-nail-kits",
    name: "Master starter kit",
    price: 8900,
    availability: "preorder",
    shortDescription: "Everything you need to go pro from day one.",
    shipsBy: "October",
    mediaType: "video",
  },
  {
    id: "prod-tools",
    slug: "nail-tools-kit",
    categoryId: "cat-nail-kits",
    name: "Nail tools kit",
    price: 4900,
    availability: "preorder",
    shortDescription: "Pro-grade tools, no filler.",
    shipsBy: "October",
    mediaType: "photo",
  },
  {
    id: "prod-gelx",
    slug: "gel-x-starter-kit",
    categoryId: "cat-nail-kits",
    name: "Gel X starter kit",
    price: 0,
    availability: "coming_soon",
    shortDescription: "Everything for a flawless Gel X set.",
    mediaType: "photo",
  },
  {
    id: "prod-acrylic",
    slug: "acrylic-starter-kit",
    categoryId: "cat-nail-kits",
    name: "Acrylic starter kit",
    price: 0,
    availability: "coming_soon",
    shortDescription: "Classic acrylic application, beginner-friendly.",
    mediaType: "photo",
  },
  {
    id: "prod-nailart",
    slug: "nail-art-starter-kit",
    categoryId: "cat-nail-kits",
    name: "Nail art starter kit",
    price: 0,
    availability: "coming_soon",
    shortDescription: "Fine detail tools for standout designs.",
    mediaType: "photo",
  },
  {
    id: "prod-consumables",
    slug: "consumables-bundle",
    categoryId: "cat-nail-kits",
    name: "Consumables bundle",
    price: 0,
    availability: "coming_soon",
    shortDescription: "Restock the essentials you'll use most.",
    mediaType: "photo",
  },
  {
    id: "prod-content",
    slug: "content-creation-bundle",
    categoryId: "cat-nail-kits",
    name: "Content creation bundle",
    price: 0,
    availability: "coming_soon",
    shortDescription: "Everything to film and share your work.",
    mediaType: "photo",
  },
];

export function getCategories(): Category[] {
  return categories;
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return [];
  return products.filter((p) => p.categoryId === category.id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
