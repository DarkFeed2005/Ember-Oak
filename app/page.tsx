"use client";

import { useState } from "react";
import type { Category, Product } from "../src/data/products";
import { StoreProvider } from "../src/lib/store";
import Header from "../src/components/Header";
import Hero from "../src/components/Hero";
import Ticker from "../src/components/Ticker";
import Shop from "../src/components/Shop";
import Craft from "../src/components/Craft";
import Footer from "../src/components/Footer";
import ProductModal from "../src/components/ProductModal";
import CartDrawer from "../src/components/CartDrawer";
import Checkout from "../src/components/Checkout";
import Toasts from "../src/components/Toasts";
import Preloader from "../src/components/Preloader";

const GRAIN_BG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

function Shell() {
  const [category, setCategory] = useState<Category | "all">("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-roast-950 text-cream-100">
      <Preloader />
      <div className="grain" aria-hidden="true" style={{ backgroundImage: `url("${GRAIN_BG}")` }} />

      <Header onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero />
        <Ticker />
        <Shop category={category} onCategory={setCategory} onOpen={setSelected} />
        <Craft />
      </main>

      <Footer onCategory={setCategory} />

      {selected && (
        <ProductModal key={selected.id} product={selected} onClose={() => setSelected(null)} />
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {checkoutOpen && <Checkout onClose={() => setCheckoutOpen(false)} />}

      <Toasts />
    </div>
  );
}

export default function Page() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
