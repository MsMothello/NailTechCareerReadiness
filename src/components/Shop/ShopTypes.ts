// ShopTypes.ts
// All shared types for the Shop module. Keep this file free of logic —
// it should only ever export types/interfaces so any file can import
// from it without pulling in unrelated code.

export type AvailabilityStatus = "in_stock" | "preorder" | "coming_soon";

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
}

export interface Product {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  price: number; // in cents (USD) — null/0 for products with no price yet
  availability: AvailabilityStatus;
  shortDescription?: string; // one-line teaser shown on product cards
  shipsBy?: string; // human-readable shipping window for pre-orders, e.g. "October"
  mediaType: "photo" | "video" | "none";
  mediaUrl?: string; // swap in a real photo/video URL when available
}

export interface AvailabilityDisplay {
  label: string;
  badgeBg: string;
  badgeText: string;
  ctaLabel: string;
}

export interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
  size?: "md" | "lg";
}

export interface ShopSectionProps {
  title: string;
  products: Product[];
  onSelectProduct?: (product: Product) => void;
}
