"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Trip, TripCategory, TripDifficulty, TripRegion } from "@/types/trip";

type TripFormState = {
  name: string;
  slug: string;
  summary: string;
  region: TripRegion;
  category: TripCategory;
  destination: string;
  durationDays: string;
  difficulty: TripDifficulty;
  price: string;
  heroImage: string;
  heroVideo: string;
  overview: string;
  featured: boolean;
  bestMonths: string[];
  galleryText: string;
  highlightsText: string;
  inclusionsText: string;
  exclusionsText: string;
  itinerary: Array<{ day: number; title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

type AdminTripsResponse = {
  success: boolean;
  trips: Trip[];
  error?: string;
};

type SaveTripResponse = {
  success: boolean;
  trip?: Trip;
  error?: string;
};

type DeleteTripResponse = {
  success: boolean;
  error?: string;
};

type UploadImageResponse = {
  success: boolean;
  url?: string;
  error?: string;
};

const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
] as const;

const regionOptions: TripRegion[] = ["Sahyadri", "Himalaya", "Western Ghats", "Northeast", "Desert", "Coastal"];
const difficultyOptions: TripDifficulty[] = ["Easy", "Moderate", "Challenging", "Expedition"];
const categoryOptions: TripCategory[] = [
  "Weekend Treks",
  "Himalayan Treks",
  "Monsoon Treks",
  "Spiritual Trails",
  "Desert Expeditions",
  "Coastal Escapes",
  "Forest Trails"
];

function createEmptyForm(): TripFormState {
  return {
    name: "",
    slug: "",
    summary: "",
    region: "Himalaya",
    category: "Himalayan Treks",
    destination: "",
    durationDays: "4",
    difficulty: "Moderate",
    price: "",
    heroImage: "",
    heroVideo: "",
    overview: "",
    featured: false,
    bestMonths: [],
    galleryText: "",
    highlightsText: "",
    inclusionsText: "",
    exclusionsText: "",
    itinerary: [{ day: 1, title: "", description: "" }],
    faqs: [{ question: "", answer: "" }]
  };
}

function createFormFromTrip(trip: Trip): TripFormState {
  return {
    name: trip.name,
    slug: trip.slug,
    summary: trip.summary,
    region: trip.region,
    category: trip.category,
    destination: trip.destination,
    durationDays: String(trip.durationDays),
    difficulty: trip.difficulty,
    price: String(trip.price),
    heroImage: trip.heroImage,
    heroVideo: trip.heroVideo,
    overview: trip.overview ?? "",
    featured: Boolean(trip.featured),
    bestMonths: trip.bestMonths,
    galleryText: trip.gallery.join("\n"),
    highlightsText: trip.highlights.join("\n"),
    inclusionsText: (trip.inclusions ?? []).join("\n"),
    exclusionsText: (trip.exclusions ?? []).join("\n"),
    itinerary:
      trip.itinerary.length > 0 ? trip.itinerary.map((item) => ({ ...item })) : [{ day: 1, title: "", description: "" }],
    faqs: trip.faqs && trip.faqs.length > 0 ? trip.faqs.map((item) => ({ ...item })) : [{ question: "", answer: "" }]
  };
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildTripPayload(form: TripFormState) {
  return {
    name: form.name.trim(),
    slug: form.slug.trim() || slugify(form.name),
    summary: form.summary.trim(),
    region: form.region,
    category: form.category,
    destination: form.destination.trim(),
    durationDays: Number(form.durationDays),
    difficulty: form.difficulty,
    bestMonths: form.bestMonths,
    price: Number(form.price),
    heroVideo: form.heroVideo.trim(),
    heroImage: form.heroImage.trim(),
    gallery: splitLines(form.galleryText),
    highlights: splitLines(form.highlightsText),
    itinerary: form.itinerary.map((item, index) => ({
      day: index + 1,
      title: item.title.trim(),
      description: item.description.trim()
    })),
    overview: form.overview.trim(),
    inclusions: splitLines(form.inclusionsText),
    exclusions: splitLines(form.exclusionsText),
    faqs: form.faqs.map((item) => ({
      question: item.question.trim(),
      answer: item.answer.trim()
    })),
    featured: form.featured
  };
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="mb-2 block text-sm font-semibold text-[#3e2f21]">{children}</label>;
}

async function readApiResponse<T extends { error?: string }>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") ?? "";
  const raw = await response.text();

  if (contentType.includes("application/json")) {
    return JSON.parse(raw) as T;
  }

  if (!response.ok) {
    throw new Error("The server returned an invalid response. Check that the dev server is running cleanly.");
  }

  throw new Error("Expected JSON from the server but received a different response.");
}

export default function AdminPage() {
  const [form, setForm] = useState<TripFormState>(createEmptyForm);
  const [existingTrips, setExistingTrips] = useState<Trip[]>([]);
  const [editingTripSlug, setEditingTripSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingTrips, setIsLoadingTrips] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [createdTripSlug, setCreatedTripSlug] = useState("");
  const [createdTripFeatured, setCreatedTripFeatured] = useState(false);
  const [deletingTripSlug, setDeletingTripSlug] = useState("");
  const [uploadingField, setUploadingField] = useState<"" | "heroImage" | "gallery">("");
  const heroImageInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const suggestedSlug = useMemo(() => slugify(form.name), [form.name]);
  const isEditing = Boolean(editingTripSlug);

  const loadTrips = async () => {
    setIsLoadingTrips(true);

    try {
      const response = await fetch("/api/admin/trips", { cache: "no-store" });
      const data = await readApiResponse<AdminTripsResponse>(response);

      if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Unable to load existing trips.");
      }

      setExistingTrips(data.trips);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to load existing trips.");
    } finally {
      setIsLoadingTrips(false);
    }
  };

  useEffect(() => {
    void loadTrips();
  }, []);

  const updateItinerary = (index: number, field: "title" | "description", value: string) => {
    setForm((current) => ({
      ...current,
      itinerary: current.itinerary.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateFaq = (index: number, field: "question" | "answer", value: string) => {
    setForm((current) => ({
      ...current,
      faqs: current.faqs.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item))
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    setCreatedTripSlug("");
    setCreatedTripFeatured(false);

    try {
      const response = await fetch("/api/admin/trips", {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          isEditing
            ? {
                currentSlug: editingTripSlug,
                trip: buildTripPayload(form)
              }
            : buildTripPayload(form)
        )
      });

      const data = await readApiResponse<SaveTripResponse>(response);
      if (!response.ok || !data.success || !data.trip) {
        throw new Error(data.error ?? `Unable to ${isEditing ? "update" : "create"} trip.`);
      }

      setSuccessMessage(
        isEditing
          ? "Trip updated successfully. The admin list and public pages now use the latest content."
          : "Trip created successfully. It is now available on the frontend."
      );
      setCreatedTripSlug(data.trip.slug);
      setCreatedTripFeatured(Boolean(data.trip.featured));
      setEditingTripSlug("");
      setForm(createEmptyForm());
      await loadTrips();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : `Unable to ${isEditing ? "update" : "create"} trip.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditTrip = (trip: Trip) => {
    setErrorMessage("");
    setSuccessMessage("");
    setCreatedTripSlug("");
    setCreatedTripFeatured(false);
    setEditingTripSlug(trip.slug);
    setForm(createFormFromTrip(trip));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingTripSlug("");
    setErrorMessage("");
    setSuccessMessage("");
    setCreatedTripSlug("");
    setCreatedTripFeatured(false);
    setForm(createEmptyForm());
  };

  const handleDeleteTrip = async (slug: string) => {
    setDeletingTripSlug(slug);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`/api/admin/trips?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE"
      });
      const data = await readApiResponse<DeleteTripResponse>(response);

      if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Unable to delete trip.");
      }

      if (createdTripSlug === slug) {
        setCreatedTripSlug("");
        setCreatedTripFeatured(false);
      }

      setSuccessMessage("Trip deleted successfully.");
      await loadTrips();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to delete trip.");
    } finally {
      setDeletingTripSlug("");
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/uploads", {
      method: "POST",
      body: formData
    });

    return readApiResponse<UploadImageResponse>(response);
  };

  const handleImageUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    target: "heroImage" | "gallery"
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    setUploadingField(target);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const data = await uploadImage(file);

      if (!data.success || !data.url) {
        throw new Error(data.error ?? "Unable to upload image.");
      }

      const uploadedUrl = data.url;

      if (target === "heroImage") {
        setForm((current) => ({ ...current, heroImage: uploadedUrl }));
        setSuccessMessage("Hero image uploaded successfully.");
      } else {
        setForm((current) => ({
          ...current,
          galleryText: current.galleryText.trim() ? `${current.galleryText}\n${uploadedUrl}` : uploadedUrl
        }));
        setSuccessMessage("Gallery image uploaded successfully.");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to upload image.");
    } finally {
      setUploadingField("");
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 text-[#2f2418] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-[28px] border border-[#dbcab2] bg-[#fff8ef]/95 p-6 shadow-[0_24px_80px_rgba(88,60,22,0.12)]">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#8f7659]">Explore - Tour Admin</p>
              <h1 className="mt-2 font-display text-3xl text-[#2f2418] sm:text-4xl">Create Detailed Trip Pages</h1>
              <p className="mt-3 max-w-3xl text-[#6f5b44]">
                Fill the same content blocks used on the frontend trip pages. Saving here creates a new public trip
                without requiring database setup yet.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-full border border-[#cdb89b] px-4 py-2 text-sm font-semibold text-[#6b5034] transition hover:bg-[#f6ecde]"
              >
                View Site
              </Link>
              <Link
                href="/trips"
                className="rounded-full bg-[#6d4d31] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#563a22]"
              >
                Featured Pages
              </Link>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="rounded-[24px] border border-[#dbcab2] bg-[#fffaf1]/95 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl text-[#2f2418]">
                  {isEditing ? "Edit Trip" : "Basic Trip Info"}
                </h2>
                {isEditing ? (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="rounded-full border border-[#cdb89b] px-4 py-2 text-sm font-semibold text-[#6b5034] transition hover:bg-[#f6ecde]"
                  >
                    Cancel Edit
                  </button>
                ) : null}
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <FieldLabel>Trip Name</FieldLabel>
                  <input
                    required
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3 outline-none ring-0 transition focus:border-[#8b6846]"
                  />
                </div>
                <div>
                  <FieldLabel>Slug</FieldLabel>
                  <input
                    value={form.slug}
                    onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
                    placeholder={suggestedSlug || "auto-generated-from-name"}
                    className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3 outline-none ring-0 transition focus:border-[#8b6846]"
                  />
                </div>
                <div className="md:col-span-2">
                  <FieldLabel>Summary</FieldLabel>
                  <textarea
                    required
                    rows={3}
                    value={form.summary}
                    onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))}
                    className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3 outline-none ring-0 transition focus:border-[#8b6846]"
                  />
                </div>
                <div>
                  <FieldLabel>Region</FieldLabel>
                  <select
                    value={form.region}
                    onChange={(event) => setForm((current) => ({ ...current, region: event.target.value as TripRegion }))}
                    className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3"
                  >
                    {regionOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <FieldLabel>Category</FieldLabel>
                  <select
                    value={form.category}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, category: event.target.value as TripCategory }))
                    }
                    className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <FieldLabel>Destination</FieldLabel>
                  <input
                    required
                    value={form.destination}
                    onChange={(event) => setForm((current) => ({ ...current, destination: event.target.value }))}
                    className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3"
                  />
                </div>
                <div>
                  <FieldLabel>Difficulty</FieldLabel>
                  <select
                    value={form.difficulty}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, difficulty: event.target.value as TripDifficulty }))
                    }
                    className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3"
                  >
                    {difficultyOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <FieldLabel>Duration (Days)</FieldLabel>
                  <input
                    required
                    type="number"
                    min="1"
                    value={form.durationDays}
                    onChange={(event) => setForm((current) => ({ ...current, durationDays: event.target.value }))}
                    className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3"
                  />
                </div>
                <div>
                  <FieldLabel>Price (INR)</FieldLabel>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                    className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-[24px] border border-[#dbcab2] bg-[#fffaf1]/95 p-6">
              <h2 className="font-display text-2xl text-[#2f2418]">Hero and Overview</h2>
              <div className="mt-5 grid gap-4">
                <div>
                  <FieldLabel>Hero Image URL</FieldLabel>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => heroImageInputRef.current?.click()}
                        disabled={uploadingField === "heroImage"}
                        className="rounded-full border border-[#cdb89b] px-4 py-2 text-sm font-semibold text-[#6b5034] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {uploadingField === "heroImage" ? "Uploading..." : "Upload Image"}
                      </button>
                      <input
                        ref={heroImageInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/gif"
                        onChange={(event) => void handleImageUpload(event, "heroImage")}
                        className="hidden"
                      />
                    </div>
                    <input
                      required
                      value={form.heroImage}
                      onChange={(event) => setForm((current) => ({ ...current, heroImage: event.target.value }))}
                      className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3"
                    />
                  </div>
                </div>
                <div>
                  <FieldLabel>Hero Video URL</FieldLabel>
                  <input
                    required
                    value={form.heroVideo}
                    onChange={(event) => setForm((current) => ({ ...current, heroVideo: event.target.value }))}
                    className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3"
                  />
                </div>
                <div>
                  <FieldLabel>Overview</FieldLabel>
                  <textarea
                    required
                    rows={4}
                    value={form.overview}
                    onChange={(event) => setForm((current) => ({ ...current, overview: event.target.value }))}
                    className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-[24px] border border-[#dbcab2] bg-[#fffaf1]/95 p-6">
              <h2 className="font-display text-2xl text-[#2f2418]">Gallery and Lists</h2>
              <div className="mt-5 grid gap-4">
                <div>
                  <FieldLabel>Gallery Image URLs</FieldLabel>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => galleryInputRef.current?.click()}
                        disabled={uploadingField === "gallery"}
                        className="rounded-full border border-[#cdb89b] px-4 py-2 text-sm font-semibold text-[#6b5034] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {uploadingField === "gallery" ? "Uploading..." : "Upload Gallery Image"}
                      </button>
                      <input
                        ref={galleryInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/gif"
                        onChange={(event) => void handleImageUpload(event, "gallery")}
                        className="hidden"
                      />
                    </div>
                    <textarea
                      required
                      rows={5}
                      placeholder="One image URL per line"
                      value={form.galleryText}
                      onChange={(event) => setForm((current) => ({ ...current, galleryText: event.target.value }))}
                      className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3"
                    />
                  </div>
                </div>
                <div>
                  <FieldLabel>Highlights</FieldLabel>
                  <textarea
                    required
                    rows={4}
                    placeholder="One highlight per line"
                    value={form.highlightsText}
                    onChange={(event) => setForm((current) => ({ ...current, highlightsText: event.target.value }))}
                    className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <FieldLabel>Inclusions</FieldLabel>
                    <textarea
                      required
                      rows={5}
                      placeholder="One inclusion per line"
                      value={form.inclusionsText}
                      onChange={(event) => setForm((current) => ({ ...current, inclusionsText: event.target.value }))}
                      className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3"
                    />
                  </div>
                  <div>
                    <FieldLabel>Exclusions</FieldLabel>
                    <textarea
                      required
                      rows={5}
                      placeholder="One exclusion per line"
                      value={form.exclusionsText}
                      onChange={(event) => setForm((current) => ({ ...current, exclusionsText: event.target.value }))}
                      className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[24px] border border-[#dbcab2] bg-[#fffaf1]/95 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl text-[#2f2418]">Itinerary</h2>
                <button
                  type="button"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      itinerary: [...current.itinerary, { day: current.itinerary.length + 1, title: "", description: "" }]
                    }))
                  }
                  className="rounded-full border border-[#cdb89b] px-4 py-2 text-sm font-semibold text-[#6b5034]"
                >
                  Add Day
                </button>
              </div>
              <div className="mt-5 space-y-4">
                {form.itinerary.map((item, index) => (
                  <div key={`day-${index}`} className="rounded-2xl border border-[#e2d3bf] bg-[#fffdf9] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-semibold text-[#3e2f21]">Day {index + 1}</p>
                      {form.itinerary.length > 1 ? (
                        <button
                          type="button"
                          onClick={() =>
                            setForm((current) => ({
                              ...current,
                              itinerary: current.itinerary.filter((_, itemIndex) => itemIndex !== index)
                            }))
                          }
                          className="text-sm font-semibold text-[#a05236]"
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                    <div className="grid gap-3">
                      <input
                        required
                        value={item.title}
                        onChange={(event) => updateItinerary(index, "title", event.target.value)}
                        placeholder="Day title"
                        className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3"
                      />
                      <textarea
                        required
                        rows={3}
                        value={item.description}
                        onChange={(event) => updateItinerary(index, "description", event.target.value)}
                        placeholder="Day description"
                        className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[24px] border border-[#dbcab2] bg-[#fffaf1]/95 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl text-[#2f2418]">FAQs</h2>
                <button
                  type="button"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      faqs: [...current.faqs, { question: "", answer: "" }]
                    }))
                  }
                  className="rounded-full border border-[#cdb89b] px-4 py-2 text-sm font-semibold text-[#6b5034]"
                >
                  Add FAQ
                </button>
              </div>
              <div className="mt-5 space-y-4">
                {form.faqs.map((item, index) => (
                  <div key={`faq-${index}`} className="rounded-2xl border border-[#e2d3bf] bg-[#fffdf9] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-semibold text-[#3e2f21]">FAQ {index + 1}</p>
                      {form.faqs.length > 1 ? (
                        <button
                          type="button"
                          onClick={() =>
                            setForm((current) => ({
                              ...current,
                              faqs: current.faqs.filter((_, itemIndex) => itemIndex !== index)
                            }))
                          }
                          className="text-sm font-semibold text-[#a05236]"
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                    <div className="grid gap-3">
                      <input
                        required
                        value={item.question}
                        onChange={(event) => updateFaq(index, "question", event.target.value)}
                        placeholder="Question"
                        className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3"
                      />
                      <textarea
                        required
                        rows={3}
                        value={item.answer}
                        onChange={(event) => updateFaq(index, "answer", event.target.value)}
                        placeholder="Answer"
                        className="w-full rounded-2xl border border-[#d8c6ae] bg-white px-4 py-3"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[24px] border border-[#dbcab2] bg-[#fffaf1]/95 p-6">
              <h2 className="font-display text-2xl text-[#2f2418]">Best Months and Publishing</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {monthOptions.map((month) => {
                  const isSelected = form.bestMonths.includes(month);

                  return (
                    <button
                      key={month}
                      type="button"
                      onClick={() =>
                        setForm((current) => ({
                          ...current,
                          bestMonths: isSelected
                            ? current.bestMonths.filter((item) => item !== month)
                            : [...current.bestMonths, month]
                        }))
                      }
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        isSelected
                          ? "bg-[#6d4d31] text-white"
                          : "border border-[#d2bea2] bg-[#f8efe1] text-[#654b31]"
                      }`}
                    >
                      {month}
                    </button>
                  );
                })}
              </div>
              <label className="mt-5 flex items-center gap-3 rounded-2xl border border-[#e2d3bf] bg-[#fffdf9] px-4 py-3 text-sm font-semibold text-[#3e2f21]">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))}
                />
                Mark this trip as featured so it also appears in the featured trip page sections.
              </label>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-[#6d4d31] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#563a22] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Saving Trip..." : isEditing ? "Update Trip" : "Create Trip"}
                </button>
                {successMessage ? <p className="text-sm font-semibold text-[#2f6a3e]">{successMessage}</p> : null}
                {errorMessage ? <p className="text-sm font-semibold text-[#9b3c26]">{errorMessage}</p> : null}
              </div>
              {createdTripSlug ? (
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
                  <Link href={`/tours/${createdTripSlug}`} className="text-[#6d4d31] hover:underline">
                    Open public trip page
                  </Link>
                  {createdTripFeatured ? (
                    <Link href={`/trips/${createdTripSlug}`} className="text-[#6d4d31] hover:underline">
                      Open featured trip page
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </section>
          </form>

          <aside className="space-y-6">
            <section className="rounded-[24px] border border-[#dbcab2] bg-[#fffaf1]/95 p-6">
              <h2 className="font-display text-2xl text-[#2f2418]">Current Trips</h2>
              <p className="mt-2 text-sm text-[#6f5b44]">
                Seeded trips and admin-created trips are listed together here.
              </p>
              <div className="mt-5 space-y-3">
                {isLoadingTrips ? (
                  <p className="rounded-2xl border border-[#e2d3bf] bg-[#fffdf9] px-4 py-3 text-sm text-[#6f5b44]">
                    Loading trips...
                  </p>
                ) : (
                  existingTrips.map((trip) => (
                    <div key={trip.id} className="rounded-2xl border border-[#e2d3bf] bg-[#fffdf9] p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-[#2f2418]">{trip.name}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#8f7659]">{trip.region}</p>
                        </div>
                        {trip.featured ? (
                          <span className="rounded-full bg-[#efe3d1] px-2.5 py-1 text-xs font-semibold text-[#7b5a3b]">
                            Featured
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm text-[#6f5b44]">
                        {trip.durationDays} Days | INR {trip.price.toLocaleString()}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
                        <button
                          type="button"
                          onClick={() => handleEditTrip(trip)}
                          className="text-[#6d4d31] transition hover:underline"
                        >
                          Edit
                        </button>
                        <Link href={`/tours/${trip.slug}`} className="text-[#6d4d31] hover:underline">
                          Public Page
                        </Link>
                        {trip.featured ? (
                          <Link href={`/trips/${trip.slug}`} className="text-[#6d4d31] hover:underline">
                            Featured Page
                          </Link>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => void handleDeleteTrip(trip.slug)}
                          disabled={deletingTripSlug === trip.slug}
                          className="text-[#a05236] transition hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {deletingTripSlug === trip.slug ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="rounded-[24px] border border-[#dbcab2] bg-[#fffaf1]/95 p-6">
              <h2 className="font-display text-2xl text-[#2f2418]">How It Works</h2>
              <div className="mt-4 space-y-3 text-sm text-[#6f5b44]">
                <p>Fill this form with the same content blocks used by the frontend detailed trip template.</p>
                <p>Submitting stores the trip in a local JSON file until the database layer is ready.</p>
                <p>Later we can swap the storage layer to Prisma or another database without redesigning this page.</p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
