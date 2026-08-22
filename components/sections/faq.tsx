import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faq } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

/**
 * СЕКЦИЯ 7 — FAQ.
 * Композиция: единственная узкая секция на странице — длинные ответы на всю
 * ширину экрана читать тяжело, поэтому здесь ограниченная мера строки
 * оправдана. Чтобы это не выглядело просто центрированным столбиком, справа
 * стоит липкая маргиналия с заголовком секции; колонка вопросов — слева.
 * Аккордеон без рамок и заливок — только хайрлайны.
 */
export function Faq() {
  return (
    <section id="faq" className="px-gutter py-section">
      <div className="grid gap-10 md:grid-cols-12 md:gap-rail">
        {/* Маргиналия: на десктопе прилипает справа, на мобильном — обычный заголовок сверху */}
        <div className="md:col-span-4 md:col-start-9 md:row-start-1 lg:col-span-3 lg:col-start-10">
          <Reveal>
            <div className="md:sticky md:top-28">
              <p className="eyebrow">Вопросы</p>
              <h2 className="mt-4 font-heading text-h3 font-medium text-ink">
                То, о чём обычно спрашивают до консультации
              </h2>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7 md:col-start-1 md:row-start-1">
          <Reveal>
            {/* Один открытый вопрос за раз — раскрытый список целиком
                превратил бы секцию в сплошную простыню текста. */}
            <Accordion multiple={false}>
              {faq.map((item, i) => (
                <AccordionItem key={i} value={`q-${i}`}>
                  <AccordionTrigger>
                    <span className="min-w-0 flex-1 font-heading text-[1.05rem] font-medium leading-snug text-ink md:text-[1.3rem]">
                      {item.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="max-w-xl pb-5 pl-9 text-[0.95rem] leading-relaxed text-ink-60 md:pb-6 md:pl-11">
                      {item.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
