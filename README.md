# Royal Cleaning Crew

Premium residential, commercial and property cleaning website for Calgary, Alberta. Built with Next.js App Router, React, Tailwind CSS, Framer Motion, Lucide, React Hook Form and Zod.

## Run locally

```powershell
npm.cmd run dev
```

The site runs at `http://localhost:3000`. Use `npm.cmd` in PowerShell when the local execution policy blocks the `npm.ps1` shim.

## Quote delivery

Quote requests are validated in the browser and again by `POST /api/quote`. With Resend configured, the API emails the full request to the business inbox, sets the customer email as reply-to, and includes a server-recomputed estimate. HTML email fields are escaped. The form reports success only after the provider accepts the email; without delivery configuration, it clearly says the request was not sent.

Copy `.env.example` to `.env.local` for development, or configure the same server-only values in the deployment environment:

- `RESEND_API_KEY`: API key from the Resend account.
- `QUOTE_TO_EMAIL`: Inbox that receives quote requests. Multiple recipients can be comma-separated.
- `QUOTE_FROM_EMAIL`: Sender on a domain verified with Resend, for example a `quotes@your-domain.ca` address. Do not use a made-up sender/domain.

If the Resend values are absent, the optional webhook fallback uses `QUOTE_SUBMISSION_URL` (HTTPS in production) and `QUOTE_SUBMISSION_TOKEN` (optional bearer token). No API key, inbox or sender address is included. Restart the development server after changing `.env.local`; redeploy after updating production environment variables. Update the privacy information with the selected provider before enabling live delivery.

## Rates and service area

- Starting rates, size/room adjustments, service minimums, multipliers, frequency adjustments, add-ons and estimate range belong in `src/config/pricing.ts`. The current model is informed by published Calgary 2026 market ranges, is not an official Royal Cleaning Crew price list, and should be confirmed by the business before launch.
- Calgary postal FSA prefixes are maintained in `src/config/service-area.ts`. The postal prefix is an area-level check (some FSAs can cover more than one municipality); the city and province must also match. Verify the list against the actual service boundary before launch and update it when coverage changes.
- Location checks validate Canadian postal format, configured FSA, street-address format, Calgary city and Alberta province. No geocoding provider or address API key is currently configured.

## Before launch

Confirm the production domain in `src/config/site.ts`; review the service-area prefixes and starting-rate model; configure quote delivery; provide the business’s real phone/email if they should be published; and finalize retention, cancellation, payment and other business-specific policy details. The website intentionally avoids unsupported claims, testimonials, certifications and guarantees.

## Checks

```powershell
npm.cmd run lint
npm.cmd run build
```