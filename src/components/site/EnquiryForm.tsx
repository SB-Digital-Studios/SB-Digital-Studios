import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { enquiryOptions } from "@/lib/site/data";
import { cta } from "./ui";

/** PHP mailer endpoint (public/api/contact.php on the Apache host). Override with VITE_CONTACT_ENDPOINT. */
const CONTACT_ENDPOINT = (import.meta.env['VITE_CONTACT_ENDPOINT'] as string | undefined) || "/api/contact.php";
const RECAPTCHA_SITE_KEY = import.meta.env['VITE_RECAPTCHA_SITE_KEY'] as string | undefined;

// Mirrors the validation in public/api/contact.php so visitors see errors before sending.
const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  phone: z.string().trim().max(30).optional(),
  service: z.string().trim().min(2, "Please tell us the service you need.").max(80),
  message: z.string().trim().min(10, "Please share a bit more about your project.").max(2000),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree so we can reply." }) }),
});

declare global {
  interface Window {
    grecaptcha?: { ready: (cb: () => void) => void; execute: (key: string, opts: { action: string }) => Promise<string> };
  }
}

function loadRecaptcha(key: string): Promise<void> {
  if (window.grecaptcha) return new Promise((r) => window.grecaptcha!.ready(r));
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(key)}`;
    s.async = true;
    s.onload = () => window.grecaptcha!.ready(resolve);
    s.onerror = () => reject(new Error("Security check failed to load."));
    document.head.appendChild(s);
  });
}

async function sendViaMailer(fd: FormData): Promise<{ ok: boolean; message?: string | undefined }> {
  if (RECAPTCHA_SITE_KEY) {
    await loadRecaptcha(RECAPTCHA_SITE_KEY);
    const token = await window.grecaptcha!.execute(RECAPTCHA_SITE_KEY, { action: "contact_form_submit" });
    fd.set("recaptcha_token", token);
  }
  const res = await fetch(CONTACT_ENDPOINT, { method: "POST", body: fd, headers: { Accept: "application/json" } });
  const payload = (await res.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
  return { ok: res.ok && !!payload?.ok, message: payload?.message };
}

const field =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

export function EnquiryForm({ source, compact, defaultService }: { source: string; compact?: boolean; defaultService?: string | undefined }) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: (fd.get("phone") as string) || undefined,
      service: fd.get("service") ?? "",
      message: fd.get("message") ?? "",
      consent: fd.get("consent") === "on",
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    setError(null);
    setState("sending");
    const d = parsed.data;

    // Include phone and source page in the emailed message (the mailer has no separate fields for them).
    const mailFd = new FormData();
    mailFd.set("name", d.name);
    mailFd.set("email", d.email);
    mailFd.set("service", d.service);
    mailFd.set("message", `${d.message}${d.phone ? `\n\nPhone: ${d.phone}` : ""}\n\nSent from: ${source}`);
    mailFd.set("company_hp", (fd.get("company_hp") as string) ?? "");

    const dbInsert = supabase
      ? supabase.from("enquiries").insert({
          name: d.name,
          email: d.email,
          phone: d.phone ?? null,
          service: d.service,
          message: d.message,
          consent: d.consent,
          source_page: source,
        })
      : Promise.resolve({ error: null });

    const [mail, db] = await Promise.allSettled([sendViaMailer(mailFd), dbInsert]);

    const mailed = mail.status === "fulfilled" && mail.value.ok;
    const stored = db.status === "fulfilled" && !db.value.error;
    if (!mailed && !stored) {
      setState("idle");
      const msg = mail.status === "fulfilled" ? mail.value.message : undefined;
      setError(msg || "Sorry, that didn't send. Please email hello@sbdigitalstudios.co.uk instead.");
      return;
    }
    setState("done");
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-highlight/40 bg-card p-8 text-center">
        <h3 className="text-2xl font-bold">Thanks, message received.</h3>
        <p className="mt-2 text-muted-foreground">Spencer will get back to you within one working day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-border bg-card p-6 md:p-8" noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" placeholder="Your name" aria-label="Your name" className={field} required maxLength={100} />
        <input name="email" type="email" placeholder="Email" aria-label="Email" className={field} required maxLength={255} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="phone" type="tel" placeholder="Phone (optional)" aria-label="Phone" className={field} maxLength={30} />
        <select name="service" aria-label="I'm looking for" defaultValue={defaultService ?? ""} className={field} required>
          <option value="">I'm looking for…</option>
          {enquiryOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <textarea name="message" rows={compact ? 2 : 4} placeholder="Tell me a little about your project" aria-label="Message" className={field} required maxLength={2000} />
      {/* Honeypot checked by contact.php */}
      <input type="text" name="company_hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <label className="flex items-start gap-3 text-xs text-muted-foreground">
        <input type="checkbox" name="consent" className="mt-0.5 accent-primary" />
        <span>
          I agree to SB Digital Studios using these details to reply to my enquiry, as set out in the{" "}
          <Link to="/privacy" className="text-primary underline">privacy policy</Link>.
        </span>
      </label>
      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
      <button type="submit" disabled={state === "sending"} className={cta({ size: "lg" }) + " w-full"}>
        {state === "sending" ? "Sending…" : "Book my free call"}
      </button>
    </form>
  );
}
