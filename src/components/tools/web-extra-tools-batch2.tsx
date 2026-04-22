"use client";

import { useMemo, useState } from "react";
import { fieldClass, labelClass, NumberInput, OutputCard, Select, ToolSection } from "@/components/tools/common";

const PREFIXES = [
  { symbol: "p", factor: 1e-12 },
  { symbol: "n", factor: 1e-9 },
  { symbol: "u", factor: 1e-6 },
  { symbol: "m", factor: 1e-3 },
  { symbol: "", factor: 1 },
  { symbol: "k", factor: 1e3 },
  { symbol: "M", factor: 1e6 },
  { symbol: "G", factor: 1e9 },
];

const COUNTRY_CODES = [
  { name: "Australia", code: "+61" },
  { name: "Canada", code: "+1" },
  { name: "China", code: "+86" },
  { name: "France", code: "+33" },
  { name: "Germany", code: "+49" },
  { name: "Hong Kong", code: "+852" },
  { name: "India", code: "+91" },
  { name: "Japan", code: "+81" },
  { name: "Nepal", code: "+977" },
  { name: "Singapore", code: "+65" },
  { name: "United Kingdom", code: "+44" },
  { name: "United States", code: "+1" },
];

const PERIODIC_MINI: [string, string, number][] = [
  ["H", "Hydrogen", 1], ["He", "Helium", 2], ["Li", "Lithium", 3], ["Be", "Beryllium", 4], ["B", "Boron", 5], ["C", "Carbon", 6],
  ["N", "Nitrogen", 7], ["O", "Oxygen", 8], ["F", "Fluorine", 9], ["Ne", "Neon", 10], ["Na", "Sodium", 11], ["Mg", "Magnesium", 12],
  ["Al", "Aluminium", 13], ["Si", "Silicon", 14], ["P", "Phosphorus", 15], ["S", "Sulfur", 16], ["Cl", "Chlorine", 17], ["Ar", "Argon", 18],
  ["K", "Potassium", 19], ["Ca", "Calcium", 20],
];

function DaysCounterTool() {
  const [from, setFrom] = useState("2026-01-01");
  const [to, setTo] = useState("2026-12-31");
  const out = useMemo(() => {
    const a = new Date(from);
    const b = new Date(to);
    if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return "Invalid date";
    const days = Math.round((b.getTime() - a.getTime()) / 86400000);
    return `${days} day(s)`;
  }, [from, to]);
  return (
    <ToolSection title="Days Counter">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="block space-y-1.5"><span className={labelClass}>From date</span><input type="date" className={fieldClass} value={from} onChange={(e) => setFrom(e.target.value)} /></label>
        <label className="block space-y-1.5"><span className={labelClass}>To date</span><input type="date" className={fieldClass} value={to} onChange={(e) => setTo(e.target.value)} /></label>
        <div className="md:col-span-2"><OutputCard title="Difference" value={out} /></div>
      </div>
    </ToolSection>
  );
}

function TimeCounterTool() {
  const [h1, setH1] = useState("1");
  const [m1, setM1] = useState("30");
  const [h2, setH2] = useState("0");
  const [m2, setM2] = useState("45");
  const total = (Number(h1) || 0) * 60 + (Number(m1) || 0) + (Number(h2) || 0) * 60 + (Number(m2) || 0);
  const out = `${Math.floor(total / 60)}h ${total % 60}m`;
  return (
    <ToolSection title="Add/Subtract Time">
      <div className="grid gap-3 md:grid-cols-4">
        <NumberInput id="t1h" label="Hours A" value={h1} onChange={setH1} />
        <NumberInput id="t1m" label="Minutes A" value={m1} onChange={setM1} />
        <NumberInput id="t2h" label="Hours B" value={h2} onChange={setH2} />
        <NumberInput id="t2m" label="Minutes B" value={m2} onChange={setM2} />
        <div className="md:col-span-4"><OutputCard title="Total" value={out} /></div>
      </div>
    </ToolSection>
  );
}

function CoordinatesConverterTool() {
  const [decimal, setDecimal] = useState("27.7172");
  const dms = useMemo(() => {
    const n = Number(decimal);
    if (Number.isNaN(n)) return "Invalid";
    const deg = Math.trunc(n);
    const minFloat = Math.abs((n - deg) * 60);
    const min = Math.trunc(minFloat);
    const sec = ((minFloat - min) * 60).toFixed(2);
    return `${deg}° ${min}' ${sec}"`;
  }, [decimal]);
  return (
    <ToolSection title="Coordinates Converter">
      <div className="space-y-3">
        <label className="block space-y-1.5"><span className={labelClass}>Decimal degrees</span><input className={fieldClass} value={decimal} onChange={(e) => setDecimal(e.target.value)} /></label>
        <OutputCard title="DMS format" value={dms} />
      </div>
    </ToolSection>
  );
}

