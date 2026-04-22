export type ToolCategory =
  | "Security"
  | "Text"
  | "Converters"
  | "Generators"
  | "Developer"
  | "Daily"
  | "Media"
  | "Other";

export interface ToolItem {
  id: string;
  name: string;
  href: string;
  category: ToolCategory;
  keywords: string[];
  icon: string;
  accentColor: string;
  accentClass: string;
  description: string;
  tag?: "Popular" | "New" | "Fast";
}

const BASE_TOOLS: Omit<ToolItem, "icon" | "accentColor">[] = [
  { id: "password-gen", name: "Password Generator", href: "/tools/password-gen", category: "Security", keywords: ["password"] },
  { id: "passphrase-gen", name: "Passphrase Generator", href: "/tools/passphrase-gen", category: "Security", keywords: ["passphrase"] },
  { id: "pin-gen", name: "PIN Generator", href: "/tools/pin-gen", category: "Security", keywords: ["pin"] },
  { id: "hash-gen", name: "Hash Generator", href: "/tools/hash-gen", category: "Security", keywords: ["hash"] },
  { id: "uuid-gen", name: "UUID Generator", href: "/tools/uuid-gen", category: "Security", keywords: ["uuid"] },
  { id: "slugify", name: "Slugify", href: "/tools/slugify", category: "Text", keywords: ["slug"] },
  { id: "text-case", name: "Text Case Converter", href: "/tools/text-case", category: "Text", keywords: ["text", "case"] },
  { id: "word-counter", name: "Word / Letter Counter", href: "/tools/word-counter", category: "Text", keywords: ["word", "count"] },
  { id: "word-frequency", name: "Word Frequency", href: "/tools/word-frequency", category: "Text", keywords: ["frequency"] },
  { id: "text-redactor", name: "Text Redactor", href: "/tools/text-redactor", category: "Text", keywords: ["redact"] },
  { id: "markdown-to-text", name: "Markdown to Plain Text", href: "/tools/markdown-to-text", category: "Text", keywords: ["markdown"] },
  { id: "html-entities", name: "HTML Entities", href: "/tools/html-entities", category: "Text", keywords: ["html"] },
  { id: "nato-phonetic", name: "NATO Phonetic", href: "/tools/nato-phonetic", category: "Text", keywords: ["nato"] },
  { id: "unit-converter", name: "Unit Converter", href: "/tools/unit-converter", category: "Converters", keywords: ["unit", "converter"] },
  { id: "unit-price", name: "Unit Price", href: "/tools/unit-price", category: "Converters", keywords: ["price"] },
  { id: "unit-prefixes", name: "Unit Prefixes", href: "/tools/unit-prefixes", category: "Converters", keywords: ["prefix"] },
  { id: "fraction-converter", name: "Fraction Decimal", href: "/tools/fraction-converter", category: "Converters", keywords: ["fraction"] },
  { id: "coordinates-converter", name: "Coordinates", href: "/tools/coordinates-converter", category: "Converters", keywords: ["coordinates"] },
  { id: "duration-formatter", name: "Time Format Converter", href: "/tools/duration-formatter", category: "Converters", keywords: ["duration"] },
  { id: "date-formatter", name: "Date Formatter", href: "/tools/date-formatter", category: "Converters", keywords: ["date"] },
  { id: "timezone-converter", name: "Timezone Converter", href: "/tools/timezone-converter", category: "Converters", keywords: ["timezone"] },
  { id: "body-measurement", name: "Body Measurement", href: "/tools/body-measurement", category: "Converters", keywords: ["body"] },
  { id: "fuel-cost", name: "Fuel Cost", href: "/tools/fuel-cost", category: "Converters", keywords: ["fuel"] },
  { id: "random-number", name: "Random Number Generator", href: "/tools/random-number", category: "Generators", keywords: ["random"] },
  { id: "pairing-generator", name: "Pairing / Teams", href: "/tools/pairing-generator", category: "Generators", keywords: ["teams"] },
  { id: "barcode-generator", name: "Barcode Generator", href: "/tools/barcode-generator", category: "Generators", keywords: ["barcode"] },
  { id: "qr-gen", name: "QR Generator", href: "/tools/qr-gen", category: "Generators", keywords: ["qr"] },
  { id: "gradient-generator", name: "Gradient Generator", href: "/tools/gradient-generator", category: "Generators", keywords: ["gradient"] },
  { id: "seating-plan", name: "Random Seating", href: "/tools/seating-plan", category: "Generators", keywords: ["seating"] },
  { id: "json-formatter", name: "JSON Formatter", href: "/tools/json-formatter", category: "Developer", keywords: ["json"] },
  { id: "color-picker", name: "Color Picker", href: "/tools/color-picker", category: "Developer", keywords: ["color"] },
  { id: "palette-generator", name: "Palette Generator", href: "/tools/palette-generator", category: "Developer", keywords: ["palette"] },
  { id: "mac-formatter", name: "MAC Address", href: "/tools/mac-formatter", category: "Developer", keywords: ["mac"] },
  { id: "url-parser", name: "URL Parser", href: "/tools/url-parser", category: "Developer", keywords: ["url"] },
  { id: "email-validator", name: "Email/Phone Validator", href: "/tools/email-validator", category: "Developer", keywords: ["email"] },
  { id: "keyboard-shortcuts", name: "Keyboard Shortcuts", href: "/tools/keyboard-shortcuts", category: "Developer", keywords: ["keyboard"] },
  { id: "periodic-table", name: "Periodic Table Mini", href: "/tools/periodic-table", category: "Developer", keywords: ["periodic"] },
  { id: "days-counter", name: "Days Counter", href: "/tools/days-counter", category: "Daily", keywords: ["days"] },
  { id: "age-calculator", name: "Calculate Age", href: "/tools/age-calculator", category: "Daily", keywords: ["age"] },
  { id: "time-counter", name: "Add/Subtract Time", href: "/tools/time-counter", category: "Daily", keywords: ["time"] },
  { id: "cooking-scale", name: "Cooking Scale", href: "/tools/cooking-scale", category: "Daily", keywords: ["recipe"] },
  { id: "water-tracker", name: "Water Intake", href: "/tools/water-tracker", category: "Daily", keywords: ["water"] },
  { id: "bmi-calculator", name: "BMI Calculator", href: "/tools/bmi-calculator", category: "Daily", keywords: ["bmi"] },
  { id: "compound-interest", name: "Compound Interest", href: "/tools/compound-interest", category: "Daily", keywords: ["interest"] },
  { id: "file-converter", name: "File Converter", href: "/tools/file-converter", category: "Media", keywords: ["file"] },
  { id: "markdown-previewer", name: "Markdown Previewer", href: "/tools/markdown-previewer", category: "Media", keywords: ["preview"] },
  { id: "image-converter", name: "Image Format Converter", href: "/tools/image-converter", category: "Media", keywords: ["image"] },
  { id: "aspect-ratio", name: "Aspect Ratio", href: "/tools/aspect-ratio", category: "Media", keywords: ["ratio"] },
  { id: "dpi-helper", name: "Screen PPI", href: "/tools/dpi-helper", category: "Media", keywords: ["dpi"] },
  { id: "morse-code", name: "Morse Code", href: "/tools/morse-code", category: "Other", keywords: ["morse"] },
  { id: "roman-numeral", name: "Roman Numeral", href: "/tools/roman-numeral", category: "Other", keywords: ["roman"] },
  { id: "country-codes", name: "Country Calling Codes", href: "/tools/country-codes", category: "Other", keywords: ["country"] },
  { id: "my-ip", name: "My IP", href: "/tools/my-ip", category: "Other", keywords: ["ip"] },
];

