"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();

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
      {/* Logo */}
      <Link href="/" aria-label="Project Runway Africa — Home" className="shrink-0 flex items-center">
        <Image
          src="/logo/project-runway-logo.svg"
          alt="Project Runway Africa"
          width={160}
          height={44}
          className="w-[120px] lg:w-[160px] h-auto object-contain"
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
