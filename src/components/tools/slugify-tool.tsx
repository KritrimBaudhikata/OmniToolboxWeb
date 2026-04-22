"use client";

import { useState } from "react";
import { fieldClass, labelClass, OutputCard, ToolSection } from "@/components/tools/common";

export function SlugifyTool() {
  const [text, setText] = useState("");
  const value = text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-");

  return (
    <ToolSection title="Slugify" subtitle="Create clean URL-friendly text">
      <div className="space-y-3">
        <label className="block space-y-1.5" htmlFor="slugify-input">
          <span className={labelClass}>Text to slugify</span>
          <input id="slugify-input" className={fieldClass} value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <OutputCard title="Slug output" value={value || "Type text to generate slug"} />
      </div>
    </ToolSection>
  );
}
