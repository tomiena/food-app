export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1>食事チェック</h1>

      <button
        style={{
          marginTop: 20,
          padding: 12,
          borderRadius: 8,
          background: "#22c55e",
          color: "#fff",
          border: "none"
        }}
      >
        自由入力で追加
      </button>
    </main>
  );
}