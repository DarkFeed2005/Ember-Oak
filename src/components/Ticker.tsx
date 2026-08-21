import { SparkIcon } from "./Icons";

const ITEMS = [
  "Roast days — Mon & Thu",
  "Free U.S. shipping over $45",
  "Harvest 25/26 lots have landed",
  "Roasted to order · shipped in 48 h",
  "Every batch cupped & scored",
  "Carbon-neutral delivery",
];

function Row() {
  return (
    <>
      {ITEMS.map((t) => (
        <span key={t} className="flex items-center gap-6 pr-6 md:gap-10 md:pr-10">
          <span className="whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.18em] text-roast-950">
            {t}
          </span>
          <SparkIcon className="h-3 w-3 shrink-0 text-roast-950/70" />
        </span>
      ))}
    </>
  );
}

export default function Ticker() {
  return (
    <div className="marquee relative z-10 border-y border-roast-950/20 bg-ember-400 py-3">
      <div className="marquee-track">
        <div className="flex items-center"><Row /></div>
        <div className="flex items-center" aria-hidden="true"><Row /></div>
      </div>
    </div>
  );
}

