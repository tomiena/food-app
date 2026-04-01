import type { Food } from "./foods";

export type MealItem = {
  food: Food;
  amount: number;
};

export type NutrientResult = {
  value: number;
  status: string;
};

export type JudgeResult = {
  sodium: NutrientResult;
  potassium: NutrientResult;
  phosphorus: NutrientResult;
};

export function judgeMeal(items: MealItem[]): JudgeResult {
  return {
    sodium: { value: 0, status: "ok" },
    potassium: { value: 0, status: "ok" },
    phosphorus: { value: 0, status: "ok" },
  };
}