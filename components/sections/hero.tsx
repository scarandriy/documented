import { hero } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { GeorgiaMap } from "@/components/illustrations/georgia-map";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";

/**
 * СЕКЦИЯ 1 — Hero.
 * Десктоп: текст слева, карта справа. Мобильный: карта заполняет верх
 * экрана сразу под шапкой, текст лежит на её нижней части.
 *
 * Высота больше 100lvh: в Safari панель снизу полупрозрачная и не входит
 * во вьюпорт — без запаса под ней проглядывает следующая секция.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex h-[calc(100lvh+2.5rem)] flex-col overflow-hidden bg-night text-paper md:h-auto md:min-h-svh"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(100% 70% at 50% 0%, #1c1c1c 0%, #131313 60%, #101010 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[58%] md:block xl:w-[54%]">
        <GeorgiaMap className="h-full w-full max-w-none translate-x-[5%]" />
      </div>

      {/* Мобильный: карта начинается сразу под шапкой и заполняет верх экрана */}
      <div className="pointer-events-none absolute left-1/2 top-[calc(env(safe-area-inset-top)+7rem)] -z-10 w-[145vw] -translate-x-1/2 md:hidden">
        <GeorgiaMap className="h-auto w-full max-w-none [&_text]:hidden" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[9] md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(19,19,19,0.55) 0%, rgba(19,19,19,0.12) 22%, rgba(19,19,19,0.35) 52%, rgba(19,19,19,0.82) 74%, #131313 100%)",
        }}
      />

      <div className="relative flex flex-1 flex-col justify-end px-gutter pb-[calc(15svh+2.5rem)] pt-[calc(env(safe-area-inset-top)+7.5rem)] md:justify-center md:pb-20 md:pt-28">
        <div className="md:grid md:grid-cols-12 md:gap-rail">
          <div className="relative md:col-span-7 xl:col-span-6">
            <Reveal delay={0.12} y={26} immediate>
              <h1 className="whitespace-normal font-heading text-[clamp(2.35rem,9.2vw,5.75rem)] font-medium leading-[0.96] tracking-[-0.035em] text-paper md:whitespace-pre-line md:text-display">
                {hero.title}
              </h1>
            </Reveal>

            <Reveal delay={0.28} immediate>
              <p className="mt-6 max-w-[22rem] text-[1.02rem] leading-relaxed text-paper/65 md:mt-8 md:max-w-lg md:text-lead">
                {hero.lead}
              </p>
            </Reveal>

            <Reveal delay={0.38} immediate>
              <a
                href={hero.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-paper px-6 py-3.5 text-[1.05rem] font-medium text-ink transition-transform duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper sm:w-auto md:mt-9 md:gap-4 md:px-8 md:py-5 md:text-xl"
              >
                {hero.cta.label}
                <ArrowUpRight className="size-5 md:size-8" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
