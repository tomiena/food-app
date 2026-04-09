"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FOODS, type Food, type FoodCategory } from "@/lib/foods";
import { getMealHistory, toDateStr } from "@/lib/storage";
import { getIsPremium } from "@/lib/premium";
import FoodCard from "@/app/components/FoodCard";
import FreeLimitNotice from "@/app/components/FreeLimitNotice";

const FREE_MEAL_LIMIT = 3;

// ─── カテゴリ ──────────────────────────────────────────────
type CategoryId = FoodCategory | "all" | "meat_fish";
type Mode = "select" | "free";

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "all",           label: "すべて" },
  { id: "grain",         label: "主食・麺" },
  { id: "soup",          label: "汁物" },
  { id: "drink",         label: "飲み物" },
  { id: "prepared_food", label: "惣菜" },
  { id: "meat_fish",     label: "肉・魚" },
];

// ─── 月カレンダー ────────────────────────────────────────
const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];
const DOT: Record<string, string> = {
  ok: "bg-teal-400", caution: "bg-yellow-400", ng: "bg-red-400",
};

function formatDateJP(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("ja-JP", {
    month: "long", day: "numeric", weekday: "short",
  });
}

// ─── 自由入力パーサー ────────────────────────────────────
function parseFreeInput(text: string): { matched: Food[]; unknown: string[] } {
  const tokens = text
    .split(/[,、，\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const matched: Food[] = [];
  const unknown: string[] = [];

  for (const token of tokens) {
    const food =
      FOODS.find((f) => f.name === token) ??
      FOODS.find((f) => f.name.includes(token) || token.includes(f.name));

    if (food && !matched.find((m) => m.id === food.id)) {
      matched.push(food);
    } else if (!food && !unknown.includes(token)) {
      unknown.push(token);
    }
  }
  return { matched, unknown };
}

// ─── メインコンポーネント ────────────────────────────────
export default function MealPage() {
  const router = useRouter();
  const today  = toDateStr(new Date());

  // ── 状態 ──────────────────────────────────────────────
  const [mode, setMode]               = useState<Mode>("select");
  const [selectedDate, setSelectedDate] = useState(today);
  const [calYear,  setCalYear]  = useState(() => new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth() + 1);
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [freeText, setFreeText] = useState("");
  const [showFreeLimit, setShowFreeLimit] = useState(false);

  // URLパラムからモード初期化（?mode=free）
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("mode") === "free") setMode("free");
  }, []);

  // 過去記録（カレンダードット用）
  const history = getMealHistory();

  function dayStatus(dateStr: string) {
    const meals = history.filter((m) => m.date === dateStr);
    if (meals.length === 0) return "none";
    return meals.some((m) => m.overall === "ng") ? "ng"
      : meals.some((m) => m.overall === "caution") ? "caution"
      : "ok";
  }

  // ── カレンダー計算 ─────────────────────────────────────
  const daysInMonth  = new Date(calYear, calMonth, 0).getDate();
  const firstWeekday = new Date(calYear, calMonth - 1, 1).getDay();
  const prevMonth = () => {
    if (calMonth === 1) { setCalYear((y) => y - 1); setCalMonth(12); }
    else setCalMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 12) { setCalYear((y) => y + 1); setCalMonth(1); }
    else setCalMonth((m) => m + 1);
  };
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  // ── 食材選択モード ─────────────────────────────────────
  const displayFoods = activeCategory === "all"
    ? FOODS
    : activeCategory === "meat_fish"
      ? FOODS.filter((f) => f.category === "meat" || f.category === "fish")
      : FOODS.filter((f) => f.category === activeCategory);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSaveSelect = () => {
    if (selected.size === 0) return;
    const isPremium = getIsPremium();
    const dayCount  = history.filter((m) => m.date === selectedDate).length;
    if (!isPremium && dayCount >= FREE_MEAL_LIMIT) { setShowFreeLimit(true); return; }
    const params = Array.from(selected).map((id) => `${id}:100`).join(",");
    router.push(`/result?foods=${encodeURIComponent(params)}&date=${encodeURIComponent(selectedDate)}`);
  };

  // ── 自由入力モード ─────────────────────────────────────
  const parsedTokens = useMemo(() => parseFreeInput(freeText), [freeText]);

  const handleSaveFree = () => {
    const { matched, unknown } = parsedTokens;
    if (matched.length === 0 && unknown.length === 0) return;
    const isPremium = getIsPremium();
    const dayCount  = history.filter((m) => m.date === selectedDate).length;
    if (!isPremium && dayCount >= FREE_MEAL_LIMIT) { setShowFreeLimit(true); return; }

    const foodsParam = matched.map((f) => `${f.id}:100`).join(",");
    const url = new URL("/result", window.location.origin);
    url.searchParams.set("date", selectedDate);
    if (foodsParam)         url.searchParams.set("foods",   foodsParam);
    if (unknown.length > 0) url.searchParams.set("unknown", unknown.join(","));
    router.push(url.pathname + url.search);
  };

  // ── 制限画面 ───────────────────────────────────────────
  if (showFreeLimit) return <FreeLimitNotice />;

  // ─────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-gray-50 pb-32">

      {/* ── ヘッダー ────────────────────────────────────── */}
      <header className="bg-white border-b px-4 py-4 sticky top-0 z-20 shadow-sm">
        <div className="mx-auto max-w-md relative flex items-center justify-center">
          <Link
            href="/"
            className="absolute left-0 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <span className="text-base leading-none">←</span>
            <span>戻る</span>
          </Link>
          <h1 className="text-lg font-bold text-gray-800">食事を記録</h1>
        </div>
      </header>

      <div className="mx-auto max-w-md px-4 pt-4 space-y-4">

        {/* ── カレンダー ──────────────────────────────────── */}
        <section className="bg-white rounded-2xl border shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-bold text-gray-800 text-sm">記録する日を選ぶ</p>
            <span className="text-xs text-teal-600 font-semibold bg-teal-50 border border-teal-200 rounded-full px-3 py-1">
              {formatDateJP(selectedDate)}
            </span>
          </div>

          {/* 月ナビ */}
          <div className="flex items-center justify-between">
            <button type="button" onClick={prevMonth} aria-label="前の月"
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 text-xl">
              ‹
            </button>
            <p className="font-bold text-gray-700">{calYear}年{calMonth}月</p>
            <button type="button" onClick={nextMonth} aria-label="次の月"
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 text-xl">
              ›
            </button>
          </div>

          {/* 曜日 */}
          <div className="grid grid-cols-7 text-center">
            {WEEKDAYS.map((d, i) => (
              <span key={d} className={`text-xs font-semibold pb-1 ${
                i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-gray-400"
              }`}>{d}</span>
            ))}
          </div>

          {/* 日付グリッド */}
          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((day, idx) => {
              if (day === null) return <div key={`b-${idx}`} className="h-10" />;
              const dateStr  = `${calYear}-${String(calMonth).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
              const st       = dayStatus(dateStr);
              const isToday    = dateStr === today;
              const isSelected = dateStr === selectedDate;
              const colIdx  = idx % 7;
              return (
                <button key={dateStr} type="button" onClick={() => setSelectedDate(dateStr)}
                  className={`flex flex-col items-center justify-center h-10 rounded-xl transition-colors ${
                    isSelected ? "bg-teal-500" : isToday ? "bg-teal-50 ring-2 ring-teal-400" : "hover:bg-gray-50"
                  }`}>
                  <span className={`text-xs font-semibold ${
                    isSelected ? "text-white"
                      : colIdx === 0 ? "text-red-400"
                      : colIdx === 6 ? "text-blue-400"
                      : "text-gray-700"
                  }`}>{day}</span>
                  {st !== "none" && (
                    <div className={`w-1 h-1 rounded-full mt-0.5 ${isSelected ? "bg-white" : DOT[st]}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* 凡例 */}
          <div className="flex gap-4 justify-center text-xs text-gray-400 pt-1">
            {[{ color:"bg-teal-400",label:"良好"},{ color:"bg-yellow-400",label:"注意"},{ color:"bg-red-400",label:"多すぎ"}].map(({color,label}) => (
              <span key={label} className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${color}`}/>{label}
              </span>
            ))}
          </div>
        </section>

        {/* ── モード切り替えタブ ───────────────────────────── */}
        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
          <button
            type="button"
            onClick={() => setMode("select")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              mode === "select"
                ? "bg-white text-teal-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            食材を選ぶ
          </button>
          <button
            type="button"
            onClick={() => setMode("free")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              mode === "free"
                ? "bg-white text-teal-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            自由入力する
          </button>
        </div>

        {/* ── 自由入力フォーム ─────────────────────────────── */}
        {mode === "free" && (
          <section className="bg-white rounded-2xl border shadow-sm p-4 space-y-3">
            <p className="text-sm font-bold text-gray-700">食べたものを入力してください</p>
            <p className="text-xs text-gray-400">カンマ・読点で区切ると複数入力できます</p>
            <textarea
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              placeholder={"例：ラーメン、チャーハン、烏龍茶"}
              rows={3}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-teal-300"
            />

            {/* 認識できた食品 */}
            {parsedTokens.matched.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-teal-600">認識できた食品（栄養計算に反映）</p>
                <div className="flex flex-wrap gap-1.5">
                  {parsedTokens.matched.map((f) => (
                    <span key={f.id} className="text-xs bg-teal-50 border border-teal-200 text-teal-700 font-semibold px-3 py-1 rounded-full">
                      {f.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 未登録食品 */}
            {parsedTokens.unknown.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-gray-400">未登録の食品（結果画面に表示のみ）</p>
                <div className="flex flex-wrap gap-1.5">
                  {parsedTokens.unknown.map((u) => (
                    <span key={u} className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                      {u}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* select モードのセクションヘッダー */}
        {mode === "select" && (
          <div className="flex items-center gap-2 px-1">
            <span className="text-base font-bold text-gray-800">食材を選ぶ</span>
            {selected.size > 0 && (
              <span className="text-xs bg-teal-100 text-teal-700 font-bold rounded-full px-2 py-0.5">
                {selected.size}品選択中
              </span>
            )}
          </div>
        )}

      </div>

      {/* ── カテゴリタブ（select モードのみ sticky）──────────── */}
      {mode === "select" && (
        <div className="sticky top-[57px] z-10 bg-white border-b mt-2">
          <div className="mx-auto max-w-md overflow-x-auto flex gap-2 px-4 py-2">
            {CATEGORIES.map(({ id, label }) => (
              <button key={id} type="button" onClick={() => setActiveCategory(id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === id ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── 食品グリッド（select モードのみ）────────────────── */}
      {mode === "select" && (
        <div className="mx-auto max-w-md px-4 py-4">
          <div className="grid grid-cols-3 gap-3">
            {displayFoods.map((food) => (
              <FoodCard key={food.id} food={food}
                selected={selected.has(food.id)} onToggle={() => toggle(food.id)} />
            ))}
          </div>
        </div>
      )}

      {/* ── 下部固定ボタン ───────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-4 shadow-lg z-20">
        <div className="mx-auto max-w-md">

          {mode === "select" ? (
            selected.size > 0 ? (
              <button type="button" onClick={handleSaveSelect}
                className="w-full rounded-2xl bg-teal-600 py-4 text-white text-lg font-bold shadow-md hover:bg-teal-700 active:scale-[0.98] transition-all">
                {selected.size}品を選択 → 保存する
              </button>
            ) : (
              <p className="text-center text-gray-400 text-sm py-3">食品をタップして選んでください</p>
            )
          ) : (
            <button type="button" onClick={handleSaveFree}
              disabled={parsedTokens.matched.length === 0 && parsedTokens.unknown.length === 0}
              className="w-full rounded-2xl bg-teal-600 py-4 text-white text-lg font-bold shadow-md hover:bg-teal-700 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              保存する
            </button>
          )}

        </div>
      </div>

    </main>
  );
}
