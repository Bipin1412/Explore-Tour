import { trips } from "@/lib/data/trips";

const sahyadriImage =
  trips[0]?.heroImage ??
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80";
const forestImage = trips[6]?.heroImage ?? sahyadriImage;
const heritageImage = trips[5]?.heroImage ?? sahyadriImage;

export interface MountainRunCategory {
  title: string;
  trailType: string;
  age: string;
  distance: string;
  description: string;
}

export interface TimelineStep {
  time: string;
  title: string;
  description: string;
}

export interface RegistrationCategory {
  title: string;
  age: string;
  distance: string;
  fee: string;
}

export const explorersMountainRunContent = {
  eyebrow: "Speciality Program",
  title: "Explorers Mountain Run",
  tagline: "Run the Trails. Discover Your Strength.",
  subtitle:
    "A quarterly outdoor trail event for all age groups that blends fort trails, forest paths, mountain routes, heritage landscapes, and the spirit of exploration.",
  intro:
    "Explorers Mountain Run is designed for kids, teenagers, adults, families, corporate groups, and senior explorers who want more than a city marathon. It is a safe, well-organized outdoor challenge where fitness, adventure, history, and nature experience come together.",
  heroImage: sahyadriImage,
  supportImage: forestImage,
  heritageImage,
  statement:
    "Run beyond roads. Run the mountains. Every edition is built to feel like an exploration journey rather than a standard race day.",
  stats: [
    { label: "Event Rhythm", value: "Quarterly" },
    { label: "Audience", value: "All Age Groups" },
    { label: "Terrain", value: "Fort | Forest | Mountain" },
    { label: "Formats", value: "1 Day / 1N2D" }
  ],
  perfectFor: [
    "Students",
    "Families",
    "Corporate groups",
    "Adventure enthusiasts",
    "Senior fitness communities"
  ],
  highlights: [
    "Trail Running Experience",
    "Multiple Age Categories",
    "Fort and Nature Trails",
    "Safe and Professionally Managed Routes",
    "Family Friendly Adventure Event"
  ],
  stayOptions: ["Tents under the open sky", "Local homestays", "Simple hotels"],
  vision:
    "To build a strong outdoor fitness culture and inspire people to explore the mountains, forts, and forests while promoting health, adventure, and environmental awareness.",
  uniqueBullets: [
    "Mountain trails",
    "Fort pathways",
    "Forest tracks",
    "Natural landscapes",
    "Adventure atmosphere"
  ],
  participantBullets: [
    "Kids discovering outdoor adventure",
    "Students building endurance and confidence",
    "Young runners seeking trail challenges",
    "Adventure enthusiasts and trekkers",
    "Families looking for outdoor activities",
    "Senior citizens maintaining active lifestyles"
  ],
  upcomingEvent: "Registrations Opening Soon",
  categories: [
    {
      title: "Kids Explorers Run",
      trailType: "Easy Trail",
      age: "5 - 8 Years",
      distance: "500 m - 1 km",
      description:
        "A fun introduction to trail running with small adventure elements, nature discovery, obstacles, and confidence building."
    },
    {
      title: "Junior Explorers Run",
      trailType: "Moderate Trail",
      age: "8 - 12 Years",
      distance: "2 - 3 km",
      description:
        "Young explorers move through easy forest trails and open landscapes, building stamina, confidence, and love for outdoor activity."
    },
    {
      title: "Teen Trail Run",
      trailType: "Fort Trail",
      age: "12 - 14 Years",
      distance: "3 - 5 km",
      description:
        "Teenagers get introduced to more real trail terrain with fort routes, endurance movement, and navigation-style challenge."
    },
    {
      title: "Youth Adventure Run",
      trailType: "Adventure Trail",
      age: "14 - 18 Years",
      distance: "5 - 7 km",
      description:
        "Designed for energetic teenagers who want to push endurance and discover mountain and fort trails with stronger challenge."
    },
    {
      title: "Open Trail Run",
      trailType: "Challenge Trail",
      age: "18+ Years",
      distance: "7 km / 12 km / 21 km",
      description:
        "Ideal for runners, trekkers, and adventure enthusiasts who want the thrill of mountain trail running at different endurance levels."
    },
    {
      title: "Senior Explorers Run",
      trailType: "Scenic Heritage Trail",
      age: "50+ Years",
      distance: "3 - 5 km",
      description:
        "A comfortable and enjoyable trail run or walk focused on fitness, heritage exploration, and active aging in nature."
    }
  ] satisfies MountainRunCategory[],
  benefits: {
    physical: ["Endurance building", "Fitness motivation", "Outdoor sports culture"],
    mental: ["Confidence", "Discipline", "Goal setting"],
    educational: ["Fort history awareness", "Nature appreciation", "Navigation skills"],
    community: ["Family participation", "Youth engagement", "Outdoor culture development"]
  },
  oneDayIntro:
    "A typical one-day edition is designed for smooth participation, clear safety management, and a memorable outdoor experience near Pune.",
  oneDaySchedule: [
    {
      time: "05:00 AM",
      title: "Participant Arrival and Registration",
      description:
        "Participants report at the base location, collect bib numbers, and complete registration."
    },
    {
      time: "05:30 AM",
      title: "Warm-Up and Safety Briefing",
      description:
        "Professional instructors guide participants through warm-up exercises and explain trail safety guidelines."
    },
    {
      time: "06:00 AM",
      title: "Flag-Off - Long Distance Categories",
      description:
        "The longest distance trail run categories start first to ensure comfortable completion time."
    },
    {
      time: "06:30 AM",
      title: "Flag-Off - Medium Distance Categories",
      description: "Teen and moderate trail runners begin their run."
    },
    {
      time: "07:30 AM",
      title: "Kids Explorers Run",
      description: "A fun and energetic run specially designed for young participants."
    },
    {
      time: "08:30 AM",
      title: "Breakfast and Refreshments",
      description: "Participants enjoy a healthy breakfast after completing their trail run."
    },
    {
      time: "09:30 AM",
      title: "Finisher Medals and Prize Distribution",
      description:
        "Top performers in each category receive awards and all finishers are honoured with medals."
    },
    {
      time: "10:30 AM",
      title: "Heritage Talk / Nature Walk",
      description:
        "Participants can join an optional fort or nature exploration session conducted by the Explorers team."
    },
    {
      time: "11:30 AM",
      title: "Event Closing and Departure",
      description:
        "Participants leave with memories, achievements, and the spirit of an explorer."
    }
  ] satisfies TimelineStep[],
  overnightIntro:
    "The 1 Night / 2 Days version adds campsite bonding, heritage storytelling, and a fuller adventure rhythm around the main trail event.",
  overnightSchedule: [
    {
      time: "Day 1 | 03:00 PM",
      title: "Arrival and Campsite Check-In",
      description: "Participants arrive, settle in, and prepare for the evening program."
    },
    {
      time: "Day 1 | 04:30 PM",
      title: "Ice Breaker Games",
      description:
        "Simple group activities help participants connect across age groups and teams."
    },
    {
      time: "Day 1 | 05:30 PM",
      title: "Fort Heritage Walk",
      description: "A light exploration session introduces the landscape and local history."
    },
    {
      time: "Day 1 | 07:00 PM",
      title: "Dinner",
      description: "A shared meal with the group before the trail briefing."
    },
    {
      time: "Day 1 | 08:30 PM",
      title: "Trail Briefing",
      description:
        "Detailed guidance on route flow, categories, and next morning coordination."
    },
    {
      time: "Day 1 | 09:30 PM",
      title: "Campfire",
      description: "A relaxed closing moment before the run day starts early."
    },
    {
      time: "Day 2 | 05:30 AM",
      title: "Warm-Up Session",
      description: "Participants prepare with mobility work and event briefing."
    },
    {
      time: "Day 2 | 06:00 AM",
      title: "Trail Run Start",
      description:
        "The running categories begin according to distance and trail difficulty."
    },
    {
      time: "Day 2 | 08:30 AM",
      title: "Breakfast",
      description: "Recovery meal and refreshments after the run."
    },
    {
      time: "Day 2 | 09:30 AM",
      title: "Medal Ceremony",
      description: "Recognition for finishers and winners."
    },
    {
      time: "Day 2 | 10:30 AM",
      title: "Departure",
      description: "The event closes with a strong sense of shared achievement."
    }
  ] satisfies TimelineStep[],
  registrationHighlights: [
    "Scenic mountain trail routes",
    "Fort and forest running experience",
    "Professional safety management",
    "Finisher medal for all participants",
    "Exciting prizes for winners",
    "Breakfast and refreshments included",
    "Certified Explorers event"
  ],
  registrationDetails: [
    "Location: Near Pune (Fort Trail Region)",
    "Event Format: One Day / 1 Night 2 Days Adventure Run",
    "Organised By: Explorers"
  ],
  registrationCategories: [
    {
      title: "Kids Explorers Run",
      age: "5 - 8 Years",
      distance: "1 km",
      fee: "To be announced"
    },
    {
      title: "Junior Explorers Run",
      age: "8 - 12 Years",
      distance: "3 km",
      fee: "To be announced"
    },
    {
      title: "Teen Trail Run",
      age: "12 - 18 Years",
      distance: "5 km",
      fee: "To be announced"
    },
    {
      title: "Adventure Trail Run",
      age: "18+ Years",
      distance: "7 km / 12 km",
      fee: "To be announced"
    },
    {
      title: "Challenge Trail Run",
      age: "18+ Years",
      distance: "21 km",
      fee: "To be announced"
    }
  ] satisfies RegistrationCategory[],
  whatYouGet: [
    "Trail Run Bib Number",
    "Finisher Medal",
    "Energy Drink and Water Support",
    "Trail Safety Support",
    "Breakfast / Refreshments",
    "Professional Event Management"
  ],
  safetySupport: [
    "Experienced Trail Leaders",
    "Marked Running Routes",
    "Medical Support Team",
    "Hydration Points",
    "Emergency Evacuation Plan",
    "Parents can confidently register children because the event is managed by experienced adventure professionals."
  ],
  slotNote:
    "To maintain safety and trail quality, the event has limited participant slots. Early registrations are recommended.",
  closing:
    "Adventure over routine. Trails over roads. Explorers Mountain Run is for people who want to discover strength in the outdoors and return with stories worth remembering."
};
