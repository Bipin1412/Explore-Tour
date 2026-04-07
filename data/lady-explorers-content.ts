import { trips } from "@/lib/data/trips";

export interface LadyExplorerFeature {
  title: string;
  description: string;
}

export interface LadyExplorerRhythm {
  title: string;
  cadence: string;
  description: string;
  image: string;
  caption: string;
}

const heroImage = "/content/lady-explorers/women-day-event.png";
const supportImage =
  trips[3]?.heroImage ??
  "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&w=1400&q=80";
const sahyadriImage =
  trips[2]?.heroImage ??
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=80";
const campingImage =
  trips[1]?.heroImage ??
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80";
const himalayaImage =
  trips[3]?.heroImage ??
  "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&w=1400&q=80";

export const ladyExplorersContent = {
  eyebrow: "Lady Explorers",
  title: "Explore. Empower. Elevate.",
  subtitle: "Where Stri Shakti meets the spirit of adventure.",
  intro:
    "Lady Explorers is not just a trekking group. It is a women-first adventure movement built to help women rediscover freedom, confidence, self-growth, and their own time in the middle of daily responsibilities.",
  statement:
    "You do not just climb mountains. You climb above your fears. You do not just camp in the wilderness. You rediscover your inner strength.",
  heroImage,
  supportImage,
  stats: [
    { label: "Core Promise", value: "Freedom + Safety" },
    { label: "Adventure Rhythm", value: "Monthly / Quarterly / Yearly" },
    { label: "Program Tone", value: "Women First" },
    { label: "Support Style", value: "Safe + Guided" }
  ],
  deserves: ["Freedom", "Safety", "Self-Growth", "Confidence", "Your Own Time"],
  whyNow:
    "In today’s routine life filled with responsibilities, deadlines, family duties, and expectations, women often get pushed behind everything else. Lady Explorers creates a dedicated space where women can step out, breathe, challenge themselves, and prove to themselves that they are capable of more.",
  safetyItems: [
    "Your safety is the first priority, not a side note.",
    "The team stays with you as a trusted travel buddy and responsible adventure partner.",
    "Counselling support, communication clarity, and structured guidance are part of the experience.",
    "Certified leaders, planned itineraries, risk assessment, proper equipment, and caring coordination help you enjoy fearlessly."
  ],
  journeyFeatures: [
    {
      title: "Breaks routine with purpose",
      description: "This is time set aside just for you, not as a luxury, but as something necessary for balance and growth."
    },
    {
      title: "Builds confidence in decision-making",
      description: "Adventure gives women repeated chances to trust themselves, choose well, and move with courage."
    },
    {
      title: "Improves mental strength and emotional balance",
      description: "Outdoor challenge and nature create a calmer, clearer, and more grounded version of yourself."
    },
    {
      title: "Increases fitness and stamina",
      description: "Treks, camps, and mountain movement improve physical capacity in a way that feels meaningful."
    },
    {
      title: "Develops leadership and survival skills",
      description: "Women learn to guide, adapt, support others, and move through uncertainty with more confidence."
    },
    {
      title: "Builds a similar-mindset community",
      description: "The crowd you meet here becomes a positive, encouraging, and life-giving women’s adventure circle."
    }
  ] satisfies LadyExplorerFeature[],
  rediscoveryBullets: [
    "Stay close to nature instead of constant routine pressure.",
    "Keep luxury aside for a while and feel the joy of simplicity.",
    "Live without expectations for a moment and still feel the biggest wow factor.",
    "Discover that strength, joy, and peace can exist together outdoors."
  ],
  powerPoints: ["Breaking routine", "Breaking fear", "Breaking limitations", "Building a stronger you"],
  startNow:
    "Do not wait for someday. Your freedom, your strength, and your adventure start today. When women explore together, they do not only create memories. They create a powerful community for life.",
  adventureRhythm: [
    {
      title: "One day in a month",
      cadence: "Monthly",
      description: "A dedicated day every month just for you to step out, move, reset, and reconnect with yourself.",
      image: sahyadriImage,
      caption: "Monthly day-trek energy for routine-breaking confidence"
    },
    {
      title: "One overnight camping in nature",
      cadence: "Quarterly",
      description: "A deeper nature pause every quarter to rest in the outdoors, breathe, and grow stronger with a women-first community.",
      image: campingImage,
      caption: "Quarterly camps that bring courage and calm together"
    },
    {
      title: "One Himalayan trek in a year",
      cadence: "Yearly",
      description: "A life-changing annual mountain journey that raises the bar for confidence, endurance, and self-belief.",
      image: himalayaImage,
      caption: "A yearly Himalayan challenge that changes self-belief"
    }
  ] satisfies LadyExplorerRhythm[],
  membershipBenefits: [
    {
      title: "Priority access to women-first batches",
      description: "Stay closer to upcoming Lady Explorers departures and community-led adventure rhythms."
    },
    {
      title: "A trusted and positive support circle",
      description: "Be part of a similar-mindset women’s crowd that encourages growth, confidence, and consistency."
    },
    {
      title: "Guided adventure with stronger comfort and clarity",
      description: "Benefit from safer communication, planned movement, and a team that understands women-first participation needs."
    },
    {
      title: "A personal growth journey, not just a trip list",
      description: "Membership is about becoming more confident, more capable, and more connected through regular adventure."
    }
  ] satisfies LadyExplorerFeature[]
};
