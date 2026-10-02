"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  ChevronDown,
  Crown,
  House,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const serviceGroups = [
  {
    title: "Residential",
    icon: House,
    items: [
      ["Standard Cleaning", "Routine care for lived-in homes.", "/services/residential-cleaning"],
      ["Deep Cleaning", "A more detailed seasonal reset.", "/services/deep-cleaning"],
      ["Move-In Cleaning", "A considered start in a new home.", "/services/move-in-move-out"],
      ["Move-Out Cleaning", "A clear finish for the next chapter.", "/services/move-in-move-out"],
    ],
  },
  {
    title: "Rental & Property",
    icon: Sparkles,
    items: [
      ["Airbnb Turnover", "Guest-ready resets between stays.", "/services/airbnb-cleaning"],
      ["Listing / Pre-Sale", "Presentation-led property cleaning.", "/contact?service=Listing%20Pre-Sale%20Cleaning"],
    ],
  },
  {
    title: "Commercial",
    icon: Building2,
    items: [
      ["Office Cleaning", "Workplace care around your schedule.", "/services/commercial-cleaning"],
      ["Janitorial Services", "Recurring care for shared workspaces.", "/services/janitorial-services"],
      ["Store Cleaning", "Retail floors and customer-facing areas.", "/services/store-cleaning"],
      ["Building Cleaning", "Common spaces across larger properties.", "/services/building-cleaning"],
      ["Commercial Spaces", "A scope shaped to your business.", "/services/commercial-cleaning"],
    ],
  },
  {
    title: "Specialty",
    icon: Sparkles,
    items: [
      ["Post-Construction", "Fine dust and finishing detail.", "/services/post-construction"],
      ["Appliance & Detail Add-ons", "Focused work on the finishing touches.", "/services/specialty-cleaning"],
      ["Custom Cleaning", "A clear scope for a specific request.", "/services/specialty-cleaning"],
    ],
  },
] as const;

const secondaryLinks = [
  ["Pricing", "/pricing"],
  ["About", "/about"],
  ["Service Areas", "/service-areas"],
  ["How It Works", "/process"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
] as const;

export function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 16);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMenus = () => {
    setServicesOpen(false);
    setMobileOpen(false);
  };

  return (
    <header className={`site-header sticky top-0 z-50 ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container flex h-[76px] items-center justify-between gap-5 xl:h-[82px]">
        <Link href="/" className="brand-mark" aria-label="Royal Cleaning Crew home" onClick={closeMenus}>
          <span className="brand-emblem"><Crown size={18} strokeWidth={1.5} /></span>
          <span className="brand-name"><strong>ROYAL</strong><small>CLEANING CREW</small></span>
        </Link>

        <nav className="hidden items-center gap-4 xl:flex 2xl:gap-6" aria-label="Primary navigation">
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button
              type="button"
              className="nav-link flex items-center gap-1"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((open) => !open)}
              onFocus={() => setServicesOpen(true)}
            >
              Services <ChevronDown size={13} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  className="mega-menu"
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  onMouseEnter={() => setServicesOpen(true)}
                >
                  <div className="mega-menu-heading">
                    <div>
                      <span className="eyebrow">A considered clean for every space</span>
                      <p className="display mt-2 text-3xl">Find the right service.</p>
                    </div>
                    <Link className="text-link" href="/services" onClick={closeMenus}>
                      All services <ArrowUpRight size={15} />
                    </Link>
                  </div>
                  <div className="mega-menu-grid">
                    {serviceGroups.map((group) => {
                      const Icon = group.icon;
                      return (
                        <section className="mega-menu-group" key={group.title}>
                          <h2><Icon size={15} strokeWidth={1.7} />{group.title}</h2>
                          {group.items.map(([title, description, href]) => (
                            <Link className="mega-menu-item" href={href} key={title} onClick={closeMenus}>
                              <span>{title}<small>{description}</small></span>
                              <ArrowUpRight size={14} />
                            </Link>
                          ))}
                        </section>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link className="nav-link" href="/services/residential-cleaning">Residential</Link>
          <Link className="nav-link" href="/services/commercial-cleaning">Commercial</Link>
          <Link className="nav-link" href="/services/specialty-cleaning">Specialty</Link>
          {secondaryLinks.slice(0, 2).map(([label, href]) => <Link className="nav-link" href={href} key={href}>{label}</Link>)}
          <Link className="nav-link" href="/contact">Contact</Link>
        </nav>

        <div className="hidden items-center gap-5 xl:flex">
          <Link className="button button-dark header-cta" href="/contact">Request a Quote <ArrowUpRight size={15} /></Link>
        </div>

        <button
          type="button"
          className="mobile-menu-toggle xl:hidden"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            className="mobile-navigation xl:hidden"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 76px)" }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
          >
            <nav aria-label="Mobile navigation" className="mobile-navigation-inner">
              <Link className="mobile-primary-link" href="/services" onClick={closeMenus}>Services <ArrowUpRight size={17} /></Link>
              <div className="mobile-service-groups">
                {serviceGroups.map((group) => {
                  const Icon = group.icon;
                  const expanded = mobileGroup === group.title;
                  return (
                    <section className="mobile-service-group" key={group.title}>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() => setMobileGroup(expanded ? null : group.title)}
                      >
                        <span><Icon size={17} />{group.title}</span>
                        <ChevronDown size={17} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            className="mobile-service-items"
                            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                          >
                            {group.items.map(([title, , href]) => (
                              <Link href={href} key={title} onClick={closeMenus}>{title}<ArrowUpRight size={14} /></Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </section>
                  );
                })}
              </div>
              <div className="mobile-secondary-links">
                {secondaryLinks.map(([label, href]) => <Link href={href} key={href} onClick={closeMenus}>{label}</Link>)}
              </div>
              <Link className="button button-dark mobile-quote-cta" href="/contact" onClick={closeMenus}>
                Get a Quote <ArrowUpRight size={16} />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}