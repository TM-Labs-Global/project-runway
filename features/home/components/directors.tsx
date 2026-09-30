import Image from "next/image";

interface Producer {
  id: number;
  image: string;
  name: string;
  bio: string;
  objectPosition?: string;
}

const producers: Producer[] = [
  {
    id: 1,
    image: "/images/mr-elijah.jpg",
    name: "Elijah Affi",
    bio: "Elijah Affi is a celebrated Executive Producer, Creative Director, and Co-Founder of Takeout Media, known for his innovative approach to media production. He served as Executive Producer for Tokunbo, a Netflix #1 film, and collaborates with top-tier organizations like the World Bank and TotalEnergies as a certified management consultant. Driven by a passion for impactful storytelling, Elijah continues to push creative boundaries and elevate global entertainment standards.",
    objectPosition: "center 25%",
  },
  {
    id: 2,
    image: "/images/chichi-nwoko-compressed.png",
    name: "Chichi Nwoko",
    bio: "Founder & CEO of THE WHAT Network. With two decades of industry brilliance, she’s worked at top US networks affliates including ABC, CBS, NBC, and FOX TV. Chichi has spearheaded iconic franchises like Idols Nigeria and Nigeria’s Got Talent. Her knack for creating hit shows proves one thing: she knows how to make magic happen.",
    objectPosition: "center 22%",
  },
];

function ProducerCard({
  image,
  name,
  bio,
  objectPosition = "center 25%",
}: Producer) {
  return (
    <article className="flex flex-col text-left group">
      {/* Portrait Photo Frame with Subtle Hover Zoom */}
      <div className="relative w-full aspect-[3/4] max-h-[520px] rounded-[var(--radius-xl)] lg:rounded-[var(--radius-2xl)] overflow-hidden bg-[var(--color-mono-100)]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectPosition }}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>

      {/* Producer Editorial Details */}
      <div className="pt-6 text-left">
        <h4
          style={{ color: "var(--color-directors-title, var(--color-mono-1000))" }}
          className="font-display font-normal text-4xl lg:text-h4-desktop tracking-tight leading-[var(--leading-feature)] lg:leading-[var(--leading-h4-desktop)] m-0"
        >
          {name}
        </h4>
        {bio && (
          <p
            style={{ color: "var(--color-directors-bio, var(--color-mono-600))" }}
            className="font-sans text-base leading-relaxed mt-4 m-0"
          >
            {bio}
          </p>
        )}
      </div>
    </article>
  );
}

export function Directors() {
  return (
    <section
      aria-labelledby="directors-heading"
      data-header-theme="light"
      /* Background is dynamically managed by SmoothBackgroundSequence as var(--color-intro-canvas) (#F5F3EE), matching get-ready.tsx */
      className="w-full bg-transparent py-[var(--spacing-15)] lg:py-[var(--spacing-30)] px-[var(--spacing-5)] lg:px-[var(--spacing-25)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_1fr] xl:grid-cols-[280px_1fr_1fr] gap-10 lg:gap-12 xl:gap-16 items-start w-full">
        {/* Section Headline Column */}
        <div className="flex flex-col items-start pt-1">
          <h2
            id="directors-heading"
            style={{ color: "var(--color-directors-heading, var(--color-mono-600))" }}
            className="font-sans font-semibold text-lg sm:text-xl lg:text-2xl uppercase tracking-[2px] leading-snug m-0"
          >
            <div>Executive</div>
            <div>Producers</div>
          </h2>
        </div>

        {/* Executive Producer Cards */}
        {producers.map((p) => (
          <ProducerCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
}
