"use client";

import { useState, useEffect } from "react";
import {
  getMealHistory,
  getDailyVitals,
  saveDailyVitals,
  getDryWeight,
  saveDryWeight,
  getDialysisInterval,
  saveDialysisInterval,
  toDateStr,
  type Meal,
  type DailyVitals,
} from "@/lib/storage";
import { getIsPremium } from "@/lib/premium";
import PremiumButton from "@/app/components/PremiumButton";
import MealRecorder from "@/app/components/MealRecorder";

// ─── ステータス色 ─────────────────────────────────────────
const BAR_COLOR: Record<string, string> = {
  ok:      "bg-teal-400",
  caution: "bg-yellow-400",
  ng:      "bg-red-400",
};
const VALUE_COLOR: Record<string, string> = {
  ok:      "text-teal-600",
  caution: "text-yellow-500",
  ng:      "text-red-500",
};

function getStatus(value: number, okMax: number, ngMin: number) {
  if (value <= okMax) return "ok";
  if (value < ngMin)  return "caution";
  return "ng";
}

function todayLabel() {
  return new Date().toLocaleDateString("ja-JP", {
    year: "numeric", month: "long", day: "numeric", weekday: "short",
  });
}

// ─── 体重増加アドバイス ───────────────────────────────────
function getWeightAdvice(
  gain: number,
  rate: number,
  interval: "1" | "2",
  weight: number,
  bowelStatus: "normal" | "constipated" | "none" = "normal",
  edema = false,
  dyspnea = false,
): { status: "ok" | "caution" | "ng"; message: string } {
  const threshold = interval === "1" ? 3 : 5;
  void weight; // 将来の拡張用に保持

  if (gain < -1) {
    return { status: "caution", message: "食事量が落ちていないか確認しましょう。" };
  }

  let status: "ok" | "caution" | "ng" = "ok";
  let message = "";

  if (rate <= threshold) {
    status = "ok";
    message = "ドライウェイトを基準にみると、体重増加は目安の範囲内です。このまま飲水量・塩分・食事量のバランスを意識して続けましょう。";
  } else {
    status = "caution";
    message = "ドライウェイトを基準にみると、体重増加がやや多めです。飲水量や塩分だけでなく、食事量や排便状況の影響で増えることがあります。";
  }

  if (bowelStatus !== "normal") {
    message += " 便秘が続いている場合は、その影響で体重が増えることがあります。排便状況も確認しましょう。";
  }

  if (edema || dyspnea) {
    status = "ng";
    message += " むくみや息苦しさがある場合は注意が必要です。次回透析を待たず、医療機関へ相談してください。";
  }

  return { status, message };
}

// ─── 今日のひとこと（ステータスカード内に統合）───────────
function getDailyTip(
  meals: Meal[],
  total: { sodium: number; potassium: number; phosphorus: number },
): string {
  if (meals.length === 0) return "";

  if (total.sodium     > 1050) return `塩分が${total.sodium}mgを超えています。次の食事で汁物・醤油を控えましょう。`;
  if (total.potassium  > 825)  return `カリウムが${total.potassium}mgを超えています。野菜は茹でこぼしを心がけて。`;
  if (total.phosphorus > 330)  return `リンが${total.phosphorus}mgを超えています。乳製品や加工食品を控えると改善できます。`;
  if (total.sodium     > 700)  return `塩分がやや多め（${total.sodium}mg）です。汁物を半量にするだけで大きく変わります。`;
  if (total.potassium  > 550)  return `カリウムがやや高め（${total.potassium}mg）です。茹で野菜を意識してみてください。`;
  if (total.phosphorus > 220)  return `リンがやや多め（${total.phosphorus}mg）です。加工食品を少し控えてみましょう。`;
  return "今日の食事はバランスが取れています。";
}

// ─── ヘッダー高さ（MealRecorder の sticky オフセット）────
// py-4(32px) + text-xl 行高(28px) + text-xs 行高(16px) ≈ 76px
const HOME_HEADER_HEIGHT = 76;

const ADVICE_BG: Record<string, string> = {
  ok:      "bg-teal-50 text-teal-700",
  caution: "bg-yellow-50 text-yellow-700",
  ng:      "bg-red-50 text-red-700",
};

