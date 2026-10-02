import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { BeforeAfter } from "@/components/BeforeAfter";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ServiceExplorer } from "@/components/ServiceExplorer";

const rooms = [
  {
    name: "Kitchen",
    note: "Counters, sinks, fronts and the details around daily use.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85",
    alt: "Bright modern kitchen with clear counters",
    size: "large",
  },
  {
    name: "Bathrooms",
    note: "Fixtures, mirrors, touchpoints and a clean finish underfoot.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=85",
    alt: "Finished bathroom with clean tile and bright fixtures",
    size: "small",
  },
  {
    name: "Living spaces",
    note: "Accessible surfaces, floors and the rooms everyone shares.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
    alt: "Orderly contemporary living room",
    size: "small",
  },
  {
    name: "Workplaces",
    note: "Workstations, meeting rooms and the spaces clients see.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=85",
    alt: "Bright modern office with shared work tables",
    size: "large",
  },
];

export default function Home() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative isolate flex min-h-[calc(100svh-76px)] min-h-[720px] items-end overflow-hidden bg-[#202521] text-white">
        <Image
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2200&q=90"
          alt="A cleaning professional carefully tending to a home interior"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center scale-[1.02] transition-transform duration-1000"
        />
        
        {/* Soft, cinematic gradient overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#151916] via-[#1c201d]/75 to-[#0b3d91]/25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#171c19]/95 via-[#171c19]/70 to-transparent" />

        <div className="container relative z-10 w-full pb-12 pt-32 sm:pb-16 lg:pb-20">
          <AnimatedSection className="max-w-5xl">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c3a56f] animate-pulse" />
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--brass-light)]">
                Calgary · Alberta
              </p>
            </div>

            {/* Display Headline */}
            <h1 className="display mt-6 max-w-4xl text-5xl font-light tracking-tight sm:text-7xl lg:text-[88px] xl:text-[96px] leading-[0.95]">
              CLEANING,<br />
              <span className="font-medium text-white/90">REFINED.</span>
            </h1>

            {/* Action & Scope Bar */}
            <div className="mt-9 grid gap-6 border-t border-white/20 pt-6 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                A more considered clean for Calgary homes, workspaces and properties. Thoughtful scope, careful detail and a finish that lets the space feel ready again.
              </p>
              
              <div className="flex flex-wrap items-center gap-3.5">
                <Link 
                  href="/contact" 
                  className="button inline-flex items-center gap-2 rounded-lg border border-[#c3a56f] bg-[#c3a56f] px-6 py-3.5 text-sm font-medium text-[#1c201d] transition-all duration-300 hover:bg-[#d0b984] hover:shadow-lg hover:shadow-[#c3a56f]/20 active:scale-[0.98]"
                >
                  Get a Quote <ArrowRight size={15} />
                </Link>
                <Link 
                  href="#services" 
                  className="button button-light inline-flex items-center rounded-lg border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 active:scale-[0.98]"
                >
                  Explore Services
                </Link>
              </div>
            </div>

            {/* Quick Scope Tags */}
            <div className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
              {["Residential", "Commercial", "Property Care", "Calgary Only"].map((tag) => (
                <span 
                  key={tag} 
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-white/75 uppercase backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll link */}
        <a 
          href="#standard" 
          aria-label="Scroll to discover the standard"
          className="absolute bottom-8 right-8 hidden items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] font-semibold tracking-[0.14em] text-white/80 uppercase backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:text-white lg:flex"
        >
          Discover the standard <ArrowDown size={13} className="text-[#c3a56f]" />
        </a>
      </section>


      {/* ================= STANDARD SECTION ================= */}
      <AnimatedSection className="py-24 sm:py-28 lg:py-32" id="standard">
        <div className="container grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              The point of the work
            </p>
            <h2 className="display mt-4 max-w-2xl text-4xl font-normal leading-[1.12] sm:text-5xl lg:text-6xl text-[var(--ink)]">
              A clean space changes how a space feels.
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="max-w-lg text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              The difference is often found in the handoff: a kitchen ready for the next meal, an office that feels considered before the workday begins, or an empty home prepared for what comes next.
            </p>
            <Link 
              href="/about" 
              className="group mt-6 inline-flex w-fit items-center gap-2 border-b border-[var(--ink)] pb-1.5 text-sm font-medium text-[var(--ink)] transition-all hover:border-[var(--brass)] hover:text-[var(--brass)]"
            >
              The standard behind the name 
              <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </AnimatedSection>


      {/* ================= SERVICES COMPONENT ================= */}
      <ServiceExplorer />


      {/* ================= ROYAL STANDARD (DARK SECTION) ================= */}
      <section className="bg-[#222724] py-24 text-white sm:py-28 lg:py-32">
        <div className="container grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass-light)]">
              The Royal standard
            </p>
            <h2 className="display mt-4 max-w-lg text-4xl font-normal leading-[1.12] sm:text-5xl lg:text-[52px]">
              Care is visible in the details.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
              A clear scope and thoughtful finish matter more than a grand promise. The work should feel considered from the first room to the last.
            </p>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {[
              ["01", "DETAIL", "Edges, touchpoints and accessible areas often change the way a whole room reads."],
              ["02", "CONSISTENCY", "A documented scope makes recurring service easier to understand and plan."],
              ["03", "RESPECT", "Each home, workplace and rental has its own routines, access and priorities."],
              ["04", "FINISH", "The final pass is about a space that feels ready for its next use."],
            ].map(([number, title, description]) => (
              <article 
                className="group grid gap-4 py-7 transition-colors duration-300 sm:grid-cols-[80px_1fr] sm:gap-6 sm:py-8 lg:hover:bg-white/[0.02]" 
                key={number}
              >
                <span className="display text-3xl font-light text-[#c3a56f] sm:text-4xl transition-transform duration-300 group-hover:translate-x-1">
                  {number}
                </span>
                <div>
                  <h3 className="display text-2xl tracking-wide sm:text-3xl text-white">
                    {title}
                  </h3>
                  <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-white/65">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* ================= WHERE THE WORK HAPPENS ================= */}
      <section className="py-24 sm:py-28 lg:py-32">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-[1fr_.7fr] md:items-end">
            <div>
              <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
                Where the work happens
              </p>
              <h2 className="display mt-4 max-w-2xl text-4xl font-normal leading-[1.12] sm:text-5xl lg:text-6xl text-[var(--ink)]">
                Rooms that carry the day.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              Different surfaces ask for different attention. Your confirmed checklist reflects the rooms and finish that matter to your property.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rooms.map((room, index) => (
              <article 
                className={`group flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--line)] bg-white/40 p-4 transition-all duration-300 hover:border-[#c3a56f]/50 hover:shadow-md ${
                  room.size === "large" ? "sm:col-span-2" : ""
                }`} 
                key={room.name}
              >
                <div className={`relative overflow-hidden rounded-xl bg-neutral-100 ${
                  room.size === "large" ? "aspect-[16/9]" : "aspect-[4/3]"
                }`}>
                  <Image 
                    src={room.image} 
                    alt={room.alt} 
                    fill 
                    sizes={room.size === "large" ? "(max-width:640px) 100vw, 50vw" : "(max-width:640px) 100vw, 25vw"} 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>

                <div className="mt-4 flex items-start justify-between gap-4 border-t border-[var(--line)] pt-3.5">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-[var(--brass)] uppercase">
                      0{index + 1}
                    </span>
                    <h3 className="display mt-0.5 text-2xl font-normal text-[var(--ink)]">
                      {room.name}
                    </h3>
                  </div>
                  <p className="max-w-[210px] text-right text-xs leading-5 text-[var(--muted)]">
                    {room.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* ================= ROUTINE OR RESET (COMPARISON) ================= */}
      <section className="bg-[#e9e7df] py-24 sm:py-28 lg:py-32">
        <div className="container grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          <div>
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              Routine or reset
            </p>
            <h2 className="display mt-4 max-w-xl text-4xl font-normal leading-[1.12] sm:text-5xl lg:text-[50px] text-[var(--ink)]">
              Standard and deep cleaning do different work.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              Choose based on the property’s condition and the amount of detail you want included, not the name alone.
            </p>
          </div>

          <div className="rounded-2xl border border-[#c9c6bd] bg-white/70 p-6 shadow-sm backdrop-blur-md sm:p-8">
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_1fr_1fr] items-center border-b border-[#c9c6bd] pb-4">
              <span className="text-[11px] font-semibold tracking-wider text-[var(--muted)] uppercase">Scope</span>
              <h3 className="display text-xl sm:text-2xl text-[var(--ink)]">Standard</h3>
              <h3 className="display text-xl sm:text-2xl text-[var(--ink)]">Deep</h3>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-[#c9c6bd]/60">
              {[
                ["Best for", "Ongoing maintenance", "A fuller reset or accumulated detail"],
                ["Kitchen & bath", "Routine accessible surfaces", "More time for visible buildup and detail"],
                ["Edges & trim", "Accessible dusting as scoped", "Baseboards, doors and trim by agreement"],
                ["Appliances", "Exterior surfaces in the checklist", "Interiors available as selected add-ons"],
              ].map(([topic, standard, deep]) => (
                <div className="grid grid-cols-[1fr_1fr_1fr] items-start gap-3 py-4 sm:gap-4 sm:py-5" key={topic}>
                  <span className="text-xs font-semibold text-[var(--ink)]">{topic}</span>
                  <p className="text-xs leading-relaxed text-[var(--muted)] sm:text-[13px]">{standard}</p>
                  <p className="text-xs leading-relaxed text-[var(--muted)] sm:text-[13px]">{deep}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 border-t border-[#c9c6bd]/50 pt-3 text-[11px] leading-relaxed text-[var(--muted)]">
              * Final inclusions depend on the property and confirmed service checklist.
            </p>
          </div>
        </div>
      </section>


      {/* ================= BEFORE & AFTER SECTION ================= */}
      <section className="py-24 sm:py-28 lg:py-32">
        <div className="container grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:items-end lg:gap-14">
          <div>
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              One room at a time
            </p>
            <h2 className="display mt-4 text-4xl font-normal leading-[1.12] sm:text-5xl lg:text-6xl text-[var(--ink)]">
              The difference is in the finish.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              Every property begins differently. A clear scope puts attention where it will be useful.
            </p>
          </div>
          <BeforeAfter />
        </div>
      </section>


      {/* ================= PROCESS TIMELINE ================= */}
      <ProcessTimeline />


      {/* ================= SERVICE AREA SECTION ================= */}
      <section className="bg-[#e9e7df] py-24 sm:py-28 lg:py-32">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative min-h-[360px] overflow-hidden rounded-2xl shadow-lg sm:min-h-[480px]">
            <Image 
              src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=85" 
              alt="Calgary city buildings and streets" 
              fill 
              sizes="(max-width:1024px) 100vw, 50vw" 
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 rounded-md border border-white/20 bg-[#1c201d]/90 px-3.5 py-2 text-[10px] font-bold tracking-[0.14em] text-white uppercase backdrop-blur-md shadow-sm">
              Calgary, Alberta
            </span>
          </div>

          <div>
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              Our service area
            </p>
            <h2 className="display mt-4 max-w-xl text-4xl font-normal leading-[1.12] sm:text-5xl lg:text-[50px] text-[var(--ink)]">
              Built for the way Calgary lives.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              Condos, apartments, townhomes, detached homes, offices, rental properties and newly finished spaces each need a different plan. We currently accept Calgary addresses only; postal area and service scope are checked before a request can proceed.
            </p>

            <ul className="mt-7 grid gap-3 border-t border-[#c9c6bd] pt-6 text-xs font-medium sm:grid-cols-2 sm:text-sm">
              {[
                "Condos and apartments",
                "Townhomes and detached homes",
                "Workplaces and offices",
                "Rental and newly finished properties"
              ].map((space) => (
                <li key={space} className="flex items-center gap-2.5 rounded-lg border border-[#c9c6bd]/60 bg-white/50 p-2.5">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c3a56f]/20 text-[var(--brass)]">
                    <Check size={12} strokeWidth={2.5} />
                  </div>
                  <span className="text-[var(--ink)]">{space}</span>
                </li>
              ))}
            </ul>

            <Link 
              href="/service-areas" 
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)] transition-colors hover:text-[var(--brass)]"
            >
              Check Calgary service details 
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>


      {/* ================= FINAL CTA SECTION ================= */}
      <section className="relative isolate overflow-hidden bg-[#222724] py-24 text-white sm:py-28 lg:py-36">
        <Image 
          src="https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1800&q=85" 
          alt="Quiet, finished home interior" 
          fill 
          sizes="100vw" 
          className="-z-20 object-cover object-center" 
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#171c19]/95 via-[#171c19]/80 to-[#171c19]/90" />

        <div className="container">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c3a56f]" />
            <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--brass-light)]">
              Royal Cleaning Crew · Calgary
            </p>
          </div>

          <h2 className="display mt-6 max-w-4xl text-5xl font-light tracking-tight sm:text-7xl lg:text-[84px] leading-[0.95]">
            YOUR SPACE.<br />
            <span className="font-medium text-white/90">OUR STANDARD.</span>
          </h2>

          <div className="mt-9 flex flex-col gap-6 border-t border-white/20 pt-7 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              Tell us what needs attention. We’ll start with the property, the scope and the details that make the service yours.
            </p>
            <Link 
              href="/contact" 
              className="button inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-[#c3a56f] bg-[#c3a56f] px-7 py-3.5 text-sm font-medium text-[#1c201d] transition-all duration-300 hover:bg-[#d0b984] hover:shadow-lg hover:shadow-[#c3a56f]/20 active:scale-[0.98]"
            >
              Request an Estimate <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}