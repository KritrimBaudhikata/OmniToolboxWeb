"use client";

import { useMemo, useState } from "react";
import { fieldClass, labelClass, NumberInput, OutputCard, ToolSection } from "@/components/tools/common";

function HashTool() {
  const [input, setInput] = useState("");
  const [algo, setAlgo] = useState<"SHA-256" | "SHA-1">("SHA-256");
  const [output, setOutput] = useState("");

  async function generate() {
    const bytes = new TextEncoder().encode(input);
    const digest = await crypto.subtle.digest(algo, bytes);
    const hex = Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
    setOutput(hex);
  }

  return (
    <ToolSection title="Hash Generator" subtitle="Generate SHA hashes in-browser">
      <div className="space-y-3">
        <label className="block space-y-1.5">
          <span className={labelClass}>Algorithm</span>
          <select className={fieldClass} value={algo} onChange={(e) => setAlgo(e.target.value as "SHA-256" | "SHA-1")}>
            <option>SHA-256</option>
            <option>SHA-1</option>
          </select>
        </label>
        <label className="block space-y-1.5">
          <span className={labelClass}>Input text</span>
          <textarea className={`${fieldClass} min-h-28`} value={input} onChange={(e) => setInput(e.target.value)} />
        </label>
        <button className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" onClick={generate}>
          Generate hash
        </button>
        <OutputCard title="Hash output" value={output || "No hash yet"} />
      </div>
    </ToolSection>
  );
}

function UrlParserTool() {
  const [input, setInput] = useState("https://example.com/path?q=hello&lang=en#section");
  const parsed = useMemo(() => {
    try {
      const u = new URL(input);
      const params = Array.from(u.searchParams.entries());
      return { ok: true, origin: u.origin, path: u.pathname, hash: u.hash, params };
    } catch {
      return { ok: false as const };
    }
  }, [input]);

  return (
    <ToolSection title="URL Parser" subtitle="Break URL into parts">
      <div className="space-y-3">
        <label className="block space-y-1.5">
          <span className={labelClass}>URL</span>
          <input className={fieldClass} value={input} onChange={(e) => setInput(e.target.value)} />
        </label>
        {"ok" in parsed && parsed.ok ? (
          <div className="grid gap-2">
            <OutputCard title="Origin" value={parsed.origin} />
            <OutputCard title="Path" value={parsed.path || "/"} />
            <OutputCard title="Hash" value={parsed.hash || "(none)"} />
            <OutputCard title="Query Params" value={parsed.params.length ? parsed.params.map(([k, v]) => `${k}=${v}`).join(", ") : "(none)"} />
          </div>
        ) : (
          <OutputCard title="Status" value="Invalid URL" />
        )}
      </div>
    </ToolSection>
  );
}

function EmailValidatorTool() {
  const [input, setInput] = useState("");
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim());
  const phoneValid = /^\+?[0-9\s\-()]{7,}$/.test(input.trim());
  return (
    <ToolSection title="Email / Phone Validator">
      <div className="space-y-3">
        <label className="block space-y-1.5" htmlFor="email-phone-input">
          <span className={labelClass}>Email or phone input</span>
          <input id="email-phone-input" className={fieldClass} value={input} onChange={(e) => setInput(e.target.value)} placeholder="name@example.com or +1 555 1234" />
        </label>
        <div className="grid gap-2 md:grid-cols-2">
          <OutputCard title="Email check" value={emailValid ? "Valid format" : "Invalid format"} />
          <OutputCard title="Phone check" value={phoneValid ? "Valid format" : "Invalid format"} />
        </div>
      </div>
    </ToolSection>
  );
}

function PassphraseTool() {
  const [count, setCount] = useState("4");
  const [out, setOut] = useState("");
  const words = ["sunset", "orbit", "cobalt", "maple", "river", "ember", "silver", "echo", "cosmic", "panda", "thunder", "violet"];
  return (
    <ToolSection title="Passphrase Generator">
      <div className="space-y-3">
        <NumberInput id="pp-count" label="Word count" value={count} onChange={setCount} />
        <button
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
          onClick={() => {
            const n = Math.max(3, Math.min(8, Number(count) || 4));
            const arr = crypto.getRandomValues(new Uint32Array(n));
            setOut(Array.from(arr).map((x) => words[x % words.length]).join("-"));
          }}
        >
          Generate passphrase
        </button>
        <OutputCard title="Passphrase" value={out || "No passphrase yet"} />
      </div>
    </ToolSection>
  );
}

