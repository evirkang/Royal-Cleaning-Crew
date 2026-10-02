import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link href={`/services/${service.slug}`} className="group block">
      <div className="image-wrap relative aspect-[1.18]">
        <Image src={service.image} alt={`${service.title} service setting`} fill sizes="(max-width:768px) 100vw,33vw" className="object-cover" />
        <span className="absolute left-3 top-3 bg-[#1c201d]/80 px-2.5 py-2 text-[9px] font-bold text-white">0{index + 1}</span>
        <span className="absolute bottom-3 right-3 grid size-9 place-items-center bg-[var(--paper)] text-[var(--ink)] transition-colors group-hover:bg-[var(--brass-light)]"><ArrowUpRight size={17} /></span>
      </div>
      <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] py-4">
        <div><h2 className="display text-3xl">{service.title}</h2><p className="mt-2 max-w-sm text-xs leading-5 text-[var(--muted)]">{service.short}</p></div>
      </div>
    </Link>
  );
}