import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ClipboardCheck,
  Store,
} from "lucide-react";
import { services, type Service } from "@/data/services";
import { FAQAccordion } from "@/components/FAQAccordion";
import { QuoteForm } from "@/components/QuoteForm";

type ServiceDetail = {
  hero: string[];
  intro: string;
  statement: string;
  when: string;
  audiences: string[];
  inclusions: { title: string; copy: string }[];
  distinction: string;
  prepare: string[];
  optional: string[];
  faq: readonly (readonly [string, string])[];
  moveFocus?: { title: string; copy: string }[];
  stages?: { title: string; copy: string }[];
  process?: { title: string; copy: string }[];
};

const commonFaqs = [
  [
    "How is the final scope confirmed?",
    "The property, condition, selected details, access and service priorities are reviewed before an appointment is confirmed.",
  ],
  [
    "Can I request extra tasks?",
    "Yes. Include them in the request. Accessibility, condition and time requirements are reviewed before they are added to the confirmed scope.",
  ],
  [
    "Does a quote request confirm a booking?",
    "No. A request is an inquiry. Service scope, availability and any final pricing need to be confirmed separately.",
  ],
] as const;

const details: Record<string, ServiceDetail> = {
  "residential-cleaning": {
    hero: ["Your home,", "at its best."],
    intro:
      "Professional maintenance for the place you live, with a checklist shaped around your household rather than applied without context.",
    statement:
      "A well-kept home has a particular kind of ease to it. The surfaces are clear, the rooms feel more settled and the work waiting in the background becomes lighter.",
    when:
      "Choose residential cleaning for ongoing maintenance, a one-time reset before a particular moment, or a recurring rhythm that keeps everyday tasks from building up.",
    audiences: [
      "Households planning recurring care",
      "Condo and apartment residents",
      "Homeowners preparing for guests",
      "People returning from travel",
      "Anyone wanting a one-time reset",
    ],
    inclusions: [
      {
        title: "Kitchen",
        copy:
          "Counters, sink, stovetop, cabinet fronts, table surfaces, exterior appliances and accessible floors, according to the agreed checklist.",
      },
      {
        title: "Bathrooms",
        copy:
          "Toilets, sinks, mirrors, fixtures, tubs or showers, accessible surfaces and floors receive focused attention.",
      },
      {
        title: "Bedrooms",
        copy:
          "Accessible surfaces, dusting, mirrors and floors help return private rooms to a calmer baseline.",
      },
      {
        title: "Living areas",
        copy:
          "Dusting, vacuuming, mopping, touchpoints and general surface care support the rooms where daily life happens.",
      },
    ],
    distinction:
      "Standard cleaning is designed for maintenance. Deep cleaning spends more time on accumulated detail, while a move clean is planned around an empty property and its handover.",
    prepare: [
      "Put away valuables and personal items you do not want moved",
      "Share building, parking and entry instructions",
      "Identify priority rooms or surfaces",
      "Confirm frequency and any optional detail work",
    ],
    optional: [
      "Inside oven",
      "Inside refrigerator",
      "Interior windows",
      "Baseboards",
      "Cabinet interiors",
      "Extra detail areas",
    ],
    faq: [
      [
        "What can recurring cleaning include?",
        "The recurring checklist is set around the home and the agreed priorities. Frequency can be requested as weekly, every two weeks or every four weeks, subject to availability.",
      ],
      [
        "Can I book a one-time clean?",
        "Yes. A one-time request can be useful before guests, after a busy period or when the home needs a fresh baseline.",
      ],
      ...commonFaqs,
    ],
  },
  "deep-cleaning": {
    hero: ["When ordinary", "isn't enough."],
    intro:
      "A more detailed reset for accumulated buildup, reachable edges and the areas routine maintenance does not always reach.",
    statement:
      "A deep clean is not simply more of the same. It is dedicated time for the parts of a room that change its overall impression once they are properly addressed.",
    when:
      "Consider a deep clean after a long gap between professional services, during a seasonal reset, after a busy stretch or when visible buildup needs more attention than a routine visit allows.",
    audiences: [
      "Homes preparing for a seasonal reset",
      "Spaces with accumulated kitchen or bath buildup",
      "Hosts preparing for visitors",
      "Properties transitioning after renovation or moving",
      "Households establishing a recurring baseline",
    ],
    inclusions: [
      {
        title: "Kitchen buildup",
        copy:
          "More time for grease-prone touchpoints, sinks, cabinet fronts, accessible edges and the surfaces carrying the most use.",
      },
      {
        title: "Bathroom detail",
        copy:
          "Fixtures, mirrors, tile areas, shower or tub zones, grout detail and frequently handled points, based on condition and scope.",
      },
      {
        title: "Doors and trim",
        copy:
          "Reachable doors, frames, baseboards and trim can be included where access and surface condition allow.",
      },
      {
        title: "Corners and touchpoints",
        copy:
          "Settled dust, accessible corners, high-touch surfaces and overlooked room details help restore a cleaner baseline.",
      },
    ],
    distinction:
      "Deep cleaning adds time for accumulated detail. Appliance, interior window and cabinet-interior work remain selected add-ons because condition and time requirements vary.",
    prepare: [
      "Identify priority rooms and areas of buildup",
      "Clear personal items from surfaces where possible",
      "Describe delicate finishes or product sensitivities",
      "Select appliance, cabinet or window details in advance",
    ],
    optional: [
      "Inside oven",
      "Inside refrigerator",
      "Interior windows",
      "Baseboards and doors",
      "Cabinet interiors",
      "Extra detail areas",
    ],
    faq: [
      [
        "Is deep cleaning a guarantee that every mark will come out?",
        "No. Results depend on surface material, age, buildup and what can be safely cleaned. Share unusual conditions before service.",
      ],
      [
        "Are interior appliances included automatically?",
        "No. Appliance interiors need to be requested so their condition and time requirements can be reviewed.",
      ],
      ...commonFaqs,
    ],
  },
  "move-in-move-out": {
    hero: ["Walk in.", "Feel at home."],
    intro:
      "An empty space gives a cleaner room to work. Prepare for arrival, create a considered handover or get a property ready for what comes next.",
    statement:
      "Moving has enough moving parts. A clean, accessible space is one of the details that can make the transition feel more manageable.",
    when:
      "Request service after belongings are removed and before new items arrive whenever possible. Open rooms provide better access to floors, cabinets, fixtures and details usually hidden by daily life.",
    audiences: [
      "People arriving in a new home",
      "Tenants preparing a handover",
      "Landlords and property managers",
      "Homeowners coordinating a sale",
      "Anyone preparing an empty property",
    ],
    inclusions: [
      {
        title: "Kitchen and cabinets",
        copy:
          "Counters, sinks, stovetop areas, cabinet fronts and requested interiors receive attention while the space is accessible.",
      },
      {
        title: "Bathrooms",
        copy:
          "Fixtures, mirrors, accessible shower or tub surfaces and floors are prepared for the next occupant.",
      },
      {
        title: "Closets and rooms",
        copy:
          "Accessible shelves, closet interiors and empty-room surfaces can be included in the agreed scope.",
      },
      {
        title: "Floors and final pass",
        copy:
          "Vacuuming, mopping, reachable edges and a final room-by-room presentation check help prepare the space.",
      },
    ],
    distinction:
      "Unlike routine home cleaning, move service is planned around an empty property and a transition date. It supports presentation and handover but cannot guarantee a security-deposit outcome.",
    prepare: [
      "Remove personal belongings and packing materials where possible",
      "Confirm keys, elevator bookings and building procedures",
      "Say whether the clean is for move-in, move-out or listing",
      "Request appliance and cabinet interiors if needed",
    ],
    optional: [
      "Inside oven",
      "Inside refrigerator",
      "Cabinet interiors",
      "Closets",
      "Interior windows",
      "Baseboards",
    ],
    moveFocus: [
      {
        title: "Walk in. Feel at home.",
        copy:
          "Before furniture arrives, accessible cabinets, closets, kitchen surfaces, bathrooms and floors can receive a deliberate first clean.",
      },
      {
        title: "Leave it ready for what’s next.",
        copy:
          "For a rental handover or sale, an empty-property checklist can focus on visible detail, fixtures and the areas the next occupant will notice.",
      },
    ],
    faq: [
      [
        "Do you guarantee a security-deposit return?",
        "No. Cleaning supports a more considered handover, but deposit decisions remain with the property owner or manager.",
      ],
      [
        "Does the property need to be empty?",
        "An empty or mostly empty home allows the most complete access. Share any remaining furniture or belongings when requesting service.",
      ],
      ...commonFaqs,
    ],
  },
  "airbnb-cleaning": {
    hero: ["Guest-ready,", "every turn."],
    intro:
      "Operational cleaning between stays, planned around check-in timing, property access and the details guests notice first.",
    statement:
      "A turnover has to read as intentional the moment a guest opens the door: the bed, bathroom, kitchen, floor and small presentation details all matter.",
    when:
      "Turnover service is designed around a defined window between stays. Share reservation timing, entry instructions, linen routines and the host’s own checklist before scope is confirmed.",
    audiences: [
      "Short-term rental hosts",
      "Property managers",
      "Operators coordinating recurring stays",
      "Owners with multiple turnover tasks",
      "Hosts who need a defined reset sequence",
    ],
    inclusions: [
      {
        title: "Bedroom reset",
        copy:
          "Beds, accessible surfaces, floors and presentation follow the agreed linen and room checklist.",
      },
      {
        title: "Bathroom reset",
        copy:
          "Fixtures, mirrors, shower or tub areas, surfaces and floors receive a guest-ready refresh.",
      },
      {
        title: "Kitchen and living",
        copy:
          "Counters, sinks, stovetop, accessible appliances, tables, touchpoints and floors are prepared for the next arrival.",
      },
      {
        title: "Handoff details",
        copy:
          "Trash, supply concerns and host-specific presentation notes can be included in a documented checklist.",
      },
    ],
    distinction:
      "Turnover cleaning is operational, not simply a residential visit on a tighter schedule. Timing, access, linen coordination and restocking expectations need to be agreed rather than assumed.",
    prepare: [
      "Provide checkout, check-in and access procedures",
      "Share the host checklist and linen process",
      "Confirm restocking expectations, if applicable",
      "Identify a process for reporting damage or missing items",
    ],
    optional: [
      "Linen coordination by agreement",
      "Restocking by agreement",
      "Inside appliance detail",
      "Interior windows",
      "Host-specific checklist items",
    ],
    faq: [
      [
        "Can linen coordination or restocking be included?",
        "These tasks can be discussed as part of a workflow, but should only be expected when explicitly confirmed in the service scope.",
      ],
      [
        "Can every turnover be scheduled automatically?",
        "Recurring timing can be requested. Availability and the handoff workflow still need to be confirmed.",
      ],
      ...commonFaqs,
    ],
  },
  "commercial-cleaning": {
    hero: ["A cleaner workplace", "starts behind the scenes."],
    intro:
      "A professional cleaning plan for the spaces where people work, meet, wait, shop and make decisions.",
    statement:
      "A workplace communicates before anyone says a word. Reception, washrooms and shared areas quietly shape how the operation behind them feels.",
    when:
      "Commercial cleaning can be requested as recurring maintenance, a one-time reset or a defined project. A useful scope considers foot traffic, surfaces, operating hours and access requirements.",
    audiences: [
      "Offices and professional studios",
      "Retail and customer-facing spaces",
      "Clinics and shared workplaces",
      "Property managers coordinating common areas",
      "Businesses with recurring service needs",
    ],
    inclusions: [
      {
        title: "Workstations",
        copy:
          "Accessible desk surfaces, shared equipment exteriors and floor areas are addressed according to the agreed workplace protocol.",
      },
      {
        title: "Meeting and reception",
        copy:
          "Tables, visitor areas, waiting spaces and visible touchpoints can be prioritized for a consistent presentation.",
      },
      {
        title: "Washrooms and kitchens",
        copy:
          "Fixtures, sinks, counters, touchpoints, floors and agreed consumable checks are shaped to the site requirements.",
      },
      {
        title: "Floors and traffic paths",
        copy:
          "Vacuuming, mopping and accessible floor care are planned around materials, traffic and service timing.",
      },
    ],
    distinction:
      "Commercial service starts with the site, traffic, access, hours and priorities. It is not reduced to an instant residential price because professional spaces work differently.",
    prepare: [
      "Share floor area, room types and service-window preferences",
      "Identify secure access and building procedures",
      "Flag visitor-facing or high-traffic areas",
      "Note special surfaces and any restricted spaces",
    ],
    optional: [
      "Recurring schedule planning",
      "After-hours service discussion",
      "Additional washroom detail",
      "Floor-care priorities",
      "Custom scope areas",
    ],
    process: [
      {
        title: "Walk the site",
        copy:
          "Map work areas, shared rooms, washrooms, traffic and access requirements.",
      },
      {
        title: "Set the service window",
        copy:
          "Agree a workable schedule, priorities and building procedures before service begins.",
      },
      {
        title: "Review the scope",
        copy:
          "Confirm the recurring checklist and how changes or special requests are handled.",
      },
    ],
    faq: [
      [
        "Can cleaning be arranged after business hours?",
        "Preferred service windows can be included in the request. Availability depends on the site and schedule.",
      ],
      [
        "How is a commercial plan scoped?",
        "Property layout, traffic, surface types, frequency, access and operating hours inform the proposal.",
      ],
      ...commonFaqs,
    ],
  },
  "janitorial-services": {
    hero: ["A better rhythm", "for every workday."],
    intro:
      "Professional recurring cleaning and maintenance for the shared spaces your team relies on throughout the week.",
    statement:
      "When daily-use spaces are cared for consistently, the workplace feels more ready for the people who arrive next.",
    when:
      "Request janitorial service when washrooms, work areas, entries and shared rooms need a defined recurring routine. Frequency and service windows are set around your site.",
    audiences: [
      "Office and workplace managers",
      "Commercial property teams",
      "Shared staff environments",
      "Professional studios and clinics",
      "Organizations coordinating recurring care",
    ],
    inclusions: [
      {
        title: "Entries and reception",
        copy:
          "Visible counters, door touchpoints and floors help keep the first shared space orderly.",
      },
      {
        title: "Work and meeting areas",
        copy:
          "Accessible work surfaces, tables and common touchpoints are handled to the agreed workplace protocol.",
      },
      {
        title: "Washrooms and staff rooms",
        copy:
          "Fixtures, sinks, counters, high-touch points and floors can be prioritized on a recurring checklist.",
      },
      {
        title: "Floors and waste",
        copy:
          "Vacuuming, mopping and agreed waste removal are scheduled around site traffic and access.",
      },
    ],
    distinction:
      "Janitorial service is planned as an ongoing building routine: rooms, frequency, timing, access and priorities are agreed together rather than assumed from a one-time clean.",
    prepare: [
      "List rooms, approximate area and washroom count",
      "Share access, alarm, parking and key procedures",
      "Identify restricted zones and sensitive equipment",
      "Note preferred service times and recurring priorities",
    ],
    optional: [
      "After-hours schedule review",
      "Additional washroom detail",
      "Kitchen and breakroom rotation",
      "Floor-care priorities",
      "Restocking coordination by agreement",
    ],
    process: [
      {
        title: "Map the routine",
        copy:
          "Identify shared areas, service frequency and what must be addressed on every visit.",
      },
      {
        title: "Coordinate access",
        copy:
          "Agree access, building procedures, supply expectations and a service window.",
      },
      {
        title: "Maintain the scope",
        copy:
          "Use a consistent checklist and review changes as the workplace needs evolve.",
      },
    ],
    faq: [
      [
        "Can janitorial service recur several times a week?",
        "Share the desired cadence in your request. Scope and schedule are reviewed against the property and availability.",
      ],
      [
        "Can the service happen before staff arrive?",
        "Early or after-hours windows can be requested. Access and availability must be confirmed.",
      ],
      ...commonFaqs,
    ],
  },
  "store-cleaning": {
    hero: ["Ready before", "the doors open."],
    intro:
      "Retail cleaning for customer-facing areas, floors, washrooms and staff spaces, arranged around the way your store trades.",
    statement:
      "A retail space is in use from the moment a customer walks in. Clear floors, cared-for touchpoints and tidy shared areas support a more considered visit.",
    when:
      "Choose store cleaning when a sales floor, fitting rooms, entry, washroom or staff area needs a recurring routine or a focused reset around operating hours.",
    audiences: [
      "Independent retail shops",
      "Multi-room storefronts",
      "Showrooms and customer studios",
      "Retail property managers",
      "Stores planning opening or closing cleans",
    ],
    inclusions: [
      {
        title: "Entry and sales floor",
        copy:
          "Accessible floor paths, counters and high-touch surfaces can be prioritized around customer traffic.",
      },
      {
        title: "Fitting rooms and displays",
        copy:
          "Mirrors, touchpoints and accessible floor areas help keep try-on and display zones ready.",
      },
      {
        title: "Checkout and customer areas",
        copy:
          "Counters and shared touchpoints are included according to store protocol and equipment requirements.",
      },
      {
        title: "Washrooms and staff areas",
        copy:
          "Fixtures, sinks, break spaces and agreed waste handling can be added to the recurring scope.",
      },
    ],
    distinction:
      "Retail work is sequenced around customer traffic, product displays, security procedures and the hours when each area can be accessed.",
    prepare: [
      "Share opening hours and the preferred cleaning window",
      "Identify display, stock and equipment areas to avoid",
      "Confirm access and alarm procedures",
      "Flag high-traffic zones and material-specific floor care",
    ],
    optional: [
      "Pre-opening floor detail",
      "Fitting-room rotation",
      "Interior glass where accessible",
      "Washroom detail",
      "Additional touchpoint schedule",
    ],
    process: [
      {
        title: "Prioritize the customer path",
        copy:
          "Map the entry, checkout, sales floor and the areas that see the most daily traffic.",
      },
      {
        title: "Fit the trading hours",
        copy:
          "Choose an agreed service window and confirm security and access steps.",
      },
      {
        title: "Set the rotation",
        copy:
          "Define what happens each visit and which detail areas need a less frequent rotation.",
      },
    ],
    faq: [
      [
        "Can store cleaning happen before opening?",
        "A pre-opening service window can be requested. Access and schedule availability are confirmed with the site.",
      ],
      [
        "Can displays and stock areas be cleaned?",
        "The scope can include accessible agreed surfaces. Product, stock and display handling boundaries should be clear before service.",
      ],
      ...commonFaqs,
    ],
  },
  "building-cleaning": {
    hero: ["Shared spaces", "kept in rhythm."],
    intro:
      "Coordinated cleaning for larger commercial buildings, common areas and the spaces tenants and visitors share.",
    statement:
      "In a multi-use property, common areas connect the whole building. Their care depends on access, traffic and a consistent site-wide routine.",
    when:
      "Request building cleaning when a commercial property needs recurring support for lobbies, corridors, shared washrooms or other common spaces.",
    audiences: [
      "Commercial property managers",
      "Multi-tenant office buildings",
      "Managed workplace properties",
      "Building operations teams",
      "Owners planning common-area maintenance",
    ],
    inclusions: [
      {
        title: "Lobbies and entrances",
        copy:
          "Visible floor paths, accessible surfaces and door touchpoints help maintain shared arrival spaces.",
      },
      {
        title: "Corridors and shared routes",
        copy:
          "Common circulation areas are scoped according to surface, traffic, access and service timing.",
      },
      {
        title: "Shared facilities",
        copy:
          "Common washrooms, staff rooms or amenity spaces can be included where they are part of the agreed property scope.",
      },
      {
        title: "Site-specific priorities",
        copy:
          "Each building can set a recurring checklist for the rooms, floors and touchpoints that matter most.",
      },
    ],
    distinction:
      "Building cleaning requires coordinated access and a clear distinction between shared spaces and tenant-controlled areas. The quote is based on the site, not a residential price matrix.",
    prepare: [
      "Share floor plans or a list of included common areas",
      "Identify tenant-only or restricted spaces",
      "Provide building access and security procedures",
      "Note expected traffic patterns and preferred service windows",
    ],
    optional: [
      "Multi-floor schedule planning",
      "Shared washroom rotation",
      "Lobby and entry floor detail",
      "High-touch schedule",
      "Tenant turnover coordination by agreement",
    ],
    process: [
      {
        title: "Define the boundary",
        copy:
          "Confirm which floors, common areas and facilities are included in the service.",
      },
      {
        title: "Coordinate building access",
        copy:
          "Agree keys, security procedures, tenant communications and service windows.",
      },
      {
        title: "Maintain shared areas",
        copy:
          "Set recurring priorities and a simple review process for site changes or special requests.",
      },
    ],
    faq: [
      [
        "Can a cleaning plan cover multiple floors?",
        "Yes. Include floor count, shared facilities and access details so the building scope can be reviewed.",
      ],
      [
        "Do you clean inside tenant suites?",
        "Only when explicitly included in the confirmed scope and access has been arranged.",
      ],
      ...commonFaqs,
    ],
  },
  "post-construction": {
    hero: ["From dust", "to finished."],
    intro:
      "Fine residue and finishing detail after renovation or construction activity has ended and the site is ready to move toward use.",
    statement:
      "The work may be complete, but a space rarely feels finished until dust is addressed, surfaces read clearly and the architecture can take its place.",
    when:
      "Request a post-construction clean after the main work has wrapped and the site is safe and ready for cleaning. The project stage and finish materials affect the sequence and scope.",
    audiences: [
      "Homeowners after renovation",
      "New-build property owners",
      "Builders and contractors",
      "Commercial completion projects",
      "Property managers preparing a handover",
    ],
    inclusions: [
      {
        title: "Fine dust",
        copy:
          "Accessible ledges, fixtures, floors and finished surfaces are reviewed for settled construction dust.",
      },
      {
        title: "Surface residue",
        copy:
          "Packaging remnants, tracked dirt and appropriate residue are addressed with attention to finished materials.",
      },
      {
        title: "Cabinetry and fixtures",
        copy:
          "Accessible cabinet exteriors, fixtures and detailing are included according to the project scope and site readiness.",
      },
      {
        title: "Glass and final detail",
        copy:
          "Reachable interior glass and a room-by-room final pass can support presentation and handover where included.",
      },
    ],
    distinction:
      "Post-construction work is not routine maintenance. Dust can resettle and some residue requires a specific method; site condition and material guidance should be discussed first.",
    prepare: [
      "Confirm active construction and sanding have stopped",
      "Share site access, parking and safety requirements",
      "Identify fragile finishes and incomplete areas",
      "Describe whether the project needs a rough, detailed or final clean",
    ],
    optional: [
      "Interior windows and glass",
      "Cabinet interiors",
      "Fixture detailing",
      "Additional floor passes",
      "Final presentation walkthrough",
    ],
    stages: [
      {
        title: "Rough clean",
        copy:
          "Loose packaging and the first accessible layer of site dust are addressed once work is complete.",
      },
      {
        title: "Detailed clean",
        copy:
          "Surfaces, fixtures, floors and room-by-room residue receive focused attention.",
      },
      {
        title: "Final pass",
        copy:
          "A presentation-oriented review prepares the finished space for its next use.",
      },
    ],
    faq: [
      [
        "Can cleaning happen while a build is active?",
        "The site must be safe and the work area ready. Share current conditions so timing and scope can be reviewed.",
      ],
      [
        "Are exterior windows included?",
        "This page describes accessible interior glass. Exterior access and any height-related work require separate confirmation.",
      ],
      ...commonFaqs,
    ],
  },
  "listing-cleaning": {
    hero: ["Ready to show.", "Ready for next."],
    intro:
      "Presentation-led cleaning for homes and rental properties preparing for photography, viewings or a sale.",
    statement:
      "A property is read in the details: clear surfaces, cared-for floors and rooms that feel ready to be seen.",
    when:
      "Choose listing cleaning when a property is being photographed, shown to prospective buyers or prepared for a new occupant. Share the schedule and any staging requirements with the request.",
    audiences: [
      "Homeowners preparing to sell",
      "Property managers preparing listings",
      "Hosts refreshing a rental",
      "Agents coordinating a showing window",
      "Owners arranging an empty-property clean",
    ],
    inclusions: [
      {
        title: "Kitchen and bath",
        copy:
          "Visible counters, sinks, fixtures, mirrors and floors receive presentation-focused attention.",
      },
      {
        title: "Living areas",
        copy:
          "Accessible surfaces, dust, touchpoints and floor paths help the main rooms feel orderly.",
      },
      {
        title: "Entry and first impression",
        copy:
          "The entry, door glass where accessible and visible transition points can be prioritized.",
      },
      {
        title: "Finishing details",
        copy:
          "Baseboards, appliance interiors and cabinet work can be added where time, access and condition allow.",
      },
    ],
    distinction:
      "Listing service prioritizes the spaces that will be seen. It is not staging, repair or maintenance work; the requested presentation scope should be agreed in advance.",
    prepare: [
      "Share photo, showing or possession dates",
      "Coordinate cleaning after staging or trades where possible",
      "Identify rooms that need the strongest presentation",
      "Request appliance and interior details in advance",
    ],
    optional: [
      "Interior windows",
      "Inside oven or refrigerator",
      "Cabinet interiors",
      "Baseboards",
      "Empty-property detail",
    ],
    faq: [
      [
        "Can a clean be scheduled before photography?",
        "Include the photography or showing window in your request. Timing is subject to confirmed availability.",
      ],
      [
        "Do you provide staging or repairs?",
        "No. This service is for cleaning scope; staging, repairs and property preparation beyond cleaning are not included.",
      ],
      ...commonFaqs,
    ],
  },
  "specialty-cleaning": {
    hero: ["Add the", "finishing details."],
    intro:
      "Focused cleaning for tasks that are not always part of routine service but can change the way a room feels.",
    statement:
      "An oven interior before guests arrive, a refrigerator reset after a move, or clean baseboards in a bright room: detail work is worth choosing on purpose.",
    when:
      "Choose specialty work when an area needs dedicated time, or when a particular task should be added to a broader service.",
    audiences: [
      "Customers adding detail to a home clean",
      "Move-in and move-out clients",
      "Hosts preparing a rental",
      "Homeowners focused on appliances or edges",
      "Anyone with a specific cleaning request",
    ],
    inclusions: [
      {
        title: "Appliance interiors",
        copy:
          "Oven and refrigerator interiors can be requested when they need more than an exterior wipe-down.",
      },
      {
        title: "Interior windows",
        copy:
          "Reachable interior glass and window details can be selected for light and presentation.",
      },
      {
        title: "Baseboards and cabinets",
        copy:
          "These detail areas can be added where access, condition and material allow.",
      },
      {
        title: "Custom areas",
        copy:
          "Describe the task and surface. The request can be reviewed for access, material, condition and time.",
      },
    ],
    distinction:
      "Specialty cleaning is modular. Each item is reviewed for condition, size, accessibility and whether it is part of another booked service.",
    prepare: [
      "List the exact tasks you want reviewed",
      "Describe unusual buildup or surface condition",
      "Clear appliance and cabinet interiors where applicable",
      "Mention access limits or materials that need care",
    ],
    optional: [
      "Inside oven",
      "Inside refrigerator",
      "Interior windows",
      "Baseboards",
      "Cabinet interiors",
      "Custom detail work",
    ],
    faq: [
      [
        "Can I request a custom detail?",
        "Yes. Describe the area and the result you are looking for so the request can be assessed.",
      ],
      [
        "Can specialty tasks be added to recurring cleaning?",
        "They can be requested. Whether they fit the visit depends on time, access and the confirmed scope.",
      ],
      ...commonFaqs,
    ],
  },
};

