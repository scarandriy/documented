import { IdCard, Building2, Users, type LucideIcon } from "lucide-react";
import { problems } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

/**
 * СЕКЦИЯ 3 — Problem / Solution.
 * Композиция: четыре полноширинных «разворота», разделённых только
 * хайрлайном. Внутри каждого — одна и та же ясная схема из трёх зон:
 *   тема (иконка + подпись)  |  вопрос клиента  |  наш ответ
 * Единая сетка выбрана осознанно: чередующиеся раскладки читались как шум,
 * а разворот на всю ширину и так отличает секцию от карточных рядов.
 * Иконки линейные и стоят прямо на фоне — без кружков и подложек,
 * чтобы не появилась рамка внутри рамки.
 */

const icons: Record<(typeof problems)[number]["id"], LucideIcon> = {
  residency: IdCard,
  business: Building2,
  family: Users,
};

export function ProblemSolution() {
  return (
    <section className="px-gutter pt-section pb-section-sm">
      <Reveal>
        <p className="eyebrow">Запросы</p>
        <h2 className="mt-4 max-w-4xl font-heading text-h2 font-medium text-ink">
          Четыре ситуации, с которыми к нам приходят чаще всего
        </h2>
      </Reveal>

      <div className="mt-10 md:mt-20">
        {problems.map((item, i) => {
          const Icon = icons[item.id];
          return (
            <Reveal
              key={item.id}
              delay={i * 0.05}
              className="grid grid-cols-1 gap-y-4 border-t border-hairline py-8 md:grid-cols-12 md:items-start md:gap-x-rail md:gap-y-6 md:py-14"
            >
              {/* Зона 1 — тема */}
              <div className="flex items-center gap-4 md:col-span-3 md:self-center">
                <Icon
                  aria-hidden
                  strokeWidth={1.25}
                  className="size-9 shrink-0 text-ink md:size-12"
                />
                <span className="font-heading text-[1.25rem] font-medium tracking-tight text-ink md:text-[1.6rem]">
                  {item.marginal}
                </span>
              </div>

              {/* Зона 2 — вопрос клиента */}
              <p className="font-heading text-h3 font-medium text-ink md:col-span-5">
                {item.question}
              </p>

              {/* Зона 3 — что делаем мы */}
              <p className="text-[0.95rem] leading-relaxed text-ink-60 md:col-span-4">
                {item.solution}
              </p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
