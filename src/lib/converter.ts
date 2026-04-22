export type Category =
  | "length"
  | "weight"
  | "temperature"
  | "volume"
  | "speed"
  | "time"
  | "energy"
  | "area"
  | "storage";

export const CATEGORIES: Category[] = [
  "length",
  "weight",
  "temperature",
  "volume",
  "speed",
  "time",
  "energy",
  "area",
  "storage",
];

interface UnitDef {
  name: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

export const UNITS: Record<Category, Record<string, UnitDef>> = {
  length: {
    m: { name: "Metre (m)", toBase: (v) => v, fromBase: (v) => v },
    km: { name: "Kilometre (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    cm: { name: "Centimetre (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    mm: { name: "Millimetre (mm)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    mi: { name: "Mile (mi)", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
    yd: { name: "Yard (yd)", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    ft: { name: "Foot (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    in: { name: "Inch (in)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  },
  weight: {
    kg: { name: "Kilogram (kg)", toBase: (v) => v, fromBase: (v) => v },
    g: { name: "Gram (g)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    lb: { name: "Pound (lb)", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    oz: { name: "Ounce (oz)", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
  },
  temperature: {
    C: { name: "Celsius (°C)", toBase: (v) => v, fromBase: (v) => v },
    F: { name: "Fahrenheit (°F)", toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
    K: { name: "Kelvin (K)", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  },
  volume: {
    L: { name: "Litre (L)", toBase: (v) => v, fromBase: (v) => v },
    mL: { name: "Millilitre (mL)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    gal: { name: "US Gallon", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
  },
  speed: {
    "m/s": { name: "Metre/sec", toBase: (v) => v, fromBase: (v) => v },
    "km/h": { name: "Kilometre/hour", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
    mph: { name: "Mile/hour", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
  },
  time: {
    s: { name: "Second", toBase: (v) => v, fromBase: (v) => v },
    min: { name: "Minute", toBase: (v) => v * 60, fromBase: (v) => v / 60 },
    h: { name: "Hour", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
    d: { name: "Day", toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
  },
  energy: {
    J: { name: "Joule", toBase: (v) => v, fromBase: (v) => v },
    kJ: { name: "Kilojoule", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    kcal: { name: "Kilocalorie", toBase: (v) => v * 4184, fromBase: (v) => v / 4184 },
  },
  area: {
    "m²": { name: "Square metre", toBase: (v) => v, fromBase: (v) => v },
    "km²": { name: "Square kilometre", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
    "ft²": { name: "Square foot", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
  },
  storage: {
    B: { name: "Byte", toBase: (v) => v, fromBase: (v) => v },
    KB: { name: "Kilobyte", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    MB: { name: "Megabyte", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
    GB: { name: "Gigabyte", toBase: (v) => v * 1e9, fromBase: (v) => v / 1e9 },
  },
};

export function convert(category: Category, value: number, fromUnit: string, toUnit: string): number {
  const from = UNITS[category][fromUnit];
  const to = UNITS[category][toUnit];
  if (!from || !to) return value;
  return to.fromBase(from.toBase(value));
}