const commercialServices = services.filter((service) =>
  ["janitorial-services", "store-cleaning", "building-cleaning"].includes(
    service.slug
  )
);
const commercialServiceIcons = {
  "janitorial-services": ClipboardCheck,
  "store-cleaning": Store,
  "building-cleaning": Building2,
};

export function ServicePage({ service }: { service: Service }) {
  const detail = details[service.slug];
  const isDark = [
    "commercial-cleaning",
    "janitorial-services",
    "store-cleaning",
    "building-cleaning",
    "post-construction",
  ].includes(service.slug);

  return (
    <>
      {/* ================= SERVICE HERO ================= */}
      <section
        className={`service-hero relative isolate overflow-hidden ${
          isDark ? "bg-[#222724] text-white" : "bg-[#eeece5] text-[var(--ink)]"
        }`}
      >
        <div className="container grid min-h-[580px] items-center gap-10 py-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-16 lg:py-24">
          <div className="flex flex-col justify-center">
            
            {/* Breadcrumbs */}
            <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
              <Link
                href="/services"
                className={`transition-colors hover:text-[#c3a56f] ${
                  isDark ? "text-white/60" : "text-[var(--muted)]"
                }`}
              >
                Services
              </Link>
              <span className="text-[var(--brass)]" aria-hidden="true">
                /
              </span>
              <span className={isDark ? "text-white/90" : "text-[var(--ink)]"}>
                {service.title}
              </span>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-current/10 bg-current/5 px-3.5 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c3a56f]" />
              <p
                className={`text-[11px] font-semibold tracking-[0.18em] uppercase ${
                  isDark ? "text-[var(--brass-light)]" : "text-[var(--brass)]"
                }`}
              >
                {service.title} · Calgary
              </p>
            </div>

            <h1 className="display mt-6 text-4xl font-light tracking-tight sm:text-6xl lg:text-[72px] leading-[1.05]">
              {detail.hero.map((line, index) => (
                <span className="block font-medium" key={`${line}-${index}`}>
                  {line}
                </span>
              ))}
            </h1>

            <p
              className={`mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${
                isDark ? "text-white/75" : "text-[var(--muted)]"
              }`}
            >
              {detail.intro}
            </p>

            <div className="mt-8">
              <div className="mt-8">
  <Link
    href="#request"
    className={`inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold shadow-md transition-all duration-300 active:scale-[0.98] ${
      isDark
        ? "border border-[#c3a56f] bg-[#c3a56f] !text-[#111412] hover:bg-[#d8c08a] hover:shadow-[#c3a56f]/30"
        : "border border-[#1c201d] bg-[#1c201d] !text-white hover:bg-black hover:shadow-lg"
    }`}
  >
    {service.cta} <ArrowRight size={15} />
  </Link>
</div>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-current/10 shadow-2xl lg:aspect-auto lg:h-[460px]">
            <Image
              src={service.image}
              alt={`${service.title} service setting in Calgary`}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 48vw"
              className="object-cover object-center transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 rounded-lg border border-white/20 bg-[#1c201d]/90 px-3.5 py-2 text-[10px] font-bold tracking-[0.14em] text-white uppercase backdrop-blur-md shadow-md">
              A considered scope · Calgary
            </span>
          </div>
        </div>
      </section>

      {/* ================= STATEMENT / WHEN IT FITS ================= */}
      <section className="py-24 sm:py-28 lg:py-32">
        <div className="container grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:gap-16 lg:items-end">
          <h2 className="display max-w-4xl text-3xl font-normal leading-[1.15] sm:text-5xl lg:text-6xl text-[var(--ink)]">
            {detail.statement}
          </h2>
          <div className="flex flex-col justify-end border-l border-[var(--line)] pl-6 lg:pl-10">
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              When this service fits
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              {detail.when}
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHO IT SERVES ================= */}
      <section className="bg-[#222724] py-20 text-white sm:py-24 lg:py-28">
        <div className="container grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass-light)]">
              Who it serves
            </p>
            <h2 className="display mt-3 text-3xl font-normal leading-snug sm:text-4xl lg:text-5xl text-white">
              Built around real situations.
            </h2>
          </div>

          <ul className="divide-y divide-white/15 border-y border-white/15">
            {detail.audiences.map((audience, index) => (
              <li
                className="group flex min-h-[64px] items-center gap-5 py-4 text-sm font-medium text-white/80 transition-colors hover:text-white sm:text-base"
                key={audience}
              >
                <span className="display text-base font-light text-[#c3a56f] transition-transform duration-300 group-hover:scale-110">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{audience}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= MOVE FOCUS CARDS ================= */}
      {detail.moveFocus && (
        <section className="border-y border-[#c8c5bb]/60 bg-[#eeece5] py-20 sm:py-24">
          <div className="container grid gap-8 md:grid-cols-2">
            {detail.moveFocus.map((focus, index) => (
              <article
                className="flex flex-col justify-between rounded-2xl border border-[#c8c5bb] bg-white/70 p-8 shadow-sm backdrop-blur-sm sm:p-10"
                key={focus.title}
              >
                <div>
                  <span className="eyebrow text-[11px] font-semibold tracking-wider text-[var(--brass)] uppercase">
                    Move service · 0{index + 1}
                  </span>
                  <h3 className="display mt-3 text-3xl font-normal sm:text-4xl text-[var(--ink)]">
                    {focus.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  {focus.copy}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ================= ROOM BY ROOM INCLUSIONS ================= */}
      <section className="py-24 sm:py-28 lg:py-32">
        <div className="container">
          <div className="grid gap-6 border-b border-[var(--line)] pb-8 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <div>
              <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
                Scope, room by room
              </p>
              <h2 className="display mt-3 text-3xl font-normal text-[var(--ink)] sm:text-4xl lg:text-5xl">
                What the service considers.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base lg:text-right">
              The final checklist is confirmed for the property. These are the areas that can shape the service plan.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {detail.inclusions.map((item, index) => (
              <article
                className="group flex flex-col justify-between rounded-2xl border border-[var(--line)] bg-white/60 p-7 shadow-sm transition-all duration-300 hover:border-[#c3a56f]/60 hover:shadow-md sm:p-8"
                key={item.title}
              >
                <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
                  <h3 className="display text-2xl font-normal text-[var(--ink)] sm:text-3xl">
                    {item.title}
                  </h3>
                  <span className="text-xs font-bold tracking-wider text-[var(--brass)] uppercase">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-[15px]">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMMERCIAL SPECIALTIES DIRECTORY ================= */}
      {service.slug === "commercial-cleaning" && (
        <section className="border-y border-[#c8c5bb]/60 bg-[#eeece5] py-20 sm:py-24">
          <div className="container grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:h-fit">
              <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
                Commercial specialties
              </p>
              <h2 className="display mt-3 text-3xl font-normal leading-snug sm:text-4xl lg:text-5xl text-[var(--ink)]">
                The right plan for the way the building works.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                Explore recurring janitorial care, customer-facing retail cleaning and shared-space building plans.
              </p>
            </div>

            <div className="divide-y divide-[#c9c6bd] rounded-2xl border border-[#c9c6bd] bg-white/70 p-2 shadow-sm backdrop-blur-sm sm:p-4">
              {commercialServices.map((item, index) => {
                const Icon =
                  commercialServiceIcons[
                    item.slug as keyof typeof commercialServiceIcons
                  ];
                return (
                  <Link
                    className="group grid min-h-[120px] gap-4 p-4 transition-all duration-300 hover:bg-white sm:grid-cols-[110px_1fr_auto] sm:items-center sm:rounded-xl"
                    href={`/services/${item.slug}`}
                    key={item.slug}
                  >
                    <div className="relative hidden aspect-[4/3] overflow-hidden rounded-lg sm:block">
                      <Image
                        src={item.image}
                        alt={`${item.title} service setting`}
                        fill
                        sizes="110px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider text-[var(--brass)] uppercase">
                        <Icon size={14} />
                        {String(index + 1).padStart(2, "0")} · {item.title}
                      </span>
                      <p className="mt-2 max-w-xl text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
                        {item.short}
                      </p>
                    </div>
                    <div className="hidden h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-neutral-50 text-[var(--ink)] transition-colors group-hover:bg-[#c3a56f] group-hover:text-[#1c201d] sm:flex">
                      <ArrowUpRight size={16} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ================= POST-CONSTRUCTION STAGES ================= */}
      {detail.stages && (
        <section className="bg-[#222724] py-20 text-white sm:py-24">
          <div className="container">
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass-light)]">
              Post-construction sequence
            </p>
            <h2 className="display mt-3 max-w-2xl text-3xl font-normal sm:text-4xl lg:text-5xl text-white">
              Three stages toward handover.
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {detail.stages.map((stage, index) => (
                <article
                  className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#c3a56f]/50 hover:bg-white/[0.05]"
                  key={stage.title}
                >
                  <div>
                    <span className="display text-4xl font-light text-[#c3a56f]">
                      0{index + 1}
                    </span>
                    <h3 className="display mt-6 text-2xl font-normal sm:text-3xl text-white">
                      {stage.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/65">
                    {stage.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= SERVICE PROCESS STEPS ================= */}
      {detail.process && (
        <section className="bg-[#222724] py-20 text-white sm:py-24">
          <div className="container">
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass-light)]">
              A clear service rhythm
            </p>
            <h2 className="display mt-3 max-w-2xl text-3xl font-normal sm:text-4xl lg:text-5xl text-white">
              How the work comes together.
            </h2>

            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {detail.process.map((stage, index) => (
                <li
                  className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#c3a56f]/50 hover:bg-white/[0.05]"
                  key={stage.title}
                >
                  <div>
                    <span className="display text-4xl font-light text-[#c3a56f]">
                      0{index + 1}
                    </span>
                    <h3 className="display mt-6 text-2xl font-normal sm:text-3xl text-white">
                      {stage.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/65">
                    {stage.copy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ================= DISTINCTION & OPTIONAL ADD-ONS ================= */}
      <section className="border-t border-[#c8c5bb]/60 bg-[#eeece5] py-20 sm:py-24">
        <div className="container grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          <div>
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              Know what changes
            </p>
            <h2 className="display mt-3 text-3xl font-normal sm:text-4xl lg:text-5xl text-[var(--ink)]">
              The right clean for the moment.
            </h2>
          </div>

          <div className="rounded-2xl border border-[#c9c6bd] bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              {detail.distinction}
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5 border-t border-[#c9c6bd]/60 pt-5">
              {detail.optional.map((item) => (
                <span
                  className="rounded-lg border border-[#c9c6bd] bg-white px-3.5 py-1.5 text-xs font-semibold text-[var(--ink)] shadow-2xs"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PREPARATION CHECKLIST ================= */}
      <section className="bg-[#222724] py-20 text-white sm:py-24">
        <div className="container grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass-light)]">
              Before the service
            </p>
            <h2 className="display mt-3 text-3xl font-normal sm:text-4xl lg:text-5xl text-white">
              A little preparation helps.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
              These details make it easier to plan access and confirm what can be completed.
            </p>
          </div>

          <ol className="divide-y divide-white/15 border-y border-white/15">
            {detail.prepare.map((item, index) => (
              <li
                className="group flex min-h-[64px] items-center gap-4 py-4 text-sm font-medium text-white/80 sm:text-base"
                key={item}
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c3a56f]/20 text-[#c3a56f]">
                  <Check size={14} strokeWidth={2.5} />
                </div>
                <span>{item}</span>
                <span className="ml-auto text-xs font-semibold text-white/35">
                  0{index + 1}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-24 sm:py-28 lg:py-32">
        <div className="container grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
              Service questions
            </p>
            <h2 className="display mt-3 text-3xl font-normal sm:text-4xl lg:text-5xl text-[var(--ink)]">
              Useful details before you request.
            </h2>
          </div>
          <FAQAccordion items={detail.faq} />
        </div>
      </section>

      {/* ================= BOTTOM REQUEST CTA ================= */}
      {service.slug === "commercial-cleaning" ? (
        <section className="border-t border-[#c8c5bb]/60 bg-[#eeece5] py-20 sm:py-24" id="request">
          <div className="container grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
            <div>
              <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
                Commercial inquiry
              </p>
              <h2 className="display mt-3 text-3xl font-normal sm:text-4xl lg:text-5xl text-[var(--ink)]">
                Tell us how your workplace works.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                Share the site, hours, priorities and access requirements. Commercial service is scoped individually rather than priced with the residential estimator.
              </p>
            </div>
            
            <div className="rounded-2xl border border-[#c9c6bd] bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
              <QuoteForm commercial initialService="Commercial / Custom Quote" />
            </div>
          </div>
        </section>
      ) : (
        <section className="border-t border-[#c8c5bb]/60 bg-[#eeece5] py-20 sm:py-24" id="request">
          <div className="container">
            <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-[#c8c5bb] bg-white/70 p-8 shadow-sm backdrop-blur-md md:flex-row md:items-center lg:p-12">
              <div>
                <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brass)]">
                  Next step
                </p>
                <h2 className="display mt-3 max-w-2xl text-3xl font-normal text-[var(--ink)] sm:text-4xl lg:text-5xl">
                  Tell us what the space needs.
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  Share a few details for a Calgary property. Scope, final pricing and availability are confirmed separately.
                </p>
              </div>

              <Link
                href={`/contact?service=${encodeURIComponent(service.title)}`}
                className="button inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#c3a56f] bg-[#c3a56f] px-7 py-3.5 text-sm font-medium text-[#1c201d] transition-all duration-300 hover:bg-[#d0b984] hover:shadow-lg hover:shadow-[#c3a56f]/20 active:scale-[0.98]"
              >
                {service.cta} <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}