"use client";

import { useState } from "react";

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    alert("ボタンは反応しています");
    setShowForm(true);
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
          <div className="rounded-2xl border p-4 shadow-sm">
            <p className="mb-3 font-semibold">自由入力フォーム</p>

            <input
              type="text"
              placeholder="食べたものを入力"
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
        )}
      </div>
    </main>
  );
}