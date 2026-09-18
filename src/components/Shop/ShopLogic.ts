// ShopLogic.ts
// Pure functions and hooks — no JSX here. Anything that transforms data
// or derives a value from a Product/AvailabilityStatus belongs in this
// file so ShopDesign.tsx can stay purely presentational.

import { useMemo } from "react";
import { AvailabilityDisplay, AvailabilityStatus, Product } from "./ShopTypes";

// "Orchid" shade progression — in stock (lightest pink) to coming soon
// (deepest violet), with the pink-to-violet gradient reserved for CTAs.
const AVAILABILITY_DISPLAY: Record<AvailabilityStatus, AvailabilityDisplay> = {
  in_stock: {
    label: "In stock",
    badgeBg: "#F6D6EF",
    badgeText: "#8C2E70",
    ctaLabel: "View Kit",
  },
  preorder: {
    label: "Pre-order",
    badgeBg: "#E7DFF9",
    badgeText: "#4C3A96",
    ctaLabel: "Pre-order Now",
  },
  coming_soon: {
    label: "Coming soon",
    badgeBg: "#ECDCF2",
    badgeText: "#6A3D75",
    ctaLabel: "Notify Me",
  },
};

export function getAvailabilityDisplay(
  status: AvailabilityStatus
): AvailabilityDisplay {
  return AVAILABILITY_DISPLAY[status];
}

// Builds the full badge text, e.g. "Pre-order • Ships in October" or
// "In stock • Ships in 3–5 days".
export function getBadgeText(product: Product): string {
  const { label } = AVAILABILITY_DISPLAY[product.availability];
  if (product.availability === "preorder" && product.shipsBy) {
    return `${label} • Ships in ${product.shipsBy}`;
  }
  if (product.availability === "in_stock") {
    return `${label} • Ships in 3–5 days`;
  }
  return label;
}

export function formatPrice(cents: number): string {
  if (!cents) return "Price coming soon";
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  });
}

export function isPurchasable(product: Product): boolean {
  return product.availability !== "coming_soon";
}

// Splits a product list into the two groups the Shop section renders:
// anything purchasable now (in stock or pre-order) vs. coming soon.
export function useGroupedProducts(products: Product[]) {
  return useMemo(() => {
    const available = products.filter(isPurchasable);
    const comingSoon = products.filter((p) => !isPurchasable(p));
    return { available, comingSoon };
  }, [products]);
}
