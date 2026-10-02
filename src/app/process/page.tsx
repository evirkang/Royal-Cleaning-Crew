import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProcessTimeline } from "@/components/ProcessTimeline";

export const metadata: Metadata = { title: "How It Works", description: "A clear path from a Calgary cleaning request to a confirmed service and final walkthrough." };

export default function ProcessPage() {
  return <>
    <section className="bg-[#eeece5] py-14 sm:py-18 lg:py-20"><div className="container grid gap-8 lg:grid-cols-[1fr_.9fr] lg:items-center"><div><p className="eyebrow">From first details to final check</p><h1 className="display mt-4 max-w-3xl text-6xl sm:text-7xl">A clear process makes room for better work.</h1><p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)]">The service begins with the property and what it needs. A request is reviewed, the scope is agreed and only then is a schedule confirmed.</p><Link className="text-link mt-6" href="/contact">Start a request <ArrowUpRight size={15}/></Link></div><div className="relative min-h-[300px] sm:min-h-[390px]"><Image src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1400&q=85" alt="A cleaning professional carrying out detail work" fill sizes="(max-width:1024px) 100vw,46vw" className="object-cover" priority/></div></div></section>
    <ProcessTimeline/>
    <section className="py-16 sm:py-20"><div className="container grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow">What happens after an inquiry</p><h2 className="display mt-4 text-5xl">A request is not a booking.</h2></div><div className="border-t border-[var(--line)]"><p className="py-5 text-sm leading-7 text-[var(--muted)]">Once a request is delivered, service type, Calgary location, property condition, access and preferred timing can be reviewed. A final scope, price and available appointment are confirmed separately.</p><p className="border-t border-[var(--line)] py-5 text-sm leading-7 text-[var(--muted)]">If the request form reports that delivery is not configured or unavailable, the details have not been sent. Do not assume a reservation is in place until the business confirms it.</p></div></div></section>
  </>;
}