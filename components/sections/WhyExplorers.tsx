import Image from "next/image";

const showcaseImages = [
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
];

export default function WhyExplorers() {
  const highlights = [
    "Since 2001, trusted by families, schools, corporates, and trekking communities.",
    "Programs designed with equal focus on adventure quality, safety systems, and communication.",
    "A diverse calendar spanning weekend treks, camps, wildlife, Himalayan journeys, and training.",
    "Strong local execution with experienced leaders, route planning, and on-ground coordination."
  ];

  return (
    <section id="why-explorers" className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="relative min-h-[460px]">
          <div className="absolute left-0 top-0 h-[70%] w-[72%] overflow-hidden rounded-[2.4rem] bg-white p-3 shadow-[0_26px_70px_rgba(97,68,39,0.12)]">
            <div className="relative h-full overflow-hidden rounded-[1.8rem]">
              <Image
                src={showcaseImages[0]}
                alt="Explorers trail"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute bottom-0 right-0 h-[52%] w-[48%] overflow-hidden rounded-[2.2rem] bg-white p-3 shadow-[0_26px_70px_rgba(97,68,39,0.12)]">
            <div className="relative h-full overflow-hidden rounded-[1.7rem]">
              <Image
                src={showcaseImages[1]}
                alt="Explorers destination"
                fill
                sizes="(max-width: 1024px) 60vw, 24vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute left-[10%] top-[60%] rounded-[1.8rem] bg-[#4a3424] px-5 py-4 text-white shadow-[0_24px_60px_rgba(97,68,39,0.28)]">
            <p className="text-xs uppercase tracking-[0.2em] text-[#f5ddc5]">Why people return</p>
            <p className="mt-2 text-lg font-semibold">Warm community, strong execution</p>
          </div>
        </div>

        <div>
          <p className="section-tag">Why Explorers</p>
          <h2 className="mt-4 font-display text-4xl text-[#2c2218] sm:text-5xl">
            Built like a premium travel brand, backed by disciplined on-ground teams.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#6e5a43]">
            Explorers Group brings together the romance of the outdoors and the precision of a
            seasoned operations team. Every departure is meant to feel immersive, safe,
            energizing, and deeply memorable whether it is a first trek, a school camp, or a
            signature expedition.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-[1.8rem] bg-white px-5 py-5 shadow-[0_18px_40px_rgba(97,68,39,0.08)] ring-1 ring-[#e4d2bc]"
              >
                <div className="mb-4 h-11 w-11 rounded-full bg-[#f4e3d1] text-center text-xl leading-[2.75rem] text-[#c46d2c]">
                  +
                </div>
                <p className="text-sm leading-7 text-[#6e5a43]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
