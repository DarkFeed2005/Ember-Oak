import { useEffect, useState } from "react";
import { fmt, priceFor, ROAST_LABELS, weightLabel, type Product, type Weight } from "../data/products";
import { useStore } from "../lib/store";
import { BeanIcon, CheckIcon, CloseIcon, CupIcon, MinusIcon, PlusIcon, SparkIcon } from "./Icons";

interface Props {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
  const { add, toast } = useStore();
  const [weight, setWeight] = useState<Weight>(250);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const unit = priceFor(product, weight);
  const total = unit * qty;

  const handleAdd = () => {
    add(product.id, weight, qty);
    toast(`Added ${product.name} Â· ${weightLabel(weight)} Ã— ${qty} to your bag`);
    setAdded(true);
    window.setTimeout(onClose, 850);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-label={product.name}>
      <button
        aria-label="Close"
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-roast-950/85"
      />
      <div className="relative flex min-h-full items-center justify-center p-4 md:p-8">
        <div className="relative grid w-full max-w-4xl animate-rise overflow-hidden rounded-xl border border-roast-600 bg-roast-900 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)] md:grid-cols-[0.92fr_1.08fr]">
          <button
            onClick={onClose}
            aria-label="Close details"
            className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-roast-600 bg-roast-950/80 text-cream-300 transition-all hover:rotate-90 hover:border-ember-500 hover:text-ember-300"
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          {/* image */}
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[620px]">
            <img src={product.image} alt={`${product.name} coffee bag`} className="absolute inset-0 h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-roast-950/60 via-transparent to-transparent" />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full border border-ember-500/40 bg-roast-950/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ember-300">
                {product.badge}
              </span>
            )}
            <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-roast-950/85 px-3.5 py-1.5 text-xs font-semibold text-cream-200">
              <SparkIcon className="h-3.5 w-3.5 text-ember-400" />
              Cup score {product.score.toFixed(1)}
            </span>
          </div>

          {/* details */}
          <div className="p-6 md:max-h-[85vh] md:overflow-y-auto md:p-9">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ember-300">
              {product.category === "single-origin" ? "Single origin" : product.category === "blend" ? "Blend" : "Decaf"}
              {product.country !== "â€”" && <> Â· {product.country}</>}
            </p>
            <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-cream-100 md:text-4xl">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-cream-500">
              {product.producer}{product.region !== "â€”" && <> Â· {product.region}</>}
            </p>

            <p className="mt-5 text-[15px] leading-relaxed text-cream-300">{product.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {product.notes.map((n) => (
                <span key={n} className="rounded-full border border-ember-500/30 bg-roast-850 px-3.5 py-1.5 text-xs font-semibold text-ember-300">
                  {n}
                </span>
              ))}
            </div>

            {/* specs */}
            <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-roast-700 bg-roast-700">
              {[
                ["Process", product.process],
                ["Varietal", product.varietal],
                ["Altitude", product.altitude],
              ].map(([k, v]) => (
                <div key={k} className="bg-roast-900 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cream-500">{k}</p>
                  <p className="mt-1 text-sm font-medium text-cream-200">{v}</p>
                </div>
              ))}
              <div className="bg-roast-900 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cream-500">Roast</p>
                <p className="mt-1 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <BeanIcon key={i} className={`h-3.5 w-3.5 ${i <= product.roast ? "text-ember-400" : "text-roast-600"}`} />
                  ))}
                  <span className="ml-1.5 text-xs text-cream-400">{ROAST_LABELS[product.roast]}</span>
                </p>
              </div>
            </div>

            {/* recipe */}
            <div className="mt-5 rounded-lg border border-leaf-700/60 bg-leaf-700/10 p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-leaf-300">
                <CupIcon className="h-4 w-4" /> House recipe Â· {product.recipe.method}
              </p>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {([
                  ["Ratio", product.recipe.ratio],
                  ["Grind", product.recipe.grind],
                  ["Temp", product.recipe.temp],
                  ["Time", product.recipe.time],
                ] as const).map(([k, v]) => (
                  <div key={k}>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-cream-500">{k}</p>
                    <p className="mt-0.5 text-sm font-semibold text-cream-100">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* buy controls */}
            <div className="mt-7 flex items-center gap-3">
              <div className="flex rounded-full border border-roast-600 p-1">
                {([250, 1000] as Weight[]).map((w) => (
                  <button
                    key={w}
                    onClick={() => setWeight(w)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                      weight === w ? "bg-ember-500 text-roast-950" : "text-cream-300 hover:text-ember-300"
                    }`}
                  >
                    {weightLabel(w)}
                  </button>
                ))}
              </div>
              <div className="flex items-center rounded-full border border-roast-600">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="grid h-10 w-10 place-items-center text-cream-300 transition-colors hover:text-ember-300 active:scale-90"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-cream-100">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  aria-label="Increase quantity"
                  className="grid h-10 w-10 place-items-center text-cream-300 transition-colors hover:text-ember-300 active:scale-90"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={added}
              className={`mt-5 flex w-full items-center justify-center gap-3 rounded-full py-4 text-sm font-bold uppercase tracking-[0.16em] transition-all active:scale-[0.98] ${
                added
                  ? "bg-leaf-500 text-roast-950"
                  : "bg-ember-500 text-roast-950 hover:bg-ember-400 hover:shadow-[0_14px_40px_-10px_rgba(209,138,58,0.6)]"
              }`}
            >
              {added ? (
                <>
                  <CheckIcon className="h-5 w-5" /> Added to bag
                </>
              ) : (
                <>Add to bag Â· {fmt(total)}</>
              )}
            </button>
            <p className="mt-3 text-center text-xs text-cream-500">
              {fmt(unit)} per bag Â· roasted after you order Â· free shipping over $45
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

