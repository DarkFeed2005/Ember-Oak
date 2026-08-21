import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const BeanIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3c3.5 0 6 4 6 9s-2.5 9-6 9-6-4-6-9 2.5-9 6-9Z" />
    <path d="M12 3c-1.8 2.9-2.1 5.7-.5 9 1.6 3.3 1.1 6.3-1 9" />
  </svg>
);

export const BasketIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.5 9h15l-1.4 10.2a1.8 1.8 0 0 1-1.8 1.55H7.7a1.8 1.8 0 0 1-1.8-1.55L4.5 9Z" />
    <path d="M8.5 9V7.5a3.5 3.5 0 0 1 7 0V9" />
    <path d="M9.4 13v3.4M14.6 13v3.4" />
  </svg>
);

export const SearchIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="10.5" cy="10.5" r="6.2" />
    <path d="m15.3 15.3 5 5" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const MenuIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </svg>
);

export const MinusIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5.5 12h13" />
  </svg>
);

export const ArrowRightIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 12h16m0 0-6-6m6 6-6 6" />
  </svg>
);

export const ArrowDownIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 4v16m0 0 6-6m-6 6-6-6" />
  </svg>
);

export const FlameIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21c3.9 0 6.5-2.5 6.5-6.2 0-2.7-1.6-4.6-3-6.3-1.2-1.5-2.3-2.9-2.5-4.9-2.6 1.5-4 3.6-3.8 6.1-.9-.3-1.6-1-1.9-2.2-1.1 1.5-1.8 3.6-1.8 5.4C5.5 18.5 8.1 21 12 21Z" />
    <path d="M12 21c1.8 0 3-1.3 3-3 0-1.6-1.2-2.7-3-4-1.8 1.3-3 2.4-3 4 0 1.7 1.2 3 3 3Z" />
  </svg>
);

export const LeafIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M19.5 4.5c-8.5 0-13 4-13 9.5 0 3 2 5.5 5.5 5.5 5.5 0 7.5-7 7.5-15Z" />
    <path d="M4.5 19.5C8 14 12 10.5 16.5 8" />
  </svg>
);

export const DropIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3.5S6 10 6 14a6 6 0 0 0 12 0c0-4-6-10.5-6-10.5Z" />
    <path d="M9.5 14.5a2.6 2.6 0 0 0 2 2.6" />
  </svg>
);

export const TruckIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 6.5h11v10H3zM14 10h4l3 3v3.5h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const TrashIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 7h14M9.5 7V5.2A1.2 1.2 0 0 1 10.7 4h2.6a1.2 1.2 0 0 1 1.2 1.2V7M7 7l.8 12a1.5 1.5 0 0 0 1.5 1.4h5.4a1.5 1.5 0 0 0 1.5-1.4L17 7" />
    <path d="M10.2 11v5.4M13.8 11v5.4" />
  </svg>
);

export const CupIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 10h11v5.5A4.5 4.5 0 0 1 11.5 20h-2A4.5 4.5 0 0 1 5 15.5V10Z" />
    <path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16" />
    <path d="M8 7V5.2M11 7V4M14 7V5.2" />
  </svg>
);

export const SparkIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.5c.6 4.9 2.6 6.9 7.5 7.5-4.9.6-6.9 2.6-7.5 7.5-.6-4.9-2.6-6.9-7.5-7.5 4.9-.6 6.9-2.6 7.5-7.5Z" />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s-6.5-5.6-6.5-10.4a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.4" r="2.3" />
  </svg>
);

export const CardIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M3 10h18M6.5 14.5h4" />
  </svg>
);

/** Three rising steam wisps — stagger via className/style on each path's parent. */
export const Steam = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 60 46"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    className={className}
  >
    <path className="steam-wisp" style={{ animationDelay: "0s" }} d="M15 40c-3-4 3-7 0-12s2-8 0-11" />
    <path className="steam-wisp" style={{ animationDelay: "0.7s" }} d="M30 42c-3.5-5 3.5-8 0-14s2.5-9 0-13" />
    <path className="steam-wisp" style={{ animationDelay: "1.3s" }} d="M45 40c-3-4 3-7 0-12s2-8 0-11" />
  </svg>
);

