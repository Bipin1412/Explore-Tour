import { promises as fs } from "fs";
import { Prisma } from "@prisma/client";
import path from "path";
import { prisma, canUsePrisma } from "@/lib/db";
import { trips as seededTrips } from "@/lib/data/trips";
import { ItineraryDay, Trip, TripFaq } from "@/types/trip";

const adminTripsFilePath = path.join(process.cwd(), "data", "admin-trips.json");
const deletedTripsFilePath = path.join(process.cwd(), "data", "deleted-trip-slugs.json");

async function ensureJsonFile(filePath: string, defaultValue: string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, defaultValue, "utf8");
  }
}

async function getAdminTripsFromJson(): Promise<Trip[]> {
  await ensureJsonFile(adminTripsFilePath, "[]\n");

  try {
    const raw = await fs.readFile(adminTripsFilePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as Trip[]) : [];
  } catch {
    return [];
  }
}

async function saveAdminTripsToJson(trips: Trip[]) {
  await ensureJsonFile(adminTripsFilePath, "[]\n");
  await fs.writeFile(adminTripsFilePath, `${JSON.stringify(trips, null, 2)}\n`, "utf8");
}

async function getDeletedTripSlugsFromJson(): Promise<string[]> {
  await ensureJsonFile(deletedTripsFilePath, "[]\n");

  try {
    const raw = await fs.readFile(deletedTripsFilePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

async function saveDeletedTripSlugsToJson(slugs: string[]) {
  await ensureJsonFile(deletedTripsFilePath, "[]\n");
  await fs.writeFile(deletedTripsFilePath, `${JSON.stringify(slugs, null, 2)}\n`, "utf8");
}

function normalizeStringArray(value: Prisma.JsonValue, fallback: string[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.filter((item): item is string => typeof item === "string");
}

function normalizeItinerary(value: Prisma.JsonValue): ItineraryDay[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item, index) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return null;
      }

      const entry = item as Record<string, unknown>;
      const day = typeof entry.day === "number" && entry.day > 0 ? entry.day : index + 1;
      const title = typeof entry.title === "string" ? entry.title : "";
      const description = typeof entry.description === "string" ? entry.description : "";

      if (!title || !description) {
        return null;
      }

      return { day, title, description };
    })
    .filter((item): item is ItineraryDay => Boolean(item));
}

function normalizeFaqs(value: Prisma.JsonValue): TripFaq[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return null;
      }

      const entry = item as Record<string, unknown>;
      const question = typeof entry.question === "string" ? entry.question : "";
      const answer = typeof entry.answer === "string" ? entry.answer : "";

      if (!question || !answer) {
        return null;
      }

      return { question, answer };
    })
    .filter((item): item is TripFaq => Boolean(item));
}

function toInputJsonValue(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

function toTrip(record: {
  id: string;
  slug: string;
  name: string;
  summary: string;
  region: string;
  category: string;
  destination: string;
  durationDays: number;
  difficulty: string;
  bestMonths: Prisma.JsonValue;
  price: Prisma.Decimal;
  heroVideo: string;
  heroImage: string;
  gallery: Prisma.JsonValue;
  highlights: Prisma.JsonValue;
  itinerary: Prisma.JsonValue;
  overview: string;
  inclusions: Prisma.JsonValue;
  exclusions: Prisma.JsonValue;
  faqs: Prisma.JsonValue;
  featured: boolean;
}): Trip {
  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    summary: record.summary,
    region: record.region as Trip["region"],
    category: record.category as Trip["category"],
    destination: record.destination,
    durationDays: record.durationDays,
    difficulty: record.difficulty as Trip["difficulty"],
    bestMonths: normalizeStringArray(record.bestMonths),
    price: Number(record.price),
    heroVideo: record.heroVideo,
    heroImage: record.heroImage,
    gallery: normalizeStringArray(record.gallery),
    highlights: normalizeStringArray(record.highlights),
    itinerary: normalizeItinerary(record.itinerary),
    overview: record.overview,
    inclusions: normalizeStringArray(record.inclusions),
    exclusions: normalizeStringArray(record.exclusions),
    faqs: normalizeFaqs(record.faqs),
    featured: record.featured
  };
}

