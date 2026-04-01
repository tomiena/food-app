export type Food = {
  id: string;
  name: string;
  water: number;
  sodium: number;
  potassium: number;
  phosphorus: number;
};

export const FOODS: Food[] = [];

export function getFoodRisk(food: Food) {
  return { sodium: false, potassium: false };
}