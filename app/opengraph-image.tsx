import { ImageResponse } from "next/og";

export const alt = "Onimitation Tech — Engineering Intelligence. Empowering Tomorrow.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(ellipse 60% 70% at 85% 30%, rgba(52,120,246,0.45), transparent 60%), radial-gradient(ellipse 40% 50% at 70% 90%, rgba(146,117,255,0.3), transparent 60%), #070B14",
          color: "#F8FAFC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="15" stroke="#19D4E5" strokeWidth="3" strokeDasharray="80 14.25" strokeLinecap="round" transform="rotate(-18 20 20)" />
            <circle cx="20" cy="20" r="4.6" fill="#3478F6" />
            <circle cx="30.6" cy="9.4" r="2.6" fill="#19D4E5" />
          </svg>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
            Onimitation<span style={{ color: "#94A3B8", fontWeight: 400, marginLeft: 10 }}>Tech</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 78, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>Engineering Intelligence.</div>
          <div style={{ fontSize: 78, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3, color: "#19D4E5" }}>Empowering Tomorrow.</div>
          <div style={{ marginTop: 30, fontSize: 26, color: "#94A3B8" }}>
            IT Consulting · Network Services · AI &amp; Innovation — Dubai, UAE
          </div>
        </div>
      </div>
    ),
    size,
  );
}
