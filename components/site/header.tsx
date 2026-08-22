"use client";

import { useEffect, useState } from "react";
import { nav, site, hero } from "@/lib/content";

/**
 * Шапка лежит поверх hero без собственного фона и проявляется только
 * после того, как hero ушёл вверх. Сверху — тонкая плашка, как у
 * витринных шапок: видна только на самом верху страницы и уезжает
 * вверх при первом скролле.
 */
export function Header() {
  const [atTop, setAtTop] = useState(true);
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY < 16);
      setLifted(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        lifted
          ? "bg-paper/85 backdrop-blur-md border-b border-hairline"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div
        className={`grid transition-[grid-template-rows] duration-400 ease-[var(--ease-out-soft)] ${
          atTop ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="bg-sky pt-[env(safe-area-inset-top)]">
            <a
              href={hero.cta.href}
              className="flex items-center justify-center px-gutter py-3.5 text-center md:py-3.5"
            >
              <span className="text-[0.75rem] font-medium uppercase leading-snug tracking-[0.06em] text-ink underline decoration-from-font underline-offset-[0.12em] md:max-w-prose md:leading-none">
                <span className="md:hidden">{site.announcementShort}</span>
                <span className="hidden md:inline">{site.announcement}</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div
        className={[
          "flex items-center justify-between gap-3 px-gutter pb-3 md:pb-5",
          atTop
            ? "pt-4 md:pt-5"
            : "pt-[max(0.75rem,env(safe-area-inset-top))] md:pt-[max(1.25rem,env(safe-area-inset-top))]",
        ].join(" ")}
      >
        <a
          href="#top"
          className={[
            "shrink-0 font-heading text-[1.05rem] font-semibold leading-none tracking-tight transition-colors duration-500 md:text-[1.6rem]",
            lifted ? "text-ink" : "text-paper",
          ].join(" ")}
        >
          {site.wordmark}
        </a>

        {/* На мобильном пункты меню скрыты: единственное действие — CTA */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={[
                "text-[0.9rem] transition-colors duration-300",
                lifted
                  ? "text-ink-60 hover:text-ink"
                  : "text-paper/70 hover:text-paper",
              ].join(" ")}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={hero.cta.href}
          className={[
            "inline-flex min-h-11 shrink-0 items-center rounded-full px-4 py-2 text-[0.85rem] font-medium transition-colors duration-500 md:min-h-0 md:px-5 md:py-2.5 md:text-[0.9rem]",
            lifted
              ? "bg-ink text-paper hover:bg-ink/85"
              : "bg-paper text-ink hover:bg-paper/90",
          ].join(" ")}
        >
          {/* На 375px полный лейбл вместе с логотипом не влезает в строку
              и выталкивает вёрстку за пределы вьюпорта — там короткий. */}
          <span className="md:hidden">{hero.ctaShort}</span>
          <span className="hidden md:inline">{hero.cta.label}</span>
        </a>
      </div>
    </header>
  );
}
