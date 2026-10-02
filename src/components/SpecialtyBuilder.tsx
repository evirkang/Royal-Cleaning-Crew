"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { quoteOptions } from "@/config/pricing";

export function SpecialtyBuilder() {
  const [selected, setSelected] = useState<string[]>([]);
  const query = new URLSearchParams({
    service: "Specialty Cleaning",
    ...(selected.length ? { addOns: selected.join(",") } : {}),
  });

  return (
    <section className="bg-[#eeece5] py-16 sm:py-20">
      <div className="container grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:gap-14">
        <div><p className="eyebrow">Service builder</p><h2 className="display mt-4 text-5xl">Build around the details.</h2><p className="mt-4 max-w-md text-sm leading-7 text-[var(--muted)]">Select the areas you would like reviewed. The quote form will carry your choices into the request.</p></div>
        <div className="border-t border-[#c9c6bd]">
          <div className="grid sm:grid-cols-2">
            {quoteOptions.addOns.map((addOn) => {
              const active = selected.includes(addOn);
              return <button type="button" aria-pressed={active} onClick={() => setSelected((current) => active ? current.filter((item) => item !== addOn) : [...current, addOn])} className="flex min-h-[56px] items-center justify-between gap-3 border-b border-[#c9c6bd] px-2 text-left text-sm" key={addOn}>{addOn}{active && <Check className="text-[var(--brass)]" size={16}/>}</button>;
            })}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-[var(--muted)]">{selected.length ? `${selected.length} detail${selected.length === 1 ? "" : "s"} selected` : "Choose any details for the quote"}</p>
            <Link href={`/contact?${query.toString()}`} className="button button-dark">Request custom scope</Link>
          </div>
        </div>
      </div>
    </section>
  );
}