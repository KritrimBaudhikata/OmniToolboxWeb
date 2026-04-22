"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { NumberInput, OutputCard, ToolSection } from "@/components/tools/common";

export function RandomNumberTool() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [value, setValue] = useState<number | null>(null);

  return (
    <ToolSection title="Random Number Generator" subtitle="Quickly generate secure random range values">
      <div className="space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          <NumberInput id="random-min" label="Minimum value" value={min} onChange={setMin} />
          <NumberInput id="random-max" label="Maximum value" value={max} onChange={setMax} />
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          onClick={() => {
            const minNum = Math.floor(Number(min));
            const maxNum = Math.floor(Number(max));
            if (Number.isNaN(minNum) || Number.isNaN(maxNum) || minNum > maxNum) return;
            setValue(Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
          }}
        >
          <Icon icon="mdi:dice-multiple" width={16} />
          Generate
        </button>
        <OutputCard title="Generated value" value={value === null ? "No result yet" : String(value)} />
      </div>
    </ToolSection>
  );
}
