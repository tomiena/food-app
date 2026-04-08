"use client";

import Image from "next/image";
import { useState } from "react";
import { judgeMeal, calculateTotals, type MealItem } from "@/lib/judge";
import { generateAdvice } from "@/lib/advice";
import { FOODS } from "@/lib/foods";
import PremiumButton from "@/app/components/PremiumButton";

// ─── 名前ゆれ対応 ────────────────────────────────────────────
const aliasMap: Record<string, string> = {
  "ご飯":   "白米",
  "ごはん": "白米",
  "味噌汁": "みそ汁",
  "みそしる": "みそ汁",
  "唐揚げ": "から揚げ",
  "からあげ": "から揚げ",
  "お握り": "おにぎり",
};

function findFood(name: string) {
  const normalized = aliasMap[name] ?? name;
  return FOODS.find((f) => f.name === normalized);
}

// ─── 栄養バーの色 ─────────────────────────────────────────────
function barColor(status: string) {
  if (status === "ng")      return "bg-red-400";
  if (status === "caution") return "bg-yellow-400";
  return "bg-teal-400";
}

function labelColor(status: string) {
  if (status === "ng")      return "text-red-500";
  if (status === "caution") return "text-yellow-500";
  return "text-teal-600";
}

// ─── ステータス日本語 ────────────────────────────────────────
function statusLabel(status: string) {
  if (status === "ng")      return "多すぎ";
  if (status === "caution") return "やや多め";
  return "良好";
}

// ─── 判定カードの背景色 ───────────────────────────────────────
function overallStyle(overall: string) {
  if (overall === "ng")      return { bg: "bg-red-50 border-red-200",   text: "text-red-600",   label: "要注意" };
  if (overall === "caution") return { bg: "bg-yellow-50 border-yellow-200", text: "text-yellow-600", label: "注意" };
  return { bg: "bg-teal-50 border-teal-200", text: "text-teal-600", label: "良好" };
}

