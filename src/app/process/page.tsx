import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Info } from "lucide-react";
import { ProcessTimeline } from "@/components/ProcessTimeline";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "A clear path from a Calgary cleaning request to a confirmed service and final walkthrough.",
};

export default function ProcessPage() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative isolate overflow-hidden bg-[#eeece5] text-[var(--ink)]">
        <div className="container grid min-h-[540px] items-center gap-10 py-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-16 lg:py-24">
          
          {/* Left Column: Headline & Overview */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--line)] bg-white/60 px-3.5 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c3a56f]" />
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--brass)]">
                From first details to final check
              </p>
            </div>

            <h1 className="display mt-6 max-w-2xl text-4xl font-light tracking-tight sm:text-6xl lg:text-[70px] leading-[1.06]">
              A clear process makes <br className="hidden sm:inline" />
              <span className="font-medium text-[var(--ink)]">room for better work.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              The service begins with the property and what it needs. A request is reviewed, the scope is agreed and only then is a schedule confirmed.
            </p>

            <div className="mt-8">
              <Link
  href="/contact"
  className="inline-flex items-center gap-2 rounded-xl border border-[#1c201d] bg-[#1c201d] px-7 py-3.5 text-sm font-semibold !text-white shadow-md transition-all duration-300 hover:bg-black hover:shadow-lg active:scale-[0.98]"
>
  Start a request <ArrowRight size={15} className="!text-white" />
</Link>
            </div>
          </div>

          {/* Right Column: Hero Image with Badge */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#c8c5bb] shadow-2xl lg:aspect-auto lg:h-[440px]">
            <Image
              src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1400&q=85"
              alt="A cleaning professional carrying out detail work"
              fill
              sizes="(max-width:1024px) 100vw, 46vw"
              className="object-cover transition-transform duration-1000 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            <span className="absolute bottom-5 left-5 rounded-lg border border-white/20 bg-[#1c201d]/90 px-3.5 py-2 text-[10px] font-bold tracking-[0.14em] text-white uppercase backdrop-blur-md shadow-md">
              Considered Clean · Calgary
            </span>
          </div>

        </div>
      </section>


      {/* ================= PROCESS TIMELINE COMPONENT ================= */}
      <ProcessTimeline />


      {/* ================= WHAT HAPPENS AFTER INQUIRY ================= */}
      <section className="py-24 sm:py-28 lg:py-32">
        <div className="container grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              What happens after an inquiry
            </p>
            <h2 className="display mt-4 text-3xl font-normal leading-[1.12] sm:text-4xl lg:text-5xl text-[var(--ink)]">
              A request is not a booking.
            </h2>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8 lg:p-10">
            <div className="space-y-6 divide-y divide-[var(--line)]">
              <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                Once a request is delivered, service type, Calgary location, property condition, access and preferred timing can be reviewed. A final scope, price and available appointment are confirmed separately.
              </p>
              
              <div className="pt-6">
                <div className="flex items-start gap-3 rounded-xl border border-[var(--brass)]/30 bg-[#eeece5]/60 p-4.5 sm:p-5">
                  <Info size={16} className="mt-0.5 shrink-0 text-[var(--brass)]" />
                  <p className="text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
                    If the request form reports that delivery is not configured or unavailable, the details have not been sent. Do not assume a reservation is in place until the business confirms it.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}