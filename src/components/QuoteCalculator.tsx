"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  House,
  MapPin,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  estimatePrice,
  estimatePriceRange,
  pricing,
  quoteOptions,
  type AddOn,
  type ApproximateSize,
  type BathroomCount,
  type BedroomCount,
  type CleaningType,
  type EstimateInput,
  type Frequency,
  type PropertyType,
} from "@/config/pricing";
import {
  normalizeCanadianPostalCode,
  serviceLocationErrorMessage,
  validateCalgaryLocation,
} from "@/config/service-area";

const steps = ["Property", "Size", "Service", "Frequency", "Add-ons", "Location"] as const;
const propertyIcons = { Apartment: Building2, Condo: Building2, Townhouse: House, House, Office: Building2, Other: Sparkles };
const labelClass = "mb-2 block text-[10px] font-bold tracking-[.09em] text-[var(--ink)] uppercase";

type CalculatorValues = EstimateInput & {
  address: string;
  city: string;
  province: string;
  postalCode: string;
};

const initialValues: CalculatorValues = {
  property: "Condo",
  bedrooms: "1",
  bathrooms: "1",
  approximateSize: "Not sure",
  cleaning: "Standard Cleaning",
  frequency: "One Time",
  addOns: [],
  address: "",
  city: "Calgary",
  province: "AB",
  postalCode: "",
};

function CurrencyRange({ range }: { range: [number, number] }) {
  return <span>${range[0].toLocaleString("en-CA")} – ${range[1].toLocaleString("en-CA")} <span className="font-sans text-[10px] font-semibold tracking-[.1em]">CAD</span></span>;
}

