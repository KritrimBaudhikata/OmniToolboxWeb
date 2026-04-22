"use client";

import Link from "next/link";
import { ToolSection } from "@/components/tools/common";

export function HashFallbackTool() {
  return (
    <ToolSection title="Hash Generator (Next Step)" subtitle="This tool is queued for the next implementation pass">
      <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-100">
        Hash algorithms (SHA/MD5 variants) will be added with copy/export actions in the next step.
      </p>
    </ToolSection>
  );
}

export function UnsupportedTool({ id }: { id: string }) {
  return (
    <ToolSection title="Tool in Progress" subtitle="Web parity rollout is happening tool-by-tool">
      <div className="space-y-3">
        <p className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/60">
          <code>{id}</code> is queued for UI-matched web implementation. Mobile-only integrations (IAP, native ads, device APIs) remain disabled on web.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="/tools" className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white">
            Browse implemented tools
          </Link>
          <Link href="/announcements" className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-600 dark:text-slate-200">
            Track rollout updates
          </Link>
        </div>
      </div>
    </ToolSection>
  );
}
