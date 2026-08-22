"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Сдержанное появление при скролле: короткий подъём + fade, один раз.
 * Никакого «вау-эффекта» — движение почти незаметно, работает как задержка
 * восприятия, а не как аттракцион.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Задержка для ручного стаггера между соседними элементами */
  delay?: number;
  /** Дистанция подъёма в px */
  y?: number;
  as?: "div" | "section" | "li" | "span" | "p";
  /**
   * Анимировать сразу при монтировании, а не по попаданию во вьюпорт.
   * Обязательно для контента над сгибом: если IntersectionObserver почему-то
   * не сработает, whileInView оставит блок с opacity: 0 — то есть первый
   * экран окажется пустым.
   */
  immediate?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as = "div",
  immediate = false,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  const anim = immediate
    ? { animate: { opacity: 1, y: 0 } }
    : {
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-12% 0px -12% 0px" },
      };

  return (
    <MotionTag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      {...anim}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Контейнер + item для списков, где стаггер нужен автоматически */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}