export function QuoteCalculator() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [stepError, setStepError] = useState("");
  const [showResult, setShowResult] = useState(false);
  const reduceMotion = useReducedMotion();
  const estimate = estimatePrice(values);
  const range = estimate === null ? null : estimatePriceRange(estimate);

  const update = <Key extends keyof CalculatorValues>(field: Key, value: CalculatorValues[Key]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setStepError("");
  };

  const changeProperty = (property: PropertyType) => {
    setValues((current) => ({
      ...current,
      property,
      bedrooms: property === "Office" ? "Not applicable" : current.bedrooms === "Not applicable" ? "1" : current.bedrooms,
      bathrooms: property === "Office" ? "Not applicable" : current.bathrooms === "Not applicable" ? "1" : current.bathrooms,
      cleaning: property === "Office" ? "Commercial / Custom Quote" : current.cleaning === "Commercial / Custom Quote" ? "Standard Cleaning" : current.cleaning,
    }));
    setStepError("");
  };

  const locationError = validateCalgaryLocation(values);

  const continueStep = () => {
    setStepError("");
    if (step === steps.length - 1) {
      if (locationError) {
        setStepError(serviceLocationErrorMessage(locationError));
        return;
      }
      setShowResult(true);
      return;
    }
    setStep((current) => current + 1);
  };

  const toggleAddOn = (addOn: AddOn) => {
    const selected = values.addOns.includes(addOn);
    update("addOns", selected ? values.addOns.filter((item) => item !== addOn) : [...values.addOns, addOn]);
  };

  const quoteQuery = new URLSearchParams({
    service: values.cleaning,
    property: values.property,
    bedrooms: values.bedrooms,
    bathrooms: values.bathrooms,
    approximateSize: values.approximateSize,
    frequency: values.frequency,
    addOns: values.addOns.join(","),
    address: values.address,
    city: values.city,
    province: values.province,
    postalCode: values.postalCode,
  });

  const optionButtons = (field: "cleaning" | "frequency", choices: readonly string[]) => (
    <div className="grid gap-2 sm:grid-cols-2">
      {choices.map((choice) => {
        const selected = values[field] === choice;
        return (
          <button
            type="button"
            key={choice}
            onClick={() => field === "cleaning"
              ? update("cleaning", choice as CleaningType)
              : update("frequency", choice as Frequency)}
            aria-pressed={selected}
            className="pricing-option flex min-h-[58px] items-center justify-between gap-3 border px-4 text-left text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brass)]"
          >
            {choice}{selected && <Check size={16} />}
          </button>
        );
      })}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <p className="eyebrow">Step 01 · Property</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">What are we cleaning?</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Choose the property type that best describes the space.</p>
            <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {quoteOptions.propertyTypes.map((property) => {
                const Icon = propertyIcons[property];
                const selected = values.property === property;
                return (
                  <button
                    type="button"
                    key={property}
                    onClick={() => changeProperty(property)}
                    aria-pressed={selected}
                    className="pricing-option flex min-h-[84px] items-center gap-4 border px-4 text-left"
                  >
                    <Icon size={20} strokeWidth={1.5} className={selected ? "text-[var(--brass)]" : "text-[var(--muted)]"} />
                    <span className="text-sm font-semibold">{property}</span>
                    {selected && <Check className="ml-auto text-[var(--brass)]" size={16} />}
                  </button>
                );
              })}
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <p className="eyebrow">Step 02 · Size</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">A little more about the space.</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Bedrooms and bathrooms help establish the work. Approximate size refines the range.</p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label><span className={labelClass}>Bedrooms</span><select className="field" value={values.bedrooms} onChange={(event) => update("bedrooms", event.target.value as BedroomCount)}>{quoteOptions.bedrooms.map((value) => <option key={value}>{value}</option>)}</select></label>
              <label><span className={labelClass}>Bathrooms</span><select className="field" value={values.bathrooms} onChange={(event) => update("bathrooms", event.target.value as BathroomCount)}>{quoteOptions.bathrooms.map((value) => <option key={value}>{value}</option>)}</select></label>
              <label className="sm:col-span-2"><span className={labelClass}>Approximate square footage</span><select className="field" value={values.approximateSize} onChange={(event) => update("approximateSize", event.target.value as ApproximateSize)}>{quoteOptions.approximateSizes.map((value) => <option key={value}>{value}</option>)}</select></label>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <p className="eyebrow">Step 03 · Service</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">What kind of clean do you need?</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Commercial, post-construction and unlisted details are scoped individually.</p>
            <div className="mt-7">{optionButtons("cleaning", quoteOptions.cleaningTypes)}</div>
          </div>
        );
      case 3:
        return (
          <div>
            <p className="eyebrow">Step 04 · Frequency</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">How often should we plan for?</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Recurring frequencies show an estimated per-visit range; final availability is confirmed separately.</p>
            <div className="mt-7">{optionButtons("frequency", quoteOptions.frequencies)}</div>
          </div>
        );
      case 4:
        return (
          <div>
            <p className="eyebrow">Step 05 · Add-ons</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">Any extra details?</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Choose what should be included in your estimate.</p>
            <div className="mt-7 grid gap-2 sm:grid-cols-2">
              {quoteOptions.addOns.map((addOn) => {
                const selected = values.addOns.includes(addOn);
                const price = pricing.rates.addOns[addOn];
                return (
                  <button
                    type="button"
                    key={addOn}
                    aria-pressed={selected}
                    onClick={() => toggleAddOn(addOn)}
                    className="pricing-option flex min-h-[58px] items-center justify-between gap-3 border px-4 text-left text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brass)]"
                  >
                    <span>{addOn}<small className="mt-1 block text-[10px] text-[var(--muted)]">{price === null ? "Custom scope" : `+$${price} CAD`}</small></span>
                    {selected && <Check size={16} />}
                  </button>
                );
              })}
            </div>
          </div>
        );
      default:
        return (
          <div>
            <p className="eyebrow">Step 06 · Calgary location</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">Where is the property?</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">We currently serve Calgary. Confirm the street address and postal area to see your estimate.</p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="block sm:col-span-2"><span className={labelClass}>Street address</span><input className="field" autoComplete="street-address" value={values.address} onChange={(event) => update("address", event.target.value)} placeholder="Street number and street name" /></label>
              <label className="block"><span className={labelClass}>City</span><input className="field" autoComplete="address-level2" value={values.city} onChange={(event) => update("city", event.target.value)} /></label>
              <label><span className={labelClass}>Province</span><select className="field" autoComplete="address-level1" value={values.province} onChange={(event) => update("province", event.target.value)}><option value="AB">Alberta (AB)</option><option value="BC">British Columbia (BC)</option><option value="ON">Ontario (ON)</option><option value="Other">Other</option></select></label>
              <label className="block sm:col-span-2"><span className={labelClass}>Canadian postal code</span><input className="field uppercase" autoComplete="postal-code" value={values.postalCode} onChange={(event) => update("postalCode", normalizeCanadianPostalCode(event.target.value))} placeholder="T2P 0A1" /></label>
            </div>
          </div>
        );
    }
  };

  const resetEstimate = () => {
    setValues(initialValues);
    setStep(0);
    setShowResult(false);
    setStepError("");
  };

  return (
    <div className="quote-calculator grid border border-[var(--line)] bg-[var(--white)] lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 p-5 sm:p-8 lg:p-10">
        <div className="mb-9">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] font-bold tracking-[.1em] text-[var(--muted)] uppercase">Live cleaning estimator</p>
            <span className="text-xs text-[var(--muted)]">{showResult ? "Estimate ready" : `${String(step + 1).padStart(2, "0")} / 06`}</span>
          </div>
          <div className="mt-3 grid grid-cols-6 gap-1" aria-hidden="true">
            {steps.map((label, index) => <span className={`h-[3px] transition-colors ${index <= (showResult ? steps.length - 1 : step) ? "bg-[var(--brass)]" : "bg-[var(--line)]"}`} key={label} />)}
          </div>
          <div className="mt-2 hidden justify-between text-[9px] text-[var(--muted)] md:flex">{steps.map((label) => <span key={label}>{label}</span>)}</div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={showResult ? "result" : step}
            initial={reduceMotion ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {showResult ? (
              <section aria-live="polite">
                <p className="eyebrow">Your estimated cleaning price</p>
                {range ? <h2 className="display mt-3 text-4xl sm:text-5xl"><CurrencyRange range={range} /></h2> : <h2 className="display mt-3 text-4xl sm:text-5xl">Custom quote required.</h2>}
                <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)]">Final pricing may vary based on property condition, scope and confirmed service requirements.</p>
                <dl className="mt-7 grid gap-x-6 border-t border-[var(--line)] sm:grid-cols-2">
                  {[
                    ["Service", values.cleaning],
                    ["Property", values.property],
                    ["Bedrooms", values.bedrooms],
                    ["Bathrooms", values.bathrooms],
                    ["Frequency", values.frequency],
                    ["Approx. size", values.approximateSize],
                    ["Add-ons", values.addOns.length ? values.addOns.join(", ") : "None"],
                    ["Calgary postal code", values.postalCode],
                  ].map(([term, description]) => <div className="flex min-h-12 items-start justify-between gap-3 border-b border-[var(--line)] py-3 text-xs" key={term}><dt className="shrink-0 text-[var(--muted)]">{term}</dt><dd className="max-w-[65%] text-right font-semibold">{description}</dd></div>)}
                </dl>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={`/contact?${quoteQuery.toString()}`} className="button button-dark">Request This Quote <ArrowRight size={15} /></Link>
                  <button type="button" className="button button-outline" onClick={() => { setShowResult(false); setStep(0); setStepError(""); }}><ArrowLeft size={15} /> Edit Estimate</button>
                  <button type="button" className="button button-outline" onClick={resetEstimate}><RotateCcw size={15} /> Reset</button>
                </div>
              </section>
            ) : renderStep()}
          </motion.div>
        </AnimatePresence>

        {stepError && <p className="mt-5 text-sm leading-6 text-red-800" role="alert">{stepError}</p>}
        {!showResult && (
          <div className="mt-9 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-5">
            <button type="button" className="button button-outline disabled:cursor-not-allowed disabled:opacity-45" onClick={() => { setStepError(""); setStep((current) => Math.max(0, current - 1)); }} disabled={step === 0}>
              <ArrowLeft size={15} /> Back
            </button>
            <button type="button" className="button button-dark" onClick={continueStep}>
              {step === steps.length - 1 ? <>See My Estimate <ArrowRight size={15} /></> : <>Continue <ArrowRight size={15} /></>}
            </button>
          </div>
        )}
      </div>

      <aside className="quote-summary flex flex-col bg-[#222724] p-6 text-white sm:p-8 lg:sticky lg:top-[90px] lg:h-fit lg:min-h-[460px]">
        <p className="eyebrow">Your live estimate</p>
        <h2 className="display mt-4 text-3xl sm:text-4xl">{range ? <CurrencyRange range={range} /> : "Custom scope"}</h2>
        <p className="mt-3 text-xs leading-5 text-white/70">{range ? "Estimated per visit · CAD" : "This service or selected detail needs an individually reviewed quote."}</p>
        <p className="mt-2 text-[10px] leading-5 text-white/55">Final pricing may vary based on property condition, scope and confirmed requirements.</p>
        <div className="my-6 h-px bg-white/20" />
        <dl className="grid gap-3 text-xs">
          <div className="flex justify-between gap-4"><dt className="text-white/60">Property</dt><dd className="text-right">{values.property}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-white/60">Bedrooms / baths</dt><dd>{values.bedrooms} / {values.bathrooms}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-white/60">Service</dt><dd className="max-w-[60%] text-right">{values.cleaning}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-white/60">Frequency</dt><dd>{values.frequency}</dd></div>
          <div className="flex justify-between gap-4"><dt className="flex items-center gap-1 text-white/60"><MapPin size={12} />Area</dt><dd>{values.postalCode || "Calgary"}</dd></div>
          {values.addOns.length > 0 && <div className="border-t border-white/20 pt-3"><dt className="text-white/60">Add-ons</dt><dd className="mt-2 text-right leading-5">{values.addOns.join(", ")}</dd></div>}
        </dl>
        <p className="mt-auto border-t border-white/20 pt-5 text-[10px] leading-5 text-white/60">Illustrative starting estimate, not an official Royal Cleaning Crew price or booking confirmation.</p>
      </aside>
    </div>
  );
}