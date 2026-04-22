"use client";

import { useMemo, useState } from "react";
import { fieldClass, labelClass, ToolSection } from "@/components/tools/common";

export function JsonFormatterTool() {
  const [input, setInput] = useState('{\n  "hello": "world"\n}');
  const output = useMemo(() => {
    try {
      return JSON.stringify(JSON.parse(input), null, 2);
    } catch {
      return "Invalid JSON";
    }
  }, [input]);

  return (
    <ToolSection title="JSON Formatter" subtitle="Format and validate JSON instantly">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="block space-y-1.5" htmlFor="json-input">
          <span className={labelClass}>JSON input</span>
          <textarea id="json-input" className={`${fieldClass} min-h-80 font-mono`} value={input} onChange={(e) => setInput(e.target.value)} />
        </label>
        <label className="block space-y-1.5" htmlFor="json-output">
          <span className={labelClass}>Formatted output</span>
          <textarea id="json-output" className={`${fieldClass} min-h-80 font-mono`} value={output} readOnly />
        </label>
      </div>
    </ToolSection>
  );
}
