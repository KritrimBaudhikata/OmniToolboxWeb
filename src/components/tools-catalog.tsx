"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { TOOLS_ENRICHED, type ToolCategory } from "@/lib/tools";

const CATEGORIES: Array<"All" | ToolCategory> = ["All", "Security", "Text", "Converters", "Generators", "Developer", "Daily", "Media", "Other"];

export function ToolsCatalog({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<"All" | ToolCategory>("All");

  const tools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS_ENRICHED.filter((tool) => {
      const byCategory = category === "All" || tool.category === category;
      if (!byCategory) return false;
      if (!q) return true;
      return `${tool.name} ${tool.description} ${tool.keywords.join(" ")}`.toLowerCase().includes(q);
    });
  }, [query, category]);

  return (
    <div className="space-y-4">
      <header className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold">All Tools</h1>
        <p className="mt-1 text-sm text-slate-500">Browse all 50+ tools</p>

        <div className="mt-4 grid gap-3 md:grid-cols-[2fr_1fr]">
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-700">
            <Icon icon="mdi:magnify" width={18} className="text-slate-500" />
            <input className="w-full bg-transparent text-sm outline-none" placeholder="Search tool..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <label className="sr-only" htmlFor="tools-category-filter">
            Category filter
          </label>
          <select id="tools-category-filter" aria-label="Category filter" value={category} onChange={(e) => setCategory(e.target.value as "All" | ToolCategory)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </header>

      <section className="grid gap-3 md:grid-cols-2">
        {tools.map((tool) => (
          <Link key={tool.id} href={tool.href} className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-white ${tool.accentClass}`}>
                  <Icon icon={`mdi:${tool.icon}`} width={18} />
                </span>
                <div>
                  <p className="font-semibold">{tool.name}</p>
                  <p className="text-xs text-slate-500">{tool.description}</p>
                </div>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">{tool.tag ?? "Tool"}</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
