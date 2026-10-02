"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Home,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  Wrench,
  X,
} from "lucide-react";

// Categorized Services for Mega Menu
const residentialServices = [
  {
    title: "Residential Cleaning",
    href: "/services/residential-cleaning",
    desc: "Routine home care and scheduled maintenance.",
    icon: Home,
  },
  {
    title: "Deep Cleaning",
    href: "/services/deep-cleaning",
    desc: "Comprehensive reset for accumulated detail.",
    icon: Sparkles,
  },
  {
    title: "Move-In / Move-Out",
    href: "/services/move-in-move-out",
    desc: "Handover and arrival preparation for empty spaces.",
    icon: Truck,
  },
  {
    title: "Airbnb Turnover",
    href: "/services/airbnb-cleaning",
    desc: "Guest-ready operational turnover sequences.",
    icon: Calendar,
  },
  {
    title: "Listing & Pre-Sale",
    href: "/services/listing-cleaning",
    desc: "Showcase presentation for showings and photography.",
    icon: CheckCircle2,
  },
];

const commercialServices = [
  {
    title: "Commercial Cleaning",
    href: "/services/commercial-cleaning",
    desc: "Workplaces, offices, and client-facing studios.",
    icon: Building2,
  },
  {
    title: "Janitorial Services",
    href: "/services/janitorial-services",
    desc: "Scheduled day and evening recurring care.",
    icon: Clock,
  },
  {
    title: "Store & Retail",
    href: "/services/store-cleaning",
    desc: "Customer areas, sales floors, and staff rooms.",
    icon: Store,
  },
  {
    title: "Building Common Areas",
    href: "/services/building-cleaning",
    desc: "Lobbies, hallways, and multi-tenant facilities.",
    icon: ShieldCheck,
  },
  {
    title: "Post-Construction",
    href: "/services/post-construction",
    desc: "Fine dust removal and handover detailing.",
    icon: Wrench,
  },
];

const mainNavLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Live Estimate" },
  { href: "/process", label: "How It Works" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  const isServicesActive = pathname.startsWith("/services");

  return (
    <header
      className={`sticky top-0 z-50 w-full text-white transition-all duration-300 ${
        isScrolled || servicesOpen
          ? "border-b border-white/15 bg-[#171c19]/98 shadow-2xl backdrop-blur-md"
          : "border-b border-white/10 bg-[#202521]"
      }`}
    >
      {/* ================= TOP UTILITY BAR ================= */}
      <div className="hidden border-b border-white/10 bg-[#131714] py-2 text-[11px] font-medium text-white/75 sm:block">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-white/80">
              <MapPin size={12} className="text-[#c3a56f]" />
              Calgary, AB · Dedicated Cleaning Care
            </span>
            <span className="hidden items-center gap-1.5 text-white/70 md:inline-flex">
              <Sparkles size={12} className="text-[#c3a56f]" />
              Residential, Commercial & Specialty Care
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/pricing"
              className="text-[11px] font-semibold text-[var(--brass-light)] transition-colors hover:text-white"
            >
              Calculate Live Estimate →
            </Link>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <div className="container relative">
        <div className="flex h-20 items-center justify-between gap-4 sm:h-24">
          
          {/* Brand Logo with Illuminated Luxury White Plinth */}
          <Link
            href="/"
            className="group flex shrink-0 items-center transition-transform duration-300 active:scale-95"
            aria-label="Royal Cleaning Crew Home"
          >
            <div className="relative flex items-center justify-center rounded-2xl bg-white px-3 py-1 shadow-md ring-1 ring-white/40 transition-all duration-300 group-hover:scale-105 group-hover:ring-2 group-hover:ring-[#c3a56f] group-hover:shadow-lg group-hover:shadow-[#c3a56f]/20 sm:px-4 sm:py-1.5">
              <div className="relative h-11 w-28 sm:h-12 sm:w-32 md:h-14 md:w-36 lg:h-15 lg:w-40">
                <Image
                  src="/logo.png"
                  alt="Royal Cleaning Crew Logo"
                  fill
                  priority
                  sizes="(max-width: 640px) 120px, (max-width: 1024px) 150px, 180px"
                  className="object-contain object-center"
                />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex xl:gap-2">
            
            {/* Home Link */}
            <Link
              href="/"
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
                pathname === "/"
                  ? "!text-[#c3a56f]"
                  : "!text-white/85 hover:bg-white/10 hover:!text-white"
              }`}
            >
              Home
            </Link>

            {/* SERVICES MEGA MENU TRIGGER */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`group inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
                  isServicesActive || servicesOpen
                    ? "!text-[#c3a56f] bg-white/5"
                    : "!text-white/85 hover:bg-white/10 hover:!text-white"
                }`}
                aria-expanded={servicesOpen}
              >
                <span>Services</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    servicesOpen ? "rotate-180 text-[#c3a56f]" : "text-white/60 group-hover:text-white"
                  }`}
                />
              </button>
            </div>

            {/* Remaining Nav Links */}
            {mainNavLinks.slice(1).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative rounded-lg px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 xl:px-4 ${
                    isActive
                      ? "!text-[#c3a56f]"
                      : "!text-white/85 hover:bg-white/10 hover:!text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-[#c3a56f]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-xl border border-[#c3a56f] bg-[#c3a56f] px-5 py-3 text-xs font-semibold uppercase tracking-wider !text-[#111412] shadow-md transition-all duration-300 hover:bg-[#d8c08a] hover:shadow-lg hover:shadow-[#c3a56f]/25 active:scale-[0.98] sm:inline-flex md:px-6"
            >
              Get a Quote <ArrowRight size={14} className="!text-[#111412]" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-95 lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
            </button>
          </div>

        </div>
      </div>

      {/* ================= DESKTOP FULL-WIDTH MEGA MENU ================= */}
      <AnimatePresence>
        {servicesOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute left-0 top-full z-50 w-full border-b border-white/15 bg-[#171c19]/98 py-10 text-white shadow-2xl backdrop-blur-2xl"
          >
            <div className="container">
              <div className="grid gap-10 lg:grid-cols-[1fr_1fr_320px]">
                
                {/* Column 1: Residential */}
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--brass-light)]">
                      Residential & Homes
                    </p>
                    <span className="text-[10px] text-white/40 uppercase">05 Services</span>
                  </div>

                  <div className="mt-4 grid gap-1.5">
                    {residentialServices.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="group flex items-start gap-3.5 rounded-xl p-2.5 transition-all duration-200 hover:bg-white/5"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[var(--brass)] transition-colors group-hover:bg-[#c3a56f] group-hover:text-[#111412]">
                            <Icon size={16} />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-white transition-colors group-hover:text-[#c3a56f]">
                              {item.title}
                            </h4>
                            <p className="mt-0.5 text-xs text-white/60 line-clamp-1">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Column 2: Commercial & Specialty */}
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--brass-light)]">
                      Commercial & Specialty
                    </p>
                    <span className="text-[10px] text-white/40 uppercase">05 Services</span>
                  </div>

                  <div className="mt-4 grid gap-1.5">
                    {commercialServices.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="group flex items-start gap-3.5 rounded-xl p-2.5 transition-all duration-200 hover:bg-white/5"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[var(--brass)] transition-colors group-hover:bg-[#c3a56f] group-hover:text-[#111412]">
                            <Icon size={16} />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-white transition-colors group-hover:text-[#c3a56f]">
                              {item.title}
                            </h4>
                            <p className="mt-0.5 text-xs text-white/60 line-clamp-1">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Column 3: Featured Live Estimator Card */}
                <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold text-[var(--brass-light)] uppercase">
                      <Sparkles size={11} className="text-[#c3a56f]" />
                      Instant Calculator
                    </div>

                    <h4 className="display mt-4 text-2xl font-normal text-white">
                      Calculate your starting range.
                    </h4>
                    
                    <p className="mt-2 text-xs leading-relaxed text-white/65">
                      Select your bedrooms, bathrooms, and frequency to preview Calgary pricing with no contact info required.
                    </p>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    <Link
                      href="/pricing"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#c3a56f] bg-[#c3a56f] py-3 text-xs font-semibold uppercase tracking-wider !text-[#111412] shadow-md transition-all duration-300 hover:bg-[#d8c08a]"
                    >
                      Start Estimate <ArrowRight size={13} className="!text-[#111412]" />
                    </Link>

                    <Link
                      href="/services"
                      className="flex w-full items-center justify-center gap-1.5 text-xs font-medium text-white/70 transition-colors hover:text-white"
                    >
                      View Full Services Directory <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MOBILE DRAWER MENU ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden border-b border-white/20 bg-[#161a17] text-white shadow-2xl lg:hidden"
          >
            <div className="container max-h-[calc(100vh-100px)] space-y-4 overflow-y-auto py-6">
              
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-xs font-medium text-white/80">
                <MapPin size={15} className="text-[#c3a56f]" />
                <span>Serving Calgary, Alberta Only</span>
              </div>

              {/* Mobile Links */}
              <nav className="flex flex-col space-y-1">
                <Link
                  href="/"
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold ${
                    pathname === "/"
                      ? "bg-[#c3a56f]/20 !text-[#c3a56f] border border-[#c3a56f]/40"
                      : "!text-white/90 hover:bg-white/10 hover:!text-white"
                  }`}
                >
                  Home
                </Link>

                {/* Mobile Collapsible Services Accordion */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02]">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-white"
                  >
                    <span className={isServicesActive ? "text-[#c3a56f]" : "text-white"}>
                      Services
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        mobileServicesOpen ? "rotate-180 text-[#c3a56f]" : "text-white/60"
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1 border-t border-white/10 p-3"
                      >
                        <p className="px-2 pt-1 text-[10px] font-bold uppercase tracking-wider text-[var(--brass)]">
                          Residential
                        </p>
                        {residentialServices.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block rounded-lg px-3 py-2 text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white"
                          >
                            {item.title}
                          </Link>
                        ))}

                        <p className="px-2 pt-3 text-[10px] font-bold uppercase tracking-wider text-[var(--brass)]">
                          Commercial
                        </p>
                        {commercialServices.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block rounded-lg px-3 py-2 text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white"
                          >
                            {item.title}
                          </Link>
                        ))}

                        <div className="pt-2">
                          <Link
                            href="/services"
                            className="block rounded-lg bg-white/5 px-3 py-2 text-center text-xs font-semibold text-[#c3a56f]"
                          >
                            View All Services →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {mainNavLinks.slice(1).map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold ${
                        isActive
                          ? "bg-[#c3a56f]/20 !text-[#c3a56f] border border-[#c3a56f]/40"
                          : "!text-white/90 hover:bg-white/10 hover:!text-white"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="h-2 w-2 rounded-full bg-[#c3a56f]" />}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile CTA Button */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#c3a56f] bg-[#c3a56f] py-4 text-xs font-semibold uppercase tracking-wider !text-[#111412] shadow-md transition-all active:scale-[0.98]"
                >
                  Request a Quote <ArrowRight size={14} className="!text-[#111412]" />
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}