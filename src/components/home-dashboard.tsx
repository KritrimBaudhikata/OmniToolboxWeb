"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import { TOOLS_ENRICHED } from "@/lib/tools";

const STATS = [
  { label: "Tools", value: "50+", sub: "And growing", icon: "mdi:apps", tint: "bg-violet-100 text-violet-700" },
  { label: "Free to use", value: "100%", sub: "No sign-up required", icon: "mdi:flash", tint: "bg-emerald-100 text-emerald-700" },
  { label: "Privacy First", value: "Privacy First", sub: "Offline in your browser", icon: "mdi:shield-outline", tint: "bg-amber-100 text-amber-700" },
  { label: "Made for Everyone", value: "Made for Everyone", sub: "Simple. Fast. Useful.", icon: "mdi:heart-outline", tint: "bg-blue-100 text-blue-700" },
];

export function HomeDashboard() {
  const popular = useMemo(() => TOOLS_ENRICHED.filter((t) => t.tag === "Popular").slice(0, 8), []);
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem("recent.tools") || "[]") as string[];
    const timer = window.setTimeout(() => setRecentIds(recent), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const recent = useMemo(
    () => recentIds.map((id) => TOOLS_ENRICHED.find((t) => t.id === id)).filter(Boolean).slice(0, 6),
    [recentIds]
  );

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Hello! 👋</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-300">Your everyday tools. All in one place.</p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <article key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <span className={`mb-3 inline-flex rounded-lg p-2 ${stat.tint}`}>
              <Icon icon={stat.icon} width={18} />
            </span>
            <p className="text-xl font-semibold leading-tight">{stat.value}</p>
            <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">{stat.label}</p>
            <p className="mt-1 text-xs text-slate-500">{stat.sub}</p>
          </article>
        ))}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Popular Tools</h2>
          <Link href="/tools" className="text-sm font-medium text-indigo-600">View all tools →</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((tool) => (
            <Link key={tool.id} href={tool.href} className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <span className={`inline-flex rounded-lg p-2 text-white ${tool.accentClass}`}>
                  <Icon icon={`mdi:${tool.icon}`} width={16} />
                </span>
                <p className="text-xs text-slate-500">{tool.tag ?? "Fast"}</p>
              </div>
              <h3 className="mt-3 font-semibold group-hover:text-indigo-600">{tool.name}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-slate-500">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-950/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold">Discover more useful tools</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Explore 50+ tools designed to make your daily tasks easier.</p>
          </div>
          <Link href="/tools" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Browse All Tools</Link>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recently Used</h2>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("recent.tools");
              setRecentIds([]);
            }}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            Clear
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recent.length ? (
            recent.map((tool) => (
              <Link key={tool?.id} href={tool?.href ?? "/tools"} className="rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900">
                <p className="font-medium">{tool?.name}</p>
              </Link>
            ))
          ) : (
            <p className="text-sm text-slate-500">No recent tools yet. Start with All Tools.</p>
          )}
        </div>
      </section>
    </div>
  );
}