function PinTool() {
  const [digits, setDigits] = useState("6");
  const [pin, setPin] = useState("");
  return (
    <ToolSection title="PIN Generator">
      <div className="space-y-3">
        <NumberInput id="pin-digits" label="PIN digits" value={digits} onChange={setDigits} />
        <button
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
          onClick={() => {
            const len = Math.max(4, Math.min(8, Number(digits) || 6));
            const arr = crypto.getRandomValues(new Uint8Array(len));
            setPin(Array.from(arr).map((x) => String(x % 10)).join(""));
          }}
        >
          Generate PIN
        </button>
        <OutputCard title="PIN output" value={pin || "No PIN yet"} />
      </div>
    </ToolSection>
  );
}

function WordFrequencyTool() {
  const [text, setText] = useState("");
  const top = useMemo(() => {
    const map = new Map<string, number>();
    text.toLowerCase().match(/\b[\w']+\b/g)?.forEach((w) => map.set(w, (map.get(w) ?? 0) + 1));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [text]);
  return (
    <ToolSection title="Word Frequency">
      <div className="space-y-3">
        <label className="block space-y-1.5" htmlFor="wf-input">
          <span className={labelClass}>Input text</span>
          <textarea id="wf-input" className={`${fieldClass} min-h-32`} value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/60">
          {top.length ? top.map(([w, c]) => `${w}: ${c}`).join(" | ") : "No words detected"}
        </div>
      </div>
    </ToolSection>
  );
}

function MarkdownToTextTool() {
  const [md, setMd] = useState("");
  const plain = md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[[^\]]+\]\([^)]+\)/g, "$1")
    .replace(/[#>*_\-]/g, "")
    .trim();
  return (
    <ToolSection title="Markdown to Plain Text">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="block space-y-1.5" htmlFor="md-input">
          <span className={labelClass}>Markdown input</span>
          <textarea id="md-input" className={`${fieldClass} min-h-52`} value={md} onChange={(e) => setMd(e.target.value)} />
        </label>
        <label className="block space-y-1.5" htmlFor="md-output">
          <span className={labelClass}>Plain text output</span>
          <textarea id="md-output" className={`${fieldClass} min-h-52`} value={plain} readOnly />
        </label>
      </div>
    </ToolSection>
  );
}

function HtmlEntitiesTool() {
  const [text, setText] = useState("");
  const encoded = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const decoded = encoded.replace(/&quot;/g, '"').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
  return (
    <ToolSection title="HTML Entities">
      <div className="space-y-3">
        <label className="block space-y-1.5" htmlFor="html-entities-input">
          <span className={labelClass}>Text input</span>
          <input id="html-entities-input" className={fieldClass} value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <OutputCard title="Encoded" value={encoded} />
        <OutputCard title="Decoded" value={decoded} />
      </div>
    </ToolSection>
  );
}

function DateFormatterTool() {
  const [input, setInput] = useState(new Date().toISOString().slice(0, 19));
  const d = new Date(input);
  const valid = !Number.isNaN(d.getTime());
  return (
    <ToolSection title="Date Formatter">
      <div className="space-y-3">
        <label className="block space-y-1.5" htmlFor="date-format-input">
          <span className={labelClass}>Date/time input</span>
          <input id="date-format-input" className={fieldClass} value={input} onChange={(e) => setInput(e.target.value)} />
        </label>
        <OutputCard title="ISO" value={valid ? d.toISOString() : "Invalid date"} />
        <OutputCard title="Locale" value={valid ? d.toLocaleString() : "Invalid date"} />
        <OutputCard title="UTC" value={valid ? d.toUTCString() : "Invalid date"} />
      </div>
    </ToolSection>
  );
}

function UnitPriceTool() {
  const [price, setPrice] = useState("5.99");
  const [qty, setQty] = useState("2");
  const unit = useMemo(() => {
    const p = Number(price);
    const q = Number(qty);
    if (!p || !q) return "Invalid values";
    return (p / q).toFixed(4);
  }, [price, qty]);
  return (
    <ToolSection title="Unit Price Calculator">
      <div className="grid gap-3 md:grid-cols-2">
        <NumberInput id="up-price" label="Total price" value={price} onChange={setPrice} />
        <NumberInput id="up-qty" label="Quantity" value={qty} onChange={setQty} />
        <div className="md:col-span-2">
          <OutputCard title="Price per unit" value={unit} />
        </div>
      </div>
    </ToolSection>
  );
}

function FractionConverterTool() {
  const [value, setValue] = useState("0.75");
  const out = useMemo(() => {
    const n = Number(value);
    if (Number.isNaN(n)) return "Invalid";
    const denom = 1000;
    const num = Math.round(n * denom);
    const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
    const g = gcd(Math.abs(num), denom);
    return `${num / g}/${denom / g}`;
  }, [value]);
  return (
    <ToolSection title="Fraction ↔ Decimal">
      <div className="space-y-3">
        <label className="block space-y-1.5" htmlFor="fraction-input">
          <span className={labelClass}>Decimal input</span>
          <input id="fraction-input" className={fieldClass} value={value} onChange={(e) => setValue(e.target.value)} />
        </label>
        <OutputCard title="Fraction" value={out} />
      </div>
    </ToolSection>
  );
}

function RomanNumeralTool() {
  const [input, setInput] = useState("42");
  const roman = useMemo(() => {
    let n = Number(input);
    if (!Number.isInteger(n) || n <= 0 || n > 3999) return "Enter integer 1-3999";
    const map: Array<[number, string]> = [
      [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
    ];
    let out = "";
    for (const [v, s] of map) while (n >= v) { out += s; n -= v; }
    return out;
  }, [input]);
  return (
    <ToolSection title="Roman Numeral Converter">
      <div className="space-y-3">
        <label className="block space-y-1.5" htmlFor="roman-input">
          <span className={labelClass}>Number input</span>
          <input id="roman-input" className={fieldClass} value={input} onChange={(e) => setInput(e.target.value)} />
        </label>
        <OutputCard title="Roman numeral" value={roman} />
      </div>
    </ToolSection>
  );
}

function NatoPhoneticTool() {
  const [text, setText] = useState("");
  const map: Record<string, string> = { a: "Alpha", b: "Bravo", c: "Charlie", d: "Delta", e: "Echo", f: "Foxtrot", g: "Golf", h: "Hotel", i: "India", j: "Juliett", k: "Kilo", l: "Lima", m: "Mike", n: "November", o: "Oscar", p: "Papa", q: "Quebec", r: "Romeo", s: "Sierra", t: "Tango", u: "Uniform", v: "Victor", w: "Whiskey", x: "X-ray", y: "Yankee", z: "Zulu" };
  const out = text.toLowerCase().split("").map((c) => map[c] ?? c).join(" ");
  return (
    <ToolSection title="NATO Phonetic">
      <div className="space-y-3">
        <label className="block space-y-1.5" htmlFor="nato-input">
          <span className={labelClass}>Text input</span>
          <input id="nato-input" className={fieldClass} value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <OutputCard title="Phonetic output" value={out || "(empty)"} />
      </div>
    </ToolSection>
  );
}

function MacFormatterTool() {
  const [input, setInput] = useState("");
  const out = input.replace(/[^a-fA-F0-9]/g, "").slice(0, 12).match(/.{1,2}/g)?.join(":").toUpperCase() ?? "";
  return (
    <ToolSection title="MAC Address Formatter">
      <div className="space-y-3">
        <label className="block space-y-1.5" htmlFor="mac-input">
          <span className={labelClass}>MAC input</span>
          <input id="mac-input" className={fieldClass} value={input} onChange={(e) => setInput(e.target.value)} placeholder="a1b2c3d4e5f6" />
        </label>
        <OutputCard title="Formatted MAC" value={out || "Invalid / empty"} />
      </div>
    </ToolSection>
  );
}

function AgeCalculatorTool() {
  const [dob, setDob] = useState("2000-01-01");
  const out = useMemo(() => {
    const d = new Date(dob);
    if (Number.isNaN(d.getTime())) return "Invalid date";
    const now = new Date();
    let years = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) years--;
    return `${years} years`;
  }, [dob]);
  return (
    <ToolSection title="Age Calculator">
      <div className="space-y-3">
        <label className="block space-y-1.5" htmlFor="age-dob">
          <span className={labelClass}>Date of birth</span>
          <input id="age-dob" type="date" className={fieldClass} value={dob} onChange={(e) => setDob(e.target.value)} />
        </label>
        <OutputCard title="Current age" value={out} />
      </div>
    </ToolSection>
  );
}

function FuelCostTool() {
  const [distance, setDistance] = useState("100");
  const [efficiency, setEfficiency] = useState("15");
  const [price, setPrice] = useState("1.5");
  const out = useMemo(() => {
    const d = Number(distance), e = Number(efficiency), p = Number(price);
    if (!d || !e || !p) return "Invalid";
    const litres = d / e;
    return `${(litres * p).toFixed(2)} total (${litres.toFixed(2)} L)`;
  }, [distance, efficiency, price]);
  return (
    <ToolSection title="Fuel Cost Estimator">
      <div className="grid gap-3 md:grid-cols-3">
        <NumberInput id="fuel-distance" label="Distance (km)" value={distance} onChange={setDistance} />
        <NumberInput id="fuel-eff" label="Efficiency (km/L)" value={efficiency} onChange={setEfficiency} />
        <NumberInput id="fuel-price" label="Fuel price per L" value={price} onChange={setPrice} />
        <div className="md:col-span-3">
          <OutputCard title="Trip estimate" value={out} />
        </div>
      </div>
    </ToolSection>
  );
}

function WaterTrackerTool() {
  const [goal, setGoal] = useState("8");
  const [drank, setDrank] = useState("0");
  const remaining = Math.max(0, (Number(goal) || 0) - (Number(drank) || 0));
  return (
    <ToolSection title="Water Intake Tracker">
      <div className="grid gap-3 md:grid-cols-2">
        <NumberInput id="water-goal" label="Daily goal (glasses)" value={goal} onChange={setGoal} />
        <NumberInput id="water-drank" label="Consumed" value={drank} onChange={setDrank} />
        <div className="md:col-span-2">
          <OutputCard title="Remaining" value={`${remaining} glasses`} />
        </div>
      </div>
    </ToolSection>
  );
}

function TimezoneTool() {
  const [zone, setZone] = useState("UTC");
  const zones = ["UTC", "Asia/Kathmandu", "Asia/Hong_Kong", "Europe/London", "America/New_York", "Asia/Tokyo"];
  const out = useMemo(() => {
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: zone, dateStyle: "full", timeStyle: "long" }).format(new Date());
    } catch {
      return "Invalid timezone";
    }
  }, [zone]);
  return (
    <ToolSection title="Timezone Converter">
      <div className="space-y-3">
        <label className="block space-y-1.5">
          <span className={labelClass}>Timezone</span>
          <select className={fieldClass} value={zone} onChange={(e) => setZone(e.target.value)}>
            {zones.map((z) => <option key={z}>{z}</option>)}
          </select>
        </label>
        <OutputCard title="Current time" value={out} />
      </div>
    </ToolSection>
  );
}

