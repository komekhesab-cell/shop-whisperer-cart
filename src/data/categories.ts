export const CATEGORIES = [
  { value: "shoes", label: "Shoes" },
  { value: "cloth", label: "Cloth" },
  { value: "sport-cloth", label: "Sport Cloth" },
  { value: "sport-shoes", label: "Sport Shoes" },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]["value"];

export const SIZES_BY_CATEGORY: Record<string, string[]> = {
  shoes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
  cloth: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  "sport-cloth": ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  "sport-shoes": ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
};

export interface SizeStock {
  size: string;
  in_stock: boolean;
}
