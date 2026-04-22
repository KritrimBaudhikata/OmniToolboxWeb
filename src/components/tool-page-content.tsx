"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import { Icon } from "@iconify/react";
import { ToolRenderer } from "@/components/tool-renderer";
import { ToolBackButton } from "@/components/tool-back-button";
import { TOOLS_ENRICHED, type ToolItem } from "@/lib/tools";
import { ToolDriveSync } from "@/components/tool-drive-sync";
import { useAuth } from "@/components/providers/auth-provider";

export function ToolPageContent({ tool }: { tool: ToolItem }) {
  const toolRootRef = useRef<HTMLDivElement>(null);
  const { user, enabled, loading, signInWithGoogle, signOutUser } = useAuth();

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
            <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Private Cloud Sync</p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Sign in once to sync tool drafts to your Google Drive appData folder. No tool content is stored on this server.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {enabled ? (
                  user ? (
                    <>
                      <button
                        type="button"
                        onClick={() => void signOutUser()}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
                      >
                        Sign out
                      </button>
                      <span className="text-xs text-slate-500">Signed in as {user.email ?? user.uid}</span>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => void signInWithGoogle()}
                      disabled={loading}
                      className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? "Loading..." : "Sign in with Google"}
                    </button>
                  )
                ) : (
                  <span className="text-xs text-amber-700 dark:text-amber-300">Firebase config missing. Add env values to enable cloud sync.</span>
                )}
              </div>
              <div className="mt-2">
                <ToolDriveSync key={tool.id} toolId={tool.id} rootRef={toolRootRef} />
              </div>
            </div>
            <div ref={toolRootRef} data-tool-sync-root={tool.id}>
              <ToolRenderer toolId={tool.id} />
            </div>
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
