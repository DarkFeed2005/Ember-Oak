import Reveal from "./Reveal";
import { useStore } from "../lib/store";
import { ArrowRightIcon, DropIcon, FlameIcon, LeafIcon, TruckIcon } from "./Icons";

const STEPS = [
  {
    n: "01",
    icon: LeafIcon,
    title: "Sourced at origin",
    body: "We buy full lots â€” never samples â€” from fourteen farms we visit every harvest, paying two to three times the commodity price and publishing what we paid.",
  },
  {
    n: "02",
    icon: FlameIcon,
    title: "Roasted by profile",
    body: "Twelve-kilo drum, gas flame, and a roast curve logged batch by batch. Development is nudged in five-second increments until the cup sings.",
  },
  {
    n: "03",
    icon: DropIcon,
    title: "Rested & cupped",
    body: "Every batch rests 24 hours, then gets cupped blind against the last one. Anything scoring under 86 never leaves the building â€” it becomes staff coffee.",
  },
  {
    n: "04",
    icon: TruckIcon,
    title: "Shipped in 48 hours",
    body: "Sealed with a one-way valve the morning after roasting and handed to carbon-neutral freight. Peak flavor reaches your door, not a warehouse shelf.",
  },
];

export default function Craft() {
  const { toast } = useStore();

  return (
    <section id="craft" className="relative scroll-mt-20 bg-cream-200 py-20 text-roast-950 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-roast-950/20 to-transparent" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-12">
        {/* sticky intro */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-clay-600">The craft</p>
              <h2 className="mt-4 font-display text-5xl font-medium leading-[1.02] tracking-tight md:text-6xl">
                From cherry
                <br />
                to <span className="font-light italic text-clay-600">cup.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-roast-950/75">
                Coffee is a chain of small decisions â€” when to pick, how long to ferment,
                how many seconds of development. We obsess over each link so the only
                decision left to you is which cup to pour first.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <button
                onClick={() => toast("The 2026 sourcing report lands with the spring harvest")}
                className="group mt-8 inline-flex items-center gap-3 rounded-full border border-roast-950/30 px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-roast-950 transition-all hover:border-clay-600 hover:bg-clay-600 hover:text-cream-100 active:scale-95"
              >
                Read our sourcing report
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>
        </div>

        {/* steps */}
        <div className="lg:col-span-7">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 border-t border-roast-950/15 py-8 transition-colors last:border-b hover:bg-cream-100 md:gap-8 md:py-10">
                <span className="font-display text-4xl font-light italic text-roast-950/25 transition-colors duration-500 group-hover:text-clay-600 md:text-6xl">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold md:text-3xl">{s.title}</h3>
                  <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-roast-950/70 md:text-[15px]">
                    {s.body}
                  </p>
                </div>
                <s.icon className="mt-1 h-8 w-8 text-clay-600 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 md:h-10 md:w-10" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

