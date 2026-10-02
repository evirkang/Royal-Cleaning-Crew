import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, MapPin } from "lucide-react";
import { serviceArea } from "@/config/service-area";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Royal Cleaning Crew currently serves Calgary, Alberta. Check your address before requesting a quote.",
};

const propertyTypes = [
  "Condos and apartments",
  "Townhomes and detached homes",
  "Offices and workplaces",
  "Short-term rental properties",
  "Move-in and move-out spaces",
  "Newly finished interiors",
];

export default function ServiceAreasPage() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative isolate overflow-hidden bg-[#222724] text-white">
        <div className="container grid min-h-[540px] items-center gap-10 py-16 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-24">
          
          {/* Left Column: Heading & Overview */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c3a56f] animate-pulse" />
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--brass-light)]">
                Service area · Calgary, Alberta
              </p>
            </div>

            <h1 className="display mt-6 max-w-xl text-4xl font-light tracking-tight sm:text-6xl lg:text-[72px] leading-[1.05]">
              A local service, <br className="hidden sm:inline" />
              <span className="font-medium text-white/95">with a clear boundary.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Royal Cleaning Crew currently accepts service requests within Calgary. The full street address, city, province and postal area are checked together before a request can proceed.
            </p>

            <div className="mt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/35 hover:bg-white/20 active:scale-[0.98]"
              >
                Check your address
                <ArrowUpRight
                  size={15}
                  className="text-[#c3a56f] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Image with Badge */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:aspect-auto lg:h-[440px]">
            <Image
              src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=85"
              alt="Urban Calgary streetscape"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-[#1c201d]/90 px-3.5 py-2 text-[10px] font-bold tracking-[0.14em] text-white uppercase backdrop-blur-md shadow-md">
              <MapPin size={13} className="text-[#c3a56f]" /> Calgary, Alberta
            </span>
          </div>

        </div>
      </section>


      {/* ================= SPACES WE CAN REVIEW ================= */}
      <section className="py-24 sm:py-28 lg:py-32">
        <div className="container grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              Spaces we can review
            </p>
            <h2 className="display mt-4 text-4xl font-normal leading-[1.12] sm:text-5xl lg:text-6xl text-[var(--ink)]">
              Different properties. A scope to suit.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              Property type helps shape the request; condition, access and timing help shape the work.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {propertyTypes.map((type, index) => (
              <div
                className="group flex min-h-[100px] flex-col justify-between rounded-2xl border border-[var(--line)] bg-white/60 p-6 shadow-sm transition-all duration-300 hover:border-[#c3a56f]/60 hover:bg-white hover:shadow-md"
                key={type}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-[var(--brass)] uppercase">
                    0{index + 1}
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-neutral-200 transition-colors group-hover:bg-[#c3a56f]" />
                </div>
                <h3 className="text-base font-semibold text-[var(--ink)] sm:text-lg">
                  {type}
                </h3>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ================= LOCATION CHECK EXPLANATION ================= */}
      <section className="border-y border-[#c8c5bb]/60 bg-[#eeece5] py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          
          <div>
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              How the location check works
            </p>
            <h2 className="display mt-4 text-3xl font-normal leading-[1.15] sm:text-4xl lg:text-5xl text-[var(--ink)]">
              A Calgary postal prefix is only one part of the check.
            </h2>
          </div>

          <div className="rounded-2xl border border-[#c9c6bd] bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              The request form checks a Canadian postal-code format against a configurable set of Calgary FSA prefixes, then confirms the city, province and street-address format. A postal code beginning with T alone is not enough.
            </p>

            <ul className="mt-6 grid gap-3 border-t border-[#c9c6bd]/60 pt-6 sm:grid-cols-2">
              {[
                "Calgary city",
                "Alberta (AB)",
                "A supported Calgary postal area",
                "A street address with a number",
              ].map((item) => (
                <li
                  className="flex items-center gap-2.5 rounded-xl border border-[#c9c6bd]/50 bg-white/50 p-3 text-xs font-semibold text-[var(--ink)]"
                  key={item}
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c3a56f]/20 text-[var(--brass)]">
                    <Check size={12} strokeWidth={2.5} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 border-t border-[#c9c6bd]/50 pt-4 text-xs leading-relaxed text-[var(--muted)]">
              Current postal prefixes are maintained in the site’s service-area configuration and can be expanded if service officially adds another community. The current boundary does not include surrounding municipalities.
            </p>
          </div>

        </div>
      </section>


      {/* ================= CURRENT SERVICE BOUNDARY CTA ================= */}
      <section className="py-20 sm:py-24">
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-[var(--line)] bg-white/80 p-8 shadow-sm backdrop-blur-sm md:flex-row md:items-center lg:p-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[#eeece5]/60 px-3 py-1 text-[11px] font-semibold tracking-wider text-[var(--brass)] uppercase">
                Current service boundary
              </div>
              <h2 className="display mt-3 text-3xl font-normal text-[var(--ink)] sm:text-4xl lg:text-5xl">
                {serviceArea.city}, {serviceArea.province}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                Requests outside Calgary are not accepted by the quote form. A service request is not a confirmed booking; scope and availability are reviewed separately.
              </p>
            </div>

            <Link
              href="/pricing"
              className="button inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#c3a56f] bg-[#c3a56f] px-7 py-3.5 text-sm font-medium text-[#1c201d] transition-all duration-300 hover:bg-[#d0b984] hover:shadow-lg hover:shadow-[#c3a56f]/20 active:scale-[0.98]"
            >
              Check a service address <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}