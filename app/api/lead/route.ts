import { leadSchema, topicLabel } from "@/lib/lead";

const INBOX = process.env.LEAD_INBOX ?? "documentebiteam@gmail.com";

export async function POST(request: Request) {
  const key = process.env.WEB3FORMS_ACCESS_KEY;
  if (!key) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const { name, contact, topic, message } = parsed.data;
  const topicText = topicLabel(topic);
  const situation = message?.trim() || "—";

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: key,
      to: INBOX,
      from_name: "Documentebi",
      subject: `Заявка: ${topicText} — ${name}`,
      name,
      email: contact.includes("@") ? contact : INBOX,
      contact,
      topic: topicText,
      message: situation,
    }),
  });

  const result = (await res.json().catch(() => null)) as
    | { success?: boolean }
    | null;

  if (!res.ok || !result?.success) {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
