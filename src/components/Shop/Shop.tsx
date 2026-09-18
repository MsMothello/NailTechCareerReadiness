// Shop.tsx
// The composed, drop-in Shop section. This is the only file most pages
// need to import — it wires ShopData -> ShopLogic -> ShopDesign together.
//
// Layout: the "Available now" products render as two full-screen rows
// (each card fills the viewport width and height, like a landing
// slide) — the second row repeats the same products at a larger size,
// revealed as the visitor scrolls down. "Coming soon" products sit in
// a carousel bar fixed to the bottom of the screen, always visible.
//
// Navigation: clicking a product's CTA shows a single-product page.
// By default this is handled with internal state, so it works out of
// the box with no router installed. If your app uses React Router,
// Next's router, or similar, pass onSelectProduct to take over
// navigation yourself (e.g. navigate(`/shop/${product.slug}`)) —
// when you do, this component no longer manages the detail view itself.

import { useMemo, useState } from "react";
import { Product } from "./ShopTypes";
import { getProductsByCategory } from "./ShopData";
import { useGroupedProducts } from "./ShopLogic";
import {
  ShopComingSoonBar,
  ShopNavbar,
  ShopProductCard,
  ShopProductDetail,
} from "./ShopDesign";
import "./ShopDesign.css";

interface ShopProps {
  categorySlug?: string;
  onSelectProduct?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  showNavbar?: boolean;
  cartCount?: number;
  onCartClick?: () => void;
  onLogInClick?: () => void;
  onSignUpClick?: () => void;
}

// Height reserved at the bottom of the page so content never sits
// underneath the fixed coming-soon bar. Keep in sync with the bar's
// real rendered height if you change its padding in ShopDesign.css.
const COMING_SOON_BAR_HEIGHT = 64;

export default function Shop({
  categorySlug = "nail-kits",
  onSelectProduct,
  onAddToCart,
  showNavbar = true,
  cartCount = 0,
  onCartClick,
  onLogInClick,
  onSignUpClick,
}: ShopProps) {
  const products = useMemo(
    () => getProductsByCategory(categorySlug),
    [categorySlug]
  );
  const { available, comingSoon } = useGroupedProducts(products);

  // Internal fallback navigation — only used when the consumer hasn't
  // taken over routing via onSelectProduct.
  const [internalSelected, setInternalSelected] = useState<Product | null>(
    null
  );

  const handleSelect = (product: Product) => {
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      setInternalSelected(product);
    }
  };

  const navbar = showNavbar && (
    <ShopNavbar
      cartCount={cartCount}
      onCartClick={onCartClick}
      onLogInClick={onLogInClick}
      onSignUpClick={onSignUpClick}
    />
  );

  // Showing a single product (internal navigation mode only).
  if (!onSelectProduct && internalSelected) {
    return (
      <>
        {navbar}
        <ShopProductDetail
          product={internalSelected}
          onBack={() => setInternalSelected(null)}
          onAction={onAddToCart}
        />
      </>
    );
  }

  return (
    <>
      {navbar}

      <div style={{ paddingBottom: COMING_SOON_BAR_HEIGHT }}>
        {/* First full-screen row */}
        <div className="shop-grid--fullscreen">
          {available.map((product) => (
            <ShopProductCard
              key={product.id}
              product={product}
              size="md"
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Second full-screen row — same products, larger, revealed on scroll */}
        <div className="shop-grid--fullscreen">
          {available.map((product) => (
            <ShopProductCard
              key={`${product.id}-repeat`}
              product={product}
              size="lg"
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      <ShopComingSoonBar products={comingSoon} onSelect={handleSelect} />
    </>
  );
}
