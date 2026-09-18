// ShopDesign.tsx
// Purely presentational, reusable components. No data fetching, no
// business rules — everything here just renders props. Import the
// derived values (badge text/colors, formatted price, CTA label) from
// ShopLogic.ts rather than computing them inline in these components.

import { ButtonHTMLAttributes, ReactNode } from "react";
import { ProductCardProps } from "./ShopTypes";
import {
  formatPrice,
  getAvailabilityDisplay,
  getBadgeText,
} from "./ShopLogic";
import "./ShopDesign.css";

// ---------- Button ----------

type ShopButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
};

export function ShopButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ShopButtonProps) {
  return (
    <button
      className={`shop-btn shop-btn--${variant} shop-btn--${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// ---------- Navbar ----------

export interface ShopNavbarProps {
  logoText?: string;
  navLinks?: string[];
  cartCount?: number;
  onLogoClick?: () => void;
  onNavLinkClick?: (link: string) => void;
  onCartClick?: () => void;
  onLogInClick?: () => void;
  onSignUpClick?: () => void;
}

export function ShopNavbar({
  logoText = "moteah",
  navLinks = ["Kits", "Guide", "About"],
  cartCount = 0,
  onLogoClick,
  onNavLinkClick,
  onCartClick,
  onLogInClick,
  onSignUpClick,
}: ShopNavbarProps) {
  return (
    <header className="shop-navbar">
      <div className="shop-navbar__inner">
        <span
          className="shop-navbar__logo"
          onClick={onLogoClick}
          role={onLogoClick ? "button" : undefined}
        >
          {logoText}
        </span>

        <nav className="shop-navbar__links">
          {navLinks.map((link) => (
            <span key={link} onClick={() => onNavLinkClick?.(link)}>
              {link}
            </span>
          ))}
        </nav>

        <div className="shop-navbar__actions">
          <button
            type="button"
            className="shop-navbar__icon-btn"
            aria-label="Cart"
            onClick={onCartClick}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m-2.25 0h12l.75 10.5a1.5 1.5 0 01-1.5 1.5h-9a1.5 1.5 0 01-1.5-1.5L6 10.5z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="shop-navbar__badge">{cartCount}</span>
            )}
          </button>

          <ShopButton variant="secondary" size="md" onClick={onLogInClick}>
            Log In
          </ShopButton>
          <ShopButton variant="primary" size="md" onClick={onSignUpClick}>
            Sign Up
          </ShopButton>
        </div>
      </div>
    </header>
  );
}

// ---------- Media placeholder icon ----------

function MediaIcon({ type }: { type: "photo" | "video" | "none" }) {
  if (type === "video") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d0b8db" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5l4.72-2.72a.75.75 0 011.28.53v9.38a.75.75 0 01-1.28.53l-4.72-2.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d0b8db" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18a1.5 1.5 0 001.5-1.5V4.5A1.5 1.5 0 0021 3H3a1.5 1.5 0 00-1.5 1.5v15A1.5 1.5 0 003 21zm12.75-13.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
      />
    </svg>
  );
}

// ---------- Product detail (single-product page) ----------

export interface ShopProductDetailProps {
  product: import("./ShopTypes").Product;
  onBack?: () => void;
  onAction?: (product: import("./ShopTypes").Product) => void;
}

export function ShopProductDetail({
  product,
  onBack,
  onAction,
}: ShopProductDetailProps) {
  const display = getAvailabilityDisplay(product.availability);
  const isComingSoon = product.availability === "coming_soon";

  return (
    <div className="shop-detail">
      {onBack && (
        <button type="button" className="shop-detail__back" onClick={onBack}>
          ← Back to shop
        </button>
      )}

      <div className="shop-detail__grid">
        <div className="shop-detail__media">
          <span
            className="shop-badge"
            style={{ backgroundColor: display.badgeBg, color: display.badgeText }}
          >
            {getBadgeText(product)}
          </span>
          {/*
            Swap MediaIcon for a real <img> or <video> once product media
            is available, e.g.:
            <img src={product.mediaUrl} alt={product.name} style={{ objectFit: "contain" }} />
          */}
          <MediaIcon type={product.mediaType} />
        </div>

        <div className="shop-detail__body">
          <h1 className="shop-detail__name">{product.name}</h1>
          {product.shortDescription && (
            <p className="shop-detail__desc">{product.shortDescription}</p>
          )}

          {isComingSoon ? (
            <p className="shop-detail__price shop-detail__price--muted">
              {formatPrice(product.price)}
            </p>
          ) : (
            <p className="shop-detail__price">{formatPrice(product.price)}</p>
          )}

          <ShopButton
            variant={isComingSoon ? "secondary" : "primary"}
            size="lg"
            onClick={() => onAction?.(product)}
          >
            {display.ctaLabel}
          </ShopButton>
        </div>
      </div>
    </div>
  );
}

// ---------- Product card ----------

export function ShopProductCard({
  product,
  onSelect,
  size = "md",
}: ProductCardProps) {
  const display = getAvailabilityDisplay(product.availability);
  const isComingSoon = product.availability === "coming_soon";
  const isFeatured = product.availability === "in_stock";

  return (
    <button
      type="button"
      className={`shop-card shop-card--${size} ${
        isFeatured ? "shop-card--featured" : ""
      } ${isComingSoon ? "shop-card--coming-soon" : ""}`}
      onClick={() => onSelect?.(product)}
    >
      <div className="shop-card__media">
        <span
          className="shop-badge"
          style={{ backgroundColor: display.badgeBg, color: display.badgeText }}
        >
          {getBadgeText(product)}
        </span>
        {/*
          Swap MediaIcon for a real <img> or <video> once product media
          is available, e.g.:
          <img src={product.mediaUrl} alt={product.name} style={{ objectFit: "contain" }} />
        */}
        <MediaIcon type={product.mediaType} />
      </div>

      <div className="shop-card__body">
        <p className="shop-card__name">{product.name}</p>
        {product.shortDescription && (
          <p className="shop-card__desc">{product.shortDescription}</p>
        )}

        <div className="shop-card__footer">
          {isComingSoon ? (
            <span className="shop-card__price shop-card__price--muted">
              {formatPrice(product.price)}
            </span>
          ) : (
            <span className="shop-card__price">{formatPrice(product.price)}</span>
          )}

          <ShopButton
            variant={isComingSoon ? "secondary" : "primary"}
            size="md"
            className="shop-btn--md"
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(product);
            }}
          >
            {display.ctaLabel}
          </ShopButton>
        </div>
      </div>
    </button>
  );
}

// ---------- Coming soon bar (fixed footer carousel) ----------

export interface ShopComingSoonBarProps {
  products: import("./ShopTypes").Product[];
  onSelect?: (product: import("./ShopTypes").Product) => void;
}

export function ShopComingSoonBar({
  products,
  onSelect,
}: ShopComingSoonBarProps) {
  if (products.length === 0) return null;

  return (
    <div className="shop-comingsoon-bar">
      <span className="shop-comingsoon-bar__label">Coming soon</span>
      <div className="shop-comingsoon-bar__track">
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            className="shop-comingsoon-bar__item"
            onClick={() => onSelect?.(product)}
          >
            <MediaIcon type={product.mediaType} />
            <span className="shop-comingsoon-bar__item-name">
              {product.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
