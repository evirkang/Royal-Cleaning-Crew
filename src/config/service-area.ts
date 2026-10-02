export const serviceArea = {
  city: "Calgary",
  province: "Alberta",
  provinceCode: "AB",
  postalFsas: [
    "T1X",
    "T1Y",
    "T2A",
    "T2B",
    "T2C",
    "T2E",
    "T2G",
    "T2H",
    "T2J",
    "T2K",
    "T2L",
    "T2M",
    "T2N",
    "T2P",
    "T2R",
    "T2S",
    "T2T",
    "T2V",
    "T2W",
    "T2X",
    "T2Y",
    "T2Z",
    "T3A",
    "T3B",
    "T3C",
    "T3E",
    "T3G",
    "T3H",
    "T3J",
    "T3K",
    "T3L",
    "T3M",
    "T3N",
    "T3P",
    "T3R",
    "T3S",
  ],
} as const;

const canadianPostalPattern = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\d[ABCEGHJ-NPRSTV-Z]\d$/;

export type ServiceLocation = {
  address: string;
  city: string;
  province: string;
  postalCode: string;
};

export type ServiceLocationError =
  | "address"
  | "city"
  | "province"
  | "postal-format"
  | "postal-area";

export function normalizeCanadianPostalCode(value: string) {
  const compact = value.toUpperCase().replace(/[\s-]/g, "");
  return compact.length === 6 ? `${compact.slice(0, 3)} ${compact.slice(3)}` : compact;
}

export function validateCalgaryLocation(location: ServiceLocation): ServiceLocationError | null {
  const postalCode = normalizeCanadianPostalCode(location.postalCode);
  const compactPostalCode = postalCode.replace(" ", "");

  if (!canadianPostalPattern.test(compactPostalCode)) return "postal-format";
  if (!serviceArea.postalFsas.includes(compactPostalCode.slice(0, 3) as (typeof serviceArea.postalFsas)[number])) {
    return "postal-area";
  }

  if (!/^\d{1,6}\s+[\p{L}\p{N}][\p{L}\p{N}\s.'#/-]{1,}$/u.test(location.address.trim())) {
    return "address";
  }
  if (location.city.trim().toLowerCase() !== serviceArea.city.toLowerCase()) return "city";
  if (![serviceArea.provinceCode.toLowerCase(), serviceArea.province.toLowerCase()].includes(location.province.trim().toLowerCase())) {
    return "province";
  }

  return null;
}

export function serviceLocationErrorMessage(error: ServiceLocationError) {
  switch (error) {
    case "postal-format":
      return "Please enter a valid Canadian postal code.";
    case "postal-area":
      return "That postal code does not appear to be within our current Calgary service area.";
    case "address":
      return "Please enter a Calgary street address, including the street number.";
    case "city":
    case "province":
      return "We currently serve Calgary only. Please enter a Calgary service address.";
  }
}