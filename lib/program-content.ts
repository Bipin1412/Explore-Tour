import { Trip } from "@/types/trip";

function titleCase(value: string) {
  return value
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getBatchWindow(trip: Trip) {
  const months = trip.bestMonths.slice(0, 3);
  if (months.length === 0) {
    return "Dates announced on request";
  }

  if (months.length === 1) {
    return `${months[0]} Batch`;
  }

  return `${months[0]} - ${months[months.length - 1]} Window`;
}

export function getPhotoCaption(trip: Trip, index = 0) {
  if (trip.photoCaptions?.[index]) {
    return trip.photoCaptions[index];
  }

  const fallbackCaptions = [
    `${trip.name} trail mood at ${trip.destination}`,
    `Route textures and terrain across ${trip.region}`,
    `Explorers group moments during the ${trip.category.toLowerCase()}`,
    `Scenic perspective from the ${trip.name} experience`
  ];

  return fallbackCaptions[index] ?? fallbackCaptions[fallbackCaptions.length - 1];
}

export function getAboutDestination(trip: Trip) {
  if (trip.aboutDestination?.trim()) {
    return trip.aboutDestination;
  }

  return `${trip.name} is a ${trip.durationDays}-day ${trip.difficulty.toLowerCase()} program in ${trip.destination}. It is designed around ${trip.region.toLowerCase()} landscapes, guided pacing, and a smooth on-ground experience for explorers looking for a well-organized departure.`;
}

export function getWhatToBring(trip: Trip) {
  return (
    trip.whatToBring ?? [
      "Government ID, personal medicines, and a small daypack",
      "Trail-friendly shoes with grip, quick-dry layers, and weather protection",
      "Water bottle, torch or headlamp, and a light energy snack kit",
      `Clothing suitable for ${trip.region.toLowerCase()} conditions and ${titleCase(
        trip.difficulty
      )} effort`
    ]
  );
}

export function getCancellationPolicy(trip: Trip) {
  return (
    trip.cancellationPolicy ?? [
      "Batch transfers are subject to seat availability and operational feasibility",
      "Transport or permit costs already committed may be non-refundable close to departure",
      "Weather, government restrictions, or safety reroutes may alter the program without notice"
    ]
  );
}

export function getRulesAndRegulations(trip: Trip) {
  return (
    trip.rulesAndRegulations ?? [
      "Follow the trek lead, sweep leader, and local coordination team at all times",
      "No littering, unsafe movement, or independent detours away from the group route",
      "Alcohol, substance use, and behavior that affects group safety are not permitted",
      "Participants should disclose fitness or health concerns before departure"
    ]
  );
}

export function getMapEmbedUrl(trip: Trip) {
  if (trip.mapEmbedUrl?.trim()) {
    return trip.mapEmbedUrl;
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(trip.destination)}&output=embed`;
}

export function getSuggestedEventDate(trip: Trip) {
  const month = trip.bestMonths[0] ?? "Next Available";
  return `${month} Upcoming Batch`;
}