export default function HomePage() {
  const today = toDateStr(new Date());

  const [history, setHistory]       = useState<Meal[]>([]);
  const [vitals,   setVitals]       = useState<DailyVitals>({ date: today });
  const [editVitals, setEditVitals] = useState<DailyVitals>({ date: today });
  const [isPremium, setIsPremium]   = useState(false);

  const [dryWeight,         setDryWeight]         = useState<number | null>(null);
  const [dialysisInterval,  setDialysisInterval]  = useState<"1" | "2">("1");
  const [editDryWeight,     setEditDryWeight]     = useState("");
  const [editDrinkWater,    setEditDrinkWater]    = useState("");
  const [editInterval,      setEditInterval]      = useState<"1" | "2">("1");
  const [bowelStatus, setBowelStatus] = useState<"normal" | "constipated" | "none">("normal");
  const [edema,       setEdema]       = useState(false);
  const [dyspnea,     setDyspnea]     = useState(false);

  // 展開中のサブフォーム: null | "vitals" | "weight"
  const [openForm, setOpenForm] = useState<null | "vitals" | "weight">(null);

  const toggleForm = (form: "vitals" | "weight") =>
    setOpenForm((prev) => (prev === form ? null : form));

  useEffect(() => {
    setHistory(getMealHistory());
    const v = getDailyVitals(today);
    setVitals(v);
    setEditVitals(v);
    setIsPremium(getIsPremium());
    const dw = getDryWeight();
    setDryWeight(dw);
    setEditDryWeight(dw != null ? String(dw) : "");
    const iv = getDialysisInterval();
    setDialysisInterval(iv);
    setEditInterval(iv);
    setEditDrinkWater(v.drinkWater != null ? String(v.drinkWater) : "");
  }, [today]);

  const todayMeals = history.filter((m) => m.date === today);

  const todayTotal = todayMeals.reduce(
    (acc, m) => ({
      water:      acc.water      + (m.total.water      ?? 0),
      sodium:     acc.sodium     + (m.total.sodium     ?? 0),
      potassium:  acc.potassium  + (m.total.potassium  ?? 0),
      phosphorus: acc.phosphorus + (m.total.phosphorus ?? 0),
    }),
    { water: 0, sodium: 0, potassium: 0, phosphorus: 0 }
  );

  const handleSaveVitals = () => {
    const updated = { ...editVitals, date: today };
    saveDailyVitals(updated);
    setVitals(updated);
    setOpenForm(null);
  };

  const handleSaveWeight = () => {
    const dw = parseFloat(editDryWeight);
    if (!isNaN(dw) && dw > 0) { saveDryWeight(dw); setDryWeight(dw); }
    saveDialysisInterval(editInterval); setDialysisInterval(editInterval);
    const dWater = parseInt(editDrinkWater) || undefined;
    const updated = { ...vitals, date: today, drinkWater: dWater };
    saveDailyVitals(updated); setVitals(updated);
    setOpenForm(null);
  };

  // 体重増加の計算
  const todayWeight = vitals.weight;
  const hasWeightData = dryWeight != null && todayWeight != null;
  const weightGain = hasWeightData ? Math.round((todayWeight! - dryWeight!) * 10) / 10 : null;
  const weightRate = hasWeightData
    ? Math.round(((todayWeight! - dryWeight!) / dryWeight!) * 1000) / 10
    : null;
  const weightAdvice =
    hasWeightData && weightGain !== null && weightRate !== null
      ? getWeightAdvice(weightGain, weightRate, dialysisInterval, todayWeight!, bowelStatus, edema, dyspnea)
      : null;

  const tip = getDailyTip(todayMeals, todayTotal);

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── ヘッダー ─────────────────────────────────────── */}
      <header className="bg-white border-b px-5 py-4 sticky top-0 z-20 shadow-sm">
        <div className="mx-auto max-w-md">
          <h1 className="text-xl font-bold text-gray-800">食事チェック</h1>
          <p className="text-xs text-gray-400">{todayLabel()}</p>
        </div>
      </header>

      {/* ── ホームエリア ─────────────────────────────────── */}
      <div className="mx-auto max-w-md px-4 pt-4 pb-3 space-y-3">

        {/* ① 今日の状態 ＋ ひとこと（統合カード） */}
        <section className="bg-white rounded-2xl border shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-bold text-gray-800">今日の状態</p>
            {todayMeals.length > 0 && (
              <span className="text-xs text-gray-400 bg-gray-50 border rounded-full px-2 py-0.5">
                {todayMeals.length}食記録済み
              </span>
            )}
          </div>

          {todayMeals.length > 0 ? (
            <>
              <div className="space-y-2.5">
                {[
                  { label: "水分",       value: todayTotal.water,      unit: "ml", ok: 1500, ng: 2000 },
                  { label: "ナトリウム", value: todayTotal.sodium,     unit: "mg", ok: 700,  ng: 1050 },
                  { label: "カリウム",   value: todayTotal.potassium,  unit: "mg", ok: 550,  ng: 825  },
                  { label: "リン",       value: todayTotal.phosphorus, unit: "mg", ok: 220,  ng: 330  },
                ].map(({ label, value, unit, ok, ng }) => {
                  const st = getStatus(value, ok, ng);
                  return (
                    <div key={label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 font-medium">{label}</span>
                        <span className={`font-bold ${VALUE_COLOR[st]}`}>
                          {value.toLocaleString()} {unit}
                        </span>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${BAR_COLOR[st]}`}
                          style={{ width: `${Math.min((value / ng) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              {tip && (
                <p className="text-xs text-gray-500 border-t pt-2.5 leading-relaxed">{tip}</p>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-400 text-center py-2">まだ記録がありません</p>
          )}
        </section>

        {/* ② 今日の食事記録（主役） */}
        {todayMeals.length > 0 && (
          <section className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="px-4 pt-4 pb-2">
              <p className="font-bold text-gray-800">今日の食事記録</p>
            </div>
            <div className="px-3 pb-3 space-y-2">
              {todayMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="flex items-start justify-between rounded-xl bg-gray-50 px-3 py-3 gap-2"
                >
                  <p className="text-sm text-gray-700 leading-snug flex-1 min-w-0">
                    {meal.items.map((i) => i.name).join("・")}
                  </p>
                  <div className="flex-shrink-0 flex flex-col items-end gap-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      meal.overall === "ng"        ? "bg-red-100 text-red-600"
                      : meal.overall === "caution" ? "bg-yellow-100 text-yellow-600"
                      : "bg-teal-100 text-teal-600"
                    }`}>
                      {meal.overall === "ng" ? "要注意" : meal.overall === "caution" ? "注意" : "良好"}
                    </span>
                    {meal.advice && (
                      <p className="text-xs text-gray-400 text-right max-w-[140px] leading-tight">
                        {meal.advice}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ③ バイタル・体重管理（統合カード） */}
        <section className="bg-white rounded-2xl border shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-bold text-gray-800">バイタル・体重</p>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => toggleForm("vitals")}
                className={`text-xs font-semibold rounded-full px-3 py-1 border transition-colors ${
                  openForm === "vitals"
                    ? "bg-teal-600 text-white border-teal-600"
                    : "text-teal-600 border-teal-200 hover:bg-teal-50"
                }`}
              >
                バイタル
              </button>
              <button
                type="button"
                onClick={() => toggleForm("weight")}
                className={`text-xs font-semibold rounded-full px-3 py-1 border transition-colors ${
                  openForm === "weight"
                    ? "bg-teal-600 text-white border-teal-600"
                    : "text-teal-600 border-teal-200 hover:bg-teal-50"
                }`}
              >
                体重
              </button>
            </div>
          </div>

          {/* 閉じているとき：サマリー表示 */}
          {openForm === null && (
            <div className="space-y-2">
              {/* バイタルサマリー */}
              {(vitals.weight || vitals.bpSystolic || vitals.pulse) ? (
                <div className="grid grid-cols-3 gap-2 text-center">
                  {vitals.weight && (
                    <div className="bg-gray-50 rounded-xl py-2">
                      <p className="text-base font-bold text-teal-700">{vitals.weight}</p>
                      <p className="text-xs text-gray-400">体重 kg</p>
                    </div>
                  )}
                  {vitals.bpSystolic && vitals.bpDiastolic && (
                    <div className="bg-gray-50 rounded-xl py-2">
                      <p className="text-sm font-bold text-teal-700">
                        {vitals.bpSystolic}/{vitals.bpDiastolic}
                      </p>
                      <p className="text-xs text-gray-400">血圧</p>
                    </div>
                  )}
                  {vitals.pulse && (
                    <div className="bg-gray-50 rounded-xl py-2">
                      <p className="text-base font-bold text-teal-700">{vitals.pulse}</p>
                      <p className="text-xs text-gray-400">脈拍 bpm</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-gray-400">未入力 — 上のボタンから入力できます</p>
              )}

              {/* 体重管理サマリー */}
              {hasWeightData && weightGain !== null && weightRate !== null && (
                <div className="space-y-1.5">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gray-50 rounded-xl py-2">
                      <p className="text-base font-bold text-teal-700">{dryWeight}</p>
                      <p className="text-xs text-gray-400">DW (kg)</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl py-2">
                      <p className="text-base font-bold text-teal-700">{todayWeight}</p>
                      <p className="text-xs text-gray-400">今日 (kg)</p>
                    </div>
                    <div className={`rounded-xl py-2 ${weightAdvice ? ADVICE_BG[weightAdvice.status] : "bg-gray-50"}`}>
                      <p className="text-base font-bold">{weightGain >= 0 ? "+" : ""}{weightGain}</p>
                      <p className="text-xs opacity-70">{weightRate >= 0 ? "+" : ""}{weightRate}%</p>
                    </div>
                  </div>
                  {vitals.drinkWater != null && (
                    <p className="text-xs text-gray-500 text-center">飲水：{vitals.drinkWater} ml</p>
                  )}
                  {weightAdvice && (
                    <p className={`text-xs rounded-xl px-3 py-2 leading-relaxed ${ADVICE_BG[weightAdvice.status]}`}>
                      {weightAdvice.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* バイタル入力フォーム */}
          {openForm === "vitals" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1">
                  <span className="text-xs font-medium text-gray-500">体重 (kg)</span>
                  <input type="number" inputMode="decimal" step="0.1"
                    value={editVitals.weight ?? ""}
                    onChange={(e) => setEditVitals((v) => ({ ...v, weight: parseFloat(e.target.value) || undefined }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-300"
                    placeholder="55.0" />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-medium text-gray-500">脈拍 (bpm)</span>
                  <input type="number" inputMode="numeric"
                    value={editVitals.pulse ?? ""}
                    onChange={(e) => setEditVitals((v) => ({ ...v, pulse: parseInt(e.target.value) || undefined }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-300"
                    placeholder="72" />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-medium text-gray-500">収縮期血圧</span>
                  <input type="number" inputMode="numeric"
                    value={editVitals.bpSystolic ?? ""}
                    onChange={(e) => setEditVitals((v) => ({ ...v, bpSystolic: parseInt(e.target.value) || undefined }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-300"
                    placeholder="120" />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-medium text-gray-500">拡張期血圧</span>
                  <input type="number" inputMode="numeric"
                    value={editVitals.bpDiastolic ?? ""}
                    onChange={(e) => setEditVitals((v) => ({ ...v, bpDiastolic: parseInt(e.target.value) || undefined }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-300"
                    placeholder="80" />
                </label>
              </div>
              <button type="button" onClick={handleSaveVitals}
                className="w-full rounded-xl bg-teal-600 py-3 text-white text-base font-bold hover:bg-teal-700 transition-colors">
                登録する
              </button>
            </div>
          )}

          {/* 体重・飲水フォーム */}
          {openForm === "weight" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1">
                  <span className="text-xs font-medium text-gray-500">ドライウェイト (kg)</span>
                  <input type="number" inputMode="decimal" step="0.1"
                    value={editDryWeight}
                    onChange={(e) => setEditDryWeight(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-300"
                    placeholder="55.0" />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-medium text-gray-500">今日の体重 (kg)</span>
                  <input type="number" inputMode="decimal" step="0.1"
                    value={editVitals.weight ?? ""}
                    onChange={(e) => setEditVitals((v) => ({ ...v, weight: parseFloat(e.target.value) || undefined }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-300"
                    placeholder="57.0" />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-medium text-gray-500">飲水量 (ml)</span>
                  <input type="number" inputMode="numeric"
                    value={editDrinkWater}
                    onChange={(e) => setEditDrinkWater(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-300"
                    placeholder="800" />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-medium text-gray-500">透析間隔</span>
                  <select value={editInterval}
                    onChange={(e) => setEditInterval(e.target.value as "1" | "2")}
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-teal-300">
                    <option value="1">1日空き</option>
                    <option value="2">2日空き</option>
                  </select>
                </label>
              </div>
              <label className="space-y-1">
                <span className="text-xs font-medium text-gray-500">排便状況</span>
                <select value={bowelStatus}
                  onChange={(e) => setBowelStatus(e.target.value as "normal" | "constipated" | "none")}
                  className="w-full rounded-xl border border-gray-200 px-3 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-teal-300">
                  <option value="normal">あり（通常）</option>
                  <option value="constipated">便秘</option>
                  <option value="none">なし</option>
                </select>
              </label>
              <div className="flex gap-4 items-center pt-1">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" checked={edema} onChange={(e) => setEdema(e.target.checked)}
                    className="w-4 h-4 accent-teal-600" />
                  むくみ
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" checked={dyspnea} onChange={(e) => setDyspnea(e.target.checked)}
                    className="w-4 h-4 accent-teal-600" />
                  息苦しさ
                </label>
              </div>
              <button type="button" onClick={handleSaveWeight}
                className="w-full rounded-xl bg-teal-600 py-3 text-white text-base font-bold hover:bg-teal-700 transition-colors">
                登録する
              </button>
            </div>
          )}
        </section>

        {/* ④ プレミアム（最小化） */}
        {!isPremium && (
          <div className="flex items-center justify-between rounded-2xl bg-teal-50 border border-teal-100 px-4 py-3">
            <p className="text-xs text-gray-500">より詳しい管理でさらに安心</p>
            <PremiumButton />
          </div>
        )}

      </div>

      {/* ── 記録エリア区切り ──────────────────────────────── */}
      <div className="border-t-4 border-gray-200">
        <p className="text-sm font-bold text-gray-500 px-5 pt-3 pb-1 mx-auto max-w-md">
          食事を記録する
        </p>
      </div>

      {/* ── 食事記録エリア ────────────────────────────────── */}
      <MealRecorder stickyOffset={HOME_HEADER_HEIGHT} />

    </main>
  );
}
