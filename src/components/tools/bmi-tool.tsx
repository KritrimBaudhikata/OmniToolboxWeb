"use client";

import { useMemo, useState } from "react";
import { NumberInput, OutputCard, ToolSection } from "@/components/tools/common";

export function BmiTool() {
  const [kg, setKg] = useState("70");
  const [cm, setCm] = useState("170");
  const bmi = useMemo(() => {
    const w = Number(kg);
    const h = Number(cm) / 100;
    if (!w || !h) return null;
    return w / (h * h);
  }, [kg, cm]);

  return (
    <ToolSection title="BMI Calculator" subtitle="Track body mass index quickly">
      <div className="space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          <NumberInput id="bmi-kg" label="Weight (kg)" value={kg} onChange={setKg} />
          <NumberInput id="bmi-cm" label="Height (cm)" value={cm} onChange={setCm} />
        </div>
        <OutputCard title="BMI Result" value={bmi ? bmi.toFixed(2) : "Invalid values"} />
      </div>
    </ToolSection>
  );
}