function DurationFormatterTool() {
  const [seconds, setSeconds] = useState("3600");
  const out = useMemo(() => {
    const s = Number(seconds);
    if (!Number.isFinite(s) || s < 0) return "Invalid";
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    return `${h}h ${m}m ${sec}s`;
  }, [seconds]);
  return (
    <ToolSection title="Duration Formatter">
      <div className="space-y-3">
        <NumberInput id="duration-seconds" label="Seconds" value={seconds} onChange={setSeconds} />
        <OutputCard title="Formatted" value={out} />
      </div>
    </ToolSection>
  );
}

function UnitPrefixesTool() {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("k");
  const out = useMemo(() => {
    const n = Number(value);
    const fromF = PREFIXES.find((p) => p.symbol === from)?.factor ?? 1;
    const toF = PREFIXES.find((p) => p.symbol === to)?.factor ?? 1;
    if (Number.isNaN(n)) return "Invalid";
    return String((n * fromF) / toF);
  }, [value, from, to]);
  return (
    <ToolSection title="Unit Prefixes">
      <div className="grid gap-3 md:grid-cols-3">
        <NumberInput id="prefix-value" label="Value" value={value} onChange={setValue} />
        <Select id="prefix-from" label="From prefix" value={from} onChange={setFrom} options={PREFIXES.map((p) => p.symbol || "base")} />
        <Select id="prefix-to" label="To prefix" value={to} onChange={setTo} options={PREFIXES.map((p) => p.symbol || "base")} />
        <div className="md:col-span-3"><OutputCard title="Converted value" value={out} /></div>
      </div>
    </ToolSection>
  );
}

function CountryCodesTool() {
  const [query, setQuery] = useState("");
  const list = COUNTRY_CODES.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <ToolSection title="Country Calling Codes">
      <div className="space-y-3">
        <label className="block space-y-1.5"><span className={labelClass}>Search country</span><input className={fieldClass} value={query} onChange={(e) => setQuery(e.target.value)} /></label>
        <div className="max-h-56 space-y-1 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-2 text-sm dark:border-slate-700 dark:bg-slate-800/60">
          {list.map((c) => (
            <div key={c.name} className="flex items-center justify-between rounded-md px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700/60">
              <span>{c.name}</span>
              <span className="font-semibold">{c.code}</span>
            </div>
          ))}
        </div>
      </div>
    </ToolSection>
  );
}

function BodyMeasurementTool() {
  const [size, setSize] = useState("9");
  const eu = useMemo(() => {
    const us = Number(size);
    if (!Number.isFinite(us)) return "Invalid";
    return String(Math.round(us + 33));
  }, [size]);
  return (
    <ToolSection title="Body Measurement (Shoe)">
      <div className="space-y-3">
        <NumberInput id="shoe-us" label="US shoe size" value={size} onChange={setSize} />
        <OutputCard title="Approx EU size" value={eu} />
      </div>
    </ToolSection>
  );
}

function ColorPickerTool() {
  const [color, setColor] = useState("#4f46e5");
  return (
    <ToolSection title="Color Picker">
      <div className="grid gap-3 md:grid-cols-[120px_1fr]">
        <label className="block space-y-1.5"><span className={labelClass}>Pick color</span><input type="color" className="h-12 w-full rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900" value={color} onChange={(e) => setColor(e.target.value)} /></label>
        <label className="block space-y-1.5"><span className={labelClass}>Hex value</span><input className={fieldClass} value={color} onChange={(e) => setColor(e.target.value)} /></label>
        <div className="md:col-span-2"><OutputCard title="Selected color" value={color} /></div>
      </div>
    </ToolSection>
  );
}

function GradientGeneratorTool() {
  const [c1, setC1] = useState("#4f46e5");
  const [c2, setC2] = useState("#06b6d4");
  const [deg, setDeg] = useState("90");
  const css = `linear-gradient(${deg}deg, ${c1}, ${c2})`;
  return (
    <ToolSection title="Gradient Generator">
      <div className="space-y-3">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="block space-y-1.5"><span className={labelClass}>Color A</span><input type="color" className="h-12 w-full rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900" value={c1} onChange={(e) => setC1(e.target.value)} /></label>
          <label className="block space-y-1.5"><span className={labelClass}>Color B</span><input type="color" className="h-12 w-full rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900" value={c2} onChange={(e) => setC2(e.target.value)} /></label>
          <NumberInput id="grad-deg" label="Angle (deg)" value={deg} onChange={setDeg} />
        </div>
        <div className="h-24 rounded-xl border border-slate-200 bg-linear-to-r from-indigo-500 to-cyan-500 dark:border-slate-700" />
        <OutputCard title="CSS" value={css} />
      </div>
    </ToolSection>
  );
}

