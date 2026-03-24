import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createAdminTrip, deleteTripBySlug, getAllTrips, updateTripBySlug } from "@/lib/trip-store";
import { Trip, TripCategory, TripDifficulty, TripRegion } from "@/types/trip";

const difficultyValues: TripDifficulty[] = ["Easy", "Moderate", "Challenging", "Expedition"];
const regionValues: TripRegion[] = ["Sahyadri", "Himalaya", "Western Ghats", "Northeast", "Desert", "Coastal"];
const categoryValues: TripCategory[] = [
  "Weekend Treks",
  "Himalayan Treks",
  "Monsoon Treks",
  "Spiritual Trails",
  "Desert Expeditions",
  "Coastal Escapes",
  "Forest Trails"
];

function normalizeStringList(value: unknown, fieldName: string): string[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${fieldName} must contain at least one item.`);
  }

  const cleaned = value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);

  if (cleaned.length === 0) {
    throw new Error(`${fieldName} must contain at least one item.`);
  }

  return cleaned;
}

function normalizeItinerary(value: unknown): Trip["itinerary"] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error("Itinerary must contain at least one day.");
  }

  return value.map((item, index) => {
    const day = typeof item?.day === "number" && item.day > 0 ? item.day : index + 1;
    const title = typeof item?.title === "string" ? item.title.trim() : "";
    const description = typeof item?.description === "string" ? item.description.trim() : "";

    if (!title || !description) {
      throw new Error("Each itinerary day needs a title and description.");
    }

    return { day, title, description };
  });
}

function normalizeFaqs(value: unknown): Trip["faqs"] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error("FAQs must contain at least one item.");
  }

  const faqs = value
    .map((item) => {
      const question = typeof item?.question === "string" ? item.question.trim() : "";
      const answer = typeof item?.answer === "string" ? item.answer.trim() : "";

      if (!question || !answer) {
        return null;
      }

      return { question, answer };
    })
    .filter(Boolean) as NonNullable<Trip["faqs"]>;

  if (faqs.length === 0) {
    throw new Error("FAQs must contain at least one complete question and answer.");
  }

  return faqs;
}

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeTrip(payload: unknown): Trip {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid request body.");
  }

  const input = payload as Record<string, unknown>;
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const slugSource = typeof input.slug === "string" && input.slug.trim() ? input.slug : name;
  const slug = toSlug(slugSource);
  const summary = typeof input.summary === "string" ? input.summary.trim() : "";
  const destination = typeof input.destination === "string" ? input.destination.trim() : "";
  const durationDays = Number(input.durationDays);
  const price = Number(input.price);
  const heroImage = typeof input.heroImage === "string" ? input.heroImage.trim() : "";
  const heroVideo = typeof input.heroVideo === "string" ? input.heroVideo.trim() : "";
  const overview = typeof input.overview === "string" ? input.overview.trim() : "";

  if (!name || !slug || !summary || !destination || !heroImage || !heroVideo || !overview) {
    throw new Error("Missing one or more required text fields.");
  }

  if (!Number.isFinite(durationDays) || durationDays < 1) {
    throw new Error("Duration must be at least 1 day.");
  }

  if (!Number.isFinite(price) || price < 0) {
    throw new Error("Price must be a valid number.");
  }

  const region = input.region as TripRegion;
  const category = input.category as TripCategory;
  const difficulty = input.difficulty as TripDifficulty;

  if (!regionValues.includes(region)) {
    throw new Error("Invalid region selected.");
  }

  if (!categoryValues.includes(category)) {
    throw new Error("Invalid category selected.");
  }

  if (!difficultyValues.includes(difficulty)) {
    throw new Error("Invalid difficulty selected.");
  }

  return {
    id: typeof input.id === "string" && input.id.trim() ? input.id : `trip-${randomUUID()}`,
    slug,
    name,
    summary,
    region,
    category,
    destination,
    durationDays,
    difficulty,
    bestMonths: normalizeStringList(input.bestMonths, "Best months"),
    price,
    heroVideo,
    heroImage,
    gallery: normalizeStringList(input.gallery, "Gallery"),
    highlights: normalizeStringList(input.highlights, "Highlights"),
    itinerary: normalizeItinerary(input.itinerary),
    overview,
    inclusions: normalizeStringList(input.inclusions, "Inclusions"),
    exclusions: normalizeStringList(input.exclusions, "Exclusions"),
    faqs: normalizeFaqs(input.faqs),
    featured: Boolean(input.featured)
  };
}

export async function GET() {
  const trips = await getAllTrips();

  return NextResponse.json({
    success: true,
    trips
  });
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as unknown;
    const trip = normalizeTrip(payload);
    const createdTrip = await createAdminTrip(trip);

    return NextResponse.json(
      {
        success: true,
        trip: createdTrip
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unable to create trip."
      },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const payload = (await request.json()) as unknown;

    if (!payload || typeof payload !== "object") {
      throw new Error("Invalid request body.");
    }

    const input = payload as Record<string, unknown>;
    const currentSlug = typeof input.currentSlug === "string" ? input.currentSlug.trim() : "";
    if (!currentSlug) {
      throw new Error("Current trip slug is required.");
    }

    const trip = normalizeTrip(input.trip);
    const updatedTrip = await updateTripBySlug(currentSlug, trip);

    return NextResponse.json({
      success: true,
      trip: updatedTrip
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unable to update trip."
      },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug")?.trim();

    if (!slug) {
      throw new Error("Trip slug is required.");
    }

    await deleteTripBySlug(slug);

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unable to delete trip."
      },
      { status: 400 }
    );
  }
}
