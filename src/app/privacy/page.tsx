import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Royal Cleaning Crew website quote requests are handled.",
};

const sections = [
  ["Information in a quote request", "A request may include your name, email, phone number, Calgary service address, property type, requested service, timing, selected add-ons and notes you choose to provide. Please do not include payment details, access codes or other sensitive information in the message field."],
  ["How request details are used", "The information is used to assess the requested service, check the Calgary service area, review scope and availability, and respond to the inquiry. A request is not an appointment or booking confirmation."],
  ["Online delivery and service providers", "The website validates the request and forwards it only when a delivery endpoint has been configured. If delivery is not configured or the provider does not accept the request, the form reports that it was not sent. When a provider is connected, its identity, processing location, terms and privacy practices should be disclosed here before launch."],
  ["Retention and access", "The business must set and publish its retention period, access controls and process for responding to privacy requests before collecting live customer information. Do not submit information you do not want included in a service inquiry."],
  ["Cookies and analytics", "This website does not add an advertising or analytics integration as part of the current implementation. Hosting, security or future service providers may process technical request data under their own terms; any added tracking should be described here before it is enabled."],
  ["Questions or privacy requests", "No public privacy contact address has been supplied for this website. Before launch, Royal Cleaning Crew should publish a monitored contact method and confirm the business-specific practices in this policy."],
] as const;

export default function PrivacyPage() {
  return (
    <>
      <header className="bg-[#eeece5] py-12 sm:py-16">
        <div className="container grid gap-7 lg:grid-cols-[1fr_.7fr] lg:items-center">
          <div>
            <p className="eyebrow">Website information</p>
            <h1 className="display mt-4 max-w-4xl text-6xl sm:text-7xl">Privacy, clearly stated.</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)]">These notes describe the quote-request flow currently implemented on this site. Business-specific contact, retention and provider details must be confirmed before live collection begins.</p>
          </div>
          <div className="relative min-h-[190px] sm:min-h-[250px]">
            <Image src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&q=85" alt="Orderly home interior prepared for cleaning service" fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" priority />
          </div>
        </div>
      </header>
      <main className="py-14 sm:py-18">
        <div className="container grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <p className="eyebrow">On this page</p>
            <nav className="mt-4 grid gap-3 border-t border-[var(--line)] pt-4 text-xs" aria-label="Privacy sections">
              {sections.map(([title], index) => <a href={`#privacy-${index}`} key={title}>{title}</a>)}
            </nav>
          </aside>
          <article className="max-w-3xl">
            {sections.map(([title, copy], index) => (
              <section className="mb-9 scroll-mt-28 border-t border-[var(--line)] pt-5 last:mb-0" id={`privacy-${index}`} key={title}>
                <p className="eyebrow">Section 0{index + 1}</p>
                <h2 className="display mt-2 text-3xl sm:text-4xl">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{copy}</p>
              </section>
            ))}
            <p className="mt-10 border-t border-[var(--line)] pt-5 text-xs leading-6 text-[var(--muted)]">For service-request questions, use the <Link className="underline" href="/contact">quote form</Link>. It will not report a request as received unless the configured delivery service accepts it.</p>
          </article>
        </div>
      </main>
    </>
  );
}