function MyIpTool() {
  const [ip, setIp] = useState("");
  return (
    <ToolSection title="My IP Address">
      <div className="space-y-3">
        <button
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
          onClick={async () => {
            try {
              const res = await fetch("https://api.ipify.org?format=json");
              const data = await res.json();
              setIp(data.ip ?? "Unavailable");
            } catch {
              setIp("Unavailable");
            }
          }}
        >
          Fetch my IP
        </button>
        <OutputCard title="Public IP" value={ip || "Not fetched yet"} />
      </div>
    </ToolSection>
  );
}

function KeyboardShortcutsTool() {
  const items = [
    "Ctrl/Cmd + C: Copy",
    "Ctrl/Cmd + V: Paste",
    "Ctrl/Cmd + Z: Undo",
    "Ctrl/Cmd + Shift + Z: Redo",
    "Ctrl/Cmd + F: Find",
    "Ctrl/Cmd + S: Save",
  ];
  return (
    <ToolSection title="Keyboard Shortcuts">
      <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-200">
        {items.map((it) => (
          <li key={it} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800/60">
            {it}
          </li>
        ))}
      </ul>
    </ToolSection>
  );
}

export function WebExtraTool({ toolId }: { toolId: string }) {
  if (toolId === "hash-gen") return <HashTool />;
  if (toolId === "url-parser") return <UrlParserTool />;
  if (toolId === "email-validator") return <EmailValidatorTool />;
  if (toolId === "passphrase-gen") return <PassphraseTool />;
  if (toolId === "pin-gen") return <PinTool />;
  if (toolId === "word-frequency") return <WordFrequencyTool />;
  if (toolId === "markdown-to-text") return <MarkdownToTextTool />;
  if (toolId === "html-entities") return <HtmlEntitiesTool />;
  if (toolId === "date-formatter") return <DateFormatterTool />;
  if (toolId === "unit-price") return <UnitPriceTool />;
  if (toolId === "fraction-converter") return <FractionConverterTool />;
  if (toolId === "roman-numeral") return <RomanNumeralTool />;
  if (toolId === "nato-phonetic") return <NatoPhoneticTool />;
  if (toolId === "mac-formatter") return <MacFormatterTool />;
  if (toolId === "age-calculator") return <AgeCalculatorTool />;
  if (toolId === "fuel-cost") return <FuelCostTool />;
  if (toolId === "water-tracker") return <WaterTrackerTool />;
  if (toolId === "timezone-converter") return <TimezoneTool />;
  if (toolId === "my-ip") return <MyIpTool />;
  if (toolId === "keyboard-shortcuts") return <KeyboardShortcutsTool />;
  return null;
}

