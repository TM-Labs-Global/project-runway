"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Story {
  id: number;
  category: string;
  date: string;
  title: string;
  image: string;
  alt: string;
  href: string;
  imagePosition?: string;
  objectPosition?: string;
}

const featuredStory = {
  category: "The Hollywood Reporter",
  date: "02 Dec 2024",
  title: "‘Project Runway’ to Launch African Edition in 2025",
  excerpt:
    "A new edition of the hit fashion design competition show, Project Runway Africa, is set to launch next year, showcasing emerging African designer talent from across the continent.",
  image: "/images/new-pr-images/female-model-in-flowery-dress.jpg",
  alt: "‘Project Runway’ to Launch African Edition in 2025 - The Hollywood Reporter",
  href: "https://www.hollywoodreporter.com/tv/tv-news/project-runway-africa-2025-1236074710/",
};

const supportingStories: Story[] = [
  {
    id: 1,
    category: "World Screen",
    date: "03 Dec 2024",
    title: "Project Runway Africa Coming in 2025",
    image: "/images/new-pr-images/two-male-models-against-a-red-wall.jpg",
    alt: "Project Runway Africa Coming in 2025 - World Screen",
    href: "https://worldscreen.com/tvformats/project-runway-africa-coming-in-2025/",
    objectPosition: "center 22%",
  },
  {
    id: 2,
    category: "C21Media",
    date: "03 Dec 2024",
    title:
      "Takeout Media and What Network to fashion African version of Project Runway",
    image: "/images/new-pr-images/pr-cast-and-crew.jpg",
    alt: "Takeout Media and What Network to fashion African version of Project Runway - C21Media",
    href: "https://www.c21media.net/news/takeout-media-and-what-network-to-fashion-african-version-of-project-runway/",
    imagePosition: "object-center",
  },
];

export function News() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-header-theme="light"
      /* Background is dynamically managed by SmoothBackgroundSequence as var(--color-intro-canvas) (#F5F3EE), matching get-ready.tsx */
      className="bg-transparent w-full text-[var(--color-mono-1000)] overflow-hidden py-[var(--spacing-15)] lg:py-[var(--spacing-30)] px-[var(--spacing-5)] lg:px-[var(--spacing-25)]"
    >
      <div className="flex flex-col gap-12 lg:gap-[72px] items-center w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center w-full">
          <div className="overflow-hidden">
            <h2
              className={`text-5xl lg:text-[clamp(3.5rem,6vw,7rem)] m-0 transition-all duration-1000 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
              }`}
            >
              News
            </h2>
          </div>
        </div>

        {/* Featured Main Story */}
        <article className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start w-full">
          {/* Featured Image */}
          <div
            className={`w-full lg:w-[54%] xl:w-[680px] 2xl:w-[740px] aspect-square shrink-0 overflow-hidden shadow-sm border border-[var(--color-mono-200)] bg-[var(--color-mono-100)] transition-all duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 motion-reduce:scale-100 motion-reduce:opacity-100"
            }`}
          >
            <a
              href={featuredStory.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mono-400)]"
            >
              <Image
                src={featuredStory.image}
                alt={featuredStory.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover transition-transform duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.03]"
              />
            </a>
          </div>

          {/* Featured Copy Column */}
          <div
            className={`flex-1 flex flex-col gap-6 items-start pt-0 lg:pt-8 w-full transition-all duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
            }`}
          >
            {/* Metadata */}
            <span className="text-[var(--color-mono-500)] text-xs font-sans font-medium uppercase tracking-wider">
              {featuredStory.category} • {featuredStory.date}
            </span>

            {/* Headline — semantic h5: 40px mobile -> 56px desktop */}
            <h5 className="m-0 tracking-tight text-[var(--color-mono-1000)]">
              <a
                href={featuredStory.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-mono-600)] transition-colors duration-300"
              >
                {featuredStory.title}
              </a>
            </h5>

            {/* Excerpt */}
            <p className="text-[var(--color-mono-600)] font-sans text-base leading-relaxed m-0">
              {featuredStory.excerpt}
            </p>

            {/* Read Story Link */}
            <a
              href={featuredStory.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2.5 items-center group cursor-pointer pt-2 text-[var(--color-mono-600)] hover:text-[var(--color-mono-1000)] transition-colors duration-200"
            >
              <span className="text-sm font-medium font-sans group-hover:underline">
                Read story
              </span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3.33334 8H12.6667M12.6667 8L8.00001 3.33334M12.6667 8L8.00001 12.6667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </article>

        {/* Supporting Stories List */}
        <div className="flex flex-col w-full pt-4">
          <div className="bg-[var(--color-mono-200)] h-px w-full" />

          {supportingStories.map((story, idx) => (
            <div key={story.id}>
              <a
                href={story.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mono-400)]"
              >
                <article
                  className={`flex flex-row gap-4 sm:gap-8 items-center justify-between py-6 sm:py-8 cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
                  }`}
                  style={{
                    transitionDelay: `${(idx + 4) * 100}ms`,
                  }}
                >
                  {/* Story Info */}
                  <div className="flex flex-col gap-2.5 sm:gap-3 items-start flex-1 min-w-0 pr-2 sm:pr-4">
                    <span className="text-[var(--color-mono-500)] text-xs font-sans font-medium uppercase tracking-wider">
                      {story.category} • {story.date}
                    </span>

                    {/* Headline — semantic h6: 32px mobile & desktop */}
                    <h6 className="m-0 tracking-tight text-[var(--color-mono-1000)] group-hover:text-[var(--color-mono-600)] transition-colors duration-300">
                      {story.title}
                    </h6>
                  </div>

                  {/* Story Thumbnail */}
                  <div className="relative w-[120px] sm:w-[220px] h-[85px] sm:h-[140px] shrink-0 overflow-hidden shadow-sm border border-[var(--color-mono-200)] bg-[var(--color-mono-100)]">
                    <Image
                      src={story.image}
                      alt={story.alt}
                      fill
                      sizes="(max-width: 640px) 120px, 220px"
                      style={story.objectPosition ? { objectPosition: story.objectPosition } : undefined}
                      className={`object-cover ${
                        story.imagePosition || "object-center"
                      } transition-transform duration-500 [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.05]`}
                    />
                  </div>
                </article>
              </a>
              <div className="bg-[var(--color-mono-200)] h-px w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
