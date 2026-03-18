import type { SelectItem } from "@nuxt/ui";

export const accuracyItems = [
  {
    label: "Rendah",
    value: 5,
    icon: "i-lucide-signal-low",
  },
  {
    label: "Sederhana",
    value: 10,
    icon: "i-lucide-signal-medium",
  },
  {
    label: "Tinggi",
    value: 15,
    icon: "i-lucide-signal-high",
  },
  {
    label: "Paling Tinggi",
    value: 20,
    icon: "i-lucide-signal",
  },
] satisfies SelectItem[];

export const accuracyEnum = {
  Rendah: 5,
  Sederhana: 10,
  Tinggi: 15,
  "Paling Tinggi": 20,
} as const;

export type AccuracyValues = (typeof accuracyEnum)[keyof typeof accuracyEnum];
