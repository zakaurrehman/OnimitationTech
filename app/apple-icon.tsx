import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#070B14" }}>
        <svg width="130" height="130" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="15" stroke="#19D4E5" strokeWidth="3" strokeDasharray="80 14.25" strokeLinecap="round" transform="rotate(-18 20 20)" />
          <circle cx="20" cy="20" r="4.6" fill="#3478F6" />
          <circle cx="30.6" cy="9.4" r="2.6" fill="#19D4E5" />
        </svg>
      </div>
    ),
    size,
  );
}
