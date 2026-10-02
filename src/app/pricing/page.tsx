import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { marketReferences } from "@/config/pricing";

export const metadata: Metadata = {
  title: "Live Cleaning Estimate",
  description: "Build an instant Calgary cleaning estimate by property, size, service, frequency and add-ons.",
};

export default function PricingPage() {
  return <>
    <section className="bg-[#222724] text-white">
      <div className="container grid min-h-[500px] gap-8 py-10 lg:grid-cols-[.95fr_1.05fr] lg:items-stretch lg:py-12">
        <div className="flex flex-col justify-end py-7">
          <p className="eyebrow">Calgary · Live estimator</p>
          <h1 className="display mt-4 max-w-2xl text-6xl sm:text-7xl lg:text-[78px]">Know the starting range before you enquire.</h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/68">Build an instant estimate around your home, chosen service, visit frequency and finishing details. No contact details are needed to see the range.</p>
          <a className="text-link mt-7 w-fit text-white" href="#estimate">Start your estimate <ArrowDown size={14}/></a>
        </div>
        <div className="relative min-h-[300px] lg:min-h-[430px]">
          <Image src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1500&q=85" alt="Clean, light-filled kitchen prepared for everyday use" fill priority sizes="(max-width:1024px) 100vw, 52vw" className="object-cover object-center"/>
          <span className="absolute bottom-4 left-4 bg-[#1c201d]/85 px-3 py-2 text-[9px] font-bold text-white uppercase">Calgary cleaning estimate · CAD</span>
        </div>
      </div>
    </section>

    <section className="py-12 sm:py-16" id="estimate">
      <div className="container">
        <div className="mb-7 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div><p className="eyebrow">Six steps · No contact details required</p><h2 className="display mt-2 text-4xl">Your space. Your service. A live range.</h2></div>
          <p className="max-w-sm text-xs leading-5 text-[var(--muted)]">A Calgary address is checked before the estimator produces its final result.</p>
        </div>
        <QuoteCalculator/>
        <p className="mt-4 max-w-4xl text-xs leading-6 text-[var(--muted)]">The estimate is an illustrative starting range built from a centrally maintained rate model, not an official Royal Cleaning Crew price. Final pricing may vary based on property condition, scope and confirmed service requirements. A request does not confirm a booking.</p>
      </div>
    </section>

    <section className="border-y border-[var(--line)] bg-[#eeece5] py-12 sm:py-14">
      <div className="container grid gap-5 lg:grid-cols-[.65fr_1.35fr] lg:items-start">
        <div><p className="eyebrow">Market context</p><h2 className="display mt-3 text-3xl sm:text-4xl">A starting model informed by Calgary’s published 2026 ranges.</h2></div>
        <div>
          <p className="max-w-3xl text-xs leading-6 text-[var(--muted)]">Independent Calgary guides show prices varying widely by home size, service type and condition. This site’s editable model sits in the premium portion of those broad ranges; it is not copied from another provider and is not a published company rate card.</p>
          <ul className="mt-5 grid border-t border-[#c9c6bd] sm:grid-cols-2">
            {marketReferences.map((reference) => <li className="border-b border-[#c9c6bd] py-3 sm:pr-5" key={reference.href}><Link className="inline-flex items-center gap-2 text-xs font-semibold hover:text-[var(--brass)]" href={reference.href} target="_blank" rel="noreferrer">{reference.label}<ArrowUpRight size={13}/></Link></li>)}
          </ul>
        </div>
      </div>
    </section>
    <section className="py-10"><div className="container flex flex-wrap items-center justify-between gap-4"><p className="text-xs leading-6 text-[var(--muted)]">Need a tailored commercial or post-construction scope instead?</p><Link className="text-link" href="/contact">Request a custom quote <ArrowUpRight size={14}/></Link></div></section>
  </>;
}