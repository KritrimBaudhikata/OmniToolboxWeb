"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { loadJsonFromAppData, saveJsonToAppData } from "@/lib/google-drive-sync";

type DraftPayload = {
  values: Record<string, string | boolean>;
  updatedAt: string;
};

function collectFormValues(root: HTMLElement): Record<string, string | boolean> {
  const map: Record<string, string | boolean> = {};
  const fields = root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select");
  for (const field of fields) {
    if (field instanceof HTMLInputElement) {
      if (field.type === "file" || field.type === "password") continue;
      const key = field.id || field.name;
      if (!key) continue;
      map[key] = field.type === "checkbox" || field.type === "radio" ? field.checked : field.value;
      continue;
    }
    const key = field.id || field.name;
    if (!key) continue;
    map[key] = field.value;
  }
  return map;
}

function applyFormValues(root: HTMLElement, values: Record<string, string | boolean>) {
  for (const [key, next] of Object.entries(values)) {
    const escaped = key.replace(/"/g, '\\"');
    const field = root.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(`#${escaped}, [name="${escaped}"]`);
    if (!field) continue;

    if (field instanceof HTMLInputElement && (field.type === "checkbox" || field.type === "radio")) {
      field.checked = Boolean(next);
    } else {
      field.value = String(next);
    }
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

export function ToolDriveSync({ toolId, rootRef }: { toolId: string; rootRef: React.RefObject<HTMLDivElement | null> }) {
  const { user, enabled, verifySession, ensureDriveAccessToken } = useAuth();
  const [status, setStatus] = useState<"idle" | "syncing" | "synced" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const hydratedRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const lastSavedRef = useRef<string>("");
  const manualSyncRef = useRef<(() => Promise<void>) | null>(null);

  useEffect(() => {
    if (!enabled || !user || !rootRef.current) return;

    const root = rootRef.current;
    const fileName = `tool_${toolId}.json`;
    let cancelled = false;

    async function syncSnapshot(force = false) {
      if (!rootRef.current) return;
      const snapshot = collectFormValues(rootRef.current);
      const serialized = JSON.stringify(snapshot);
      if (!force && (!serialized || serialized === "{}" || serialized === lastSavedRef.current)) return;

      setStatus("syncing");
      const verified = await verifySession();
      if (!verified) throw new Error("Session verification failed.");
      const token = await ensureDriveAccessToken();
      const now = new Date().toISOString();
      await saveJsonToAppData(token, fileName, {
        values: snapshot,
        updatedAt: now,
      } satisfies DraftPayload);
      lastSavedRef.current = serialized;
      setLastSyncedAt(now);
      setStatus("synced");
      setMessage("Synced to Google Drive");
    }

    async function hydrateAndWatch() {
      try {
        const verified = await verifySession();
        if (!verified || cancelled) return;
        const token = await ensureDriveAccessToken();
        const remote = await loadJsonFromAppData<DraftPayload>(token, fileName);
        if (!cancelled && remote?.values) {
          applyFormValues(root, remote.values);
          lastSavedRef.current = JSON.stringify(remote.values);
          setLastSyncedAt(remote.updatedAt);
        }
      } catch {
        if (!cancelled) {
          setStatus("error");
          setMessage("Cloud sync unavailable. You can keep using tools locally.");
        }
      } finally {
        hydratedRef.current = true;
      }
    }

    const queueSave = () => {
      if (!hydratedRef.current) return;
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(async () => {
        try {
          await syncSnapshot(false);
        } catch {
          setStatus("error");
          setMessage("Cloud sync failed for this draft.");
        }
      }, 1200);
    };

    hydrateAndWatch();
    manualSyncRef.current = async () => {
      try {
        await syncSnapshot(true);
      } catch {
        setStatus("error");
        setMessage("Manual sync failed.");
      }
    };
    root.addEventListener("input", queueSave);
    root.addEventListener("change", queueSave);
    return () => {
      cancelled = true;
      root.removeEventListener("input", queueSave);
      root.removeEventListener("change", queueSave);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      manualSyncRef.current = null;
    };
  }, [enabled, ensureDriveAccessToken, rootRef, toolId, user, verifySession]);

  if (!enabled || !user) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span
        className={`rounded-full px-2 py-0.5 ${
          status === "error"
            ? "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
            : status === "synced"
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
        }`}
      >
        {status === "syncing" ? "Syncing..." : status === "synced" ? "Synced" : status === "error" ? "Sync Error" : "Cloud Sync Ready"}
      </span>
      <button
        type="button"
        onClick={() => void manualSyncRef.current?.()}
        className="rounded-md border border-slate-300 px-2 py-0.5 font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
      >
        Sync now
      </button>
      {lastSyncedAt ? (
        <span className="text-slate-500 dark:text-slate-300">Last synced: {new Date(lastSyncedAt).toLocaleString()}</span>
      ) : null}
      {message && status === "error" ? <span className="text-rose-600">{message}</span> : null}
    </div>
  );
}