function toAdminTripCreateInput(trip: Trip): Prisma.AdminTripUncheckedCreateInput {
  return {
    id: trip.id,
    slug: trip.slug,
    name: trip.name,
    summary: trip.summary,
    region: trip.region,
    category: trip.category,
    destination: trip.destination,
    durationDays: trip.durationDays,
    difficulty: trip.difficulty,
    bestMonths: toInputJsonValue(trip.bestMonths),
    price: new Prisma.Decimal(trip.price),
    heroVideo: trip.heroVideo,
    heroImage: trip.heroImage,
    gallery: toInputJsonValue(trip.gallery),
    highlights: toInputJsonValue(trip.highlights),
    itinerary: toInputJsonValue(trip.itinerary),
    overview: trip.overview ?? "",
    inclusions: toInputJsonValue(trip.inclusions ?? []),
    exclusions: toInputJsonValue(trip.exclusions ?? []),
    faqs: toInputJsonValue(trip.faqs ?? []),
    featured: Boolean(trip.featured)
  };
}

async function getAdminTripsFromDatabase(): Promise<Trip[]> {
  const rows = await prisma.adminTrip.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return rows.map(toTrip);
}

async function saveDeletedSeededSlug(slug: string) {
  await prisma.deletedTripSlug.upsert({
    where: { slug },
    update: {},
    create: { slug }
  });
}

export async function getAdminTrips(): Promise<Trip[]> {
  if (canUsePrisma()) {
    try {
      return await getAdminTripsFromDatabase();
    } catch (error) {
      console.error("DB getAdminTrips failed, using JSON fallback:", error);
    }
  }

  return getAdminTripsFromJson();
}

export async function saveAdminTrips(trips: Trip[]) {
  if (canUsePrisma()) {
    try {
      await prisma.$transaction([
        prisma.adminTrip.deleteMany(),
        ...trips.map((trip) => prisma.adminTrip.create({ data: toAdminTripCreateInput(trip) }))
      ]);
      return;
    } catch (error) {
      console.error("DB saveAdminTrips failed, using JSON fallback:", error);
    }
  }

  await saveAdminTripsToJson(trips);
}

export async function getDeletedTripSlugs(): Promise<string[]> {
  if (canUsePrisma()) {
    try {
      const rows = await prisma.deletedTripSlug.findMany({
        orderBy: {
          createdAt: "desc"
        }
      });

      return rows.map((row) => row.slug);
    } catch (error) {
      console.error("DB getDeletedTripSlugs failed, using JSON fallback:", error);
    }
  }

  return getDeletedTripSlugsFromJson();
}

export async function saveDeletedTripSlugs(slugs: string[]) {
  if (canUsePrisma()) {
    try {
      await prisma.$transaction([
        prisma.deletedTripSlug.deleteMany(),
        ...slugs.map((slug) => prisma.deletedTripSlug.create({ data: { slug } }))
      ]);
      return;
    } catch (error) {
      console.error("DB saveDeletedTripSlugs failed, using JSON fallback:", error);
    }
  }

  await saveDeletedTripSlugsToJson(slugs);
}

export async function getAllTrips(): Promise<Trip[]> {
  const adminTrips = await getAdminTrips();
  const deletedSlugs = new Set(await getDeletedTripSlugs());
  const adminTripSlugs = new Set(adminTrips.map((trip) => trip.slug));

  const visibleSeededTrips = seededTrips.filter((trip) => !deletedSlugs.has(trip.slug) && !adminTripSlugs.has(trip.slug));

  return [...visibleSeededTrips, ...adminTrips];
}

export async function getTripBySlug(slug: string): Promise<Trip | undefined> {
  const allTrips = await getAllTrips();
  return allTrips.find((trip) => trip.slug === slug);
}

export async function getFeaturedTrips(): Promise<Trip[]> {
  const allTrips = await getAllTrips();
  return allTrips.filter((trip) => trip.featured);
}

