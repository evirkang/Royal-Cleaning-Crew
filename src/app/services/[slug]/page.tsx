import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, serviceBySlug } from "@/data/services";
import { ServicePage } from "@/components/ServicePage";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s
    ? {
        title: `${s.title} in Calgary`,
        description: s.description,
      }
    : { title: "Service Not Found" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((x) => x.slug === slug);
  
  if (!service) {
    notFound();
  }

  return <ServicePage service={serviceBySlug(slug)} />;
}