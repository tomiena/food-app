export default function Home() {
  return (
    <main style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>食事チェック</h1>

      <button
        style={{
          padding: "14px 18px",
          borderRadius: 12,
          border: "none",
          background: "#22c55e",
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        自由入力で追加
      </button>
    </main>
  );
}