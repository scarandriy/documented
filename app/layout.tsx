import type { Metadata, Viewport } from "next";
import { Onest, Golos_Text } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

/* Заголовки — Onest, текст — Golos Text. Обе с полноценной кириллицей
   и variable-начертанием. Намеренно не Inter / Roboto / system-ui. */
const onest = Onest({
  variable: "--font-onest",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  // TODO(seo): вторая итерация — OG-изображение, canonical, robots, JSON-LD
  title: `${site.name} — ${site.tagline}`,
  description:
    "ВНЖ, регистрация ИП и ООО, семейное право и нотариальные услуги в Грузии под ключ. Сопровождение на русском языке, фиксированные цены, честные сроки.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${onest.variable} ${golos.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
