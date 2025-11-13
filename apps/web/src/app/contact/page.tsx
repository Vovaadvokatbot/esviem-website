"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Відправка...");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Помилка запиту");
      }

      setStatus("Заявку відправлено успішно ✅");
      form.reset();
    } catch (err) {
      setStatus("Сталася помилка при відправці ❌");
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-xl px-4 py-12">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">Контакти</h1>
        <p className="mb-6 text-slate-700">
          Заповніть форму, і ми зв&apos;яжемось з вами.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Ім&apos;я
            </label>
            <input
              name="name"
              required
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Телефон
            </label>
            <input
              name="phone"
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Повідомлення
            </label>
            <textarea
              name="message"
              rows={4}
              className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Надіслати
          </button>
        </form>

        {status && (
          <p className="mt-4 text-sm text-slate-700" aria-live="polite">
            {status}
          </p>
        )}
      </div>
    </main>
  );
}
