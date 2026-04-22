"use client";

import dynamic from "next/dynamic";
import { UnsupportedTool } from "@/components/tools/fallback-tools";
import { WEB_EXTRA_TOOL_IDS } from "@/components/tools/web-extra-tool-ids";
import { WEB_EXTRA_TOOL_IDS_BATCH2 } from "@/components/tools/web-extra-tool-ids-batch2";
import { WEB_EXTRA_TOOL_IDS_BATCH3 } from "@/components/tools/web-extra-tool-ids-batch3";

const LoadingTool = () => (
  <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
    <div className="h-5 w-36 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
    <div className="mt-3 h-10 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
    <div className="mt-2 h-10 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
    <div className="mt-2 h-24 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
  </section>
);

const UnitConverterTool = dynamic(() => import("@/components/tools/unit-converter-tool").then((m) => m.UnitConverterTool), { loading: LoadingTool });
const TextCaseTool = dynamic(() => import("@/components/tools/text-case-tool").then((m) => m.TextCaseTool), { loading: LoadingTool });
const WordCounterTool = dynamic(() => import("@/components/tools/word-counter-tool").then((m) => m.WordCounterTool), { loading: LoadingTool });
const JsonFormatterTool = dynamic(() => import("@/components/tools/json-formatter-tool").then((m) => m.JsonFormatterTool), { loading: LoadingTool });
const SlugifyTool = dynamic(() => import("@/components/tools/slugify-tool").then((m) => m.SlugifyTool), { loading: LoadingTool });
const RandomNumberTool = dynamic(() => import("@/components/tools/random-number-tool").then((m) => m.RandomNumberTool), { loading: LoadingTool });
const PasswordTool = dynamic(() => import("@/components/tools/password-tool").then((m) => m.PasswordTool), { loading: LoadingTool });
const UuidTool = dynamic(() => import("@/components/tools/uuid-tool").then((m) => m.UuidTool), { loading: LoadingTool });
const BmiTool = dynamic(() => import("@/components/tools/bmi-tool").then((m) => m.BmiTool), { loading: LoadingTool });
const CompoundInterestTool = dynamic(() => import("@/components/tools/compound-interest-tool").then((m) => m.CompoundInterestTool), { loading: LoadingTool });
const WebExtraTool = dynamic(() => import("@/components/tools/web-extra-tools").then((m) => m.WebExtraTool), { loading: LoadingTool });
const WebExtraToolBatch2 = dynamic(() => import("@/components/tools/web-extra-tools-batch2").then((m) => m.WebExtraToolBatch2), { loading: LoadingTool });
const WebExtraToolBatch3 = dynamic(() => import("@/components/tools/web-extra-tools-batch3").then((m) => m.WebExtraToolBatch3), { loading: LoadingTool });

export function ToolRenderer({ toolId }: { toolId: string }) {
  if (toolId === "unit-converter") return <UnitConverterTool />;
  if (toolId === "text-case") return <TextCaseTool />;
  if (toolId === "word-counter") return <WordCounterTool />;
  if (toolId === "json-formatter") return <JsonFormatterTool />;
  if (toolId === "slugify") return <SlugifyTool />;
  if (toolId === "random-number") return <RandomNumberTool />;
  if (toolId === "password-gen") return <PasswordTool />;
  if (toolId === "uuid-gen") return <UuidTool />;
  if (toolId === "bmi-calculator") return <BmiTool />;
  if (toolId === "compound-interest") return <CompoundInterestTool />;
  if (WEB_EXTRA_TOOL_IDS.has(toolId)) return <WebExtraTool toolId={toolId} />;
  if (WEB_EXTRA_TOOL_IDS_BATCH2.has(toolId)) return <WebExtraToolBatch2 toolId={toolId} />;
  if (WEB_EXTRA_TOOL_IDS_BATCH3.has(toolId)) return <WebExtraToolBatch3 toolId={toolId} />;
  return <UnsupportedTool id={toolId} />;
}
