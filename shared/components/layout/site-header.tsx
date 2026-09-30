"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const [isDarkTheme, setIsDarkTheme] = useState(pathname === "/contact");

  useEffect(() => {
    // Contact page is permanently light
    if (pathname === "/contact") {
      setIsDarkTheme(true);
      return;
    }

    let ticking = false;

    const checkTheme = () => {
      const probeY = 55; // Vertical coordinate of the fixed navbar logo
      const lightSections = document.querySelectorAll<HTMLElement>('[data-header-theme="light"]');
      let isOverLight = false;

      for (let i = 0; i < lightSections.length; i++) {
        const rect = lightSections[i].getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          isOverLight = true;
          break;
        }
      }

      setIsDarkTheme(isOverLight);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkTheme();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check on mount
    checkTheme();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Optional sync with Lenis instance if available
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.on("scroll", onScroll);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (lenis) {
        lenis.off("scroll", onScroll);
      }
    };
  }, [pathname]);

  return (
    <header
      id="site-header"
      className="
        fixed top-0 left-0 right-0 z-40
        flex items-center justify-center
        pt-6 lg:pt-8 px-[var(--spacing-5)] lg:px-[var(--spacing-25)]
        pointer-events-auto
        bg-transparent
      "
    >
      {/* Logo Container with Smooth Dual-Layer Crossfade */}
      <Link
        href="/"
        aria-label="Project Runway Africa — Home"
        className="shrink-0 relative flex items-center w-[120px] lg:w-[160px] aspect-[664/212]"
      >
        {/* White Logo (For Dark Canvas) */}
        <Image
          src="/logo/pra-logo-white.png"
          alt="Project Runway Africa"
          fill
          sizes="(max-width: 1024px) 120px, 160px"
          className={`object-contain transition-opacity duration-300 pointer-events-none ${
            isDarkTheme ? "opacity-0" : "opacity-100"
          }`}
          priority
        />
        {/* Black Logo (For Light Canvas) */}
        <Image
          src="/logo/pra-loho-black.png"
          alt="Project Runway Africa"
          fill
          sizes="(max-width: 1024px) 120px, 160px"
          className={`object-contain transition-opacity duration-300 pointer-events-none ${
            isDarkTheme ? "opacity-100" : "opacity-0"
          }`}
          priority
        />
      </Link>

      {/* Nav Links (Temporarily commented out)
      <nav aria-label="Primary navigation">
        <ul className="flex items-center gap-8 list-none m-0 p-0">
          {[
            { href: "/", label: "Home" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`
                    font-display text-3xl font-normal uppercase leading-none
                    transition-all duration-200
                    relative after:absolute after:bottom-[-4px] after:left-0 after:h-px after:bg-[var(--color-plum-900)]
                    after:transition-all after:duration-300
                    ${
                      isActive
                        ? "text-[var(--color-plum-900)] after:w-full"
                        : "text-[var(--color-plum-900)]/70 hover:text-[var(--color-plum-900)] after:w-0 hover:after:w-full"
                    }
                  `}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      */}
    </header>
  );
}
