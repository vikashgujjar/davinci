"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useActionState, useRef, useState, type FormEvent } from "react";
import { submitInquiry } from "@/app/actions/contact";
import { buttonClass } from "@/components/ui/Button";
import { validateContact, type ContactField, type ContactState, type ContactValues } from "@/lib/contact-schema";

const EMPTY: ContactValues = { fullName: "", company: "", email: "", phone: "", message: "" };
const initial: ContactState = { status: "idle" };

const fields: { name: ContactField; label: string; type?: string; autoComplete: string; optional?: boolean; half?: boolean; placeholder: string }[] = [
  { name: "fullName", label: "Full Name", autoComplete: "name", half: true, placeholder: "Jane Smith" },
  { name: "company", label: "Company Name", autoComplete: "organization", half: true, placeholder: "Your company" },
  { name: "email", label: "Work Email", type: "email", autoComplete: "email", half: true, placeholder: "name@company.com" },
  { name: "phone", label: "Phone Number", type: "tel", autoComplete: "tel", optional: true, half: true, placeholder: "+00 000 000 0000" },
];

/** Remounting via `key` resets the action state for "send another inquiry". */
export function ContactForm() {
  const [formKey, setFormKey] = useState(0);
  return <InquiryForm key={formKey} onReset={() => setFormKey((k) => k + 1)} />;
}

function InquiryForm({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(submitInquiry, initial);
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [clientErrors, setClientErrors] = useState<Partial<Record<ContactField, string>>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const update = (name: ContactField, value: string) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setClientErrors(validateContact(next));
  };

  const blur = (name: ContactField) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setClientErrors(validateContact(values));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const errs = validateContact(values);
    setClientErrors(errs);
    setTouched({ fullName: true, company: true, email: true, phone: true, message: true });
    if (Object.keys(errs).length > 0) {
      e.preventDefault();
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  };

  // Client errors take precedence; server-side errors are shown as a fallback.
  const errorFor = (n: ContactField) => (touched[n] ? clientErrors[n] : undefined) ?? (state.status === "error" ? state.errors?.[n] : undefined);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state.status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            className="flex min-h-[460px] flex-col items-center justify-center rounded-[28px] border border-electric/20 bg-sky/60 p-10 text-center"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-electric text-white shadow-glow">
              <CheckCircle2 className="size-8" aria-hidden />
            </span>
            <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-deep">Inquiry sent</h3>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">{state.message}</p>
            <button type="button" onClick={onReset} className={buttonClass("secondary", "md", "mt-8")}>
              Send another inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            action={formAction}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-[28px] border border-deep/[0.08] bg-white p-6 shadow-float sm:p-9"
            aria-describedby={state.status === "error" ? "form-status" : undefined}
          >
            {/* honeypot */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((f) => (
                <Field
                  key={f.name}
                  {...f}
                  value={values[f.name]}
                  error={errorFor(f.name)}
                  onChange={(v) => update(f.name, v)}
                  onBlur={() => blur(f.name)}
                />
              ))}
              <div className="sm:col-span-2">
                <Label htmlFor="message" label="Message" />
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  onBlur={() => blur("message")}
                  aria-invalid={!!errorFor("message")}
                  aria-describedby={errorFor("message") ? "message-error" : undefined}
                  placeholder="Tell us about your team and your current survey drafting workflow…"
                  className={inputClass(!!errorFor("message"), "resize-y py-3.5")}
                />
                <FieldError id="message-error" error={errorFor("message")} />
              </div>
            </div>

            <AnimatePresence>
              {state.status === "error" && state.message && (
                <motion.p
                  id="form-status"
                  role="alert"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 flex items-center gap-2 rounded-xl border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger"
                >
                  <AlertCircle className="size-4 shrink-0" aria-hidden />
                  {state.message}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="mt-7 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted">We&apos;ll only use your details to respond to your inquiry.</p>
              <button type="submit" disabled={pending} className={buttonClass("primary", "lg", "w-full sm:w-auto")}>
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <span>Send Inquiry</span>
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </>
                )}
              </button>
            </div>
            <span className="sr-only" aria-live="polite">
              {pending ? "Sending your inquiry" : ""}
            </span>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputClass(invalid: boolean, extra = "") {
  return `block w-full rounded-xl border bg-mist/60 px-4 text-[15px] text-ink placeholder:text-muted/60 transition-[border-color,box-shadow,background-color] duration-300 focus:bg-white focus:outline-none focus:ring-4 ${
    invalid ? "border-danger/60 focus:border-danger focus:ring-danger/10" : "border-deep/10 hover:border-deep/20 focus:border-electric focus:ring-electric/15"
  } ${extra}`;
}

function Label({ htmlFor, label, optional }: { htmlFor: string; label: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-center justify-between text-[13px] font-medium text-deep">
      {label}
      {optional && <span className="text-xs font-normal text-muted">Optional</span>}
    </label>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p id={id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
          <AlertCircle className="size-3.5" aria-hidden />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function Field({
  name,
  label,
  type = "text",
  autoComplete,
  optional,
  placeholder,
  value,
  error,
  onChange,
  onBlur,
}: {
  name: ContactField;
  label: string;
  type?: string;
  autoComplete: string;
  optional?: boolean;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <Label htmlFor={name} label={label} optional={optional} />
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={!optional}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass(!!error, "h-12")}
      />
      <FieldError id={`${name}-error`} error={error} />
    </div>
  );
}
