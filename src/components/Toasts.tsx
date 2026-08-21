import { useStore } from "../lib/store";
import { BeanIcon } from "./Icons";

export default function Toasts() {
  const { toasts } = useStore();
  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[70] flex w-full max-w-md -translate-x-1/2 flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex w-auto max-w-full animate-rise items-center gap-3 rounded-full border border-ember-500/50 bg-roast-800 py-3 pl-4 pr-6 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ember-500 text-roast-950">
            <BeanIcon className="h-4 w-4" />
          </span>
          <p className="truncate text-sm font-medium text-cream-100">{t.msg}</p>
        </div>
      ))}
    </div>
  );
}

