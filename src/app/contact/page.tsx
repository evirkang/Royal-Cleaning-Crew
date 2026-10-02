import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
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

export const metadata: Metadata = { title: "Request a Quote", description: "Tell Royal Cleaning Crew about your Calgary property and cleaning requirements." };

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

function matchOption<const Options extends readonly string[]>(options: Options, value?: string): Options[number] | undefined {
  return options.find((option) => option === value) as Options[number] | undefined;
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<ContactQuery> }) {
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
  const addOns = rawAddOns.split(",").filter((item): item is AddOn => quoteOptions.addOns.includes(item as AddOn));
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

  const completeEstimate = service && property && bedrooms && bathrooms && approximateSize && frequency
    ? estimatePrice({ property, bedrooms, bathrooms, approximateSize, cleaning: service, frequency, addOns })
    : null;
  const isCalgary = validateCalgaryLocation({
    address: query.address ?? "",
    city: query.city ?? "",
    province: query.province ?? "",
    postalCode: query.postalCode ?? "",
  }) === null;
  const initialEstimate = completeEstimate !== null && isCalgary ? estimatePriceRange(completeEstimate) : undefined;

  return <>
    <section className="bg-[#222724] text-white">
      <div className="container grid min-h-[390px] gap-7 py-10 lg:grid-cols-[.9fr_1.1fr] lg:items-stretch lg:py-12">
        <div className="flex flex-col justify-end py-6"><p className="eyebrow">Calgary · Alberta</p><h1 className="display mt-4 max-w-2xl text-6xl sm:text-7xl">Start with the details.</h1><p className="mt-5 max-w-lg text-sm leading-7 text-white/65">Tell us about the property, timing and priorities. A request is not a booking; scope and availability need to be confirmed.</p></div>
        <div className="relative min-h-[260px] lg:min-h-[330px]"><Image src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1400&q=85" alt="A cleaning professional working in a residential space" fill sizes="(max-width:1024px) 100vw,52vw" className="object-cover" priority/></div>
      </div>
    </section>
    <section className="py-14 sm:py-18 lg:py-20">
      <div className="container grid gap-9 lg:grid-cols-[.62fr_1.38fr] lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <p className="eyebrow">Before you send</p><h2 className="display mt-4 text-4xl">A useful request is a specific one.</h2>
          <ul className="mt-6 border-t border-[var(--line)]">{["Include a Calgary street address and postal code","Choose the closest service type and property details","Note access, parking, surface or timing requirements","Wait for scope and availability confirmation before making plans"].map((item)=><li className="flex gap-3 border-b border-[var(--line)] py-4 text-xs leading-5 text-[var(--muted)]" key={item}><span className="mt-0.5 text-[var(--brass)]">—</span>{item}</li>)}</ul>
          <div className="mt-7 border-l-2 border-[var(--brass)] pl-4"><p className="text-xs font-semibold">Online delivery status</p><p className="mt-2 text-xs leading-5 text-[var(--muted)]">Your request is only marked received after the configured delivery service accepts it. If that service is unavailable, the form tells you clearly.</p></div>
        </aside>
        <div className="min-w-0 border-t border-[var(--line)] pt-6"><div className="mb-6 flex items-end justify-between gap-4"><div><p className="eyebrow">Quote request</p><h2 className="display mt-2 text-4xl">Tell us about your space.</h2></div><ArrowRight className="mb-1 hidden text-[var(--brass)] sm:block" size={20}/></div><QuoteForm initialService={service} initialAddOns={addOns} initialValues={initialValues} initialEstimate={initialEstimate}/></div>
      </div>
    </section>
  </>;
}