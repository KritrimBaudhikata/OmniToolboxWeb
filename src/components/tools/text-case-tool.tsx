"use client";

import { useState } from "react";
import { applyCase, type CaseType } from "@/lib/text-case";
import { fieldClass, labelClass, Select, ToolSection } from "@/components/tools/common";

export function TextCaseTool() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<CaseType>("title");
  return (
    <ToolSection title="Case Converter" subtitle="Transform text in real-time">
      <div className="space-y-3">
        <label className="block space-y-1.5" htmlFor="text-case-input">
          <span className={labelClass}>Input text</span>
          <textarea id="text-case-input" className={`${fieldClass} min-h-32`} value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <Select id="text-case-mode" label="Case mode" value={mode} onChange={(v) => setMode(v as CaseType)} options={["upper", "lower", "title", "camel"]} />
        <label className="block space-y-1.5" htmlFor="text-case-output">
          <span className={labelClass}>Output text</span>
          <textarea id="text-case-output" className={`${fieldClass} min-h-32`} value={applyCase(text, mode)} readOnly />
        </label>
      </div>
    </ToolSection>
  );
}
