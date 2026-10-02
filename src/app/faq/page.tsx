import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FAQAccordion } from "@/components/FAQAccordion";
import { faqGroups } from "@/data/faqs";

export const metadata: Metadata = { title: "Frequently Asked Questions", description: "Practical answers about cleaning services, Calgary coverage, estimates and requests." };

export default function FAQPage() {
  return <>
    <section className="bg-[#eeece5] py-14 sm:py-18 lg:py-20"><div className="container grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center"><div><p className="eyebrow">Good questions, clear answers</p><h1 className="display mt-4 max-w-3xl text-6xl sm:text-7xl">Details worth knowing.</h1><p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)]">Service scope, location, estimate requests and preparation. If your question is specific to a property, include it in your quote request.</p></div><div className="relative min-h-[280px] sm:min-h-[360px]"><Image src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85" alt="Calm, well-kept residential interior" fill sizes="(max-width:1024px) 100vw,46vw" className="object-cover" priority/></div></div></section>
    <section className="py-14 sm:py-18 lg:py-20"><div className="container grid gap-9 lg:grid-cols-[250px_1fr] lg:gap-16"><aside className="lg:sticky lg:top-28 lg:h-fit"><p className="eyebrow">Browse by topic</p><nav className="mt-4 grid grid-cols-2 gap-x-4 border-t border-[var(--line)] sm:grid-cols-3 lg:grid-cols-1" aria-label="FAQ categories">{faqGroups.map((group,index)=><a className="flex min-h-11 items-center justify-between border-b border-[var(--line)] text-xs font-semibold" href={`#faq-${index}`} key={group.title}>{group.title}<span className="text-[var(--brass)]">{String(group.items.length).padStart(2,"0")}</span></a>)}</nav></aside><div>{faqGroups.map((group,index)=><section className="mb-12 scroll-mt-28 last:mb-0" id={`faq-${index}`} key={group.title}><div className="mb-2 flex items-end justify-between gap-4 border-b border-[var(--line)] pb-4"><div><p className="eyebrow">Category {String(index+1).padStart(2,"0")}</p><h2 className="display mt-2 text-4xl">{group.title}</h2></div><span className="hidden text-xs text-[var(--muted)] sm:block">{group.items.length} answers</span></div><FAQAccordion items={group.items}/></section>)}</div></div></section>
    <section className="border-t border-[var(--line)] bg-[#222724] py-14 text-white sm:py-16"><div className="container flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="eyebrow">Still deciding?</p><h2 className="display mt-3 text-4xl sm:text-5xl">Let’s start with your space.</h2></div><Link className="text-link text-white" href="/contact">Request a Quote <ArrowUpRight size={15}/></Link></div></section>
  </>;
}