import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

const companyLinks = [
  ["About", "/about"],
  ["Service Areas", "/service-areas"],
  ["How It Works", "/process"],
  ["Frequently Asked Questions", "/faq"],
  ["Contact", "/contact"],
] as const;

const serviceLinks = [
  ["Residential Cleaning", "/services/residential-cleaning"],
  ["Deep Cleaning", "/services/deep-cleaning"],
  ["Move-In / Move-Out", "/services/move-in-move-out"],
  ["Short-Term Rental", "/services/airbnb-cleaning"],
  ["Commercial Cleaning", "/services/commercial-cleaning"],
  ["Janitorial Services", "/services/janitorial-services"],
  ["Store Cleaning", "/services/store-cleaning"],
  ["Building Cleaning", "/services/building-cleaning"],
  ["Specialty Cleaning", "/services/specialty-cleaning"],
] as const;

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/15 bg-[#151916] text-white">
      {/* Subtle Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#c3a56f]/5 blur-3xl"
      />

      {/* ================= MAIN FOOTER CONTENT ================= */}
      <div className="container py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.1fr] lg:gap-12 xl:gap-16">
          
          {/* Column 1: Brand & Illuminated Logo Plinth */}
          <div className="flex flex-col justify-between">
            <div>
              <Link href="/" className="group inline-block" aria-label="Royal Cleaning Crew home">
                <div className="relative inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 shadow-md ring-1 ring-white/40 transition-all duration-300 group-hover:scale-105 group-hover:ring-2 group-hover:ring-[#c3a56f] group-hover:shadow-lg group-hover:shadow-[#c3a56f]/20">
                  <div className="relative h-13 w-32 sm:h-14 sm:w-36">
                    <Image
                      src="/logo.png"
                      alt="Royal Cleaning Crew Logo"
                      fill
                      sizes="(max-width: 640px) 140px, 160px"
                      className="object-contain object-center"
                    />
                  </div>
                </div>
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
                A considered standard of cleaning for homes, workplaces and properties across Calgary.
              </p>
            </div>

            <div className="mt-8">
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/80 backdrop-blur-sm">
                <MapPin size={13} className="text-[#c3a56f]" />
                <span>{siteConfig.location}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Explore Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass-light)]">
              Explore
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {companyLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1.5 text-white/75 transition-all duration-200 hover:translate-x-1 hover:text-[#c3a56f]"
                  >
                    <span className="h-1 w-1 rounded-full bg-white/30 transition-colors group-hover:bg-[#c3a56f]" />
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/pricing"
                  className="group inline-flex items-center gap-1.5 text-white/75 transition-all duration-200 hover:translate-x-1 hover:text-[#c3a56f]"
                >
                  <span className="h-1 w-1 rounded-full bg-white/30 transition-colors group-hover:bg-[#c3a56f]" />
                  Estimate
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass-light)]">
              Services
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {serviceLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1.5 text-white/75 transition-all duration-200 hover:translate-x-1 hover:text-[#c3a56f]"
                  >
                    <span className="h-1 w-1 rounded-full bg-white/30 transition-colors group-hover:bg-[#c3a56f]" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Contact / Quote Card */}
          <div>
            <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-sm backdrop-blur-sm sm:p-7">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-[var(--brass-light)] uppercase">
                  <Sparkles size={11} className="text-[#c3a56f]" />
                  Start a conversation
                </div>

                <h3 className="display mt-4 text-2xl font-normal text-white">
                  Tell us about your space.
                </h3>

                <p className="mt-2.5 text-xs leading-relaxed text-white/65">
                  Share the space, the timing and the details that matter. We&apos;ll help shape the right scope.
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <Link
                  href="/contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#c3a56f] bg-[#c3a56f] py-3.5 text-xs font-semibold uppercase tracking-wider !text-[#111412] shadow-md transition-all duration-300 hover:bg-[#d8c08a] hover:shadow-lg hover:shadow-[#c3a56f]/25 active:scale-[0.98]"
                >
                  Request a quote 
                  <ArrowUpRight
                    size={15}
                    className="!text-[#111412] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-white/10 bg-[#101311] py-8 text-xs text-white/60">
        <div className="container flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Royal Cleaning Crew. All rights reserved.</p>
          <p className="text-white/45">Calgary, Alberta, Canada</p>

          <div className="flex items-center gap-6">
            <Link 
              href="/privacy" 
              className="text-white/60 transition-colors hover:text-[#c3a56f]"
            >
              Privacy
            </Link>
            <span className="text-white/20" aria-hidden="true">·</span>
            <Link 
              href="/terms" 
              className="text-white/60 transition-colors hover:text-[#c3a56f]"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}