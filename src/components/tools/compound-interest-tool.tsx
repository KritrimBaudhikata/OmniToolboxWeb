"use client";

import { useMemo, useState } from "react";
import { NumberInput, OutputCard, ToolSection } from "@/components/tools/common";

export function CompoundInterestTool() {
  const [principal, setPrincipal] = useState("1000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("10");
  const amount = useMemo(() => {
    const p = Number(principal);
    const r = Number(rate) / 100;
    const y = Number(years);
    if (!Number.isFinite(p) || !Number.isFinite(r) || !Number.isFinite(y)) return null;
    return p * (1 + r) ** y;
  }, [principal, rate, years]);

  return (
    <ToolSection title="Compound Interest Calculator" subtitle="Estimate growth over time">
      <div className="space-y-3">
        <div className="grid gap-3 md:grid-cols-3">
          <NumberInput id="ci-principal" label="Principal amount" value={principal} onChange={setPrincipal} />
          <NumberInput id="ci-rate" label="Annual rate (%)" value={rate} onChange={setRate} />
          <NumberInput id="ci-years" label="Years" value={years} onChange={setYears} />
        </div>
        <OutputCard title="Future value" value={amount ? amount.toFixed(2) : "Invalid values"} />
      </div>
    </ToolSection>
  );
}
