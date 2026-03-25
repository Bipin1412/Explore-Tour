import { promises as fs } from "fs";
import path from "path";
import { trips as seededTrips } from "@/lib/data/trips";
import { Trip } from "@/types/trip";

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

export async function getAdminTrips(): Promise<Trip[]> {
  await ensureJsonFile(adminTripsFilePath, "[]\n");

  try {
    const raw = await fs.readFile(adminTripsFilePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as Trip[]) : [];
  } catch {
    return [];
  }
}

export async function saveAdminTrips(trips: Trip[]) {
  await ensureJsonFile(adminTripsFilePath, "[]\n");
  await fs.writeFile(adminTripsFilePath, `${JSON.stringify(trips, null, 2)}\n`, "utf8");
}

export async function getDeletedTripSlugs(): Promise<string[]> {
  await ensureJsonFile(deletedTripsFilePath, "[]\n");

  try {
    const raw = await fs.readFile(deletedTripsFilePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export async function saveDeletedTripSlugs(slugs: string[]) {
  await ensureJsonFile(deletedTripsFilePath, "[]\n");
  await fs.writeFile(deletedTripsFilePath, `${JSON.stringify(slugs, null, 2)}\n`, "utf8");
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

  const adminTrips = await getAdminTrips();
  adminTrips.push(trip);
  await saveAdminTrips(adminTrips);

  return trip;
}

export async function updateTripBySlug(currentSlug: string, updatedTrip: Trip): Promise<Trip> {
  const adminTrips = await getAdminTrips();
  const seededTripExists = seededTrips.some((trip) => trip.slug === currentSlug);
  const adminTripIndex = adminTrips.findIndex((trip) => trip.slug === currentSlug);

  if (!seededTripExists && adminTripIndex === -1) {
    throw new Error("Trip not found.");
  }

  const allTrips = await getAllTrips();
  const slugExists = allTrips.some((trip) => trip.slug === updatedTrip.slug && trip.slug !== currentSlug);
  if (slugExists) {
    throw new Error("A trip with this slug already exists.");
  }

  if (adminTripIndex >= 0) {
    adminTrips[adminTripIndex] = updatedTrip;
    await saveAdminTrips(adminTrips);
    return updatedTrip;
  }

  adminTrips.push(updatedTrip);
  await saveAdminTrips(adminTrips);

  if (updatedTrip.slug !== currentSlug) {
    const deletedSlugs = await getDeletedTripSlugs();
    if (!deletedSlugs.includes(currentSlug)) {
      deletedSlugs.push(currentSlug);
      await saveDeletedTripSlugs(deletedSlugs);
    }
  }

  return updatedTrip;
}

export async function deleteTripBySlug(slug: string): Promise<void> {
  const adminTrips = await getAdminTrips();
  const adminTripExists = adminTrips.some((trip) => trip.slug === slug);

  if (adminTripExists) {
    await saveAdminTrips(adminTrips.filter((trip) => trip.slug !== slug));
    return;
  }

  const seededTripExists = seededTrips.some((trip) => trip.slug === slug);
  if (!seededTripExists) {
    throw new Error("Trip not found.");
  }

  const deletedSlugs = await getDeletedTripSlugs();
  if (!deletedSlugs.includes(slug)) {
    deletedSlugs.push(slug);
    await saveDeletedTripSlugs(deletedSlugs);
  }
}
