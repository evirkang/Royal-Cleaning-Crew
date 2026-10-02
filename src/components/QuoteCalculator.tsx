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
const propertyIcons = {
  Apartment: Building2,
  Condo: Building2,
  Townhouse: House,
  House,
  Office: Building2,
  Other: Sparkles,
};
const labelClass = "mb-2 block text-[11px] font-bold tracking-[0.12em] text-[var(--ink)] uppercase";

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
  return (
    <span>
      ${range[0].toLocaleString("en-CA")} – ${range[1].toLocaleString("en-CA")}{" "}
      <span className="font-sans text-xs font-semibold tracking-wider text-[var(--brass)] uppercase">
        CAD
      </span>
    </span>
  );
}

export function QuoteCalculator() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [stepError, setStepError] = useState("");
  const [showResult, setShowResult] = useState(false);
  const reduceMotion = useReducedMotion();
  const estimate = estimatePrice(values);
  const range = estimate === null ? null : estimatePriceRange(estimate);

  const update = <Key extends keyof CalculatorValues>(
    field: Key,
    value: CalculatorValues[Key]
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setStepError("");
  };

  const changeProperty = (property: PropertyType) => {
    setValues((current) => ({
      ...current,
      property,
      bedrooms:
        property === "Office"
          ? "Not applicable"
          : current.bedrooms === "Not applicable"
          ? "1"
          : current.bedrooms,
      bathrooms:
        property === "Office"
          ? "Not applicable"
          : current.bathrooms === "Not applicable"
          ? "1"
          : current.bathrooms,
      cleaning:
        property === "Office"
          ? "Commercial / Custom Quote"
          : current.cleaning === "Commercial / Custom Quote"
          ? "Standard Cleaning"
          : current.cleaning,
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
    update(
      "addOns",
      selected
        ? values.addOns.filter((item) => item !== addOn)
        : [...values.addOns, addOn]
    );
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
    <div className="grid gap-3 sm:grid-cols-2">
      {choices.map((choice) => {
        const selected = values[field] === choice;
        return (
          <button
            type="button"
            key={choice}
            onClick={() =>
              field === "cleaning"
                ? update("cleaning", choice as CleaningType)
                : update("frequency", choice as Frequency)
            }
            aria-pressed={selected}
            className={`group flex min-h-[64px] items-center justify-between gap-4 rounded-xl border p-4 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brass)] ${
              selected
                ? "border-[#c3a56f] bg-[#c3a56f]/8 ring-1 ring-[#c3a56f] shadow-sm"
                : "border-[var(--line)] bg-white hover:border-[#c3a56f]/60 hover:bg-[#eeece5]/40"
            }`}
          >
            <span className={`text-sm font-medium ${selected ? "text-[var(--ink)] font-semibold" : "text-[var(--ink)]"}`}>
              {choice}
            </span>
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors ${
                selected ? "bg-[#c3a56f] text-white" : "border border-[var(--line)] opacity-0 group-hover:opacity-40"
              }`}
            >
              <Check size={12} strokeWidth={3} />
            </div>
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
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              Step 01 · Property
            </p>
            <h2 className="display mt-2 text-3xl font-normal text-[var(--ink)] sm:text-4xl">
              What are we cleaning?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Choose the property type that best describes the space.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {quoteOptions.propertyTypes.map((property) => {
                const Icon = propertyIcons[property];
                const selected = values.property === property;
                return (
                  <button
                    type="button"
                    key={property}
                    onClick={() => changeProperty(property)}
                    aria-pressed={selected}
                    className={`group flex min-h-[90px] items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ${
                      selected
                        ? "border-[#c3a56f] bg-[#c3a56f]/8 ring-1 ring-[#c3a56f] shadow-sm"
                        : "border-[var(--line)] bg-white hover:border-[#c3a56f]/60 hover:bg-[#eeece5]/40"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        selected
                          ? "bg-[#c3a56f] text-white"
                          : "bg-neutral-100 text-[var(--muted)] group-hover:bg-[#c3a56f]/15 group-hover:text-[var(--brass)]"
                      }`}
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </div>
                    <span className="text-sm font-semibold text-[var(--ink)]">{property}</span>
                    {selected && (
                      <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#c3a56f] text-white">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              Step 02 · Size
            </p>
            <h2 className="display mt-2 text-3xl font-normal text-[var(--ink)] sm:text-4xl">
              A little more about the space.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Bedrooms and bathrooms help establish the work. Approximate size refines the range.
            </p>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className={labelClass}>Bedrooms</span>
                <select
                  className="field h-12 w-full rounded-xl border border-[var(--line)] bg-neutral-50/50 px-4 text-sm text-[var(--ink)] transition-all focus:border-[#c3a56f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c3a56f]/20"
                  value={values.bedrooms}
                  onChange={(event) => update("bedrooms", event.target.value as BedroomCount)}
                >
                  {quoteOptions.bedrooms.map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className={labelClass}>Bathrooms</span>
                <select
                  className="field h-12 w-full rounded-xl border border-[var(--line)] bg-neutral-50/50 px-4 text-sm text-[var(--ink)] transition-all focus:border-[#c3a56f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c3a56f]/20"
                  value={values.bathrooms}
                  onChange={(event) => update("bathrooms", event.target.value as BathroomCount)}
                >
                  {quoteOptions.bathrooms.map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </label>

              <label className="block sm:col-span-2">
                <span className={labelClass}>Approximate square footage</span>
                <select
                  className="field h-12 w-full rounded-xl border border-[var(--line)] bg-neutral-50/50 px-4 text-sm text-[var(--ink)] transition-all focus:border-[#c3a56f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c3a56f]/20"
                  value={values.approximateSize}
                  onChange={(event) =>
                    update("approximateSize", event.target.value as ApproximateSize)
                  }
                >
                  {quoteOptions.approximateSizes.map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              Step 03 · Service
            </p>
            <h2 className="display mt-2 text-3xl font-normal text-[var(--ink)] sm:text-4xl">
              What kind of clean do you need?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Commercial, post-construction and unlisted details are scoped individually.
            </p>
            <div className="mt-7">{optionButtons("cleaning", quoteOptions.cleaningTypes)}</div>
          </div>
        );

      case 3:
        return (
          <div>
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              Step 04 · Frequency
            </p>
            <h2 className="display mt-2 text-3xl font-normal text-[var(--ink)] sm:text-4xl">
              How often should we plan for?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Recurring frequencies show an estimated per-visit range; final availability is confirmed separately.
            </p>
            <div className="mt-7">{optionButtons("frequency", quoteOptions.frequencies)}</div>
          </div>
        );

      case 4:
        return (
          <div>
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              Step 05 · Add-ons
            </p>
            <h2 className="display mt-2 text-3xl font-normal text-[var(--ink)] sm:text-4xl">
              Any extra details?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Choose what should be included in your estimate.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {quoteOptions.addOns.map((addOn) => {
                const selected = values.addOns.includes(addOn);
                const price = pricing.rates.addOns[addOn];
                return (
                  <button
                    type="button"
                    key={addOn}
                    aria-pressed={selected}
                    onClick={() => toggleAddOn(addOn)}
                    className={`group flex min-h-[64px] items-center justify-between gap-3 rounded-xl border p-4 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brass)] ${
                      selected
                        ? "border-[#c3a56f] bg-[#c3a56f]/8 ring-1 ring-[#c3a56f] shadow-sm"
                        : "border-[var(--line)] bg-white hover:border-[#c3a56f]/60 hover:bg-[#eeece5]/40"
                    }`}
                  >
                    <div>
                      <span className="text-sm font-semibold text-[var(--ink)]">{addOn}</span>
                      <small className="mt-0.5 block text-[11px] font-medium text-[var(--brass)]">
                        {price === null ? "Custom scope" : `+$${price} CAD`}
                      </small>
                    </div>
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors ${
                        selected ? "bg-[#c3a56f] text-white" : "border border-[var(--line)] opacity-0 group-hover:opacity-40"
                      }`}
                    >
                      <Check size={12} strokeWidth={3} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      default:
        return (
          <div>
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              Step 06 · Calgary location
            </p>
            <h2 className="display mt-2 text-3xl font-normal text-[var(--ink)] sm:text-4xl">
              Where is the property?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              We currently serve Calgary. Confirm the street address and postal area to see your estimate.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className={labelClass}>Street address</span>
                <input
                  className="field h-12 w-full rounded-xl border border-[var(--line)] bg-neutral-50/50 px-4 text-sm text-[var(--ink)] placeholder:text-neutral-400 transition-all focus:border-[#c3a56f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c3a56f]/20"
                  autoComplete="street-address"
                  value={values.address}
                  onChange={(event) => update("address", event.target.value)}
                  placeholder="Street number and street name"
                />
              </label>

              <label className="block">
                <span className={labelClass}>City</span>
                <input
                  className="field h-12 w-full rounded-xl border border-[var(--line)] bg-neutral-50/50 px-4 text-sm text-[var(--ink)] transition-all focus:border-[#c3a56f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c3a56f]/20"
                  autoComplete="address-level2"
                  value={values.city}
                  onChange={(event) => update("city", event.target.value)}
                />
              </label>

              <label className="block">
                <span className={labelClass}>Province</span>
                <select
                  className="field h-12 w-full rounded-xl border border-[var(--line)] bg-neutral-50/50 px-4 text-sm text-[var(--ink)] transition-all focus:border-[#c3a56f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c3a56f]/20"
                  autoComplete="address-level1"
                  value={values.province}
                  onChange={(event) => update("province", event.target.value)}
                >
                  <option value="AB">Alberta (AB)</option>
                  <option value="BC">British Columbia (BC)</option>
                  <option value="ON">Ontario (ON)</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label className="block sm:col-span-2">
                <span className={labelClass}>Canadian postal code</span>
                <input
                  className="field h-12 w-full rounded-xl border border-[var(--line)] bg-neutral-50/50 px-4 text-sm uppercase text-[var(--ink)] placeholder:text-neutral-400 transition-all focus:border-[#c3a56f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c3a56f]/20"
                  autoComplete="postal-code"
                  value={values.postalCode}
                  onChange={(event) =>
                    update("postalCode", normalizeCanadianPostalCode(event.target.value))
                  }
                  placeholder="T2P 0A1"
                />
              </label>
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
    <div className="quote-calculator overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-xl grid lg:grid-cols-[minmax(0,1fr)_380px]">
      
      {/* ================= LEFT MAIN INTERACTIVE PANEL ================= */}
      <div className="min-w-0 p-6 sm:p-9 lg:p-11">
        
        {/* Step Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--brass)] uppercase">
              Live cleaning estimator
            </p>
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-[var(--ink)]">
              {showResult ? "Estimate ready" : `${String(step + 1).padStart(2, "0")} / 06`}
            </span>
          </div>

          <div className="mt-3.5 grid grid-cols-6 gap-1.5" aria-hidden="true">
            {steps.map((label, index) => (
              <span
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index <= (showResult ? steps.length - 1 : step)
                    ? "bg-[#c3a56f]"
                    : "bg-neutral-200"
                }`}
                key={label}
              />
            ))}
          </div>

          <div className="mt-2.5 hidden justify-between text-[10px] font-medium text-[var(--muted)] md:flex">
            {steps.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>

        {/* Animated Step Transition */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={showResult ? "result" : step}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {showResult ? (
              <section aria-live="polite">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#c3a56f]/30 bg-[#c3a56f]/10 px-3 py-1 text-[11px] font-semibold text-[var(--brass)] uppercase">
                  Your estimated cleaning price
                </div>
                
                {range ? (
                  <h2 className="display mt-4 text-4xl font-normal sm:text-5xl text-[var(--ink)]">
                    <CurrencyRange range={range} />
                  </h2>
                ) : (
                  <h2 className="display mt-4 text-4xl font-normal sm:text-5xl text-[var(--ink)]">
                    Custom quote required.
                  </h2>
                )}

                <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
                  Final pricing may vary based on property condition, scope and confirmed service requirements.
                </p>

                {/* Breakdown Summary Grid */}
                <dl className="mt-7 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-neutral-50/60 p-4 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:divide-y-0 sm:p-6">
                  {[
                    ["Service", values.cleaning],
                    ["Property", values.property],
                    ["Bedrooms", values.bedrooms],
                    ["Bathrooms", values.bathrooms],
                    ["Frequency", values.frequency],
                    ["Approx. size", values.approximateSize],
                    ["Add-ons", values.addOns.length ? values.addOns.join(", ") : "None"],
                    ["Calgary postal code", values.postalCode],
                  ].map(([term, description]) => (
                    <div
                      className="flex items-center justify-between gap-3 py-3 text-xs sm:border-b sm:border-[var(--line)]"
                      key={term}
                    >
                      <dt className="shrink-0 text-[var(--muted)] font-medium">{term}</dt>
                      <dd className="max-w-[65%] text-right font-semibold text-[var(--ink)] truncate">
                        {description}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Final Actions */}
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <Link
                    href={`/contact?${quoteQuery.toString()}`}
                    className="button inline-flex items-center gap-2 rounded-xl border border-[#c3a56f] bg-[#c3a56f] px-6 py-3.5 text-sm font-medium text-[#1c201d] transition-all duration-300 hover:bg-[#d0b984] hover:shadow-lg hover:shadow-[#c3a56f]/20 active:scale-[0.98]"
                  >
                    Request This Quote <ArrowRight size={15} />
                  </Link>

                  <button
                    type="button"
                    className="button inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-5 py-3.5 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-neutral-50 active:scale-[0.98]"
                    onClick={() => {
                      setShowResult(false);
                      setStep(0);
                      setStepError("");
                    }}
                  >
                    <ArrowLeft size={15} /> Edit Estimate
                  </button>

                  <button
                    type="button"
                    className="button inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-5 py-3.5 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--ink)] hover:bg-neutral-50 active:scale-[0.98]"
                    onClick={resetEstimate}
                  >
                    <RotateCcw size={15} /> Reset
                  </button>
                </div>
              </section>
            ) : (
              renderStep()
            )}
          </motion.div>
        </AnimatePresence>

        {stepError && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-800" role="alert">
            {stepError}
          </div>
        )}

        {/* Step Navigation Actions */}
        {!showResult && (
          <div className="mt-10 flex items-center justify-between gap-4 border-t border-[var(--line)] pt-6">
            <button
              type="button"
              className="button inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-5 py-3 text-xs font-semibold tracking-wider text-[var(--ink)] uppercase transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => {
                setStepError("");
                setStep((current) => Math.max(0, current - 1));
              }}
              disabled={step === 0}
            >
              <ArrowLeft size={14} /> Back
            </button>

            <button
              type="button"
              className="button inline-flex items-center gap-2 rounded-xl border border-[#c3a56f] bg-[#c3a56f] px-6 py-3 text-xs font-semibold tracking-wider text-[#1c201d] uppercase transition-all duration-300 hover:bg-[#d0b984] hover:shadow-md active:scale-[0.98]"
              onClick={continueStep}
            >
              {step === steps.length - 1 ? (
                <>
                  See My Estimate <ArrowRight size={14} />
                </>
              ) : (
                <>
                  Continue <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        )}
      </div>


      {/* ================= RIGHT LIVE SUMMARY SIDEBAR ================= */}
      <aside className="quote-summary flex flex-col justify-between border-t border-white/10 bg-[#222724] p-6 text-white sm:p-8 lg:border-t-0 lg:border-l">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--brass-light)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c3a56f]" />
            Your live estimate
          </div>

          <div className="mt-4">
            <h2 className="display text-3xl font-normal leading-tight text-white sm:text-4xl">
              {range ? <CurrencyRange range={range} /> : "Custom scope"}
            </h2>
            <p className="mt-2 text-xs font-medium text-white/70">
              {range
                ? "Estimated per visit · CAD"
                : "This service or selected detail needs an individually reviewed quote."}
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-white/50">
              Final pricing may vary based on property condition, scope and confirmed requirements.
            </p>
          </div>

          <div className="my-6 h-px bg-white/15" />

          {/* Current Selection List */}
          <dl className="grid gap-3.5 text-xs">
            <div className="flex justify-between gap-4">
              <dt className="text-white/60">Property</dt>
              <dd className="font-medium text-white text-right">{values.property}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/60">Bedrooms / baths</dt>
              <dd className="font-medium text-white">
                {values.bedrooms} / {values.bathrooms}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/60">Service</dt>
              <dd className="max-w-[60%] font-medium text-white text-right truncate">
                {values.cleaning}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/60">Frequency</dt>
              <dd className="font-medium text-white">{values.frequency}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="flex items-center gap-1.5 text-white/60">
                <MapPin size={13} className="text-[#c3a56f]" /> Area
              </dt>
              <dd className="font-medium text-white">{values.postalCode || "Calgary"}</dd>
            </div>

            {values.addOns.length > 0 && (
              <div className="border-t border-white/15 pt-3">
                <dt className="text-white/60">Add-ons</dt>
                <dd className="mt-1.5 text-right font-medium leading-relaxed text-[#c3a56f]">
                  {values.addOns.join(", ")}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <p className="mt-8 border-t border-white/15 pt-4 text-[10px] leading-relaxed text-white/50">
          Illustrative starting estimate, not an official Royal Cleaning Crew price or booking confirmation.
        </p>
      </aside>

    </div>
  );
}