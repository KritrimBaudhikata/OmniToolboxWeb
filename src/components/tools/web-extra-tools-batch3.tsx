"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import { fieldClass, labelClass, NumberInput, OutputCard, ToolSection } from "@/components/tools/common";

function QrGenTool() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState("256");
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    QRCode.toDataURL(text || " ", { width: Math.max(128, Math.min(1024, Number(size) || 256)) })
      .then(setDataUrl)
      .catch(() => setDataUrl(""));
  }, [text, size]);

  return (
    <ToolSection title="QR Generator">
      <div className="grid gap-3 md:grid-cols-[1fr_280px]">
        <div className="space-y-3">
          <label className="block space-y-1.5" htmlFor="qr-input">
            <span className={labelClass}>QR content</span>
            <textarea id="qr-input" className={`${fieldClass} min-h-28`} value={text} onChange={(e) => setText(e.target.value)} />
          </label>
          <NumberInput id="qr-size" label="Size (px)" value={size} onChange={setSize} />
        </div>
        <div className="space-y-3">
          <div className="flex min-h-56 items-center justify-center rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900">
            {dataUrl ? <Image src={dataUrl} alt="Generated QR code" width={256} height={256} unoptimized className="h-auto max-w-full" /> : <p className="text-sm text-slate-500">No preview</p>}
          </div>
          {dataUrl ? (
            <a href={dataUrl} download="qr-code.png" className="inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
              Download PNG
            </a>
          ) : null}
        </div>
      </div>
    </ToolSection>
  );
}

function BarcodeGeneratorTool() {
  const [text, setText] = useState("123456789012");
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    try {
      JsBarcode(svgRef.current, text || "0", { format: "CODE128", displayValue: true, fontSize: 14, margin: 8 });
    } catch {
      svgRef.current.innerHTML = "";
    }
  }, [text]);

  return (
    <ToolSection title="Barcode Generator">
      <div className="space-y-3">
        <label className="block space-y-1.5" htmlFor="barcode-input">
          <span className={labelClass}>Barcode content</span>
          <input id="barcode-input" className={fieldClass} value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
          <svg ref={svgRef} className="max-w-full" />
        </div>
      </div>
    </ToolSection>
  );
}