// ─── メインコンポーネント ─────────────────────────────────────
export default function HomePage() {
  const [showForm, setShowForm]               = useState(false);
  const [input, setInput]                     = useState("");
  const [savedMeal, setSavedMeal]             = useState("");
  const [savedItems, setSavedItems]           = useState<MealItem[]>([]);
  const [result, setResult]                   = useState<ReturnType<typeof judgeMeal> | null>(null);
  const [unknownFoods, setUnknownFoods]       = useState<string[]>([]);
  const [hasStartedEditing, setHasStartedEditing] = useState(false);

  // 入力テキスト → MealItem 変換
  const parseInputToItems = (text: string): { items: MealItem[]; unknown: string[] } => {
    const items: MealItem[]  = [];
    const unknown: string[]  = [];
    const tokens = text.split(/[\s、,]+/).map((t) => t.trim()).filter(Boolean);
    tokens.map((t) => aliasMap[t] ?? t).forEach((token) => {
      const food = findFood(token);
      if (food) items.push({ food, amount: 100 });
      else      unknown.push(token);
    });
    return { items, unknown };
  };

  const handleQuickAdd = (foodName: string) =>
    setInput((prev) => (prev ? `${prev}、${foodName}` : foodName));

  const handleSave = () => {
    const normalized = input
      .replace(/\s+/g, "、")
      .replace(/、{2,}/g, "、")
      .replace(/^、|、$/g, "");

    const { items, unknown } = parseInputToItems(normalized);
    setSavedMeal(normalized);
    setSavedItems(items);
    setUnknownFoods(unknown);
    setResult(judgeMeal(items));
    setInput("");
    setHasStartedEditing(false);
    setShowForm(false);
  };

  const quickFoods = ["ご飯", "味噌汁", "卵", "納豆", "ヨーグルト"];
  const totals     = savedItems.length > 0 ? calculateTotals(savedItems) : null;
  const advice     = result ? generateAdvice(result) : null;
  const overall    = result ? overallStyle(result.overall) : null;

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── ヘッダー ─────────────────────────────────────── */}
      <header className="bg-white border-b px-6 py-4 sticky top-0 z-10">
        <div className="mx-auto max-w-md flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">食事チェック</h1>
            <p className="text-xs text-gray-400 mt-0.5">透析患者さんの食事サポート</p>
          </div>
          <span className="text-2xl">🍱</span>
        </div>
      </header>

      <div className="mx-auto max-w-md px-4 py-6 space-y-4">

        {/* ── 今日の栄養状態カード ──────────────────────────── */}
        {result && totals && overall && (
          <section className={`rounded-2xl border p-4 space-y-3 ${overall.bg}`}>
            <div className="flex items-center justify-between">
              <p className="font-bold text-gray-700">今日の栄養状態</p>
              <span className={`text-sm font-semibold px-2 py-0.5 rounded-full border ${overall.text} ${overall.bg}`}>
                {overall.label}
              </span>
            </div>

            {/* 水分 */}
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>水分</span>
                <span className="font-medium text-gray-700">{totals.water} ml</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-300 rounded-full transition-all"
                  style={{ width: `${Math.min((totals.water / 1500) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* ナトリウム */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">ナトリウム（塩分）</span>
                <span className={`font-semibold ${labelColor(result.sodium.status)}`}>
                  {result.sodium.value} mg ・ {statusLabel(result.sodium.status)}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${barColor(result.sodium.status)}`}
                  style={{ width: `${Math.min((result.sodium.value / 1050) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* カリウム */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">カリウム</span>
                <span className={`font-semibold ${labelColor(result.potassium.status)}`}>
                  {result.potassium.value} mg ・ {statusLabel(result.potassium.status)}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${barColor(result.potassium.status)}`}
                  style={{ width: `${Math.min((result.potassium.value / 825) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* リン */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">リン</span>
                <span className={`font-semibold ${labelColor(result.phosphorus.status)}`}>
                  {result.phosphorus.value} mg ・ {statusLabel(result.phosphorus.status)}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${barColor(result.phosphorus.status)}`}
                  style={{ width: `${Math.min((result.phosphorus.value / 330) * 100, 100)}%` }}
                />
              </div>
            </div>
          </section>
        )}

        {/* ── 今日のひとこと ───────────────────────────────── */}
        {advice && (
          <section className="rounded-2xl bg-white border px-4 py-3 flex gap-3 items-start shadow-sm">
            <span className="text-xl mt-0.5">💬</span>
            <p className="text-sm text-gray-600 leading-relaxed">{advice}</p>
          </section>
        )}

        {/* ── 記録ボタン ───────────────────────────────────── */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex-1 rounded-xl bg-teal-600 px-4 py-3 text-white font-semibold shadow hover:bg-teal-700 transition-colors text-center"
          >
            ＋ 食事を記録する
          </button>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-600 shadow-sm hover:opacity-80 transition-opacity text-sm"
          >
            自由入力で追加
          </button>
        </div>

        {/* ── 入力フォーム ─────────────────────────────────── */}
        {showForm && (
          <section className="rounded-2xl bg-white border p-4 shadow-sm space-y-3">
            <p className="font-semibold text-gray-700">食事を入力</p>

            <input
              type="text"
              value={input}
              onChange={(e) => {
                let value = e.target.value;
                value = value.replace(/\s+/g, "、");
                value = value.replace(/、{2,}/g, "、");
                setInput(value);
              }}
              onFocus={() => {
                if (!hasStartedEditing) {
                  setInput("");
                  setSavedMeal("");
                  setSavedItems([]);
                  setResult(null);
                  setUnknownFoods([]);
                  setHasStartedEditing(true);
                }
              }}
              placeholder="例：ごはん、味噌汁、豚肉"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
            />

            {/* クイックボタン */}
            <div className="flex flex-wrap gap-2">
              {quickFoods.map((foodName) => {
                const food = findFood(foodName);
                return (
                  <button
                    key={foodName}
                    type="button"
                    onClick={() => handleQuickAdd(foodName)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    {food?.image && (
                      <Image
                        src={food.image}
                        alt={food.name}
                        width={20}
                        height={20}
                        className="rounded-full object-cover w-5 h-5"
                      />
                    )}
                    {foodName}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 rounded-lg bg-teal-600 py-2 text-white font-semibold hover:bg-teal-700 transition-colors"
              >
                保存する
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setInput(""); }}
                className="rounded-lg border border-gray-200 px-4 py-2 text-gray-500 text-sm hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </section>
        )}

        {/* ── 食事記録カード ───────────────────────────────── */}
        {savedMeal && (
          <section className="rounded-2xl bg-white border p-4 shadow-sm space-y-3">
            <p className="font-semibold text-gray-700">保存した食事</p>

            {/* 食品チップ */}
            <div className="flex flex-wrap gap-2">
              {savedMeal.split(/[\s,、]+/).filter(Boolean).map((item, index) => {
                const isUnknown = unknownFoods.includes(item);
                const food      = findFood(item);
                return (
                  <span
                    key={index}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                      isUnknown
                        ? "bg-red-50 text-red-500 border border-red-200"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {food?.image && (
                      <Image
                        src={food.image}
                        alt={food.name}
                        width={20}
                        height={20}
                        className="rounded-full object-cover w-5 h-5"
                      />
                    )}
                    {item}
                  </span>
                );
              })}
            </div>

            {/* 未登録食品 */}
            {unknownFoods.length > 0 && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-3 py-2">
                <p className="text-xs font-bold text-red-500">未登録の食品</p>
                <p className="text-xs text-red-400 mt-1">
                  {unknownFoods.join("、")} は現在データベースに未登録です
                </p>
              </div>
            )}
          </section>
        )}

        {/* ── プレミアムボタン ─────────────────────────────── */}
        <section className="rounded-2xl bg-gradient-to-r from-teal-50 to-white border border-teal-100 p-4 text-center space-y-2">
          <p className="text-xs text-gray-400">より詳しい管理でさらに安心</p>
          <PremiumButton />
        </section>

      </div>
    </main>
  );
}