function AspectRatioTool() {
  const [w, setW] = useState("1920");
  const [h, setH] = useState("1080");
  const ratio = useMemo(() => {
    const a = Number(w), b = Number(h);
    if (!a || !b) return "Invalid";
    const gcd = (x: number, y: number): number => (y ? gcd(y, x % y) : x);
    const g = gcd(a, b);
    return `${a / g}:${b / g}`;
  }, [w, h]);
  return (
    <ToolSection title="Aspect Ratio">
      <div className="grid gap-3 md:grid-cols-2">
        <NumberInput id="ar-w" label="Width" value={w} onChange={setW} />
        <NumberInput id="ar-h" label="Height" value={h} onChange={setH} />
        <div className="md:col-span-2"><OutputCard title="Ratio" value={ratio} /></div>
      </div>
    </ToolSection>
  );
}

function DpiHelperTool() {
  const [diag, setDiag] = useState("15.6");
  const [w, setW] = useState("1920");
  const [h, setH] = useState("1080");
  const ppi = useMemo(() => {
    const d = Number(diag), x = Number(w), y = Number(h);
    if (!d || !x || !y) return "Invalid";
    return String((Math.sqrt(x * x + y * y) / d).toFixed(2));
  }, [diag, w, h]);
  return (
    <ToolSection title="DPI / PPI Helper">
      <div className="grid gap-3 md:grid-cols-3">
        <NumberInput id="dpi-diag" label="Diagonal inches" value={diag} onChange={setDiag} />
        <NumberInput id="dpi-w" label="Width pixels" value={w} onChange={setW} />
        <NumberInput id="dpi-h" label="Height pixels" value={h} onChange={setH} />
        <div className="md:col-span-3"><OutputCard title="PPI" value={ppi} /></div>
      </div>
    </ToolSection>
  );
}

function TextRedactorTool() {
  const [text, setText] = useState("");
  const [token, setToken] = useState("****");
  const redacted = text.replace(/\b[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}\b/g, token).replace(/\b\d{10,16}\b/g, token);
  return (
    <ToolSection title="Text Redactor">
      <div className="space-y-3">
        <label className="block space-y-1.5"><span className={labelClass}>Replacement token</span><input className={fieldClass} value={token} onChange={(e) => setToken(e.target.value)} /></label>
        <label className="block space-y-1.5" htmlFor="redactor-input"><span className={labelClass}>Input text</span><textarea id="redactor-input" className={`${fieldClass} min-h-32`} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste text with sensitive data..." /></label>
        <label className="block space-y-1.5" htmlFor="redactor-output"><span className={labelClass}>Redacted output</span><textarea id="redactor-output" className={`${fieldClass} min-h-32`} value={redacted} readOnly /></label>
      </div>
    </ToolSection>
  );
}

function PeriodicTableTool() {
  const [query, setQuery] = useState("");
  const list = PERIODIC_MINI.filter(([sym, name]) => sym.toLowerCase().includes(query.toLowerCase()) || name.toLowerCase().includes(query.toLowerCase()));
  return (
    <ToolSection title="Periodic Table Mini">
      <div className="space-y-3">
        <label className="block space-y-1.5"><span className={labelClass}>Search element</span><input className={fieldClass} value={query} onChange={(e) => setQuery(e.target.value)} /></label>
        <div className="grid gap-2 sm:grid-cols-2">
          {list.map(([sym, name, no]) => (
            <div key={String(sym)} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/60">
              <p className="font-semibold">{name} ({sym})</p>
              <p className="text-xs text-slate-500">Atomic no: {no}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolSection>
  );
}

export function WebExtraToolBatch2({ toolId }: { toolId: string }) {
  if (toolId === "days-counter") return <DaysCounterTool />;
  if (toolId === "time-counter") return <TimeCounterTool />;
  if (toolId === "coordinates-converter") return <CoordinatesConverterTool />;
  if (toolId === "duration-formatter") return <DurationFormatterTool />;
  if (toolId === "unit-prefixes") return <UnitPrefixesTool />;
  if (toolId === "country-codes") return <CountryCodesTool />;
  if (toolId === "body-measurement") return <BodyMeasurementTool />;
  if (toolId === "color-picker") return <ColorPickerTool />;
  if (toolId === "gradient-generator") return <GradientGeneratorTool />;
  if (toolId === "aspect-ratio") return <AspectRatioTool />;
  if (toolId === "dpi-helper") return <DpiHelperTool />;
  if (toolId === "text-redactor") return <TextRedactorTool />;
  if (toolId === "periodic-table") return <PeriodicTableTool />;
  return null;
}
