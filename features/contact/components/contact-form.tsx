"use client";

import { useState } from "react";
import { motion } from "motion/react";

export function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
    setSelectedTopics([]);
    setTimeout(() => setStatus("idle"), 5000);
  };

  // Shared class strings — single source of truth for the form's editorial underline style
  const fieldLabel = "font-sans text-xs uppercase font-bold tracking-wider text-[var(--color-mono-900)]";
  const fieldInput = "w-full bg-transparent border-0 border-b border-[var(--color-mono-300)] pb-3 pt-1 text-sm sm:text-base font-sans text-[var(--color-mono-1000)] placeholder:text-[#9ca3af] outline-none rounded-none transition-colors duration-200 focus:border-[var(--color-mono-1000)]";
  const fieldCheckbox = "w-4 h-4 rounded border-[var(--color-mono-400)] text-[var(--color-plum-900)] accent-[var(--color-brand-yellow)] cursor-pointer";

  return (
    <section className="w-full bg-white text-[var(--color-mono-1000)] px-[var(--spacing-5)] lg:px-[var(--spacing-25)] py-[var(--spacing-15)] lg:py-[var(--spacing-30)] overflow-hidden">
      <div className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-16">
        {/* Left Column: Eyebrow, Display Headline & Response Timeline */}
        <div className="flex flex-col justify-between w-full lg:max-w-[660px] xl:max-w-[720px] shrink-0 gap-10 lg:gap-0 lg:py-1">
          {/* Eyebrow & Headline */}
          <div className="flex flex-col gap-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-mono-500)] m-0"
            >
              WRITE TO US
            </motion.p>

            <h2 className="uppercase font-display font-normal text-5xl lg:text-8xl-5 leading-[var(--leading-h2-mobile)] lg:leading-[var(--leading-h2-desktop)] tracking-tight m-0 text-[var(--color-mono-1000)] flex flex-col items-start select-none">
              <span className="overflow-hidden inline-block pb-[0.12em] -mb-[0.12em]">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  START A
                </motion.span>
              </span>
              <span className="overflow-hidden inline-block pb-[0.12em] -mb-[0.12em]">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  CONVERSATION
                </motion.span>
              </span>
            </h2>
          </div>

          {/* Response commitment note at bottom */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-xs sm:text-sm text-[var(--color-mono-500)] leading-relaxed max-w-[280px] m-0"
          >
            Our team typically responds within two working days.
          </motion.p>
        </div>

        {/* Right Column: Editorial Underline Form */}
        <div className="w-full lg:max-w-[520px] xl:max-w-[560px] flex-1">
          {status === "success" ? (
            <div className="py-12 flex flex-col gap-4">
              <h3 className="font-display font-normal text-3xl sm:text-4xl uppercase tracking-tight text-[var(--color-warm-neutral-1000)] m-0">
                Message Received
              </h3>
              <p className="font-sans text-sm sm:text-base text-[var(--color-warm-neutral-600)] m-0">
                Thank you for reaching out. We&apos;ve received your note and will be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 sm:gap-10 w-full" noValidate>
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 w-full">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className={fieldLabel}>FIRST NAME</label>
                  <input id="firstName" name="firstName" type="text" required value={form.firstName} onChange={handleChange} placeholder="Ada" className={fieldInput} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className={fieldLabel}>LAST NAME</label>
                  <input id="lastName" name="lastName" type="text" required value={form.lastName} onChange={handleChange} placeholder="Okafor" className={fieldInput} />
                </div>
              </div>

              {/* Row 2: Email Address */}
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="email" className={fieldLabel}>EMAIL ADDRESS</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="ada@studio.com" className={fieldInput} />
              </div>

              {/* Row 3: Topic / Contact Purpose (Checkboxes) */}
              <div className="flex flex-col gap-3 w-full">
                <span className={fieldLabel}>I AM CONTACTING ABOUT</span>
                <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-1">
                  {(["General Inquiry", "Partnership"] as const).map((topic) => (
                    <label key={topic} className="inline-flex items-center gap-3 cursor-pointer group select-none">
                      <input
                        type="checkbox"
                        name={`topic-${topic.toLowerCase().replace(" ", "-")}`}
                        checked={selectedTopics.includes(topic)}
                        onChange={() => handleTopicToggle(topic)}
                        className={fieldCheckbox}
                      />
                      <span className="font-sans text-sm sm:text-base text-[var(--color-warm-neutral-800)] group-hover:text-black transition-colors">
                        {topic}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Row 4: Message */}
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="message" className={fieldLabel}>MESSAGE</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us what you have in mind..."
                  className={`${fieldInput} resize-none leading-relaxed min-h-[110px] pt-2`}
                />
              </div>

              {/* Row 5: Action Button (HomeHero style: btn btn-primary btn-lg) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn btn-primary btn-lg btn-calypso transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                >
                  <span>{status === "submitting" ? "Sending…" : "Send message"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
