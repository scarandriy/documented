import { startSteps, form as formCopy } from "@/lib/content";
import { LeadForm } from "@/components/form/lead-form";
import { Reveal } from "@/components/motion/reveal";

/**
 * СЕКЦИЯ 6 — с чего начать + финальный CTA.
 * Композиция: full-bleed «небо» от края до края — единственный крупный
 * цветовой момент страницы, ровно там, где человека просят сделать первый
 * шаг. Подложка собрана из нескольких смещённых радиальных градиентов,
 * а не из линейного перехода: получаются мягкие облачные пятна без
 * заметной полосы-перехода.
 * Слева путь клиента 1→2→3 прямо на подложке, справа — форма на белой
 * карточке. Карточка здесь единственная на странице и оправдана: заявка
 * должна лежать на спокойной поверхности, а не на облаках. Вложенности
 * не возникает — поля внутри оформлены только нижней линией.
 */
export function StartCta() {
  return (
    <section id="start" className="relative isolate overflow-hidden text-ink">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(58% 44% at 10% 16%, rgba(90,169,230,0.42) 0%, rgba(90,169,230,0) 62%)",
            "radial-gradient(46% 38% at 84% 6%, rgba(126,193,240,0.38) 0%, rgba(126,193,240,0) 60%)",
            "radial-gradient(66% 52% at 72% 70%, rgba(70,150,215,0.30) 0%, rgba(70,150,215,0) 66%)",
            "radial-gradient(42% 36% at 26% 92%, rgba(168,214,246,0.45) 0%, rgba(168,214,246,0) 62%)",
            "radial-gradient(38% 30% at 50% 44%, rgba(243,243,243,0.55) 0%, rgba(243,243,243,0) 70%)",
            "linear-gradient(168deg, #e8f2fb 0%, #f7fbfe 58%, #f3f3f3 100%)",
          ].join(","),
        }}
      />

      {/* Заголовок живёт внутри левой колонки, поэтому карточка формы
          начинается на одной линии с ним, а не ниже блока шагов. */}
      <div className="px-gutter py-section">
        <div className="grid gap-10 md:grid-cols-12 md:gap-rail md:gap-y-12">
          {/* Левая зона — заголовок. На мобильном форма идёт сразу за ним,
              чтобы не листать три шага до заявки. */}
          <div className="md:col-span-6 md:row-start-1 xl:col-span-5">
            <Reveal>
              <p className="eyebrow text-ink/55">С чего начать</p>
              <h2 className="mt-4 font-heading text-h2 font-medium">
                Три шага — и дальше мы ведём вас сами
              </h2>
            </Reveal>
          </div>

          {/* Правая зона — форма на белой карточке.
              Занимает обе строки, поэтому её верх совпадает с заголовком. */}
          <Reveal
            delay={0.1}
            className="md:col-span-6 md:col-start-7 md:row-span-2 md:row-start-1"
          >
            <div className="rounded-3xl bg-paper p-5 shadow-[0_30px_70px_-40px_rgba(20,40,70,0.45)] sm:p-7 md:rounded-[28px] md:p-10">
              <h3 className="font-heading text-h3 font-medium">
                {formCopy.title}
              </h3>
              <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-ink-60">
                {formCopy.lead}
              </p>
              <div className="mt-7 md:mt-9">
                <LeadForm />
              </div>
            </div>
          </Reveal>

          <ol className="md:col-span-6 md:col-start-1 md:row-start-2 xl:col-span-5">
            {startSteps.map((s, i) => (
              <Reveal
                key={s.n}
                as="li"
                delay={i * 0.08}
                className="grid grid-cols-[auto_1fr] items-center gap-x-4 border-t border-ink/15 py-5 first:border-t-0 first:pt-0 last:border-b md:gap-x-10 md:py-9"
              >
                <span
                  aria-hidden
                  className="flex items-center font-heading text-numeral font-medium leading-none tabular-nums text-ink/25"
                >
                  {s.n}
                </span>
                <div>
                  <h3 className="font-heading text-h3 font-medium">{s.title}</h3>
                  <p className="mt-2 max-w-sm text-[0.95rem] leading-relaxed text-ink/70">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
