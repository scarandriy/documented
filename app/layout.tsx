import type { Metadata, Viewport } from "next";
import { Onest, Golos_Text } from "next/font/google";
import "./globals.css";
import { site, hero } from "@/lib/content";

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

const title = `${site.name} — ${site.tagline}`;
// Собрано из hero.lead, а не отдельной строкой — иначе метаописание тихо
// расходится с текстом на странице при каждой правке hero-текста.
const description = `${hero.lead} ${site.city}, прозрачные цены.`;

export const metadata: Metadata = {
  // TODO(seo): пока указан documentebi.vercel.app — если появится свой домен
  // (documentebi.ge?), поменять metadataBase и здесь, и в конфиге Vercel.
  metadataBase: new URL("https://documentebi.vercel.app"),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    siteName: site.name,
    locale: "ru_GE",
    type: "website",
  },
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
