"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DOTS, CITIES, MAP_W, MAP_H } from "./georgia-map-data";

/**
 * Точечная карта Грузии для hero.
 *
 * Координаты точек сгенерированы из реальных границ (Natural Earth 50m)
 * скриптом scratchpad/gen-map.js — см. шапку georgia-map-data.ts.
 *
 * Производительность: точек ~880, и рисовать их отдельными элементами
 * (тем более анимированными) слишком дорого. Поэтому точки собираются в
 * несколько path-ов — по одному на вертикальную полосу, — и анимируется
 * полоса целиком. Получается волна слева направо при десятке DOM-узлов
 * вместо девятисот.
 */

const R = 3;
const BANDS = 14;
const EASE = [0.22, 1, 0.36, 1] as const;

/** Круг радиуса R как пара дуг — компактнее, чем отдельный <circle> */
const dotPath = (cx: number, cy: number) =>
  `M${cx - R},${cy}a${R},${R} 0 1,0 ${R * 2},0a${R},${R} 0 1,0 ${-R * 2},0`;

export function GeorgiaMap({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  const bands = useMemo(() => {
    const out: string[] = Array.from({ length: BANDS }, () => "");
    for (const [x, y] of DOTS) {
      const b = Math.min(BANDS - 1, Math.floor((x / MAP_W) * BANDS));
      out[b] += dotPath(x, y);
    }
    return out;
  }, []);

  return (
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {bands.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="rgba(243,243,243,0.22)"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.055 }}
        />
      ))}

      {CITIES.map((c, i) => (
        <motion.g
          key={c.name}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1.5 + i * 0.2 }}
        >
          {/* Расходящееся кольцо — единственная зацикленная анимация на
              странице, намеренно медленная и малоконтрастная. */}
          {!reduced && (
            <motion.circle
              cx={c.x}
              cy={c.y}
              r={6}
              stroke="#5aa9e6"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              // Анимируем scale, а не r: в подключённой версии framer-motion
              // прямая анимация SVG-атрибута r падает с "Expected length,
              // undefined" — transform-based анимация этого не имеет, и
              // масштаб идёт от центра фигуры (framer-motion сам ставит
              // transform-box: fill-box для SVG-элементов).
              animate={{ scale: [1, 5], opacity: [0.5, 0] }}
              transition={{
                duration: 3.4,
                ease: "easeOut",
                repeat: Infinity,
                delay: 2 + i * 1.2,
              }}
            />
          )}
          <circle cx={c.x} cy={c.y} r={5.5} fill="#5aa9e6" />
          <text
            x={c.x + c.dx}
            y={c.y + 6}
            textAnchor={c.anchor}
            fill="rgba(243,243,243,0.62)"
            fontSize={21}
            letterSpacing={1.4}
          >
            {c.name}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
