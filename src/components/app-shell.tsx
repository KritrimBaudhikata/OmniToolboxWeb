"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { TOOLS_ENRICHED } from "@/lib/tools";

const PRIMARY_LINKS = [
  { href: "/", label: "Home", icon: "mdi:home-outline" },
  { href: "/tools", label: "All Tools", icon: "mdi:apps" },
  { href: "/announcements", label: "Announcements", icon: "mdi:bullhorn-outline" },
  { href: "/support", label: "Support / Donations", icon: "mdi:heart-outline" },
  { href: "/about", label: "About", icon: "mdi:information-outline" },
  { href: "/privacy", label: "Privacy Policy", icon: "mdi:shield-lock-outline" },
  { href: "/terms", label: "Terms of Use", icon: "mdi:file-document-outline" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState<boolean>(true);
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    const dismissed = !!localStorage.getItem("banner.dismissed.v1");
    const storedTheme = localStorage.getItem("theme.dark");
    const dark = storedTheme == null ? true : storedTheme === "1";
    const recent = (JSON.parse(localStorage.getItem("recent.tools") || "[]") as string[]).slice(0, 5);
    const timer = window.setTimeout(() => {
      setShowBanner(!dismissed);
      setIsDark(dark);
      setRecentIds(recent);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const recentTools = useMemo(
    () => recentIds.map((id) => TOOLS_ENRICHED.find((tool) => tool.id === id)).filter(Boolean),
    [recentIds]
  );

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/90">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-3 sm:px-4">
          <Link href="/" className="flex items-center">
            <Image src="/omnitoolbox-logo.png" alt="OmniToolbox logo" width={40} height={40} className="rounded-md" />
          </Link>
          <nav className="ml-auto flex items-center gap-2 text-sm">
            <Link href="/tools" className="rounded-md px-2.5 py-1.5 font-medium hover:bg-slate-100 dark:hover:bg-slate-800">All Tools</Link>
            <Link href="/about" className="rounded-md px-2.5 py-1.5 font-medium hover:bg-slate-100 dark:hover:bg-slate-800">About</Link>
            <Link href="/support" className="rounded-md px-2.5 py-1.5 font-medium hover:bg-slate-100 dark:hover:bg-slate-800">Support ❤</Link>
            <Link href="/privacy" className="hidden rounded-md px-2.5 py-1.5 font-medium hover:bg-slate-100 md:inline dark:hover:bg-slate-800">Privacy</Link>
            <Link href="/terms" className="hidden rounded-md px-2.5 py-1.5 font-medium hover:bg-slate-100 md:inline dark:hover:bg-slate-800">Terms</Link>
            <button
              type="button"
              aria-label="Toggle dark mode"
              onClick={() => {
                const next = !isDark;
                setIsDark(next);
                document.documentElement.classList.toggle("dark", next);
                localStorage.setItem("theme.dark", next ? "1" : "0");
              }}
              className="rounded-md border border-slate-200 p-1.5 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <Icon icon={isDark ? "mdi:weather-sunny" : "mdi:weather-night"} width={18} />
            </button>
          </nav>
        </div>
      </header>

      {showBanner ? (
        <div className="border-b border-indigo-200 bg-indigo-50 text-indigo-900 dark:border-indigo-900/70 dark:bg-indigo-950/40 dark:text-indigo-100">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 py-2 text-sm sm:px-4">
            <p>New update: refreshed OmniToolbox dashboard is live.</p>
            <button
              type="button"
              onClick={() => {
                localStorage.setItem("banner.dismissed.v1", "1");
                setShowBanner(false);
              }}
              className="rounded px-2 py-1 hover:bg-indigo-100 dark:hover:bg-indigo-900/60"
            >
              Dismiss
            </button>
          </div>
        </div>
      ) : null}

      <main className="mx-auto w-full max-w-7xl flex-1 px-3 py-4 sm:px-4">
        <div className="flex gap-4">
          <aside className="hidden w-60 shrink-0 lg:block">
            <div className="sticky top-24 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                <nav className="space-y-1">
                  {PRIMARY_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                        pathname === link.href
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Icon icon={link.icon} width={16} />
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Recently Used</h3>
                <div className="space-y-1">
                  {recentTools.length ? (
                    recentTools.map((tool) => (
                      <Link key={tool?.id} href={tool?.href ?? "/tools"} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                        <Icon icon={`mdi:${tool?.icon ?? "toolbox-outline"}`} width={14} />
                        <span className="truncate">{tool?.name}</span>
                      </Link>
                    ))
                  ) : (
                    <p className="px-2 text-xs text-slate-500">Start using tools to see history.</p>
                  )}
                </div>
              </div>
            </div>
          </aside>

          <section className="min-w-0 flex-1">{children}</section>

          <aside className="hidden w-56 shrink-0 xl:block">
            <div className="sticky top-24 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900">
                Ad Slot
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900">
                Native Ad
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900/70">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-3 py-3 text-xs text-slate-600 sm:px-4 dark:text-slate-300">
          <p>OmniToolbox legal links (web + mobile compliance)</p>
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="underline-offset-2 hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="underline-offset-2 hover:underline">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
