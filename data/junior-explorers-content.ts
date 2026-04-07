export interface JuniorExplorerBenefit {
  title: string;
  description: string;
}

export interface JuniorExplorerLearningCard {
  title: string;
  description: string;
}

export interface JuniorExplorerMoment {
  title: string;
  description: string;
  image: string;
  caption: string;
}

export interface JuniorExplorerSummerCampCard {
  title: string;
  description: string;
  image: string;
  caption: string;
}

export interface JuniorExplorerScheduleItem {
  month: string;
  date?: string;
  name: string;
  difficulty?: string;
  endurance?: string;
  cost?: string;
}

const heroImage = "/content/junior-explorers/trek-hero.jpg";
const supportImage = "/content/junior-explorers/rappelling-support.jpg";
const learningImage = "/content/junior-explorers/tent-camp.jpg";

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
  fieldMoments: [
    {
      title: "Rope activities build courage",
      description: "Children learn trust, balance, and body confidence through supervised rope challenges.",
      image: "/content/junior-explorers/field-moments/rope-activity.jpg",
      caption: "Hands-on adventure with teamwork and trust"
    },
    {
      title: "Rappelling turns fear into focus",
      description: "Controlled vertical activities help children experience courage through step-by-step guidance.",
      image: "/content/junior-explorers/field-moments/rappelling.jpg",
      caption: "Confidence grows fastest when challenge is guided well"
    },
    {
      title: "Star gazing creates wonder",
      description: "Night sessions make the outdoors feel magical while teaching patience, observation, and curiosity.",
      image: "/content/junior-explorers/field-moments/star-gazing.jpg",
      caption: "Outdoor nights that children remember for years"
    },
    {
      title: "Traditional games keep culture alive",
      description: "Old Indian games bring movement, laughter, and a shared sense of simple joy into camp life.",
      image: "/content/junior-explorers/field-moments/old-indian-games.jpg",
      caption: "Community energy beyond screens and routine"
    },
    {
      title: "Tent life teaches practical comfort",
      description: "Camp routines help children adjust, organize themselves, and enjoy simplicity without complaint.",
      image: "/content/junior-explorers/field-moments/tent-evening.jpg",
      caption: "Comfort in nature, not comfort away from it"
    }
  ] satisfies JuniorExplorerMoment[],
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
  ] satisfies JuniorExplorerScheduleItem[],
  summerCampSpotlight: {
    title: "Summer camp should feel like a real mountain memory, not just a school break.",
    description:
      "The Manali Adventure Camp set adds a more aspirational layer to Junior Explorers. It shows how our seasonal camp language can grow from local exposure into bigger mountain-based journeys with activity, bonding, and disciplined fun.",
    heroImage: "/content/junior-explorers/summer-camp/manali-hero.jpg",
    heroCaption: "Summer camps that feel like a real expedition",
    cards: [
      {
        title: "Team movement in the mountains",
        description: "Campers experience togetherness, altitude, and outdoor structure in one journey.",
        image: "/content/junior-explorers/summer-camp/manali-team.jpg",
        caption: "Children remember the people as much as the place"
      },
      {
        title: "Activity-led confidence building",
        description: "Adventure tasks, movement, and open-air experiences turn vacation time into growth time.",
        image: "/content/junior-explorers/summer-camp/manali-activity.jpg",
        caption: "Energy, movement, and challenge in the right setting"
      },
      {
        title: "Camp atmosphere after the day slows down",
        description: "The evening rhythm of camp creates bonding, reflection, and the feeling of a real outdoor journey.",
        image: "/content/junior-explorers/summer-camp/manali-campfire.jpg",
        caption: "A season children carry back home with them"
      }
    ] satisfies JuniorExplorerSummerCampCard[]
  }
};
