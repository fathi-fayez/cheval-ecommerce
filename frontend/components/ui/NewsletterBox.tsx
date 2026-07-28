"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setMessage("Thanks for subscribing! Your 20% offer is on the way.");
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 text-center sm:px-6 md:px-10 md:py-20">
      <h2 className="text-xl font-medium sm:text-2xl md:text-[28px]">
        Subscribe now &amp; get 20% off
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
        Join the Cheval list for new arrivals, limited editions, and exclusive
        fragrance stories delivered to your inbox.
      </p>

      <form
        onSubmit={onSubmit}
        className="mx-auto mt-8 flex w-full max-w-xl flex-col overflow-hidden border border-border sm:flex-row"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="w-full flex-1 px-4 py-3 text-sm outline-none placeholder:text-muted-light"
        />
        <button
          type="submit"
          className="bg-foreground px-8 py-3 text-xs font-medium tracking-widest text-background sm:text-sm"
        >
          SUBSCRIBE
        </button>
      </form>

      {message ? (
        <p className="mt-4 text-sm text-muted" role="status">
          {message}
        </p>
      ) : null}
    </section>
  );
}
