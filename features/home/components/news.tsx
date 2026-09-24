"use client";

import { useEffect, useRef, useState } from "react";

interface Story {
  id: number;
  category: string;
  date: string;
  title: string;
  image: string;
  alt: string;
}

const featuredStory = {
  category: "Editorial",
  date: "12 Oct 2026",
  title: "The quiet power of African print on the global runway",
  excerpt:
    "From heritage textiles to modern silhouettes, this season's strongest collections are proving that bold, thoughtful storytelling belongs at the center of fashion.",
  image: "/images/news-featured.jpg",
  alt: "High fashion model walking runway in vibrant African couture",
  href: "#read-story",
};

const supportingStories: Story[] = [
  {
    id: 1,
    category: "Culture",
    date: "09 Oct 2026",
    title:
      "Why Lagos Fashion Week is still the most important stop on the continent",
    image: "/images/news-lagos-fashion-week.jpg",
    alt: "Models on the runway at Lagos Fashion Week",
  },
  {
    id: 2,
    category: "Design",
    date: "05 Oct 2026",
    title:
      "New talent, new textures, and the return of the statement silhouette",
    image: "/images/news-silhouette.jpg",
    alt: "Fashion designer showcasing structural statement silhouettes",
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
      className="bg-transparent w-full text-[var(--color-warm-neutral-1000)] overflow-hidden py-[var(--spacing-15)] lg:py-[var(--spacing-30)] px-[var(--spacing-5)] lg:px-[var(--spacing-25)]"
    >
      <div className="flex flex-col gap-12 lg:gap-[72px] items-center w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center w-full gap-4">
          <p
            className={`text-[var(--color-warm-neutral-500)] text-xs tracking-[0.1em] uppercase font-sans font-medium m-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
            }`}
          >
            ( LATEST STORIES )
          </p>
          <div className="overflow-hidden">
            <h2
              className={`uppercase m-0 transition-all duration-1000 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
              }`}
            >
              NEWS
            </h2>
          </div>
        </div>

        {/* Featured Main Story */}
        <article className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start w-full">
          {/* Featured Image */}
          <div
            className={`w-full lg:w-[54%] xl:w-[680px] 2xl:w-[740px] aspect-square shrink-0 rounded-[var(--radius-2xl)] overflow-hidden shadow-sm bg-[var(--color-warm-neutral-200)] transition-all duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 motion-reduce:scale-100 motion-reduce:opacity-100"
            }`}
          >
            <img
              src={featuredStory.image}
              alt={featuredStory.alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.03]"
            />
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
            <span className="text-[var(--color-warm-neutral-500)] text-xs font-sans">
              {featuredStory.date}
            </span>

            {/* Headline — semantic h5: 40px mobile -> 56px desktop */}
            <h5 className="m-0 tracking-tight text-[var(--color-warm-neutral-1000)]">
              {featuredStory.title}
            </h5>

            {/* Excerpt */}
            <p className="text-[var(--color-warm-neutral-600)] font-sans text-base leading-relaxed m-0">
              {featuredStory.excerpt}
            </p>

            {/* Read Story Link */}
            <a
              href={featuredStory.href}
              className="flex gap-2.5 items-center group cursor-pointer pt-2 text-[var(--color-magenta-600)] transition-colors duration-200"
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
          <div className="bg-[var(--color-warm-neutral-200)] h-px w-full" />

          {supportingStories.map((story, idx) => (
            <div key={story.id}>
              <article
                className={`flex flex-row gap-4 sm:gap-8 items-center justify-between py-6 sm:py-8 group cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
                  <span className="text-[var(--color-warm-neutral-500)] text-xs font-sans">
                    {story.date}
                  </span>

                  {/* Headline — semantic h6: 32px mobile & desktop */}
                  <h6 className="m-0 tracking-tight text-[var(--color-warm-neutral-1000)] group-hover:text-[var(--color-magenta-600)] transition-colors duration-300">
                    {story.title}
                  </h6>
                </div>

                {/* Story Thumbnail */}
                <div className="w-[120px] sm:w-[220px] h-[85px] sm:h-[140px] shrink-0 rounded-[var(--radius-xl)] overflow-hidden shadow-sm bg-[var(--color-warm-neutral-200)]">
                  <img
                    src={story.image}
                    alt={story.alt}
                    className="w-full h-full object-cover transition-transform duration-500 [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.05]"
                  />
                </div>
              </article>
              <div className="bg-[var(--color-warm-neutral-200)] h-px w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
