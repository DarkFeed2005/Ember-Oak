import { useState } from "react";
import type { Category } from "../data/products";
import Reveal from "./Reveal";
import { ArrowRightIcon, BeanIcon, CheckIcon, PinIcon } from "./Icons";

interface Props {
  onCategory: (c: Category | "all") => void;
}

export default function Footer({ onCategory }: Props) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = () => {
    if (!/\S+@\S+\.\S+/.test(email)) return;
    setDone(true);
  };

  const jump = (c: Category | "all") => {
    onCategory(c);
    document.getElementById("counter")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="visit" className="relative scroll-mt-20 overflow-hidden bg-roast-900">
      {/* subscribe band */}
      <div className="relative border-b border-roast-700">
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-ember-600/12 blur-[90px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 py-14 md:px-8 lg:grid-cols-2 lg:py-16">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-ember-300">The Sunday Grind</p>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-cream-100 md:text-5xl">
              Never run <span className="font-light italic text-ember-400">dry.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-400">
              Brew guides, roast logs, and first dibs on micro-lots â€” one email every
              Sunday, while the drum is still warm.
            </p>
          </Reveal>
          <Reveal delay={140}>
            {done ? (
              <div className="flex items-center gap-4 rounded-xl border border-leaf-700 bg-leaf-700/10 p-6">
                <span className="grid h-11 w-11 shrink-0 animate-pop place-items-center rounded-full bg-leaf-500 text-roast-950">
                  <CheckIcon className="h-6 w-6" strokeWidth={2.2} />
                </span>
                <div>
                  <p className="font-display text-xl font-semibold text-cream-100">You're on the list.</p>
                  <p className="mt-1 text-sm text-cream-400">First pour lands Sunday, {email.split("@")[0]}.</p>
                </div>
              </div>
            ) : (
              <form
                className="flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  subscribe();
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@somewhere.com"
                  aria-label="Email for newsletter"
                  className="w-full rounded-full border border-roast-600 bg-roast-850 px-6 py-4 text-sm text-cream-100 placeholder:text-cream-600 transition-colors focus:border-ember-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="group flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-ember-500 px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] text-roast-950 transition-all hover:bg-ember-400 active:scale-95"
                >
                  Subscribe
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>

      {/* main footer */}
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-ember-500/50 bg-roast-800 text-ember-400">
              <BeanIcon className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-semibold text-cream-100">
              Ember <span className="text-ember-400">&amp;</span> Oak
            </span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-400">
            A small-batch roastery in Portland, Oregon. Fourteen farms, one drum,
            and a standing rule: nothing ships older than forty-eight hours off roast.
          </p>
          <p className="mt-6 flex items-start gap-3 text-sm text-cream-300">
            <PinIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ember-400" />
            <span>
              410 NW Flanders St, Colombo, SL
              <br />
              <span className="text-cream-500">CafÃ© open Tueâ€“Sun Â· 7 am â€“ 4 pm</span>
            </span>
          </p>
        </div>

        <div className="lg:col-span-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cream-500">Shop</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {([
              ["all", "All coffee"],
              ["single-origin", "Single origin"],
              ["blend", "Blends"],
              ["decaf", "Decaf"],
            ] as [Category | "all", string][]).map(([c, label]) => (
              <li key={c}>
                <button onClick={() => jump(c)} className="text-cream-300 transition-colors hover:text-ember-300">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cream-500">Roastery</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href="#craft" className="text-cream-300 transition-colors hover:text-ember-300">Our craft</a></li>
            <li><a href="#counter" className="text-cream-300 transition-colors hover:text-ember-300">The counter</a></li>
            <li><a href="#top" className="text-cream-300 transition-colors hover:text-ember-300">Back to top</a></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cream-500">Roast schedule</p>
          <ul className="mt-4 space-y-2.5 text-sm text-cream-300">
            <li className="flex justify-between gap-4 border-b border-roast-700/70 pb-2.5">
              <span>Monday</span><span className="text-ember-300">Washed lots</span>
            </li>
            <li className="flex justify-between gap-4 border-b border-roast-700/70 pb-2.5">
              <span>Thursday</span><span className="text-ember-300">Naturals &amp; blends</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Friday</span><span className="text-cream-500">Ship day</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-roast-700">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-cream-500 md:flex-row md:px-8">
          <p>Â© 2026 Ember &amp; Oak Roasters. Roasted with fire in Sri Lanka.</p>
          <p className="flex items-center gap-2">
             <BeanIcon className="h-3.5 w-3.5 text-ember-500" /> Made By KpolitX Team
          </p>
        </div>
      </div>
    </footer>
  );
}

