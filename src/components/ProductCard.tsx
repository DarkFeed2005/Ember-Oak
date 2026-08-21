import { fmt, ROAST_LABELS, type Product } from "../data/products";
import { useStore } from "../lib/store";
import { BeanIcon, PlusIcon } from "./Icons";

interface Props {
  product: Product;
  onOpen: (p: Product) => void;
}

export default function ProductCard({ product, onOpen }: Props) {
  const { add, toast } = useStore();

  const quickAdd = () => {
    add(product.id, 250, 1);
    toast(`Added ${product.name} Â· 250 g to your bag`);
  };

  return (
    <article
      onClick={() => onOpen(product)}
      className="group cursor-pointer overflow-hidden rounded-xl border border-roast-700 bg-roast-850 transition-all duration-500 hover:-translate-y-1.5 hover:border-ember-500/50 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.85)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-roast-800">
        <img
          src={product.image}
          alt={`${product.name} coffee bag`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-roast-950/55 via-transparent to-transparent opacity-70" />
        {product.badge && (
          <span className="absolute left-3.5 top-3.5 rounded-full border border-ember-500/40 bg-roast-950/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ember-300">
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 text-roast-950">
          {[1, 2, 3, 4, 5].map((i) => (
            <BeanIcon
              key={i}
              className={`h-3.5 w-3.5 ${i <= product.roast ? "text-ember-400" : "text-cream-100/25"}`}
            />
          ))}
        </span>
      </div>

      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream-500">
          {product.country === "â€”" ? product.region : product.country} Â· {ROAST_LABELS[product.roast]}
        </p>
        <h3 className="mt-1.5 font-display text-2xl font-semibold leading-snug text-cream-100 transition-colors group-hover:text-ember-300">
          {product.name}
        </h3>
        <p className="mt-1.5 truncate text-sm text-cream-400">{product.notes.join(" Â· ")}</p>

        <div className="mt-4 flex items-end justify-between border-t border-roast-700 pt-4">
          <div>
            <p className="font-display text-xl font-semibold text-cream-100">{fmt(product.price250)}</p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-cream-500">per 250 g</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              quickAdd();
            }}
            aria-label={`Add ${product.name} to bag`}
            className="grid h-11 w-11 place-items-center rounded-full border border-roast-600 bg-roast-800 text-ember-400 transition-all duration-300 hover:rotate-90 hover:border-ember-500 hover:bg-ember-500 hover:text-roast-950 active:scale-90"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}

