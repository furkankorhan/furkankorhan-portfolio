import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 75% 45%, rgba(120,120,120,0.24), transparent 34%), linear-gradient(135deg, #050505 0%, #151515 58%, #000 100%)",
          color: "white",
          padding: "72px",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          Furkan Korhan
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 36,
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.25,
          }}
        >
          Technik verstehen. Probleme lösen. Weiterlernen.
        </div>
        <div
          style={{
            marginTop: 72,
            display: "flex",
            gap: 18,
            fontSize: 24,
            color: "rgba(255,255,255,0.68)",
          }}
        >
          <span>Informatik</span>
          <span>•</span>
          <span>IT-Systeme</span>
          <span>•</span>
          <span>Webentwicklung</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
}
