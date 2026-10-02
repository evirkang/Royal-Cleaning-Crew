type FAQ = readonly [string, string];
type FAQGroup = { title: string; items: FAQ[] };

export const faqGroups: FAQGroup[] = [
  {
    title: "General",
    items: [
      ["What cleaning services can I request?", "Residential, deep, move-in and move-out, short-term rental, commercial, post-construction, listing and specialty cleaning can be requested. The exact scope is confirmed for each property."],
      ["Do you offer one-time and recurring cleaning?", "Both can be requested. Weekly, every-two-week and every-four-week schedules are options in the request form; availability is confirmed before anything is booked."],
      ["Do I need to provide cleaning products?", "Supplies and product preferences should be confirmed when the service scope is reviewed. Include any surface or product sensitivities in your notes."],
    ],
  },
  {
    title: "Residential",
    items: [
      ["What does a standard home clean cover?", "A typical scope considers kitchens, bathrooms, bedrooms, living areas, accessible surfaces, floors, dusting, trash and high-touch points. The confirmed checklist sets what is included at your property."],
      ["Can a cleaner focus on particular rooms?", "Yes. List your priorities in the request so the proposed scope can account for the rooms or details that matter most."],
      ["Should I choose recurring or one-time service?", "Recurring cleaning suits ongoing home maintenance. A one-time clean can suit a specific reset, guest visit or change in routine."],
    ],
  },
  {
    title: "Deep Cleaning",
    items: [
      ["When is deep cleaning the better choice?", "Choose a deep clean when detail work has accumulated, a home needs a seasonal reset, or you want more attention to trim, edges and accessible buildup than a routine visit usually allows."],
      ["Are baseboards, doors and trim included?", "They can be included in the requested deep-clean scope. Mention condition and priority areas so the time and access can be reviewed."],
      ["Are appliance interiors part of every deep clean?", "No. Oven, refrigerator and cabinet interiors are scope-specific details and should be selected or requested separately."],
    ],
  },
  {
    title: "Move-In / Move-Out",
    items: [
      ["Does the property need to be empty?", "An empty or mostly empty property makes floors, cabinets and room details easier to access. Share any remaining furniture or belongings when requesting a quote."],
      ["Can you prepare a rental for handover?", "Move-out service can be scoped around an empty property, visible detail work and the handover requirements you share. The property owner or manager determines acceptance."],
      ["Do you guarantee a security-deposit return?", "No. Cleaning can support a more considered handover, but deposit decisions are made by the property owner or manager."],
    ],
  },
  {
    title: "Short-Term Rental",
    items: [
      ["What is part of a turnover clean?", "A turnover checklist can cover beds, bathrooms, kitchen, floors, trash, touchpoints and guest-facing presentation. Confirm the exact reset with the host or property manager."],
      ["Can you coordinate linens or restocking?", "Linen and restocking coordination can be discussed as part of the proposed workflow; it should not be assumed unless confirmed in the scope."],
      ["Can turnovers be arranged between guest stays?", "Share checkout, check-in and access timing in your request. Turnover windows and recurring availability need to be confirmed before booking."],
    ],
  },
  {
    title: "Commercial",
    items: [
      ["What kinds of workplaces can request cleaning?", "Offices, workstations, meeting rooms, reception, washrooms, retail and other business spaces can be reviewed for a tailored scope."],
        ["Can I request a recurring janitorial plan?", "Janitorial scope can cover common work areas, washrooms, staff spaces, floors and agreed maintenance routines. Frequency and access are confirmed for the property."],
        ["Do you clean retail stores and customer-facing spaces?", "Store cleaning can cover sales floors, entries, fitting rooms, customer touchpoints, washrooms and staff areas, scheduled around store operations."],
        ["What areas can building cleaning include?", "A building plan can include shared lobbies, corridors, common washrooms and agreed tenant-facing spaces. Tenant-controlled areas are only included when explicitly in scope."],
      ["Can service happen outside business hours?", "After-hours requirements can be discussed in the request. Scheduling depends on the location, access requirements and confirmed availability."],
      ["How is a commercial cleaning plan set?", "The property, traffic, surfaces, priorities, frequency, operating hours and access requirements shape the scope. A site-specific quote is more appropriate than a residential estimate."],
    ],
  },
  {
    title: "Pricing",
    items: [
      ["How does the instant estimate work?", "The estimator combines property type, bedrooms, bathrooms, approximate size, cleaning type, frequency and selected add-ons using the editable starting-rate model. It shows a range, not a guaranteed final price."],
      ["What can change a cleaning quote?", "Property size and condition, room count, service type, access, selected details and timing can all affect the scope and final price."],
      ["Is a website estimate a final price?", "No. Any configured range is an initial estimate only. Final pricing depends on the confirmed property condition and agreed service requirements."],
    ],
  },
  {
    title: "Booking",
    items: [
      ["Does sending a request book an appointment?", "No. A request is an inquiry, not a confirmed booking. Timing, scope and availability need to be reviewed and confirmed separately."],
      ["Can I change a request after submitting it?", "If details change, submit an updated request or contact the business through its published channels. Any confirmed booking terms take precedence."],
      ["How far ahead should I request a clean?", "Share your preferred date as early as practical, especially for a move, property handover or rental turnover. Availability is confirmed individually."],
    ],
  },
  {
    title: "Preparation",
    items: [
      ["What should I do before the cleaners arrive?", "Clear everyday clutter from priority surfaces where possible, secure valuables and share access instructions, parking details and building procedures in advance."],
      ["Should I identify delicate surfaces or products to avoid?", "Yes. Note delicate finishes, sensitivities, areas to avoid and any product preferences when requesting service."],
      ["Do I need to be home during the service?", "That depends on the agreed access plan. Confirm key, entry, alarm and closing instructions before the appointment."],
    ],
  },
  {
    title: "Service Areas",
    items: [
      ["Where is service currently available?", "The current configured service area is Calgary, Alberta. The form checks Calgary city and province details together with supported Calgary postal FSA prefixes; an FSA is a postal-area check, not a street-level geocoder."],
      ["Do you currently serve Edmonton, Toronto or Vancouver?", "No. The current service area is Calgary only; addresses outside the configured Calgary area are rejected by the request form."],
      ["What if I live near Calgary?", "Nearby communities are not currently included in the configured service area. The service boundary should be updated before requests from additional communities are accepted."],
    ],
  },
];

export const faqs = faqGroups.flatMap((group) => group.items);