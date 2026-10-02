import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Info } from "lucide-react";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { marketReferences } from "@/config/pricing";

export const metadata: Metadata = {
  title: "Live Cleaning Estimate",
  description: "Build an instant Calgary cleaning estimate by property, size, service, frequency and add-ons.",
};

export default function PricingPage() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative isolate overflow-hidden bg-[#222724] text-white">
        <div className="container grid min-h-[520px] items-center gap-10 py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:py-24">
          
          {/* Left Column: Heading & Scope */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c3a56f] animate-pulse" />
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--brass-light)]">
                Calgary · Live estimator
              </p>
            </div>

            <h1 className="display mt-6 max-w-2xl text-4xl font-light tracking-tight sm:text-6xl lg:text-[68px] leading-[1.06]">
              Know the starting range <br className="hidden sm:inline" />
              <span className="font-medium text-white/95">before you enquire.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Build an instant estimate around your home, chosen service, visit frequency and finishing details. No contact details are needed to see the range.
            </p>

            <div className="mt-8">
              <a 
                className="group inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/35 hover:bg-white/20 active:scale-[0.98]" 
                href="#estimate"
              >
                Start your estimate 
                <ArrowDown size={14} className="text-[#c3a56f] transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Image with Badge */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:aspect-auto lg:h-[420px]">
            <Image 
              src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1500&q=85" 
              alt="Clean, light-filled kitchen prepared for everyday use" 
              fill 
              priority 
              sizes="(max-width:1024px) 100vw, 50vw" 
              className="object-cover object-center transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            <span className="absolute bottom-5 left-5 rounded-lg border border-white/20 bg-[#1c201d]/90 px-3.5 py-2 text-[10px] font-bold tracking-[0.14em] text-white uppercase backdrop-blur-md shadow-md">
              Calgary cleaning estimate · CAD
            </span>
          </div>

        </div>
      </section>


      {/* ================= ESTIMATOR SECTION ================= */}
      <section className="py-20 sm:py-24 lg:py-32" id="estimate">
        <div className="container">
          
          {/* Section Header */}
          <div className="mb-10 grid gap-6 border-b border-[var(--line)] pb-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[#eeece5]/60 px-3 py-1 text-[11px] font-semibold tracking-wider text-[var(--brass)] uppercase">
                Six steps · No contact details required
              </div>
              <h2 className="display mt-3 text-3xl font-normal text-[var(--ink)] sm:text-4xl lg:text-5xl">
                Your space. Your service. A live range.
              </h2>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-[var(--muted)] sm:text-right">
              A Calgary address is checked before the estimator produces its final result.
            </p>
          </div>

          {/* Calculator Component Wrapper */}
          <div className="min-w-0">
            <QuoteCalculator />
          </div>

          {/* Disclaimer Box */}
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[#eeece5]/40 p-4.5 sm:p-5">
            <Info size={16} className="mt-0.5 shrink-0 text-[var(--brass)]" />
            <p className="text-xs leading-relaxed text-[var(--muted)]">
              The estimate is an illustrative starting range built from a centrally maintained rate model, not an official Royal Cleaning Crew price. Final pricing may vary based on property condition, scope and confirmed service requirements. A request does not confirm a booking.
            </p>
          </div>

        </div>
      </section>


      {/* ================= MARKET CONTEXT SECTION ================= */}
      <section className="border-y border-[#c8c5bb]/60 bg-[#eeece5] py-20 sm:py-24">
        <div className="container grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-start lg:gap-16">
          
          <div>
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              Market context
            </p>
            <h2 className="display mt-3 text-3xl font-normal leading-snug sm:text-4xl text-[var(--ink)]">
              A starting model informed by Calgary’s published ranges.
            </h2>
          </div>

          <div>
            <p className="max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
              Independent Calgary guides show prices varying widely by home size, service type and condition. This site’s editable model sits in the premium portion of those broad ranges; it is not copied from another provider and is not a published company rate card.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {marketReferences.map((reference) => (
                <Link
                  key={reference.href}
                  href={reference.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-[#c9c6bd] bg-white/70 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#c3a56f] hover:bg-white hover:shadow"
                >
                  <span className="text-xs font-semibold text-[var(--ink)] group-hover:text-[#1c201d]">
                    {reference.label}
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-[var(--brass)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ================= TAILORED / CUSTOM CTA ================= */}
      <section className="py-14 sm:py-16">
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-[var(--line)] bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:p-8">
            <p className="text-sm font-medium text-[var(--ink)]">
              Need a tailored commercial or post-construction scope instead?
            </p>
            <Link 
              href="/contact" 
              className="group inline-flex shrink-0 items-center gap-2 rounded-lg border border-[var(--brass)] bg-[var(--brass)]/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--ink)] transition-all duration-300 hover:bg-[var(--brass)] hover:text-[#1c201d]"
            >
              Request a custom quote 
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}