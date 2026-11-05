"use server";

import { headers } from "next/headers";
import { subjects, validateAll, type ContactState, type ContactValues } from "@/lib/contact";

const MIN_FILL_MS = 2500; // humans take longer than this to complete the form
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort in-memory rate limiting (per server instance). For multi-instance
// deployments, back this with a shared store such as Redis/Upstash.
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const clean = (v: FormDataEntryValue | null) =>
  // strip control characters except newlines/tabs
  String(v ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function deliver(values: ContactValues) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const subjectLabel = subjects.find((s) => s.value === values.subject)?.label ?? values.subject;

  if (!apiKey || !to || !from) {
    // Delivery not configured yet — record the enquiry in server logs so nothing is silently lost.
    console.info("[contact] New enquiry (email delivery not configured):", {
      name: values.name,
      email: values.email,
      company: values.company,
      subject: subjectLabel,
      message: values.message,
    });
    return true;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: values.email,
      subject: `Website enquiry — ${subjectLabel} — ${values.name}`,
      text: `Name: ${values.name}\nEmail: ${values.email}\nCompany: ${values.company || "—"}\nSubject: ${subjectLabel}\n\n${values.message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(values.name)}<br/><strong>Email:</strong> ${escapeHtml(values.email)}<br/><strong>Company:</strong> ${escapeHtml(values.company || "—")}<br/><strong>Subject:</strong> ${escapeHtml(subjectLabel)}</p><p>${escapeHtml(values.message).replace(/\n/g, "<br/>")}</p>`,
    }),
  });
  if (!res.ok) {
    console.error("[contact] Email delivery failed:", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real users never see or fill this field. Respond as if successful.
  if (clean(formData.get("website")).trim() !== "") return { status: "success" };

  // Time trap: bots typically submit instantly.
  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) return { status: "success" };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return { status: "error", message: "Too many messages sent recently. Please try again in a few minutes." };
  }

  const values: ContactValues = {
    name: clean(formData.get("name")).trim(),
    email: clean(formData.get("email")).trim(),
    company: clean(formData.get("company")).trim(),
    subject: clean(formData.get("subject")),
    message: clean(formData.get("message")).trim(),
    consent: formData.get("consent") === "on",
  };

  const errors = validateAll(values);
  if (Object.keys(errors).length) {
    return { status: "error", message: "Please correct the highlighted fields.", errors };
  }

  try {
    const ok = await deliver(values);
    if (!ok) return { status: "error", message: "We couldn’t send your message just now. Please try again shortly." };
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return { status: "error", message: "Something went wrong while sending your message. Please try again." };
  }

  return { status: "success" };
}