function PairingGeneratorTool() {
  const [names, setNames] = useState("Alice\nBob\nCharlie\nDiana");
  const [pairs, setPairs] = useState<string[]>([]);
  const generatePairs = () => {
    const list = names.split(/\n|,/).map((n) => n.trim()).filter(Boolean);
    const shuffled = [...list];
    const rand = crypto.getRandomValues(new Uint32Array(Math.max(1, shuffled.length)));
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = rand[i % rand.length] % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const out: string[] = [];
    for (let i = 0; i < shuffled.length; i += 2) out.push(shuffled.slice(i, i + 2).join(" + "));
    setPairs(out);
  };
  return (
    <ToolSection title="Pairing / Teams Generator">
      <div className="space-y-3">
        <label className="block space-y-1.5" htmlFor="pairing-input">
          <span className={labelClass}>Names list</span>
          <textarea id="pairing-input" className={`${fieldClass} min-h-32`} value={names} onChange={(e) => setNames(e.target.value)} />
        </label>
        <button className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" onClick={generatePairs}>
          Generate pairs
        </button>
        <div className="space-y-2">
          {pairs.length ? (
            pairs.map((p) => (
              <div key={p} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800/60">
                {p}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">Click generate to create teams.</p>
          )}
        </div>
      </div>
    </ToolSection>
  );
}

function SeatingPlanTool() {
  const [names, setNames] = useState("A\nB\nC\nD\nE\nF");
  const [cols, setCols] = useState("3");
  const [seats, setSeats] = useState<string[]>([]);
  const generateSeating = () => {
    const list = names.split(/\n|,/).map((n) => n.trim()).filter(Boolean);
    const shuffled = [...list];
    const rand = crypto.getRandomValues(new Uint32Array(Math.max(1, shuffled.length)));
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = rand[i % rand.length] % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setSeats(shuffled);
  };
  const colCount = Math.max(1, Math.min(8, Number(cols) || 3));
  const gridClass =
    colCount <= 2 ? "grid-cols-2" :
    colCount === 3 ? "grid-cols-3" :
    colCount === 4 ? "grid-cols-4" :
    colCount === 5 ? "grid-cols-5" :
    colCount === 6 ? "grid-cols-6" :
    colCount === 7 ? "grid-cols-7" : "grid-cols-8";
  return (
    <ToolSection title="Random Seating Plan">
      <div className="space-y-3">
        <label className="block space-y-1.5" htmlFor="seating-names">
          <span className={labelClass}>Names list</span>
          <textarea id="seating-names" className={`${fieldClass} min-h-32`} value={names} onChange={(e) => setNames(e.target.value)} />
        </label>
        <NumberInput id="seat-cols" label="Columns" value={cols} onChange={setCols} />
        <button className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" onClick={generateSeating}>
          Generate seating
        </button>
        <div className={`grid gap-2 ${gridClass}`}>
          {seats.length ? (
            seats.map((s, i) => (
              <div key={`${s}-${i}`} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-center dark:border-slate-700 dark:bg-slate-800/60">
                {s}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">Click generate to create seating.</p>
          )}
        </div>
      </div>
    </ToolSection>
  );
}

function MarkdownPreviewerTool() {
  const [md, setMd] = useState("# Hello\n\n- Item 1\n- Item 2\n\n**Bold** text");
  const html = useMemo(() => {
    let out = md
      .replace(/^### (.*)$/gm, "<h3>$1</h3>")
      .replace(/^## (.*)$/gm, "<h2>$1</h2>")
      .replace(/^# (.*)$/gm, "<h1>$1</h1>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");
    out = out.replace(/^- (.*)$/gm, "<li>$1</li>");
    out = out.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");
    out = out.replace(/\n/g, "<br/>");
    return out;
  }, [md]);
  return (
    <ToolSection title="Markdown Previewer">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="block space-y-1.5" htmlFor="md-prev-input">
          <span className={labelClass}>Markdown input</span>
          <textarea id="md-prev-input" className={`${fieldClass} min-h-64`} value={md} onChange={(e) => setMd(e.target.value)} />
        </label>
        <div>
          <p className={labelClass}>Preview</p>
          <div className="mt-1 min-h-64 rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </ToolSection>
  );
}

function FileConverterTool() {
  const [text, setText] = useState("Hello OmniToolbox");
  const dataUrl = useMemo(() => `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`, [text]);
  return (
    <ToolSection title="File Converter (Text Export)">
      <div className="space-y-3">
        <label className="block space-y-1.5" htmlFor="fileconv-input">
          <span className={labelClass}>Text content</span>
          <textarea id="fileconv-input" className={`${fieldClass} min-h-32`} value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <a href={dataUrl} download="output.txt" className="inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
          Download as TXT
        </a>
      </div>
    </ToolSection>
  );
}

function ImageConverterTool() {
  const [preview, setPreview] = useState("");
  const [fileName, setFileName] = useState("image");
  const [quality, setQuality] = useState("0.92");
  const [converted, setConverted] = useState("");
  return (
    <ToolSection title="Image Converter">
      <div className="space-y-3">
        <label className="block space-y-1.5" htmlFor="img-file">
          <span className={labelClass}>Select image</span>
          <input
            id="img-file"
            type="file"
            accept="image/*"
            className={fieldClass}
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setFileName(f.name.replace(/\.[^.]+$/, ""));
              const reader = new FileReader();
              reader.onload = () => setPreview(String(reader.result || ""));
              reader.readAsDataURL(f);
            }}
          />
        </label>
        {preview ? <Image src={preview} alt="preview" width={320} height={220} unoptimized className="max-h-48 w-auto rounded-xl border border-slate-200 dark:border-slate-700" /> : null}
        <NumberInput id="img-quality" label="JPEG quality (0-1)" value={quality} onChange={setQuality} />
        <button
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
          onClick={() => {
            if (!preview) return;
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext("2d");
              if (!ctx) return;
              ctx.drawImage(img, 0, 0);
              setConverted(canvas.toDataURL("image/jpeg", Math.max(0, Math.min(1, Number(quality) || 0.92))));
            };
            img.src = preview;
          }}
        >
          Convert to JPEG
        </button>
        {converted ? (
          <a href={converted} download={`${fileName || "image"}.jpg`} className="inline-block rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold dark:border-slate-600">
            Download converted image
          </a>
        ) : null}
      </div>
    </ToolSection>
  );
}

function CookingScaleTool() {
  const [servingsFrom, setServingsFrom] = useState("2");
  const [servingsTo, setServingsTo] = useState("6");
  const [amount, setAmount] = useState("200");
  const scaled = useMemo(() => {
    const from = Number(servingsFrom), to = Number(servingsTo), a = Number(amount);
    if (!from || !to || !a) return "Invalid";
    return (a * (to / from)).toFixed(2);
  }, [servingsFrom, servingsTo, amount]);
  return (
    <ToolSection title="Cooking Scale">
      <div className="grid gap-3 md:grid-cols-3">
        <NumberInput id="cook-from" label="Original servings" value={servingsFrom} onChange={setServingsFrom} />
        <NumberInput id="cook-to" label="Target servings" value={servingsTo} onChange={setServingsTo} />
        <NumberInput id="cook-amount" label="Ingredient amount" value={amount} onChange={setAmount} />
        <div className="md:col-span-3">
          <OutputCard title="Scaled amount" value={scaled} />
        </div>
      </div>
    </ToolSection>
  );
}

function MorseCodeTool() {
  const [text, setText] = useState("SOS");
  const MAP: Record<string, string> = {
    a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.", g: "--.", h: "....", i: "..", j: ".---", k: "-.-", l: ".-..", m: "--",
    n: "-.", o: "---", p: ".--.", q: "--.-", r: ".-.", s: "...", t: "-", u: "..-", v: "...-", w: ".--", x: "-..-", y: "-.--", z: "--..",
    0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.",
  };
  const out = text.toLowerCase().split("").map((c) => MAP[c] ?? "/").join(" ");
  return (
    <ToolSection title="Morse Code">
      <div className="space-y-3">
        <label className="block space-y-1.5" htmlFor="morse-input">
          <span className={labelClass}>Input text</span>
          <input id="morse-input" className={fieldClass} value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <OutputCard title="Morse output" value={out || "(empty)"} />
      </div>
    </ToolSection>
  );
}

export function WebExtraToolBatch3({ toolId }: { toolId: string }) {
  if (toolId === "qr-gen") return <QrGenTool />;
  if (toolId === "barcode-generator") return <BarcodeGeneratorTool />;
  if (toolId === "pairing-generator") return <PairingGeneratorTool />;
  if (toolId === "seating-plan") return <SeatingPlanTool />;
  if (toolId === "markdown-previewer") return <MarkdownPreviewerTool />;
  if (toolId === "file-converter") return <FileConverterTool />;
  if (toolId === "image-converter") return <ImageConverterTool />;
  if (toolId === "cooking-scale") return <CookingScaleTool />;
  if (toolId === "morse-code") return <MorseCodeTool />;
  return null;
}
