import { HERO_IMAGE, nextRoastDate } from "../data/products";
import Reveal from "./Reveal";
import { ArrowDownIcon, ArrowRightIcon, BeanIcon, Steam } from "./Icons";

function RoastStamp() {
  return (
    <div className="pointer-events-none absolute -left-7 top-10 hidden h-28 w-28 md:block lg:-left-14 lg:h-32 lg:w-32">
      <svg viewBox="0 0 120 120" className="h-full w-full animate-spin-slow text-cream-200">
        <defs>
          <path id="circ" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text
          fill="currentColor"
          style={{ fontSize: 10.2, letterSpacing: 2.6, fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}
        >
          <textPath href="#circ">FRESH ROAST &middot; SMALL BATCH &middot; SINCE 2019 &middot;</textPath>
        </text>
      </svg>
      <BeanIcon className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-ember-400" />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative w-full max-w-full overflow-hidden px-4 pt-24 md:px-8 md:pt-40 pb-16 md:pb-24 sm:px-6 lg:px-8"
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 animate-drift rounded-full bg-ember-600/14 blur-[110px] md:-left-32 md:h-[420px] md:w-[420px]" />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 animate-drift rounded-full bg-leaf-700/20 blur-[120px] md:-right-40 md:h-[460px] md:w-[460px]"
        style={{ animationDelay: "-6s" }}
      />
      <BeanIcon className="pointer-events-none absolute -right-16 top-24 h-48 w-48 rotate-12 text-roast-800/60 md:h-96 md:w-96" />

      <div className="relative mx-auto grid w-full max-w-full items-center gap-14 sm:max-w-7xl lg:grid-cols-12 lg:gap-8">
        {/* ---- copy ---- */}
        <div className="w-full lg:col-span-7">
          <Reveal>
            <p className="flex w-full items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-ember-300">
              <span className="h-2 w-2 shrink-0 animate-pulse-dot rounded-full bg-ember-400" />
              Now roasting &middot; Lot 042 &mdash; Guji Highlands
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1
              className="mt-6 break-words font-display font-medium tracking-tight text-cream-100"
              style={{
                fontSize: "clamp(2rem, 7.5vw, 4.5rem)",
                lineHeight: "1.1",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              }}
            >
              <span className="mline"><span>Roasted by fire,</span></span>
              <span className="mline"><span style={{ transitionDelay: "140ms" }}>sourced with</span></span>
              <span className="mline">
                <span style={{ transitionDelay: "280ms" }} className="font-light italic text-ember-400">
                  obsession.
                </span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-7 w-full max-w-xl text-base leading-relaxed text-cream-300 md:text-lg">
              Ember &amp; Oak is a small-batch roastery working directly with fourteen farms
              across four continents. Every lot is cupped, scored, and on a truck within
              48 hours of leaving the drum.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-9 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#counter"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-ember-500 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-roast-950 transition-all hover:bg-ember-400 hover:shadow-[0_12px_40px_-10px_rgba(209,138,58,0.55)] active:scale-95 sm:w-auto"
              >
                Browse the counter
                <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#craft"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-roast-600 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-cream-200 transition-all hover:border-ember-500/70 hover:text-ember-300 sm:w-auto"
              >
                Our craft
                <ArrowDownIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-y-1" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={380}>
            <dl className="mt-12 grid w-full grid-cols-1 gap-4 border-t border-roast-700 pt-7 sm:grid-cols-3 sm:gap-6">
              {[
                ["14", "partner farms"],
                ["92.1", "avg. cup score"],
                ["48 h", "roast-to-door"],
              ].map(([n, l]) => (
                <div key={l} className="w-full">
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-3xl font-semibold text-cream-100 md:text-4xl">{n}</dd>
                  <dd className="mt-1 text-xs uppercase tracking-[0.16em] text-cream-500">{l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* ---- arched image ---- */}
        <div className="relative mx-auto w-full max-w-full sm:max-w-[400px] lg:col-span-5 lg:max-w-none">
          <Reveal delay={150}>
            <div className="relative">
              <RoastStamp />
              <Steam className="pointer-events-none absolute -top-10 left-1/2 z-10 h-12 w-24 -translate-x-1/2 text-ember-300/70" />
              <div className="overflow-hidden rounded-t-[999px] rounded-b-[26px] border border-roast-700/80 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]">
                <img
                  src={HERO_IMAGE}
                  alt="Freshly brewed coffee with rising steam beside scattered roasted beans"
                  className="aspect-[4/5] w-full animate-kenburns object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-3 flex -rotate-2 items-center gap-3 rounded-lg border border-ember-500/40 bg-roast-900/95 px-4 py-3 shadow-xl md:-left-6">
                <span className="h-8 w-1 shrink-0 rounded-full bg-ember-500" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream-500">Next roast day</p>
                  <p className="font-display text-lg font-semibold text-cream-100" suppressHydrationWarning>{nextRoastDate()}</p>
                </div>
              </div>
              <div className="absolute -right-2 top-1/3 rotate-3 rounded-lg border border-roast-600 bg-roast-900/95 px-4 py-3 shadow-xl md:-right-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream-500">In the drum</p>
                <p className="font-display text-lg font-semibold text-ember-300">Lot &#8470; 042</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
