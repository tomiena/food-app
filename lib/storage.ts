export function toDateStr(date: Date) {
  return date.toISOString().slice(0, 10);
}
export function parseDateLocal(dateStr: string) {
  return new Date(dateStr);
}

export function getMealHistory() { return []; }
export function saveMealHistory(meal: any) {}
export function deleteMealById(id: string) {}

export function getDailyStatsFromHistory(date: string, history: any[]) {
  return {};
}
export function getRecentAverageFromHistory(days: number, history: any[]) {
  return {};
}
export function getMealsBeforeDateFromHistory(date: string, history: any[]) {
  return [];
}

export function getLabRecords() { return []; }
export function saveLabRecord() {}

export type Meal = any;
export type LabRecord = any;