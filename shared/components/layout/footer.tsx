"use client";

import { useState } from "react";
import { Linkedin, Instagram } from "lucide-react";

export function Footer() {
  // Newsletter state (commented out with newsletter section)
  // const [email, setEmail] = useState("");
  // const [subscribed, setSubscribed] = useState(false);

  // const handleSubscribe = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (email.trim()) {
  //     setSubscribed(true);
  //     setTimeout(() => setSubscribed(false), 3000);
  //     setEmail("");
  //   }
  // };

  return (
    <footer className="bg-[var(--color-plum-900)] w-full text-white overflow-hidden pt-[var(--spacing-15)] lg:pt-[var(--spacing-30)] pb-[var(--spacing-10)] lg:pb-[var(--spacing-15)] px-[var(--spacing-5)] lg:px-[var(--spacing-25)]">
      <div className="flex flex-col gap-10 lg:gap-[60px] w-full">
        {/* Top Zone - Sponsorship & Action (Moved down to column below) */}
        {/*
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between w-full gap-6 sm:gap-8">
          <h2 className="font-display font-normal text-4xl lg:text-h4-desktop leading-[var(--leading-feature)] lg:leading-[var(--leading-h4-desktop)] text-white w-full max-w-[680px] m-0">
            For Sponsorship &<br />
            Partnership
          </h2>

          <a
            href="mailto:info@projectrunwayafrica.com"
            className="btn btn-lg btn-calypso bg-[var(--color-brand-yellow)] hover:bg-[#e0b400] text-[var(--color-plum-900)] font-semibold transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Contact Us</span>
          </a>
        </div>

        <div className="bg-[var(--color-brand-yellow)]/20 h-px w-full" />
        */}

        {/* Bottom Zone - 3 Columns */}
        <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-10 lg:gap-8 pt-2 lg:pt-4">
          {/* Brand Column */}
          <div className="w-full lg:w-[320px] shrink-0">
            <div className="w-[240px] sm:w-[300px] lg:w-[320px] h-auto">
              <img
                src="/logo/project-runway-logo.svg"
                alt="Project Runway Africa Logo"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Sponsorship Column (Replaced Newsletter Column) */}
          <div className="w-full lg:w-[420px] shrink-0 flex flex-col gap-6 sm:gap-7">
            <h2 className="font-display font-normal text-[30px] sm:text-[38px] lg:text-[48px] leading-tight lg:leading-[54px] text-white max-w-[420px] m-0">
              For Sponsorship & Partnership
            </h2>

            <div>
              <a
                href="mailto:info@projectrunwayafrica.com"
                className="btn btn-lg btn-calypso bg-[var(--color-brand-yellow)] hover:bg-[#e0b400] text-[var(--color-plum-900)] [--calypso-fill:var(--color-action-primary)] font-semibold transition-all duration-300 hover:scale-[1.02] inline-flex items-center"
              >
                <span>Contact Us</span>
              </a>
            </div>
          </div>

          {/* Newsletter Column (Commented Out) */}
          {/*
          <div className="w-full lg:w-[460px] xl:w-[480px] shrink-0 flex flex-col gap-6 sm:gap-7">
            <p className="text-[var(--color-brand-yellow)] text-xs sm:text-sm uppercase font-semibold font-sans tracking-wider m-0">
              Newsletter
            </p>

            <p className="text-2xl sm:text-3xl font-display font-normal text-white leading-snug sm:leading-[40px] m-0">
              Stay in the loop for exclusive sneak peeks, behind-the-scenes magic
              and everything Runway.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-center w-full gap-3 sm:gap-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="h-[56px] px-5 rounded-[var(--radius-button)] bg-white/5 border border-white/20 text-white placeholder-white/40 text-sm outline-none focus:border-[var(--color-action-primary)] transition-colors w-full sm:w-[320px]"
              />
              <button
                type="submit"
                className="btn btn-primary btn-lg transition-all duration-300 hover:scale-[1.02] shrink-0"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
          </div>
          */}

          {/* Social Column */}
          <div className="w-full lg:w-auto shrink-0 flex flex-col gap-4 sm:gap-5">
            <p className="text-[var(--color-brand-yellow)] text-xs sm:text-sm uppercase font-semibold font-sans tracking-wider m-0">
              Follow
            </p>

            <div className="flex gap-6 items-center text-white/80">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-white transition-colors cursor-pointer"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/projectrunway.africa/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white transition-colors cursor-pointer"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full text-xs text-white/30 pt-8 border-t border-white/10 gap-4 sm:gap-0 font-sans">
          <p className="m-0">© Project Runway Africa. All rights reserved.</p>
          <a
            href="#privacy"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
