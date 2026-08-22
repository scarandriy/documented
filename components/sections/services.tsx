"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { services } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

/**
 * СЕКЦИЯ 4 — витрина услуг.
 * Композиция: единственная тёмная секция в середине страницы, поэтому не
 * похожа ни на что вокруг. Табы — не пилюли, а ряд крупных текстовых
 * лейблов с бегущим подчёркиванием (layoutId). Контент таба занимает весь
 * центр экрана: слева название и честный срок, справа — процедура как
 * крупная нумерованная лестница (одна подсказка на шаг), внизу — цены
 * строками прайс-листа с точечными лидерами, как в меню, а не карточками.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export function Services() {
  const [active, setActive] = useState(services[0].id);
  const reduced = useReducedMotion();

  return (
    <section id="services" className="bg-night text-paper py-section">
      <div className="px-gutter">
        <Reveal>
          <p className="eyebrow text-paper/40">Услуги</p>
          {/* Мера строки расширена: на десктопе заголовок должен ложиться
              в две строки, а не в четыре. */}
          <h2 className="mt-4 max-w-5xl font-heading text-h2 font-medium text-paper">
            Каждая услуга — короткий путь, а не инструкция на три страницы
          </h2>
        </Reveal>
      </div>

      <Tabs
        value={active}
        onValueChange={(v) => setActive(String(v))}
        className="mt-12 md:mt-20"
      >
        {/* Рельс табов скроллится вбок на узких экранах — переносить
            лейблы в две строки значило бы сломать линию подчёркивания.
            touch-pan-x: вертикальный свайп по рельсу должен листать
            страницу, а не резинить сам рельс. */}
        <TabsList className="no-scrollbar touch-pan-x select-none scroll-px-gutter snap-x snap-proximity overflow-x-auto overflow-y-hidden overscroll-contain border-b border-night-line px-gutter">
          {services.map((s) => (
            <TabsTrigger
              key={s.id}
              value={s.id}
              className={`min-h-11 shrink-0 snap-start pb-4 pr-6 font-heading text-[1.05rem] font-medium tracking-tight md:min-h-0 md:pb-5 md:pr-12 md:text-[1.35rem] ${
                active === s.id ? "text-paper" : "text-paper/35 hover:text-paper/70"
              }`}
            >
              {s.label}
              {active === s.id && (
                <motion.span
                  layoutId="services-underline"
                  aria-hidden
                  className="absolute inset-x-0 -bottom-px right-8 h-1 bg-sky md:right-12"
                  transition={{ duration: 0.45, ease: EASE }}
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {services.map((s) => (
          <TabsContent key={s.id} value={s.id} className="px-gutter">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.id}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="grid gap-10 pt-8 md:grid-cols-12 md:gap-rail md:gap-12 md:pt-14"
              >
                {/* Левая колонка — что это, сколько ждать и сколько стоит.
                    Цены перенесены сюда: под лестницей шагов они удлиняли
                    секцию так, что она переставала помещаться в экран. */}
                <div className="md:col-span-4">
                  <h3 className="font-heading text-h3 font-medium text-paper">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-night-60">
                    {s.lead}
                  </p>
                  {/* <p className="mt-6 border-t border-night-line pt-5 text-[0.85rem] leading-relaxed text-paper/45">
                    {s.timeline}
                  </p> */}

                  <p className="eyebrow mt-8 text-paper/40">Стоимость</p>
                  <ul className="mt-4">
                    {s.tiers.map((t) => (
                      <li key={t.name} className="py-2.5">
                        <div className="flex items-baseline">
                          <span className="min-w-0 text-[0.9rem] text-paper/85">
                            {t.name}
                          </span>
                          <span
                            aria-hidden
                            className="mx-3 min-w-4 flex-1 translate-y-[-0.3em] border-b border-dotted border-night-line"
                          />
                          {/* nowrap обязателен: иначе на узком экране символ
                              лари отрывается от числа и уезжает на строку ниже. */}
                          <span className="shrink-0 whitespace-nowrap font-heading text-[0.95rem] font-medium tabular-nums text-paper">
                            {t.price}
                          </span>
                        </div>
                        {t.note && (
                          <p className="mt-1 text-[0.78rem] text-paper/35">
                            {t.note}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Правая колонка — нумерованная лестница шагов */}
                <ol className="md:col-span-7 md:col-start-6">
                  {s.steps.map((step, i) => (
                    <li
                      key={step.title}
                      className="grid grid-cols-[auto_1fr] items-center gap-x-4 border-t border-night-line py-4 first:border-t-0 first:pt-0 last:border-b md:gap-x-10 md:py-7 md:first:pt-0"
                    >
                      <span
                        aria-hidden
                        className="flex items-center font-heading text-numeral font-medium leading-none text-paper/15 tabular-nums"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-heading text-[1.15rem] font-medium text-paper md:text-[1.4rem]">
                          {step.title}
                        </p>
                        <p className="mt-1.5 text-[0.9rem] text-night-60">
                          {step.hint}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
