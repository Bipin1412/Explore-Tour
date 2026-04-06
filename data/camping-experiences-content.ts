import { trips } from "@/lib/data/trips";

const sahyadriImage =
  trips[0]?.heroImage ??
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80";
const lakeImage = trips[7]?.heroImage ?? sahyadriImage;
const forestImage = trips[6]?.heroImage ?? sahyadriImage;
const coastalImage = trips[8]?.heroImage ?? lakeImage;
const valleyImage = trips[5]?.heroImage ?? sahyadriImage;

export interface CampingLocationCard {
  slug: string;
  title: string;
  distance: string;
  campingTypes: string[];
  price: string;
  summary: string;
  image: string;
  note?: string;
}

export interface CampingItineraryStep {
  time: string;
  title: string;
  description: string;
}

export const campingExperiencesContent = {
  eyebrow: "Camping",
  title: "Raw outdoor stays, scenic routes, and real camping culture across Maharashtra.",
  subtitle:
    "Camping experiences with Explorers Group are built for friends, families, corporates, schools, and college groups who want nature, simplicity, and real adventure rather than a luxury resort stay.",
  intro:
    "We offer affordable, nature-based camping across Maharashtra with local food, basic yet clean facilities, shared washrooms, authentic outdoor living, and the freedom to shape the trip around your group. Hotel and homestay options can also be arranged as per requirement and availability.",
  heroImage: lakeImage,
  supportImage: forestImage,
  caption: "Campfire warmth, open skies, and a true return to nature",
  stats: [
    { label: "Starting Range", value: "Rs.999*" },
    { label: "Custom Groups", value: "15+ Participants" },
    { label: "Audience", value: "Friends | Families | Teams" },
    { label: "Format", value: "Weekend + Weekday" }
  ],
  corePoints: [
    "Affordable nature-based camping across Maharashtra",
    "Local food and authentic outdoor living",
    "Basic yet clean facilities with shared washrooms",
    "Transport, trekking, and adventure activities can be arranged",
    "Custom programs available for groups of 15+ participants",
    "Weekday camping available to avoid weekend rush and crowds"
  ],
  differentiators: [
    "Scenic Pawna Lake camping and calm reservoir-side settings",
    "Panshet camping with multiple campsite styles, villa options, and glamping tents",
    "Beach camping and coastal nights with bonfire and sea breeze",
    "Vasota lakeside wilderness for nature lovers and adventure seekers",
    "A real wilderness camping experience where comfort meets adventure"
  ],
  activities: [
    "Kayaking and boating",
    "Trekking and fort exploration",
    "Nature trails and sunrise walks",
    "Bonfire and group activities",
    "DJ and live music"
  ],
  locations: [
    {
      slug: "pawna",
      title: "Pawna Lake Camping",
      distance: "35 kms from Pune",
      campingTypes: ["Dome Shape Tents", "Glamping Tents", "Swiss Cottage Tents", "Villas"],
      price: "Starting from Rs.999* onwards",
      summary:
        "Lakeside camping near Pune with scenic views, bonfire, music, and local delicious food. Ideal for weekend getaways with optional trekking and boating activities.",
      image: lakeImage
    },
    {
      slug: "vasota",
      title: "Vasota Lakeside Camping",
      distance: "150 kms from Pune",
      campingTypes: ["Dome Shape Tents", "Hotel Rooms"],
      price: "Starting from Rs.999* onwards",
      summary:
        "Camping near Shivsagar Lake with raw wilderness vibes, night camping, and Vasota trek access. Best for nature lovers and adventure seekers.",
      image: forestImage
    },
    {
      slug: "bhandardara",
      title: "Bhandardara Lake Camping",
      distance: "200 kms from Pune",
      campingTypes: ["Dome Shape Tents", "Hotel Rooms", "Luxury Hotels"],
      price: "Starting from Rs.999* onwards",
      summary:
        "Peaceful lakeside camping near Arthur Lake with waterfall views, trekking routes, and stargazing, ideal for families and groups.",
      image: valleyImage
    },
    {
      slug: "malshejghat",
      title: "Malshej Ghat Lakeside Camping",
      distance: "125 kms from Pune",
      campingTypes: ["Dome Shape Tents", "Hotel Rooms", "Luxury Hotels"],
      price: "Starting from Rs.999* onwards",
      summary:
        "Monsoon and winter camping surrounded by mountains, fog, and waterfalls, with short treks and birdwatching opportunities.",
      image: valleyImage
    },
    {
      slug: "mahabaleshwar",
      title: "Mahabaleshwar Camping",
      distance: "125 kms from Pune",
      campingTypes: ["Dome Shape Tents", "Hotel Rooms", "Luxury Hotels"],
      price: "Starting from Rs.999* onwards",
      summary:
        "Hill-station camping amidst forests and valleys with cool climate, sunrise points, and nearby treks.",
      image: forestImage
    },
    {
      slug: "kolad",
      title: "Kolad Camping",
      distance: "110 kms from Pune",
      campingTypes: ["Dome Shape Tents", "Hotel Rooms", "Luxury Hotels"],
      price: "Starting from Rs.999* onwards",
      summary:
        "Riverside camping near Kundalika River, popular for rafting, kayaking, and adventure activities, ideal for corporates and youth groups.",
      image: forestImage
    },
    {
      slug: "panshet",
      title: "Panshet Camping",
      distance: "35 kms from Pune",
      campingTypes: ["Dome Shape Tents", "Hotel Rooms", "Villas"],
      price: "Starting from Rs.999* onwards",
      summary:
        "Lake-view camping close to Pune with calm surroundings, water activities, and beginner-friendly treks.",
      image: lakeImage,
      note: "Minimum 5 campsite options available, with villa and glamping tent choices."
    },
    {
      slug: "revdanda",
      title: "Revdanda Beach Camping",
      distance: "35 kms from Pune",
      campingTypes: ["Dome Shape Tents", "Hotel Rooms", "Villas"],
      price: "Starting from Rs.999* onwards",
      summary:
        "Beach camping near Alibaug with sea breeze, bonfire, and coastal walks, perfect for relaxed group outings.",
      image: coastalImage
    },
    {
      slug: "alibaug",
      title: "Alibaug Beach Camping",
      distance: "35 kms from Pune",
      campingTypes: ["Dome Shape Tents", "Hotel Rooms", "Villas"],
      price: "Rs.999* onwards",
      summary:
        "Coastal camping with easy beach access, sunset time, bonfire energy, and a softer weekend escape format.",
      image: coastalImage
    },
    {
      slug: "malvan",
      title: "Malvan Beach Camping",
      distance: "35 kms from Pune",
      campingTypes: ["Dome Shape Tents", "Hotel Rooms", "Villas"],
      price: "Starting from Rs.999* onwards",
      summary:
        "Konkan beach camping with local Malvani food, water sports, snorkelling, and coastal exploration.",
      image: coastalImage
    },
    {
      slug: "uran",
      title: "Uran Beach Camping",
      distance: "35 kms from Pune",
      campingTypes: ["Dome Shape Tents", "Hotel Rooms", "Villas"],
      price: "Starting from Rs.999* onwards",
      summary:
        "A short coastal outing option for beachside camping, evening relaxation, and group-friendly sea-breeze stays.",
      image: coastalImage
    },
    {
      slug: "madheghat",
      title: "Madheghat Camping",
      distance: "35 kms from Pune",
      campingTypes: ["Dome Shape Tents", "Hotel Rooms", "Villas"],
      price: "Starting from Rs.999* onwards",
      summary:
        "Forest-side camping near waterfalls and historical routes, suitable for offbeat trekking and quiet nature stays.",
      image: sahyadriImage
    },
    {
      slug: "tikona",
      title: "Tikona Fort Camping",
      distance: "35 kms from Pune",
      campingTypes: ["Dome Shape Tents", "Hotel Rooms", "Villas"],
      price: "Starting from Rs.999* onwards",
      summary:
        "Camping at the base of Tikona Fort with night views of Pawna Lake and an early-morning fort trek.",
      image: sahyadriImage
    },
    {
      slug: "rajmachi",
      title: "Rajmachi Fort Camping",
      distance: "85 kms from Pune",
      campingTypes: ["Dome Shape Tents", "Hotel Rooms", "Villas"],
      price: "Starting from Rs.999* onwards",
      summary:
        "A popular Sahyadri camping location offering fireflies season treks, historic forts, and scenic trails.",
      image: sahyadriImage
    },
    {
      slug: "prabalmachi",
      title: "Prabalmachi Fort Camping",
      distance: "35 kms from Pune",
      campingTypes: ["Dome Shape Tents", "Hotel Rooms", "Villas"],
      price: "Starting from Rs.999* onwards",
      summary:
        "Beginner-friendly camping near the Mumbai-Pune route with plateau views and short trek options.",
      image: sahyadriImage
    },
    {
      slug: "raireshwar",
      title: "Raireshwar Camping",
      distance: "35 kms from Pune",
      campingTypes: ["Dome Shape Tents", "Hotel Rooms", "Villas"],
      price: "Starting from Rs.999* onwards",
      summary:
        "A scenic plateau-side camping format with open views, breezy mornings, and easy access to heritage-rich terrain.",
      image: valleyImage
    },
    {
      slug: "harishchandragad",
      title: "Harishchandragad Camping",
      distance: "35 kms from Pune",
      campingTypes: ["Dome Shape Tents", "Hotel Rooms", "Villas"],
      price: "Starting from Rs.999* onwards",
      summary:
        "High-altitude camping for experienced trekkers with Konkan Kada views, night trekking, and star-filled skies.",
      image: sahyadriImage
    }
  ] satisfies CampingLocationCard[],
  itinerary: [
    {
      time: "Day 1 | 04:00 PM",
      title: "Reach the campsite and have a welcome drink",
      description:
        "Arrive, settle in, and begin the experience with the first breath of the landscape."
    },
    {
      time: "Day 1 | 05:00 PM",
      title: "Evening snacks with tea or coffee",
      description:
        "Relax into the campsite rhythm and prepare for the best light of the day."
    },
    {
      time: "Day 1 | 05:30 PM",
      title: "Photography and campsite exploration",
      description:
        "Use the evening for stunning pictures with your group and slow walks around the camp."
    },
    {
      time: "Day 1 | 06:00 PM",
      title: "Games, nature time, and sunset hours",
      description:
        "Play badminton or volleyball, enjoy the beach, lake, or hill setting, or simply unwind until sunset."
    },
    {
      time: "Day 1 | 08:00 PM",
      title: "Veg and Non-Veg BBQ",
      description:
        "The evening meal starts with the classic camping favorite before the music begins."
    },
    {
      time: "Day 1 | 08:30 PM",
      title: "Music and group energy",
      description:
        "Move and groove to the beats while the camp atmosphere comes alive."
    },
    {
      time: "Day 1 | 10:00 PM",
      title: "Dinner",
      description:
        "A full vegetarian and non-vegetarian dinner is served for the group."
    },
    {
      time: "Day 1 | 11:00 PM",
      title: "Campfire with live music or antakshari",
      description:
        "This is the most awaited moment of the stay, with live guitarist support on Saturdays and selected locations only."
    },
    {
      time: "Day 2 | 12:00 AM",
      title: "Open-air movie screening",
      description:
        "A late-night shared moment under the sky for campers who want the full weekend feel."
    },
    {
      time: "Day 2 | 07:00 AM",
      title: "Wake up, freshen up, and breakfast",
      description:
        "Enjoy the chilled breeze, sea air, lakeside calm, or valley quiet before the camp wraps up."
    },
    {
      time: "Day 2 | 08:30 AM",
      title: "Morning leisure and activities",
      description:
        "Spend the final hour at the beachside, lakeside, or valley side, playing games or joining activity options."
    },
    {
      time: "Day 2 | 10:00 AM",
      title: "Checkout with memories",
      description:
        "The camp closes with a simple checkout and a strong aftertaste of nature."
    }
  ] satisfies CampingItineraryStep[],
  timingNote:
    "Above mentioned timings are tentative and may fluctuate depending on route conditions, weather, location setup, and overall group flow."
};