const TOOL_VISUALS: Record<string, { icon: string; accentColor: string }> = {
  "password-gen": { icon: "lock", accentColor: "#4CAF50" },
  "qr-gen": { icon: "qrcode", accentColor: "#2196F3" },
  "unit-converter": { icon: "swap-horizontal", accentColor: "#FF9800" },
  "json-formatter": { icon: "code-json", accentColor: "#9C27B0" },
  "color-picker": { icon: "palette", accentColor: "#E91E63" },
  "text-case": { icon: "format-letter-case", accentColor: "#00BCD4" },
  "random-number": { icon: "dice-multiple", accentColor: "#673AB7" },
  "word-counter": { icon: "format-list-numbered", accentColor: "#009688" },
  "file-converter": { icon: "file-document-outline", accentColor: "#795548" },
  "markdown-previewer": { icon: "language-markdown", accentColor: "#3F51B5" },
  "timezone-converter": { icon: "clock-outline", accentColor: "#FF5722" },
  "days-counter": { icon: "calendar-clock", accentColor: "#4DB6AC" },
  "uuid-gen": { icon: "identifier", accentColor: "#6B7280" },
  "hash-gen": { icon: "fingerprint", accentColor: "#059669" },
  slugify: { icon: "format-title", accentColor: "#7C3AED" },
  "date-formatter": { icon: "calendar-range", accentColor: "#0EA5E9" },
  "bmi-calculator": { icon: "human-handsdown", accentColor: "#10B981" },
  "roman-numeral": { icon: "numeric", accentColor: "#B45309" },
  "palette-generator": { icon: "palette-outline", accentColor: "#EC4899" },
  "barcode-generator": { icon: "barcode", accentColor: "#6366F1" },
  "time-counter": { icon: "clock-plus-outline", accentColor: "#0EA5E9" },
  "age-calculator": { icon: "cake-variant", accentColor: "#F43F5E" },
  "unit-price": { icon: "currency-usd", accentColor: "#22C55E" },
  "cooking-scale": { icon: "chef-hat", accentColor: "#E11D48" },
  "water-tracker": { icon: "cup-water", accentColor: "#0EA5E9" },
  "morse-code": { icon: "flash", accentColor: "#F59E0B" },
  "aspect-ratio": { icon: "aspect-ratio", accentColor: "#8B5CF6" },
  "dpi-helper": { icon: "monitor", accentColor: "#64748B" },
  "fraction-converter": { icon: "division", accentColor: "#A855F7" },
  "text-redactor": { icon: "text-box-remove-outline", accentColor: "#EF4444" },
  "coordinates-converter": { icon: "map-marker-radius", accentColor: "#10B981" },
  "duration-formatter": { icon: "timer-outline", accentColor: "#6366F1" },
  "pairing-generator": { icon: "account-group", accentColor: "#EC4899" },
  "country-codes": { icon: "phone", accentColor: "#3B82F6" },
  "nato-phonetic": { icon: "alphabetical", accentColor: "#059669" },
  "unit-prefixes": { icon: "sigma", accentColor: "#64748B" },
  "passphrase-gen": { icon: "form-textbox-password", accentColor: "#4CAF50" },
  "pin-gen": { icon: "numeric", accentColor: "#8B5CF6" },
  "email-validator": { icon: "email-check-outline", accentColor: "#F59E0B" },
  "periodic-table": { icon: "periodic-table", accentColor: "#14B8A6" },
  "keyboard-shortcuts": { icon: "keyboard", accentColor: "#64748B" },
  "compound-interest": { icon: "chart-line", accentColor: "#22C55E" },
  "fuel-cost": { icon: "fuel", accentColor: "#E11D48" },
  "body-measurement": { icon: "ruler", accentColor: "#F97316" },
  "gradient-generator": { icon: "format-paint", accentColor: "#EC4899" },
  "mac-formatter": { icon: "lan", accentColor: "#6B7280" },
  "url-parser": { icon: "link", accentColor: "#3B82F6" },
  "seating-plan": { icon: "seat", accentColor: "#8B5CF6" },
  "my-ip": { icon: "map-marker", accentColor: "#3B82F6" },
  "image-converter": { icon: "image-multiple", accentColor: "#8B5CF6" },
  "html-entities": { icon: "code-tags", accentColor: "#F59E0B" },
  "markdown-to-text": { icon: "format-text", accentColor: "#64748B" },
  "word-frequency": { icon: "chart-bar", accentColor: "#14B8A6" },
};

