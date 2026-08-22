"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { form as copy } from "@/lib/content";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";

/**
 * Форма заявки. Поля оформлены ТОЛЬКО нижней линией — на цветной подложке
 * инпуты-коробочки дали бы ту самую «рамку внутри рамки».
 */

const schema = z.object({
  name: z.string().trim().min(2, "Как к вам обращаться?"),
  contact: z
    .string()
    .trim()
    .min(5, "Телефон, телеграм или почта — как вам удобнее"),
  topic: z.string().min(1, "Выберите направление"),
  message: z.string().trim().max(600, "Слишком длинно — расскажите короче").optional(),
  consent: z.literal(true, { message: "Без согласия мы не сможем ответить" }),
});

type FormValues = z.input<typeof schema>;

const fieldBase =
  "w-full border-0 border-b border-ink/25 bg-transparent pb-2.5 text-base text-ink placeholder:text-ink/45 outline-none transition-colors duration-300 focus:border-ink focus-visible:ring-0";

export function LeadForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", contact: "", topic: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    // TODO(backend): отправлять на реальный эндпоинт / в CRM.
    // Сейчас заявка только логируется — бэкенда во второй итерации нет.
    console.log("[lead-form] заявка:", values);
    setSent(true);
    reset();
  };

  if (sent) {
    return (
      <p className="border-t border-ink/25 pt-6 font-heading text-h3 text-ink">
        {copy.success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-7">
      <div>
        <label htmlFor="lf-name" className="eyebrow block text-ink/60">
          Имя
        </label>
        <input
          id="lf-name"
          {...register("name")}
          className={`${fieldBase} mt-2`}
          placeholder="Как к вам обращаться"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="mt-2 text-[0.8rem] text-ink/70">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="lf-contact" className="eyebrow block text-ink/60">
          Контакт
        </label>
        <input
          id="lf-contact"
          {...register("contact")}
          className={`${fieldBase} mt-2`}
          placeholder="Телефон, телеграм или почта"
          aria-invalid={!!errors.contact}
        />
        {errors.contact && (
          <p className="mt-2 text-[0.8rem] text-ink/70">{errors.contact.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="lf-topic" className="eyebrow block text-ink/60">
          Направление
        </label>
        <select
          id="lf-topic"
          {...register("topic")}
          className={`${fieldBase} mt-2 appearance-none rounded-none`}
          aria-invalid={!!errors.topic}
          defaultValue=""
        >
          <option value="" disabled>
            Выберите
          </option>
          {copy.topics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {errors.topic && (
          <p className="mt-2 text-[0.8rem] text-ink/70">{errors.topic.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="lf-message" className="eyebrow block text-ink/60">
          Ситуация — коротко
        </label>
        <textarea
          id="lf-message"
          rows={2}
          {...register("message")}
          className={`${fieldBase} mt-2 resize-none`}
          placeholder="Например: виза заканчивается через месяц, работаю удалённо"
        />
        {errors.message && (
          <p className="mt-2 text-[0.8rem] text-ink/70">{errors.message.message}</p>
        )}
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.85rem] leading-relaxed text-ink/75">
          <input
            type="checkbox"
            {...register("consent")}
            className="mt-0.5 size-4 shrink-0 accent-ink"
          />
          {/* TODO(legal): подставить ссылку на политику обработки данных */}
          <span>Согласен на обработку персональных данных</span>
        </label>
        {errors.consent && (
          <p className="mt-2 text-[0.8rem] text-ink/70">{errors.consent.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 font-medium text-paper transition-transform duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md:w-auto"
      >
        {copy.submit}
        <ArrowUpRight className="size-4" />
      </button>
    </form>
  );
}
