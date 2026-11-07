import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "weekly"],
    ["/lavage", 0.9, "monthly"],
    ["/reservation", 0.9, "monthly"],
    ["/entretien", 0.8, "monthly"],
    ["/abonnements", 0.8, "monthly"],
    ["/services-complementaires", 0.7, "monthly"],
    ["/contact", 0.8, "yearly"],
  ];
  return routes.map(([path, priority, changeFrequency]) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
