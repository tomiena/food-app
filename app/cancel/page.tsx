import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-sm space-y-4">
        <p className="text-4xl">🙏</p>
        <h1 className="text-2xl font-bold text-gray-800">決済はキャンセルされました</h1>
        <p className="text-gray-500">必要なときに、またいつでもお試しください。</p>
        <Link
          href="/lp"
          className="inline-block mt-4 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-600 font-semibold shadow-sm hover:opacity-80 transition-opacity"
        >
          LPに戻る
        </Link>
      </div>
    </main>
  );
}
