import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CTASectionProps = {
  title?: string;
  copy?: string;
  primaryHref?: string;
  secondaryHref?: string;
};

export function CTASection({
  title = "Ready for a more considered clean?",
  copy = "Tell us about your property and the details that matter. We’ll help establish a clear scope.",
  primaryHref = "/contact",
  secondaryHref = "/services",
}: CTASectionProps) {
  return (
    <section className="bg-[#222724] py-16 text-white sm:py-20">
      <div className="container flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
        <div><p className="eyebrow">Royal Cleaning Crew · Calgary</p><h2 className="display mt-4 max-w-3xl text-4xl sm:text-5xl">{title}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-white/65">{copy}</p></div>
        <div className="flex flex-wrap gap-3"><Link className="button border-[#c3a56f] bg-[#c3a56f] text-[#1c201d] hover:bg-[#d0b984]" href={primaryHref}>Request a Quote <ArrowRight size={15}/></Link><Link className="button button-light" href={secondaryHref}>Explore Services</Link></div>
      </div>
    </section>
  );
}