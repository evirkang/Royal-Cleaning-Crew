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
      <section className="relative isolate flex min-h-[min(780px,calc(100svh-82px))] items-end overflow-hidden bg-[#202521] text-white">
        <Image
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2200&q=90"
          alt="A cleaning professional carefully tending to a home interior"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#171c19]/85 via-[#171c19]/48 to-[#171c19]/10" />
        <div className="container w-full pb-9 pt-28 sm:pb-14 lg:pb-16">
          <AnimatedSection className="max-w-5xl">
            <p className="eyebrow !text-[#d1b77f]">Calgary · Alberta</p>
            <h1 className="display mt-6 max-w-4xl text-[64px] leading-[.88] sm:text-[88px] lg:text-[124px]">CLEANING,<br />REFINED.</h1>
            <div className="mt-8 grid gap-7 border-t border-white/35 pt-5 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-xl text-sm leading-7 text-white/78 sm:text-[15px]">A more considered clean for Calgary homes, workspaces and properties. Thoughtful scope, careful detail and a finish that lets the space feel ready again.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="button border-[#c3a56f] bg-[#c3a56f] text-[#1c201d] hover:bg-[#d0b984]">Get a Quote <ArrowRight size={15} /></Link>
                <Link href="#services" className="button button-light">Explore Services</Link>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[9px] font-bold tracking-[.12em] text-white/70 uppercase">
              <span>Residential</span><span>Commercial</span><span>Property Care</span><span>Calgary Only</span>
            </div>
          </AnimatedSection>
        </div>
        <a href="#standard" className="absolute bottom-7 right-7 hidden items-center gap-3 text-[9px] font-bold tracking-[.12em] text-white/70 uppercase lg:flex">Discover the standard <ArrowDown size={14} /></a>
      </section>

      <AnimatedSection className="py-20 sm:py-24 lg:py-32" id="standard">
        <div className="container grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
          <div>
            <p className="eyebrow">The point of the work</p>
            <h2 className="display mt-5 max-w-4xl text-5xl sm:text-6xl lg:text-[76px]">A clean space changes how a space feels.</h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="max-w-xl text-sm leading-7 text-[var(--muted)]">The difference is often found in the handoff: a kitchen ready for the next meal, an office that feels considered before the workday begins, or an empty home prepared for what comes next.</p>
            <Link href="/about" className="text-link mt-6 w-fit border-b border-[var(--ink)] pb-2">The standard behind the name <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </AnimatedSection>

      <ServiceExplorer />

      <section className="bg-[#222724] py-20 text-white sm:py-24 lg:py-28">
        <div className="container grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="eyebrow">The Royal standard</p>
            <h2 className="display mt-4 max-w-lg text-5xl sm:text-6xl">Care is visible in the details.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">A clear scope and thoughtful finish matter more than a grand promise. The work should feel considered from the first room to the last.</p>
          </div>
          <div className="border-t border-white/20">
            {[
              ["01", "DETAIL", "Edges, touchpoints and accessible areas often change the way a whole room reads."],
              ["02", "CONSISTENCY", "A documented scope makes recurring service easier to understand and plan."],
              ["03", "RESPECT", "Each home, workplace and rental has its own routines, access and priorities."],
              ["04", "FINISH", "The final pass is about a space that feels ready for its next use."],
            ].map(([number, title, description]) => (
              <article className="grid gap-4 border-b border-white/20 py-6 sm:grid-cols-[76px_1fr] sm:gap-6 sm:py-7" key={number}>
                <span className="display text-4xl text-[#c3a56f]">{number}</span>
                <div><h3 className="display text-3xl sm:text-4xl">{title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-white/60">{description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-[1fr_.7fr] md:items-end">
            <div><p className="eyebrow">Where the work happens</p><h2 className="display mt-4 max-w-3xl text-5xl sm:text-6xl">Rooms that carry the day.</h2></div>
            <p className="max-w-md text-sm leading-7 text-[var(--muted)]">Different surfaces ask for different attention. Your confirmed checklist reflects the rooms and finish that matter to your property.</p>
          </div>
          <div className="mt-11 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {rooms.map((room, index) => (
              <article className={room.size === "large" ? "sm:col-span-2" : ""} key={room.name}>
                <div className={`image-wrap relative ${room.size === "large" ? "aspect-[1.65]" : "aspect-[1.2]"}`}>
                  <Image src={room.image} alt={room.alt} fill sizes={room.size === "large" ? "(max-width:640px) 100vw, 50vw" : "(max-width:640px) 100vw, 25vw"} className="object-cover" />
                </div>
                <div className="mt-3 flex items-start justify-between gap-4 border-t border-[var(--line)] pt-3">
                  <div><span className="text-[9px] font-bold text-[var(--brass)]">0{index + 1}</span><h3 className="display mt-1 text-3xl">{room.name}</h3></div>
                  <p className="max-w-[220px] pt-1 text-xs leading-5 text-[var(--muted)]">{room.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e9e7df] py-20 sm:py-24 lg:py-28">
        <div className="container grid gap-9 lg:grid-cols-[.74fr_1.26fr] lg:gap-16">
          <div><p className="eyebrow">Routine or reset</p><h2 className="display mt-4 max-w-xl text-5xl sm:text-6xl">Standard and deep cleaning do different work.</h2><p className="mt-5 max-w-md text-sm leading-7 text-[var(--muted)]">Choose based on the property’s condition and the amount of detail you want included, not the name alone.</p></div>
          <div className="border-t border-[#c9c6bd]">
            <div className="grid gap-4 border-b border-[#c9c6bd] py-5 sm:grid-cols-[1fr_1fr_1fr]">
              <span className="eyebrow">Scope</span><h3 className="display text-3xl">Standard</h3><h3 className="display text-3xl">Deep</h3>
            </div>
            {[
              ["Best for", "Ongoing maintenance", "A fuller reset or accumulated detail"],
              ["Kitchen & bath", "Routine accessible surfaces", "More time for visible buildup and detail"],
              ["Edges & trim", "Accessible dusting as scoped", "Baseboards, doors and trim by agreement"],
              ["Appliances", "Exterior surfaces in the checklist", "Interiors available as selected add-ons"],
            ].map(([topic, standard, deep]) => (
              <div className="grid gap-2 border-b border-[#c9c6bd] py-5 sm:grid-cols-[1fr_1fr_1fr] sm:gap-4" key={topic}>
                <span className="text-xs font-bold">{topic}</span><p className="text-xs leading-5 text-[var(--muted)]">{standard}</p><p className="text-xs leading-5 text-[var(--muted)]">{deep}</p>
              </div>
            ))}
            <p className="mt-4 text-[10px] leading-5 text-[var(--muted)]">Final inclusions depend on the property and confirmed service checklist.</p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <div className="container grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
          <div><p className="eyebrow">One room at a time</p><h2 className="display mt-4 text-5xl sm:text-6xl">The difference is in the finish.</h2><p className="mt-5 max-w-md text-sm leading-7 text-[var(--muted)]">Every property begins differently. A clear scope puts attention where it will be useful.</p></div>
          <BeforeAfter />
        </div>
      </section>

      <ProcessTimeline />

      <section className="bg-[#e9e7df] py-20 sm:py-24 lg:py-28">
        <div className="container grid gap-9 lg:grid-cols-2 lg:gap-14">
          <div className="relative min-h-[330px] sm:min-h-[460px]">
            <Image src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=85" alt="Calgary city buildings and streets" fill sizes="(max-width:1024px) 100vw,50vw" className="object-cover" />
            <span className="absolute bottom-4 left-4 bg-[#1c201d]/80 px-3 py-2 text-[9px] font-bold tracking-[.1em] text-white uppercase">Calgary, Alberta</span>
          </div>
          <div className="self-center">
            <p className="eyebrow">Our service area</p><h2 className="display mt-4 max-w-xl text-5xl sm:text-6xl">Built for the way Calgary lives.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)]">Condos, apartments, townhomes, detached homes, offices, rental properties and newly finished spaces each need a different plan. We currently accept Calgary addresses only; postal area and service scope are checked before a request can proceed.</p>
            <ul className="mt-6 grid gap-3 border-t border-[#c9c6bd] pt-5 text-xs sm:grid-cols-2">
              {["Condos and apartments", "Townhomes and detached homes", "Workplaces and offices", "Rental and newly finished properties"].map((space) => <li className="flex items-center gap-2" key={space}><Check size={14} className="text-[var(--brass)]" />{space}</li>)}
            </ul>
            <Link href="/service-areas" className="text-link mt-7">Check Calgary service details <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#222724] py-20 text-white sm:py-24 lg:py-32">
        <Image src="https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1800&q=85" alt="Quiet, finished home interior" fill sizes="100vw" className="-z-20 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[#171c19]/75" />
        <div className="container">
          <p className="eyebrow !text-[#d1b77f]">Royal Cleaning Crew · Calgary</p>
          <h2 className="display mt-5 max-w-5xl text-5xl leading-[.9] sm:text-7xl lg:text-[100px]">YOUR SPACE.<br />OUR STANDARD.</h2>
          <div className="mt-7 flex flex-col gap-6 border-t border-white/30 pt-5 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-lg text-sm leading-7 text-white/70">Tell us what needs attention. We’ll start with the property, the scope and the details that make the service yours.</p>
            <Link href="/contact" className="button border-[#c3a56f] bg-[#c3a56f] text-[#1c201d] hover:bg-[#d0b984]">Request an Estimate <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}