export const TOOLS: ToolItem[] = BASE_TOOLS.map((tool) => {
  const visual = TOOL_VISUALS[tool.id] ?? { icon: "toolbox-outline", accentColor: "#64748B" };
  const description = `Use ${tool.name.toLowerCase()} instantly with no login required.`;
  const accentClass =
    tool.category === "Security"
      ? "bg-emerald-500"
      : tool.category === "Text"
      ? "bg-cyan-500"
      : tool.category === "Converters"
      ? "bg-orange-500"
      : tool.category === "Generators"
      ? "bg-violet-500"
      : tool.category === "Developer"
      ? "bg-indigo-500"
      : tool.category === "Daily"
      ? "bg-rose-500"
      : tool.category === "Media"
      ? "bg-sky-500"
      : "bg-slate-500";
  return { ...tool, ...visual, accentClass, description };
});

const POPULAR_IDS = new Set([
  "qr-gen",
  "password-gen",
  "passphrase-gen",
  "word-counter",
  "text-case",
  "json-formatter",
  "url-parser",
  "unit-converter",
]);

export const TOOLS_ENRICHED: ToolItem[] = TOOLS.map((tool) => ({
  ...tool,
  tag: POPULAR_IDS.has(tool.id) ? "Popular" : undefined,
}));

export const TOOL_IDS = TOOLS_ENRICHED.map((t) => t.id);

export function getToolById(id: string) {
  return TOOLS_ENRICHED.find((t) => t.id === id);
}