export async function createAdminTrip(trip: Trip): Promise<Trip> {
  const allTrips = await getAllTrips();
  const slugExists = allTrips.some((existingTrip) => existingTrip.slug === trip.slug);

  if (slugExists) {
    throw new Error("A trip with this slug already exists.");
  }

  if (canUsePrisma()) {
    try {
      const created = await prisma.adminTrip.create({
        data: toAdminTripCreateInput(trip)
      });

      return toTrip(created);
    } catch (error) {
      console.error("DB createAdminTrip failed, using JSON fallback:", error);
    }
  }

  const adminTrips = await getAdminTripsFromJson();
  adminTrips.push(trip);
  await saveAdminTripsToJson(adminTrips);

  return trip;
}

export async function updateTripBySlug(currentSlug: string, updatedTrip: Trip): Promise<Trip> {
  const adminTrips = await getAdminTrips();
  const seededTripExists = seededTrips.some((trip) => trip.slug === currentSlug);
  const adminTripExists = adminTrips.some((trip) => trip.slug === currentSlug);

  if (!seededTripExists && !adminTripExists) {
    throw new Error("Trip not found.");
  }

  const allTrips = await getAllTrips();
  const slugExists = allTrips.some((trip) => trip.slug === updatedTrip.slug && trip.slug !== currentSlug);
  if (slugExists) {
    throw new Error("A trip with this slug already exists.");
  }

  if (canUsePrisma()) {
    try {
      const existingAdminTrip = await prisma.adminTrip.findUnique({
        where: { slug: currentSlug }
      });

      if (existingAdminTrip) {
        const updated = await prisma.adminTrip.update({
          where: { slug: currentSlug },
          data: {
            ...toAdminTripCreateInput(updatedTrip),
            id: undefined
          }
        });

        return toTrip(updated);
      }

      const created = await prisma.adminTrip.create({
        data: toAdminTripCreateInput(updatedTrip)
      });

      if (updatedTrip.slug !== currentSlug) {
        await saveDeletedSeededSlug(currentSlug);
      }

      return toTrip(created);
    } catch (error) {
      console.error("DB updateTripBySlug failed, using JSON fallback:", error);
    }
  }

  const adminTripsFromJson = await getAdminTripsFromJson();
  const adminTripIndex = adminTripsFromJson.findIndex((trip) => trip.slug === currentSlug);

  if (adminTripIndex >= 0) {
    adminTripsFromJson[adminTripIndex] = updatedTrip;
    await saveAdminTripsToJson(adminTripsFromJson);
    return updatedTrip;
  }

  adminTripsFromJson.push(updatedTrip);
  await saveAdminTripsToJson(adminTripsFromJson);

  if (updatedTrip.slug !== currentSlug) {
    const deletedSlugs = await getDeletedTripSlugsFromJson();
    if (!deletedSlugs.includes(currentSlug)) {
      deletedSlugs.push(currentSlug);
      await saveDeletedTripSlugsToJson(deletedSlugs);
    }
  }

  return updatedTrip;
}

export async function deleteTripBySlug(slug: string): Promise<void> {
  const adminTrips = await getAdminTrips();
  const adminTripExists = adminTrips.some((trip) => trip.slug === slug);

  if (canUsePrisma()) {
    try {
      if (adminTripExists) {
        await prisma.adminTrip.delete({
          where: { slug }
        });
        return;
      }

      const seededTripExists = seededTrips.some((trip) => trip.slug === slug);
      if (!seededTripExists) {
        throw new Error("Trip not found.");
      }

      await saveDeletedSeededSlug(slug);
      return;
    } catch (error) {
      if (error instanceof Error && error.message === "Trip not found.") {
        throw error;
      }

      console.error("DB deleteTripBySlug failed, using JSON fallback:", error);
    }
  }

  const adminTripsFromJson = await getAdminTripsFromJson();
  const adminTripExistsInJson = adminTripsFromJson.some((trip) => trip.slug === slug);

  if (adminTripExistsInJson) {
    await saveAdminTripsToJson(adminTripsFromJson.filter((trip) => trip.slug !== slug));
    return;
  }

  const seededTripExists = seededTrips.some((trip) => trip.slug === slug);
  if (!seededTripExists) {
    throw new Error("Trip not found.");
  }

  const deletedSlugs = await getDeletedTripSlugsFromJson();
  if (!deletedSlugs.includes(slug)) {
    deletedSlugs.push(slug);
    await saveDeletedTripSlugsToJson(deletedSlugs);
  }
}
