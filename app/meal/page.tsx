"use client";

import MealRecorder from "@/app/components/MealRecorder";

export default function MealPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-4 sticky top-0 z-20 shadow-sm">
        <div className="mx-auto max-w-md flex items-center justify-center">
          <h1 className="text-lg font-bold text-gray-800">食事を記録</h1>
        </div>
      </header>
      <MealRecorder stickyOffset={57} />
    </main>
  );
}
