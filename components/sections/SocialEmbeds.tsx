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
          <h2 className="mt-4 font-display text-4xl text-[#0b1215] sm:text-5xl">
            Built to feel alive with stories, reviews, and social proof.
          </h2>
          <p className="mt-5 text-sm leading-8 text-[#4f6670] sm:text-base">
            This new shell reserves rich sections for Instagram and Facebook feed embeds, review
            snippets, and ongoing community activity. In this phase, the UI is ready and the
            connectors can be switched to live embeds once the final links are confirmed.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {feedCards.map((card) => (
              <div
                key={card}
                className="rounded-[1.7rem] bg-[#f7fbfd] p-4 text-sm leading-7 text-[#3c5762] ring-1 ring-[#dcecf3]"
              >
                {card}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2.4rem] bg-[#0f3550] p-6 text-white shadow-[0_28px_70px_rgba(17,99,155,0.2)]">
          <p className="section-tag text-[#cde8f4]">Community Pulse</p>
          <div className="mt-5 grid gap-3">
            <div className="rounded-[1.7rem] bg-white/10 p-4 ring-1 ring-white/15">
              <p className="text-sm font-semibold text-white">Instagram Feed Embed Area</p>
              <p className="mt-2 text-sm leading-7 text-[#d8ecf6]">
                Reels, trek galleries, camp stories, and upcoming event creatives.
              </p>
            </div>
            <div className="rounded-[1.7rem] bg-white/10 p-4 ring-1 ring-white/15">
              <p className="text-sm font-semibold text-white">Facebook Feed Embed Area</p>
              <p className="mt-2 text-sm leading-7 text-[#d8ecf6]">
                Community posts, updates, reviews, and event announcements.
              </p>
            </div>
            <div className="rounded-[1.7rem] bg-[#2f7eb5] p-4 text-sm leading-7 text-white shadow-[0_16px_35px_rgba(0,0,0,0.12)]">
              On first visit, users now see a social-follow popup, matching the prompt and giving
              the site stronger community energy.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
