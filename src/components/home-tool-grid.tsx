"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TOOLS_ENRICHED, type ToolCategory } from "@/lib/tools";
import { Icon } from "@iconify/react";

const CATEGORIES: Array<"All" | ToolCategory> = [
  "All",
  "Security",
  "Text",
  "Converters",
  "Generators",
  "Developer",
  "Daily",
  "Media",
  "Other",
];

export function HomeToolGrid() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | ToolCategory>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS_ENRICHED.filter((tool) => {
      const categoryMatch = category === "All" || tool.category === category;
      if (!q) return categoryMatch;
      const text = `${tool.name} ${tool.id} ${tool.keywords.join(" ")}`.toLowerCase();
      return categoryMatch && text.includes(q);
    });
  }, [query, category]);

  return (
    <section className="space-y-4">
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[2fr_1fr]">
        <label htmlFor="tool-search" className="block space-y-1">
          <span className="text-sm font-medium text-slate-700">Search tools</span>
          <input
            id="tool-search"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Try: unit converter, password, json..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label htmlFor="tool-category" className="block space-y-1">
          <span className="text-sm font-medium text-slate-700">Category</span>
          <select
            id="tool-category"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value as "All" | ToolCategory)}
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="text-sm text-slate-600">
        Showing <span className="font-semibold text-slate-900">{filtered.length}</span> tools
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-sm ${tool.accentClass}`}
              >
                <Icon icon={`mdi:${tool.icon}`} width={20} height={20} />
              </div>
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-blue-700">{tool.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{tool.category}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">Open tool</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
