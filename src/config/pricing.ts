export const quoteOptions = {
  propertyTypes: ["Apartment", "Condo", "Townhouse", "House", "Office", "Other"],
  bedrooms: ["Studio", "1", "2", "3", "4", "5+", "Not applicable"],
  bathrooms: ["1", "1.5", "2", "2.5", "3", "4+", "Not applicable"],
  approximateSizes: ["Under 1,000 sq ft", "1,000–1,500 sq ft", "1,501–2,000 sq ft", "2,001–3,000 sq ft", "Over 3,000 sq ft", "Not sure"],
  cleaningTypes: [
    "Standard Cleaning",
    "Deep Cleaning",
    "Move-In Cleaning",
    "Move-Out Cleaning",
    "Airbnb Turnover",
    "Commercial / Custom Quote",
    "Janitorial Services",
    "Store Cleaning",
    "Building Cleaning",
    "Post-Construction Cleaning",
    "Listing / Pre-Sale Cleaning",
    "Specialty Cleaning",
  ],
  frequencies: ["One Time", "Weekly", "Every 2 Weeks", "Every 4 Weeks", "Monthly"],
  addOns: ["Inside Oven", "Inside Refrigerator", "Interior Windows", "Baseboards", "Cabinet Interiors", "Extra Detail Areas", "Pet Hair / Extra Condition", "Other"],
} as const;

export type PropertyType = (typeof quoteOptions.propertyTypes)[number];
export type BedroomCount = (typeof quoteOptions.bedrooms)[number];
export type BathroomCount = (typeof quoteOptions.bathrooms)[number];
export type ApproximateSize = (typeof quoteOptions.approximateSizes)[number];
export type CleaningType = (typeof quoteOptions.cleaningTypes)[number];
export type Frequency = (typeof quoteOptions.frequencies)[number];
export type AddOn = (typeof quoteOptions.addOns)[number];

export type PricingRates = {
  propertyBase: Record<PropertyType, number>;
  bedroomAdjustment: Record<BedroomCount, number>;
  bathroomAdjustment: Record<BathroomCount, number>;
  sizeAdjustment: Record<ApproximateSize, number>;
  services: Record<CleaningType, { multiplier: number | null; minimumCharge: number | null }>;
  frequencyMultiplier: Record<Frequency, number>;
  addOns: Record<AddOn, number | null>;
};

export const pricing = {
  currency: "CAD",
  estimateRange: 0.1,
  rates: {
    propertyBase: {
      Apartment: 145,
      Condo: 155,
      Townhouse: 180,
      House: 195,
      Office: 220,
      Other: 155,
    },
    bedroomAdjustment: {
      Studio: 0,
      "1": 0,
      "2": 25,
      "3": 55,
      "4": 95,
      "5+": 145,
      "Not applicable": 0,
    },
    bathroomAdjustment: {
      "1": 0,
      "1.5": 12,
      "2": 25,
      "2.5": 38,
      "3": 52,
      "4+": 78,
      "Not applicable": 0,
    },
    sizeAdjustment: {
      "Under 1,000 sq ft": 0,
      "1,000–1,500 sq ft": 0,
      "1,501–2,000 sq ft": 15,
      "2,001–3,000 sq ft": 45,
      "Over 3,000 sq ft": 100,
      "Not sure": 0,
    },
    services: {
      "Standard Cleaning": { multiplier: 1, minimumCharge: 145 },
      "Deep Cleaning": { multiplier: 1.48, minimumCharge: 235 },
      "Move-In Cleaning": { multiplier: 1.52, minimumCharge: 265 },
      "Move-Out Cleaning": { multiplier: 1.58, minimumCharge: 275 },
      "Airbnb Turnover": { multiplier: 0.88, minimumCharge: 125 },
      "Commercial / Custom Quote": { multiplier: null, minimumCharge: null },
      "Janitorial Services": { multiplier: null, minimumCharge: null },
      "Store Cleaning": { multiplier: null, minimumCharge: null },
      "Building Cleaning": { multiplier: null, minimumCharge: null },
      "Post-Construction Cleaning": { multiplier: null, minimumCharge: null },
      "Listing / Pre-Sale Cleaning": { multiplier: 1.18, minimumCharge: 185 },
      "Specialty Cleaning": { multiplier: 1, minimumCharge: 155 },
    },
    frequencyMultiplier: {
      "One Time": 1.08,
      Weekly: 0.82,
      "Every 2 Weeks": 0.88,
      "Every 4 Weeks": 0.93,
      Monthly: 0.94,
    },
    addOns: {
      "Inside Oven": 45,
      "Inside Refrigerator": 40,
      "Interior Windows": 55,
      Baseboards: 45,
      "Cabinet Interiors": 60,
      "Extra Detail Areas": 50,
      "Pet Hair / Extra Condition": 45,
      Other: null,
    },
  } satisfies PricingRates,
} as const;

export type EstimateInput = {
  property: PropertyType;
  bedrooms: BedroomCount;
  bathrooms: BathroomCount;
  approximateSize: ApproximateSize;
  cleaning: CleaningType;
  frequency: Frequency;
  addOns: AddOn[];
};

export function estimatePrice(input: EstimateInput) {
  const service = pricing.rates.services[input.cleaning];
  if (service.multiplier === null || service.minimumCharge === null) return null;

  const addOnPrices = input.addOns.map((addOn) => pricing.rates.addOns[addOn]);
  if (addOnPrices.some((price) => price === null)) return null;

  const propertySubtotal =
    pricing.rates.propertyBase[input.property] +
    pricing.rates.bedroomAdjustment[input.bedrooms] +
    pricing.rates.bathroomAdjustment[input.bathrooms] +
    pricing.rates.sizeAdjustment[input.approximateSize];
  const servicePrice = Math.max(propertySubtotal * service.multiplier, service.minimumCharge);
  const addOnTotal = addOnPrices.reduce<number>((total, price) => total + (price ?? 0), 0);
  const total = Math.max(
    (servicePrice + addOnTotal) * pricing.rates.frequencyMultiplier[input.frequency],
    service.minimumCharge,
  );

  return Math.round(total / 5) * 5;
}

export function estimatePriceRange(amount: number): [number, number] {
  return [
    Math.round((amount * (1 - pricing.estimateRange)) / 5) * 5,
    Math.round((amount * (1 + pricing.estimateRange)) / 5) * 5,
  ];
}

export const marketReferences = [
  { label: "Mesh Maids · Calgary 2026 guide", href: "https://meshmaids.ca/blog/how-much-you-should-expect-to-pay-for-cleaning-services-in-calgary/" },
  { label: "SKYREX · Calgary cost guide", href: "https://skyrexpropertyservices.ca/house-cleaning-cost-in-calgary/" },
  { label: "NeatNow · Calgary 2026 guide", href: "https://neatnow.ca/blog/house-cleaning-cost-calgary/" },
  { label: "Three North Clean · Calgary 2026 rates", href: "https://threenorthclean.com/blog/house-cleaning-prices-calgary-2026/" },
] as const;