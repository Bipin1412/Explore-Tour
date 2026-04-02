export default function WhyExplorers() {
  const highlights = [
    "Since 2001, trusted by families, schools, corporates, and trekking communities.",
    "Programs designed with equal focus on adventure quality, safety systems, and communication.",
    "A diverse calendar spanning weekend treks, camps, wildlife, Himalayan journeys, and training.",
    "Strong local execution with experienced leaders, route planning, and on-ground coordination.",
    "A warm, repeat-traveler culture that feels more like a club than a one-off operator."
  ];

  return (
    <section id="why-explorers" className="section-shell">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="editorial-panel">
          <p className="section-tag">Why Explorers</p>
          <h2 className="mt-4 font-display text-4xl text-[#112315] sm:text-5xl">
            Built like an outdoor magazine, executed like a disciplined field team.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-8 text-[#4f5548] sm:text-base">
            Explorers Group brings together the romance of the outdoors and the precision of a seasoned operations team. Every departure is meant to feel immersive, safe, energizing, and deeply memorable whether it is a first trek, a school camp, or a signature expedition.
          </p>
        </div>

        <div className="editorial-panel bg-[#f7efe4] text-[#111111]">
          <p className="section-tag text-[#8a5c35]">What We Do</p>
          <ul className="mt-5 space-y-4">
            {highlights.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-7 text-[#111111] sm:text-base">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d37a31]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
