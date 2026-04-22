import type { MetadataRoute } from "next";
import { TOOL_IDS } from "@/lib/tools";
import { SITE_CONFIG } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.siteUrl;
  const toolEntries = TOOL_IDS.map((toolId) => ({
    url: `${base}/tools/${toolId}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: `${base}/`, changeFrequency: "daily", priority: 1 },
    { url: `${base}/tools`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/announcements`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/privacy`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/terms`, changeFrequency: "monthly", priority: 0.5 },
    ...toolEntries,
  ];
}
