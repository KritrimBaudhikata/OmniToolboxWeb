"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { fieldClass, labelClass, NumberInput, ToolSection } from "@/components/tools/common";

export function PasswordTool() {
  const [len, setLen] = useState("16");
  const [value, setValue] = useState("");

  return (
    <ToolSection title="Password Generator" subtitle="Generate strong random passwords">
      <div className="space-y-3">
        <NumberInput id="password-length" label="Password length" value={len} onChange={setLen} />
        <button
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          onClick={() => {
            const n = Number(len);
            if (!Number.isFinite(n) || n < 4 || n > 128) return;
            const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}";
            const arr = crypto.getRandomValues(new Uint32Array(n));
            setValue(Array.from(arr).map((x) => chars[x % chars.length]).join(""));
          }}
        >
          <Icon icon="mdi:lock" width={16} />
          Generate Password
        </button>
        <label className="block space-y-1.5" htmlFor="password-output">
          <span className={labelClass}>Generated password</span>
          <textarea id="password-output" className={`${fieldClass} min-h-24 font-mono`} value={value} readOnly />
        </label>
      </div>
    </ToolSection>
  );
}
