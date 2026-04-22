"use client";

import { useState } from "react";
import { fieldClass, labelClass, OutputCard, ToolSection } from "@/components/tools/common";

export function WordCounterTool() {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return (
    <ToolSection title="Word and Character Counter">
      <div className="space-y-3">
        <label className="block space-y-1.5" htmlFor="word-counter-input">
          <span className={labelClass}>Text to analyze</span>
          <textarea id="word-counter-input" className={`${fieldClass} min-h-32`} value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <div className="grid gap-2 md:grid-cols-3">
          <OutputCard title="Words" value={String(words)} />
          <OutputCard title="Characters" value={String(text.length)} />
          <OutputCard title="Lines" value={String(text ? text.split(/\n/).length : 0)} />
        </div>
      </div>
    </ToolSection>
  );
}
