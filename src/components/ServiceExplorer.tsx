"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/data/services";

const choices = [
  { label: "Residential", slug: "residential-cleaning" },
  { label: "Deep Cleaning", slug: "deep-cleaning" },
  { label: "Move-In / Move-Out", slug: "move-in-move-out" },
  { label: "Short-Term Rental", slug: "airbnb-cleaning" },
  { label: "Commercial", slug: "commercial-cleaning" },
  { label: "Specialty", slug: "specialty-cleaning" },
] as const;

export function ServiceExplorer() {
  const [activeSlug, setActiveSlug] = useState<string>(choices[0].slug);
  const reduceMotion = useReducedMotion();
  const service = services.find((item) => item.slug === activeSlug) ?? services[0];

  return (
    <section className="bg-[#e9e7df] py-20 lg:py-28" id="services">
      <div className="container">
        <div className="grid gap-9 lg:grid-cols-[.68fr_1.32fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="eyebrow">Services, with purpose</p>
            <h2 className="display mt-4 max-w-xl text-5xl sm:text-6xl">A different space asks for a different kind of care.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--muted)]">Choose the situation that sounds most like yours. The scope, details and next step change with it.</p>
            <div className="mt-8 border-t border-[#c7c4ba]" role="tablist" aria-label="Cleaning service type">
              {choices.map((choice, index) => (
                <button
                  type="button"
                  role="tab"
                  id={`service-tab-${choice.slug}`}
                  aria-selected={activeSlug === choice.slug}
                  aria-controls="service-explorer-panel"
                  key={choice.slug}
                  onClick={() => setActiveSlug(choice.slug)}
                  className={`flex min-h-[53px] w-full items-center justify-between gap-4 border-b border-[#c7c4ba] text-left transition-colors ${activeSlug === choice.slug ? "text-[var(--ink)]" : "text-[#74776f] hover:text-[var(--ink)]"}`}
                >
                  <span className="flex items-center gap-3"><span className="text-[10px] text-[var(--brass)]">0{index + 1}</span><span className="text-sm font-semibold">{choice.label}</span></span>
                  <span className={`text-[var(--brass)] transition-opacity ${activeSlug === choice.slug ? "opacity-100" : "opacity-0"}`}><ArrowUpRight size={17} /></span>
                </button>
              ))}
            </div>
          </div>

          <div id="service-explorer-panel" role="tabpanel" aria-labelledby={`service-tab-${activeSlug}`} className="grid min-h-[500px] bg-[#222724] text-white md:grid-cols-[.94fr_1.06fr]">
            <div className="relative min-h-[280px] md:min-h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={service.slug}
                  className="absolute inset-0"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: .25 }}
                >
                  <Image src={service.image} alt={`${service.title} setting`} fill sizes="(max-width:768px) 100vw, 42vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <span className="absolute bottom-4 left-4 bg-black/65 px-3 py-2 text-[9px] font-semibold tracking-[.1em] text-white uppercase">{service.title} · Calgary</span>
            </div>
            <div className="flex flex-col justify-between p-6 sm:p-9 lg:p-11">
              <AnimatePresence mode="wait">
                <motion.div
                  key={service.slug}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: .22 }}
                >
                  <p className="eyebrow">A clear scope makes a better start</p>
                  <h3 className="display mt-4 text-4xl sm:text-5xl">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/65">{service.description}</p>
                  <ul className="mt-7 grid gap-3 border-t border-white/20 pt-5">
                    {service.benefits.map((benefit) => <li className="flex gap-3 text-xs leading-5 text-white/75" key={benefit}><Check size={15} className="mt-0.5 shrink-0 text-[var(--brass-light)]" />{benefit}</li>)}
                  </ul>
                </motion.div>
              </AnimatePresence>
              <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5">
                <Link className="text-link text-white" href={`/services/${service.slug}`}>Explore this service <ArrowUpRight size={15} /></Link>
                <Link className="button border-[#c3a56f] bg-[#c3a56f] text-[#1c201d] hover:bg-[#d0b984]" href="/contact">Request a quote <ArrowUpRight size={15} /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}