import { z } from "zod";
import { quoteOptions } from "@/config/pricing";
import {
  normalizeCanadianPostalCode,
  serviceLocationErrorMessage,
  validateCalgaryLocation,
} from "@/config/service-area";

const optionalDate = z.string().optional().refine(
  (value) => !value || ( /^\d{4}-\d{2}-\d{2}$/.test(value) && value >= new Date().toISOString().slice(0, 10)),
  "Choose today or a future date.",
);

export const quoteSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name."),
  lastName: z.string().trim().min(1, "Enter your last name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().refine((value) => {
    const digits = value.replace(/\D/g, "");
    return /^1?[2-9]\d{2}[2-9]\d{6}$/.test(digits);
  }, "Enter a valid Canadian phone number."),
  service: z.enum(quoteOptions.cleaningTypes, { error: "Choose a cleaning service." }),
  property: z.enum(quoteOptions.propertyTypes, { error: "Choose a property type." }),
  bedrooms: z.enum(quoteOptions.bedrooms, { error: "Choose a bedroom count." }),
  bathrooms: z.enum(quoteOptions.bathrooms, { error: "Choose a bathroom count." }),
  approximateSize: z.enum(quoteOptions.approximateSizes).optional(),
  address: z.string().trim().min(1, "Enter the Calgary service address."),
  city: z.string().trim().min(1, "Enter the service city."),
  province: z.string().trim().min(1, "Enter the province."),
  postalCode: z.string().trim().min(1, "Enter the postal code.").transform(normalizeCanadianPostalCode),
  frequency: z.enum(quoteOptions.frequencies, { error: "Choose a service frequency." }),
  preferredDate: optionalDate,
  preferredTime: z.string().optional(),
  addOns: z.array(z.enum(quoteOptions.addOns)).default([]),
  message: z.string().trim().max(2500, "Keep your note under 2,500 characters.").optional(),
}).superRefine((values, context) => {
  const locationError = validateCalgaryLocation({
    address: values.address,
    city: values.city,
    province: values.province,
    postalCode: values.postalCode,
  });

  if (locationError) {
    const path = locationError === "postal-format" || locationError === "postal-area"
      ? "postalCode"
      : locationError;
    context.addIssue({
      code: "custom",
      path: [path],
      message: serviceLocationErrorMessage(locationError),
    });
  }
});

export type QuoteFormInput = z.input<typeof quoteSchema>;
export type QuoteSubmission = z.output<typeof quoteSchema>;