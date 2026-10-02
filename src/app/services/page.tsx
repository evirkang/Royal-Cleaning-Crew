import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";

export const metadata: Metadata = { title: "Cleaning Services", description: "Explore residential, deep, move, rental, commercial and specialty cleaning in Calgary." };

export default function ServicesPage() {
  return <>
    <section className="relative isolate overflow-hidden bg-[#222724] text-white"><Image src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=2000&q=90" alt="A cleaning professional working carefully in a home" fill priority sizes="100vw" className="-z-20 object-cover object-center"/><div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#171c19]/88 via-[#171c19]/66 to-[#171c19]/24"/><div className="container flex min-h-[460px] flex-col justify-end py-14 sm:min-h-[540px] sm:py-16"><p className="eyebrow !text-[#d1b77f]">Services · Calgary, Alberta</p><h1 className="display mt-5 max-w-4xl text-6xl sm:text-7xl lg:text-[88px]">The right clean for the space and the moment.</h1><div className="mt-7 flex flex-col gap-5 border-t border-white/35 pt-5 sm:flex-row sm:items-end sm:justify-between"><p className="max-w-xl text-sm leading-7 text-white/75">From ongoing home care to a property handover, each service begins with a clear scope and the details that shape it.</p><Link className="text-link text-white" href="/pricing">Build a request <ArrowRight size={15}/></Link></div></div></section>
    <section className="py-16 sm:py-20 lg:py-24"><div className="container"><div className="grid gap-5 border-b border-[var(--line)] pb-7 sm:grid-cols-[1fr_.7fr] sm:items-end"><div><p className="eyebrow">Choose your starting point</p><h2 className="display mt-3 text-4xl sm:text-5xl">A service shaped around your property.</h2></div><p className="text-sm leading-7 text-[var(--muted)]">Every property is different. Service inclusions, access and any finishing details are confirmed before a booking.</p></div><div className="mt-9 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{services.map((service,index)=><ServiceCard service={service} index={index} key={service.slug}/>)}</div></div></section>
    <section className="border-t border-[var(--line)] bg-[#eeece5] py-16 sm:py-20"><div className="container grid gap-6 md:grid-cols-[1fr_auto] md:items-end"><div><p className="eyebrow">Not sure which service fits?</p><h2 className="display mt-3 max-w-2xl text-4xl sm:text-5xl">Start with the property, not the label.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">Share the condition, the rooms that matter and when the space needs to be ready. The scope can be reviewed from there.</p></div><Link href="/contact" className="button button-dark">Describe your space <ArrowRight size={15}/></Link></div></section>
  </>;
}