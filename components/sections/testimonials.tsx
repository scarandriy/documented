"use client";

import { useCallback, useRef, useState } from "react";
import { testimonials } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { ArrowSide } from "@/components/ui/arrow-side";

/**
 * СЕКЦИЯ 5 — отзывы.
 * Композиция: full-bleed горизонтальная лента, один отзыв крупно в фокусе,
 * соседние срезаны по краям экрана (peek) — сразу видно, что можно листать.
 * Это единственное место на странице, где структура элементов сознательно
 * повторяется: карточки отзывов должны читаться как один ряд.
 * Никаких рамок и теней — работает только крупная типографика и хайрлайн.
 */
export function Testimonials() {
  const railRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const onScroll = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const items = Array.from(rail.children) as HTMLElement[];
    const mid = rail.scrollLeft + rail.clientWidth / 2;
    let closest = 0;
    let min = Infinity;
    items.forEach((el, i) => {
      const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid);
      if (d < min) {
        min = d;
        closest = i;
      }
    });
    setIndex(closest);
  }, []);

  /**
   * Слайды выровнены по центру (snap-center), поэтому и доводить их нужно
   * до центра ленты: при выравнивании по левому краю snap дотягивал ленту
   * до следующего слайда и шаг получался двойным.
   */
  const go = useCallback(
    (dir: -1 | 1) => {
      const rail = railRef.current;
      if (!rail) return;
      const items = Array.from(rail.children) as HTMLElement[];
      const next = Math.min(Math.max(index + dir, 0), items.length - 1);
      const railBox = rail.getBoundingClientRect();
      const itemBox = items[next].getBoundingClientRect();
      const delta =
        itemBox.left + itemBox.width / 2 - (railBox.left + railBox.width / 2);
      rail.scrollBy({ left: delta, behavior: "smooth" });
    },
    [index]
  );

  return (
    <section id="testimonials" className="overflow-hidden py-section">
      <div className="flex items-end justify-between gap-4 px-gutter">
        <Reveal>
          <p className="eyebrow">Отзывы</p>
        </Reveal>

        <Reveal className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Предыдущий отзыв"
            className="flex size-11 items-center justify-center rounded-full border border-hairline text-ink transition-colors duration-300 hover:border-ink disabled:opacity-30 disabled:hover:border-hairline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky md:size-14"
          >
            <ArrowSide direction="left" className="size-5 md:size-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={index === testimonials.length - 1}
            aria-label="Следующий отзыв"
            className="flex size-11 items-center justify-center rounded-full border border-hairline text-ink transition-colors duration-300 hover:border-ink disabled:opacity-30 disabled:hover:border-hairline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky md:size-14"
          >
            <ArrowSide className="size-5 md:size-6" />
          </button>
        </Reveal>
      </div>

      {/* Лента выходит за пределы гаттера — отзыв справа намеренно срезан краем
          экрана. На 375px ширина слайда почти во весь экран: при узком слайде
          крупная цитата рассыпалась бы на слишком короткие строки. */}
      <ul
        ref={railRef}
        onScroll={onScroll}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-rail overflow-x-auto overscroll-x-contain px-gutter pb-2 [-webkit-overflow-scrolling:touch] md:mt-16"
      >
        {testimonials.map((t, i) => (
          <li
            key={i}
            className="w-[min(84vw,22rem)] shrink-0 snap-center md:w-[62vw] xl:w-[50vw]"
          >
            <blockquote>
              <p
                className={`font-heading text-quote font-medium transition-colors duration-500 ${
                  i === index ? "text-ink" : "text-ink-40"
                }`}
              >
                «{t.quote}»
              </p>
              <footer className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-hairline pt-4 md:mt-8 md:pt-5">
                <cite className="not-italic font-medium text-ink">{t.name}</cite>
                <span className="min-w-0 text-[0.85rem] text-ink-40">{t.meta}</span>
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </section>
  );
}
