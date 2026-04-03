import { trips } from "@/lib/data/trips";

export interface JuniorExplorerBenefit {
  title: string;
  description: string;
}

export interface JuniorExplorerLearningCard {
  title: string;
  description: string;
}

export interface JuniorExplorerScheduleItem {
  month: string;
  date?: string;
  name: string;
  difficulty?: string;
  endurance?: string;
  cost?: string;
}

const heroImage =
  trips[0]?.heroImage ??
  "https://images.unsplash.com/photo-1508264165352-258db2ebd59b?auto=format&fit=crop&w=1400&q=80";
const supportImage =
  trips[2]?.heroImage ??
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=80";
const learningImage =
  trips[1]?.heroImage ??
  "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1400&q=80";

export const juniorExplorersContent = {
  eyebrow: "Junior Explorers",
  title: "Safe, meaningful monthly adventure for children who should grow beyond the classroom.",
  subtitle: "An initiative by Explorers Treks & Tours / Team Explorers.",
  intro:
    "Junior Explorers is designed to help children and teenagers experience forts, nature, history, teamwork, and courage on a regular rhythm instead of only during one seasonal camp.",
  statement:
    "Adventure, forts, history, and nature should not be seasonal. They should be experienced at least once every month.",
  note:
    "The idea is simple: consistent outdoor exposure helps children grow physically, socially, emotionally, and practically.",
  heroImage,
  supportImage,
  learningImage,
  stats: [
    { label: "Age Focus", value: "8 to 14 Years" },
    { label: "Adventure Rhythm", value: "Monthly Exposure" },
    { label: "Safety Ratio", value: "1:10 Leaders" },
    { label: "Core Promise", value: "Safe + Meaningful" }
  ],
  benefits: [
    {
      title: "Builds a strong and healthy body",
      description: "Regular movement outdoors improves stamina, coordination, mobility, and healthy physical confidence."
    },
    {
      title: "Supports mental fitness and emotional stability",
      description: "Nature time, effort, and guided challenge help children become calmer, more balanced, and more resilient."
    },
    {
      title: "Improves decision-making skills",
      description: "Children learn to observe, adapt, and make better choices in real situations instead of only theoretical ones."
    },
    {
      title: "Teaches teamwork and coordination",
      description: "Outdoor activity naturally develops cooperation, shared responsibility, and respect for the group."
    },
    {
      title: "Builds trust and helping nature",
      description: "Children learn to care for others, support peers, and act responsibly on trail and at camp."
    },
    {
      title: "Develops confidence and fearlessness",
      description: "Every small challenge completed outdoors helps a child become more courageous and self-assured."
    }
  ] satisfies JuniorExplorerBenefit[],
  learningCards: [
    {
      title: "Forts and History",
      description: "Children do not only read about forts. They experience fortification, heritage, routes, and legacy in real places."
    },
    {
      title: "Geography in practice",
      description: "The Sahyadri ranges become visible, physical learning. Distances, ridges, valleys, and terrain begin to make sense."
    },
    {
      title: "Village life and simplicity",
      description: "Children understand how mountain villagers live with less comfort and stronger practical discipline."
    },
    {
      title: "The value of water",
      description: "They begin to respect every drop because they see directly how precious water is in the outdoors."
    },
    {
      title: "Responsible trekking habits",
      description: "They learn why saying no to plastic and yes to clean trails is part of being a responsible explorer."
    }
  ] satisfies JuniorExplorerLearningCard[],
  quote:
    "Important life lessons are not learned only from books. They become real through practical outdoor experience, discipline, and observation.",
  safetyItems: [
    "Certified and experienced leaders with a 1:10 ratio.",
    "Dynamic, child-friendly team that knows how to guide and encourage.",
    "Structured safety protocols designed for supervised adventure.",
    "First aid and risk-management trained staff on field duty.",
    "Proper supervision, communication, and discipline throughout the program."
  ],
  missionItems: [
    "Healthy individuals",
    "Responsible citizens",
    "Nature-loving youth",
    "Strong personalities for our nation"
  ],
  parentGifts: ["Confidence", "Courage", "Character", "Clarity", "Strength"],
  parentMessage:
    "Send your child every month and watch them grow into confident, fearless young explorers who develop not only academically, but also personally and socially.",
  scheduleNote:
    "All one-day treks are decided according to season. Where exact details are still pending, the page shows a graceful placeholder instead of a blank.",
  oneDayTreks: [
    {
      month: "April",
      date: "01.04.2026",
      name: "Summer Special Night Trek to Rohida",
      difficulty: "Moderate",
      endurance: "Normal"
    },
    {
      month: "April",
      date: "02.04.2026",
      name: "Raireshwar + Kenjalgad",
      difficulty: "Moderate",
      endurance: "Normal"
    },
    { month: "April", name: "Malhargad + Bhuleshwar" },
    { month: "May", name: "Kadepathar to Jejuri" },
    { month: "June", name: "Rajmachi (Shrivardhan & Manoranjan Forts)" },
    { month: "June", name: "Tung" },
    { month: "June", name: "Tikona" },
    { month: "June", name: "Rajgad" },
    { month: "June", name: "Torna" },
    { month: "June", name: "Raigad / Vasota" },
    { month: "June", name: "Lohgad" },
    { month: "June", name: "Visapur" },
    { month: "June", name: "Shivneri via Sakhaldand Route" },
    { month: "June", name: "Narayangad" },
    { month: "June", name: "Devkund Waterfall" },
    { month: "June", name: "Madheghat Waterfall" },
    { month: "June", name: "Junior Explorers One Day Adventure" },
    { month: "June", name: "Junior Explorers Green Trail" }
  ] satisfies JuniorExplorerScheduleItem[],
  campingTrips: [
    { month: "Seasonal", name: "Camping at Raireshwar" },
    { month: "Seasonal", name: "Camping at Pawna Lake" },
    { month: "Seasonal", name: "Camping at Rajmachi" },
    { month: "Seasonal", name: "Camping at Kothaligad" },
    { month: "Seasonal", name: "Camping with Star Gazing" }
  ] satisfies JuniorExplorerScheduleItem[],
  winterCamps: [{ month: "Winter", name: "Madheghat Tent Camping" }] satisfies JuniorExplorerScheduleItem[],
  summerCamps: [
    { month: "Summer", name: "Rajgad Adventure Camp" },
    { month: "Summer", name: "Torna Adventure Camp" },
    { month: "Summer", name: "Naneghat Adventure Camp" }
  ] satisfies JuniorExplorerScheduleItem[]
};
