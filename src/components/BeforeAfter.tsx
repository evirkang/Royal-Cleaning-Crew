"use client";

import Image from "next/image";
import { useState } from "react";

const comparisons = [
  {
    name: "Kitchen",
    working: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1400&q=85",
    ready: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    workingAlt: "Cleaning work in a home kitchen",
    readyAlt: "A finished contemporary kitchen",
  },
  {
    name: "Bathroom",
    working: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85",
    ready: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=85",
    workingAlt: "A cleaning professional at work",
    readyAlt: "A bright, finished bathroom",
  },
];

export function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState(54);
  const comparison = comparisons[active];

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-6 border-b border-[#c9c6bd]" role="tablist" aria-label="Room comparison">
        {comparisons.map((item, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={active === index}
            key={item.name}
            onClick={() => setActive(index)}
            className={`border-b-2 py-3 text-[10px] font-bold tracking-[.1em] uppercase transition-colors ${active === index ? "border-[var(--brass)] text-[var(--ink)]" : "border-transparent text-[var(--muted)]"}`}
          >{item.name}</button>
        ))}
        <span className="ml-auto self-center text-[9px] font-semibold tracking-[.1em] text-[var(--muted)] uppercase">Illustrative service imagery</span>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden bg-[#dedbd3] sm:aspect-[16/8]">
        <Image src={comparison.working} alt={comparison.workingAlt} fill sizes="(max-width:768px) 100vw, 80vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={comparison.ready} alt={comparison.readyAlt} fill sizes="(max-width:768px) 100vw, 80vw" className="object-cover" />
        </div>
        <span className="absolute left-4 top-4 bg-[#1c201d]/80 px-3 py-2 text-[9px] font-bold tracking-[.1em] text-white uppercase" style={{ left: `${Math.min(position, 78)}%` }}>Room detail</span>
        <span className="absolute bottom-4 left-4 bg-[#1c201d]/80 px-3 py-2 text-[9px] font-bold tracking-[.1em] text-white uppercase">Cleaning in progress</span>
        <span className="absolute bottom-4 right-4 bg-[#1c201d]/80 px-3 py-2 text-[9px] font-bold tracking-[.1em] text-white uppercase">Finished space</span>
        <div className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,.15)]" style={{ left: `${position}%` }} />
        <input
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          type="range"
          min="10"
          max="90"
          value={position}
          aria-label="Reveal more of the finished space"
          onChange={(event) => setPosition(Number(event.target.value))}
        />
      </div>
      <p className="mt-3 text-xs leading-5 text-[var(--muted)]">These images illustrate the kind of work and spaces involved; they are not documented before-and-after results from a customer property.</p>
    </div>
  );
}