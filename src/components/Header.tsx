import { useEffect, useState } from "react";
import { useStore } from "../lib/store";
import { BasketIcon, BeanIcon, CloseIcon, MenuIcon } from "./Icons";

const NAV: { label: string; href: string }[] = [
  { label: "The Counter", href: "#counter" },
  { label: "Our Craft", href: "#craft" },
  { label: "Visit", href: "#visit" },
];

export default function Header({ onCartOpen }: { onCartOpen: () => void }) {
  const { count } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <div className="mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:px-6 md:h-[76px] lg:max-w-7xl lg:px-8">
        <a href="#top" className="group flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ember-500/50 bg-roast-800 text-ember-400 transition-transform duration-500 group-hover:rotate-[25deg]">
            <BeanIcon className="h-5 w-5" />
          </span>
          <span className="truncate font-display text-lg font-semibold tracking-wide text-cream-100">
            Ember <span className="text-ember-400">&amp;</span> Oak
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm tracking-wide text-cream-300 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="transition-colors hover:text-ember-300">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
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

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-roast-600 text-cream-300 transition-colors hover:border-ember-500/70 hover:text-ember-300 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="fixed inset-x-0 top-16 z-50 border-b border-roast-700 bg-roast-950/95 backdrop-blur-sm animate-rise md:hidden">
          <ul className="px-4 py-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm tracking-wide text-cream-300 transition-colors hover:bg-roast-800 hover:text-ember-300"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}