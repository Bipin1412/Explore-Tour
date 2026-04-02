export default function StatsBar() {
  const stats = [
    "2 Lakh+ Happy Members",
    "4.6 Star Trust across Google, TripAdvisor, and Facebook",
    "Adventure, Travel, Training programs for all age groups"
  ];

  return (
    <section className="section-shell pt-0">
      <div className="grid gap-3 rounded-[2rem] border border-[#c9c1b0] bg-[#f2eadf] p-5 md:grid-cols-3 md:p-6">
        {stats.map((item) => (
          <div key={item} className="rounded-[1.5rem] border border-[#d7cfbf] bg-[#f7f1e8] px-4 py-4 text-center text-sm font-semibold text-[#223224] sm:text-base">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
