export default function SocialEmbeds() {
  const feedCards = [
    "Trail reels, behind-the-scenes camp setups, and leader briefings.",
    "Community stories, departure highlights, and event countdowns.",
    "Trip photo drops, parent updates, and new batch announcements."
  ];

  return (
    <section className="section-shell">
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="editorial-panel">
          <p className="section-tag">Social Media Integration</p>
          <h2 className="mt-4 font-display text-4xl text-[#112315] sm:text-5xl">
            Built to feel alive with stories, reviews, and social proof.
          </h2>
          <p className="mt-5 text-sm leading-8 text-[#50564b] sm:text-base">
            This new shell reserves rich sections for Instagram and Facebook feed embeds, review snippets, and ongoing community activity. In this phase, the UI is ready and the connectors can be switched to live embeds once the final links are confirmed.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {feedCards.map((card) => (
              <div key={card} className="rounded-[1.5rem] border border-[#ddd3c3] bg-[#f8f1e7] p-4 text-sm leading-7 text-[#3c4639]">
                {card}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2.2rem] border border-white/10 bg-[#1a2c1c] p-6 text-[#f3ecdf]">
          <p className="section-tag text-[#d7b58f]">Community Pulse</p>
          <div className="mt-5 grid gap-3">
            <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-4">
              <p className="text-sm font-semibold text-white">Instagram Feed Embed Area</p>
              <p className="mt-2 text-sm leading-7 text-[#b8beb1]">
                Reels, trek galleries, camp stories, and upcoming event creatives.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-4">
              <p className="text-sm font-semibold text-white">Facebook Feed Embed Area</p>
              <p className="mt-2 text-sm leading-7 text-[#b8beb1]">
                Community posts, updates, reviews, and event announcements.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[#d37a31]/20 bg-[#d37a31]/10 p-4 text-sm leading-7 text-[#f4e4d1]">
              On first visit, users now see a social-follow popup, matching the prompt and giving the site stronger community energy.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
