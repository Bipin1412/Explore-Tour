import { trips } from "@/lib/data/trips";

const heroImage = trips[8]?.heroImage ?? trips[0]?.heroImage ?? "";
const supportImage = trips[6]?.heroImage ?? trips[0]?.heroImage ?? "";
const caravanImage = trips[7]?.heroImage ?? trips[8]?.heroImage ?? "";

export const explorersOnWheelsContent = {
  eyebrow: "Explorers on Wheels",
  title: "A signature concept for bike, cycle, and caravan lovers who believe the journey matters as much as the destination.",
  subtitle:
    "Ride. Drive. Explore. Arrive. Settle. Experience.",
  intro:
    "Explorers on Wheels is designed for people who want real road adventure rather than packaged luxury. It is about self-driven exploration, scenic movement, team discipline, and unforgettable memories built through the road itself.",
  statement:
    "We do not promise luxury. We guarantee thrill, adventure, and real experiences.",
  heroImage,
  supportImage,
  caravanImage,
  stats: [
    { label: "Experience Types", value: "Bike | Cycle | Caravan" },
    { label: "Trip Duration", value: "1 Day to Multi-Day" },
    { label: "Stay Style", value: "Tents | Homestays | Simple Hotels" },
    { label: "Rhythm", value: "One Experience Every Month" }
  ],
  stayOptions: [
    "Tents under the open sky",
    "Local homestays",
    "Simple hotels"
  ],
  bike: {
    title: "Bike Expeditions",
    description:
      "Designed for passionate riders who believe the road is the real destination. Our bike expeditions combine scenic routes, team riding discipline, emergency backup support, medical assistance, and curated stays in tents, homestays, or simple hotels. These rides focus on thrill, brotherhood, road safety, and unforgettable adventure experiences rather than luxury.",
    eligibility: [
      "Rider must be 18 years or above",
      "Must hold a valid permanent driving license for two-wheelers",
      "Minimum 1 year of riding experience",
      "Good physical and mental fitness"
    ],
    mandatory: [
      "ISI, DOT, or ECE certified helmet is compulsory",
      "Riding jacket recommended with protection guards",
      "Full gloves, full pants, and ankle-length shoes only",
      "Basic rain gear during monsoon rides"
    ],
    vehicle: [
      "Valid RC, insurance, and PUC",
      "Brakes, lights, horn, and tyres in proper working condition",
      "Minimum 60 percent tyre condition recommended"
    ],
    recommended: [
      "Personal basic medical kit",
      "Hydration pack or water bottle",
      "Riding knee and elbow guards",
      "Emergency contact information shared with organizers"
    ],
    notAllowed: [
      "No triple riding",
      "No alcohol or substance use during the ride",
      "No stunt riding or rash driving",
      "No riding without helmet"
    ]
  },
  cycle: {
    title: "Cycling Expeditions",
    description:
      "Created for fitness lovers and endurance enthusiasts, our cycling expeditions promote physical strength, mental resilience, and team spirit. From one-day endurance rides to multi-day cycling tours, every journey includes route planning, hydration support, emergency vehicle backup, and safety coordination.",
    eligibility: [
      "Age 14 and above, with parental consent below 18",
      "Basic cycling knowledge is compulsory",
      "Ability to ride 25 to 30 km comfortably for one-day rides",
      "Good physical fitness and stamina"
    ],
    mandatory: [
      "Helmet is compulsory",
      "Full gloves recommended",
      "Proper sports shoes only",
      "Reflective vest for early morning or night rides",
      "Hydration bottle or hydration pack compulsory"
    ],
    vehicle: [
      "Geared or non-geared cycle in good condition",
      "Proper front and rear brakes",
      "Functional gears if geared cycle",
      "Good tyre condition with minimum 60 percent tread",
      "Front and rear lights for low-light rides",
      "Spare tube and basic repair kit recommended"
    ],
    recommended: [
      "Energy bars or dry snacks",
      "Personal basic medical kit",
      "Knee support for long endurance rides",
      "Emergency contact details shared with organizers"
    ],
    notAllowed: [
      "No riding without helmet",
      "No reckless racing within the group",
      "No headphone usage while riding",
      "No alcohol or substance use during the event"
    ]
  },
  caravan: {
    title: "Caravan Road Trips",
    description:
      "Not everyone wants to ride. Some want to experience the road in comfort and still be on wheels. Our caravan road trips are designed for travelers who want overland freedom without the responsibility of driving. Explorers manages the vehicle, route, halts, and logistics while participants relax and enjoy the journey.",
    intro:
      "It is a moving home on wheels with comfortable seating, sleeping arrangements, storage, and, where applicable, a basic kitchen setup and washroom facilities.",
    eligibility: [
      "Age 5 and above, with children accompanied by parents or guardians",
      "Valid ID proof compulsory",
      "Physically fit for road travel and outdoor stays",
      "Cooperative and team-friendly attitude"
    ],
    experience: [
      "Comfortable seating and sleeping arrangements",
      "Basic kitchen setup where applicable",
      "Storage space",
      "Washroom facilities where applicable",
      "Clean and organized travel environment"
    ],
    discipline: [
      "Follow travel timing and halt schedules",
      "Maintain cleanliness inside the caravan",
      "Respect co-travellers' space and privacy",
      "Follow safety briefing instructions",
      "No alcohol or substance use during travel"
    ],
    notAllowed: [
      "No standing or moving while the vehicle is in motion",
      "No disturbing the driver during driving",
      "No littering or damaging caravan property"
    ],
    idealFor: [
      "Families",
      "Corporate groups",
      "Senior citizens",
      "Adventure lovers who do not want to ride bikes or cycles"
    ]
  },
  specials: [
    "Build strong team spirit",
    "Experience local culture",
    "Improve physical fitness",
    "Develop a helping and supportive nature",
    "Participate in social causes",
    "Create unforgettable memories",
    "Stay connected to nature and remain grounded"
  ],
  safety: [
    "Emergency support SUV",
    "Complete medical kit",
    "Air pump and tubeless puncture kit",
    "Dedicated emergency rider",
    "Insurance coverage",
    "Professional coordination"
  ],
  leadership: [
    "Lead the group",
    "Earn incentives",
    "Enjoy complimentary participation",
    "Gain recognition as an Explorers Ride Leader"
  ],
  closing:
    "If you love adventure over luxury, road over routine, and experience over comfort, this is for you. Join Explorers on Wheels and start your exploration journey with us.",
  disciplineNote:
    "Explorers reserves the right to disqualify any rider who does not follow safety discipline or ride protocol."
};
