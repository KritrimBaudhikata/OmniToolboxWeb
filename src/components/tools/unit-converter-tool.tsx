"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, convert, UNITS, type Category } from "@/lib/converter";
import { NumberInput, OutputCard, Select, ToolSection } from "@/components/tools/common";

export function UnitConverterTool() {
  const [category, setCategory] = useState<Category>("length");
  const unitKeys = useMemo(() => Object.keys(UNITS[category]), [category]);
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("km");
  const [input, setInput] = useState("1");

  const result = useMemo(() => {
    const n = Number(input);
    if (Number.isNaN(n)) return "Invalid number";
    return String(convert(category, n, from, to));
  }, [category, from, to, input]);

  return (
    <ToolSection title="Conversion Input" subtitle="Switch category and units for instant results">
      <div className="space-y-3">
        <Select id="unit-category" label="Category" value={category} onChange={(v) => setCategory(v as Category)} options={CATEGORIES} />
        <div className="grid gap-3 md:grid-cols-2">
          <Select id="unit-from" label="From unit" value={from} onChange={setFrom} options={unitKeys} />
          <Select id="unit-to" label="To unit" value={to} onChange={setTo} options={unitKeys} />
        </div>
        <NumberInput id="unit-value" label="Value to convert" value={input} onChange={setInput} />
        <OutputCard title="Converted Value" value={result} />
      </div>
    </ToolSection>
  );
}
