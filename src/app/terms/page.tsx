import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms for using the Royal Cleaning Crew website and requesting cleaning service.",
};

const terms = [
  ["Website and service area", "This website describes cleaning services currently offered for Calgary, Alberta. Sending a request for a different location does not expand the service area or create an obligation to provide service."],
  ["Requests, estimates and bookings", "A quote form submission is an inquiry only. It is not a confirmed booking, service agreement, price commitment or confirmation of availability. A request is treated as received only when the configured delivery service accepts it."],
  ["Scope and final pricing", "Any estimate range displayed after approved rates are configured is indicative only. Final scope and pricing depend on property condition, access, selected tasks and other confirmed requirements. The business and customer should agree the complete scope and price before service begins."],
  ["Property information and access", "The customer should provide accurate property and access details, identify delicate surfaces or areas to avoid, and share relevant building requirements. Site readiness and safe access may affect whether requested work can proceed."],
  ["Changes and service policies", "No cancellation, rescheduling, payment, damage or satisfaction policy has been provided for this site. Those terms must be supplied by the business and agreed with the customer before a booking is confirmed; this page does not invent them."],
  ["Third-party services", "The quote form may forward request details to a delivery provider configured by the business. The provider’s terms and privacy practices apply to its processing and should be identified in the website privacy information."],
] as const;

export default function TermsPage() {
  return (
    <>
      <header className="bg-[#222724] py-12 text-white sm:py-16">
        <div className="container grid gap-7 lg:grid-cols-[1fr_.7fr] lg:items-center">
          <div>
            <p className="eyebrow">Service information</p>
            <h1 className="display mt-4 max-w-4xl text-6xl sm:text-7xl">Terms for a clear request.</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65">These website terms explain what a request means and what still needs to be confirmed directly before cleaning service is booked.</p>
          </div>
          <div className="relative min-h-[190px] sm:min-h-[250px]">
            <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85" alt="Clean, empty modern home interior" fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" priority />
          </div>
        </div>
      </header>
      <main className="py-14 sm:py-18">
        <div className="container grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <p className="eyebrow">Sections</p>
            <nav className="mt-4 grid gap-3 border-t border-[var(--line)] pt-4 text-xs" aria-label="Terms sections">
              {terms.map(([title], index) => <a href={`#terms-${index}`} key={title}>{title}</a>)}
            </nav>
          </aside>
          <article className="max-w-3xl">
            {terms.map(([title, copy], index) => (
              <section className="mb-9 scroll-mt-28 border-t border-[var(--line)] pt-5 last:mb-0" id={`terms-${index}`} key={title}>
                <p className="eyebrow">Section 0{index + 1}</p>
                <h2 className="display mt-2 text-3xl sm:text-4xl">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{copy}</p>
              </section>
            ))}
            <p className="mt-10 border-t border-[var(--line)] pt-5 text-xs leading-6 text-[var(--muted)]">These website notes do not replace a service agreement. Review the scope, price and applicable business policies before confirming an appointment. For a request, visit <Link className="underline" href="/contact">Contact</Link>.</p>
          </article>
        </div>
      </main>
    </>
  );
}