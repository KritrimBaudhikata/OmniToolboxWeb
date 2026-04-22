"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import { ToolRenderer } from "@/components/tool-renderer";
import { ToolBackButton } from "@/components/tool-back-button";
import { TOOLS_ENRICHED, type ToolItem } from "@/lib/tools";

export function ToolPageContent({ tool }: { tool: ToolItem }) {
  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem("recent.tools") || "[]") as string[];
    const next = [tool.id, ...raw.filter((id) => id !== tool.id)].slice(0, 10);
    localStorage.setItem("recent.tools", JSON.stringify(next));
  }, [tool.id]);

  const suggested = useMemo(
    () => TOOLS_ENRICHED.filter((candidate) => candidate.category === tool.category && candidate.id !== tool.id).slice(0, 4),
    [tool.category, tool.id]
  );

  return (
    <section className="space-y-5">
      <header className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-3">
          <ToolBackButton />
        </div>
        <div className="flex items-center gap-3">
          <span className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-white ${tool.accentClass}`}>
            <Icon icon={`mdi:${tool.icon}`} width={20} />
          </span>
          <div>
            <h1 className="text-2xl font-semibold">{tool.name}</h1>
            <p className="text-sm text-slate-500">{tool.description}</p>
          </div>
        </div>
      </header>

      <div className="grid gap-4 xl:grid-cols-[1fr_220px]">
        <div className="space-y-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
            <ToolRenderer toolId={tool.id} />
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-semibold">Suggested Tools</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {suggested.map((candidate) => (
                <Link key={candidate.id} href={candidate.href} className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                  {candidate.name}
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-semibold">FAQ</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              This tool runs in-browser and is designed for fast, no-login usage. Verify outputs when using for business-critical decisions.
            </p>
          </section>
        </div>

        <aside className="space-y-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900">
            Ad Slot
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900">
            Related Sponsor
          </div>
        </aside>
      </div>
    </section>
  );
}
