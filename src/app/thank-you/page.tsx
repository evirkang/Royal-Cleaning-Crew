import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "Your Next Step", description: "Continue with a Royal Cleaning Crew service request in Calgary.", robots: { index: false, follow: false } };

export default function ThankYouPage() {
  return <section className="relative overflow-hidden bg-[#222724] py-16 text-white sm:py-20 lg:py-24">
    <div className="container grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-stretch">
      <div className="flex flex-col justify-center"><p className="eyebrow">Royal Cleaning Crew · Calgary</p><h1 className="display mt-5 max-w-4xl text-6xl sm:text-7xl lg:text-[76px]">A more considered space starts here.</h1><p className="mt-6 max-w-xl text-sm leading-7 text-white/65">This page is a starting point, not a submission receipt. A quote request is confirmed only when the form reports that the configured delivery service has accepted it.</p><div className="mt-6 flex flex-wrap gap-3"><Link className="button border-[#c3a56f] bg-[#c3a56f] text-[#1c201d] hover:bg-[#d0b984]" href="/contact">Request a Quote <ArrowUpRight size={15}/></Link><Link className="button button-light" href="/"><ArrowLeft size={15}/> Home</Link></div></div>
      <div className="relative min-h-[250px] lg:min-h-[420px]"><Image src="https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1400&q=85" alt="Quiet, clean living area" fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" priority/></div>
    </div>
  </section>;
}