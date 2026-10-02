"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { quoteOptions } from "@/config/pricing";
import { quoteSchema, type QuoteFormInput, type QuoteSubmission } from "@/lib/quote-schema";

type QuoteFormProps = {
  commercial?: boolean;
  initialService?: QuoteSubmission["service"];
  initialAddOns?: QuoteSubmission["addOns"];
  initialValues?: Partial<QuoteFormInput>;
  initialEstimate?: readonly [number, number];
};

const defaultValues: QuoteSubmission = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  service: "Standard Cleaning",
  property: "Condo",
  bedrooms: "1",
  bathrooms: "1",
  approximateSize: "Not sure",
  address: "",
  city: "Calgary",
  province: "AB",
  postalCode: "",
  frequency: "One Time",
  preferredDate: "",
  preferredTime: "",
  addOns: [],
  message: "",
};

const inputClass =
  "field h-12 w-full rounded-xl border border-[var(--line)] bg-neutral-50/50 px-4 text-sm text-[var(--ink)] placeholder:text-neutral-400 transition-all duration-200 focus:border-[#c3a56f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c3a56f]/20 aria-invalid:border-red-500 aria-invalid:ring-red-500/20";
const selectClass =
  "field h-12 w-full rounded-xl border border-[var(--line)] bg-neutral-50/50 px-4 text-sm text-[var(--ink)] transition-all duration-200 focus:border-[#c3a56f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c3a56f]/20 aria-invalid:border-red-500 aria-invalid:ring-red-500/20";
const labelClass = "mb-2 block text-[11px] font-bold tracking-[0.12em] text-[var(--ink)] uppercase";

