import Image from "next/image";
import Link from "next/link";
import UniversalEnquiryForm from "@/components/forms/UniversalEnquiryForm";
import { EnquiryVariant } from "@/types/enquiry";

export interface PageStat {
  label: string;
  value: string;
}

export interface PageAction {
  label: string;
  href: string;
  tone?: "primary" | "secondary";
}

export interface PageSection {
  title: string;
  description?: string;
  bullets?: string[];
}

export interface PageCard {
  title: string;
  description: string;
  href?: string;
  image?: string;
  caption?: string;
  meta?: string;
}

export interface EnquiryFormBlock {
  variant: EnquiryVariant;
  title: string;
  description: string;
  contextTitle?: string;
  contextLabel?: string;
}

interface EditorialLandingPageProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  caption: string;
  actions?: PageAction[];
  stats?: PageStat[];
  sections?: PageSection[];
  cards?: PageCard[];
  enquiryForm?: EnquiryFormBlock;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaActions?: PageAction[];
}

interface EditorialDetailPageProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  caption: string;
  meta?: PageStat[];
  sections: PageSection[];
  relatedCards?: PageCard[];
  enquiryForm?: EnquiryFormBlock;
  inquiryTitle?: string;
  inquiryDescription?: string;
  inquiryActions?: PageAction[];
}

