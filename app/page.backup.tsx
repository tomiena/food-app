"use client";

import { useState } from "react";
import { judgeMeal, type MealItem } from "@/lib/judge";
import { FOODS } from "@/lib/foods";

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [input, setInput] = useState("");
  const [savedMeal, setSavedMeal] = useState("");
  const [result, setResult] = useState<ReturnType<typeof judgeMeal> | null>(null);

  const handleClick = () => {
    setShowForm(true);
  };

  // 入力 → 食品データに変換
  const parseInputToItems = (text: string): MealItem[] => {
    const items: MealItem[] = [];

    FOODS.forEach((food) => { // ←ここ修正ポイント（foods → FOODS）
      if (text.includes(food.name)) {
        items.push({
          food,
          amount: 100,
        });
      }
    });

    return items;
  };

  const handleSave = () => {
    setSavedMeal(input);

    const items = parseInputToItems(input);
    const judged = judgeMeal(items);

    setResult(judged);

    setInput("");
  };

  const getColor = (status: string) => {
    if (status === "ng") return "text-red-500";
    if (status === "caution") return "text-yellow-500";
    return "text-green-600";
  };

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-md space-y-6">
        <h1 className="text-2xl font-bold">食事チェック</h1>

        <button
          type="button"
          onClick={handleClick}
          className="rounded-xl bg-blue-600 px-4 py-3 text-white shadow hover:opacity-90"
        >
          ＋ 食事を記録する
        </button>

        {showForm && (
          <div className="rounded-2xl border p-4 shadow-sm space-y-3">
            <p className="font-semibold">自由入力フォーム</p>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="例：ごはん、味噌汁、豚肉"
              className="w-full rounded-lg border px-3 py-2"
            />

            <button
              type="button"
              onClick={handleSave}
              className="w-full rounded-lg bg-blue-500 py-2 text-white"
            >
              保存
            </button>
          </div>
        )}

        {savedMeal && (
          <div className="rounded-2xl bg-gray-100 p-4 space-y-3">
            <p className="font-semibold">保存した内容</p>
            <p>{savedMeal}</p>

            {result && (
              <div className="mt-3 space-y-2 text-sm">
                <p className={getColor(result.sodium.status)}>
                  塩分：{result.sodium.value}mg（{result.sodium.status}）
                </p>
                <p className={getColor(result.phosphorus.status)}>
                  リン：{result.phosphorus.value}mg（{result.phosphorus.status}）
                </p>
                <p className={getColor(result.potassium.status)}>
                  カリウム：{result.potassium.value}mg（{result.potassium.status}）
                </p>

                <p className="pt-2 font-semibold">
                  総合評価：{result.overall}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}