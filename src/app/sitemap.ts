import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = [
		"",
		"/about",
		"/services",
		"/pricing",
		"/service-areas",
		"/faq",
		"/process",
		"/contact",
		"/privacy",
		"/terms",
		...services.map((service) => `/services/${service.slug}`),
	];

	return routes.map((route) => ({
		url: `${siteConfig.url}${route}`,
		lastModified: new Date(),
		changeFrequency: "monthly",
		priority: route === "" ? 1 : 0.7,
	}));
}
