import { footer, nav, site } from "@/lib/content";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";
import { Instagram } from "@/components/ui/instagram";

/**
 * Подвал по образцу «имя бренда как цоколь»: сверху — тихий набор
 * (слоган, мессенджеры, навигация). Слово-знак внизу масштабируется
 * под ширину контента и обрезается: видны верхние две трети букв.
 */
export function Footer() {
  return (
    <footer className="flex flex-col overflow-hidden bg-night text-paper">
      <div className="px-gutter pt-section-sm md:pt-section">
        <div className="grid gap-8 md:grid-cols-12 md:items-start md:gap-x-rail md:gap-y-12">
          <div className="md:col-span-6 xl:col-span-5">
            <p className="max-w-md font-heading text-h3 font-medium text-paper">
              {site.tagline}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-8">
              {footer.messengers.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 w-full items-center justify-between gap-4 rounded-full bg-paper px-6 py-3.5 font-heading text-[1.05rem] font-medium text-ink transition-transform duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper sm:w-auto sm:min-w-[13rem] sm:px-7 sm:py-4 sm:text-[1.15rem]"
                >
                  {item.label}
                  <ArrowUpRight className="size-5 shrink-0 sm:size-6" />
                </a>
              ))}
            </div>
          </div>

          <nav className="md:col-span-5 md:col-start-8">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 md:flex md:flex-col md:items-end">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-[0.95rem] text-paper/50 transition-colors duration-300 hover:text-paper md:min-h-0"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="-m-2 mt-4 flex w-fit p-2 text-paper transition-transform duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:rotate-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper md:ml-auto md:mt-6"
            >
              <Instagram className="size-9 md:size-10" />
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 sm:mt-16 sm:flex-row sm:items-end sm:justify-between md:mt-24">
          <p className="eyebrow text-paper/40">{site.city}</p>
          <p className="eyebrow text-paper/40">{footer.credit}</p>
        </div>
      </div>

      <div className="@container mt-6 overflow-hidden px-gutter md:mt-10">
        <a
          href="#top"
          aria-label={site.wordmark}
          className="block h-[0.66em] overflow-hidden font-heading font-medium leading-none tracking-[-0.08em] text-paper whitespace-nowrap transition-opacity duration-300 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper md:tracking-[-0.07em]"
          style={{ fontSize: "clamp(2.75rem, calc(100cqw / 5.5), 22rem)" }}
        >
          {site.wordmark}
        </a>
      </div>
    </footer>
  );
}
