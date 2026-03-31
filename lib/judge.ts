export type MealItem = any;
export type JudgeResult = any;

export function judgeMeal(items: any[]) {
  return {
    potassium: { value: 0 },
    phosphorus: { value: 0 },
  };
}