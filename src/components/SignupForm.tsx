"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface SignupFormProps {
  /** Analytics/segmentation source, e.g. "newsletter" or "membership". */
  source: string;
  /** POST target. When unset, the form succeeds optimistically (demo mode). */
  endpoint?: string;
  withName?: boolean;
  withMessage?: boolean;
  placeholder?: string;
  namePlaceholder?: string;
  messagePlaceholder?: string;
  submitLabel: string;
  successLabel: string;
  errorLabel: string;
  className?: string;
}

export function SignupForm({
  source,
  endpoint,
  withName = false,
  withMessage = false,
  placeholder = "Je e-mailadres",
  namePlaceholder = "Je naam",
  messagePlaceholder = "Bericht (optioneel)",
  submitLabel,
  successLabel,
  errorLabel,
  className = "",
}: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const invalid = !EMAIL_RE.test(email) || (withName && name.trim() === "");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (invalid || status === "submitting") return;
    setStatus("submitting");

    const payload = {
      email: email.trim(),
      ...(withName ? { name: name.trim() } : {}),
      ...(withMessage ? { message: message.trim() } : {}),
      source,
    };

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      } else {
        // Demo mode: no endpoint configured yet. Simulate a successful submit
        // so the UI is complete; wire NEXT_PUBLIC_*_ENDPOINT for real delivery.
        await new Promise((r) => setTimeout(r, 500));
      }
      track(`${source}_submit`, { hasName: withName });
      setStatus("success");
      setEmail("");
      setName("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        role="status"
        aria-live="polite"
        className={`font-mono text-sm text-paper ${className}`}
      >
        {successLabel}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`flex flex-col gap-3 ${className}`} noValidate>
      {withName && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={namePlaceholder}
          autoComplete="name"
          required
          className="w-full border border-line bg-transparent px-4 py-3 text-sm text-paper outline-none transition-colors placeholder:text-muted-2 focus:border-paper"
        />
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          autoComplete="email"
          required
          aria-invalid={status === "error"}
          className="w-full border border-line bg-transparent px-4 py-3 text-sm text-paper outline-none transition-colors placeholder:text-muted-2 focus:border-paper"
        />
        {!withMessage && (
          <button
            type="submit"
            disabled={invalid || status === "submitting"}
            data-cursor
            className="btn shrink-0 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "submitting" ? "..." : submitLabel}
          </button>
        )}
      </div>

      {withMessage && (
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={messagePlaceholder}
          rows={4}
          className="w-full resize-y border border-line bg-transparent px-4 py-3 text-sm text-paper outline-none transition-colors placeholder:text-muted-2 focus:border-paper"
        />
      )}

      {withMessage && (
        <button
          type="submit"
          disabled={invalid || status === "submitting"}
          data-cursor
          className="btn self-start disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "..." : submitLabel}
        </button>
      )}

      {status === "error" && (
        <p role="alert" className="font-mono text-xs text-red">
          {errorLabel}
        </p>
      )}
    </form>
  );
}
