import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Info } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import {
  estimatePrice,
  estimatePriceRange,
  quoteOptions,
  type AddOn,
  type ApproximateSize,
  type BathroomCount,
  type BedroomCount,
  type CleaningType,
  type Frequency,
  type PropertyType,
} from "@/config/pricing";
import { validateCalgaryLocation } from "@/config/service-area";
import type { QuoteFormInput } from "@/lib/quote-schema";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Tell Royal Cleaning Crew about your Calgary property and cleaning requirements.",
};

type ContactQuery = {
  service?: string;
  property?: string;
  bedrooms?: string;
  bathrooms?: string;
  approximateSize?: string;
  frequency?: string;
  addOns?: string | string[];
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
};

const serviceAliases: Record<string, CleaningType> = {
  "Listing Pre-Sale Cleaning": "Listing / Pre-Sale Cleaning",
  "Listing & Pre-Sale Cleaning": "Listing / Pre-Sale Cleaning",
  "Commercial Cleaning": "Commercial / Custom Quote",
  "Residential Cleaning": "Standard Cleaning",
  "Move-In / Move-Out": "Move-In Cleaning",
  "Short-Term Rental Cleaning": "Airbnb Turnover",
};

function matchOption<const Options extends readonly string[]>(
  options: Options,
  value?: string
): Options[number] | undefined {
  return options.find((option) => option === value) as Options[number] | undefined;
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<ContactQuery>;
}) {
  const query = await searchParams;
  const requestedService = query.service;
  const service = requestedService
    ? serviceAliases[requestedService] ?? matchOption(quoteOptions.cleaningTypes, requestedService)
    : undefined;
  const property = matchOption(quoteOptions.propertyTypes, query.property);
  const bedrooms = matchOption(quoteOptions.bedrooms, query.bedrooms);
  const bathrooms = matchOption(quoteOptions.bathrooms, query.bathrooms);
  const approximateSize = matchOption(quoteOptions.approximateSizes, query.approximateSize);
  const frequency = matchOption(quoteOptions.frequencies, query.frequency);
  const rawAddOns = Array.isArray(query.addOns) ? query.addOns.join(",") : query.addOns ?? "";
  const addOns = rawAddOns
    .split(",")
    .filter((item): item is AddOn => quoteOptions.addOns.includes(item as AddOn));

  const initialValues: Partial<QuoteFormInput> = {
    ...(service ? { service } : {}),
    ...(property ? { property: property as PropertyType } : {}),
    ...(bedrooms ? { bedrooms: bedrooms as BedroomCount } : {}),
    ...(bathrooms ? { bathrooms: bathrooms as BathroomCount } : {}),
    ...(approximateSize ? { approximateSize: approximateSize as ApproximateSize } : {}),
    ...(frequency ? { frequency: frequency as Frequency } : {}),
    ...(query.address ? { address: query.address } : {}),
    ...(query.city ? { city: query.city } : {}),
    ...(query.province ? { province: query.province } : {}),
    ...(query.postalCode ? { postalCode: query.postalCode } : {}),
    ...(addOns.length ? { addOns } : {}),
  };

  const completeEstimate =
    service && property && bedrooms && bathrooms && approximateSize && frequency
      ? estimatePrice({ property, bedrooms, bathrooms, approximateSize, cleaning: service, frequency, addOns })
      : null;

  const isCalgary =
    validateCalgaryLocation({
      address: query.address ?? "",
      city: query.city ?? "",
      province: query.province ?? "",
      postalCode: query.postalCode ?? "",
    }) === null;

  const initialEstimate =
    completeEstimate !== null && isCalgary ? estimatePriceRange(completeEstimate) : undefined;

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative isolate overflow-hidden bg-[#222724] text-white">
        <div className="container grid min-h-[460px] items-center gap-10 py-16 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-20">
          
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c3a56f]" />
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--brass-light)]">
                Calgary · Alberta
              </p>
            </div>

            <h1 className="display mt-6 max-w-xl text-4xl font-light tracking-tight sm:text-6xl lg:text-[68px] leading-[1.05]">
              Start with the <br className="hidden sm:inline" />
              <span className="font-medium text-white/95">details.</span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              Tell us about the property, timing and priorities. A request is not a booking; scope and availability need to be confirmed.
            </p>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:aspect-auto lg:h-[320px]">
            <Image
              src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1400&q=85"
              alt="A cleaning professional working in a residential space"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

        </div>
      </section>


      {/* ================= FORM & GUIDELINES SECTION ================= */}
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          
          {/* Left Column: Guidelines & Status */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-2xl border border-[var(--line)] bg-white/60 p-6 shadow-sm backdrop-blur-sm sm:p-8">
              <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
                Before you send
              </p>
              
              <h2 className="display mt-3 text-2xl font-normal leading-snug sm:text-3xl text-[var(--ink)]">
                A useful request is a specific one.
              </h2>

              <ul className="mt-6 divide-y divide-[var(--line)] border-t border-[var(--line)]">
                {[
                  "Include a Calgary street address and postal code",
                  "Choose the closest service type and property details",
                  "Note access, parking, surface or timing requirements",
                  "Wait for scope and availability confirmation before making plans",
                ].map((item) => (
                  <li 
                    className="flex items-start gap-3 py-3.5 text-xs font-medium leading-relaxed text-[var(--muted)] sm:text-[13px]" 
                    key={item}
                  >
                    <span className="font-bold text-[var(--brass)] select-none">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Status Note Box */}
              <div className="mt-8 rounded-xl border border-[var(--brass)]/30 bg-[#eeece5]/70 p-4.5 sm:p-5">
                <div className="flex items-center gap-2">
                  <Info size={15} className="text-[var(--brass)]" />
                  <p className="text-xs font-semibold text-[var(--ink)]">Online delivery status</p>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
                  Your request is only marked received after the configured delivery service accepts it. If that service is unavailable, the form tells you clearly.
                </p>
              </div>
            </div>
          </aside>

          {/* Right Column: Quote Form Container */}
          <div className="min-w-0">
            <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--line)] pb-6">
                <div>
                  <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
                    Quote request
                  </p>
                  <h2 className="display mt-2 text-3xl font-normal text-[var(--ink)] sm:text-4xl">
                    Tell us about your space.
                  </h2>
                </div>
                <ArrowRight className="mb-1 hidden text-[var(--brass)] sm:block" size={24} />
              </div>

              <QuoteForm
                initialService={service}
                initialAddOns={addOns}
                initialValues={initialValues}
                initialEstimate={initialEstimate}
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}