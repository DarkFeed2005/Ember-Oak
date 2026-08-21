import { useEffect, useMemo, useState } from "react";
import { findProduct, fmt, priceFor, weightLabel } from "../data/products";
import type { CartLine as Line } from "../lib/store";
import { FREE_SHIPPING_AT, SHIPPING_FEE, useStore } from "../lib/store";
import { BeanIcon, CardIcon, CheckIcon, CloseIcon } from "./Icons";

type Step = "details" | "processing" | "done";

interface Props {
  onClose: () => void;
}

interface FormState {
  email: string;
  name: string;
  address: string;
  city: string;
  zip: string;
  card: string;
  exp: string;
  cvc: string;
}

const EMPTY: FormState = { email: "", name: "", address: "", city: "", zip: "", card: "", exp: "", cvc: "" };

function Field({
  label, value, onChange, placeholder, error, inputMode, className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
  inputMode?: "email" | "numeric" | "text";
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-cream-500">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className={`mt-1.5 w-full rounded-lg border bg-roast-850 px-4 py-3 text-sm text-cream-100 placeholder:text-cream-600 transition-colors focus:outline-none ${
          error ? "border-clay-400" : "border-roast-600 focus:border-ember-500"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-clay-400">{error}</span>}
    </label>
  );
}

export default function Checkout({ onClose }: Props) {
  const { lines, subtotal, clear } = useStore();
  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [orderId, setOrderId] = useState("");
  const [snapshot, setSnapshot] = useState<{ lines: Line[]; total: number }>({ lines: [], total: 0 });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && step !== "processing" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, step]);

  const shipping = subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const set = (k: keyof FormState) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (form.name.trim().length < 2) e.name = "Required";
    if (form.address.trim().length < 4) e.address = "Enter a street address";
    if (!form.city.trim()) e.city = "Required";
    if (form.zip.trim().length < 3) e.zip = "Invalid";
    if (form.card.replace(/\s/g, "").length !== 16) e.card = "16 digits required";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.exp)) e.exp = "MM/YY";
    if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = "3–4 digits";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = () => {
    if (!validate()) return;
    setSnapshot({ lines, total });
    setStep("processing");
    window.setTimeout(() => {
      setOrderId(`EO-${Math.random().toString(36).slice(2, 6).toUpperCase()}`);
      setStep("done");
      clear();
    }, 1700);
  };

  const summaryLines = useMemo(() => step === "done" ? snapshot.lines : lines, [step, snapshot, lines]);
  const summaryTotal = step === "done" ? snapshot.total : total;

  const stepIndex = step === "details" ? 1 : step === "processing" ? 2 : 3;

  return (
    <div className="fixed inset-0 z-[55] overflow-y-auto" role="dialog" aria-modal="true" aria-label="Checkout">
      <button
        aria-label="Close checkout"
        onClick={() => step !== "processing" && onClose()}
        className="fixed inset-0 cursor-default bg-roast-950/90"
      />
      <div className="relative flex min-h-full items-center justify-center p-4 md:p-8">
        <div className="relative w-full max-w-3xl animate-rise overflow-hidden rounded-xl border border-roast-600 bg-roast-900 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)]">
          {/* header + steps */}
          <div className="flex items-center justify-between border-b border-roast-700 px-6 py-5 md:px-8">
            <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
              {["Bag", "Details", "Done"].map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full text-[11px] ${
                      i + 1 < stepIndex || step === "done"
                        ? "bg-leaf-500 text-roast-950"
                        : i + 1 === stepIndex
                          ? "bg-ember-500 text-roast-950"
                          : "border border-roast-600 text-cream-500"
                    }`}
                  >
                    {i + 1 < stepIndex || step === "done" ? <CheckIcon className="h-3.5 w-3.5" /> : i + 1}
                  </span>
                  <span className={i + 1 === stepIndex ? "text-cream-100" : "text-cream-500"}>{s}</span>
                  {i < 2 && <span className="mx-1 hidden h-px w-5 bg-roast-600 sm:block md:w-8" />}
                </li>
              ))}
            </ol>
            {step !== "processing" && (
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid h-10 w-10 place-items-center rounded-full border border-roast-600 text-cream-300 transition-all hover:rotate-90 hover:border-ember-500 hover:text-ember-300"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          {step === "processing" ? (
            <div className="flex flex-col items-center px-8 py-24 text-center">
              <BeanIcon className="h-12 w-12 animate-spin text-ember-400" />
              <h3 className="mt-8 font-display text-3xl font-semibold text-cream-100">Talking to the roastery…</h3>
              <p className="mt-3 text-sm text-cream-400">Reserving your beans and confirming the roast slot.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-[1.15fr_0.85fr]">
              {/* left: form / confirmation */}
              <div className="p-6 md:p-8">
                {step === "details" ? (
                  <>
                    <h3 className="font-display text-3xl font-semibold text-cream-100">Where should it land?</h3>
                    <p className="mt-2 text-sm text-cream-400">
                      This is a simulated checkout — no real payment is taken.
                    </p>
                    <div className="mt-6 space-y-4">
                      <Field label="Email" value={form.email} onChange={set("email")} placeholder="you@somewhere.com" inputMode="email" error={errors.email} />
                      <Field label="Full name" value={form.name} onChange={set("name")} placeholder="Jo March" error={errors.name} />
                      <Field label="Street address" value={form.address} onChange={set("address")} placeholder="410 Roastery Lane" error={errors.address} />
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="City" value={form.city} onChange={set("city")} placeholder="Portland" error={errors.city} />
                        <Field label="ZIP" value={form.zip} onChange={set("zip")} placeholder="97209" inputMode="numeric" error={errors.zip} />
                      </div>

                      <div className="rounded-lg border border-roast-700 bg-roast-850/60 p-4">
                        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-ember-300">
                          <CardIcon className="h-4 w-4" /> Payment · simulated
                        </p>
                        <div className="mt-4 space-y-4">
                          <Field label="Card number" value={form.card} onChange={(v) => set("card")(formatCard(v))} placeholder="4242 4242 4242 4242" inputMode="numeric" error={errors.card} />
                          <div className="grid grid-cols-2 gap-4">
                            <Field label="Expiry" value={form.exp} onChange={(v) => set("exp")(formatExp(v))} placeholder="08/27" inputMode="numeric" error={errors.exp} />
                            <Field label="CVC" value={form.cvc} onChange={(v) => set("cvc")(v.replace(/\D/g, "").slice(0, 4))} placeholder="123" inputMode="numeric" error={errors.cvc} />
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={placeOrder}
                        className="w-full rounded-full bg-ember-500 py-4 text-sm font-bold uppercase tracking-[0.16em] text-roast-950 transition-all hover:bg-ember-400 hover:shadow-[0_14px_40px_-10px_rgba(209,138,58,0.6)] active:scale-[0.98]"
                      >
                        Pay {fmt(total)}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                    <span className="grid h-20 w-20 animate-pop place-items-center rounded-full bg-leaf-500 text-roast-950">
                      <CheckIcon className="h-10 w-10" strokeWidth={2.2} />
                    </span>
                    <h3 className="mt-7 font-display text-4xl font-semibold text-cream-100">Order confirmed</h3>
                    <p className="mt-3 text-sm text-cream-400">
                      Order <span className="font-bold text-ember-300">{orderId}</span> · confirmation sent to{" "}
                      <span className="text-cream-200">{form.email || "your inbox"}</span>
                    </p>
                    <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-400">
                      Your beans join the next roast on the drum, rest 24 hours, and ship within 48.
                      Keep an eye on your inbox for the roast log.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-9 rounded-full bg-ember-500 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-roast-950 transition-all hover:bg-ember-400 active:scale-95"
                    >
                      Back to the counter
                    </button>
                  </div>
                )}
              </div>

              {/* right: summary */}
              <div className="border-t border-roast-700 bg-roast-850/70 p-6 md:border-l md:border-t-0 md:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cream-500">Order summary</p>
                <ul className="mt-4 space-y-3">
                  {summaryLines.map((l) => {
                    const p = findProduct(l.productId);
                    return (
                      <li key={l.key} className="flex items-center gap-3">
                        <img src={p.image} alt="" className="h-12 w-10 rounded-md object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-cream-100">{p.name}</p>
                          <p className="text-xs text-cream-500">{weightLabel(l.weight)} × {l.qty}</p>
                        </div>
                        <span className="text-sm font-semibold text-cream-200">
                          {fmt(priceFor(p, l.weight) * l.qty)}
                        </span>
                      </li>
                    );
                  })}
                  {summaryLines.length === 0 && (
                    <li className="text-sm text-cream-500">No items — the hopper is empty.</li>
                  )}
                </ul>
                <div className="mt-6 space-y-1.5 border-t border-roast-700 pt-4 text-sm">
                  <div className="flex justify-between text-cream-400">
                    <span>Subtotal</span><span>{fmt(step === "done" ? snapshot.total - (snapshot.total >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE) : subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-cream-400">
                    <span>Shipping</span>
                    <span>{step === "done" ? (snapshot.total >= FREE_SHIPPING_AT ? "Free" : fmt(SHIPPING_FEE)) : shipping === 0 ? "Free" : fmt(shipping)}</span>
                  </div>
                  <div className="flex justify-between pt-1 font-display text-lg font-semibold text-cream-100">
                    <span>Total</span><span className="text-ember-300">{fmt(summaryTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

