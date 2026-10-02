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

export function QuoteForm({ commercial = false, initialService, initialAddOns = [], initialValues, initialEstimate }: QuoteFormProps) {
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
      service: initialValues?.service ?? initialService ?? (commercial ? "Commercial / Custom Quote" : defaultValues.service),
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
      const result = await response.json() as { message?: string };
      if (!response.ok) {
        setSubmissionMessage(result.message ?? "Your request has not been sent. Please try again later.");
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmissionMessage("We could not reach quote delivery. Your request has not been sent; please try again later.");
    }
  };

  if (submitted) {
    return (
      <section className="border-t-2 border-[var(--brass)] bg-[var(--white)] px-6 py-10 text-center sm:px-10" aria-live="polite">
        <CheckCircle2 className="mx-auto text-[var(--brass)]" size={30} strokeWidth={1.5} />
        <h3 className="display mt-5 text-4xl">Request received.</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[var(--muted)]">Your quote request has been emailed to Royal Cleaning Crew. The service scope and availability can now be reviewed.</p>
      </section>
    );
  }

  const errorFor = (name: keyof QuoteSubmission) => errors[name]?.message && (
    <span className="mt-1 block text-xs leading-5 text-red-700" id={`${name}-error`}>
      {errors[name]?.message}
    </span>
  );

  const labelClass = "mb-2 block text-[10px] font-bold tracking-[.09em] text-[var(--ink)] uppercase";

  return (
    <form className="quote-form" noValidate onSubmit={handleSubmit(submit)}>
      {initialEstimate && (
        <aside className="mb-7 flex flex-wrap items-end justify-between gap-3 border-l-2 border-[var(--brass)] bg-[#eeece5] p-4" aria-label="Estimate from the pricing calculator">
          <div><p className="eyebrow">Your estimator range · CAD</p><p className="display mt-2 text-3xl">${initialEstimate[0].toLocaleString("en-CA")} – ${initialEstimate[1].toLocaleString("en-CA")}</p></div>
          <p className="max-w-xs text-[10px] leading-5 text-[var(--muted)]">The scope is prefilled below. Final pricing still depends on the confirmed property condition and requirements.</p>
        </aside>
      )}
      <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
        <label>
          <span className={labelClass}>First name *</span>
          <input autoComplete="given-name" className="field" aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? "firstName-error" : undefined} {...register("firstName")} />
          {errorFor("firstName")}
        </label>
        <label>
          <span className={labelClass}>Last name *</span>
          <input autoComplete="family-name" className="field" aria-invalid={!!errors.lastName} aria-describedby={errors.lastName ? "lastName-error" : undefined} {...register("lastName")} />
          {errorFor("lastName")}
        </label>
        <label>
          <span className={labelClass}>Email *</span>
          <input autoComplete="email" className="field" type="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
          {errorFor("email")}
        </label>
        <label>
          <span className={labelClass}>Phone *</span>
          <input autoComplete="tel" className="field" type="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} />
          {errorFor("phone")}
        </label>
        <label>
          <span className={labelClass}>Cleaning service *</span>
          <select className="field" {...register("service")}>
            {quoteOptions.cleaningTypes.map((service) => <option key={service} value={service}>{service}</option>)}
          </select>
          {errorFor("service")}
        </label>
        <label>
          <span className={labelClass}>Property type *</span>
          <select className="field" {...register("property")}>
            {quoteOptions.propertyTypes.map((property) => <option key={property} value={property}>{property}</option>)}
          </select>
          {errorFor("property")}
        </label>
        <label>
          <span className={labelClass}>Bedrooms *</span>
          <select className="field" {...register("bedrooms")}>
            {quoteOptions.bedrooms.map((count) => <option key={count} value={count}>{count}</option>)}
          </select>
        </label>
        <label>
          <span className={labelClass}>Bathrooms *</span>
          <select className="field" {...register("bathrooms")}>
            {quoteOptions.bathrooms.map((count) => <option key={count} value={count}>{count}</option>)}
          </select>
        </label>
        <label>
          <span className={labelClass}>Approximate size</span>
          <select className="field" {...register("approximateSize")}>
            {quoteOptions.approximateSizes.map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
        </label>
        <label>
          <span className={labelClass}>Frequency *</span>
          <select className="field" {...register("frequency")}>
            {quoteOptions.frequencies.map((frequency) => <option key={frequency} value={frequency}>{frequency}</option>)}
          </select>
        </label>
        <label className="sm:col-span-2">
          <span className={labelClass}>Calgary service address *</span>
          <input autoComplete="street-address" className="field" aria-invalid={!!errors.address} aria-describedby={errors.address ? "address-error" : undefined} {...register("address")} placeholder="Street number and street name" />
          {errorFor("address")}
        </label>
        <label>
          <span className={labelClass}>City *</span>
          <input autoComplete="address-level2" className="field" aria-invalid={!!errors.city} aria-describedby={errors.city ? "city-error" : undefined} {...register("city")} />
          {errorFor("city")}
        </label>
        <label>
          <span className={labelClass}>Province *</span>
          <select autoComplete="address-level1" className="field" {...register("province")}>
            <option value="AB">Alberta (AB)</option>
            <option value="BC">British Columbia (BC)</option>
            <option value="ON">Ontario (ON)</option>
            <option value="Other">Other</option>
          </select>
          {errorFor("province")}
        </label>
        <label>
          <span className={labelClass}>Postal code *</span>
          <input autoComplete="postal-code" className="field uppercase" aria-invalid={!!errors.postalCode} aria-describedby={errors.postalCode ? "postalCode-error" : undefined} {...register("postalCode")} placeholder="T2P 0A1" />
          {errorFor("postalCode")}
        </label>
        <label>
          <span className={labelClass}>Preferred date</span>
          <input className="field" type="date" {...register("preferredDate")} />
          {errorFor("preferredDate")}
        </label>
        <label>
          <span className={labelClass}>Preferred time</span>
          <select className="field" {...register("preferredTime")}>
            <option value="">No preference</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </label>
      </div>

      <fieldset className="mt-7 border-0 border-t border-[var(--line)] p-0 pt-5">
        <legend className={labelClass}>Add-ons to include in the quote</legend>
        <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
          {quoteOptions.addOns.map((addOn) => (
            <label className="flex min-h-9 items-center gap-3 text-sm" key={addOn}>
              <input className="size-4 accent-[var(--brass)]" type="checkbox" value={addOn} {...register("addOns")} />
              {addOn}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-6 block">
        <span className={labelClass}>Anything else we should know?</span>
        <textarea className="field min-h-28 resize-y" maxLength={2500} {...register("message")} placeholder="Priorities, access notes or details about the space" />
        {errorFor("message")}
      </label>

      <div className="mt-7 border-t border-[var(--line)] pt-5">
        {submissionMessage && (
          <p className="mb-4 flex items-start gap-2 text-sm leading-6 text-red-800" role="alert">
            <AlertCircle className="mt-1 shrink-0" size={16} />{submissionMessage}
          </p>
        )}
        <button className="button button-dark w-full sm:w-auto" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <><LoaderCircle className="animate-spin" size={15} />Sending request</> : "Send quote request"}
        </button>
        <p className="mt-3 text-xs leading-5 text-[var(--muted)]">Your request is sent only when the configured delivery service accepts it. We do not promise an instant or automatic booking.</p>
      </div>
    </form>
  );
}