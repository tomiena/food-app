import Image from "next/image";

export default function LP() {
  return (
    <main className="bg-gradient-to-b from-teal-50 to-white text-gray-800">

      {/* ① ヒーロー */}
      <section className="px-6 pt-20 pb-14 text-center">
        <p className="inline-block text-teal-700 font-semibold text-sm tracking-wide bg-teal-100 px-4 py-1 rounded-full mb-5">
          透析患者さんの食事サポート
        </p>

        <h1 className="text-3xl font-bold leading-snug">
          「これ食べて大丈夫？」
          <br />
          <span className="text-teal-600">その不安、3秒で解決</span>
        </h1>

        <p className="mt-5 text-gray-600 leading-relaxed">
          食べたものを選ぶだけで
          <br />
          塩分・カリウム・リンをすぐ判定
        </p>

        <a
          href="https://food-app-sr7i.vercel.app/"
          className="inline-block mt-8 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-4 rounded-xl shadow-md text-base transition-colors"
        >
          今すぐ無料でチェックする
        </a>

        <p className="mt-3 text-xs text-gray-400">登録不要・無料で使えます</p>
      </section>

      {/* ② 共感 */}
      <section className="px-6 py-12 bg-white">
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-bold text-center mb-6 text-gray-700">
            こんな悩み、ありませんか？
          </h2>

          <ul className="space-y-4">
            {[
              "食べてから不安になる",
              "調べてもよく分からない",
              "毎回考えるのがしんどい",
            ].map((text) => (
              <li
                key={text}
                className="flex items-center gap-3 bg-teal-50 rounded-xl px-5 py-4 shadow-sm"
              >
                <span className="text-teal-500 font-bold text-lg">✔</span>
                <span className="text-gray-700">{text}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-lg font-bold text-center text-teal-700">
            👉 その悩み、なくせます
          </p>
        </div>
      </section>

      {/* ③ 想い（魂）セクション */}
      <section className="px-6 py-14 bg-teal-600 text-white">
        <div className="max-w-md mx-auto">
          <p className="text-sm font-semibold tracking-widest opacity-80 mb-4 text-center">
            このアプリについて
          </p>

          <p className="leading-loose text-[1rem]">
            このアプリは、
            <br />
            透析患者さんの「食事の不安」を減らすために作りました。
          </p>

          <p className="mt-6 leading-loose text-[1rem]">
            毎回、
            <br />
            「これ食べていいのかな」
            <br />
            「あとで体に影響出ないかな」
          </p>

          <p className="mt-6 leading-loose text-[1rem]">
            そんな不安を抱えながら食事をしている方を、
            <br />
            私はたくさん見てきました。
          </p>

          <p className="mt-6 leading-loose text-[1rem] font-semibold">
            だからこそ、
            <br />
            「食べたあとに安心できる仕組み」を作りたいと思いました。
          </p>
        </div>
      </section>

      {/* ④ スクリーンショット 3枚 */}
      <section className="py-14">
        <h2 className="text-xl font-bold mb-8 text-center px-6">
          食べた結果がすぐ分かる
        </h2>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4 scrollbar-hide">
          {/* 1枚目：価値 */}
          <div className="flex-none w-64 snap-center">
            <div className="rounded-2xl shadow-md border bg-white overflow-hidden">
              <Image
                src="/screenshots/result-main.png"
                width={256}
                height={480}
                className="w-full h-auto"
                alt="ナトリウム・カリウム・リンの判定結果画面"
              />
            </div>
            <p className="mt-3 text-sm font-semibold text-gray-700 text-center">
              食べた後、すぐ判定
            </p>
            <p className="text-xs text-gray-400 text-center mt-1">
              色でパッと分かる
            </p>
          </div>

          {/* 2枚目：使い方 */}
          <div className="flex-none w-64 snap-center">
            <div className="rounded-2xl shadow-md border bg-white overflow-hidden">
              <Image
                src="/screenshots/select.png"
                width={256}
                height={480}
                className="w-full h-auto"
                alt="食材を選んで判定する操作画面"
              />
            </div>
            <p className="mt-3 text-sm font-semibold text-gray-700 text-center">
              食材を選ぶだけ
            </p>
            <p className="text-xs text-gray-400 text-center mt-1">
              入力は30秒以内
            </p>
          </div>

          {/* 3枚目：信頼性 */}
          <div className="flex-none w-64 snap-center">
            <div className="rounded-2xl shadow-md border bg-white overflow-hidden">
              <Image
                src="/screenshots/result-trust.png"
                width={256}
                height={480}
                className="w-full h-auto"
                alt="塩分・カリウム・リンの詳細判定とアドバイス表示"
              />
            </div>
            <p className="mt-3 text-sm font-semibold text-gray-700 text-center">
              アドバイスも表示
            </p>
            <p className="text-xs text-gray-400 text-center mt-1">
              次の食事に活かせる
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-2">← スワイプで確認 →</p>

        {/* CTA（スクショ後） */}
        <div className="text-center mt-10 px-6">
          <a
            href="https://food-app-sr7i.vercel.app/"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-4 rounded-xl shadow-md text-base transition-colors"
          >
            今すぐ無料でチェックする
          </a>
        </div>
      </section>

      {/* ⑤ ベネフィット */}
      <section className="px-6 py-12 bg-teal-50">
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-bold text-center mb-6 text-gray-700">
            使い続けると、こう変わる
          </h2>

          <ul className="space-y-4">
            {[
              { icon: "🧘", text: "迷わなくなる" },
              { icon: "🧠", text: "考えなくていい" },
              { icon: "😊", text: "安心して食べられる" },
            ].map(({ icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-4 bg-white rounded-xl px-5 py-4 shadow-sm"
              >
                <span className="text-2xl">{icon}</span>
                <span className="font-semibold text-gray-700">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ⑥ 最終CTA */}
      <section className="px-6 py-16 text-center">
        <h2 className="text-2xl font-bold leading-snug">
          今日から、
          <br />
          <span className="text-teal-600">安心して食べよう。</span>
        </h2>

        <p className="mt-4 text-gray-500 text-sm">
          登録不要。すぐ使えます。
        </p>

        <a
          href="https://food-app-sr7i.vercel.app/"
          className="inline-block mt-8 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-10 py-4 rounded-xl shadow-md text-base transition-colors"
        >
          今すぐ無料でチェックする
        </a>
      </section>

      {/* ⑦ 料金 */}
      <section className="px-6 pb-16 text-center">
        <p className="text-gray-400 text-xs">
          ※無料で使えます（プレミアム機能は準備中）
        </p>
      </section>

    </main>
  );
}
