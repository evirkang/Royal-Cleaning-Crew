import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--line)] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c3a56f]/60 hover:shadow-xl"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl bg-neutral-100">
        <Image
          src={service.image}
          alt={`${service.title} service setting`}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Number Badge */}
        <span className="absolute left-3 top-3 rounded-md border border-white/20 bg-[#1c201d]/85 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Circular Hover Arrow */}
        <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-white/90 text-[var(--ink)] shadow-md backdrop-blur-sm transition-all duration-300 group-hover:bg-[#c3a56f] group-hover:text-[#1c201d] group-hover:scale-105">
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="mt-5 flex flex-col justify-between pt-1">
        <h3 className="display text-2xl font-normal text-[var(--ink)] transition-colors group-hover:text-[#1c201d] sm:text-3xl">
          {service.title}
        </h3>
        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
          {service.short}
        </p>
      </div>
    </Link>
  );
}