export function EditorialLandingPage({
  eyebrow,
  title,
  description,
  image,
  caption,
  actions,
  stats,
  sections,
  cards,
  enquiryForm,
  ctaTitle,
  ctaDescription,
  ctaActions
}: EditorialLandingPageProps) {
  return (
    <main className="pb-16">
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        image={image}
        caption={caption}
        actions={actions}
      />

      {stats?.length ? (
        <section className="section-shell pt-0">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={`${stat.label}-${stat.value}`}
                className="rounded-[1.7rem] border border-[#d8cfbf] bg-[#f7efe4] p-5 shadow-[0_20px_60px_rgba(29,34,26,0.08)]"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-[#8a5c35]">{stat.label}</p>
                <p className="mt-3 font-display text-4xl text-[#162214]">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {sections?.length ? (
        <section className="section-shell">
          <div className="grid gap-6 xl:grid-cols-3">
            {sections.map((section) => (
              <article key={section.title} className="editorial-panel">
                <p className="section-tag">{section.title}</p>
                {section.description ? (
                  <p className="mt-5 text-sm leading-8 text-[#545b50] sm:text-base">{section.description}</p>
                ) : null}
                {section.bullets?.length ? (
                  <ul className="mt-5 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-7 text-[#545b50] sm:text-base">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d37a31]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {cards?.length ? (
        <section className="section-shell">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-tag">Explore More</p>
              <h2 className="mt-4 font-display text-4xl text-[#112315] sm:text-5xl">
                Curated pages and destination tracks.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-8 text-[#54594d] sm:text-base">
              Each card opens a dedicated editorial page with key highlights, intent, and next steps.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => {
              const content = (
                <>
                  {card.image ? (
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      {card.caption ? (
                        <p className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#f2dcc2]">
                          {card.caption}
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="space-y-3 p-5">
                    {card.meta ? (
                      <p className="text-xs uppercase tracking-[0.18em] text-[#8b6a48]">{card.meta}</p>
                    ) : null}
                    <h3 className="font-display text-3xl text-[#162617]">{card.title}</h3>
                    <p className="text-sm leading-7 text-[#5b5e54]">{card.description}</p>
                  </div>
                </>
              );

              if (card.href) {
                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="group overflow-hidden rounded-[2rem] border border-[#d6cdbe] bg-[#f8f1e7] shadow-[0_24px_70px_rgba(31,38,26,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(31,38,26,0.14)]"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <article
                  key={card.title}
                  className="overflow-hidden rounded-[2rem] border border-[#d6cdbe] bg-[#f8f1e7] shadow-[0_24px_70px_rgba(31,38,26,0.08)]"
                >
                  {content}
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {enquiryForm ? (
        <section className="section-shell">
          <UniversalEnquiryForm {...enquiryForm} />
        </section>
      ) : null}

      {ctaTitle && ctaDescription ? (
        <section className="section-shell">
          <div className="overflow-hidden rounded-[2.4rem] border border-[#d8cfbf] bg-[#162917] p-8 text-[#f2eadf] shadow-[0_28px_80px_rgba(18,29,20,0.24)]">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="section-tag text-[#d6b188]">Next Step</p>
                <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">{ctaTitle}</h2>
                <p className="mt-4 max-w-3xl text-sm leading-8 text-[#d4ddd0] sm:text-base">
                  {ctaDescription}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                {ctaActions?.map((action) => (
                  <PageActionLink key={`${action.label}-${action.href}`} action={action} dark />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

export function EditorialDetailPage({
  eyebrow,
  title,
  description,
  image,
  caption,
  meta,
  sections,
  relatedCards,
  enquiryForm,
  inquiryTitle,
  inquiryDescription,
  inquiryActions
}: EditorialDetailPageProps) {
  return (
    <main className="pb-16">
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        image={image}
        caption={caption}
        actions={inquiryActions}
      />

      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-8">
            {sections.map((section) => (
              <article key={section.title} className="editorial-panel">
                <p className="section-tag">{section.title}</p>
                {section.description ? (
                  <p className="mt-5 text-sm leading-8 text-[#545b50] sm:text-base">{section.description}</p>
                ) : null}
                {section.bullets?.length ? (
                  <ul className="mt-5 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-7 text-[#545b50] sm:text-base">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d37a31]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}

            {relatedCards?.length ? (
              <article className="editorial-panel">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="section-tag">Related Pages</p>
                    <h2 className="mt-4 font-display text-4xl text-[#112315]">Continue exploring</h2>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {relatedCards.map((card) => (
                    <Link
                      key={card.title}
                      href={card.href ?? "#"}
                      className="group overflow-hidden rounded-[1.8rem] border border-[#d6cdbe] bg-[#f8f1e7] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(31,38,26,0.14)]"
                    >
                      {card.image ? (
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          {card.caption ? (
                            <p className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#f2dcc2]">
                              {card.caption}
                            </p>
                          ) : null}
                        </div>
                      ) : null}
                      <div className="space-y-2 p-4">
                        {card.meta ? (
                          <p className="text-xs uppercase tracking-[0.16em] text-[#8b6a48]">{card.meta}</p>
                        ) : null}
                        <h3 className="font-display text-2xl text-[#162214]">{card.title}</h3>
                        <p className="text-sm leading-7 text-[#555b50]">{card.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </article>
            ) : null}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:h-fit">
            {meta?.length ? (
              <div className="rounded-[2rem] border border-[#d8cfbf] bg-[#f8f1e6] p-5 shadow-[0_24px_60px_rgba(29,34,26,0.08)]">
                <p className="text-xs uppercase tracking-[0.18em] text-[#8a5c35]">Snapshot</p>
                <div className="mt-4 grid gap-3 text-sm text-[#51594d]">
                  {meta.map((item) => (
                    <div
                      key={`${item.label}-${item.value}`}
                      className="rounded-[1.2rem] border border-[#e2d8c7] bg-white/70 p-4"
                    >
                      <p className="text-xs uppercase tracking-[0.14em] text-[#8a5c35]">{item.label}</p>
                      <p className="mt-2 font-semibold text-[#162214]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {inquiryTitle && inquiryDescription ? (
              <div className="rounded-[2rem] border border-[#d8cfbf] bg-[#162917] p-5 text-[#f1eadf] shadow-[0_24px_70px_rgba(29,34,26,0.18)]">
                <p className="text-xs uppercase tracking-[0.18em] text-[#d7b58f]">Enquiry</p>
                <h3 className="mt-3 font-display text-3xl text-white">{inquiryTitle}</h3>
                <p className="mt-3 text-sm leading-7 text-[#d4ddd0]">{inquiryDescription}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {inquiryActions?.map((action) => (
                    <PageActionLink key={`${action.label}-${action.href}`} action={action} dark />
                  ))}
                </div>
              </div>
            ) : null}

            {enquiryForm ? <UniversalEnquiryForm {...enquiryForm} /> : null}
          </aside>
        </div>
      </section>
    </main>
  );
}

function PageHero({
  eyebrow,
  title,
  description,
  image,
  caption,
  actions
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  caption: string;
  actions?: PageAction[];
}) {
  return (
    <section className="relative isolate min-h-[72vh] overflow-hidden">
      <Image src={image} alt={title} fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,19,12,0.28),rgba(9,19,12,0.68)_55%,rgba(9,17,11,0.92))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(211,122,49,0.22),transparent_28%)]" />

      <div className="relative mx-auto flex min-h-[72vh] w-full max-w-[1400px] flex-col justify-end px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="section-tag text-[#efcfac]">{eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] text-[#fff7ee] sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-[#d8ddcf] sm:text-base">{description}</p>
          {actions?.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <PageActionLink key={`${action.label}-${action.href}`} action={action} />
              ))}
            </div>
          ) : null}
          <div className="mt-6 inline-flex rounded-full bg-black/25 px-4 py-2 text-sm text-[#f4eadc] backdrop-blur">
            Micro Caption: {caption}
          </div>
        </div>
      </div>
    </section>
  );
}

function PageActionLink({
  action,
  dark
}: {
  action: PageAction;
  dark?: boolean;
}) {
  const tone = action.tone ?? "primary";
  const className =
    tone === "secondary"
      ? dark
        ? "rounded-full border border-white/14 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-[#f2eadf] transition hover:border-[#d37a31] hover:text-white"
        : "rounded-full border border-[#d0c2ac] px-5 py-3 text-sm font-semibold text-[#162214] transition hover:border-[#d37a31] hover:text-[#d37a31]"
      : "rounded-full bg-[#d37a31] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e38940]";

  return (
    <Link href={action.href} className={className}>
      {action.label}
    </Link>
  );
}
