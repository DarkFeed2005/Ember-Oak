import { useEffect, useState } from "react";
import { useStore } from "../lib/store";
import { BasketIcon, BeanIcon } from "./Icons";

export default function Header({ onCartOpen }: { onCartOpen: () => void }) {
  const { count } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-roast-950/92 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur-sm border-b border-roast-700/60"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 md:h-[76px] max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-ember-500/50 bg-roast-800 text-ember-400 transition-transform duration-500 group-hover:rotate-[25deg]">
            <BeanIcon className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-semibold tracking-wide text-cream-100">
            Ember <span className="text-ember-400">&amp;</span> Oak
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm tracking-wide text-cream-300 md:flex">
          <a href="#counter" className="transition-colors hover:text-ember-300">The Counter</a>
          <a href="#craft" className="transition-colors hover:text-ember-300">Our Craft</a>
          <a href="#visit" className="transition-colors hover:text-ember-300">Visit</a>
        </nav>

        <button
          onClick={onCartOpen}
          className="group relative flex items-center gap-2.5 rounded-full border border-roast-600 bg-roast-800 py-2 pl-4 pr-5 text-sm text-cream-100 transition-all hover:border-ember-500/70 hover:bg-roast-700 active:scale-95"
          aria-label="Open cart"
        >
          <BasketIcon className="h-5 w-5 text-ember-400 transition-transform duration-300 group-hover:-rotate-6" />
          <span className="hidden sm:inline">Bag</span>
          {count > 0 && (
            <span
              key={count}
              className="absolute -right-1.5 -top-1.5 grid h-6 min-w-6 animate-pop place-items-center rounded-full bg-ember-500 px-1.5 text-xs font-bold text-roast-950"
            >
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

