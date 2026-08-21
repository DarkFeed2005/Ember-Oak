"use client";

import { useEffect, useState } from "react";

type Phase = "show" | "fade" | "gone";

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("show");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setPhase("fade"), reduced ? 150 : 1700);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "fade") return;
    const t = window.setTimeout(() => setPhase("gone"), 750);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      className={`preloader ${phase === "fade" ? "preloader-out" : ""}`}
      role="status"
      aria-label="Loading"
    >
      <div className="pl-loader">
        <div className="pl-cup">
          <div className="pl-handle" />
          <div className="pl-smoke one" />
          <div className="pl-smoke two" />
          <div className="pl-smoke three" />
        </div>
        <p className="pl-text">Brewing…</p>
      </div>
      <p className="pl-credit">Made by KpolitX Team</p>
    </div>
  );
}
