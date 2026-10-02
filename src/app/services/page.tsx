import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Cleaning Services",
  description:
    "Explore residential, deep, move, rental, commercial and specialty cleaning in Calgary.",
};

export default function ServicesPage() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative isolate overflow-hidden bg-[#222724] text-white">
        <Image
          src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=2000&q=90"
          alt="A cleaning professional working carefully in a home"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        
        {/* Soft, rich luxury overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#151916] via-[#1c201d]/85 to-[#0b3d91]/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#171c19]/95 via-[#171c19]/80 to-transparent" />

        <div className="container flex min-h-[500px] flex-col justify-end py-16 sm:min-h-[580px] sm:py-20 lg:py-24">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c3a56f] animate-pulse" />
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--brass-light)]">
              Services · Calgary, Alberta
            </p>
          </div>

          <h1 className="display mt-6 max-w-4xl text-4xl font-light tracking-tight sm:text-6xl lg:text-[76px] xl:text-[84px] leading-[1.05]">
            The right clean for the <br className="hidden sm:inline" />
            <span className="font-medium text-white/95">space and the moment.</span>
          </h1>

          <div className="mt-8 flex flex-col gap-6 border-t border-white/20 pt-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              From ongoing home care to a property handover, each service begins with a clear scope and the details that shape it.
            </p>

            <Link
  href="/pricing"
  className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#c3a56f] bg-[#c3a56f] px-6 py-3.5 text-sm font-semibold !text-[#111412] shadow-md transition-all duration-300 hover:bg-[#d8c08a] hover:shadow-lg hover:shadow-[#c3a56f]/25 active:scale-[0.98]"
>
  Build a request <ArrowRight size={15} className="!text-[#111412]" />
</Link>
          </div>
        </div>
      </section>

      {/* ================= SERVICES DIRECTORY GRID ================= */}
      <section className="py-20 sm:py-24 lg:py-32">
        <div className="container">
          <div className="grid gap-6 border-b border-[var(--line)] pb-8 sm:grid-cols-[1.1fr_.9fr] sm:items-end">
            <div>
              <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
                Choose your starting point
              </p>
              <h2 className="display mt-3 text-3xl font-normal text-[var(--ink)] sm:text-4xl lg:text-5xl">
                A service shaped around your property.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[var(--muted)] sm:text-base sm:text-right">
              Every property is different. Service inclusions, access and any finishing details are confirmed before a booking.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard service={service} index={index} key={service.slug} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= NOT SURE / CUSTOM SCOPE CTA ================= */}
      <section className="border-t border-[#c8c5bb]/60 bg-[#eeece5] py-20 sm:py-24">
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-[#c8c5bb]/80 bg-white/70 p-8 shadow-sm backdrop-blur-md md:flex-row md:items-center lg:p-12">
            <div>
              <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
                Not sure which service fits?
              </p>
              <h2 className="display mt-3 max-w-2xl text-3xl font-normal text-[var(--ink)] sm:text-4xl lg:text-5xl">
                Start with the property, not the label.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                Share the condition, the rooms that matter and when the space needs to be ready. The scope can be reviewed from there.
              </p>
            </div>

            <Link
              href="/contact"
              className="button inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#c3a56f] bg-[#c3a56f] px-7 py-3.5 text-sm font-medium text-[#1c201d] transition-all duration-300 hover:bg-[#d0b984] hover:shadow-lg hover:shadow-[#c3a56f]/20 active:scale-[0.98]"
            >
              Describe your space <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}