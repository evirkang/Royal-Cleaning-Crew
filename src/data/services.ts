export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  benefits: string[];
  cta: string;
};

export const services: Service[] = [
  {
    slug: "residential-cleaning",
    title: "Residential Cleaning",
    short: "A reliable rhythm for the rooms you live in every day.",
    description: "Recurring or one-time home cleaning, scoped around your household, surfaces and routine.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85",
    benefits: ["Kitchen, bathrooms and living areas", "Dusting, floors and high-touch points", "Weekly, biweekly or monthly requests"],
    cta: "Request a Home Cleaning Quote",
  },
  {
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    short: "More time for built-up detail and the places routine misses.",
    description: "A room-by-room reset for accumulated kitchen and bathroom buildup, edges, trim and accessible details.",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1400&q=85",
    benefits: ["Detailed kitchen and bathroom attention", "Baseboards, doors and accessible trim", "A thoughtful starting point for recurring care"],
    cta: "Request a Deep Cleaning Quote",
  },
  {
    slug: "move-in-move-out",
    title: "Move-In / Move-Out",
    short: "A fresh start on arrival. A thoughtful finish on the way out.",
    description: "Empty-property cleaning for move-in preparation, rental handover, listing presentation or a change of address.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    benefits: ["Empty rooms, floors and fixtures", "Kitchen, bathrooms and accessible interiors", "Optional appliances, cabinets and baseboards"],
    cta: "Plan a Move Cleaning",
  },
  {
    slug: "airbnb-cleaning",
    title: "Short-Term Rental Cleaning",
    short: "A practical, presentation-minded reset between guest stays.",
    description: "Turnover cleaning planned around check-in timing, access, linen routines and your property checklist.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
    benefits: ["Beds, bathrooms, kitchen and floors", "High-touch details and guest presentation", "Restocking and linen coordination by agreement"],
    cta: "Request a Turnover Quote",
  },
  {
    slug: "commercial-cleaning",
    title: "Commercial Cleaning",
    short: "Workplace care shaped around people, hours and priorities.",
    description: "A defined cleaning scope for offices, meeting rooms, reception, washrooms and customer-facing spaces.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    benefits: ["Workstations, shared areas and washrooms", "Recurring schedules or project-based scope", "After-hours requirements discussed when requesting"],
    cta: "Request a Commercial Quote",
  },
  {
    slug: "janitorial-services",
    title: "Janitorial Services",
    short: "Reliable recurring care for the spaces your team uses every day.",
    description: "Scheduled janitorial cleaning for work areas, shared rooms, washrooms and staff spaces, shaped around building routines.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=85",
    benefits: ["Recurring cleaning and maintenance scope", "Work areas, washrooms and staff spaces", "Schedule and access coordinated with the site"],
    cta: "Request a Janitorial Quote",
  },
  {
    slug: "store-cleaning",
    title: "Store Cleaning",
    short: "Customer-facing retail areas, cleaned around your trading hours.",
    description: "Practical cleaning for sales floors, entry areas, fitting rooms, washrooms and staff spaces in retail environments.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85",
    benefits: ["Sales floor and customer-facing touchpoints", "Fitting rooms, washrooms and staff areas", "Cleaning windows aligned with store operations"],
    cta: "Request a Store Cleaning Quote",
  },
  {
    slug: "building-cleaning",
    title: "Building Cleaning",
    short: "Coordinated cleaning support for larger, shared properties.",
    description: "A site-specific plan for common areas, corridors, lobbies, washrooms and tenant-facing spaces in commercial buildings.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
    benefits: ["Lobbies, corridors and shared facilities", "Recurring schedules and property routines", "Scope coordinated with building access"],
    cta: "Request a Building Cleaning Quote",
  },
  {
    slug: "post-construction",
    title: "Post-Construction Cleaning",
    short: "Fine dust and finishing detail after the work is complete.",
    description: "A staged clean for renovation and new-build spaces moving toward presentation, occupancy or handover.",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=85",
    benefits: ["Accessible dust and surface residue", "Floors, fixtures, cabinetry and finishing detail", "Rough, detailed and final-clean scope"],
    cta: "Discuss a Project",
  },
  {
    slug: "listing-cleaning",
    title: "Listing & Pre-Sale Cleaning",
    short: "A property prepared to photograph, show and welcome its next owner.",
    description: "Presentation-led cleaning for homes and rental properties preparing for photography, showings or a sale.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    benefits: ["Kitchens, baths, floors and visible surfaces", "Optional interior and detail work", "Scheduling discussed around photography or showings"],
    cta: "Request a Listing Clean Quote",
  },
  {
    slug: "specialty-cleaning",
    title: "Specialty Cleaning",
    short: "Focused time for the details that change the finish.",
    description: "Modular detail work for appliance interiors, reachable windows, cabinet interiors, baseboards and custom requests.",
    image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1400&q=85",
    benefits: ["Inside oven and refrigerator", "Interior windows and cabinet interiors", "Custom requests reviewed for scope and access"],
    cta: "Build a Cleaning Scope",
  },
];

export const serviceBySlug = (slug: string) => services.find((service) => service.slug === slug)!;