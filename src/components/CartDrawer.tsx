import { useEffect } from "react";
import { findProduct, fmt, priceFor, weightLabel } from "../data/products";
import { FREE_SHIPPING_AT, SHIPPING_FEE, useStore } from "../lib/store";
import { ArrowRightIcon, BasketIcon, CheckIcon, CloseIcon, CupIcon, MinusIcon, PlusIcon, Steam, TrashIcon } from "./Icons";

interface Props {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartDrawer({ open, onClose, onCheckout }: Props) {
  const { lines, setQty, remove, subtotal, count } = useStore();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);
  const remaining = FREE_SHIPPING_AT - subtotal;
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE;

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <button
        aria-label="Close cart"
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-roast-950/80 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
        tabIndex={open ? 0 : -1}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-roast-600 bg-roast-900 shadow-2xl duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [transition-property:transform,visibility] ${
          open ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping bag"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-roast-700 px-6 py-5">
          <h2 className="flex items-center gap-3 font-display text-2xl font-semibold text-cream-100">
            <BasketIcon className="h-6 w-6 text-ember-400" />
            Your bag
            {count > 0 && (
              <span className="rounded-full bg-ember-500 px-2.5 py-0.5 text-xs font-bold text-roast-950">{count}</span>
            )}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 place-items-center rounded-full border border-roast-600 text-cream-300 transition-all hover:rotate-90 hover:border-ember-500 hover:text-ember-300"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="relative">
              <Steam className="absolute -top-8 left-1/2 h-8 w-16 -translate-x-1/2 text-ember-300/60" />
              <CupIcon className="h-16 w-16 text-roast-600" />
            </div>
            <h3 className="mt-8 font-display text-3xl font-semibold text-cream-100">Your bag is empty</h3>
            <p className="mt-3 text-sm leading-relaxed text-cream-400">
              The drum is hot and six coffees are waiting on the counter.
            </p>
            <a
              href="#counter"
              onClick={onClose}
              className="mt-8 rounded-full bg-ember-500 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-roast-950 transition-all hover:bg-ember-400 active:scale-95"
            >
              Browse the counter
            </a>
          </div>
        ) : (
          <>
            {/* lines */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <ul className="space-y-5">
                {lines.map((l) => {
                  const p = findProduct(l.productId);
                  const unit = priceFor(p, l.weight);
                  return (
                    <li key={l.key} className="flex gap-4 rounded-xl border border-roast-700 bg-roast-850 p-3.5">
                      <img src={p.image} alt={p.name} className="h-24 w-20 shrink-0 rounded-lg object-cover" />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-display text-lg font-semibold leading-tight text-cream-100">{p.name}</p>
                            <p className="mt-0.5 text-xs text-cream-500">
                              {weightLabel(l.weight)} · {fmt(unit)} each
                            </p>
                          </div>
                          <button
                            onClick={() => remove(l.key)}
                            aria-label={`Remove ${p.name}`}
                            className="text-cream-500 transition-colors hover:text-clay-400"
                          >
                            <TrashIcon className="h-4.5 w-4.5" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center rounded-full border border-roast-600">
                            <button
                              onClick={() => setQty(l.key, l.qty - 1)}
                              aria-label="Decrease quantity"
                              className="grid h-8 w-8 place-items-center text-cream-300 transition-colors hover:text-ember-300 active:scale-90"
                            >
                              <MinusIcon className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-7 text-center text-sm font-bold text-cream-100">{l.qty}</span>
                            <button
                              onClick={() => setQty(l.key, l.qty + 1)}
                              aria-label="Increase quantity"
                              className="grid h-8 w-8 place-items-center text-cream-300 transition-colors hover:text-ember-300 active:scale-90"
                            >
                              <PlusIcon className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="font-display text-lg font-semibold text-ember-300">{fmt(unit * l.qty)}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* footer */}
            <div className="border-t border-roast-700 px-6 py-5">
              <div className="mb-5">
                {remaining > 0 ? (
                  <p className="text-xs text-cream-400">
                    <span className="font-bold text-ember-300">{fmt(remaining)}</span> away from free shipping
                  </p>
                ) : (
                  <p className="flex items-center gap-2 text-xs font-semibold text-leaf-300">
                    <CheckIcon className="h-4 w-4" /> Free shipping unlocked
                  </p>
                )}
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-roast-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-ember-600 to-ember-300 transition-[width] duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-cream-300">
                  <span>Subtotal</span>
                  <span className="font-semibold text-cream-100">{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between text-cream-300">
                  <span>Shipping</span>
                  <span className="font-semibold text-cream-100">{shipping === 0 ? "Free" : fmt(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-roast-700 pt-2.5 font-display text-xl font-semibold text-cream-100">
                  <span>Total</span>
                  <span className="text-ember-300">{fmt(subtotal + shipping)}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="group mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-ember-500 py-4 text-sm font-bold uppercase tracking-[0.16em] text-roast-950 transition-all hover:bg-ember-400 hover:shadow-[0_14px_40px_-10px_rgba(209,138,58,0.6)] active:scale-[0.98]"
              >
                Checkout
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onClose}
                className="mt-3 w-full py-1 text-center text-xs text-cream-500 transition-colors hover:text-ember-300"
              >
                or keep browsing
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

