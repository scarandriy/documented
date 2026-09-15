"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { form as copy } from "@/lib/content";
import { leadSchema, topicLabel, type LeadInput } from "@/lib/lead";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

/**
 * Форма заявки. Поля оформлены ТОЛЬКО нижней линией — на цветной подложке
 * инпуты-коробочки дали бы ту самую «рамку внутри рамки».
 * Отправка — прямой POST на Web3Forms, как в их сниппете.
 */

const fieldBase =
  "w-full border-0 border-b border-ink/25 bg-transparent pb-2.5 text-base text-ink placeholder:text-ink/45 outline-none transition-colors duration-300 focus:border-ink focus-visible:ring-0";

export function LeadForm({ accessKey }: { accessKey: string }) {
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", contact: "", topic: "", message: "" },
  });

  const onSubmit = async (values: LeadInput) => {
    setSendError(false);
    const payload = new FormData();
    payload.set("access_key", accessKey);
    payload.set("from_name", "Documentebi");
    payload.set("subject", `Заявка: ${topicLabel(values.topic)} — ${values.name}`);
    payload.set("name", values.name);
    payload.set(
      "email",
      values.contact.includes("@") ? values.contact : "documentebiteam@gmail.com"
    );
    payload.set("contact", values.contact);
    payload.set("topic", topicLabel(values.topic));
    payload.set("message", values.message?.trim() || "—");

    try {
      const res = await fetch(WEB3FORMS_URL, { method: "POST", body: payload });
      const result = (await res.json().catch(() => null)) as
        | { success?: boolean }
        | null;
      if (!res.ok || !result?.success) {
        setSendError(true);
        return;
      }
      setSent(true);
      reset();
    } catch {
      setSendError(true);
    }
  };

  if (sent) {
    return (
      <p className="border-t border-ink/25 pt-6 font-heading text-h3 text-ink">
        {copy.success}
      </p>
    );
  }

  return (
    <form
      action="https://api.web3forms.com/submit"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-7"
    >
      <input type="hidden" name="access_key" value={accessKey} />
      <input type="hidden" name="from_name" value="Documentebi" />
      <input type="hidden" name="subject" value="Заявка с сайта Documentebi" />
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

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 font-medium text-paper transition-transform duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md:w-auto"
        >
          {copy.submit}
          <ArrowUpRight className="size-4" />
        </button>
        {sendError && (
          <p className="mt-3 text-[0.8rem] text-ink/70">{copy.error}</p>
        )}
      </div>
    </form>
  );
}
