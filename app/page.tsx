import Link from "next/link";

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      background: "linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0ea5e9 100%)",
      color: "white",
      padding: "40px"
    }}>
      <div style={{
        maxWidth: 960,
        width: "100%",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 16,
        padding: "40px"
      }}>
        <h1 style={{ margin: 0, fontSize: 48, lineHeight: 1.1 }}>ESVIEM Consulting</h1>
        <p style={{ marginTop: 16, fontSize: 18, opacity: 0.9 }}>
          Комплексні рішення для бізнесу: юридичний, фінансовий, будівельний та земельний консалтинг.
          15+ років досвіду. Працюємо зі складними задачами та нестандартними кейсами.
        </p>
        <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="#services" style={btn()}>Послуги</Link>
          <Link href="#contacts" style={btn("ghost")}>Контакти</Link>
        </div>
        <div style={{ marginTop: 28, fontSize: 12, opacity: 0.8 }}>
          Демоверсія для інвестора • Сьогоднішній білд
        </div>
      </div>
    </main>
  );
}

function btn(variant?: "ghost") {
  const base = {
    display: "inline-block",
    padding: "12px 20px",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 600,
    border: "1px solid rgba(255,255,255,0.2)"
  } as React.CSSProperties;

  if (variant === "ghost") {
    return { ...base, background: "transparent", color: "white" };
  }
  return { ...base, background: "white", color: "#0f172a" };
}
