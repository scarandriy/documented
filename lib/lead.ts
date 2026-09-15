import { z } from "zod";
import { form as copy } from "@/lib/content";

/**
 * Одна схема на клиенте и на сервере: форма не должна пропускать то,
 * что API потом отвергнет.
 */
export const leadSchema = z.object({
  name: z.string().trim().min(2, "Как к вам обращаться?"),
  contact: z
    .string()
    .trim()
    .min(5, "Телефон, телеграм или почта — как вам удобнее"),
  topic: z.string().min(1, "Выберите направление"),
  message: z
    .string()
    .trim()
    .max(600, "Слишком длинно — расскажите короче")
    .optional(),
  consent: z.literal(true, { message: "Без согласия мы не сможем ответить" }),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadValues = z.output<typeof leadSchema>;

const topicLabels = Object.fromEntries(
  copy.topics.map((t) => [t.value, t.label])
);

export function topicLabel(value: string) {
  return topicLabels[value] ?? value;
}
