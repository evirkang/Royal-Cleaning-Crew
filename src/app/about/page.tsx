import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "The service standards and approach behind Royal Cleaning Crew in Calgary, Alberta.",
};

export default function AboutPage() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative isolate overflow-hidden bg-[#222724] text-white">
        <div className="container grid min-h-[640px] items-center gap-12 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-24">
          
          {/* Left Column: Story & Headline */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c3a56f]" />
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--brass-light)]">
                Royal Cleaning Crew · Calgary
              </p>
            </div>

            <h1 className="display mt-6 text-4xl font-light tracking-tight sm:text-6xl lg:text-[72px] leading-[1.05]">
              A standard is a <br className="hidden sm:inline" />
              <span className="font-medium text-white/95">way of working.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              A cleaning service should be clear before the first room and considered through the last detail. That is the standard we want every request to begin with.
            </p>

            <div className="mt-8">
              <Link 
                href="/services" 
                className="group inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/35 active:scale-[0.98]"
              >
                Explore the services 
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-[#c3a56f]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Image with Badge */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:aspect-auto lg:h-full lg:min-h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85"
              alt="A cleaning professional carefully working in a home"
              fill
              sizes="(max-width:1024px) 100vw, 52vw"
              className="object-cover object-center transition-transform duration-1000 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            <span className="absolute bottom-5 left-5 rounded-lg border border-white/20 bg-[#1c201d]/85 px-3.5 py-2 text-[10px] font-bold tracking-[0.14em] text-white uppercase backdrop-blur-md shadow-md">
              Residential · Calgary
            </span>
          </div>

        </div>
      </section>


      {/* ================= THE APPROACH SECTION ================= */}
      <section className="py-24 sm:py-28 lg:py-36">
        <div className="container grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
          <div>
            <h2 className="display text-4xl font-normal leading-[1.12] sm:text-5xl lg:text-6xl text-[var(--ink)]">
              Good service starts with knowing what matters in the space.
            </h2>
          </div>

          <div className="flex flex-col justify-center space-y-5 border-l border-[var(--line)] pl-6 lg:pl-10">
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              The approach
            </p>
            <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              A lived-in home, a short-term rental and a working office do not share the same rhythm. The useful questions are specific: what is being cleaned, which details matter, how the property is accessed and when the space needs to be ready.
            </p>
            <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              Royal Cleaning Crew is focused on Calgary. Requests are reviewed around location, property condition, service scope and scheduling rather than treated as a one-size-fits-all booking.
            </p>
          </div>
        </div>
      </section>


      {/* ================= 3 PILLARS / VALUES SECTION ================= */}
      <section className="border-y border-[#c8c5bb]/60 bg-[#eeece5] py-20 sm:py-24 lg:py-28">
        <div className="container grid gap-8 md:grid-cols-3">
          {[
            [
              "01",
              "Clarity before the clean",
              "Service type, access, priorities and optional detail work belong in the conversation before a scope is confirmed.",
            ],
            [
              "02",
              "Care for the setting",
              "Surfaces, routines and property requirements shape how work is planned. Share sensitivities and access notes early.",
            ],
            [
              "03",
              "A deliberate finish",
              "The last pass should account for the areas that make a room feel ready, not only the easiest surfaces to reach.",
            ],
          ].map(([number, title, copy]) => (
            <article 
              className="group flex flex-col justify-between rounded-2xl border border-[#c8c5bb]/80 bg-white/70 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#c3a56f]/60 hover:shadow-md sm:p-9" 
              key={number}
            >
              <div>
                <span className="display text-4xl font-light text-[var(--brass)] transition-transform duration-300 inline-block group-hover:scale-105">
                  {number}
                </span>
                <h3 className="display mt-6 text-2xl font-normal sm:text-3xl text-[var(--ink)]">
                  {title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-[15px]">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </section>


      {/* ================= PRACTICE / CHECKLIST SECTION ================= */}
      <section className="py-24 sm:py-28 lg:py-32">
        <div className="container grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              What this means in practice
            </p>
            <h2 className="display mt-4 text-4xl font-normal leading-[1.15] sm:text-5xl text-[var(--ink)]">
              No guesswork in the request.
            </h2>
          </div>

          <ul className="divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-white/50 p-6 shadow-sm sm:p-8">
            {[
              "A service-area check before a quote request proceeds",
              "A scope shaped around rooms, condition and selected details",
              "A clear distinction between an inquiry and a confirmed booking",
              "Pricing shown only when approved rates are configured",
            ].map((item) => (
              <li 
                className="group flex items-center gap-4 py-5 transition-colors duration-200 first:pt-2 last:pb-2 sm:gap-5" 
                key={item}
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c3a56f]/15 text-[var(--brass)] transition-colors duration-200 group-hover:bg-[#c3a56f] group-hover:text-[#1c201d]">
                  <Check size={15} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-medium leading-relaxed text-[var(--ink)] sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>


      {/* ================= BOTTOM CTA BANNER ================= */}
      <section className="bg-[#222724] py-20 text-white sm:py-24">
        <div className="container flex flex-col gap-8 rounded-2xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 md:flex-row md:items-end md:justify-between lg:p-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c3a56f]" />
              <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--brass-light)]">
                A Calgary service
              </p>
            </div>
            <h2 className="display mt-4 max-w-2xl text-4xl font-normal leading-[1.1] sm:text-5xl lg:text-6xl text-white">
              Tell us what the space needs.
            </h2>
          </div>

          <div className="shrink-0">
            <Link 
              href="/contact" 
              className="button inline-flex items-center gap-2 rounded-lg border border-[#c3a56f] bg-[#c3a56f] px-7 py-3.5 text-sm font-medium text-[#1c201d] transition-all duration-300 hover:bg-[#d0b984] hover:shadow-lg hover:shadow-[#c3a56f]/20 active:scale-[0.98]"
            >
              Request a Quote <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}