export function QuoteForm({
  commercial = false,
  initialService,
  initialAddOns = [],
  initialValues,
  initialEstimate,
}: QuoteFormProps) {
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormInput, unknown, QuoteSubmission>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      ...defaultValues,
      ...initialValues,
      service:
        initialValues?.service ??
        initialService ??
        (commercial ? "Commercial / Custom Quote" : defaultValues.service),
      addOns: initialValues?.addOns ?? initialAddOns,
    },
  });

  const submit = async (values: QuoteSubmission) => {
    setSubmissionMessage("");
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        setSubmissionMessage(
          result.message ?? "Your request has not been sent. Please try again later."
        );
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmissionMessage(
        "We could not reach quote delivery. Your request has not been sent; please try again later."
      );
    }
  };

  if (submitted) {
    return (
      <section
        className="rounded-3xl border border-[var(--brass)]/40 bg-white p-8 text-center shadow-lg sm:p-12"
        aria-live="polite"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#c3a56f]/15 text-[var(--brass)]">
          <CheckCircle2 size={32} strokeWidth={2} />
        </div>
        <h3 className="display mt-6 text-3xl font-normal text-[var(--ink)] sm:text-4xl">
          Request received.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)] sm:text-base">
          Your quote request has been emailed to Royal Cleaning Crew. The service scope and availability can now be reviewed.
        </p>
      </section>
    );
  }

  const errorFor = (name: keyof QuoteSubmission) =>
    errors[name]?.message && (
      <span className="mt-1.5 block text-xs font-medium text-red-600" id={`${name}-error`}>
        {errors[name]?.message}
      </span>
    );

  return (
    <form className="quote-form" noValidate onSubmit={handleSubmit(submit)}>
      {/* Estimator Range Callout */}
      {initialEstimate && (
        <aside
          className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-[var(--brass)]/40 bg-[#eeece5] p-5 shadow-sm sm:flex-row sm:items-center"
          aria-label="Estimate from the pricing calculator"
        >
          <div>
            <p className="eyebrow text-xs font-semibold uppercase tracking-wider text-[var(--brass)]">
              Your estimator range · CAD
            </p>
            <p className="display mt-1 text-2xl font-normal text-[var(--ink)] sm:text-3xl">
              ${initialEstimate[0].toLocaleString("en-CA")} – ${initialEstimate[1].toLocaleString("en-CA")}
            </p>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-[var(--muted)] sm:text-right">
            The scope is prefilled below. Final pricing still depends on the confirmed property condition and requirements.
          </p>
        </aside>
      )}

      {/* Form Fields Grid */}
      <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>First name *</span>
          <input
            autoComplete="given-name"
            className={inputClass}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            {...register("firstName")}
          />
          {errorFor("firstName")}
        </label>

        <label className="block">
          <span className={labelClass}>Last name *</span>
          <input
            autoComplete="family-name"
            className={inputClass}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            {...register("lastName")}
          />
          {errorFor("lastName")}
        </label>

        <label className="block">
          <span className={labelClass}>Email *</span>
          <input
            autoComplete="email"
            className={inputClass}
            type="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errorFor("email")}
        </label>

        <label className="block">
          <span className={labelClass}>Phone *</span>
          <input
            autoComplete="tel"
            className={inputClass}
            type="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          {errorFor("phone")}
        </label>

        <label className="block">
          <span className={labelClass}>Cleaning service *</span>
          <select className={selectClass} {...register("service")}>
            {quoteOptions.cleaningTypes.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errorFor("service")}
        </label>

        <label className="block">
          <span className={labelClass}>Property type *</span>
          <select className={selectClass} {...register("property")}>
            {quoteOptions.propertyTypes.map((property) => (
              <option key={property} value={property}>
                {property}
              </option>
            ))}
          </select>
          {errorFor("property")}
        </label>

        <label className="block">
          <span className={labelClass}>Bedrooms *</span>
          <select className={selectClass} {...register("bedrooms")}>
            {quoteOptions.bedrooms.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className={labelClass}>Bathrooms *</span>
          <select className={selectClass} {...register("bathrooms")}>
            {quoteOptions.bathrooms.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className={labelClass}>Approximate size</span>
          <select className={selectClass} {...register("approximateSize")}>
            {quoteOptions.approximateSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className={labelClass}>Frequency *</span>
          <select className={selectClass} {...register("frequency")}>
            {quoteOptions.frequencies.map((frequency) => (
              <option key={frequency} value={frequency}>
                {frequency}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className={labelClass}>Calgary service address *</span>
          <input
            autoComplete="street-address"
            className={inputClass}
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? "address-error" : undefined}
            {...register("address")}
            placeholder="Street number and street name"
          />
          {errorFor("address")}
        </label>

        <label className="block">
          <span className={labelClass}>City *</span>
          <input
            autoComplete="address-level2"
            className={inputClass}
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "city-error" : undefined}
            {...register("city")}
          />
          {errorFor("city")}
        </label>

        <label className="block">
          <span className={labelClass}>Province *</span>
          <select autoComplete="address-level1" className={selectClass} {...register("province")}>
            <option value="AB">Alberta (AB)</option>
            <option value="BC">British Columbia (BC)</option>
            <option value="ON">Ontario (ON)</option>
            <option value="Other">Other</option>
          </select>
          {errorFor("province")}
        </label>

        <label className="block">
          <span className={labelClass}>Postal code *</span>
          <input
            autoComplete="postal-code"
            className={`${inputClass} uppercase`}
            aria-invalid={!!errors.postalCode}
            aria-describedby={errors.postalCode ? "postalCode-error" : undefined}
            {...register("postalCode")}
            placeholder="T2P 0A1"
          />
          {errorFor("postalCode")}
        </label>

        <label className="block">
          <span className={labelClass}>Preferred date</span>
          <input className={inputClass} type="date" {...register("preferredDate")} />
          {errorFor("preferredDate")}
        </label>

        <label className="block sm:col-span-2">
          <span className={labelClass}>Preferred time</span>
          <select className={selectClass} {...register("preferredTime")}>
            <option value="">No preference</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </label>
      </div>

      {/* Add-ons Fieldset */}
      <fieldset className="mt-8 border-t border-[var(--line)] pt-6">
        <legend className={labelClass}>Add-ons to include in the quote</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {quoteOptions.addOns.map((addOn) => (
            <label
              className="group flex min-h-[50px] cursor-pointer items-center gap-3.5 rounded-xl border border-[var(--line)] bg-white/70 p-3.5 text-sm font-medium text-[var(--ink)] shadow-2xs transition-all duration-200 hover:border-[#c3a56f]/60 hover:bg-[#eeece5]/40"
              key={addOn}
            >
              <input
                className="h-4 w-4 rounded accent-[#c3a56f] transition-all cursor-pointer"
                type="checkbox"
                value={addOn}
                {...register("addOns")}
              />
              <span>{addOn}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Notes Textarea */}
      <label className="mt-7 block">
        <span className={labelClass}>Anything else we should know?</span>
        <textarea
          className="field min-h-32 w-full resize-y rounded-xl border border-[var(--line)] bg-neutral-50/50 p-4 text-sm text-[var(--ink)] placeholder:text-neutral-400 transition-all duration-200 focus:border-[#c3a56f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c3a56f]/20"
          maxLength={2500}
          {...register("message")}
          placeholder="Priorities, access notes or details about the space"
        />
        {errorFor("message")}
      </label>

      {/* Submission Actions */}
      <div className="mt-8 border-t border-[var(--line)] pt-6">
        {submissionMessage && (
          <div
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800"
            role="alert"
          >
            <AlertCircle className="mt-0.5 shrink-0 text-red-600" size={16} />
            <span>{submissionMessage}</span>
          </div>
        )}

        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#c3a56f] bg-[#c3a56f] px-8 py-4 text-sm font-semibold !text-[#111412] shadow-md transition-all duration-300 hover:bg-[#d8c08a] hover:shadow-lg hover:shadow-[#c3a56f]/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="animate-spin text-[#111412]" size={16} />
              <span>Sending request...</span>
            </>
          ) : (
            "Send quote request"
          )}
        </button>

        <p className="mt-3.5 text-xs leading-relaxed text-[var(--muted)]">
          Your request is sent only when the configured delivery service accepts it. We do not promise an instant or automatic booking.
        </p>
      </div>
    </form>
  );
}