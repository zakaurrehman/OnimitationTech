"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState, startTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { submitContact } from "@/app/contact/actions";
import {
  FIELD_ORDER,
  LIMITS,
  subjects,
  validateAll,
  validateField,
  type ContactErrors,
  type ContactField,
  type ContactState,
  type ContactValues,
} from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: ContactField;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-fg">
        <span>
          {label}
          {!optional && <span aria-hidden className="ml-0.5 text-aqua">*</span>}
        </span>
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      <div className="mt-2">{children}</div>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            className="mt-1.5 flex items-center gap-1.5 text-sm text-red-300"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <motion.div
      ref={ref}
      tabIndex={-1}
      role="status"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-h-[32rem] flex-col items-center justify-center text-center outline-none"
    >
      <div className="relative grid h-20 w-20 place-items-center rounded-full bg-aqua/10 ring-1 ring-aqua/40">
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-aqua/10 [animation-iteration-count:2]" />
        <CheckCircle2 className="h-9 w-9 text-aqua" aria-hidden />
      </div>
      <h2 className="mt-8 text-3xl font-semibold text-fg">Message received.</h2>
      <p className="mt-4 max-w-sm leading-relaxed text-muted">
        Thank you for getting in touch. A member of our team will review your enquiry and respond by email.
      </p>
      <button type="button" onClick={onReset} className="mt-8 text-sm font-medium text-aqua underline-offset-4 hover:underline">
        Send another message
      </button>
    </motion.div>
  );
}

const empty = (subject = ""): ContactValues => ({
  name: "",
  email: "",
  company: "",
  subject: subjects.some((s) => s.value === subject) ? subject : "",
  message: "",
  consent: false,
});

export function ContactForm({ defaultSubject = "" }: { defaultSubject?: string }) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [values, setValues] = useState<ContactValues>(() => empty(defaultSubject));
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [clientErrors, setClientErrors] = useState<ContactErrors>({});
  const [startedAt, setStartedAt] = useState(0);
  const [done, setDone] = useState(false);
  const [lastState, setLastState] = useState(state);
  const formRef = useRef<HTMLFormElement>(null);

  // Record when the user could first interact (time-trap anti-spam).
  useEffect(() => {
    const t = window.setTimeout(() => setStartedAt(Date.now()), 0);
    return () => window.clearTimeout(t);
  }, []);

  // React to a new server result (adjusting state during render, per React guidance).
  if (state !== lastState) {
    setLastState(state);
    if (state.status === "success") setDone(true);
  }

  const serverErrors = state.status === "error" ? state.errors ?? {} : {};
  const errorFor = (f: ContactField) => clientErrors[f] ?? (touched[f] ? undefined : serverErrors[f]);

  function update<K extends keyof ContactValues>(field: K, value: ContactValues[K]) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field] || clientErrors[field]) {
      setClientErrors((e) => ({ ...e, [field]: validateField(field, next) }));
    }
  }

  function blur(field: ContactField) {
    setTouched((t) => ({ ...t, [field]: true }));
    setClientErrors((e) => ({ ...e, [field]: validateField(field, values) }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors = validateAll(values);
    setClientErrors(errors);
    setTouched(Object.fromEntries(FIELD_ORDER.map((f) => [f, true])));
    const first = FIELD_ORDER.find((f) => errors[f]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }
    const data = new FormData(e.currentTarget);
    startTransition(() => formAction(data));
  }

  function reset() {
    setValues(empty(defaultSubject));
    setTouched({});
    setClientErrors({});
    setStartedAt(Date.now());
    setDone(false);
  }

  const describedBy = (f: ContactField, hint = false) =>
    errorFor(f) ? `${f}-error` : hint ? `${f}-hint` : undefined;

  const errorCount = Object.values(clientErrors).filter(Boolean).length;

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <SuccessPanel key="success" onReset={reset} />
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          onSubmit={onSubmit}
          noValidate
          aria-describedby="form-status"
          exit={{ opacity: 0, y: -10 }}
          className="space-y-6"
        >
          <div id="form-status" aria-live="polite">
            {state.status === "error" && state.message && !errorCount && (
              <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {state.message}
              </div>
            )}
            {errorCount > 1 && (
              <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">
                Please correct {errorCount} fields below before sending.
              </p>
            )}
          </div>

          {/* Anti-spam: honeypot + timestamp */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
            </label>
          </div>
          <input type="hidden" name="startedAt" value={startedAt} />

          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="name" label="Full name" error={errorFor("name")}>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={LIMITS.name}
                className="field"
                placeholder="Your name"
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
                onBlur={() => blur("name")}
                aria-invalid={!!errorFor("name")}
                aria-describedby={describedBy("name")}
                aria-required
              />
            </Field>
            <Field id="email" label="Business email" error={errorFor("email")}>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={LIMITS.email}
                className="field"
                placeholder="name@company.com"
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
                onBlur={() => blur("email")}
                aria-invalid={!!errorFor("email")}
                aria-describedby={describedBy("email")}
                aria-required
              />
            </Field>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="company" label="Company" optional error={errorFor("company")}>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                maxLength={LIMITS.company}
                className="field"
                placeholder="Company name"
                value={values.company}
                onChange={(e) => update("company", e.target.value)}
                onBlur={() => blur("company")}
                aria-invalid={!!errorFor("company")}
                aria-describedby={describedBy("company")}
              />
            </Field>
            <Field id="subject" label="Subject" error={errorFor("subject")}>
              <div className="relative">
                <select
                  id="subject"
                  name="subject"
                  className={cn("field appearance-none pr-10", !values.subject && "text-muted")}
                  value={values.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  onBlur={() => blur("subject")}
                  aria-invalid={!!errorFor("subject")}
                  aria-describedby={describedBy("subject")}
                  aria-required
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  {subjects.map((s) => (
                    <option key={s.value} value={s.value} className="bg-ink-900 text-fg">
                      {s.label}
                    </option>
                  ))}
                </select>
                <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" fill="currentColor">
                  <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" />
                </svg>
              </div>
            </Field>
          </div>

          <Field id="message" label="Message" error={errorFor("message")} hint={`${values.message.trim().length} / ${LIMITS.message} characters · minimum ${LIMITS.messageMin}`}>
            <textarea
              id="message"
              name="message"
              rows={6}
              maxLength={LIMITS.message}
              className="field resize-y"
              placeholder="Tell us about your project, challenge, or idea…"
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              onBlur={() => blur("message")}
              aria-invalid={!!errorFor("message")}
              aria-describedby={describedBy("message", true)}
              aria-required
            />
          </Field>

          <div>
            <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-line-strong bg-ink-950 accent-electric"
                checked={values.consent}
                onChange={(e) => {
                  update("consent", e.target.checked);
                  setClientErrors((er) => ({ ...er, consent: validateField("consent", { ...values, consent: e.target.checked }) }));
                }}
                aria-invalid={!!errorFor("consent")}
                aria-describedby={describedBy("consent")}
                aria-required
              />
              <span>
                I agree that Onimitation Tech may use the information I provide to respond to my enquiry, as described in
                the{" "}
                <Link href="/privacy-policy" className="text-fg underline underline-offset-4 hover:text-aqua">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {errorFor("consent") && (
              <p id="consent-error" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-300">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {errorFor("consent")}
              </p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted">
              <span className="text-aqua">*</span> Required fields
            </p>
            <Button type="submit" size="lg" disabled={pending} aria-disabled={pending} className="w-full sm:w-auto">
              {pending ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </>
              )}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
