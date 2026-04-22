"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { OutputCard, ToolSection } from "@/components/tools/common";

export function UuidTool() {
  const [value, setValue] = useState("");

  return (
    <ToolSection title="UUID Generator" subtitle="Create unique identifiers for development workflows">
      <div className="space-y-3">
        <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700" onClick={() => setValue(crypto.randomUUID())}>
          <Icon icon="mdi:identifier" width={16} />
          Generate UUID
        </button>
        <OutputCard title="UUID output" value={value || "No value yet"} />
      </div>
    </ToolSection>
  );
}
