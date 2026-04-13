export default function StatsBar() {
  const stats = [
    {
      value: "2 Lakh+",
      label: "Happy members",
      detail: "Families, trekkers, schools, and communities."
    },
    {
      value: "4.6 Star",
      label: "Community trust",
      detail: "Across Google, TripAdvisor, and Facebook."
    },
    {
      value: "All Ages",
      label: "Adventure, travel, training",
      detail: "Programs designed for every explorer profile."
    }
  ];

  return (
    <section className="section-shell pt-0">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-[2rem] bg-white px-6 py-6 shadow-[0_22px_55px_rgba(61,102,121,0.08)] ring-1 ring-[#d7e7ef]"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-[#11639b]">{item.label}</p>
            <p className="mt-4 font-display text-4xl text-[#0b1215]">{item.value}</p>
            <p className="mt-3 text-sm leading-7 text-[#4f6670]">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
