import { trips } from "@/lib/data/trips";

export interface SilverTrailFeature {
  title: string;
  description: string;
}

export interface SilverTrailProgram {
  title: string;
  description: string;
  image: string;
  caption: string;
  fit: string;
}

const heroImage =
  trips[3]?.heroImage ??
  trips[2]?.heroImage ??
  "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&w=1400&q=80";
const sahyadriImage =
  trips[2]?.heroImage ??
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=80";
const wellnessImage =
  trips[5]?.heroImage ??
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80";
const heritageImage =
  trips[0]?.heroImage ??
  "https://images.unsplash.com/photo-1508264165352-258db2ebd59b?auto=format&fit=crop&w=1400&q=80";
const himalayaImage =
  trips[3]?.heroImage ??
  "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&w=1400&q=80";

export const silverTrailsContent = {
  eyebrow: "Silver Trails Club",
  title: "A private adventure community for 40+ explorers who want comfort, confidence, and meaningful journeys.",
  subtitle: "Safe and comfortable adventure tours for adults above 40 and 50.",
  intro:
    "Silver Trails is a specialized adventure and travel initiative for mature adults who want to explore nature without pressure, without competition, and without risk overload.",
  statement:
    "Age is silver. Spirit is gold. Adventure is not about speed. It is about courage, connection, and confidence.",
  heroImage,
  stats: [
    { label: "Age Focus", value: "40+ and 50+" },
    { label: "Adventure Style", value: "Safe + Comfortable" },
    { label: "Core Promise", value: "No Pressure" },
    { label: "Vision", value: "India's Trusted 40+ Platform" }
  ],
  vision:
    "To create India’s most trusted adventure platform for adults above 40 and 50, where safety, comfort, and confidence matter more than speed.",
  missionItems: [
    "Make trekking safe for mature adults",
    "Remove fear of physical limitations",
    "Encourage gradual fitness improvement",
    "Create meaningful community experiences",
    "Redefine adventure for the silver generation"
  ],
  about:
    "Silver Trails is built for adults who still want adventure, but want it in a different way. Walking pace slows down, comfort becomes important, safety matters more, and like-minded company becomes essential. This page is designed around that reality, not against it.",
  chooseFeatures: [
    {
      title: "Safe treks for 40+ and 50+ age groups",
      description: "Programs are shaped with professional trek leaders, medical readiness support, risk assessment planning, emergency response protocols, and age-appropriate difficulty grading."
    },
    {
      title: "Comfortable and slow-paced adventure",
      description: "No racing and no comparison with younger groups. Walking speed is moderate, breaks are frequent, distances are shorter, and elevation gain is gradual."
    },
    {
      title: "A like-minded 40+ community",
      description: "Travel with professionals, business owners, retired individuals, homemakers, and leaders who are in the same stage of life and want meaningful company."
    },
    {
      title: "Stress relief and mental wellness through nature",
      description: "Silver Trails is also a stress detox, nature therapy, digital detox, and mental rejuvenation experience for people carrying fatigue and lifestyle imbalance."
    }
  ] satisfies SilverTrailFeature[],
  idealFor: [
    "Adults above 40 years",
    "Adults above 50 years",
    "Couples seeking safe adventure tours",
    "Corporate leaders seeking retreat programs",
    "Beginners looking for easy Himalayan treks",
    "People who missed adventure in their younger age"
  ],
  programs: [
    {
      title: "Easy Sahyadri Treks for 40+",
      description: "Beginner-friendly weekend treks in Maharashtra designed around safer pacing, scenic reward, and confidence-building movement.",
      image: sahyadriImage,
      caption: "Gentle Sahyadri movement with comfort-first rhythm",
      fit: "Best for first-time trekkers and restart journeys"
    },
    {
      title: "Soft Himalayan Treks",
      description: "Low-difficulty Himalayan experiences with acclimatization awareness, cleaner pacing, and stronger support for mature participants.",
      image: himalayaImage,
      caption: "Altitude with care, not pressure",
      fit: "Best for bucket-list mountain journeys with support"
    },
    {
      title: "Nature Retreats for 50+",
      description: "Relaxed travel programs with light walking, scenic exploration, slower mornings, and restorative nature time.",
      image: wellnessImage,
      caption: "Retreat-style travel that restores energy",
      fit: "Best for stress relief, wellness, and scenic escape"
    },
    {
      title: "Heritage Walks and Cultural Trails",
      description: "Comfortable journeys through historical and cultural destinations for explorers who want depth without physical overload.",
      image: heritageImage,
      caption: "Stories, heritage, and gentle exploration",
      fit: "Best for mature explorers who enjoy meaning and context"
    },
    {
      title: "Spiritual and Wellness Trails",
      description: "Temple circuits, meditation retreats, and mindful journeys designed around calm, connection, and inner renewal.",
      image: wellnessImage,
      caption: "Mindful movement with inner space",
      fit: "Best for restorative and reflective travel"
    }
  ] satisfies SilverTrailProgram[],
  safetyModel: [
    "Pre-trek fitness guidance before departure",
    "Detailed medical declaration process",
    "Leader-to-participant ratio control",
    "Emergency evacuation planning",
    "Comfortable stays with hygiene standards",
    "Nutritious and simple meals"
  ],
  philosophyBullets: [
    "Rebuild stamina gradually",
    "Regain confidence",
    "Overcome physical hesitation",
    "Cross mental boundaries",
    "Experience freedom after responsibilities"
  ],
  faqs: [
    {
      question: "Is trekking safe for people above 50?",
      answer: "Yes. With proper planning, medical screening, and difficulty grading, trekking can be absolutely safe for adults above 50."
    },
    {
      question: "Are these treks difficult?",
      answer: "No. Silver Trails focuses on easy to moderate grade journeys suitable for beginners and mature adults."
    },
    {
      question: "Do I need prior trekking experience?",
      answer: "Not required. Many participants in Silver Trails are first-time trekkers above 40."
    },
    {
      question: "Is medical support available?",
      answer: "Yes. The model includes structured safety preparation and emergency response planning."
    }
  ],
  differentiators: [
    "Exclusive 40+ and 50+ focus",
    "Age-sensitive itinerary design",
    "Comfort-first adventure planning",
    "Strong safety SOP",
    "Community-based travel approach",
    "Managed by experienced adventure professionals"
  ],
  closing:
    "It’s not late. It’s your time. Explore, reconnect, and reclaim your adventure with a community that understands what this stage of life truly needs.",
  ctaLine: "Limited batch size for better safety."
};
