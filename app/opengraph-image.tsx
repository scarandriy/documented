import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const onest500 = readFile(join(process.cwd(), "assets/Onest-500.ttf"));
const onest600 = readFile(join(process.cwd(), "assets/Onest-600.ttf"));

export default async function Image() {
  const [regular, semibold] = await Promise.all([onest500, onest600]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#131313",
          padding: "72px",
          fontFamily: "Onest",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#5aa9e6",
              display: "flex",
            }}
          />
          <div
            style={{
              color: "rgba(243,243,243,0.55)",
              fontSize: 28,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {site.city}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#f3f3f3",
              fontSize: 132,
              fontWeight: 600,
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            {site.wordmark}
          </div>
          <div
            style={{
              marginTop: 28,
              color: "rgba(243,243,243,0.7)",
              fontSize: 38,
              maxWidth: 920,
              lineHeight: 1.3,
            }}
          >
            {site.tagline}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Onest", data: regular, style: "normal", weight: 500 },
        { name: "Onest", data: semibold, style: "normal", weight: 600 },
      ],
    }
  );
}
