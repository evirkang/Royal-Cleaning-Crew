import { NextResponse } from "next/server";
import { estimatePrice, estimatePriceRange } from "@/config/pricing";
import { quoteSchema, type QuoteSubmission } from "@/lib/quote-schema";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getEstimateLabel(quote: QuoteSubmission) {
  const amount = estimatePrice({
    property: quote.property,
    bedrooms: quote.bedrooms,
    bathrooms: quote.bathrooms,
    approximateSize: quote.approximateSize ?? "Not sure",
    cleaning: quote.service,
    frequency: quote.frequency,
    addOns: quote.addOns,
  });

  if (amount === null) return "Custom quote required";
  const [minimum, maximum] = estimatePriceRange(amount);
  return `$${minimum.toLocaleString("en-CA")} - $${maximum.toLocaleString("en-CA")} CAD (estimate only)`;
}

function buildQuoteEmail(quote: QuoteSubmission) {
  const fullName = `${quote.firstName} ${quote.lastName}`;
  const estimate = getEstimateLabel(quote);
  const addOns = quote.addOns.length ? quote.addOns.join(", ") : "None selected";
  const fields: [string, string][] = [
    ["Customer", fullName],
    ["Email", quote.email],
    ["Phone", quote.phone],
    ["Service", quote.service],
    ["Property", quote.property],
    ["Bedrooms", quote.bedrooms],
    ["Bathrooms", quote.bathrooms],
    ["Approximate size", quote.approximateSize ?? "Not provided"],
    ["Address", `${quote.address}, ${quote.city}, ${quote.province} ${quote.postalCode}`],
    ["Frequency", quote.frequency],
    ["Preferred date", quote.preferredDate || "No preference"],
    ["Preferred time", quote.preferredTime || "No preference"],
    ["Add-ons", addOns],
    ["Website estimate", estimate],
    ["Customer notes", quote.message?.trim() || "None provided"],
  ];

  const text = [
    "New Royal Cleaning Crew quote request",
    "",
    ...fields.map(([label, value]) => `${label}: ${value}`),
    "",
    "This request is an inquiry only. Confirm final scope, pricing and availability with the customer.",
  ].join("\n");

  const rows = fields.map(([label, value]) => `
    <tr>
      <th align="left" style="padding:10px 14px;border-bottom:1px solid #cfdaeb;color:#52698f;font:600 12px Arial,sans-serif;vertical-align:top;">${escapeHtml(label)}</th>
      <td style="padding:10px 14px;border-bottom:1px solid #cfdaeb;color:#0a2d70;font:14px Arial,sans-serif;white-space:pre-wrap;">${escapeHtml(value)}</td>
    </tr>`).join("");

  const html = `
    <div style="margin:0 auto;max-width:680px;padding:28px 18px;background:#f5f8fd;color:#0a2d70;font-family:Arial,sans-serif;">
      <div style="padding:24px;background:#082a6d;color:#ffffff;">
        <p style="margin:0 0 10px;color:#f0bd45;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Royal Cleaning Crew · Calgary</p>
        <h1 style="margin:0;font-family:Arial,sans-serif;font-size:26px;font-weight:600;">New quote request</h1>
        <p style="margin:10px 0 0;color:#e0e9f8;font-size:13px;">${escapeHtml(fullName)} · ${escapeHtml(quote.service)}</p>
      </div>
      <table role="presentation" style="width:100%;margin-top:14px;border-collapse:collapse;background:#ffffff;">${rows}</table>
      <p style="margin:16px 2px 0;color:#52698f;font-size:11px;line-height:1.6;">The website estimate is indicative only. Confirm property condition, scope, final pricing and availability before booking.</p>
    </div>`;

  return { subject: `Cleaning quote request: ${quote.service}`, text, html };
}

async function sendWithResend(quote: QuoteSubmission) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL?.split(",").map((email) => email.trim()).filter(Boolean);
  const from = process.env.QUOTE_FROM_EMAIL;

  if (!apiKey || !to?.length || !from) return null;

  const email = buildQuoteEmail(quote);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: quote.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(12000),
  });

  return response.ok;
}

async function sendToWebhook(quote: QuoteSubmission) {
  const endpoint = process.env.QUOTE_SUBMISSION_URL;
  if (!endpoint) return null;

  let target: URL;
  try {
    target = new URL(endpoint);
  } catch {
    return false;
  }

  const isLocalDevelopment = process.env.NODE_ENV !== "production" && ["localhost", "127.0.0.1"].includes(target.hostname);
  if (target.protocol !== "https:" && !isLocalDevelopment) return false;

  const response = await fetch(target, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.QUOTE_SUBMISSION_TOKEN
        ? { Authorization: `Bearer ${process.env.QUOTE_SUBMISSION_TOKEN}` }
        : {}),
    },
    body: JSON.stringify({ ...quote, estimate: getEstimateLabel(quote) }),
    cache: "no-store",
    signal: AbortSignal.timeout(12000),
  });

  return response.ok;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Please check the request details and try again." }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Some details need attention.", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const emailResult = await sendWithResend(parsed.data);
    const result = emailResult ?? await sendToWebhook(parsed.data);

    if (result === null) {
      return NextResponse.json(
        { message: "Your request has not been sent. Add the email settings in the server environment to enable delivery." },
        { status: 503 },
      );
    }

    if (!result) {
      return NextResponse.json({ message: "We could not send your request just now. Please try again later." }, { status: 502 });
    }

    return NextResponse.json({ message: "Your quote request has been emailed to Royal Cleaning Crew." });
  } catch {
    return NextResponse.json({ message: "We could not send your request just now. Please try again later." }, { status: 502 });
  }
}