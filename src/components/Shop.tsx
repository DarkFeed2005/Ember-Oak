import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, type Category, type Product } from "../data/products";
import Reveal from "./Reveal";
import ProductCard from "./ProductCard";
import { BeanIcon, CloseIcon, SearchIcon } from "./Icons";

type SortId = "featured" | "price-asc" | "price-desc" | "roast";

interface Props {
  category: Category | "all";
  onCategory: (c: Category | "all") => void;
  onOpen: (p: Product) => void;
}

const SORTS: { id: SortId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price · low to high" },
  { id: "price-desc", label: "Price · high to low" },
  { id: "roast", label: "Roast · light to dark" },
];

export default function Shop({ category, onCategory, onOpen }: Props) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("featured");

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    m.set("all", PRODUCTS.length);
    for (const p of PRODUCTS) m.set(p.category, (m.get(p.category) ?? 0) + 1);
    return m;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const inCat = category === "all" || p.category === category;
      if (!inCat) return false;
      if (!q) return true;
      const hay = [p.name, p.producer, p.region, p.country, p.process, p.varietal, ...p.notes]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price250 - b.price250);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price250 - a.price250);
    if (sort === "roast") list = [...list].sort((a, b) => a.roast - b.roast || a.price250 - b.price250);
    return list;
  }, [query, category, sort]);

  const clearAll = () => {
    setQuery("");
    onCategory("all");
  };

  return (
<section id="counter" className="relative scroll-mt-24 overflow-x-clip py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-ember-600/8 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ember-300">
              Shop · six coffees on the menu
            </p>
            <h2 className="mt-4 font-display text-5xl font-medium tracking-tight text-cream-100 md:text-6xl">
              The Counter<span className="text-ember-400">.</span>
            </h2>
          </Reveal>

          <Reveal delay={120} className="w-full lg:max-w-sm">
            <label className="group flex items-center gap-3 rounded-full border border-roast-600 bg-roast-850 px-5 py-3.5 transition-colors focus-within:border-ember-500 hover:border-roast-500">
              <SearchIcon className="h-5 w-5 shrink-0 text-cream-500 transition-colors group-focus-within:text-ember-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search origin, notes, process…"
                className="w-full bg-transparent text-sm text-cream-100 placeholder:text-cream-500 focus:outline-none"
                aria-label="Search coffees"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="text-cream-500 transition-colors hover:text-ember-400"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              )}
            </label>
          </Reveal>
        </div>

        {/* filters */}
        <Reveal delay={160}>
          <div className="mt-10 flex flex-col gap-4 border-y border-roast-700 py-5 md:flex-row md:items-center md:justify-between">
            <div className="no-scrollbar flex gap-2.5 overflow-x-auto">
              {CATEGORIES.map((c) => {
                const active = category === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => onCategory(c.id)}
                    className={`flex shrink-0 items-center gap-2 rounded-full px-4.5 py-2.5 text-sm font-semibold transition-all duration-300 active:scale-95 ${
                      active
                        ? "bg-ember-500 text-roast-950 shadow-[0_8px_24px_-8px_rgba(209,138,58,0.6)]"
                        : "border border-roast-600 text-cream-300 hover:border-ember-500/60 hover:text-ember-300"
                    }`}
                  >
                    {c.label}
                    <span className={`text-xs ${active ? "text-roast-950/70" : "text-cream-500"}`}>
                      {counts.get(c.id) ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.16em] text-cream-500">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortId)}
                className="cursor-pointer rounded-full border border-roast-600 bg-roast-850 px-4 py-2.5 text-sm text-cream-200 transition-colors hover:border-ember-500/60 focus:border-ember-500 focus:outline-none"
                aria-label="Sort coffees"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
        </Reveal>

        <p className="mt-6 text-sm text-cream-500">
          Showing <span className="font-semibold text-cream-200">{results.length}</span> of {PRODUCTS.length} coffees
          {query && (
            <>
              {" "}for “<span className="text-ember-300">{query}</span>”
            </>
          )}
        </p>

        {/* grid */}
        {results.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 90}>
                <ProductCard product={p} onOpen={onOpen} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center rounded-xl border border-dashed border-roast-600 bg-roast-900/60 px-6 py-20 text-center">
            <BeanIcon className="h-14 w-14 rotate-12 text-roast-600" />
            <h3 className="mt-6 font-display text-3xl font-semibold text-cream-100">Nothing in the hopper.</h3>
            <p className="mt-3 max-w-sm text-sm text-cream-400">
              No coffees match that grind. Try a different note — “peach”, “chocolate” — or clear your filters.
            </p>
            <button
              onClick={clearAll}
              className="mt-8 rounded-full border border-ember-500/60 px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-ember-300 transition-all hover:bg-ember-500 hover:text-roast-950 active:scale-95"
            >
              Clear search &amp; filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

