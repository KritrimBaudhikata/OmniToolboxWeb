export type CaseType = "upper" | "lower" | "title" | "camel";

export function toTitleCase(text: string): string {
  return text.toLowerCase().replace(/(?:^|\s|[-"'([{])+\S/g, (m) => m.toUpperCase());
}

export function toCamelCase(text: string): string {
  const words = text.trim().split(/[\s\-_]+/).filter(Boolean);
  return words.map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase())).join("");
}

export function applyCase(text: string, mode: CaseType): string {
  if (mode === "upper") return text.toUpperCase();
  if (mode === "lower") return text.toLowerCase();
  if (mode === "title") return toTitleCase(text);
  return toCamelCase(text);
}
